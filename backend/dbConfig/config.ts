import mysql from 'mysql2';
import dovenv from 'dotenv';
dovenv.config();
export const db = mysql.createConnection( {
    host : "localhost",
    user : "root",
    password : "123456789",
    database : "shoppingcart"
} );