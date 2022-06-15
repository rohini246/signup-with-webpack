import bcrypt from 'bcryptjs';
import { findUser,saveUser } from "../repo/user";
import { Status } from "../constants/status";
import { Message } from "../constants/message";
import { IuserSignup } from "../models/user";

export interface IUser{
    name:string,
    email:string,
    address:string,
    password:string
}
export const signService = async(data:IuserSignup)=>{ 
    const userExist = await findUser(data.email);
    console.log("userExist",userExist[0]);
   let message:string;
    message = Message.userAlreadyRegistered;
    let status=Status.conflict;
    if(!userExist[0]){
        const hashedValue = await bcrypt.hash(data.password,10)        
        await saveUser(data,hashedValue);
        message="Successfully Registered.";
        status=201;             
    }
    return {message,status};
}
