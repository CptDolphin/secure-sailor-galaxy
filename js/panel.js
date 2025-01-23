// Panel użytkownika
class UserPanel {
    constructor() {
        this.setupEventListeners();
        this.loadUserData();
    }

    setupEventListeners() {
        // Wylogowanie
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Wylogowanie ze wszystkich urządzeń
        const logoutAllBtn = document.getElementById('logoutAllDevices');
        if (logoutAllBtn) {
            logoutAllBtn.addEventListener('click', () => this.handleLogoutAllDevices());
        }

        // Usuwanie konta
        const deleteAccountBtn = document.getElementById('deleteAccount');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', () => this.handleDeleteAccount());
        }

        // 2FA
        const toggle2FABtn = document.getElementById('toggle2FA');
        if (toggle2FABtn) {
            toggle2FABtn.addEventListener('click', () => this.handle2FAToggle());
        }
    }

    async loadUserData() {
        try {
            const token = utils.storage.getToken();
            if (!token) {
                window.location.href = '/index.html';
                return;
            }

            const response = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const userData = await response.json();
            this.updateUI(userData);
        } catch (error) {
            utils.debug.error('Failed to load user data: ' + error.message);
            utils.handleApiError(error);
        }
    }

    updateUI(userData) {
        // Aktualizacja statusu 2FA
        const twoFactorStatus = document.getElementById('twoFactorStatus');
        if (twoFactorStatus) {
            twoFactorStatus.textContent = `Status: ${userData.has2FA ? 'Włączone' : 'Wyłączone'}`;
        }

        // Aktualizacja informacji o ostatnim logowaniu
        const lastLoginInfo = document.getElementById('lastLoginInfo');
        if (lastLoginInfo && userData.lastLogin) {
            lastLoginInfo.textContent = `${userData.lastLogin.date} z IP: ${userData.lastLogin.ip} (${userData.lastLogin.country})`;
        }

        // Aktualizacja połączonych kont
        const connectedAccounts = document.getElementById('connectedAccounts');
        if (connectedAccounts && userData.connectedAccounts) {
            // TODO: Implement connected accounts UI update
        }
    }

    async handleLogout() {
        utils.debug.log('Logging out...');
        try {
            await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${utils.storage.getToken()}`
                }
            });

            utils.storage.removeToken();
            window.location.href = '/index.html';
        } catch (error) {
            utils.debug.error('Logout failed: ' + error.message);
            utils.handleApiError(error);
        }
    }

    async handleLogoutAllDevices() {
        if (confirm('Czy na pewno chcesz wylogować się ze wszystkich urządzeń?')) {
            try {
                await fetch('/api/logout-all', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${utils.storage.getToken()}`
                    }
                });

                utils.storage.removeToken();
                window.location.href = '/index.html';
            } catch (error) {
                utils.debug.error('Logout all devices failed: ' + error.message);
                utils.handleApiError(error);
            }
        }
    }

    async handleDeleteAccount() {
        const password = prompt('Aby usunąć konto, podaj swoje hasło:');
        if (password) {
            try {
                const response = await fetch('/api/delete-account', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${utils.storage.getToken()}`
                    },
                    body: JSON.stringify({ password })
                });

                if (response.ok) {
                    utils.storage.removeToken();
                    alert('Konto zostało usunięte.');
                    window.location.href = '/index.html';
                }
            } catch (error) {
                utils.debug.error('Account deletion failed: ' + error.message);
                utils.handleApiError(error);
            }
        }
    }

    async handle2FAToggle() {
        try {
            const response = await fetch('/api/2fa/setup', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${utils.storage.getToken()}`
                }
            });

            const data = await response.json();
            
            if (data.qrCode) {
                const qrContainer = document.getElementById('qrCodeContainer');
                qrContainer.innerHTML = `
                    <img src="${data.qrCode}" alt="QR Code dla 2FA">
                    <p>Zeskanuj kod QR w aplikacji Google Authenticator</p>
                `;
                qrContainer.classList.remove('hidden');
            }
        } catch (error) {
            utils.debug.error('2FA setup failed: ' + error.message);
            utils.handleApiError(error);
        }
    }
}

// Inicjalizacja panelu
if (document.querySelector('.panel-content')) {
    window.userPanel = new UserPanel();
}