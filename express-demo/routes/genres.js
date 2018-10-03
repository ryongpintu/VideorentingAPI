const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genres,validate} = require('../models/genres');
const express = require('express');
const validateID = require('../middleware/validateID');
const mongoose= require('mongoose');

const router = express.Router();


router.get('/', async(req,res)=>{
    
	const genreData=await Genres.find();
	res.send(genreData);

});

router.get('/:id', validateID,async(req, res)=>{

//validate input
// find the movie
// return to client
const movieObj = await Genres.findById(req.params.id);
if(!movieObj) return res.status(404).send("This Id is Not Available");
res.send(movieObj);


	
});

router.post('/',auth,async (req,res)=>{


const resul= validate(req.body);
console.log(resul);

if(resul.error) return res.status(400).send(resul.error.details[0].message);

 const genreData= new Genres({

 	name:req.body.name
 	//director:req.body.dirname
 });

const result = await genreData.save();
res.send(result);


});

router.put('/:id', [auth,validateID],async(req,res)=>{

//Find the genres
//valiate input
//update

const foundResult = await Genres.findById(req.params.id);
if(!foundResult) return res.status(404).send('Not Found In the List');


const {error}= validate(req.body);
if(error) return res.status(404).send(error.details[0].message);

foundResult.name=req.body.name;
res.send(foundResult);
});


router.delete('/:id',[auth,admin,validateID],async (req,res)=>{
   //find
   //delete
   //rreturn
const foundResultToDelete = await Genres.findByIdAndDelete(req.params.id);
if(!foundResultToDelete) return res.status(404).send('Not Found In the List');


res.send(foundResultToDelete);

});



module.exports = router;