import { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = async(req:Request,res:Response,next:NextFunction)=>{
    let tokenHeaderKey = 'my-secret-header-for-user-login';
    let jwtSecretKey = 'my-secret-token-of-user-login';
    try {
        const token:any = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            console.log("successfull verified",verified);
            return res.json({message:"Successfully Verified"});
        }else{
            console.log('invalid user')
            return res.status(401).json({message:"error"});
        }
    } catch (error) {
        return res.status(401).json({message:"error"});
    }
    // const token = req.body.token || req.query.token || req.header['x-access-token'];
    // if (token) {
    //     // verifies secret and checks exp
    //     jwt.verify(token, process.env.JWT_SECRET_KEY||'my-secret-token-of-user-login', function(err, decoded) {
    //         if (err) {
    //             return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
    //         }
    //       next();
    //     });
    //   } else {
    //     return res.status(403).json({
    //         "error": true,
    //         "message": 'No token provided.'
    //     });
    //   }

}