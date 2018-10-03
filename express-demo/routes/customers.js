const {Customers,validate}=require('../models/customers');
const express = require('express');
const router = express.Router();

// create Routes :- Get Operation

	router.get('/',async(req,res)=>{
		const customerData= await Customers.find();
		 console.log(customerData);
		 res.send(customerData);
	});

// Get Operation :- Get Customer By phoneNuber

	router.get('/:id',async(req,res)=>{
		const customerData= await Customers.find({phone:req.params.id});
		if(!customerData)return;
		res.send(customerData);
	});

//Post Operation :-Create Customeer
    //Data validation using Joi
    //update
	
    router.post('/',async (req,res)=>{

    	const {error}=validate(req.body);

    	if(error) return;
    	
    	const newData = new Customers({
    		name:req.body.name,
    		phone:req.body.phone
    		
    	});

    	const result = await newData.save()
    		.then(data=> res.send(data))
    		.catch(error=>console.log("Error"+error));
    	    console.log(result);
    });

// Update Operation :- 
	//query first approch
	//find first
	//validate input
	//update

	router.put('/:id',async(req,res)=>{

		// const updatecustomer= await Customers.update({phone:req.params.id},{
		// 	$set:{
		// 		name:req.body.name,
		//           phone:req.body.phone
		// 		}
		// });
		// 
		try{
			const updatecustomer= await Customers.find({phone:req.params.id});
		if(!updatecustomer) return res.status(404).send('Error not found');
		  updatecustomer[0].name="xxxxxxxx";
          const result = updatecustomer[0].save();
             res.send(updatecustomer[0]);
           	console.log(updatecustomer[0]);

           	
		}catch(ex){
			console.log('error'+ ex);
			
		}
		
		
		

	});

// Delete Operation:-

	router.delete('/:id',async(req,res)=>{
		const result = await Customers.deleteOne({phone:req.params.id});
		if(!result)return;
		res.send(result);
	});




	module.exports=router;