import { runQuery } from "./run";
export const findCountryId = async (country:string):Promise<any> => {
    const sqlQuery:string = `SELECT id FROM shoppingcart.country WHERE country='${country}'`;
    return await runQuery(sqlQuery);   
}

export const findStatesOfCountry = async(id:number):Promise<any>=>{
    const sqlQuery:string = `SELECT state FROM shoppingcart.state WHERE country_id='${id}'`;
    return await runQuery(sqlQuery);
}

export const findStateId = async (state:string):Promise<any> => {
    const sqlQuery:string = `SELECT id FROM shoppingcart.state WHERE state='${state}'`;
    return await runQuery(sqlQuery);   
}

export const findCityOfStates = async(id:number):Promise<any> =>{
    const sqlQuery:string =`SELECT city from shoppingcart.city WHERE state_id='${id}'`
    return await runQuery(sqlQuery);  
}

export const findCityId = async (city:string):Promise<any> => {
    const sqlQuery:string = `SELECT id FROM shoppingcart.city WHERE city='${city}'`;
    return await runQuery(sqlQuery);   
}

export const findZipOfCity = async(id:number):Promise<any> =>{
    const sqlQuery:string =`SELECT zip from shoppingcart.zip WHERE id='${id}'`
    return await runQuery(sqlQuery);  
}