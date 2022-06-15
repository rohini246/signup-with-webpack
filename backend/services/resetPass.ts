import bcrypt from 'bcryptjs';
import { findUser, updateUser } from "../repo/user";
import { Status } from "../constants/status";
import { Message } from "../constants/message";
import { Iuser } from "../models/user";
export const resetPassService = async(data:Iuser)=>{
    const userExist = await findUser(data.email);
    let status:number=0;
    let message:string= "";
    if(userExist ){
        const hashedValue = await bcrypt.hash(data.password,10);
        await updateUser(data.email,"password",hashedValue)
        message=Message.successfullyUpdatedInDb;
        status=Status.success;
                
    }
    return {message,status};
}
