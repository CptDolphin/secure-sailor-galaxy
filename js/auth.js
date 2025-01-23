// Główna klasa autoryzacji
class Auth {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api';
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Logowanie
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Rejestracja
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Reset hasła
        const resetForm = document.getElementById('resetPasswordForm');
        if (resetForm) {
            resetForm.addEventListener('submit', (e) => this.handlePasswordReset(e));
        }

        // Social login
        const googleBtn = document.querySelector('.btn-google');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.handleGoogleLogin());
        }

        const facebookBtn = document.querySelector('.btn-facebook');
        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => this.handleFacebookLogin());
        }
    }

    // Logowanie
    async handleLogin(e) {
        e.preventDefault();
        utils.debug.log('Attempting login...');

        try {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // reCAPTCHA
            const recaptchaToken = await this.executeRecaptcha();

            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, recaptchaToken })
            });

            if (response.status === 429) {
                throw new Error('Rate limit exceeded');
            }

            const data = await response.json();

            if (data.requires2FA) {
                // Pokazanie formularza 2FA
                this.show2FAPrompt();
            } else if (data.token) {
                utils.storage.setToken(data.token);
                utils.debug.log('Login successful');
                window.location.href = '/panel.html';
            }
        } catch (error) {
            utils.debug.error('Login failed: ' + error.message);
            utils.handleApiError(error);
        }
    }

    // Rejestracja
    async handleRegister(e) {
        e.preventDefault();
        utils.debug.log('Attempting registration...');

        try {
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

            if (password !== passwordConfirm) {
                throw new Error('Hasła nie są identyczne');
            }

            const recaptchaToken = await this.executeRecaptcha();

            const response = await fetch(`${this.apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, recaptchaToken })
            });

            const data = await response.json();

            if (data.success) {
                utils.debug.log('Registration successful');
                alert('Sprawdź swoją skrzynkę email, aby aktywować konto.');
                utils.showForm('loginForm');
            }
        } catch (error) {
            utils.debug.error('Registration failed: ' + error.message);
            utils.handleApiError(error);
        }
    }

    // Reset hasła
    async handlePasswordReset(e) {
        e.preventDefault();
        utils.debug.log('Attempting password reset...');

        try {
            const email = document.getElementById('resetEmail').value;
            
            const response = await fetch(`${this.apiUrl}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                alert('Link do resetowania hasła został wysłany na twój email.');
                utils.showForm('loginForm');
            }
        } catch (error) {
            utils.debug.error('Password reset failed: ' + error.message);
            utils.handleApiError(error);
        }
    }

    // Social login - Google
    async handleGoogleLogin() {
        utils.debug.log('Attempting Google login...');
        // TODO: Implement Google OAuth
        window.location.href = `${this.apiUrl}/auth/google`;
    }

    // Social login - Facebook
    async handleFacebookLogin() {
        utils.debug.log('Attempting Facebook login...');
        // TODO: Implement Facebook OAuth
        window.location.href = `${this.apiUrl}/auth/facebook`;
    }

    // reCAPTCHA
    async executeRecaptcha() {
        try {
            return await grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'});
        } catch (error) {
            utils.debug.error('reCAPTCHA failed: ' + error.message);
            throw new Error('Błąd weryfikacji reCAPTCHA');
        }
    }

    // 2FA
    show2FAPrompt() {
        const code = prompt('Podaj kod z aplikacji authenticator:');
        if (code) {
            this.verify2FACode(code);
        }
    }

    async verify2FACode(code) {
        try {
            const response = await fetch(`${this.apiUrl}/verify-2fa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            });

            const data = await response.json();

            if (data.token) {
                utils.storage.setToken(data.token);
                window.location.href = '/panel.html';
            }
        } catch (error) {
            utils.debug.error('2FA verification failed: ' + error.message);
            utils.handleApiError(error);
        }
    }
}

// Inicjalizacja
window.auth = new Auth();