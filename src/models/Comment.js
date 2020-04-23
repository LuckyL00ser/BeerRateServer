import mongoose from 'mongoose'
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    opinion: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Opinion',
        required: true,
    },
    description: {type:String},
    createdDate: { type: Date, default: Date.now }
});
const Comment = mongoose.model('Comment',commentSchema);

export default Comment;
