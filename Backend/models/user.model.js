import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,

        default: false,
        required: true
    },
    cartItems:{
        type:Object,
        default:{}
    }
},{minimize:false})



const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);

export default UserModel
