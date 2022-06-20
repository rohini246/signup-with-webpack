import { Iproduct } from '../models/cart';
import { runQuery } from './run';

export const findProduct = async (email:string,title:string,date:string|null):Promise<Iproduct[]> => {
    const sqlQuery:string = `SELECT * FROM shoppingcart.cart WHERE email='${email}' AND title='${title}' AND date='${date}' `;
    return await runQuery(sqlQuery);   
}

export const updateCartData = async(email:string,title:string,date:any,fieldData:any,field:string)=>{
    const sqlQuery:string = `UPDATE shoppingcart.cart SET ${field}='${fieldData}' WHERE email='${email}' AND title='${title}' AND date="${date}"`;
   await runQuery(sqlQuery);
}

export const saveCart = async(title:string,price:string,email:string,quantity:string,image:any)=>{
    const sqlQuery:string = `INSERT INTO shoppingcart.cart VALUES ("${title}","${price}","${email}","${quantity}","null","null","${image}")`;
    await runQuery(sqlQuery);
}

export const findProductDate = async (email:string,date:string|null):Promise<Iproduct[]> => {
    const sqlQuery:string = `SELECT * FROM shoppingcart.cart WHERE email ='${email}' AND date='${date}'`;
    return await runQuery(sqlQuery);   
}

export const findEmail = async (email:string):Promise<Iproduct[]> => {
    const sqlQuery:string = `SELECT * FROM shoppingcart.cart WHERE email = "${email}"`;
    return await runQuery(sqlQuery);  
}

export const deleteCart = async (email:string,title:string,date:any) => {
    const sqlQuery:string = `DELETE FROM shoppingcart.cart WHERE email='${email}' AND date='${date}' AND title='${title}'`;
    await runQuery(sqlQuery);  
}

export const findProductTitle = async (email:string,title:string,date:any):Promise<Iproduct[]> => {
    const sqlQuery:string = `SELECT * FROM shoppingcart.cart WHERE email ='${email}' AND title='${title}' AND date='${date}'`;
    return await runQuery(sqlQuery); 
}