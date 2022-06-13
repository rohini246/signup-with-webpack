import {db} from '../dbConfig/config';
import { runQuery } from '../repo/run';
export const findUser = async (email:string):Promise<any> => {
    const sqlQuery:string = `SELECT * FROM shoppingcart.user WHERE email = "${email}"`;
    return await runQuery(sqlQuery);  
}

export const saveUser = async(name:string,email:string,address:string,password:string):Promise<any>=>{
    const sqlQuery:string = `INSERT INTO shoppingcart.user  VALUE ('${name}','${email}','${address}','${password}',null)`;
    await runQuery(sqlQuery);
}

export const updateUser = async(email:string,field:string,fieldData:string):Promise<any>=>{
    const sqlQuery:string = `UPDATE shoppingcart.user SET ${field}='${fieldData}' WHERE email='${email}'`;
    // db.query(`UPDATE user SET ${field}=${fieldData} WHERE (email=${email})`,async(err,result)=>{
    //     if(err) console.log(err);
    //     if(result[0]) return result[0];
    // })
    return await runQuery(sqlQuery);

}