// Contact form functionality
class ContactForm {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupMapInteraction();
    }

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const errorElement = document.getElementById(`${field.name}-error`) || 
                            field.parentElement.querySelector('.error-message');
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showFieldError(field, errorElement, 'This field is required');
            return false;
        }

        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showFieldError(field, errorElement, 'Please enter a valid email address');
                return false;
            }
        }

        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                this.showFieldError(field, errorElement, 'Please enter a valid phone number');
                return false;
            }
        }

        this.clearFieldError(field, errorElement);
        return true;
    }

    showFieldError(field, errorElement, message) {
        field.style.borderColor = '#ff4444';
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    clearFieldError(field, errorElement) {
        field.style.borderColor = '';
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate all fields
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showMessage('Please fix the errors in the form', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('Sending your message...', 'success');
        
        setTimeout(() => {
            this.showMessage('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            
            // Save contact to localStorage (simulation)
            this.saveContact(formData);
        }, 2000);
    }

    saveContact(formData) {
        const contact = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    setupMapInteraction() {
        const directionsBtn = document.getElementById('get-directions');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => {
                // Simulate opening directions
                this.showMessage('Opening directions to our location...', 'success');
                // In a real implementation, this would open Google Maps or similar
            });
        }
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        document.body.appendChild(messageEl);

        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

// Initialize contact form
const contactForm = new ContactForm();