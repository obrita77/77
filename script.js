class CustomerRegistration {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.submitButton = document.getElementById('submitButton');
        this.successMessage = document.getElementById('successMessage');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Validação em tempo real
        document.getElementById('name').addEventListener('blur', (e) => this.validateName(e.target.value));
        document.getElementById('email').addEventListener('blur', (e) => this.validateEmail(e.target.value));
        document.getElementById('password').addEventListener('blur', (e) => this.validatePassword(e.target.value));
        document.getElementById('confirmPassword').addEventListener('blur', (e) => this.validateConfirmPassword(e.target.value));
        document.getElementById('phone').addEventListener('blur', (e) => this.validatePhone(e.target.value));
        
        // Envio do formulário
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Limpar erros ao digitar
        this.setupInputCleaners();
    }

    setupInputCleaners() {
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.clearError(input.id);
                input.classList.remove('error');
            });
        });
    }

    clearError(fieldId) {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }

    validateName(name) {
        if (!name.trim()) {
            this.showError('name', 'Nome é obrigatório');
            return false;
        }
        
        if (name.trim().length < 2) {
            this.showError('name', 'Nome deve ter pelo menos 2 caracteres');
            return false;
        }
        
        if (!/^[a-zA-ZÀ-ÿ\s']+$/.test(name)) {
            this.showError('name', 'Nome deve conter apenas letras');
            return false;
        }
        
        this.clearError('name');
        return true;
    }

    validateEmail(email) {
        if (!email.trim()) {
            this.showError('email', 'E-mail é obrigatório');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('email', 'Digite um e-mail válido');
            return false;
        }
        
        this.clearError('email');
        return true;
    }

    validatePassword(password) {
        if (!password) {
            this.showError('password', 'Senha é obrigatória');
            return false;
        }
        
        if (password.length < 8) {
            this.showError('password', 'Senha deve ter pelo menos 8 caracteres');
            return false;
        }
        
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            this.showError('password', 'Senha deve conter letras maiúsculas, minúsculas e números');
            return false;
        }
        
        this.clearError('password');
        return true;
    }

    validateConfirmPassword(confirmPassword) {
        const password = document.getElementById('password').value;
        
        if (!confirmPassword) {
            this.showError('confirmPassword', 'Confirme sua senha');
            return false;
        }
        
        if (confirmPassword !== password) {
            this.showError('confirmPassword', 'Senhas não coincidem');
            return false;
        }
        
        this.clearError('confirmPassword');
        return true;
    }

    validatePhone(phone) {
        if (phone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone)) {
            this.showError('phone', 'Formato: (11) 99999-9999');
            return false;
        }
        
        this.clearError('phone');
        return true;
    }

    validateAllFields() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('phone').value;

        const isNameValid = this.validateName(name);
        const isEmailValid = this.validateEmail(email);
        const isPasswordValid = this.validatePassword(password);
        const isConfirmPasswordValid = this.validateConfirmPassword(confirmPassword);
        const isPhoneValid = this.validatePhone(phone);

        return isNameValid && isEmailValid && isPasswordValid && 
               isConfirmPasswordValid && isPhoneValid;
    }

    handleSubmit(event) {
        event.preventDefault();
        
        if (this.validateAllFields()) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'Cadastrando...';
            
            // Simulação de envio para servidor
            setTimeout(() => {
                this.showSuccess();
                this.form.reset();
                this.submitButton.disabled = false;
                this.submitButton.textContent = 'Criar Conta';
            }, 2000);
        }
    }

    showSuccess() {
        this.successMessage.classList.remove('hidden');
        
        setTimeout(() => {
            this.successMessage.classList.add('hidden');
        }, 5000);
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CustomerRegistration();
});

// Adicionar máscara para telefone
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/^(\d{0,2})/, '($1');
            } else if (value.length <= 6) {
                value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
            } else if (value.length <= 10) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
            
            e.target.value = value;
        }
    });
});