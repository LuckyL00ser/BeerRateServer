import BeerType from '../models/beerType';

const getById = function (req, res,next) {
    BeerType.findOne({_id:req.params.id},(err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};

const index =  function (req, res,next) {
    BeerType.find({...req.params},(err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};
const create = function (req, res, next) {

    BeerType.create(req.body,(err,result)=>{
        if(err) return next(err);
        res.send(result);
    })
};
const remove = function (req, res,next) {
    BeerType.findByIdAndRemove(req.params.id,null,(err,result)=>{
            if(err)
                next(err);
            else
                res.send(result)
        }
    )
};

export default {getById,index,create,remove}

