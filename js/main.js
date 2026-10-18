
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
