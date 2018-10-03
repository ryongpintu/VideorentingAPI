const config = require('config');
const morgan =require('morgan');
// const express = require('express');
module.exports=function(app){

	if(!config.get('jwtPrivateKey')){ 
		throw new Error("FATAL ERROR : jwtPrivateKey is not defined");
		
	}

	if(app.get('env')==='development'){
        app.use(morgan('tiny'));
		console.log('Morgan Enabled');
	}
}