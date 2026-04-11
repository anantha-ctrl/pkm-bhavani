document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hide Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    });

    // 2. Navbar Scroll Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. AOS Library is initialized directly in index.html for scroll animations
    // 4. Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navCollapse = document.getElementById('navbarNav');
                if (navCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // 5. Scroll to Top Visibility
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.remove('d-none');
        } else {
            scrollTopBtn.classList.add('d-none');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 6. Form Validation & Handling
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!contactForm.checkValidity()) {
            e.stopPropagation();
            contactForm.classList.add('was-validated');
            return;
        }

        // Get Form Data
        const name = document.getElementById('userName').value;
        const phone = document.getElementById('userPhone').value;
        const area = document.getElementById('userArea').value;
        const ward = document.getElementById('userWard').value;
        const subject = document.getElementById('userSubject').value;
        const message = document.getElementById('userMessage').value;

        // Construct WhatsApp Message
        const wpNumber = "918877889595"; // Replaced with placeholder match from sidebar
        const wpMessage = `*New Query from PMK Bhavani Website*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Area:* ${area}%0A*Ward No:* ${ward}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
        const wpLink = `https://wa.me/${wpNumber}?text=${wpMessage}`;

        // UI Feedback
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Connecting WhatsApp...';
        btn.disabled = true;

        // Redirect to WhatsApp after a small delay
        setTimeout(() => {
            window.open(wpLink, '_blank');
            
            btn.innerHTML = originalText;
            btn.disabled = false;
            successMsg.classList.remove('d-none');
            contactForm.reset();
            contactForm.classList.remove('was-validated');

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.classList.add('d-none');
            }, 5000);
        }, 1500);
    });

    // Active link highlighting on scroll (using logic since Bootstrap spy can be finicky)
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

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
});
