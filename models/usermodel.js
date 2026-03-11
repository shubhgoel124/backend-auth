import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isverified: {
        type: Boolean,
        default: false
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    forgotpasswordtoken: {
        type: String,
        default: null
    },
    forgotpasswordtokenexpiry: {
        type: Date,
        default: null
    },
    verifytoken: {
        type: String,
        default: null
    },
    verifytokenexpiry: {
        type: Date,
        default: null
    }
});
const user = mongoose.models.users || mongoose.model("users", userschema);
export default user;