// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const nav = document.getElementById('navbar');
const currentYearEl = document.getElementById('current-year');

// Set current year
if(currentYearEl) currentYearEl.textContent = new Date().getFullYear();

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        if(loadingScreen) loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 800);
    
    // Initialize Typing Effect
    if(document.querySelector('.subtitle')) initTypingEffect();
    
    // Initialize Particles
    initParticles();
    
    // Highlight Active Link
    setActiveLink();

    // Initialize Smart Language Switcher
    setupLanguageSwitcher();
});

// Mobile menu toggle
if(hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Highlight Current Page in Navbar
function setActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Check for exact match or generic root match
        if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === './')) {
            link.classList.add('active'); 
            link.classList.add('current-page');
        } else {
            link.classList.remove('active');
            link.classList.remove('current-page');
        }
    });
}

// --- SMART LANGUAGE SWITCHER (New Feature) ---
function setupLanguageSwitcher() {
    const langBtn = document.querySelector('.lang-btn');
    if(!langBtn) return;

    // 1. Get current file name (e.g., "about.html" or "about-ar.html")
    const path = window.location.pathname;
    let page = path.split("/").pop();
    
    // Handle root URL (e.g., mysite.com/)
    if (page === "" || page === undefined) page = "index.html";

    // 2. Check if current page is Arabic
    const isArabic = page.includes("-ar");

    // 3. Calculate the target page and button text
    if (isArabic) {
        // Current is Arabic -> Switch to English
        // Remove "-ar" from filename (about-ar.html -> about.html)
        const target = page.replace("-ar.html", ".html");
        langBtn.href = target;
        langBtn.textContent = "EN";
        langBtn.setAttribute('aria-label', 'Switch to English');
    } else {
        // Current is English -> Switch to Arabic
        // Add "-ar" to filename (about.html -> about-ar.html)
        const target = page.replace(".html", "-ar.html");
        langBtn.href = target;
        langBtn.textContent = "AR";
        langBtn.setAttribute('aria-label', 'Switch to Arabic');
    }
}

// Theme toggle
if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}

// Scroll effects
window.addEventListener('scroll', () => {
    if (nav) {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
    if (scrollToTopBtn) {
        if (window.scrollY > 500) scrollToTopBtn.classList.add('visible');
        else scrollToTopBtn.classList.remove('visible');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Filter Logic Wrappers
const skillFilters = document.querySelectorAll('.skill-filter');
if (skillFilters.length > 0) {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            skillFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            const category = filter.getAttribute('data-category');
            skillCategories.forEach(categoryEl => {
                if (category === 'all' || categoryEl.getAttribute('data-category') === category) {
                    categoryEl.style.display = 'block';
                    setTimeout(() => categoryEl.classList.add('visible'), 50);
                } else {
                    categoryEl.style.display = 'none';
                    categoryEl.classList.remove('visible');
                }
            });
        });
    });
}

const projectFilters = document.querySelectorAll('.project-filter');
if (projectFilters.length > 0) {
    const projectCards = document.querySelectorAll('.project-card');
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            projectFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            const category = filter.getAttribute('data-category');
            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                    setTimeout(() => card.classList.add('visible'), 50);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Form Submission
const form = document.getElementById('inquiryForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            const myEmail = "shenoudatharwat0@gmail.com";
            const emailBody = `Name: ${name}\nUser Email: ${email}\n\nMessage:\n${message}`;
            const url = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = url;
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Intersection Observer
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-item, .project-card, .service-card, .skill-category, .section-header').forEach((el) => {
    observer.observe(el);
});

// Typing Effect (Multilingual Support)
function initTypingEffect() {
    const subtitleSpan = document.querySelector('.subtitle');
    if(!subtitleSpan) return;
    
    const isArabic = document.documentElement.lang === "ar";
    const texts = isArabic 
        ? ["مطور Full Stack .NET", "متخصص Backend", "مسئول الشبكات"]
        : ["Full Stack .NET Developer", "Backend Specialist",  "Network Administrator"];
        
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
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
}

// 3D Tilt Effect
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
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function resetHover() {
    this.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
}

// Particle Background
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if(!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    const mouse = { x: null, y: null, radius: 150 };
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
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 1;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 1;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 1;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 1;
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
            particlesArray.push(new Particle(x, y, directionX, directionY, size, 'white'));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
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
                    ctx.strokeStyle = document.body.classList.contains('light-mode') 
                        ? `rgba(33, 118, 163, ${opacityValue * 0.2})` 
                        : `rgba(50, 130, 184, ${opacityValue * 0.2})`;
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