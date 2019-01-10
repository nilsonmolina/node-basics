/*-------------------------------------------------
  EXERCISE-02
    - Get all published frontend & backend courses
    - sort by their price in descending order
    - pick only their name, author, and price
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
    .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}

// // ALTERNATIVE SOLUTION
// async function getCourses() {
//   return Course
//     .find({ isPublished: true })
//     .or([{ tags: 'frontend' }, { tags: 'backend' }])
//     .sort('-price')
//     .select('name author price');
// }

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
