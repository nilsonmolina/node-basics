/*-------------------------------------------------
  EXERCISE-01
    - Get all the published backend courses
    - sort by their name
    - pick only their name and author
    - display them
-------------------------------------------------*/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}
console.log('Before');
run();
console.log('After');
