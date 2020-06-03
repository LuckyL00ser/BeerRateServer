import mongoose from 'mongoose'
const beerSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    beerType: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BeerType'
        }]
    },
    brewery: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Brewery'
    },
    user: {  type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: {type:String, required:true},
    IBU: { type:Number},
    alcoholPercentage: {type:Number},
    image: {type:String},
    createdDate: { type: Date, default: Date.now }
});
const Beer = mongoose.model('Beer',beerSchema);

export default Beer;
