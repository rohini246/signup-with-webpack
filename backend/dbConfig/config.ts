import mysql from 'mysql';
import dovenv from 'dotenv';
dovenv.config();
export const db = mysql.createConnection( {
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.password,
    database : process.env.database
} );