import jwt from 'jsonwebtoken';
import { findUser, updateUser } from "../repo/user";
let nodemailer = require('nodemailer');
let secretKey:string;
let token:string;
let secret:string;
let tranporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'shoppingcart158@gmail.com',
    pass:'ShoppingCart1234@',
  }
});
export const forgotService = async(data:string)=>{
  const email = data;
  let message:string;
  let status:number; 
  const existingUser = await findUser(email);
  if(!existingUser){
    message="Please enter registered email";
    status=409;
  }
  else{
    secretKey = "my-secret-key-of-forgot-work-flow";
    secret = secretKey + existingUser.password;
    const data = {
    email:existingUser.email
   }
  token =  jwt.sign(data, secret,{expiresIn:'1m'});
  sendMail(token,email)
  message="Mail sent successfully";
  status=201;   
}     
  return {message,status};      
}

const sendMail = (token:string,email:string)=>{
  let mailOptions = {
    from:'shoppingcart158@gmail.com',
    to:"rohinimittal246@gmail.com",
    subject: 'change password',
    text:"The link for rest password.",
    html:`<p>http://localhost:8080/resetPass.html?token=${token}<br></button>`
  }
  tranporter.sendMail(mailOptions,async function(error:any,info:any){
    if(error){
      console.log("error",error)
    }
    await updateUser(email,"token",token);    
  }) 

}

export const tokenValidationService = async(data:string)=>{
  let message:string="";
  let status:number=0;
  let email:string="";
  let token = data;
  const [headers,payloads] = token.split('.');
  let base64 = payloads.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  const obj = JSON.parse(jsonPayload);
  const isExistingUser = await findUser(obj.email);
  if(isExistingUser){
    let secret = "my-secret-key-of-forgot-work-flow"+ isExistingUser.password;
    jwt.verify(token,secret,(error:any,payloads:any)=>{
      console.log(payloads);
      if(error){
        message="not exist"
        status=400;
      }
      else{
        if (!(obj.exp < (new Date().getTime() + 1) / 1000)){
          message="verified";
          status=200;
          email=obj.email;  
        }
        else{
          message="Time Expired";
          status=404;
        }
      }
    });
  }
  else{
    message='userdoes not exist';
    status=400;

  }
  return {message,status,email};
}