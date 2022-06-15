import { Request,Response } from "express";
import { forgotService,tokenValidationService} from "../services/forgot";
export const forgot = async(req:Request,res:Response)=>{   
   const forgotData= await forgotService(req.body.email);   
   res.status(forgotData.status).json({message:forgotData.message,status:forgotData.status});           
}
 export const tokenValidation = async(req:Request,res:Response)=>{
   const tokenValidationData = await tokenValidationService(req.body.token);
   res.status(tokenValidationData.status).json({message:tokenValidationData.message,status:tokenValidationData.status,email:tokenValidationData.email});
 }