import e, { Request } from "express";
import cart from "../models/cart";
import user from "../models/user";

interface Icart{
    title:string,
    price:string,
    email:string,
    quantity:string,
    date?:string
}
export const cartService = async(req:Request)=>{
    const title = req.body.title;
    const price = req.body.price;
    const email = req.body.email;
    var message:string='';
    var status=0;
    const existingUser = await user.findOne({email:email});
    if(existingUser){
       var data = await cartServiceIfUserExist(title,price.trim(),email);
       message = data.message;
       status = data.status;     
    }
    else{
        message="User is not Registered.";
        status=402;
    }
   return {message,status}
}

const cartServiceIfUserExist = async(title:string,price:string,email:string)=>{
    var message:string='';
    var status:number=0;
    const existingCartData = await cart.findOne({title:title,email:email,date:undefined});
    if(existingCartData){
        var data = await cartServiceIfUserAndDataExist(existingCartData.title,existingCartData.email,existingCartData.quantity);
        message=data.message;
        status=data.status;     
    }else{
        var data = await createNewCart(title,price,email);
         message= data.message;
        status=data.status;     
    }
    return {message,status};    
}

const cartServiceIfUserAndDataExist = async(title:string,email:string,quantity:string)=>{
    var message:string = '';
    var status:number = 0;
    var newQuantity = parseInt(quantity) + 1;
    var updatedQuantity = newQuantity.toString();
    const updatedCart =  await cart.updateOne({title:title,email:email,date:undefined},{$set:{quantity:updatedQuantity}});
    if(!updatedCart){
        message= "Internal server error";
        status=500;
    }else{
        message="Successfully Saveded.";
        status=201;
    }
    return {message,status};                 
}

const createNewCart = async(title:string,price:string,email:string)=>{
    var message:string = '';
    var status:number = 0;
    const newCart=new cart({
        title:title,
        price:price,
        email:email,
        quantity:1
    });
    const cartData =  await newCart.save();
    if(!cartData){
        message= "Internal server error";
        status=500;
    }
    else{
        message="Successfully Saveded.";
        status=200;
    }  
    return{message,status};
}
export const cartItemsService = async(req:Request) =>{
    var message:string='';
    var status=0;
    var title:string[]=[];
    var price:string[]=[];
    var quantity:string[]=[];
    var email = req.body.email;
    const existingUser = await cart.find({email:email,date:undefined});  
    if(existingUser){
        for(var obj of existingUser){
            title.push(obj.title);
            price.push(obj.price);
            quantity.push(obj.quantity);
        }
        message="details has been sent successfully.";
        status=201;
    }
    else{
        message='not existing data';
        status=402;
    }
    return {message,status,title,price,quantity};

}

export const removeCartItemsService = async(req:Request)=>{
    var message:string='';
    var status=0;
    const email = req.body.email;
    const title = req.body.title;
    const existingUser = await cart.find({email:email});
    if(existingUser){
        var data = await removeCartItemsServiceIfUserexist(email,title);
        message = data.message;
        status= data.status;     
    }
    else{
        message="User does not exist.";
        status=402;
    }
    return {message,status}
}

const removeCartItemsServiceIfUserexist = async(email:string,title:string)=>{
    var message:string = '';
    var status:number = 0;
    const existingCartData = await cart.findOne({title:title,email:email,date:undefined});
    if(existingCartData){
        var data = await removeCartItemsServiceIfUserAndDataexist(existingCartData.title);
        message = data.message;
        status = data.status;    
    }
    else{
        message="data is not present";
        status=402;
    }
    return {message,status}
}

const removeCartItemsServiceIfUserAndDataexist = async(title:string)=>{
    var message:string = '';
    var status:number = 0;
    const deleteCartData = await cart.deleteOne({title:title,date:undefined});
    if(!deleteCartData){
        message= "Internal server error";
        status=500;
    }
    else{
        message="Successfully deleted.";
        status=201;
    }  
    return {message,status}; 
}


export const updateCartQuantityService = async(req:Request)=>{
    var message:string='';
    var status=0;
    var email:string = req.body.email;
    var title:string= req.body.title;
    var quantity:string=req.body.quantity;
    const existingUser = await user.findOne({email:email});
    if(existingUser){
        var data = await updateCartQuantityServiceIfUserExist(title,email,quantity);
        message = data.message;
        status = data.status;   
    }else{
        message="User is not Registered.";
        status=402;
    }
    return {message,status};
}   

const updateCartQuantityServiceIfUserExist = async(title:string,email:string,quantity:string)=>{
    var message:string = '';
    var status:number = 0;
    const existingCartData = await cart.findOne({title:title,email:email});
    if(existingCartData ){
        var data = await updateCartQuantityServiceIfUserAndDataExist(existingCartData.title,existingCartData.email,quantity);
        message = data.message;
        status = data.status;    
    }else{
        message='not existing data';
        status=402;
    }
    return {message,status}
}

const updateCartQuantityServiceIfUserAndDataExist = async(title:string,email:string,quantity:string)=>{
    var message:string = '';
    var status:number = 0;
    const updatedCart =  await cart.updateOne({title:title,email:email,date:undefined},{$set:{quantity:quantity}});
    if(updatedCart){
        message="updated successfully."
        status=201;
    }
    else{
        message= "Internal server error";
        status=500;
    }
    return {message,status};
}

export const checkoutService = async(req:Request)=>{
    var message:string='';
    var status=0;
    var email:string = req.body.email;
    var titles:string[]= req.body.title;
    const existingUser = await user.findOne({email:email});
    if(existingUser){
        var data = await checkoutServiceIfUserExist(email,titles);
        message = data.message;
        status = data.status;
    }
    else{
        message='user does not exist';
        status=402;
    }
    return {message,status}
}

const checkoutServiceIfUserExist = async(email:string,titles:string[])=>{
    var message:string='';
    var status:number = 0;
    for(var title of titles){
        const existingCartData = await cart.findOne({title:title,email:email});
        if(existingCartData){
            var data = await checkoutServiceIfUserAndDataExist(existingCartData.title,existingCartData.email);
            message = data.message;
            status = data.status;
        }
        else{
            message='not existing data';
            status=402;
        }
    }
    return {message,status};
}

const checkoutServiceIfUserAndDataExist = async(title:string,email:string)=>{
    var message:string = '';
    var status:number = 0;
    const updatedCart =  await cart.updateOne({title:title,email:email,date:undefined},{$set:{date:new Date()}});
    if(updatedCart){
        message="updated successfully.";
        status=200;
    }
    else{
        message="internal server error";
        status=500;
    }
    return {message,status}
}

export const placedOrdersService = async(req:Request)=>{
    var message:string = '';
    var status:number = 0;
    var title:string[]=[];
    var price:string[]=[];
    var quantity:string[]=[];
    var date:string[]=[];
    var email = req.body.email;
    const existingUser = await cart.find({email:email});  
    if(existingUser ){
        for(var obj of existingUser){
            if(obj.date){
                title.push(obj.title);
                price.push(obj.price);
                quantity.push(obj.quantity);
                date.push(obj.date);
            }
        }
        message="details has been sent successfully.";
        status=201;
    }
    else{
        message='not existing data';
        status=402;
    }
    return {message,status,title,price,quantity,date};
}