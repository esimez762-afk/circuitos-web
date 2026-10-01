// =========================================
// NAVEGACIÓN Y UTILIDADES COMPARTIDAS
// (se incluye en todas las páginas del sitio)
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // MENÚ DESPLEGABLE (clic para táctil, hover ya funciona por CSS)
    // =====================================
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        const boton = dropdown.querySelector(".dropbtn");
        if (!boton) return;

        boton.setAttribute("aria-expanded", "false");

        boton.addEventListener("click", (e) => {
            e.stopPropagation();
            const abierto = dropdown.classList.toggle("abierto");
            boton.setAttribute("aria-expanded", abierto ? "true" : "false");
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown.abierto").forEach(d => {
            d.classList.remove("abierto");
            const boton = d.querySelector(".dropbtn");
            if (boton) boton.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".dropdown.abierto").forEach(d => {
                d.classList.remove("abierto");
            });
        }
    });

    // =====================================
    // RESALTAR PÁGINA ACTUAL EN EL MENÚ
    // =====================================
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a").forEach(enlace => {
        const destino = enlace.getAttribute("href");
        if (destino === paginaActual) {
            enlace.classList.add("activo");
            enlace.setAttribute("aria-current", "page");
        }
    });

    // =====================================
    // MODO OSCURO
    // =====================================
    const raiz = document.documentElement;
    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "oscuro") {
        raiz.setAttribute("data-tema", "oscuro");
    }

    const header = document.querySelector("header");

    if (header) {
        const botonTema = document.createElement("button");
        botonTema.className = "tema-toggle";
        botonTema.type = "button";

        function actualizarIconoTema() {
            const esOscuro = raiz.getAttribute("data-tema") === "oscuro";
            botonTema.textContent = esOscuro ? "☀️" : "🌙";
            botonTema.setAttribute("aria-label", esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
        }

        botonTema.addEventListener("click", () => {
            const esOscuro = raiz.getAttribute("data-tema") === "oscuro";
            if (esOscuro) {
                raiz.removeAttribute("data-tema");
                localStorage.setItem("tema", "claro");
            } else {
                raiz.setAttribute("data-tema", "oscuro");
                localStorage.setItem("tema", "oscuro");
            }
            actualizarIconoTema();
        });

        actualizarIconoTema();
        header.appendChild(botonTema);
    }

    // =====================================
    // MIGAS DE PAN (breadcrumbs)
    // =====================================
    const MAPA_MIGAS = {
        "cd.html": ["Corriente Directa"],
        "ca.html": ["Corriente Alterna"],
        "dospuertos.html": ["Dos Puertos"],
        "recursos.html": ["Recursos"],
        "glosario.html": ["Glosario"],
        "practicas.html": ["Prácticas", "Simulaciones"],
        "thevenin-norton.html": ["Prácticas", "Thévenin y Norton"],
        "bnc-caiman.html": ["Prácticas", "Cable BNC-Caimán"]
    };

    const main = document.getElementById("contenido");
    const ruta = MAPA_MIGAS[paginaActual];

    if (main && ruta) {
        const migas = document.createElement("nav");
        migas.className = "migas";
        migas.setAttribute("aria-label", "Ruta de navegación");

        let html = `<a href="index.html">Inicio</a>`;

        ruta.forEach((texto, i) => {
            const esUltimo = i === ruta.length - 1;
            html += `<span class="separador">›</span>`;
            html += esUltimo
                ? `<span class="actual" aria-current="page">${texto}</span>`
                : `<span>${texto}</span>`;
        });

        migas.innerHTML = html;
        main.parentNode.insertBefore(migas, main);
    }

    // =====================================
    // BOTÓN "VOLVER ARRIBA"
    // =====================================
    const botonArriba = document.createElement("button");
    botonArriba.className = "volver-arriba";
    botonArriba.type = "button";
    botonArriba.setAttribute("aria-label", "Volver arriba");
    botonArriba.textContent = "↑";
    document.body.appendChild(botonArriba);

    window.addEventListener("scroll", () => {
        botonArriba.classList.toggle("visible", window.scrollY > 400);
    });

    botonArriba.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // =====================================
    // ANIMACIÓN DE APARICIÓN AL HACER SCROLL
    // =====================================
    const elementosAnimados = document.querySelectorAll(".animado");

    function mostrarElementos() {
        const altura = window.innerHeight;
        elementosAnimados.forEach(el => {
            const distancia = el.getBoundingClientRect().top;
            if (distancia < altura - 100) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", mostrarElementos);
    mostrarElementos(); // por si ya están visibles al cargar la página
});
