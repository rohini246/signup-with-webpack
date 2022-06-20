import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ErrorHandler } from './errorMiddleware/errorHandler';
import signupRoutes from './routes/signup';
import loginRoutes from './routes/login';
import forgotRoutes from './routes/forgot';
import resetRoutes from './routes/resetPass';
import cartRoutes from './routes/cart';
import productsRoutes from './routes/products';
import addressRoutes from './routes/address';
import {db} from './dbConfig/config';

dotenv.config();
const port = process.env.PORT||5500;

const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://localhost:8080'
}));

app.use('/signup',signupRoutes);
app.use('/login',loginRoutes);
app.use('/forgot',forgotRoutes);
app.use('/resetPass',resetRoutes);
app.use('/cart',cartRoutes);
app.use('/products',productsRoutes);
app.use('/address',addressRoutes)

const errorHandler = new ErrorHandler();
app.use(errorHandler.errorHandler);
db.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

app.listen(port, () => {console.log(`Listening on port ${port}`);});

