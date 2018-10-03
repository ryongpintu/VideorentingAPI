const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
	.then(()=>console.log('connected to the mongodb'))
	.catch(err=>console.log('Something wrong..'));

const authorSchema = new mongoose.Schema({
	name:String,
	bio:String,
	website:String
});
const Author = mongoose.model('Author',authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
	name:String, // this is consistence
	// author:{
	// 	type:authorSchema,
	// 	required:true
	// }
	authors:[authorSchema]

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

async function createCourse(name,authors){
	const course =new Course({
     name,
    authors
     
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

async function updateAuthor(courseId){
	//const course = await Course.findById(courseId);
	const course = await Course.update({_id:courseId},{  //update directelly in database
		$set:{
          'author.name':'john'
		}
	});
	
	//course.author.name="Ryong Pintu";
	//course.save();
	//course.author.save(); its not applicable in embedded documents

}

async function addAuthor(courseId,author){
	const course = await Course.findById(courseId);
	course.authors.push(author);
	course.save();
}

async function removeAuthor(courseId,authorId){
	const course = await Course.findById(courseId);
	const author=course.authors.id(authorId);
	author.remove();
	course.save();
}
//createAuthor('Pintu',new Author({name:'Pintu'}));


//createCourse('node js',new Author({name:'Pintu'}));
// createCourse('node js',
// 	[new Author({name:'Pintu'}),
// 	new Author({name:'Ashish'})]);
//addAuthor('5b9a898a3657e038a4deb0a6',new Author({name:'Amrit'}));
//removeAuthor('5b9a898a3657e038a4deb0a6','5b9a898a3657e038a4deb0a4');

//listCourses();
//updateAuthor('5b9a7a4e461d883ff89f98f9');