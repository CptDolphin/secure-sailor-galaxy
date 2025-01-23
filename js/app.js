// Główny plik aplikacji
document.addEventListener('DOMContentLoaded', () => {
    // Obsługa przełączania zakładek
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const formId = `${button.dataset.tab}Form`;
            utils.showForm(formId);
        });
    });

    // Link "Zapomniałem hasła"
    const forgotPasswordLink = document.getElementById('forgotPassword');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            utils.showForm('resetPasswordForm');
        });
    }

    // Powrót do logowania
    const backToLoginLinks = document.querySelectorAll('.back-to-login');
    backToLoginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            utils.showForm('loginForm');
        });
    });

    // Sprawdzenie tokenu przy starcie
    const token = utils.storage.getToken();
    if (token && window.location.pathname === '/index.html') {
        window.location.href = '/panel.html';
    }

    // Automatyczne odświeżanie tokenu
    if (token) {
        setInterval(async () => {
            try {
                const response = await fetch('/api/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (data.token) {
                    utils.storage.setToken(data.token);
                    utils.debug.log('Token refreshed successfully');
                }
            } catch (error) {
                utils.debug.error('Token refresh failed: ' + error.message);
            }
        }, 5 * 60 * 1000); // Co 5 minut
    }
});