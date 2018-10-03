const {Rental, validate}= require('../models/rentals');
const {Customers}= require('../models/customers');
const {Movies} =require('../models/movies');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
Fawn.init(mongoose);
router.get('/', async (req,res)=>{
  const rentalData = await Rental.find().sort('-dateOut');
  res.send(rentalData);
  console.log(rentalData);

});

router.post('/' ,async(req,res)=>{
    
	const {error} = validate(req.body);
	if(error) return res.status(400).send('Invalid data '+error);
	const customerData = await Customers.findById(req.body.customerId);
	const movieData = await Movies.findById(req.body.movieId);
	if(!customerData && !movieData) return res.status(400).send('Invalid customerId or movieID');
	if (movieData.numberInStock === 0) return res.status(400).send('Movie not in stock.');

	const newRental = new Rental({
    	customer:{
    		name:customerData.name,
		    phone:customerData.phone,
		    _id:customerData._id
    	},
    	movie:{
    		title:movieData.title,
    		dailyRentalRate:movieData.dailyRentalRate

    	}
	});
    try{
    	new Fawn.Task()
		.save('rentals',newRental)
		.update('movies',{_id:movieData._id},{
			$inc:{numberInStock:-1}
		})
		.run();
		res.send(newRental);
    }catch(ex){

      res.status(500).send("something went wrong"+ex);

    }
	

});

module.exports= router;