const {Movies, validate}=require('../models/movies');
const {Genres} = require('../models/genres');
const mongoose= require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/',async(req,res)=>{
 const movieList = await Movies.find();
 res.send(movieList);
 console.log(movieList);
});


router.post('/',async(req,res)=>{
	//validate input
	//create
	const {error}= validate(req.body);
    if(error)return res.status(400).send("error");
    let genre = await Genres.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid Id..');
	const movieData = new Movies({
         title:req.body.title,
         numberInStock:req.body.numberInStock,
         dailyRentalRate:req.body.dailyRentalRate,
         genres:{
         	_id:genre._id,
         	name:genre.name
         }                                                                        

	});

	await movieData.save(); // no need to write const result since nothingis reset
	res.send(movieData);
	console.log(movieData);
});

router.put('/:id', async(req,res)=>{

  const moviedata = await Movies.findById(req.params.id);
  const genredata = await Genres.findById(req.body.genreId);
   
	 moviedata.title=req.body.title;
	 moviedata.genres._id=genredata._id;
	 moviedata.genres.name=genredata.name;

	 const result =await moviedata.save();
	 res.send(result);
      console.log(result);
});

router.delete('/:id',async(req,res)=>{
	const result = await Movies.findByIdAndRemove(req.params.id);
	console.log(result);
	res.send(result);
});

module.exports= router;
