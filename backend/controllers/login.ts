import { Request,Response } from "express";
import { Iuser } from "../models/user";
import { loginService } from "../services/login";
export const userLogin = async(req:Request,res:Response)=>{
   const data:Iuser = req.body;
   const userLoginData = await  loginService(data);
   res.status(userLoginData.status).json({message:userLoginData.message,status:userLoginData.status, email:userLoginData.emailId});
}

