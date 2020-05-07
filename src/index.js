import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDb from './helpers/db';
import apiRoutes from './routes/api';
import authController from './controllers/auth.controller';
import errorHandler from './helpers/errorHandler'

dotenv.config();
const app = express();



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',authController.verify,apiRoutes);
//

app.use(errorHandler);
app.use(express.static(`${__dirname}/public/`));
app.get(/.*/,(req,res)=>res.sendFile(`${__dirname}/public/index.html`));

const port = process.env.PORT || 8080;

connectDb().then(() => {
    app.listen(port,()=>console.log(`app listening on ${port}`));
});
