document.addEventListener("DOMContentLoaded", function () {
    const pasos = document.querySelectorAll(".paso");
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    const botonFinalizar = document.querySelector(".btn-finalizar");
    const progressBar = document.querySelector(".progress-bar");
    let pasoActual = 1;

    // Actualizar la barra de progreso
    function actualizarBarraDeProgreso() {
        const progreso = ((pasoActual - 1) / (pasos.length - 1)) * 100;
        console.log(progreso);
        progressBar.style.width = `${progreso}%`;
    }

    // Mostrar el paso actual
    function mostrarPaso() {
        pasos.forEach((paso, index) => {
            paso.style.display = index === pasoActual - 1 ? "block" : "none";
        });
        actualizarBarraDeProgreso();
    }

    // Validar campos del paso actual
    function validarCampos() {
        if (pasoActual === 1) {
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const regexTelefono = /^\d{7,14}$/;

            if (!nombre || !regexEmail.test(email) || !regexTelefono.test(telefono) || !validarTipoCliente() ) {
                alert("Por favor, completa todos los campos con información válida.");
                return false;
            }
        }
        return true;
    }
    // Fui incapaz de validad directamente con bootstrap o con querySelector, por eso lo hago individual
    function validarTipoCliente() {
        var radios = document.getElementsByName('tipoCliente');
        var seleccionado = false;

        for(var i = 0; i < radios.length; i++) {
            if(radios[i].checked) {
                seleccionado = true; 
            }
        }
        return seleccionado;    
    }
    
    // Navegación entre pasos
    botonesSiguiente.forEach(boton => {
        boton.addEventListener("click", function (e) {
            e.preventDefault();
            if (pasoActual == 2) {
                const servicioSeleccionado = document.getElementById('servicio').value;
                if (!servicioSeleccionado) {
                    alert("Por favor, selecciona un servicio.");
                    return;
                }
            } 
            if (validarCampos()) {
                pasoActual++;
                if (pasoActual > pasos.length) {
                    pasoActual = pasos.length;
                }
                mostrarPaso();
            }
        });
    });

    botonesAnterior.forEach(boton => {
        boton.addEventListener("click", function (e) {
            e.preventDefault();
            pasoActual--;
            if (pasoActual < 1) {
                pasoActual = 1;
            }
            mostrarPaso();
        });
    });

    // Calcular y mostrar el presupuesto
    function calcularPresupuesto() {
        const tipoCliente = document.querySelector('input[name="tipoCliente"]:checked').value;
        console.log
        const servicioSeleccionado = document.getElementById('servicio').value;
        const hosting = document.getElementById('hosting').checked;
        const dominio = document.getElementById('dominio').checked;
        
        let costoBase = 0;
        switch (servicioSeleccionado) {
            case 'mantenimiento': costoBase = 1000;
                break;
            case 'continuar': costoBase = 2000;
                break;
            case 'desdeCero': costoBase = 3000;
                break;
        }
        
        let costoComplementos = 0;
        if (hosting) costoComplementos += 300;
        if (dominio) costoComplementos += 150;

        let presupuesto = costoBase + costoComplementos;

        // Si el cliente es particular, se añade el 21% de IVA
        if (tipoCliente === 'particular') {
            presupuesto *= 1.21;
        }

        alert(`El presupuesto estimado es: $${presupuesto.toFixed(2)}`);
    }

    botonFinalizar.addEventListener("click", function(e) {
        e.preventDefault();
        if (validarCampos()) {
            calcularPresupuesto();
        }
    });

    mostrarPaso();
});
