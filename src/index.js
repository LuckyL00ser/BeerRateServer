import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDb from './helpers/db';
import apiRoutes from './routes/api';
import jwt from './helpers/jwt';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use('/api',apiRoutes);

//Handle production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(`${__dirname}/public/`));
    app.get(/.*/,(req,res)=>res.sendFile(`${__dirname}/public/index.html`));
}

const port = process.env.PORT || 8080;

connectDb().then(() => {
    app.listen(port,()=>console.log(`app listening on ${port}`));
});

//--ignore .gitignore --copy-files

