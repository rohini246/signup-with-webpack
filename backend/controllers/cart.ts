import { Request,Response } from "express";
import { cartService,cartItemsService,removeCartItemsService,updateCartQuantityService, checkoutService,placedOrdersService} from "../services/cart";
export const cart = async(req:Request,res:Response)=>{
   const userCartData = await  cartService(req);
   res.status(userCartData.status).json({message:userCartData.message,status:userCartData.status});
}

export const cartItems = async(req:Request,res:Response)=>{
   const userCartDataItems = await  cartItemsService(req);
   res.status(userCartDataItems.status).json({message:userCartDataItems.message,status:userCartDataItems.status,title:userCartDataItems.title,price:userCartDataItems.price, quantity:userCartDataItems.quantity});
}

export const removeCartItems = async(req:Request,res:Response)=>{
   const removeCartItemsData = await  removeCartItemsService(req);
   res.status(removeCartItemsData.status).json({message:removeCartItemsData.message,status:removeCartItemsData.status});
}

export const  updateCartQuantity  = async(req:Request,res:Response)=>{
   const  updateCartQuantityData = await  updateCartQuantityService(req);
   res.status( updateCartQuantityData.status).json({message:updateCartQuantityData.message,status:updateCartQuantityData.status});
}

export const  checkout  = async(req:Request,res:Response)=>{
   const  checkoutData = await  checkoutService(req);
   res.status( checkoutData.status).json({message:checkoutData.message,status:checkoutData.status});
}

export const  placedOrders  = async(req:Request,res:Response)=>{
   const  placedOrdersData = await  placedOrdersService(req);
   res.status( placedOrdersData.status).json({message:placedOrdersData.message,status:placedOrdersData.status,title:placedOrdersData.title,price:placedOrdersData.price,quantity:placedOrdersData.quantity,date:placedOrdersData.date});
}


