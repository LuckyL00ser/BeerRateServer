const jwt = require('jsonwebtoken');
import bcrypt from 'bcryptjs';
import User from '../models/user';



const authenticate = function (req, res,next) {

    User.findOne({username:req.body.username}, (err,result)=>{
        if(err) next(err);
        else{
            if (bcrypt.compareSync(req.body.password, result.hash)) {
                const { hash, ...userWithoutHash } = result._doc;
                const token = jwt.sign( {id:result._id} , process.env.SECRET);
                res.send({token,...userWithoutHash})
            }
            else
                res.status(401).send('Incorrect password')
        }
    })
};



const getById = function (req, res,next) {
    User.findOne({_id:req.params.id}).select('-hash').exec((err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};

const index =  function (req, res,next) {

    User.find({}).select('-hash').exec((err,result)=>{
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
        res.send(result);
    })
};
const update = function (req, res,next) {
    User.findOne({_id:req.params.id},(err,result)=>{
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
            const {hash, ...objectWithoutHash} = result._doc;
            res.send({...objectWithoutHash})
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

export default {getById,index,create,update,remove,authenticate}

