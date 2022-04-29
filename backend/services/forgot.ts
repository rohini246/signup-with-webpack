import { NextFunction, Request,Response } from "express";
import user from "../models/user";
export const forgotService = async(req:Request,res:Response,next:NextFunction)=>{
        const {email} = req.body;
        const existingUser = await user.findOne({email:email})
        if(!existingUser){
          return  next("Please enter registered email")
        }else{
           return  next("Reset password");    
        }
}