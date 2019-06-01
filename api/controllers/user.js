const mongoose = require("mongoose");
const User = require("../models/user");
const async = require('async');

exports.get_users_all = (req, res, next) => {
    User.find().sort({user_id:1}).select('user_id name')
    .exec()
    .then(docs=> {
        res.status(200).json(docs);
     })
     .catch(err=>{
        res.status(500).json({
          error: err
        });
     });
}

exports.get_user_by_cordinates = (req, res, next) => {
  let long = req.params.long ;
  let latt = req.params.lat ;
  User.find({
    location: {
     $near: {
      $maxDistance: 100000,                         // distance in meters
      $geometry: {
       type: "Point",
       coordinates: [parseFloat(long), parseFloat(latt)]
      }
     }
    }
   }).sort({user_id:1}).select('user_id name')
  .exec()
   .then(docs=> {
      res.status(200).json(docs);
   })
   .catch(err=>{
      res.status(500).json({
        error: err
      });
   });
}

exports.create_user_by_file_data = async (req, res, next) => {
  const data = req.body;
  const promises = data.map(async doc=>{
            var temp_doc = JSON.parse(doc);
            temp_doc._id = new mongoose.Types.ObjectId();
            temp_doc.location = { 
                "type": "Point",
                "coordinates": [parseFloat(temp_doc.longitude), parseFloat(temp_doc.latitude)]
              }
            delete temp_doc.latitude
            delete temp_doc.longitude
            return new User(temp_doc);
  });
  const users = await Promise.all(promises);
  User.create(users)
  .then(result=>{
     res.status(200).json({message:"File Data has been stored to cloud"});
  })
  .catch(error=>{
   res.status(500).json(error);
  })
}