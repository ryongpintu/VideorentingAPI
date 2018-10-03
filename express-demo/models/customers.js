const Joi= require('joi');
const mongoose = require('mongoose');
	const customerSchema = new mongoose.Schema({

		name:{
			type:String,
			minlength:3,
			required:true
		},
		phone:{
			type:String,
			required:true

		},
		isGold:{
			type:Boolean,
			default:false
		}
	});

// create Class to aceess the database

	const Customers = mongoose.model('customer',customerSchema);
// Joi validation function containing Schema to varify or check

	function validateCustomers(customerDetail){


		const schemaOfCustomer={
			name:Joi.string().min(3).required(),
			phone:Joi.string().required()
		};

		return Joi.validate(customerDetail, schemaOfCustomer);
	}    


	exports.Customers=Customers;
	exports.validate=validateCustomers;