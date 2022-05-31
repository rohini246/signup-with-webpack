import { Request} from "express";
import user from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const loginService = async(req:Request)=>{
        const {email,password} = req.body;
        console.log(email,"api called with this email id");
        const existingUser = await user.findOne({email:email})
        var message:string='';
        var status:number=0;
        var name:string='';
        var emailId:string ='';
        if(existingUser){
            const isMatch = await bcrypt.compare(password,existingUser.password)
            if(!isMatch){
                console.log("not matched");
                message="Invalid Credentials";
                status = 401;
            }
            else{
                console.log('matched');
                message="Login Successfully.";
                status = 201;
                let jwtSecretKey = process.env.JWT_SECRET_KEY||'my-secret-token-of-user-login';
                let jwtRefreshTokenKey = process.env.JWT_Refresh_Token_Key || 'my-secret-refresh-token-of-login'
                let data = {
                    email:existingUser.email,
                }
               const accessToken =  jwt.sign(data, jwtSecretKey,{expiresIn:'10m'});
               const refreshToken = jwt.sign(data,jwtRefreshTokenKey,{expiresIn:'1d'});
                name = existingUser.name;
                emailId = existingUser.email;         
            }
            
        }
        else{
            message = 'Invalid Credentials';
            status=401;
        }
        return {message,status,name,emailId}  
                 
}

// import { Request} from "express";
// import user from "../models/user";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// export const loginService = async(req:Request)=>{
//         const {email,password} = req.body;
//         console.log('api caaled')
//         const existingUser = await user.findOne({email:email})
//         var message:string='';
//         var status=0;
//         if(existingUser){
//             const isMatch = await bcrypt.compare(password,existingUser.password)
//             if(!isMatch){
//                 console.log('not matched');
//                 message="Password or email do not match.\nPlease try again.";
//                 status = 405;
//                 return {message,status};
//             }
//             else{
//                 message="Login Successfully.";
//                 status = 200;
//                 let jwtSecretKey = process.env.JWT_SECRET_KEY||'my-secret-token-of-user-login';
//                 let jwtRefreshTokenKey = process.env.JWT_Refresh_Token_Key || 'my-secret-refresh-token-of-login'
//                 let data = {
//                     email:email,
//                 }
//                const accessToken =  jwt.sign(data, jwtSecretKey,{expiresIn:'10m'});
//                const refreshToken = jwt.sign(data,jwtRefreshTokenKey,{expiresIn:'1d'});
//                //return {message,status}
               
//             }
           
            
//         }
//         return {message,status}  
        
                 
// }
