import { isValidPassword } from "./utilities/validation";

export const resetForm=(button:HTMLButtonElement)=>{
    const email = document.querySelector('#forgot-email') as HTMLInputElement;
    const password = document.querySelector('#forgot-password') as HTMLInputElement;
    const confirmPassword = document.querySelector('#forgot-confirm_password') as HTMLInputElement;
    const error = document.querySelector(".reset-error") as HTMLSpanElement;
    const success = document.querySelector(".successfull-reset") as HTMLSpanElement;
    interface UserForgot{
       password:string
    }
       const user:UserForgot = {
          password: password.value
       }
       if( user.password && confirmPassword.value){
         passwordValidation(email.value,user.password,confirmPassword.value,error,success);
       }
       else{
          error.innerHTML = 'Please enter all fields.'
       }
    } 
    
    const passwordValidation = (email:string,password:string,confirmPassword:string,error:HTMLSpanElement,success:HTMLSpanElement)=>{
      if(!isValidPassword(password)) {
         error.innerHTML = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
      }
      else if(password!==confirmPassword){
         error.innerHTML="Confirm password didn't match";
      }else{
         callResetPassApi(email,password,confirmPassword,error,success);
      }
   }    
    const callResetPassApi=async(email:string,password:string,confirmPassword:string,error:HTMLSpanElement,success:HTMLSpanElement)=>{
      const query = window.location.search;
      const url = new URLSearchParams(query);
      const token = url.get('token')!;
       const api: string = "http://localhost:5500/resetPass";
       const res = await fetch(api, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
             email,
             password,
             token
          })
        })
        const json = await res.text()
        const obj = await JSON.parse(json);
        if (obj.message==="Password Reset Successfully"){
         success.innerHTML=obj.message;
         window.location.href='./login.html';
         
        }
        else if(obj.status===404){
           window.location.href='./expiredPage.html';

        }
        else{
          error.innerHTML = obj.message;  
        }  
      
    }
    