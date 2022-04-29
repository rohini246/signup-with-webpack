import { Request,Response,NextFunction } from "express";
import { forgotService } from "../services/forgot";
export const forgot = async(req:Request,res:Response,next:NextFunction)=>{   
    await forgotService(req,res,next);              
 }