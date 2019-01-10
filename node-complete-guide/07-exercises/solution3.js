/*-------------------------------------------------
  EXERCISE-03
    - Get all published courses
    - price >= $15 or have the word 'by' in name
    - select name, author and price
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
    .find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
