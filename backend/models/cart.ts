import mongoose from 'mongoose';
import {Schema} from 'mongoose';
export const cartSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: false },
    title:{
        type:String    
    },
    price: {
        type:String 
    },
    email:{
        type:String
    },
    quantity:{
        type:String
    },
    date:{
        type:String
    }
});
const cart = mongoose.model("carts", cartSchema);
export default cart;
