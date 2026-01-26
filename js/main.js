/**
 * Gymtegrity Website - Main JavaScript
 *
 * Features:
 * - Mobile navigation toggle
 * - Smooth scrolling
 * - Header scroll effects
 * - Form validation & submission
 * - Scroll animations
 * - Dynamic year in footer
 */

(function () {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const trialForm = document.getElementById('trial-form');
    const currentYearEl = document.getElementById('current-year');

    // ========================================
    // Mobile Navigation
    // ========================================
    function initMobileNav() {
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', toggleNav);

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('is-active')) {
                    closeNav();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeNav();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
                closeNav();
                navToggle.focus();
            }
        });
    }

    function toggleNav() {
        const isActive = navMenu.classList.toggle('is-active');
        navToggle.setAttribute('aria-expanded', isActive);
    }

    function closeNav() {
        navMenu.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    // ========================================
    // Header Scroll Effects
    // ========================================
    function initHeaderScroll() {
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;

            // Add scrolled class when past threshold
            if (scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });

        // Initial check
        updateHeader();
    }

    // ========================================
    // Smooth Scrolling
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#" or empty
                if (href === '#' || href === '') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            });
        });
    }

    // ========================================
    // Form Validation & Submission
    // ========================================
    function initFormHandling() {
        if (!trialForm) return;

        trialForm.addEventListener('submit', handleFormSubmit);

        // Real-time validation
        const inputs = trialForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(trialForm);
        let isValid = true;

        // Validate all fields
        trialForm.querySelectorAll('input[required], select[required]').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Collect form data
        const data = {
            parentName: formData.get('parent_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            childAge: formData.get('child_age'),
            interest: formData.get('interest')
        };

        // Show loading state
        const submitBtn = trialForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // [PLACEHOLDER: Replace with actual form submission]
        // This simulates a form submission - connect to your backend/CRM
        setTimeout(() => {
            console.log('Form submitted:', data);

            // Reset form
            trialForm.reset();

            // Show success message
            showNotification('Thank you! We\'ll contact you within 24 hours to schedule your free trial class.', 'success');

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Scroll to top of form
            trialForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1500);
    }

    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required check
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Show/hide error
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearFieldError(field);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        clearFieldError(field);

        field.classList.add('trial-form__input--error');

        const errorEl = document.createElement('span');
        errorEl.className = 'trial-form__error';
        errorEl.textContent = message;
        errorEl.style.cssText = 'display: block; color: #EF4444; font-size: 0.75rem; margin-top: 0.25rem;';

        field.parentNode.appendChild(errorEl);
    }

    function clearFieldError(field) {
        field.classList.remove('trial-form__input--error');
        const existingError = field.parentNode.querySelector('.trial-form__error');
        if (existingError) {
            existingError.remove();
        }
    }

    // ========================================
    // Notification System
    // ========================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.setAttribute('role', 'alert');

        const colors = {
            success: { bg: '#10B981', text: '#FFFFFF' },
            error: { bg: '#EF4444', text: '#FFFFFF' },
            info: { bg: '#3B82F6', text: '#FFFFFF' },
            warning: { bg: '#F59E0B', text: '#FFFFFF' }
        };

        const color = colors[type] || colors.info;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 16px 24px;
            background-color: ${color.bg};
            color: ${color.text};
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()"
                        style="background: none; border: none; color: inherit; cursor: pointer; font-size: 20px; line-height: 1;">
                    &times;
                </button>
            </div>
        `;

        // Add animation styles if not present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    function initScrollAnimations() {
        // Skip if reduced motion is preferred
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Add animation class to elements
        const animatedElements = document.querySelectorAll(
            '.program-card, .why-us__card, .testimonial-card, .about__image, .about__value'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add styles for visible state
        const style = document.createElement('style');
        style.textContent = `
            .is-visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ========================================
    // Dynamic Footer Year
    // ========================================
    function initDynamicYear() {
        if (currentYearEl) {
            currentYearEl.textContent = new Date().getFullYear();
        }
    }

    // ========================================
    // Active Navigation Link Highlighting
    // ========================================
    function initActiveNavHighlight() {
        const sections = document.querySelectorAll('section[id]');

        function highlightNavLink() {
            const scrollY = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('nav__link--active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('nav__link--active');
                        }
                    });
                }
            });
        }

        // Add active link styles
        const style = document.createElement('style');
        style.textContent = `
            .nav__link--active {
                color: var(--color-primary) !important;
            }
        `;
        document.head.appendChild(style);

        window.addEventListener('scroll', highlightNavLink, { passive: true });
        highlightNavLink();
    }

    // ========================================
    // Initialize Everything
    // ========================================
    function init() {
        initMobileNav();
        initHeaderScroll();
        initSmoothScroll();
        initFormHandling();
        initScrollAnimations();
        initDynamicYear();
        initActiveNavHighlight();

        console.log('Gymtegrity website initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
