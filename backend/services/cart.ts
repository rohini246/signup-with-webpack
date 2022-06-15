import { Message } from "../constants/message";
import { Status } from "../constants/status";
import { Icart } from "../models/cart";
import { findProduct, findProductDate, saveCart, updateCartData, findEmail, deleteCart, findProductTitle} from "../repo/cart";
import {findUser} from '../repo/user'
export const cartService = async(data:Icart)=>{
    // console.log("api called");
    const title = data.title;
    const price = data.price.trim();
    const email = data.email.trim();
    // console.log(title,price,email)
    let message:string='';
    let status=0;
    const existingUser = await findUser(email);
    if(!existingUser[0]){
        message=Message.notExist;
        status=Status.notExist;
    }
    else{
        let data = await cartServiceIfUserExist(title,price,email);
        message = data.message;
        status = data.status;     
    }
   return {message,status}
}

const cartServiceIfUserExist = async(title:string,price:string,email:string)=>{
    let message:string='';
    let status:number=0;
    const existingCartData = await findProductTitle(email,title,"null");
    if(!existingCartData[0]){
        let data = await createNewCart(title,price,email);
        message= data.message;
        status=data.status;     
    }else{
        let data = await cartServiceIfUserAndDataExist(existingCartData[0].title,existingCartData[0].email,existingCartData[0].quantity);
        message=data.message;
        status=data.status;     
    }
    return {message,status};    
}

const cartServiceIfUserAndDataExist = async(title:string,email:string,quantity:string)=>{
    let message:string = '';
    let status:number = 0;
    let newQuantity = parseInt(quantity) + 1;
    let updatedQuantity = newQuantity.toString();
    await updateCartData(email,title,'null',updatedQuantity,"quantity");
    message=Message.successfullySavedInDb;
    status=Status.success;
    return {message,status};                 
}

const createNewCart = async(title:string,price:string,email:string)=>{
    let message:string = '';
    let status:number = 0;
    await saveCart(title,price,email,"1");
    message="Successfully Saveded.";
    status=200;
    return{message,status};
}
export const cartItemsService = async(email:string) =>{
   
    let message:string='';
    let status=0;
    let title:string[]=[];
    let price:string[]=[];
    let quantity:string[]=[];
    const existingUser = await findProductDate(email,'null'); 
    if(!existingUser[0]){
        message=Message.notExist;
        status=Status.notExist;
    }
    else{
        for(let obj of existingUser){
            title.push(obj.title);
            price.push(obj.price);
            quantity.push(obj.quantity);
        }
        message=Message.successfullySentDetails
        status=Status.success;
    }
    return {message,status,title,price,quantity};

}

export const removeCartItemsService = async(email:string,title:string)=>{
    let message:string='';
    let status=0;
    const existingUser= await findEmail(email);
    if(!existingUser[0]){
        message=Message.notExist;
        status=Status.notExist;
    }
    else{
        let data = await removeCartItemsServiceIfUserexist(email,title);
        message = data.message;
        status= data.status;     
    }
    return {message,status}
}

const removeCartItemsServiceIfUserexist = async(email:string,title:string)=>{
    let message:string = '';
    let status:number = 0;
    const existingCartData = await findProduct(email,title,'null');
    if(!existingCartData[0]){
        message=Message.notExist;
        status=Status.notExist;
    }
    else{
        let data = await removeCartItemsServiceIfUserAndDataexist(existingCartData[0].title,email);
        message = data.message;
        status = data.status;    
    }
    return {message,status}
}

const removeCartItemsServiceIfUserAndDataexist = async(title:string,email:string)=>{
    let message:string = '';
    let status:number = 0;
    await deleteCart(email,title,'null');
    message=Message.successfullyDeletedFromDb;
    status=Status.success;
    return {message,status}; 
}


export const updateCartQuantityService = async(email:string,title:string,quantity:string)=>{
    let message:string='';
    let status=0;
    const existingUser = await findUser(email);
    if(!existingUser[0]){
        message=Message.notExist;
        status=Status.notExist;
    }else{
        let data = await updateCartQuantityServiceIfUserExist(title,email,quantity);
        message = data.message;
        status = data.status;   
    }
    return {message,status};
}   

const updateCartQuantityServiceIfUserExist = async(title:string,email:string,quantity:string)=>{
    let message:string = '';
    let status:number = 0;
    const existingCartData = await findProductTitle(email,title,"null");
    if(!existingCartData[0]){
        message=Message.notExist;
        status=Status.notExist;
    }else{
        let data = await updateCartQuantityServiceIfUserAndDataExist(existingCartData[0].title,existingCartData[0].email,quantity);
        message = data.message;
        status = data.status;    
    }
    return {message,status}
}

const updateCartQuantityServiceIfUserAndDataExist = async(title:string,email:string,quantity:string)=>{
    let message:string = '';
    let status:number = 0;
     await updateCartData(email,title,'null',quantity,"quantity");
     message=Message.successfullyUpdatedInDb;
     status=Status.success;
    return {message,status};
}

export const checkoutService = async(email:string,titles:string[])=>{
    let message:string='';
    let status=0;
    const existingUser = await findUser(email);
    if(!existingUser[0]){
        message=Message.notExist;
        status=Status.notExist;
    }
    else{
        let data = await checkoutServiceIfUserExist(email,titles);
        message = data.message;
        status = data.status;
    }
    return {message,status}
}

const checkoutServiceIfUserExist = async(email:string,titles:string[])=>{
    let message:string='';
    let status:number = 0;
    for(let title of titles){
        const existingCartData = await findProductTitle(email,title,"null");
        if(!existingCartData[0]){
            message=Message.notExist;
            status=Status.notExist;
        }
        else{
            let data = await checkoutServiceIfUserAndDataExist(existingCartData[0].title,existingCartData[0].email);
            message = data.message;
            status = data.status;
        }
    }
    return {message,status};
}

const checkoutServiceIfUserAndDataExist = async(title:string,email:string)=>{
    let message:string = '';
    let status:number = 0;
    const date = new Date();
    await updateCartData(email,title,'null',date,"date");
    message=Message.successfullyUpdatedInDb
    status=Status.ok;
    return {message,status}
}

export const placedOrdersService = async(email:string)=>{
    let message:string = '';
    let status:number = 0;
    let title:string[]=[];
    let price:string[]=[];
    let quantity:string[]=[];
    let date:string[]=[];
    const existingUser = await findEmail(email); 
    if(!existingUser[0]){
        message=Message.notExist;
        status=Status.notExist;
    }
    else{
        for(let obj of existingUser){
            if(obj.date!=="null"){
                title.push(obj.title);
                price.push(obj.price);
                quantity.push(obj.quantity);
                date.push(obj.date);
            }
        }
        message=Message.successfullySentDetails;
        status=Status.success;
    }
    return {message,status,title,price,quantity,date};
}