const express = require('express');
const movieGenre=require('../routes/genres');
const home = require('../routes/home');
const customer=require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const user= require('../routes/users');
const auth= require('../routes/auth');
const resHeader = require('../middleware/resHeader')
const error = require('../middleware/error'); 

 module.exports = function(app){
	 app.use(express.json());
	 app.use(resHeader);
    app.use('/api/genre',movieGenre);
	app.use('/',home);
	app.use('/api/customer',customer);
	app.use('/api/movie',movies);
	app.use('/api/rental',rentals);
	app.use('/api/users',user);
	app.use('/api/auth',auth);
	app.use(error);
	
}