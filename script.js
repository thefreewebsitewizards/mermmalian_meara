// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        // Check if href is not just '#' and contains a valid ID
        if (href && href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {
    const container = document.querySelector('.carousel-container');
    if (container) {
        container.style.transform = `translateX(-${index * 100}%)`;
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Carousel event listeners
document.querySelector('.next')?.addEventListener('click', nextSlide);
document.querySelector('.prev')?.addEventListener('click', prevSlide);

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Parallax Effect
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-clouds');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

window.addEventListener('scroll', parallaxEffect);

// Add shimmer effect to cards on hover
// Remove or comment out these lines (around line 79-87):
/*
document.querySelectorAll('.service-card, .mermaid-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('shimmer');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('shimmer');
    });
});
*/

// Remove or comment out the mermaid animations function (around line 399-443):
/*
function initializeMermaidsAnimations() {
    // Sparkle effects on hover
    document.querySelectorAll('.mermaid-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            createSparkles(this.querySelector('.sparkles-container'));
        });
        
        card.addEventListener('mousemove', function(e) {
            createFloatingSparkle(e, this);
        });
    });
    
    // Book button ripple effect
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRipple(e, this);
            // Scroll to contact section
            setTimeout(() => {
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300);
        });
    });
    
    // Staggered entrance animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.mermaid-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}
*/

// Create Bubbles Animation
function createBubbles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create bubble container
    const bubbleWrap = document.createElement('div');
    bubbleWrap.id = 'bubble-wrap';
    
    // Create 10 bubbles
    for (let i = 1; i <= 10; i++) {
        const bubble = document.createElement('div');
        bubble.className = `bubble x${i}`;
        bubbleWrap.appendChild(bubble);
    }
    
    // Add bubble container to hero section
    hero.appendChild(bubbleWrap);
}

// Add this function before the DOMContentLoaded event listener
function updateWavyText(element, text) {
    let delay = 200;
    
    element.innerHTML = text
        .split("")
        .map(letter => {
            return `<span>` + letter + `</span>`;
        })
        .join("");
    
    Array.from(element.children).forEach((span, index) => {
        setTimeout(() => {
            span.classList.add("wavy");
        }, index * 60 + delay);
    });
}

// Services Gallery Filtering
function initializeServicesFilter() {
    console.log('Initializing services filter...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mermaidItems = document.querySelectorAll('.mermaid-item');
    
    console.log('Found filter buttons:', filterButtons.length);
    console.log('Found mermaid items:', mermaidItems.length);
    
    if (filterButtons.length === 0) {
        console.error('No filter buttons found!');
        return;
    }
    
    if (mermaidItems.length === 0) {
        console.error('No mermaid items found!');
        return;
    }
    
    filterButtons.forEach((button, index) => {
        console.log(`Adding event listener to button ${index}:`, button.getAttribute('data-category'));
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Filter button clicked:', button.getAttribute('data-category'));
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            console.log('Filtering by category:', category);
            
            let visibleCount = 0;
            
            mermaidItems.forEach(item => {
                const categories = item.getAttribute('data-categories');
                console.log('Item categories:', categories);
                
                if (category === 'all' || (categories && categories.includes(category))) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
            
            console.log(`Showing ${visibleCount} items for category: ${category}`);
        });
    });
    
    console.log('Services filter initialized successfully!');
}

// Promo Section Functionality
function initializePromoFilter() {
    const promoButtons = document.querySelectorAll('.promo-btn');
    const promoContents = document.querySelectorAll('.promo-content');
    
    promoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Remove active class from all buttons
            promoButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all content sections
            promoContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show selected content section
            const targetContent = document.getElementById(category + '-content');
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
}

// Add sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#FFD700';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation CSS (only once)
const sparkleCSS = `
@keyframes sparkle {
    0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
    }
    50% {
        transform: scale(1) rotate(180deg);
        opacity: 1;
    }
    100% {
        transform: scale(0) rotate(360deg);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Enhanced Events Functionality
function initializeEventsAnimations() {
    // Add intersection observer for timeline animations
    const eventCards = document.querySelectorAll('.event-card');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const eventObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add staggered animation to child elements
                const badge = entry.target.querySelector('.event-badge');
                const title = entry.target.querySelector('h3');
                const meta = entry.target.querySelector('.event-meta');
                const description = entry.target.querySelector('.event-description');
                const hashtags = entry.target.querySelector('.event-hashtags');
                const cta = entry.target.querySelector('.event-cta');
                
                [badge, title, meta, description, hashtags, cta].forEach((el, index) => {
                    if (el) {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);
    
    eventCards.forEach(card => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Set initial state for child elements
        const childElements = card.querySelectorAll('.event-badge, h3, .event-meta, .event-description, .event-hashtags, .event-cta');
        childElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.4s ease';
        });
        
        eventObserver.observe(card);
        
        // Add click event for CTA buttons
        const ctaButton = card.querySelector('.event-cta');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                // Create sparkle effect on click
                createEventSparkles(ctaButton);
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple-effect 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';
                
                ctaButton.style.position = 'relative';
                ctaButton.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
    });
}

// Create sparkle effect for events
function createEventSparkles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#FFD700', '#87CEEB', '#4682B4', '#FF6B9D'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            sparkle.style.width = '6px';
            sparkle.style.height = '6px';
            sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = 'event-sparkle 1.2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1200);
        }, i * 50);
    }
}

// Add CSS for ripple and sparkle animations
const eventAnimationsCSS = `
@keyframes ripple-effect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes event-sparkle {
    0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
    }
    50% {
        transform: scale(1) rotate(180deg);
        opacity: 1;
    }
    100% {
        transform: scale(0) rotate(360deg);
        opacity: 0;
    }
}
`;

// Add the animations CSS to the existing style element
if (style) {
    style.textContent += eventAnimationsCSS;
}

// Enhanced Mermaids Animations
function initializeMermaidsAnimations() {
    // Sparkle effects on hover
    document.querySelectorAll('.mermaid-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            createSparkles(this.querySelector('.sparkles-container'));
        });
        
        card.addEventListener('mousemove', function(e) {
            createFloatingSparkle(e, this);
        });
    });
    
    // Book button ripple effect
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRipple(e, this);
            // Scroll to contact section
            setTimeout(() => {
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300);
        });
    });
    
    // Staggered entrance animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.mermaid-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

function createSparkles(container) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #fff, #3498db);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkle-fade 1s ease-out forwards;
                pointer-events: none;
                z-index: 10;
            `;
            
            container.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }, i * 100);
    }
}

function createFloatingSparkle(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'floating-sparkle';
    sparkle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: #fff;
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float-up 2s ease-out forwards;
        pointer-events: none;
        z-index: 5;
    `;
    
    card.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 2000);
}

function createRipple(e, button) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add CSS animations - rename the second style variable
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes sparkle-fade {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
    
    @keyframes ripple-effect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(additionalStyle);

// Update DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing...');
    
    createBubbles();
    
    // Initialize Services Filter with delay to ensure DOM is ready
    setTimeout(() => {
        initializeServicesFilter();
    }, 100);
    
    // Initialize Promo Filter
    initializePromoFilter();
    
    // Initialize Events Animations
    initializeEventsAnimations();
    
    // Add wavy animation to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        updateWavyText(heroTitle, 'Mythos Mermaids');
    }
    
    // Add parallax clouds to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const clouds = document.createElement('div');
        clouds.classList.add('parallax-clouds');
        hero.appendChild(clouds);
    }
    
    // Add sparkles on mermaid card hover
    document.querySelectorAll('.mermaid-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.8) {
                createSparkle(e.clientX, e.clientY);
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.service-card, .mermaid-card, section').forEach(el => {
        el.style.opacity = '1';  // Changed from '0' to '1'
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
