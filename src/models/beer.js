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
    description: {type:String, required:true},
    alcoholPercentage: {type:Number},
    image: {type:String},
    createdDate: { type: Date, default: Date.now }
});
const Beer = mongoose.model('Beer',beerSchema);

export default Beer;
