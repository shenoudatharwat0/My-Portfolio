// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const nav = document.getElementById('navbar');
const currentYearEl = document.getElementById('current-year');
const skillFilters = document.querySelectorAll('.skill-filter');
const projectFilters = document.querySelectorAll('.project-filter');
const skillCategories = document.querySelectorAll('.skill-category');
const projectCards = document.querySelectorAll('.project-card');
const form = document.getElementById('inquiryForm');

// Set current year
currentYearEl.textContent = new Date().getFullYear();

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 800);
    
    // Initialize Typing Effect
    initTypingEffect();
    
    // Initialize Particles
    initParticles();
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    // Save preference to localStorage
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}

// Scroll to top button
window.addEventListener('scroll', () => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Scroll to top button visibility
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Skill filtering
skillFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Update active filter
        skillFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const category = filter.getAttribute('data-category');
        
        // Show/hide skill categories
        skillCategories.forEach(categoryEl => {
            if (category === 'all' || categoryEl.getAttribute('data-category') === category) {
                categoryEl.style.display = 'block';
                categoryEl.classList.add('visible');
            } else {
                categoryEl.style.display = 'none';
            }
        });
    });
});

// Project filtering
projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Update active filter
        projectFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const category = filter.getAttribute('data-category');
        
        // Show/hide project cards
        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex'; // Changed to flex to maintain layout
                setTimeout(() => card.classList.add('visible'), 50);
            } else {
                card.classList.remove('visible');
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// Form submission
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            const myEmail = "shenoudatharwat0@gmail.com";

            const emailBody = `Name: ${name}\n` +
                            `User Email: ${email}\n\n` +
                            `Message:\n${message}`;

            const url = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            window.location.href = url;
            
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// --- Staggered Scroll Animation ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

// Observe individual items instead of just sections
document.querySelectorAll('.fade-item').forEach((el, index) => {
    // Optional: Add small inline delay based on index for true staggered feel on load
    // but intersection observer handles most of it naturally as you scroll
    observer.observe(el);
});

// Also observe section headers
document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('fade-item');
    observer.observe(el);
});

// Initialize hero separately
document.querySelector('.hero').classList.add('visible');


// --- Typing Effect ---
function initTypingEffect() {
    const subtitleSpan = document.querySelector('.subtitle');
    const texts = ["Full Stack .NET Developer", "Backend Specialist",  "Network Administrator"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            subtitleSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            subtitleSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// --- 3D Tilt Effect for Cards ---
const cards = document.querySelectorAll('.project-card, .service-card, .skill-category');

cards.forEach(card => {
    card.addEventListener('mousemove', handleHover);
    card.addEventListener('mouseleave', resetHover);
});

function handleHover(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 10deg)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function resetHover() {
    this.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
}

// --- Particle Background System ---
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    // Handle Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Mouse interaction
    const mouse = {
        x: null,
        y: null,
        radius: 150
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = document.body.classList.contains('light-mode') ? 'rgba(33, 118, 163, 0.5)' : 'rgba(50, 130, 184, 0.5)';
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse Interaction
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 1; // move away from mouse
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 1;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 1;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 1;
                }
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'white'; // Color logic handled in draw
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                    let strokeColor = document.body.classList.contains('light-mode') 
                        ? `rgba(33, 118, 163, ${opacityValue * 0.2})` 
                        : `rgba(50, 130, 184, ${opacityValue * 0.2})`;
                    
                    ctx.strokeStyle = strokeColor;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    init();
    animate();
}
