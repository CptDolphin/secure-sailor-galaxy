// Funkcje pomocnicze
const utils = {
    // Pokazywanie/ukrywanie formularzy
    showForm: (formId) => {
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(formId).classList.add('active');
    },

    // Obsługa błędów API
    handleApiError: (error) => {
        console.error('API Error:', error);
        
        if (error.status === 429) {
            alert('Zbyt wiele prób. Spróbuj ponownie za 15 minut.');
        } else {
            alert('Wystąpił błąd. Spróbuj ponownie później.');
        }
    },

    // Walidacja formularza
    validateForm: (formData) => {
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !email.includes('@')) {
            throw new Error('Nieprawidłowy adres email');
        }

        if (password && password.length < 8) {
            throw new Error('Hasło musi mieć co najmniej 8 znaków');
        }

        return true;
    },

    // Obsługa localStorage
    storage: {
        setToken: (token) => {
            localStorage.setItem('authToken', token);
        },
        getToken: () => {
            return localStorage.getItem('authToken');
        },
        removeToken: () => {
            localStorage.removeItem('authToken');
        }
    },

    // Debug logging
    debug: {
        log: (message) => {
            console.log(`[DEBUG] ${new Date().toISOString()}: ${message}`);
        },
        error: (message) => {
            console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
        }
    }
};

// Export dla modułów
window.utils = utils;