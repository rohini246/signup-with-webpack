import { Request,Response } from "express";
import { Icart } from "../models/cart";
import { cartService,cartItemsService,removeCartItemsService,updateCartQuantityService, checkoutService,placedOrdersService,addressService} from "../services/cart";
export const cart = async(req:Request,res:Response)=>{
   const data:Icart= req.body;
   const userCartData = await  cartService(data);
   res.status(userCartData.status).json({message:userCartData.message,status:userCartData.status,quantity:userCartData.quantity});
}

export const cartItems = async(req:Request,res:Response)=>{
   const userCartDataItems = await  cartItemsService(req.body.email);
   res.status(userCartDataItems.status).json({message:userCartDataItems.message,status:userCartDataItems.status,title:userCartDataItems.title,price:userCartDataItems.price, quantity:userCartDataItems.quantity,image:userCartDataItems.image});
}

export const removeCartItems = async(req:Request,res:Response)=>{
   const removeCartItemsData = await  removeCartItemsService(req.body.email,req.body.title);
   res.status(removeCartItemsData.status).json({message:removeCartItemsData.message,status:removeCartItemsData.status});
}

export const  updateCartQuantity  = async(req:Request,res:Response)=>{
   const  updateCartQuantityData = await  updateCartQuantityService(req.body.email,req.body.title,req.body.quantity);
   res.status( updateCartQuantityData.status).json({message:updateCartQuantityData.message,status:updateCartQuantityData.status});
}

export const  checkout  = async(req:Request,res:Response)=>{
   console.log(req.body.title);
   const  checkoutData = await  checkoutService(req.body.email,req.body.title,req.body.address);
   res.status( checkoutData.status).json({message:checkoutData.message,status:checkoutData.status});
}

export const  placedOrders  = async(req:Request,res:Response)=>{
   const  placedOrdersData = await  placedOrdersService(req.body.email);
   res.status( placedOrdersData.status).json({message:placedOrdersData.message,status:placedOrdersData.status,title:placedOrdersData.title,price:placedOrdersData.price,quantity:placedOrdersData.quantity,date:placedOrdersData.date,address:placedOrdersData.address,image:placedOrdersData.image});
}

export const  address  = async(req:Request,res:Response)=>{
   const  addressData = await  addressService(req.body.email);
   res.status( addressData.status).json({message:addressData.message,status:addressData.status,address:addressData.address});
}



