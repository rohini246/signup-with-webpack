import { Request,Response} from "express";
import { IupdateUser, IuserSignup } from "../models/user";
import { signService ,updateService} from "../services/signup";
export const createUser = async(req:Request,res:Response)=>{  
    const data:IuserSignup = req.body; 
    const createUserData =  await signService(data);    
    res.status(createUserData.status).json({message:createUserData.message,status:createUserData.status})          
}

export const updateUser = async(req:Request,res:Response)=>{  
    const data:IupdateUser = req.body; 
    const updateUserData =  await updateService(data);    
    res.status(updateUserData.status).json({message:updateUserData.message,status:updateUserData.status})          
}