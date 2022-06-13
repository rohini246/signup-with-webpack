import { Request } from "express";
import { findProduct, findProductDate, saveCart, updateCartData, findEmail, deleteCart, findProductTitle} from "../repo/cart";
import {findUser} from '../repo/user'
export const cartService = async(req:Request)=>{
    const title = req.body.title;
    const price = req.body.price;
    const email = req.body.email;
    var message:string='';
    var status=0;
    const existingUser = await findUser(email);
    if(!existingUser[0]){
        message="User is not Registered.";
        status=402;
    }
    else{
        var data = await cartServiceIfUserExist(title,price.trim(),email);
        message = data.message;
        status = data.status;     
    }
   return {message,status}
}

const cartServiceIfUserExist = async(title:string,price:string,email:string)=>{
    var message:string='';
    var status:number=0;
    const existingCartData = await findProductTitle(email,title);
    console.log(existingCartData);
    if(!existingCartData[0]){
        var data = await createNewCart(title,price,email);
         message= data.message;
        status=data.status;     
    }else{
        var data = await cartServiceIfUserAndDataExist(existingCartData[0].title,existingCartData[0].email,existingCartData[0].quantity);
        message=data.message;
        status=data.status;     
    }
    return {message,status};    
}

const cartServiceIfUserAndDataExist = async(title:string,email:string,quantity:string)=>{
    var message:string = '';
    var status:number = 0;
    var newQuantity = parseInt(quantity) + 1;
    var updatedQuantity = newQuantity.toString();
    await updateCartData(email,title,'null',updatedQuantity,"quantity");
    message="Successfully Saveded.";
    status=201;
    return {message,status};                 
}

const createNewCart = async(title:string,price:string,email:string)=>{
    var message:string = '';
    var status:number = 0;
    await saveCart(title,price,email,"1");
    message="Successfully Saveded.";
    status=200;
    return{message,status};
}
export const cartItemsService = async(req:Request) =>{
    var message:string='';
    var status=0;
    var title:string[]=[];
    var price:string[]=[];
    var quantity:string[]=[];
    var email = req.body.email;
    const existingUser = await findProductDate(email,'null'); 
    if(!existingUser[0]){
        message='not existing data';
        status=402;
    }
    else{
        for(var obj of existingUser){
            title.push(obj.title);
            price.push(obj.price);
            quantity.push(obj.quantity);
        }
        message="details has been sent successfully.";
        status=201;
    }
    return {message,status,title,price,quantity};

}

export const removeCartItemsService = async(req:Request)=>{
    var message:string='';
    var status=0;
    const email = req.body.email;
    const title = req.body.title;
    const existingUser= await findEmail(email);
    if(!existingUser[0]){
        message="User does not exist.";
        status=402;
    }
    else{
        var data = await removeCartItemsServiceIfUserexist(email,title);
        message = data.message;
        status= data.status;     
    }
    return {message,status}
}

const removeCartItemsServiceIfUserexist = async(email:string,title:string)=>{
    var message:string = '';
    var status:number = 0;
    const existingCartData = await findProduct(email,title,'null');
    if(!existingCartData[0]){
        message="data is not present";
        status=402;
    }
    else{
        var data = await removeCartItemsServiceIfUserAndDataexist(existingCartData[0].title,email);
        message = data.message;
        status = data.status;    
    }
    return {message,status}
}

const removeCartItemsServiceIfUserAndDataexist = async(title:string,email:string)=>{
    var message:string = '';
    var status:number = 0;
    await deleteCart(email,title,'null');
    message="Successfully deleted.";
    status=201;
    return {message,status}; 
}


export const updateCartQuantityService = async(req:Request)=>{
    var message:string='';
    var status=0;
    var email:string = req.body.email;
    var title:string= req.body.title;
    var quantity:string=req.body.quantity;
    const existingUser = await findUser(email);
    if(!existingUser[0]){
        message="User is not Registered.";
        status=402;
    }else{
        var data = await updateCartQuantityServiceIfUserExist(title,email,quantity);
        message = data.message;
        status = data.status;   
    }
    return {message,status};
}   

const updateCartQuantityServiceIfUserExist = async(title:string,email:string,quantity:string)=>{
    var message:string = '';
    var status:number = 0;
    const existingCartData = await findProductTitle(email,title);
    if(!existingCartData[0]){
        message='not existing data';
        status=402;
    }else{
        var data = await updateCartQuantityServiceIfUserAndDataExist(existingCartData[0].title,existingCartData[0].email,quantity);
        message = data.message;
        status = data.status;    
    }
    return {message,status}
}

const updateCartQuantityServiceIfUserAndDataExist = async(title:string,email:string,quantity:string)=>{
    var message:string = '';
    var status:number = 0;
     await updateCartData(email,title,'null',quantity,"quantity");
     message="updated successfully."
     status=201;
    return {message,status};
}

export const checkoutService = async(req:Request)=>{
    var message:string='';
    var status=0;
    var email:string = req.body.email;
    var titles:string[]= req.body.title;
    const existingUser = await findUser(email);
    if(!existingUser[0]){
        message='user does not exist';
        status=402;
    }
    else{
        var data = await checkoutServiceIfUserExist(email,titles);
        message = data.message;
        status = data.status;
    }
    return {message,status}
}

const checkoutServiceIfUserExist = async(email:string,titles:string[])=>{
    var message:string='';
    var status:number = 0;
    for(var title of titles){
        const existingCartData = await findProductTitle(email,title);
        if(!existingCartData[0]){
            message='not existing data';
            status=402;
        }
        else{
            var data = await checkoutServiceIfUserAndDataExist(existingCartData[0].title,existingCartData[0].email);
            message = data.message;
            status = data.status;
        }
    }
    return {message,status};
}

const checkoutServiceIfUserAndDataExist = async(title:string,email:string)=>{
    var message:string = '';
    var status:number = 0;
    const date = new Date();
    await updateCartData(email,title,'null',date,"date");
    message="updated successfully.";
    status=200;
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
    // const existingUser = await cart.find({email:email}); 
    const existingUser = await findEmail(email); 
    if(!existingUser[0]){
        message='not existing data';
        status=402;
    }
    else{
        for(var obj of existingUser){
            if(obj.date!=="null"){
                title.push(obj.title);
                price.push(obj.price);
                quantity.push(obj.quantity);
                date.push(obj.date);
            }
        }
        message="details has been sent successfully.";
        status=201;
    }
    return {message,status,title,price,quantity,date};
}