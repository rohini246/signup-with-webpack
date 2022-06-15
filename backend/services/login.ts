import dotenv from 'dotenv'
import bcrypt from 'bcryptjs';
import {findUser} from '../repo/user';
import { Message } from "../constants/message";
import { Status } from "../constants/status";
import { Iuser } from "../models/user";
dotenv.config();

export const loginService = async(data:Iuser)=>{
    console.log("in body");
        const email:string = data.email;
        const password:string = data.password;
        let message:string = '';
        let status=0;
        let emailId:string='';
        const existingUser= await findUser(email);
        if(!existingUser[0]){
            console.log(existingUser[0]);
            console.log("in not existingUser")
            message=Message.unauthorized
            status =Status.unauthorized;
            return {message,status,emailId}
        }
        else{
         const data =  userIsNotExisting(password,existingUser[0].name,existingUser[0].email,existingUser[0].password);
         return data;
            
        }       
}

const userIsNotExisting = async(password:string,existingName:string,existingEmail:string,existingPassword:string)=>{
    let message:string = '';
    let status=0;
    let emailId:string='';
    const isMatch = await  bcrypt.compare(password,existingPassword);
    if(!isMatch){
        console.log("not matched");
        message=Message.unauthorized;
        status = Status.unauthorized;
    }
    else{
        console.log('matched');
        message=Message.loginSuccessfully;
        status = Status.success; 
        emailId = existingEmail;       
    }       
    return {message,status,emailId}
}
