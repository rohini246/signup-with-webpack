import {Request} from "express";
import user from "../models/user";
import bcrypt from 'bcryptjs';
export const signService = async(req:Request)=>{
    const userExist = await user.findOne({email:req.body.email})
    var message:string="";
    var status:number=0;
    if(userExist){
        console.log(userExist);
        message="User already registered.";
        status=409;
        }else{
            bcrypt.hash(req.body.password,10,async(error:Error,hash:string)=>{
                if(error){
                    message=error.message;
                    status=404;
                }else{
                    const newUser=new user({
                        name:req.body.name,
                        email:req.body.email,
                        address:req.body.address,
                        password:hash
                    });
                    const newUserData = await  newUser.save();
                    if(!newUserData){
                        message= "Internal server error";
                        status=500;
                   }else{
                    message="Successfully Registered.";
                    status=201;
                   }  
                }
            })    
        }  
        return {message,status};          
}