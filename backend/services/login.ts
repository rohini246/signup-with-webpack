import { Request} from "express";
import user from "../models/user";
import bcrypt from 'bcryptjs';
export const loginService = async(req:Request)=>{
        const {email,password} = req.body;
        const existingUser = await user.findOne({email:email})
        var message:string='';
        var status:number=0;
        if(existingUser){
            const isMatch = await bcrypt.compare(password,existingUser.password)
            if(!isMatch){
                message="Password or email do not match.\nPlease try again.";
                status = 401;
            }
            else{
                message="Login Successfully.";
                status = 201;
            }
            
        }
        return {message,status}  
                 
}