const Joi = require('joi');
const mongoose =require('mongoose');
const genreSchema = new mongoose.Schema({
	name:{
		type:String,
        required:true,
        minlength:5
		}

		});

const Genres = mongoose.model('Genre',genreSchema);
		

		function validateInput(movie){

	const schema={
       
       name: Joi.string().min(5).max(50).required()
       //dirname:Joi.string().min(3)

	};

	return Joi.validate(movie, schema);
}
exports.genreSchema=genreSchema;
exports.Genres=Genres;
exports.validate=validateInput;