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
//TODO:: implement revoking tokense
async function isRevoked(req, payload, done) {
    User.findById(payload.id,(err,res)=>{
        if(err) return done(null,true)
        done();
    })
};

export default jwt;