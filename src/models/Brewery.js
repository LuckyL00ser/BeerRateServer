import mongoose from 'mongoose'
const brewerySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    location:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], //[long,lat]
            required: true
        }
    },
    email: {type: String},
    phone: {type: String},
    description: {type:String},
    createdDate: { type: Date, default: Date.now }
});
brewerySchema.index({'location':'2dsphere'});
const Brewery = mongoose.model('Brewery',brewerySchema);

export default Brewery;
