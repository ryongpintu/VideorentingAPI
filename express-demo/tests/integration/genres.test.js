const request=require('supertest');
const mongoose=require('mongoose');
const {Genres}=require('../../models/genres');
const {User}=require('../../models/user');

describe('/api/genre',()=>{
	let server;
	beforeEach(()=>{
		server=require('../../index');
	});
	afterEach(async()=>{
		await server.close();
		await Genres.remove({});
	});
	describe('GET /',()=>{
		it('should return all the genre',async()=>{
			Genres.collection.insertMany([
				{name:'genre1'},
				{name:'genre2'}
				]);

			
			const res=await request(server).get('/api/genre');
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some(g=>g.name==='genre1')).toBeTruthy();
			expect(res.body.some(g=>g.name==='genre2')).toBeTruthy();
		});
		
	});

	describe('GET /:id',()=>{
		it('should return the genre if id is valid',async()=>{
		const genres=new Genres({name:'genre3'});
		const result=await genres.save();
		const res=await request(server).get('/api/genre/'+genres._id);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('name',genre.name);
		});

		it('should 404 if id is invalid',async()=>{
		const res=await request(server).get('/api/genre/1');
		expect(res.status).toBe(404);

		});
	});

	describe('POST /',()=>{

		let token;
		let name;
		const exec=async()=>{
			return  await request(server)
				.post('/api/genre')
				.set('x-auth-token',token)
				.send({name:name});
		}

		beforeEach(()=>{
			token = new User().generateAuthToken();
			name='genre1';

		});



		it('return 401 if user is not logged in',async()=>{
			token='';
			const res=await exec();
			expect(res.status).toBe(401);
		});
		it('return 400 if user if input has char less than 5',async()=>{
			name='genr';
			const res=await exec();
			
			expect(res.status).toBe(400);
		});

		it('return 400 if user if input has char more than 50',async()=>{
			
			name= new Array(52).join('a');
			const res=await exec();
			
			expect(res.status).toBe(400);
		});

		it('should save genre if input is valid',async()=>{
			name= new Array(10).join('a');
			const res=exec();

			const result =await Genres.find({name:name});
			expect(result).not.toBeNull();
			// expect(res.body).toHaveProperty('name',name);
		});
		it('should return genre if input is valid',async()=>{
			
			const res=await exec();
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('name',name);
		});

	});

	describe('PUT /:id',()=>{
		let token;
		let _id;
		let name;
		let genre;
		const exec = async()=>{
			return await request(server)
			.put('/api/genre/'+_id)
			.set('x-auth-token',token)
			.send({name});
		}
   
		beforeEach(async()=>{
			
		    genrex = new Genres({name:'genre4'});
			await genrex.save();
			token= new User().generateAuthToken();
			_id=genrex._id;

			name='newName';

		});
		it('should return 401 if user is not logged in',async()=>{
			token='';
			
			const res= await exec();
			expect(res.status).toBe(401);

		});
		it('should return 404 if id is invalid',async()=>{
			
			_id='this';
			const res= await exec();
			expect(res.status).toBe(404);

		});

		it('should return 200 if id is invalid',async()=>{
			
		
			const res= await exec();
			expect(res.status).toBe(200);

		});
		it('should return 404 if input is invalid char less than 5',async()=>{
			
			name='genr';
			const res= await exec();
			expect(res.status).toBe(404);

		});
		it('should return 404 if input is invalid char more than 50',async()=>{
			
			name=new Array(52).join('a');
			const res= await exec();
			expect(res.status).toBe(404);

		});

		it('should retun 200 if input is valid',async()=>{
			
			
			const res= await exec();
			expect(res.status).toBe(200);

		});

		it('should retun genre if input is valid',async()=>{
			
			
			const res= await exec();
			expect(res.body).toHaveProperty('name',name);

		});
		it('should update genre if input is valid',async()=>{
			
			
			const res= await exec();
			const result = Genres.findById(_id);
			expect(result).not.toBeNull();

		});

	});

	describe('DELETE /:id',()=>{
		let token;
		let genre;
		let user;
		let _id;
		const exec= async()=>{
			return await request(server)
			.delete('/api/genre/'+_id)
			.set('x-auth-token',token)
			.send({});
		}
		beforeEach(async()=>{
			 user ={
				_id:mongoose.Types.ObjectId(),
				isAdmin:true
			}
			token = new User(user).generateAuthToken();
			genre =new Genres({name:'genre7'});
			await genre.save();
			_id=genre._id;
		});
		it('should return 404 if not logged in',async()=>{
			token='';
			const res= await exec();
			expect(res.status).toBe(401);
		});
		
		it('should return 403 if it is not admin',async()=>{
			user.isAdmin=false;
			token=new User(user).generateAuthToken()
			const res= await exec();
			expect(res.status).toBe(403);
		});

		it('should return 404 if id is invalid',async()=>{
			
			_id='aaa';
			const res= await exec();
			expect(res.status).toBe(404);
		});

		it('should return 404 if id is not found',async()=>{
			
			_id=mongoose.Types.ObjectId();
			const res= await exec();

			expect(res.status).toBe(404);
		});


		

		it('should delete genre if id is valid',async()=>{
			
			
			const res= await exec();

			const result =await Genres.findById(_id);

			expect(result).toBeNull();
		});

		it('should return genre if it delete the genre',async()=>{
			
			
			const res= await exec();

		
			expect(res.body).toHaveProperty('name',genre.name);
			expect(res.body).toHaveProperty('_id',genre._id.toHexString());

		});




		
	});
});