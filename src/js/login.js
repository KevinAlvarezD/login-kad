import {alertError, alertSuccess} from './alerts'

const url = `http://localhost:3000/users`
const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

(function() {
    const userLocal = localStorage.getItem('userLocal')
    //validar si el usuario existe, si no redirigir al login
    if (userLocal != null) {
        window.location.href = "/src/pages/dashboard.html"
    }
})()

form.addEventListener ('submit', async (event)=>{
    event.preventDefault()
    const user = await checkEmail(email)
    if (user === false) {
        alertError("Usuario no registrado")
    }else {
        if (user.password === password.value) {
            alertSuccess("Bienvenido")
            window.location.href = "/src/pages/dashboard.html"
        } else {
            alertError("Contraseña o usuario incorrecta")
        }
    }
    
})

async function checkEmail (email) {
    const response = await fetch (`${url}?email=${email.value}`)
    const data = await response.json()
    if (data.length === 1) {
        return data[0]
    } else {
        alertError("El email ya existe")
        return false
    }
}

