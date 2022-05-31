export const isValidEmail = (email:string)=>{
   return (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))?false:true;
}

export const isValidPassword = (password:string)=>{
    return (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/))?true:false;
}