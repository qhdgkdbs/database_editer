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
    const id = req.params.id;
    if(!id) return res.status(400).end();

    console.log(id);

    Spot.remove({ _id: id}, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        // ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        // if(!output.result.n) return res.status(404).json({ error: "book not found" });
        
        res.status(204).redirect('/editpage');
    })
}

const post = (req, res) => {
    console.log(req.body)

    const spot = new Spot(req.body)

    spot.save((err, userInfo) => {
        if(err) return res.json({success : false, err})

        return res.status(200).redirect('/editpage');
    })
}

const update = (req,res) => {
    // if(!id) return res.status(400).end(); 
    console.log(req.params.id)
    // Spot.findById(req.params.id, (err, data) => {
    //     res.json({message: data});

    // })
    // if(!(spot || des || moreLink || picLink || lat || lng)) return res.status(400).end();

    Spot.findById(req.params.id, (err, data) => {
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!data) return res.status(404).json({ error: 'data not found' });
 
        if(req.body.spot) data.spot = req.body.spot;
        if(req.body.des) data.des = req.body.des;
        if(req.body.moreLink) data.moreLink = req.body.moreLink;
        if(req.body.picLink) data.picLink = req.body.picLink;
        if(req.body.lat) data.lat = req.body.lat;
        if(req.body.lng) data.lng = req.body.lng;

        data.save( (err) => {
            if(err) res.status(500).json({error: 'failed to update'});
            // if(err) console.log(err);
            res.status(200).redirect('/editpage');
        });
    });

}
  
const editpage = (req, res) => {
    console.log("heloo")
    res.render('../views/index', { title: 'A' });
}
  module.exports={
    getAllData,
    destory,
    post,
    update,
    editpage,
}