// Company Website JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    welcomeMessage();
    initializeNavigation();
    initializeForm();
    initializeHeadquarterEffects();
    initializeScrollEffects();
    initializeTypingEffect();
});
/// Welcome Message
function welcomeMessage() {
    /// Prompt user for their name
    let username = prompt("Enter your name:");
    /// If a name is entered, display it in the header; otherwise, show a default message
    if (username) {

        /// Display the username in the header
        document.getElementById("username").innerHTML = username;
    } else {

        /// If no name is entered, show a default welcome message
        alert("Welcome to my portfolio!");
    }
}

/// Form Validation
function validateForm() {
    /// Get form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    /// Simple validation
    if (name === "" || email === "" || message === "") {
        /// If any field is empty, show an alert
        alert("Please fill in all fields.");
    } else {
        /// If all fields are filled, show a success message
        alert(`Thanks, ${name}! Form submitted successfully!`);
    }
}
// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => {
                btn.classList.remove('bg-gray-200');
            });
            
            // Add active class to clicked button
            this.classList.add('bg-gray-200');
            
            // Handle navigation actions
            const buttonText = this.textContent.trim();
            handleNavigation(buttonText);
        });
    });
}

// Handle navigation based on button text
function handleNavigation(buttonText) {
    switch(buttonText) {
        case 'Home':
            scrollToSection('header');
            break;
        case 'Our Profile':
            scrollToSection('.headquarter-section');
            break;
        case 'Portofolio':
            // Add portfolio section navigation here
            console.log('Portfolio section not implemented yet');
            break;
        case 'Message Us':
            scrollToSection('.contact-section');
            break;
        default:
            break;
    }
}

// Smooth scroll to section
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form functionality
function initializeForm() {
    const submitButton = document.querySelector('.submit-button');
    const form = document.querySelector('.contact-form');
    
    if (submitButton) {
        submitButton.addEventListener('click', handleFormSubmit);
    }
    
    // Add real-time validation
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = e.target;
    submitButton.classList.add('loading');
    submitButton.textContent = 'Sending...';
    
    // Get form values
    const formData = getFormData();
    
    // Validate form
    if (!validateForm(formData)) {
        resetSubmitButton(submitButton);
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Success handling
        showSuccessMessage();
        resetForm();
        resetSubmitButton(submitButton);
    }, 1500);
}

// Get form data
function getFormData() {
    return {
        name: document.querySelector('input[type="text"]').value.trim(),
        email: document.querySelector('input[type="email"]').value.trim(),
        subject: document.querySelector('select').value,
        message: document.querySelector('textarea').value.trim()
    };
}

// Validate entire form
function validateForm(data) {
    let isValid = true;
    
    // Required fields validation
    if (!data.name) {
        showFieldError('input[type="text"]', 'Name is required');
        isValid = false;
    }
    
    if (!data.email) {
        showFieldError('input[type="email"]', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showFieldError('input[type="email"]', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!data.message) {
        showFieldError('textarea', 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${getFieldLabel(field)} is required`);
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(fieldOrSelector, message) {
    const field = typeof fieldOrSelector === 'string' 
        ? document.querySelector(fieldOrSelector) 
        : fieldOrSelector;
    
    if (!field) return;
    
    field.classList.add('border-red-500');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(e) {
    const field = typeof e === 'object' && e.target ? e.target : e;
    
    field.classList.remove('border-red-500');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Get field label
function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    return label ? label.textContent : 'Field';
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successDiv.textContent = 'Thank you for your message! We will get back to you soon.';
    
    document.body.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Reset form
function resetForm() {
    const form = document.querySelector('.contact-section form') || document.querySelector('form');
    if (form) {
        form.reset();
    } else {
        // Manual reset if no form element
        document.querySelector('input[type="text"]').value = '';
        document.querySelector('input[type="email"]').value = '';
        document.querySelector('select').selectedIndex = 0;
        document.querySelector('textarea').value = '';
    }
    
    // Clear any remaining errors
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.border-red-500').forEach(field => {
        field.classList.remove('border-red-500');
    });
}

// Reset submit button
function resetSubmitButton(button) {
    button.classList.remove('loading');
    button.textContent = 'Submit';
}

// Headquarter hover effects
function initializeHeadquarterEffects() {
    const circles = document.querySelectorAll('.circle-placeholder');
    
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', function() {
            this.style.borderColor = '#6b7280';
            this.style.backgroundColor = '#f3f4f6';
            this.style.transform = 'scale(1.05)';
        });
        
        circle.addEventListener('mouseleave', function() {
            this.style.borderColor = '#d1d5db';
            this.style.backgroundColor = '#f9fafb';
            this.style.transform = 'scale(1)';
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Typing effect for welcome message
function initializeTypingEffect() {
    window.addEventListener('load', function() {
        const welcomeText = document.querySelector('section .bg-gray-100 p');
        if (welcomeText) {
            typeWriter(welcomeText, 'Welcome', 150);
        }
    });
}

// Type writer effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any modals or clear form errors
    if (e.key === 'Escape') {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.border-red-500').forEach(field => {
            field.classList.remove('border-red-500');
        });
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        validateForm,
        typeWriter,
        debounce
    };
}