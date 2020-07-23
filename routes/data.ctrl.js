// 몽고db연결>
const { Spot } = require("../models/Spot");
const config = require("../config/key");

const mongoose = require('mongoose')
mongoose.connect(config.mongoURL , { 
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log("MONGO_DB connected"))
.catch(err => console.log(err))

// 몽고db연결>


//
const getAllData = (req, res) => {
    Spot.find( (err, spots) =>{
        if(err) return res.status(500).send({err : 'databaseErr'});
        res.json(Object.values(spots))
    })
}

const destory = (req, res) => {

}

const post = (req, res) => {
    const spot = new Spot(req.body)

    spot.save((err, userInfo) => {
        if(err) return res.json({success : false, err})

        return res.status(200).json({
            success : true
        }
        )
    })
}
  
  module.exports={
    getAllData,
    destory,
    post,
}