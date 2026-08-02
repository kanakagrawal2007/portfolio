/* ========================================
   Portfolio JavaScript - Kanak Agrawal
   Interactive Features & Animations
======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initPageTransition();
    initScrollReveal();
    initScrollTop();
    initStatsAnimation();
    initCursorGlow();
    initParticles();
    initNavbarScroll();
    initFormHandling();
    initSmoothScroll();
});

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Page Transitions
// ========================================
function initPageTransition() {
    const pageTransition = document.getElementById('pageTransition');
    const links = document.querySelectorAll('a[href$=".html"]');
    
    // Only run transition effect on initial page load
    if (pageTransition) {
        pageTransition.classList.add('active');
        setTimeout(() => {
            pageTransition.classList.remove('active');
        }, 400);
    }
    
    // Add transition effect when clicking internal links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's an external link or has target=_blank
            if (link.target === '_blank' || href.startsWith('http') || href.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            
            if (pageTransition) {
                pageTransition.classList.add('active');
            }
            
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
}

// ========================================
// Scroll Reveal Animation
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) return;
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// ========================================
// Scroll to Top Button
// ========================================
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (!scrollTopBtn) return;
    
    const toggleScrollTop = () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    };
    
    window.addEventListener('scroll', toggleScrollTop);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Stats Number Animation
// ========================================
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-num');
    
    if (statNumbers.length === 0) return;
    
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            if (stat.classList.contains('animated')) return;
            
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                stat.classList.add('animated');
                
                const target = parseInt(stat.getAttribute('data-target'));
                const suffix = stat.getAttribute('data-suffix') || '';
                const duration = 2000;
                const steps = 60;
                const increment = target / steps;
                const stepDuration = duration / steps;
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, stepDuration);
            }
        });
    };
    
    window.addEventListener('scroll', animateNumbers);
    animateNumbers(); // Initial check
}

// ========================================
// Cursor Glow Effect
// ========================================
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (!cursorGlow || window.innerWidth <= 767) return;
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
    
    // Hide cursor glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
}

// ========================================
// Particles Background
// ========================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticlesArray();
    };
    
    const initParticlesArray = () => {
        particles = [];
        const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    };
    
    const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 240, 61, ${particle.opacity})`;
            ctx.fill();
            
            // Draw connections
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(124, 240, 61, ${0.15 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(drawParticles);
    };
    
    // Initialize
    resizeCanvas();
    drawParticles();
    
    // Handle resize
    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        resizeCanvas();
        drawParticles();
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
}

// ========================================
// Form Handling
// ========================================
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Handle form submission
    window.handleSubmit = function(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="bx bx-loader-alt bx-spin"></i>';
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<span>Message Sent!</span> <i class="bx bx-check"></i>';
            submitBtn.style.background = '#28a745';
            submitBtn.style.borderColor = '#28a745';
            
            // Reset form
            form.reset();
            
            // Restore button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
            }, 3000);
        }, 1500);
    };
    
    // Add input animations
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// Progress Bar Animation on Scroll
// ========================================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    if (progressBars.length === 0) return;
    
    const animateProgress = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const container = bar.closest('.skill-card');
            
            if (rect.top < window.innerHeight && rect.bottom > 0 && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                
                // Get the width from inline style
                const targetWidth = bar.style.width || '0%';
                bar.style.setProperty('--progress-width', targetWidth);
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            }
        });
    };
    
    window.addEventListener('scroll', animateProgress);
    animateProgress();
}

// Initialize progress bars
document.addEventListener('DOMContentLoaded', initProgressBars);

// ========================================
// Rotating Text Animation for Home Page
// ========================================
function initRotatingText() {
    const rotatingContainer = document.querySelector('.home-page .home-info h2');
    
    if (!rotatingContainer) return;
    
    // Get all the rotating word spans
    const wordSpans = rotatingContainer.querySelectorAll('span[data-text]');
    
    if (wordSpans.length === 0) return;
    
    // Collect texts in order (by --i: 1, 2, 3, 4)
    const texts = [];
    wordSpans.forEach(span => {
        const delay = parseInt(span.style.getPropertyValue('--i')) || 0;
        const text = span.getAttribute('data-text');
        texts.push({ text, delay });
    });
    
    // Sort by delay to get correct order
    texts.sort((a, b) => a.delay - b.delay);
    
    // Replace existing structure with simple text + rotating span
    rotatingContainer.innerHTML = `I'm a <span class="rotating-text"></span>`;
    
    const rotatingSpan = rotatingContainer.querySelector('.rotating-text');
    rotatingSpan.textContent = texts[0].text;
    
    let currentIndex = 0;
    const displayTime = 2000; // How long each word stays visible
    const fadeTime = 400;     // Transition time
    
    const rotate = () => {
        // Fade out
        rotatingSpan.style.opacity = '0';
        rotatingSpan.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            // Change text and fade in
            currentIndex = (currentIndex + 1) % texts.length;
            rotatingSpan.textContent = texts[currentIndex].text;
            rotatingSpan.style.opacity = '1';
            rotatingSpan.style.transform = 'translateY(0)';
        }, fadeTime);
    };
    
    // Set initial transition
    rotatingSpan.style.transition = `opacity ${fadeTime}ms ease, transform ${fadeTime}ms ease`;
    
    // Start rotation
    setInterval(rotate, displayTime);
}

// Initialize rotating text
document.addEventListener('DOMContentLoaded', initRotatingText);

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ========================================
// Lazy Loading Images (if needed in future)
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
// ========================================
// Touch Swipe Navigation for Mobile
// ========================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartX - touchEndX;
    
    // Swipe right to go back (previous page)
    if (diff > swipeThreshold) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pages = ['index.html', 'about.html', 'skills.html', 'projects.html', 'contact.html'];
        const currentIndex = pages.indexOf(currentPage);
        
        if (currentIndex > 0) {
            const previousPage = pages[currentIndex - 1];
            
            // Add transition effect
            const pageTransition = document.getElementById('pageTransition');
            if (pageTransition) {
                pageTransition.classList.add('active');
            }
            
            setTimeout(() => {
                window.location.href = previousPage;
            }, 300);
        }
    }
}