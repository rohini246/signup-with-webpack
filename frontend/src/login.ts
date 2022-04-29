console.log('in here');
const emailElm = document.querySelector('#email') as HTMLInputElement;
const passwordElm = document.querySelector('#password') as HTMLInputElement;

interface User {
  email : string,
  password : string
}

export const test = 'bcjhbdscjsfd';
export const loginForm=()=>{
  const userLogin : User = ({
    email: emailElm.value,
    password: passwordElm.value
  });
  if(!userLogin.email || !userLogin.password){
    alert("Please enter all fields.");
  }
  else{
    callLoginApi(userLogin);
  }  
}
const callLoginApi = async(userLogin:User)=>{
  const res = await fetch('http://localhost:8080/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(userLogin)
  })
  const data = await res.json();
  alert(data);
  if (data === "Login Successfully.") {
    window.location.href = './homePage.html' 
  } 
}





