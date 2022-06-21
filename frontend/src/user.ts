import { loginForm } from "./user/login";
import { signupForm } from "./user/signup";
import { forgotForm } from "./user/forgot";
import { resetForm } from "./user/resetPass";
import { product } from "./shoppingCart/products/products"


const loginBtn = document.querySelector('#login') as HTMLAnchorElement;
const logoutBtn = document.querySelector('#logout') as HTMLButtonElement;
if (loginBtn && localStorage.getItem('login') && logoutBtn) {
    if (loginBtn.style.display === "none") {
        loginBtn.style.display = "block";
    } else {
        logoutBtn.style.display = 'block';
        loginBtn.style.display = "none";
    }
}
if (logoutBtn) {
    logoutBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('login');
        if (logoutBtn.style.display === "none") {
            logoutBtn.style.display = "block";
        } else {
            logoutBtn.style.display = "none";
        } loginBtn.style.display = 'block';
    }
}

const l = document.getElementById('loginPage');
if (l && localStorage.getItem('login')) {
    window.location.href = 'shoppingApp.html';
}

const signupFormEle = document.querySelector('#signupSubmit') as HTMLButtonElement;
if (signupFormEle !== null) {
    signupFormEle.addEventListener('click', (e: Event) => {
        e.preventDefault();
        signupForm(signupFormEle);
    })
}
const form = document.getElementById('resetPage');
if (form !== null) {
    form!.onload = async (e) => {
        e.preventDefault();
        const query = window.location.search;
        const url = new URLSearchParams(query);
        const token = await url.get('token')!;
        const res = await fetch(`http://localhost:5500/forgot/token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token: token })
        })
        const json = await res.text()
        const object = await JSON.parse(json);
        console.log(object);
        if (object.status === 400 || object.status === 404) {
            window.location.href = './expiredPage.html';
        } else {
            const mailArea = document.getElementById('forgot-email') as HTMLInputElement;
            mailArea.value = object.email;
        }
    }
}

const loginFormEle = document.querySelector('#loginSubmit') as HTMLButtonElement;
console.log(loginFormEle);
if (loginFormEle !== null) {
    loginFormEle.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm(loginFormEle);
    })
}

const resetFormEle = document.querySelector('#resetSubmit') as HTMLButtonElement;
if (resetFormEle !== null) {
    resetFormEle.addEventListener('click', (e: Event) => {
        e.preventDefault();
        resetForm(resetFormEle);
    })
}

const forgotFormEle = document.querySelector('#forgotSubmit') as HTMLButtonElement;
if (forgotFormEle !== null) {
    forgotFormEle.addEventListener('click', (e: Event) => {
        e.preventDefault();
        forgotForm(forgotFormEle);
    })
}

const redirectLogin = document.querySelector('.redirect_login') as HTMLDivElement;
if (redirectLogin !== null) {
    redirectLogin.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './login.html';
    });
}

const redirectSignup = document.querySelector('.redirect_signup') as HTMLDivElement;
if (redirectSignup !== null) {
    redirectSignup.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './signup.html';
    });
}

const redirectForgot = document.querySelector('#redirect_forgot') as HTMLDivElement;
if (redirectForgot !== null) {
    redirectForgot.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './forgot.html';
    });
}

const shoppingApp = document.querySelector('.shoppingApp') as HTMLBodyElement;
if (shoppingApp) {
    logoutBtn.style.display = 'none';
    if (localStorage.getItem('login')) {
        logoutBtn.style.display = 'block';
    }
    product();
}