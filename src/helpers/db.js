import mongoose from 'mongoose';

const connectDb = ()=>{
    return  mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology:true}
            );
};
export default connectDb;




