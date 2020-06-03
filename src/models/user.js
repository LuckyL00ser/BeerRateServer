import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    hash: {type: String, required: true, select:false},
    avatarImage: {type:String},
    userRole: {
      type:'String',
      enum: ['consumer','breweryOwner','admin'],
      default: 'breweryOwner'
    },
    createdDate: {type: Date, default: Date.now}
});
const User = mongoose.model('User', userSchema);

export default User;
