import { Message } from "../constants/message";
import { Status } from "../constants/status";
import { Icart } from "../models/cart";
import { findProduct, findProductDate, saveCart, updateCartData, findEmail, deleteCart, findProductTitle } from "../repo/cart";
import { findUser } from '../repo/user'
export const cartService = async (data: Icart) => {
    const title = data.title;
    const price = data.price.trim();
    const email = data.email.trim();
    const image = data.image;

    console.log(title, price, image);
    let message: string = '';
    let status = 0;
    let quantity:string='';
    const existingUser = await findUser(email);
    if (!existingUser[0]) {
        message = Message.notExist;
        status = Status.notExist;
    }
    else {
        let data = await cartServiceIfUserExist(title, price, email, image);
        message = data.message;
        status = data.status;
        quantity = data.quantity
    }
    return { message, status, quantity:quantity }
}

const cartServiceIfUserExist = async (title: string, price: string, email: string, image: any) => {
    let message: string = '';
    let status: number = 0;
    let quantity:string = '';
    const existingCartData = await findProductTitle(email, title, "null");
    if (!existingCartData[0]) {
        let data = await createNewCart(title, price, email, image);
        message = data.message;
        status = data.status;

    } else {
        let data = await cartServiceIfUserAndDataExist(existingCartData[0].title, existingCartData[0].email, existingCartData[0].quantity);
        message = data.message;
        status = data.status;
        quantity = existingCartData[0].quantity


    }
    return { message, status ,quantity:quantity};
}

const cartServiceIfUserAndDataExist = async (title: string, email: string, quantity: string) => {
    let message: string = '';
    let status: number = 0;
    // let newQuantity = parseInt(quantity) + 1;
    // let updatedQuantity = newQuantity.toString();
    // // await updateCartData(email,title,'null',updatedQuantity,"quantity");
    message = "Product already present in cart";
    status = 300;
    return { message, status };
}

const createNewCart = async (title: string, price: string, email: string, image: any) => {
    if(image){

        await saveCart(title, price, email, "1", image);
        return { message: "Successfully Saveded.", status: 200 };
    }
    else{
        return {message:Message.notExist,status:Status.notExist}
    }
}
export const cartItemsService = async (email: string) => {

    let message: string = '';
    let status = 0;
    let title: string[] = [];
    let price: string[] = [];
    let quantity: string[] = [];
    let image: any[] = []
    const existingUser = await findProductDate(email, 'null');
    if (!existingUser[0]) {
        message = Message.notExist;
        status = Status.notExist;
    }
    else {
        for (let obj of existingUser) {
            if (obj.image) {
                title.push(obj.title);
                price.push(obj.price);
                quantity.push(obj.quantity);
                image.push(obj.image);
            }
        }
        message = Message.successfullySentDetails
        status = Status.success;
    }
    return { message, status, title, price, quantity, image };

}

export const removeCartItemsService = async (email: string, title: string) => {
    let message: string = '';
    let status = 0;
    const existingUser = await findEmail(email);
    if (!existingUser[0]) {
        message = Message.notExist;
        status = Status.notExist;
    }
    else {
        let data = await removeCartItemsServiceIfUserexist(email, title);
        message = data.message;
        status = data.status;
    }
    return { message, status }
}

const removeCartItemsServiceIfUserexist = async (email: string, title: string) => {
    let message: string = '';
    let status: number = 0;
    const existingCartData = await findProduct(email, title, 'null');
    if (!existingCartData[0]) {
        message = Message.notExist;
        status = Status.notExist;
    }
    else {
        let data = await removeCartItemsServiceIfUserAndDataexist(existingCartData[0].title, email);
        message = data.message;
        status = data.status;
    }
    return { message, status }
}

const removeCartItemsServiceIfUserAndDataexist = async (title: string, email: string) => {
    await deleteCart(email, title, 'null');
    return { message: Message.successfullyDeletedFromDb, status: Status.success };
}


