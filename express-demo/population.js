const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
	.then(()=>console.log('connected to the mongodb'))
	.catch(err=>console.log('Something wrong..'));

const Author = mongoose.model('Author',new mongoose.Schema({
	name:String,
	bio:String,
	website:String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
	name:String, // this is consistence
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Author'  // mongo going to accept with invalid author it doesnot complain
		                // when course is loaded mongo knows that it has to load author collection
		                // So use populate('author') method during loading
	}

}));

async function createAuthor(name,bio,website){
	const author =new Author({
     name,
     bio,
     website
	});

	const result = await author.save();
	console.log(result);
}

async function createCourse(name,author){
	const course =new Course({
     name,
    author
     
	});

	const result = await course.save();
	console.log(result);
}

async function listCourses(){
	const courses = await Course
		.find()
		.populate('author','name -_id')
		.select('name');
		console.log(courses);
}

//createAuthor('Pintu','my bio','My website');

//createCourse('node js','5b9a703727fc95192021b16d');

//listCourses();