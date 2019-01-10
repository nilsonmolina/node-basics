const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern,
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required() { return this.isPublished; },
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
  },
});

const Course = mongoose.model('Course', courseSchema);

/*------------------------
    CREATE A COURSE
------------------------*/
async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true,
    // price: 15,
    category: '-',
  });

  try {
    // const result = await course.save();
    // console.log(result);

    await course.validate();
  } catch (ex) { console.log(ex.message); }
}

createCourse();