export const updateCartQuantityService = async (email: string, title: string, quantity: string) => {
    let message: string = '';
    let status = 0;
    const existingUser = await findUser(email);
    if (!existingUser[0]) {
        message = Message.notExist;
        status = Status.notExist;
    } else {
        let data = await updateCartQuantityServiceIfUserExist(title, email, quantity);
        message = data.message;
        status = data.status;
    }
    return { message, status };
}

const updateCartQuantityServiceIfUserExist = async (title: string, email: string, quantity: string) => {
    let message: string = '';
    let status: number = 0;
    const existingCartData = await findProductTitle(email, title, "null");
    if (!existingCartData[0]) {
        message = Message.notExist;
        status = Status.notExist;
    } else {
        let data = await updateCartQuantityServiceIfUserAndDataExist(existingCartData[0].title, existingCartData[0].email, quantity);
        message = data.message;
        status = data.status;
    }
    return { message, status }
}

const updateCartQuantityServiceIfUserAndDataExist = async (title: string, email: string, quantity: string) => {
    await updateCartData(email, title, 'null', quantity, "quantity");
    return { message: Message.successfullyUpdatedInDb, status: Status.success };
}

export const checkoutService = async (email: string, titles: string[], address:string) => {
    let message: string = '';
    let status = 0;
    const existingUser = await findUser(email);
    if (!existingUser[0]) {

        message = Message.notExist;
        status = Status.notExist;
    }
    else {
        // console.log("titles", titles);
        if (titles) {

            let data = await checkoutServiceIfUserExist(email, titles, address);
            message = data.message;
            status = data.status;
        }
        else {
            message = Message.notExist;
            status = Status.notExist;
        }
    }
    // console.log(message, status);
    return { message, status }
}

const checkoutServiceIfUserExist = async (email: string, titles: string[], address: string) => {
    let message: string = '';
    let status = 0;
    for (let title of titles) {
        const existingCartData = await findProductTitle(email, title, "null");
        if (!existingCartData[0]) {
            message = Message.notExist;
            status = Status.notExist;
        }
        else {    
            let data = await checkoutServiceIfUserAndDataExist(existingCartData[0].title, existingCartData[0].email, address);
            message = data.message;
            status = data.status;
        }
    }
    return { message, status };
}

const checkoutServiceIfUserAndDataExist = async (title: string, email: string, address: string) => {
    const date = new Date();
    await updateCartData(email, title, 'null', date, "date");
    await updateCartData(email, title, date, address, "address");
    return { message: Message.successfullyUpdatedInDb, status: Status.ok }
}

export const placedOrdersService = async (email: string) => {
    let message: string = '';
    let status: number = 0;
    let title: string[] = [];
    let price: string[] = [];
    let quantity: string[] = [];
    let date: string[] = [];
    let address: string[] = [];
    let image: any[] = [];
    const existingUser = await findEmail(email);
    if (!existingUser[0]) {
        message = Message.notExist;
        status = Status.notExist;
    }
    else {
        for (let obj of existingUser) {
            if (obj.date !== "null") {
                title.push(obj.title);
                price.push(obj.price);
                quantity.push(obj.quantity);
                date.push(obj.date);
                address.push(obj.address);
                image.push(obj.image);
            }
        }
        message = Message.successfullySentDetails;
        status = Status.success;
    }
    return { message, status, title, price, quantity, date, address, image };
}

export const addressService = async(email:string)=>{
    const existingUser = await findEmail(email);
    if(!existingUser[0]){
        return {message:Message.notExist,status:Status.notExist,address:''}
    }
    else{
        const user = await findUser(email);
        let setOfAddress = new Set();
        for(let address of existingUser){
            if(address.address!=='null'){
                setOfAddress.add(address.address.toLowerCase());
            }
        }
        if(!user[0]){
            console.log(setOfAddress)
            return {message:Message.successfullySentDetails,status:Status.success,address:Array.from(setOfAddress)}
        }
        else{
            setOfAddress.add(user[0].address.toLowerCase());
            console.log(setOfAddress)
            return {message:Message.successfullySentDetails,status:Status.success,address:Array.from(setOfAddress)}
        }
    }

}