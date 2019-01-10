const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  // const courses = await Course
  //   .find()
  //   .select('name author');

  // const courses = await Course
  //   .find()
  //   .populate('author')
  //   .select('name author');

  // const courses = await Course
  //   .find()
  //   .populate('author', 'name')
  //   .select('name author');

  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .select('name author');

  console.log(courses);
}

/*---------------------------------------
  Step 1: Create author
  - make sure other steps are commented
---------------------------------------*/
createAuthor('Mosh', 'My bio', 'My Website');

/*---------------------------------------
  Step 2: Create course
  - use the id from the author created
    in step 1.
---------------------------------------*/
createCourse('Node Course', '5ba6d7a7f435952844f9c72a');

/*---------------------------------------
  Step 3: list courses
---------------------------------------*/
listCourses();
