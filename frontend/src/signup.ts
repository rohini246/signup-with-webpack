const nameElm = document.querySelector('#name') as HTMLInputElement;
const email = document.querySelector('#email') as HTMLInputElement;
const address = document.querySelector('#address') as HTMLInputElement;
const password = document.querySelector('#password') as HTMLInputElement;
const confirmPassword = document.querySelector('#confirm_password') as HTMLInputElement;
const url: string = "http://localhost:8080/signup";
interface UserSignup{
   name:string,
   email:string,
   address:string,
   password:string
}
export const signupForm=()=>{
   const user:UserSignup = {
      name: nameElm.value,
      email: email.value,
      address: address.value,
      password: password.value
   }
   if(user.email && user.address && user.name && user.password){
      emailValidation(user);
   }
} 
const emailValidation = (user:UserSignup)=>{
   var filter = /^[a-zA-Z.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)+$/;
   if(!user.email.match(filter)){
      alert('Please provide a valid email address');
   }
   else{
      passwordValidation(user.password,confirmPassword.value,user);
   } 
}  
const passwordValidation = (password:string,confirmPassword:string,user:UserSignup)=>{
   if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) {
       alert('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
   }
   else if(password!==confirmPassword){
       alert("Confirm password didn't match");
   }else{callApi(user);}
}
const callApi=async(user:UserSignup)=>{
   const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    })
    const body = await response.json();
    
    if (body==="Successfully Registered."){
     window.location.href='./homePage.html'
    }  
    alert(body);    
}
