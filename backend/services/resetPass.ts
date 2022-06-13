import { Request} from "express";
import bcrypt from 'bcryptjs';
import { findUser, updateUser } from "../repo/user";
export const resetPassService = async(req:Request)=>{
    const userExist = await findUser(req.body.email);
    let status:number=0;
    let message:string= "";
    if(userExist ){
        const hashedValue = await bcrypt.hash(req.body.password,10);
        await updateUser(req.body.email,"password",hashedValue)
        message="Password Reset Successfully";
        status=201;
                
    }
    return {message,status};
}
