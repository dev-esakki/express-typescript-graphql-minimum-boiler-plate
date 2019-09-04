import * as mongoose from 'mongoose'
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''        
    },
    status: {
        type: Number,
        default: 0 // 0 - inactive, 1- active, 2- de-activate
    }, 
})
const userModal = mongoose.model('user', userSchema);
export default userModal
