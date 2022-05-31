import { Request,Response } from "express";
import {productsService,productDetailsService} from "../services/products";
export const products = async(req:Request,res:Response)=>{   
   const productsData= await productsService(req);  
   res.send(productsData);           
}
export const productDetails = async(req:Request,res:Response)=>{   
   const productDetailsData= await productDetailsService(req);  
   res.json({title:productDetailsData.title,price:productDetailsData.price,image:productDetailsData.image,description:productDetailsData.description,group:productDetailsData.targetGroup,message:productDetailsData.message,status:productDetailsData.status});           
}




