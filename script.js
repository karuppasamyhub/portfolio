document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const backToTopBtn = document.getElementById('back-to-top');
    const scrollProgress = document.querySelector('.scroll-progress');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const openContactDialogBtn = document.getElementById('open-contact-dialog');
    const contactDialog = document.getElementById('contact-dialog');
    const closeContactDialogBtn = document.getElementById('close-contact-dialog');
    const sendEmailBtn = document.getElementById('send-email');
    const sendWhatsAppBtn = document.getElementById('send-whatsapp');
    const typewriterElement = document.getElementById('typewriter');
    const textsToType = ['IoT Enthusiast', 'Full-Stack Developer', 'ECE Student'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Typewriter effect
    function type() {
        const currentText = textsToType[textIndex];
        if (!isDeleting && charIndex <= currentText.length) {
            typewriterElement.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex >= 0) {
            typewriterElement.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(type, 50);
        } else if (!isDeleting && charIndex > currentText.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 1000);
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textsToType.length;
            setTimeout(type, 500);
        }
    }
    type();

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Navigation link active state
    function setActiveNavLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(currentSection)) {
                item.classList.add('active');
            }
        });
    }

    // Intersection Observer for section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.timeline-item').forEach(item => {
                    item.classList.add('visible');
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll progress bar
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // Back to top button visibility
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Load theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Contact dialog handling
    openContactDialogBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactDialog.showModal();
    });

    closeContactDialogBtn.addEventListener('click', () => {
        contactDialog.close();
    });

    sendEmailBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
        window.location.href = `mailto:karuppasamy.t2005@gmail.com?subject=${subject}&body=${body}`;
        contactDialog.close();
    });

    sendWhatsAppBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const text = encodeURIComponent(`Hi Karuppasamy, I'm ${name} (${email}). ${message}`);
        window.location.href = `https://wa.me/+916385478936?text=${text}`;
        contactDialog.close();
    });

    // Achievement and Project dialog handling
    document.querySelectorAll('.achievement-card, .project-card').forEach(card => {
        card.addEventListener('click', () => {
            const dialogId = card.getAttribute('data-dialog-id');
            const dialog = document.getElementById(dialogId);
            if (dialog) {
                dialog.showModal();
            }
        });
    });

    document.querySelectorAll('.close-dialog').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('dialog').close();
        });
    });

    // Close dialogs with Escape key
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dialog.close();
            }
        });
    });

    // Scroll event listeners
    window.addEventListener('scroll', () => {
        setActiveNavLink();
        updateScrollProgress();
        toggleBackToTopButton();
    });

    // Initial calls
    setActiveNavLink();
    updateScrollProgress();
    toggleBackToTopButton();

    // Custom cursor with bubble animation
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    let lastBubbleTime = 0;
    const bubbleInterval = 50; // Milliseconds between bubbles

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        const currentTime = Date.now();
        if (currentTime - lastBubbleTime >= bubbleInterval) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.style.left = e.clientX + 'px';
            bubble.style.top = e.clientY + 'px';
            document.body.appendChild(bubble);

            // Remove bubble after animation completes
            setTimeout(() => {
                bubble.remove();
            }, 1000);

            lastBubbleTime = currentTime;
        }
    });

    document.querySelectorAll('a, button, .cta-button, .nav-link, .theme-toggle, .mobile-menu-btn, .achievement-card, .project-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });
});