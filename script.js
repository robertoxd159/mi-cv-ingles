document.addEventListener('DOMContentLoaded', () => {
    // TU NOMBRE AQUÍ
    const text = "Roberto";
    
    const typingElement = document.getElementById('typing-name');
    const typingDelay = 100; // Velocidad de escritura (ms)
    const startDelay = 500;  // Retraso antes de empezar

    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            typingElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            // Opcional: Detener el parpadeo del cursor al terminar
            // document.querySelector('.cursor').style.display = 'none';
        }
    }

    // Iniciar la animación después del retraso inicial
    setTimeout(type, startDelay);

    // --- Lógica Modo Claro / Oscuro ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn.querySelector('i');

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Cambiar icono
        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // --- Animación de Aparición al hacer Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Lógica de la Galería (Modal) ---
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');

    // Modal de Instrucciones
    const instructionsModal = document.getElementById('instructionsModal');
    const instructionsBody = document.getElementById('instructionsBody');

    // Datos de las galerías (REEMPLAZA CON TUS FOTOS REALES)
    const galleries = {
        "restaurante_qr": [
            { src: "img/41.png", caption: "QR scanning with integrated camera" },
            { src: "img/42.png", caption: "Digital Menu View" },
            { src: "img/43.png", caption: "User Login (Waiter/Chef/Admin)" },
            { src: "img/44.png", caption: "Waiter Panel: Order Management" },
            { src: "img/45.png", caption: "Kitchen Panel (KDS): Dish Status" },
            { src: "img/46.png", caption: "Admin Panel: Balance and Earnings" },
            { src: "img/47.png", caption: "Admin: Add products to menu" },
            { src: "img/48.png", caption: "Admin: Staff Management" },
            { src: "img/49.png", caption: "Admin: Table and QR Management" },
            { src: "img/50.png", caption: "System Settings" },
            { src: "img/51.png", caption: "Dish selection and details" },
            { src: "img/52.png", caption: "Successful order confirmation" }
        ],
        "restobar_qr_ts": [
            { src: "img/53.png", caption: "Restricted access (QR scan required)" },
            { src: "img/54.png", caption: "Menu with search and filtering" },
            { src: "img/55.png", caption: "Customer details & Out of stock indication" },
            { src: "img/56.png", caption: "Order registered successfully" },
            { src: "img/57.png", caption: "Staff Login" },
            { src: "img/58.png", caption: "Waiter Panel: New Order & Notifications" },
            { src: "img/59.png", caption: "Waiter Panel: Order Accepted" },
            { src: "img/60.png", caption: "Waiter Panel: Order Finished" },
            { src: "img/61.png", caption: "Waiter Panel: Bill Requested" },
            { src: "img/62.png", caption: "Admin Panel: Menu & Stock Management" },
            { src: "img/63.png", caption: "Worker Dashboard: Earnings" },
            { src: "img/64.png", caption: "Boss Login" },
            { src: "img/65.png", caption: "Boss Dashboard: Total Earnings & Stats" }
        ],
        "landing_servicios": [
            { src: "img/37.png", caption: "Who I am and Technical Services" },
            { src: "img/38.png", caption: "Portfolio of Pages and Bots" },
            { src: "img/39.png", caption: "Testimonials and FAQs" },
            { src: "img/40.png", caption: "TikTok Visualization" }
        ],
        "convenciones": [
            { src: "img/1.png", caption: "Main View" },
            { src: "img/2.png", caption: "Main View - Super Sentai" },
            { src: "img/3.png", caption: "Interactive hover effect" },
            { src: "img/4.png", caption: "Main View - Power Rangers" },
            { src: "img/5.png", caption: "Interactive hover effect" },
            { src: "img/6.png", caption: "Main View - Comic-Con" }
        ],
        "navidad": [
            { src: "img/7.png", caption: "Welcome screen with action button" },
            { src: "img/8.png", caption: "Message reveal and music playback" }
        ],
        "repositorio": [
            { src: "img/9.png", caption: "Main view with 6-category grid" },
            { src: "img/10.png", caption: "Main view with 6-category grid" },
            { src: "img/11.png", caption: "Movies main view" },
            { src: "img/12.png", caption: "Services main view" },
            { src: "img/13.png", caption: "About Me main view" },
            { src: "img/14.png", caption: "Main view about page info" }
        ],
        "cumpleanos": [
            { src: "img/15.png", caption: "General view with photos and message side by side" },
            { src: "img/16.png", caption: "Close-up of congratulatory message" }
        ],
        "libros": [
            { src: "img/17.png", caption: "Main view with categories 1 to 5" },
            { src: "img/18.png", caption: "Visualization of available books by type" },
            { src: "img/19.png", caption: "Visualization of available books by type" }
        ],
        "serie": [
            { src: "img/20.png", caption: "Home with director typing effect" },
            { src: "img/21.png", caption: "Actors Section" },
            { src: "img/22.png", caption: "Soundtrack Section" },
            { src: "img/23.png", caption: "Followers Section" },
            { src: "img/24.png", caption: "Behind the scenes photo gallery" },
            { src: "img/25.png", caption: "Directors Section" },
            { src: "img/26.png", caption: "Episode list" },
            { src: "img/27.png", caption: "Contact form" }
        ],
        "novia": [
            { src: "img/28.png", caption: "Interface with Yes and No buttons" },
            { src: "img/29.png", caption: "Moving message when pressing No" },
            { src: "img/30.png", caption: "Confirmation message when managing to press Yes" }
        ],
        "cv_moderno": [
            { src: "img/31.png", caption: "Navigation with sections" },
            { src: "img/32.png", caption: "About Me View" },
            { src: "img/33.png", caption: "Skills View" },
            { src: "img/34.png", caption: "Experience View" },
            { src: "img/35.png", caption: "Portfolio View" },
            { src: "img/36.png", caption: "Contact Form" }
        ]
    };

    // Datos de Instrucciones (Credenciales)
    const projectInstructions = {
        "restaurante_qr": `
            <p>You can see how it works right now:</p>
            <ul>
                <li><strong>👉 Client Demo:</strong> <a href="https://pedidos-qr-demo.page.gd/" target="_blank">https://pedidos-qr-demo.page.gd/</a></li>
                <li><strong>👉 Direct Menu:</strong> <a href="https://pedidos-qr-demo.page.gd/menu.php?mesa=1" target="_blank">View Menu (Table 1)</a></li>
                <li><strong>👉 Admin Panel:</strong> <a href="https://pedidos-qr-demo.page.gd/admin.php" target="_blank">Go to Panel</a> <br>User: <code>admin</code> • Password: <code>admin</code></li>
                <li><strong>👉 Waiter Panel:</strong> <a href="https://pedidos-qr-demo.page.gd/mozo.php" target="_blank">Go to Panel</a> <br>User: <code>mozo</code> • Password: <code>mozo</code></li>
                <li><strong>👉 Kitchen/KDS:</strong> <a href="https://pedidos-qr-demo.page.gd/cocina.php" target="_blank">Go to Panel</a> <br>User: <code>chef</code> • Password: <code>chef</code></li>
            </ul>
        `,
        "restobar_qr_ts": `
            <p>Explore the different roles in the system:</p>
            <ul>
                <li><strong>👉 Client Demo:</strong> <a href="https://restobar-app-ruby.vercel.app/" target="_blank">https://restobar-app-ruby.vercel.app/</a></li>
                <li><strong>👉 Waiter Panel:</strong> <a href="https://restobar-app-ruby.vercel.app/mozo" target="_blank">Go to Panel</a> <br>Password: <code>1234</code></li>
                <li><strong>👉 Kitchen Panel:</strong> <a href="https://restobar-app-ruby.vercel.app/cocina" target="_blank">Go to Panel</a> <br>Password: <code>1234</code></li>
                <li><strong>👉 Dashboard:</strong> <a href="https://restobar-app-ruby.vercel.app/dashboard" target="_blank">Go to Panel</a> <br>Password: <code>1234</code></li>
                <li><strong>👉 Admin (Menu):</strong> <a href="https://restobar-app-ruby.vercel.app/admin" target="_blank">Go to Panel</a> <br>Password: <code>1234</code></li>
                <li><strong>👉 Boss Panel:</strong> <a href="https://restobar-app-ruby.vercel.app/jefe" target="_blank">Go to Panel</a> <br>Password: <code>9999</code></li>
            </ul>
        `
    };

    let currentProject = [];
    let currentIndex = 0;

    // Abrir Modal
    document.querySelectorAll('.open-gallery').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            if (galleries[projectId]) {
                currentProject = galleries[projectId];
                currentIndex = 0;
                showImage(currentIndex);
                modal.style.display = "block";
            }
        });
    });

    // Abrir Modal de Instrucciones
    document.querySelectorAll('.open-instructions').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            if (projectInstructions[projectId]) {
                instructionsBody.innerHTML = projectInstructions[projectId];
                instructionsModal.style.display = "block";
            }
        });
    });

    function showImage(index) {
        modalImg.src = currentProject[index].src;
        captionText.innerHTML = currentProject[index].caption;
    }

    // Controles Siguiente / Anterior
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentProject.length;
        showImage(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentProject.length) % currentProject.length;
        showImage(currentIndex);
    });

    // Cerrar Modales (Cualquiera)
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.style.display = "none");
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) { e.target.style.display = "none"; }
    });
});
