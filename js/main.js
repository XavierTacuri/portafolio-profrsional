
"use strict";

const form = document.querySelector("#contact-form");
const statusMessage = document.querySelector("#form-status");

const fields = [
    {
        id: "nombre",
        validate: (value) => value.length >= 2,
        message: "Escribe un nombre de al menos 2 caracteres."
    },
    {
        id: "email",
        validate: (value, input) =>
            input.validity.valid && value.length > 0,
        message: "Introduce un correo electrónico válido."
    },
    {
        id: "mensaje",
        validate: (value) => value.length >= 10,
        message: "El mensaje debe tener al menos 10 caracteres."
    }
];

function validateField(field) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(`${field.id}-error`);
    const value = input.value.trim();

    const isValid = field.validate(value, input);

    input.setAttribute("aria-invalid", String(!isValid));
    error.textContent = isValid ? "" : field.message;

    return isValid;
}

fields.forEach((field) => {
    const input = document.getElementById(field.id);

    input.addEventListener("blur", () => {
        validateField(field);
    });

    input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true") {
            validateField(field);
        }
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstInvalid = null;

    fields.forEach((field) => {
        const valid = validateField(field);

        if (!valid && firstInvalid === null) {
            firstInvalid = document.getElementById(field.id);
        }
    });

    if (firstInvalid) {
        statusMessage.textContent =
            "Revisa los campos señalados antes de continuar.";
        firstInvalid.focus();
        return;
    }

    statusMessage.textContent =
        "Formulario validado correctamente. " +
        "El envío de mensajes aún no está configurado.";
});

// =====================================
// FASE 7 - NAVEGACIÓN MÓVIL
// =====================================

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

function closeMenu() {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
        "aria-label",
        "Abrir menú de navegación"
    );
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Cerrar menú de navegación"
            : "Abrir menú de navegación"
    );
});

// Cerrar al seleccionar una sección
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Cerrar con Escape y devolver el foco al botón
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        navLinks.classList.contains("is-open")
    ) {
        closeMenu();
        menuToggle.focus();
    }
});

// Restablecer al pasar al diseño de escritorio
const desktopQuery = window.matchMedia("(min-width: 1024px)");

desktopQuery.addEventListener("change", (event) => {
    if (event.matches) {
        closeMenu();
    }
});

// =====================================
// FASE 9 - FILTRO DE PROYECTOS
// =====================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const filterStatus = document.querySelector("#filter-status");

const categoryNames = {
    todos: "todas las categorías",
    gestion: "Gestión y datos",
    automatizacion: "Automatización",
    fintech: "Fintech",
    web: "Web"
};

function applyFilter(filter) {
    let visibleCount = 0;

    projectCards.forEach((card) => {
        const matches =
            filter === "todos" || card.dataset.category === filter;

        card.classList.toggle("is-hidden", !matches);

        if (matches) {
            visibleCount += 1;
        }
    });

    if (filterStatus) {
        filterStatus.textContent =
            `Mostrando ${visibleCount} proyecto(s) de ` +
            `${categoryNames[filter] || filter}.`;
    }
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => {
            btn.classList.remove("is-active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");

        applyFilter(button.dataset.filter);
    });
});

// =====================================
// FASE 10 - AÑO AUTOMÁTICO EN EL FOOTER
// =====================================

const footerYear = document.querySelector("#footer-year");

if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
}

// =====================================
// FASE 11 - ENLACES PROFESIONALES
// =====================================
// Configuración documentada: añade aquí las URL reales cuando
// estén disponibles. Un enlace con valor vacío ("") no se muestra.

const SOCIAL_LINKS = {
    github: "https://github.com/XavierTacuri",
    linkedin: "https://www.linkedin.com/in/xavier-tacuri-sarmiento",
    email: ""
};

const SOCIAL_ICONS = {
    github:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    linkedin:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    email:
        '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>'
};

const SOCIAL_LABELS = {
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Correo electrónico"
};

function renderSocialLinks() {
    const containers = document.querySelectorAll(".social-links");

    if (!containers.length) {
        return;
    }

    containers.forEach((container) => {
        Object.entries(SOCIAL_LINKS).forEach(([key, url]) => {
            if (!url) {
                return;
            }

            const link = document.createElement("a");
            link.className = "social-link";
            link.href = key === "email" ? `mailto:${url}` : url;
            link.target = key === "email" ? "_self" : "_blank";
            link.rel = key === "email" ? "" : "noopener noreferrer";
            link.setAttribute("aria-label", SOCIAL_LABELS[key] || key);
            link.innerHTML = `${SOCIAL_ICONS[key] || ""}<span>${SOCIAL_LABELS[key] || key}</span>`;

            container.appendChild(link);
        });
    });
}

renderSocialLinks();

// =====================================
// FASE 12 - SECCIÓN ACTIVA EN LA NAVEGACIÓN
// =====================================

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(
    '.nav-links a[href^="#"], .footer-links a[href^="#"]'
);

function setActiveLink(id) {
    navAnchors.forEach((anchor) => {
        const isMatch = anchor.getAttribute("href") === `#${id}`;
        anchor.classList.toggle("is-active", isMatch);

        if (isMatch) {
            anchor.setAttribute("aria-current", "true");
        } else {
            anchor.removeAttribute("aria-current");
        }
    });
}

if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}
