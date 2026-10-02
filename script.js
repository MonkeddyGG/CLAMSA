document.addEventListener("DOMContentLoaded", () => {

    // 1. PRELOADER (Carga de la página)
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // 2. HEADER STICKY & ACTIVE LINKS
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active-link');
            }
        });
    });

    // 3. MENÚ MÓVIL
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Cerrar menú al elegir una opción
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // 4. ANIMACIONES AL HACER SCROLL (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Si el elemento contiene contadores numéricos
                if (entry.target.classList.contains('stats-grid')) {
                    runCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-up, .stats-grid').forEach(el => {
        observer.observe(el);
    });

    // 5. ANIMACIÓN DE CONTADORES NUMÉRICOS
    let countersRan = false;
    function runCounters() {
        if (countersRan) return;
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // a menor número, más rápido

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        countersRan = true;
    }

    // 6. ACTUALIZAR AÑO FOOTER
    document.getElementById('year').textContent = new Date().getFullYear();

    // 7. GESTIÓN DEL FORMULARIO Y TOAST NOTIFICATION
    const form = document.getElementById('quote-form');
    const toast = document.getElementById('toast');
    const toastClose = document.querySelector('.toast-close');

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000); // Ocultar después de 5 segundos
    }

    if (toastClose) {
        toastClose.addEventListener('click', () => toast.classList.remove('show'));
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Estado de carga
            btn.innerHTML = '<span>Procesando...</span> <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            // Simular envío a servidor (API)
            setTimeout(() => {
                showToast(); // Mostrar notificación elegante
                form.reset(); // Limpiar formulario
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1800);
        });
    }
});