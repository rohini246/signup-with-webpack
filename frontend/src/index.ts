import { loginForm, test } from "./login";
import { signupForm } from "./signup";
import { forgotForm } from "./forgot";

document.addEventListener("DOMContentLoaded", function () {
    const login = document.getElementById('#loginSubmit');
    const signup = document.querySelector('.signupSubmit') as HTMLButtonElement;
    const forgot = document.querySelector('.forgotSubmit') as HTMLButtonElement;
    console.log('in here');
    console.log(login, test);
});

// console.log(document);
// console.log(document.getElementById("loginSubmit"));

// login.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     loginForm();
// });
// signup.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     signupForm();
// });
// forgot.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     forgotForm();
// })
