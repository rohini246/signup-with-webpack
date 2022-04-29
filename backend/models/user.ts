import mongoose from 'mongoose';
import {Schema} from 'mongoose';

export const userSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: false },
    name:{
        type:String    
    },
    email: {
        type:String 
    },
    address:{
        type:String  
    },
    password:{
        type:String
    },
});


const user = mongoose.model("users", userSchema);

export default user;
