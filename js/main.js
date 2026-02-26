/* ===========================
   MAIN.JS — Portfolio Interactions
   =========================== */

// ===== THEME TOGGLE =====
(function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', saved);

    toggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
})();

// ===== NAVBAR SCROLL =====
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Scrolled state
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link highlight
        let current = '';
        sections.forEach(section => {
            const sTop = section.offsetTop - 100;
            if (window.scrollY >= sTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
})();

// ===== MOBILE MENU =====
(function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('mobileOverlay');

    function closeMenu() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            hamburger.classList.add('open');
            navLinks.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    overlay.addEventListener('click', closeMenu);

    // Close on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
})();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== REVEAL ON SCROLL =====
(function initReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
})();

// ===== SKILL BAR ANIMATION =====
(function initSkillBars() {
    const bars = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
})();

// ===== COUNTER ANIMATION =====
(function initCounters() {
    const counters = document.querySelectorAll('.stat-num');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                let current = 0;
                const duration = 1800;
                const step = target / (duration / 16);

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current);
                }, 16);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
})();

// ===== SKILLS TABS =====
(function initSkillsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panel = document.getElementById('tab-' + targetTab);
            if (panel) {
                panel.classList.add('active');

                // Animate skill bars in the new panel
                panel.querySelectorAll('.skill-fill').forEach(bar => {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width') + '%';
                    }, 100);
                });

                // Reveal cards in new panel
                panel.querySelectorAll('.reveal').forEach((el, i) => {
                    el.classList.remove('visible');
                    setTimeout(() => el.classList.add('visible'), i * 80 + 50);
                });
            }
        });
    });
})();

// ===== PROJECT FILTER =====
(function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach((card, i) => {
                const categories = card.getAttribute('data-category') || '';
                const shouldShow = filter === 'all' || categories.includes(filter);

                if (shouldShow) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight; // force reflow
                    card.style.animation = `fadeIn 0.4s ease ${i * 0.05}s both`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();

// ===== TYPING ANIMATION =====
(function initTyping() {
    const el = document.getElementById('typedName');
    if (!el) return;

    const words = [
        'Fullstack Developer',
        'Laravel Expert',
        'Node.js Developer',
        'Web Architect',
        'API Specialist',
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const baseSpeed = 90;
    const deleteSpeed = 50;
    const pauseMs = 2000;

    function type() {
        const current = words[wordIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deleteSpeed : baseSpeed;

        if (!isDeleting && charIndex === current.length) {
            speed = pauseMs;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    // Start with a slight delay
    setTimeout(type, 600);
})();

// ===== CONTACT FORM — REDIRECT TO WHATSAPP =====
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const WA_NUMBER = '6287878997700'; // +62 878-7899-7700

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        const btn = document.getElementById('submitBtn');
        const originalHTML = btn.innerHTML;

        // Loading state
        btn.innerHTML = `<span>Membuka WhatsApp...</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".3"/><path d="M21 12a9 9 0 00-9-9"/></svg>`;
        btn.disabled = true;

        // Build WhatsApp message
        const waText = `Halo Syauqi! 👋\n\n*Nama:* ${name}\n*Email:* ${email}\n*Subjek:* ${subject}\n\n*Pesan:*\n${message}`;
        const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;

        setTimeout(() => {
            window.open(waUrl, '_blank');
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            form.reset();
            showToast('✅ WhatsApp dibuka! Silakan kirim pesannya.', 'success');
        }, 600);
    });
})();

// ===== BACK TO TOP SMOOTH =====
(function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ===== ADD CSS KEYFRAME FOR SPIN =====
(function addSpinKeyframes() {
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
})();
