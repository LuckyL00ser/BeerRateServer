import Brewery from '../models/brewery';

const getById = function (req, res,next) {
    Brewery.findOne({_id:req.params.id},(err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};
const getNearbyBreweries = function (req, res,next) {
    Brewery.find({ location: {
            $near: {
                $geometry: {type:'Point',coordinates: [req.params.lat,req.params.lng]},
                $maxDistance: req.params.distance*1000
            }
        }},(err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};
const index =  function (req, res,next) {
    Brewery.find({...req.params},(err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};
const create = function (req, res, next) {
    req.body.owner = req.body.user_id
    Brewery.create(req.body,(err,result)=>{
        if(err) return next(err);
        res.send(result);
    })
};
const update = function (req, res,next) {
    Brewery.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,result)=>{
        if(err) next(err);
        else{
            res.send(result);
        }
    })
};
const remove = function (req, res,next) {
    Brewery.findByIdAndRemove(req.params.id,null,(err,result)=>{
            if(err)
                next(err);
            else
                res.send(result)
        }
    )
};

export default {getById,index,create,update,remove,getNearbyBreweries}

