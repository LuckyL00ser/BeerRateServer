import User from "../models/user";
import jwt from 'jsonwebtoken'
import publicAccess from "../helpers/publicAccess";
import bcrypt from 'bcryptjs'

function generateTokens(user)  {
    const ACCESS_TOKEN = jwt.sign({
            sub: user._id,
            //   rol: user.role,
            type: 'ACCESS_TOKEN'
        },
        process.env.SECRET, {
            expiresIn: 120
        });
    const REFRESH_TOKEN = jwt.sign({
            sub: user._id,
            //  rol: user.role,
            type: 'REFRESH_TOKEN'
        },
        process.env.SECRET, {
            expiresIn: 480
        });
    return {
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN
    }
}

const authenticate = function (req, res,next) {

    User.findOne({email:req.body.email}).select(['username','email','hash','createdDate']).exec((err,result)=>{
        if(err) next(err);
        else if(result==null) res.status(404).send("User not found")
        else{
            if (bcrypt.compareSync(req.body.password, result.hash)) {
                const { hash, ...user } = result._doc;
                //const token = jwt.sign( {id:result._id} , process.env.SECRET,{expiresIn:'20m'});
                const {accessToken,refreshToken} = generateTokens(user);
                res.send({accessToken,refreshToken,user})
            }
            else
                res.status(401).send('Incorrect password')
        }
    })
};
const verify = function (req, res, next) {

    if(publicAccess.filter(e=>(req.path.startsWith(e.path) && e.methods.includes(req.method.toLowerCase()))).length){
        return next();
    }

    if (!req.headers.authorization) {
        return res.status(401).send({
            error: 'Token is missing'
        });
    }
    const BEARER = 'Bearer'
    const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ')
    if (AUTHORIZATION_TOKEN[0] !== BEARER) {
        return res.status(401).send("Token is not complete")
    }
    jwt.verify(AUTHORIZATION_TOKEN[1], process.env.SECRET, function(err,decoded) {
        if (err) {
            return res.status(401).send("Token is invalid");
        }
        req.body.user_id = decoded.sub;
        next();
    });
};
const verifyRefreshToken = function  (req, res, next) {
    if (!req.body.refreshToken) {
        res.status(401).send("Token refresh is missing")
    }
    const BEARER = 'Bearer'
    const REFRESH_TOKEN = req.body.refreshToken.split(' ')
    if (REFRESH_TOKEN[0] !== BEARER) {
        return res.status(401).send("Token is not complete")
    }
    jwt.verify(REFRESH_TOKEN[1], process.env.SECRET, function(err, payload) {
        if (err) {
            return res.status(401).send("Token refresh is invalid");
        }
        User.findById(payload.sub, function(err, person) {
            if(err) next(err);
            if (!person) {
                return res.status(401).send( 'Person not found');
            }
            return res.send({user:person,...generateTokens(person)});
        });
    });
}

export default {verify,verifyRefreshToken,authenticate}