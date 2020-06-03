const jwt = require('jsonwebtoken');
import bcrypt from 'bcryptjs';
import User from '../models/user';


const getById = function (req, res,next) {
    User.findOne({_id:req.params.id},(err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};

const index =  function (req, res,next) {

    User.find({},(err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};
const create = function (req, res, next) {

    if (req.body.password) {
        req.body.hash = bcrypt.hashSync(req.body.password, 10);
    }

    User.create(req.body,(err,result)=>{
        if(err) return next(err);
        const {hash, ...user} = result._doc;
        res.send(user);
    })
};
const update = function (req, res,next) {
    User.findOne({_id:req.params.id}).select(['hash','username','email','createdDate','avatarImage','userRole']).exec((err,result)=>{
        if(err) return next(err);
        //zmiana hasła
        if(req.body.oldPassword && req.body.password){
            if(bcrypt.compareSync(req.body.oldPassword, result.hash))
                result.hash = bcrypt.hashSync(req.body.password, 10);
            else{
                return next('Old password is incorrect')
            }
        }
        if(req.body.username)
            result.username = req.body.username;
        if(req.body.email)
            result.email = req.body.email;
        if(req.body.avatarImage)
            result.avatarImage = req.body.avatarImage;
        if(req.body.userRole)
            result.userRole = req.body.userRole;

        result.save(function(error){
            if(error)
                return next(error);
            const {hash, ...user} = result._doc;
            res.send({user})
        });

    })
};
const remove = function (req, res,next) {
    User.findByIdAndRemove(req.params.id,null,(err,result)=>{
        if(err)
            next(err);
        else
            res.send(result)
        }
    )
};

export default {getById,index,create,update,remove}

