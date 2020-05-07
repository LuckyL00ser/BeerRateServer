import Beer from '../models/beer';

const getById = function (req, res,next) {
    Beer.findOne({_id:req.params.id}).populate(['beerType','brewery']).exec((err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};

const index =  function (req, res,next) {
    Beer.find({...req.params}).populate(['beerType','brewery']).exec((err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};
const create = function (req, res, next) {

    Beer.create(req.body,(err,result)=>{
        if(err) return next(err);
        res.send(result);
    })
};
const update = function (req, res,next) {
    Beer.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,result)=>{
        if(err) next(err);
        else{
            res.send(result);
        }
    })
};
const remove = function (req, res,next) {
    Beer.findByIdAndRemove(req.params.id,null,(err,result)=>{
            if(err)
                next(err);
            else
                res.send(result)
        }
    )
};

export default {getById,index,create,update,remove}

