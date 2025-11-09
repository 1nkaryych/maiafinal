
class AuthSystem {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.init();
    }

    init() {
        this.updateAuthLinks();
        this.setupAuthForms();
        this.checkAuthState();
    }

    // Update navigation based on auth state
    updateAuthLinks() {
        const authLink = document.getElementById('auth-link');
        const profileLink = document.getElementById('profile-link');
        const logoutBtn = document.getElementById('logout-btn');

        if (this.currentUser) {
            if (authLink) authLink.style.display = 'none';
            if (profileLink) profileLink.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'block';
        } else {
            if (authLink) authLink.style.display = 'block';
            if (profileLink) profileLink.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    // Setup form event listeners
    setupAuthForms() {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const logoutBtn = document.getElementById('logout-btn');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }
    }

    // Handle user login
    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = { name: user.name, email: user.email };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showMessage('Login successful!', 'success');
            setTimeout(() => window.location.href = 'profile.html', 1000);
        } else {
            this.showMessage('Invalid email or password', 'error');
        }
    }

    // Handle user registration
    handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const phone = document.getElementById('signup-phone').value;

        // Check if user already exists
        if (this.users.find(u => u.email === email)) {
            this.showMessage('User with this email already exists', 'error');
            return;
        }

        // Create new user
        const newUser = { name, email, password, phone };
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));

        this.showMessage('Registration successful! Please login.', 'success');
        setTimeout(() => this.switchToLogin(), 1000);
    }

    // Handle user logout
    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateAuthLinks();
        this.showMessage('Logged out successfully', 'success');
        setTimeout(() => window.location.href = 'index.html', 1000);
    }

    // Check authentication state
    checkAuthState() {
        if (window.location.pathname.includes('profile.html') && !this.currentUser) {
            window.location.href = 'auth.html';
        }
    }

    // Utility functions
    switchToLogin() {
        const loginTab = document.querySelector('[data-tab="login"]');
        if (loginTab) loginTab.click();
    }

    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }
}

// Initialize auth system
const authSystem = new AuthSystem();