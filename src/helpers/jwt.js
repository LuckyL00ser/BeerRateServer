const expressJwt = require('express-jwt');
import User from "../models/user";



function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret:secret, isRevoked:isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/login',
            '/api/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    User.findById(payload.sub,(err,res)=>{
        if(err) return done(null,true)
        done();
    })
};

export default jwt;