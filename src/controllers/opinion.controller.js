import Opinion from '../models/opinion';

const getById = function (req, res,next) {
    Opinion.findOne({_id:req.params.id},(err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};

const index =  function (req, res,next) {
    Opinion.find({...req.query}).sort({createdDate: -1}).populate(['user']).exec((err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};
const create = function (req, res, next) {

    Opinion.create(req.body,(err,result)=>{
        if(err) return next(err);
        res.send(result);
    })
};
const update = function (req, res,next) {
    Opinion.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,result)=>{
        if(err) next(err);
        else{
            res.send(result);
        }
    })
};
const remove = function (req, res,next) {
    Opinion.findByIdAndRemove(req.params.id,null,(err,result)=>{
            if(err)
                next(err);
            else
                res.send(result)
        }
    )
};

export default {getById,index,create,update,remove}

