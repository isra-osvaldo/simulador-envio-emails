document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }

    // console.log(email)

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')
    const inputCC = document.querySelector('#cc')

    // Asignar eventos
    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)
    inputCC.addEventListener('input', validar)

    formulario.addEventListener('submit', enviarEmail)

    // Evento click en el botón reset
    btnReset.addEventListener('click', function(e) {
        e.preventDefault() 
        resetFormulario()
    })

    function enviarEmail(e) {
        e.preventDefault()
        
        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            resetFormulario()

            // Crear alerta de envío correcto
            const alertaExito = document.createElement('p')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase')
            alertaExito.textContent = 'Email enviado correctamente'

            formulario.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove()
            }, 3000)


        }, 3000)

    }

    function validar(e) {

        const valor = e.target.value.trim()

        if (e.target.id != 'cc' && valor === '') {
            // Todos los campos excepto CC son obligatorios
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = ''
            comprobarObjetoEmail()
            return
        }

        // Validar el email
        if (e.target.id === 'email' && !validarEmail(valor)) {
            mostrarAlerta('El email no es válido', e.target.parentElement)
            email[e.target.name]  = ''
            comprobarObjetoEmail()
            return
        }

        if (e.target.id === 'cc' && valor != '' && !validarEmail(valor)) {
            // Sólo se valida si tiene contenido
            mostrarAlerta('El email CC no es válido', e.target.parentElement)
            email[e.target.name] = ''
            comprobarObjetoEmail()
            return
        }

        limpiarAlerta(e.target.parentElement)

        // Asignar los valores al objeto
        email[e.target.name] = e.target.value.trim().toLowerCase()

        // Comprobar el objeto de email
        comprobarObjetoEmail()

    }

    function mostrarAlerta(mensaje, referencia) {
        // Comprobar si ya existe una alerta
        limpiarAlerta(referencia)

        // Generar alerta en HTML
        const error = document.createElement('p')
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'rounded-lg')
        
        // Inyectar el error al formulario
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600')
        if (alerta) {
            alerta.remove()
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarObjetoEmail() {

        // Crear una copia del objeto sin el campo CC opcional
        const { cc, ...camposObligatorios } = email

        if (Object.values(camposObligatorios).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true
            return
        } 

        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false
    }

    function resetFormulario() {
        email.email = ''
        email.cc = ''
        email.asunto = ''
        email.mensaje = ''

        formulario.reset()
        comprobarObjetoEmail()
    }
})