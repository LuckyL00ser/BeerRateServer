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
        delete result.hash;
        res.send(result);
    })
};
const update = function (req, res,next) {
    User.findOne({_id:req.params.id}).select(['hash','username','email']).exec((err,result)=>{
        if(err) return next(err);
        //zmiana hasła
        if(req.body.oldPassword && req.body.password){
            if(bcrypt.compareSync(req.body.oldPassword, result.hash))
                result.hash = bcrypt.hashSync(req.body.password, 10);
            else{
                return next('Old password is incorrect')
            }
        }
        result.username = req.body.username;
        result.email = req.body.email;
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

