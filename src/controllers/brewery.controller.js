import Brewery from '../models/brewery';
import Beer from "../models/beer";
import Opinion from "../models/opinion";

const getById = function (req, res,next) {
    Brewery.findOne({_id:req.params.id}).populate('user').exec((err,result)=>{
        if(err) next(err);
        else{
            Opinion.aggregate([
                    {$match: {object: result._id}},
                    {$group: {
                            _id:"$object",
                            avgRating:{ $avg: "$rating"}
                        }},
                ],
                function (err,rating) {
                    if(rating.length)
                        result._doc.avgRating = rating[0].avgRating;


                    res.send(result);
                })
        }

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
    Brewery.find({name: { $regex: (req.query.name?req.query.name:""), $options: 'i' }}).exec((err,result)=>{
        if(err) next(err);
        else
            res.send(result);
    })
};
const create = function (req, res, next) {
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

