import { Request,Response } from "express";
import { resetPassService } from "../services/resetPass";
export const resetPass = async(req:Request,res:Response)=>{
   const resetPassData = await  resetPassService(req);
   res.status(resetPassData.status).json({message:resetPassData.message});
}

