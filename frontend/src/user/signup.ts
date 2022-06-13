import { isValidEmail, isValidPassword } from "./utilities/validation";
export const signupForm=(button:HTMLButtonElement)=>{
const name = document.querySelector('#signup-name') as HTMLInputElement;
const email = document.querySelector('#signup-email') as HTMLInputElement;
const address = document.querySelector('#signup-address') as HTMLInputElement;
const password = document.querySelector('#signup-password') as HTMLInputElement;
const confirmPassword = document.querySelector('#signup-confirm_password') as HTMLInputElement;
const error = document.querySelector(".signup-error") as HTMLSpanElement;
error.innerHTML="";
interface UserSignup{
   name:string,
   email:string,
   address:string,
   password:string
}
   const user:UserSignup = {
      name: name.value,
      email: email.value,
      address: address.value,
      password: password.value
   }
   if(checkFields(user.name,user.email,user.password,confirmPassword.value,user.address)){
      emailValidation(user.name,user.email,user.address,user.password,confirmPassword.value ,error);

   }
   else{
      error.innerHTML = 'Please enter all fields.'
   }
} 
const checkFields=(name:string,email:string,password:string,confirmPassword:string,address:string)=>{
   return (name && email && password && address)?true:false;
}
const emailValidation = (name:string,email:string,address:string,password:string,confirmPassword:string,error:HTMLSpanElement)=>{
   if(isValidEmail(email)){
      passwordValidation(name,email,address,password,confirmPassword,error);
   }
   else{
      error.innerHTML='Please provide a valid email address.';
   }
}  
const passwordValidation = (name:string,email:string,address:string,password:string,confirmPassword:string,error:HTMLSpanElement)=>{
   if(!isValidPassword(password)) {
      error.innerHTML = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
   }
   else if(password!==confirmPassword){
      error.innerHTML="Confirm password didn't match";
   }else{
      callApi(name,email,address,password,confirmPassword,error);
   }
}
const callApi=async(name:string,email:string,address:string,password:string,confirmPassword:string,error:HTMLSpanElement)=>{
   const success = document.querySelector(".successfull-signup") as HTMLSpanElement;
   const url: string = "http://localhost:5500/signup";
   const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
         name,
         email,
         address,
         password

      })
    })
    const json = await res.text()
    const obj = await JSON.parse(json);
    if (obj.message==="Successfully Registered."){
     success.innerHTML=obj.message;
     window.location.href='./login.html'
    }
    else{
      error.innerHTML = obj.message;  

    }  
  
}
