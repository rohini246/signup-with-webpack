import { Request,Response } from "express";
import { Iuser } from "../models/user";
import { loginService,loginDetailsService } from "../services/login";
export const userLogin = async(req:Request,res:Response)=>{
   const data:Iuser = req.body;
   const userLoginData = await  loginService(data);
   res.status(userLoginData.status).json({message:userLoginData.message,status:userLoginData.status, email:userLoginData.emailId});
}

export const userLoginDetails = async(req:Request,res:Response)=>{
   const email = req.body.email;
   const userLoginDetailsData = await  loginDetailsService(email);
   res.status(userLoginDetailsData.status).json({message:userLoginDetailsData.message,status:userLoginDetailsData.status, userDetails:userLoginDetailsData.userDetails});
}

