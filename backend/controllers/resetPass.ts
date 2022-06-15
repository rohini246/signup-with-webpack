import { Request,Response } from "express";
import { Iuser } from "../models/user";
import { resetPassService } from "../services/resetPass";
export const resetPass = async(req:Request,res:Response)=>{
   const data:Iuser = req.body;
   const resetPassData = await  resetPassService(data);
   res.status(resetPassData.status).json({message:resetPassData.message});
}

