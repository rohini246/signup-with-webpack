import { isValidEmail } from "./utilities/validation";

export const forgotForm = (button:HTMLButtonElement)=>{
  const emailElem = document.querySelector('#forgot-email') as HTMLInputElement;
  const errorElem = document.querySelector('.forgot-error') as HTMLSpanElement;
  const successElem = document.querySelector('.successfull-mail-sent') as HTMLSpanElement;
  const email:string = emailElem.value;
  if(!email){
    errorElem.innerHTML = 'Please enter email';
  }
  else{
    checkValidEmailOrNot(email,errorElem,successElem);
  }
}
const checkValidEmailOrNot=(email:string,errorElem:HTMLSpanElement,successElem:HTMLSpanElement)=>{
  if(isValidEmail(email)){
    callForgotApi(email,errorElem,successElem);
  }
  else{
    errorElem.innerHTML='Please provide a valid email address.';
  }
}
const callForgotApi=async(email:string,errorElem:HTMLSpanElement,successElem:HTMLSpanElement)=>{
 const res =await fetch('http://localhost:5500/forgot',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({email:email})
 })
 const json = await res.text()
 const obj = await JSON.parse(json);
 if(obj.message==="Mail sent successfully"){
   successElem.innerHTML=obj.message;  
 }
 else{
  errorElem.innerHTML = obj.message;
 } 
 
}
