import {alertError, alertSuccess} from './alerts'
const url = `http://localhost:3000/users`
const form = document.getElementById("register-form")
const name = document.getElementById("name")
const nit = document.getElementById("nit")
const email = document.getElementById("email")
const image = document.getElementById("image")
const password = document.getElementById("password")
const ConfirmPassword = document.getElementById("ConfirmPassword")

form.addEventListener ("submit", async (event) => {
    event.preventDefault()
    const emailVerify = await checkEmail(email)
    const passwordVerify = checkPassword(password, ConfirmPassword)
    if (emailVerify === true && passwordVerify === true) {
        await registerUser(name, nit, email, password, image)
        window.location.href = "/"
    }
})


function checkPassword (password, ConfirmPassword) {
    if (password.value !== ConfirmPassword.value) {
        alertError("Las contraseñas no coinciden")
        return false
    } else {
        return true
    }
}

async function checkEmail (email) {
    const response = await fetch (`${url}?email=${email.value}`)
    const data = await response.json()
    if (data.length === 0) {
        return true
    } else {
        alertError("El email ya existe")
        return false
    }
}

async function registerUser (name, nit, email, password, image) {
    const newUser = {
        name: name.value,
        nit: nit.value,
        email: email.value,
        image: image.value,
        password:  password.value,
    }
    await fetch (url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })   
}
