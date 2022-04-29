import { Request,Response,NextFunction } from "express";
import { signService } from "../services/signup";
export const createUser = async(req:Request,res:Response,next:NextFunction)=>{   
    await signService(req,res,next);              
 }
