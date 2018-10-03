const Joi = require('joi');
const mongoose= require('mongoose');
const {genreSchema} = require('./genres');

const Movies = mongoose.model('Movie',new mongoose.Schema({
 title:String,
 numberInStock:Number,
 dailyRentalRate:Number,
 genres:{
 	type:genreSchema,
 	required:true
 }

}));

function validateInput(movie){

	const schema={
		title:Joi.string().min(5).required(),
		numberInStock:Joi.number().min(0),
		dailyRentalRate:Joi.number().min(0),
		genreId:Joi.objectId().required()
	};

	return Joi.validate(movie,schema);
}

module.exports.Movies =Movies;
module.exports.validate = validateInput;