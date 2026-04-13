document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hide Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    });

    // 2. Custom Navigation Logic
    const menuToggle = document.getElementById('menuToggle');
    const navDropdown = document.getElementById('navDropdown');
    const politicalNav = document.querySelector('.political-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navDropdown.classList.toggle('active');
        });
    }

    // Scroll Handling for Navbar
    window.addEventListener('scroll', () => {
        if (!politicalNav) return;
        if (window.scrollY > 50) {
            politicalNav.classList.add('scrolled');
        } else {
            politicalNav.classList.remove('scrolled');
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
                if (navDropdown && navDropdown.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navDropdown.classList.remove('active');
                }
            }
        });
    });

    // 6. Mentor Image Carousel (Automatic Rotation)
    const mentorCarousels = document.querySelectorAll('.mentor-carousel');
    mentorCarousels.forEach(carousel => {
        const images = JSON.parse(carousel.dataset.images);
        let currentIndex = 0;
        
        setInterval(() => {
            // Create a temporary image for crossfade
            const nextIndex = (currentIndex + 1) % images.length;
            const nextImg = document.createElement('img');
            nextImg.src = images[nextIndex];
            nextImg.className = 'next-img';
            nextImg.style.opacity = '0';
            nextImg.style.position = 'absolute';
            nextImg.style.top = '0';
            nextImg.style.left = '0';
            nextImg.style.width = '100%';
            nextImg.style.height = '100%';
            nextImg.style.objectFit = 'cover';
            nextImg.style.transition = 'opacity 1s ease-in-out';
            
            carousel.appendChild(nextImg);
            
            // Trigger Fade
            setTimeout(() => {
                nextImg.style.opacity = '1';
                const currentImg = carousel.querySelector('img.active');
                if (currentImg) currentImg.style.opacity = '0';
                
                // Cleanup after transition
                setTimeout(() => {
                    if (currentImg) currentImg.remove();
                    nextImg.classList.add('active');
                    nextImg.classList.remove('next-img');
                    currentIndex = nextIndex;
                }, 1000);
            }, 50);
            
        }, 4000 + Math.random() * 2000); // Random offset for organic feel
    });

    // 7. Scroll to Top Visibility
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

        // Save to LocalStorage (Intranet Connection)
        const queries = JSON.parse(localStorage.getItem('pmk_queries') || '[]');
        queries.push({
            name: name,
            phone: phone,
            area: area,
            ward: ward,
            subject: subject,
            message: message,
            timestamp: new Date().toLocaleString('ta-IN')
        });
        localStorage.setItem('pmk_queries', JSON.stringify(queries));

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
