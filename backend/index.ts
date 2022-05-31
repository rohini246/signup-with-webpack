import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import { ErrorHandler } from './errorMiddleware/errorHandler';
import signupRoutes from './routes/signup';
import loginRoutes from './routes/login';
import forgotRoutes from './routes/forgot';
import resetRoutes from './routes/resetPass';
import cartRoutes from './routes/cart';
import productsRoutes from './routes/products';


const port: number = 5500;
const url:string = "mongodb://localhost:27017/users";

// mongoose.connect(url, (err: any) =>{
//     if (err) {
//     console.log(err.message);
//     } else {
//     console.log(`Connecting to MONGO`);
//     } 
// });

var connection = mysql.createConnection( {
    host : 'localhost',
    user : "root",
    password : "123456789",
    database : 'shoppingcart'
} );
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});


const app = express();
app.use(express.json());
app.use(cors());
app.use('/signup',signupRoutes);
app.use('/login',loginRoutes);
app.use('/forgot',forgotRoutes);
app.use('/resetPass',resetRoutes);
app.use('/cart',cartRoutes);
app.use('/products',productsRoutes);

const errorHandler = new ErrorHandler();
app.use(errorHandler.errorHandler);

app.listen(port, () => {console.log(`Listening on port ${port}`);});

