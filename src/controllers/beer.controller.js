import Beer from '../models/beer';
import Opinion from "../models/opinion";
import mongoose from 'mongoose'

const getById = function (req, res,next) {

    Beer.findOne({_id:req.params.id}).populate(['beerType','brewery','user']).exec((err,result)=>{
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

const index =  function (req, res,next) {
    let query = {};
    let sort = {name: 1};
    if(req.query.sort){
        sort = {}
        sort[req.query.sort] = Number(req.query.sortDir);

    }
    if(req.query.name)
        query.name={ $regex: req.query.name?req.query.name:"", $options: 'i' }

    if(req.query.brewery)
        query.brewery=mongoose.Types.ObjectId(req.query.brewery)

    if(req.query.beerType)
        query.beerType={ $in: JSON.parse(req.query.beerType).map(x=>mongoose.Types.ObjectId(x)) }



    // Beer.find(query).populate(['beerType','brewery']).sort(sort).exec((err,result)=>{
    //     if(err) next(err);
    //     else
    //         res.send(result);
    // })
    Beer.aggregate([
        {$match:query},
        {
            $lookup:{
                "from": "opinions",
                "localField": "_id",
                "foreignField": "object",
                "as":"opinions"
            }
        },
        {
            $lookup:{
                "from": "breweries",
                "localField": "brewery",
                "foreignField": "_id",
                "as":"brewery"
            }
        },
        {
            $lookup:{
                "from": "beertypes",
                "localField": "beerType",
                "foreignField": "_id",
                "as":"beerType"
            }
        },
        {$unwind: {path: "$brewery",preserveNullAndEmptyArrays: true}},
        {
            $addFields:{
                avgRating: { $avg: "$opinions.rating"}
            }
        },
        {
            $sort: sort
        },
        {
            $unset: 'opinions'
        }


    ]).exec((err,result)=>{
        if(err) next(err)
        else
            res.send(result)
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

