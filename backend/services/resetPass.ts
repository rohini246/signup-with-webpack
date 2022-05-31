import { Request} from "express";
import user from "../models/user";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";
export const resetPassService = async(req:Request)=>{
    const userExist = await user.findOne({email:req.body.email});
    //const token = req.body.token;
    //const secret = "my-secret-key-of-forgot-work-flow" + userExist.password;
    //console.log(secret);
    //const isVerified = await jwt.verify(token,secret);
    let status:number=0;
    let message:string= "";
    if(userExist ){
        //console.log(token);
        const hashedValue = await bcrypt.hash(req.body.password,10);
        const newUserData =  await user.updateOne({email:req.body.email},{$set:{password:hashedValue}});
        if(!newUserData){
            message= "Internal server error";
            status=500;
        }   
        else{
            // const deleteToken = await user.updateOne({email:req.body.email},{$set:{token:null}});
            // if(deleteToken){
               message="Password Reset Successfully";
               status=201;

            //}
            

        }            
    }
    // else{
    //     message='token is null';
    //     status=404;
    // }
    return {message,status};
}
