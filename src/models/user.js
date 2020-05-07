import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    hash: {type: String, required: true, select:false},
    avataImage: {type:String},
    createdDate: {type: Date, default: Date.now}
});
const User = mongoose.model('User', userSchema);

export default User;
