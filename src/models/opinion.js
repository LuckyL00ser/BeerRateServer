import mongoose from 'mongoose'
const opinionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    beer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Beer',
        required: true,
    },
    description: {type:String},
    rating: {type:Number},
    createdDate: { type: Date, default: Date.now }
});
const Opinion = mongoose.model('Opinion',opinionSchema);

export default Opinion;
