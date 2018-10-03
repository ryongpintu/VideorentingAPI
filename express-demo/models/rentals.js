
const mongoose = require('mongoose');


const Rental = mongoose.model('Rental',new mongoose.Schema({
 customer:{
   
   type:new mongoose.Schema({
   		name:{
   			type:String,
   			required:true,
   			minlength:5

   		},
   		isGold:{
   			type:Boolean,
   			default:false
   		},
   		phone:{
   			type:String,
   			required:true,
   			minlength:5

   		}
   }),
   required:true
   
 },
 movie:{
 	type:new mongoose.Schema({
 		title:{
 			type:String,
 			required:true,
 			minlength:5
 		},
 		dailyRentalRate:{
 			type:Number,
 			required: true,
 			min:0
 		}
 	}),
 	required:true

 },
 dateOut:{

 	type:Date,
 	default:Date.now,
 	required:true
 },
 returnDate:{
 	type:Date
 },
 rentalFee:{
 	type:Number,
 	min:0
 }
}));

function validateInput(rentalData){

	const schema={

		customerId:Joi.objectId().required(),
		movieId: Joi.objectId().required()
	};

	return Joi.validate(rentalData,schema);
}


module.exports.Rental=Rental;
module.exports.validate=validateInput;