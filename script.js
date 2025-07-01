
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.8)';
    }
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

// Apply animations to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add initial styles for animation
    const animatedElements = document.querySelectorAll('.info-card, .dev-card, .step');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Server status animation
    const statusIndicator = document.querySelector('.status-indicator');
    if (statusIndicator) {
        setInterval(() => {
            statusIndicator.style.boxShadow = '0 0 10px #4CAF50';
            setTimeout(() => {
                statusIndicator.style.boxShadow = '0 0 20px #4CAF50';
            }, 500);
        }, 2000);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.info-card, .dev-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic background particles
    createParticles();
});

// Create floating particles effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    document.body.appendChild(particlesContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#ff6b35' : '#f7931e';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.boxShadow = `0 0 6px ${particle.style.background}`;
        
        particlesContainer.appendChild(particle);

        const animationDuration = Math.random() * 10000 + 5000;
        const horizontalMovement = (Math.random() - 0.5) * 200;

        particle.animate([
            {
                transform: 'translateY(0px) translateX(0px)',
                opacity: particle.style.opacity
            },
            {
                transform: `translateY(-${window.innerHeight + 100}px) translateX(${horizontalMovement}px)`,
                opacity: 0
            }
        ], {
            duration: animationDuration,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
        };
    }

    // Create particles periodically
    setInterval(createParticle, 1000);
}

// Copy connection info functionality
document.addEventListener('DOMContentLoaded', () => {
    const connectionSteps = document.querySelectorAll('.step-content');
    connectionSteps.forEach(step => {
        step.addEventListener('click', () => {
            const textToCopy = step.textContent;
            if (navigator.clipboard && textToCopy.includes('Zalupa Rust') || textToCopy.includes('123456')) {
                const info = textToCopy.includes('Zalupa Rust') ? 'Zalupa Rust' : '123456';
                navigator.clipboard.writeText(info).then(() => {
                    // Visual feedback
                    const originalBg = step.parentElement.style.background;
                    step.parentElement.style.background = 'rgba(76, 175, 80, 0.2)';
                    setTimeout(() => {
                        step.parentElement.style.background = originalBg;
                    }, 500);
                });
            }
        });
    });
});

// Add typing effect to hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h2');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
});
