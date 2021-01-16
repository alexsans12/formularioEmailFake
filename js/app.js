// Variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");
const fragment = new DocumentFragment();

// Variables para campos
const email = document.querySelector("#email"); 
const asunto = document.querySelector("#asunto"); 
const mensaje = document.querySelector("#mensaje"); 

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

    // Reinicia el formulario
    btnReset.addEventListener("click", resetearFormulario);

    // Enviar email
    formulario.addEventListener("submit", enviarEmail);
}

// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// Valida el formulario
function validarFormulario(evt) {

    if(evt.target.value.length) {
        // Elimina los errores
        const error = document.querySelector("p.error");
        if(error) {
            error.remove();
        }

        evt.target.classList.remove("border", "border-red-500");
        evt.target.classList.add("border", "border-green-500");
    } else {
        evt.target.classList.remove("border", "border-green-500");
        evt.target.classList.add("border", "border-red-500");

        mostrarError("Todos los campos son obligatorios");
    }

    if(evt.target.type === "email") {

        if(er.test( evt.target.value )) {
            // Elimina los errores
            const error = document.querySelector("p.error");
            if(error) {
                error.remove();
            }

            evt.target.classList.remove("border", "border-red-500");
            evt.target.classList.add("border", "border-green-500");
            console.log("Email valido");
        } else {
            evt.target.classList.remove("border", "border-green-500");
            evt.target.classList.add("border", "border-red-500");
            mostrarError("Email no válido");
        }
    }

    if(er.test( email.value )  && asunto.value !== "" && mensaje.value !== "") {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("border", "border-red-500", "bg-red-100", "text-red-500", "p-3", "mt-5", "error");

    const errores = document.querySelectorAll(".error");

    if(errores.length === 0) {
        fragment.appendChild(mensajeError);
        formulario.appendChild(fragment);
    }
}

// Envia el email
function enviarEmail(evt) {
    evt.preventDefault();

    // Mostrar spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    // Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        spinner.style.display = "none";

        // Mensaje que dice que se envio correctamente
        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje se envió correctamente";
        parrafo.classList.add("text-center", "my-10", "p-2", "text-white", "bg-green-500", "font-bold", "uppercase");
        
        // Inserta el parrafo
        fragment.appendChild(parrafo);
        formulario.insertBefore(fragment, spinner);

        setTimeout(() => {
            parrafo.remove(); // Eliminar el mensaje de éxito
            resetearFormulario();
        }, 5000);
    }, 3000);
}

// Función que resetea el formulario
function resetearFormulario(evt) {
    evt.preventDefault();
    formulario.reset();

    iniciarApp();
}