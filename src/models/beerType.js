import mongoose from 'mongoose'
const beerTypeSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }
});
const BeerType = mongoose.model('BeerType',beerTypeSchema);

export default BeerType;
