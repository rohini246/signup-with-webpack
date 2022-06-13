import {Request} from "express";
import bcrypt from 'bcryptjs';
import { findUser,saveUser } from "../repo/user";

export interface IUser{
    name:string,
    email:string,
    address:string,
    password:string
}
export const signService = async(req:Request)=>{ 
    const userExist = await findUser(req.body.email);
    console.log("userExist",userExist[0]);
    var message:string;
    message = "User already registered.";
    var status=409;
    if(userExist[0]===undefined){
        const hashedValue = await bcrypt.hash(req.body.password,10)        
        await saveUser(req.body.name,req.body.email, req.body.address,hashedValue);
        message="Successfully Registered.";
        status=201;             
    }
    return {message,status};
}
