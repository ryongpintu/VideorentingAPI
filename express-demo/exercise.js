const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDB')
	.then(result=>console.log('connected to mongodb'))
	.catch(err=>console.log('error '+ err));



	const schema = new mongoose.Schema({
		
        tags:{            

        	type:Array,
        	
        	validate:{         // Here tags field has customs validator and async one. 
        		isAsync:true,  // making the validator async in nature.
        		validator:function(v, callback){
        			setTimeout(()=>{
        				const result= v && v.length > 0;
        				callback(result);
        			},1000);
        			
        		}
        	},
        	message:"A tags for  course is required "
        },
        isPublihsed:Boolean,
        category:{

        	type:String,
        	required:true,
        	enum:['web','mobile'],
        	lowecase:true,
        	trim:true,
        	//uppercase:true
        },
		name:{
			type:String,
			minlength:5,
			maxlength:255,
			//match:/pattern/
			

		},
		price:{
			type:Number,
			min:10,
			max:200,
			set:v=>Math.round(v);
			get:v=>Math.round(v);
			require:function(){this.isPublihsed}
		}

	});


	const Course = mongoose.model('mycourse',schema);
// create course in database
async function createCourse(){
	const course = new Course({

	name:"Pintu",
	price:20,
	tags:"Jcode",
	category:"x",
	isPublihsed:true
});
   try{
   	const s =await course.save();
	console.log(s);
   }catch(ex){

   	for(field in ex.errors){
   		console.log(ex.errors[field].message);
   	}
   }
	
}
createCourse();

//Update the course

async function updateCourse(id){

	// find first approach
 
 
 //const course = await Course.findById(id);
 
 const course = await Course.update({_id:id},{
 	$set:{
       name:"Ramu"


 	},
 	$inc:{
 		price:-1
 	}

 });
 if(!course) return;
 

 console.log(course);
}

//updateCourse('5b990f740a792463a8c5a6ab');


