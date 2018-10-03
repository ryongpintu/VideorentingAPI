const {User}=require('../../../models/user');
const jwt = require('jsonwebtoken');
const config=require('config');
const mongoose = require('mongoose');

describe('verifyToken',()=>{
	it('should return valid jwt token on getting cutomer detail',()=>{
       const payload = {
       	_id:new mongoose.Types.ObjectId().toHexString(),
       	isAdmin:true
       };
       const user = User(payload);
       
       const token=user.generateAuthToken();
       const decode = jwt.verify(token,config.get('jwtPrivateKey'));
      
       expect(decode).toMatchObject(payload);
	});
});