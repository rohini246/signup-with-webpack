import { NextFunction, Request,Response } from "express";
import user from "../models/user";
import bcrypt from 'bcryptjs';
export const signService = async(req:Request,res:Response,next:NextFunction)=>{
    const userExist = await user.findOne({email:req.body.email})
    if(userExist){
        console.log(userExist);
        //res.json("User already registered.");
        return next("User already registered.");
        }else{
            bcrypt.hash(req.body.password,10,async(error:Error,hash:string)=>{
                if(error){
                    res.send(error);
                    return;
                }else{
                    const newUser=new user({
                        name:req.body.name,
                        email:req.body.email,
                        address:req.body.address,
                        password:hash
                    });
                    console.log(newUser);
                    const newUserData = await  newUser.save();
                    if(!newUserData){
                   //res.json("Internal server error");
                   return next("Internal server error");
                   }else{
                    //res.json("Successfully Registered.")
                    return next("Successfully Registered.");
                   }  
                }
            })    
        }            
}