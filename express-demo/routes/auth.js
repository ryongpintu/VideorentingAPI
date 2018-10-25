const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const _ =require('lodash');
const router = express.Router();


router.post('/',async(req,res)=>{
	console.log("login body "+JSON.stringify(req.body));
	const {error} =authenticateUser(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	
	 let user = await User.findOne({email:req.body.email});
	 if(!user) return res.status(400).send("Invalid email or password");
	 const validpassword = await bcrypt.compare(req.body.password,user.password);
	 if(!validpassword) return res.status(400).send('Invalid email or password');
	const token= user.generateAuthToken();
	
	res.send({token});
	
});
// information expert principle
function authenticateUser(userData){
	const schema={
		
		email:Joi.string().min(5).max(255).required().email(),
		password:Joi.string().min(5).max(255).required()
	}

	return Joi.validate(userData,schema);
}
module.exports= router;