const emailElem = document.querySelector('#email') as HTMLInputElement;


export const forgotForm = ()=>{
  const email:string = emailElem.value;
  if(!email){
    alert('Please enter email')
  }
  else{
    checkValidEmailOrNot(email);
  }
}
const checkValidEmailOrNot=(email:string)=>{
  if(!email.includes('@') || !email.includes(".com")){
    alert("Please enter valid email");
  }
  else callForgotApi(email);
}
const callForgotApi=async(email:string)=>{
 const res =await fetch('http://localhost:8080/forgot',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(email)
 })
 const data = await res.json();
 alert(data); 
}
