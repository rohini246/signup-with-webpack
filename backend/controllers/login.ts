import { Request,Response,NextFunction } from "express";
import { loginService } from "../services/login";
export const userLogin = async(req:Request,res:Response,next:NextFunction)=>{
   await  loginService(req,res,next);
}