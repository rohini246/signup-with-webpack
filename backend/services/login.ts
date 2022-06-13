import { Request} from "express";
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {findUser} from '../repo/user';
dotenv.config();

export const loginService = async(req:Request)=>{
        const email = req.body;
        let message:string = '';
        let status=0;
        let emailId:string='';
        const existingUser= await findUser(email);
        if(!existingUser[0]){
            message="Invalid Credentials";
            status = 401;
            return {message,status,emailId}
        }
        else{
         const data =  userIsNotExisting(req.body.password,existingUser[0].name,existingUser[0].email,existingUser[0].password);
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
        message="Invalid Credentials";
        status = 401;
    }
    else{
        console.log('matched');
        message="Login Successfully.";
        status = 201;         
    }       
    return {message,status,emailId}
}
