import { isValidEmail } from "../utilities/validation";
interface User {
  email : string,
  password : string
}

export const loginForm=(button:HTMLButtonElement)=>{
  const emailElm = document.querySelector('#login-email') as HTMLInputElement;
  const passwordElm = document.querySelector('#login-password') as HTMLInputElement;
  const errorElm = document.querySelector('.login-error') as HTMLSpanElement; 
  errorElm.innerHTML='';
  if(!emailElm.value || !passwordElm.value){
   errorElm.innerHTML="Please enter all fields.";
  }
  else{
    checkValidEmail(emailElm.value,passwordElm.value,errorElm)
  }
}

const checkValidEmail=(email:string,password:string,errorElm:HTMLSpanElement)=>{
  if(isValidEmail(email)){
    callLoginApi(email,password,errorElm);
  }
  else{
    errorElm.innerHTML='Please enter valid email.';
  }
}
const callLoginApi = async(email:string,password:string,errorElm:HTMLSpanElement)=>{
  const successElm = document.querySelector('.successfull-login') as HTMLSpanElement;
  const res = await fetch('http://localhost:5500/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    email:email,
    password:password
  })
  })
  const json = await res.text();
  const obj = await JSON.parse(json); 
  console.log(obj.status);
  if (obj.message === 'Login Successfully.'){
  window.location.href = `./shoppingApp.html` ;
  localStorage.setItem('login',obj.email);
  successElm.innerHTML=obj.message;
  }else{
    errorElm.innerHTML=  obj.message;
  }
 
}





