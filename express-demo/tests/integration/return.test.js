const {Rental}=require('../../models/rentals');
const mongoose = require('mongoose');

describe('/api/returns',()=>{
	let server;
	let customerId;
	let rental;
	beforeEach(async()=>{
		server=require('../../index');

		customerId = mongoose.Types.ObjectId();
		movieId= mongoose.Types.ObjectId();

		 rental = new Rental({
			customer:{
				_id:customerId,
				name:'12345',
				phone:'12345'
			},
			movie:{
				_id:movieId,
				title:'movie Title',
				dailyRentalRate:2
			}

		});

		await rental.save();
	});
	afterEach(async()=>{
		await server.close();

		await Rental.remove({});
		
	});

	it('should work',async()=>{
		const result =await Rental.findById(rental._id);
		expect(result).not.toBeNull();
	});

});