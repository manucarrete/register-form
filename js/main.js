document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formRegistro");
    const pasos = document.querySelectorAll(".paso");
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const progressBar = document.querySelector(".progress-bar")
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    let pasoActual = 1;


    function actualizarBarraDeProgreso() {
        const progreso = ((pasoActual - 1) / (pasos.length - 1)) * 100;
        console.log(progreso);
        progressBar.style = `width: ${progreso}%`
    }

    function pasoAnterior() {
        pasos[pasoActual - 1].style.display = "none";
        pasoActual--;
        if (pasoActual < 1) {
            pasoActual = 1;
        }
        pasos[pasoActual - 1].style.display = "block";
        actualizarBarraDeProgreso();
    }

    botonesSiguiente.forEach((boton) => {
        boton.addEventListener("click", siguientePaso);
    });

    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", pasoAnterior);
    });

    formulario.addEventListener("submit", (e) => e.preventDefault());

    function validarPasoActual() {
        const paso = document.querySelector('.paso[data-paso="' + pasoActual + '"]');
        const inputs = paso.querySelectorAll('input[required], select[required]');
        let esValido = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                esValido = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        // Validación específica para email
        const email = paso.querySelector('input[type="email"]');
        if (email && !email.value.includes('@')) {
            email.classList.add('is-invalid');
            esValido = false;
        } else {
            email?.classList.remove('is-invalid');
        }

        // Validación específica para teléfono
        const telefono = paso.querySelector('input[type="tel"]');
        if (telefono && !/^\d{9}$/.test(telefono.value)) {
            telefono.classList.add('is-invalid');
            esValido = false;
        } else {
            telefono?.classList.remove('is-invalid');
        }

        return esValido;
    }

    function siguientePaso() {
        if (!validarPasoActual()) return;
        pasos[pasoActual - 1].style.display = "none";
        pasoActual++;
        if (pasoActual > pasos.length) {
            pasoActual = pasos.length;
        }
        pasos[pasoActual - 1].style.display = "block";
        actualizarBarraDeProgreso();
    }

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validarPasoActual()) return;

        // Aquí puedes añadir el cálculo del presupuesto basado en las selecciones
        calcularPresupuesto();
    });

    function calcularPresupuesto() {
        // Implementa tu lógica de cálculo aquí
        // Por ejemplo, basado en el servicio seleccionado y la urgencia
        let presupuesto = 100; // Base

        const servicio = document.getElementById("servicio").value;
        if (servicio === "completo") presupuesto += 50;

        const urgencia = document.querySelector('input[name="urgencia"]:checked').value;
        if (urgencia === "media") presupuesto += 20;
        else if (urgencia === "alta") presupuesto += 50;

        alert("El presupuesto final es: " + presupuesto + "€");
    }
});
