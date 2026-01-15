// Initialize EmailJS
(function () {
    emailjs.init('Cj6fBkkArtLP6vpM2'); // Public Key
})();

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const icon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle icon between bars and times (close)
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        });
    });

    // --- Sticky Navbar ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Active Link on Scroll ---
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add your animation classes here
                if (entry.target.classList.contains('fade-in-left')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
                if (entry.target.classList.contains('fade-in-right')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }

                // Skill Bars Animation
                if (entry.target.classList.contains('skills-container')) {
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0'; // Reset to 0 first
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade In Elements Setup
    const fadeLefts = document.querySelectorAll('.fade-in-left');
    const fadeRights = document.querySelectorAll('.fade-in-right');
    const skillContainer = document.querySelector('.skills-container');

    // Helper to set initial state
    const setInitialStyles = (el, dir) => {
        el.style.opacity = '0';
        el.style.transition = 'all 1s ease';
        el.style.transform = dir === 'left' ? 'translateX(-50px)' : 'translateX(50px)';
        observer.observe(el);
    };

    fadeLefts.forEach(el => setInitialStyles(el, 'left'));
    fadeRights.forEach(el => setInitialStyles(el, 'right'));
    if (skillContainer) observer.observe(skillContainer);


    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactform');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('comments').value;

            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'mubianasaya@gmail.com'
            };

            emailjs.send('service_m8g9yc5', 'template_3jvir6m', templateParams)
                .then(function () {
                    document.getElementById('successModal').style.display = 'flex';
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, function (error) {
                    alert('Failed to send message. Please try again.');
                    console.error('EmailJS Error:', error);
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }
});

// Modal Close Function
window.closeModal = function () {
    const modal = document.getElementById('successModal');
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.opacity = '1'; // Reset for next time
    }, 300);
}