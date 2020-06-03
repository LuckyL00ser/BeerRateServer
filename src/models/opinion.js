import mongoose from 'mongoose'
const opinionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    object: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    description: {type:String},
    rating: {type:Number},
    createdDate: { type: Date, default: Date.now }
});
const Opinion = mongoose.model('Opinion',opinionSchema);

export default Opinion;
