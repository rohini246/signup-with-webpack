import { Request,Response} from "express";
import { IuserSignup } from "../models/user";
import { signService } from "../services/signup";
export const createUser = async(req:Request,res:Response)=>{  
    const data:IuserSignup = req.body; 
    const createUserData =  await signService(data);    
    res.status(createUserData.status).json({message:createUserData.message,status:createUserData.status})          
}