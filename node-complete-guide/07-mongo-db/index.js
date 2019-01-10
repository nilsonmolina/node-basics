const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

/*------------------------
    CREATE A COURSE
------------------------*/
// async function createCourse() {
//   const course = new Course({
//     name: 'Angular Course',
//     author: 'Mosh',
//     tags: ['angular', 'frontend'],
//     isPublished: true,
//   });

//   const result = await course.save();
//   console.log(result);
// }

/*------------------------
    GET COURSES
------------------------*/
async function getCourses() {
  /*------------------------
    GET ALL COURSES
  ------------------------*/
  const courses = await Course.find(); // gets all
  console.log(courses);

  /*------------------------
    MORE COMPLEX QUERY
  ------------------------*/
  // const courses = await Course
  //   .find({ author: 'Mosh', isPublished: true })
  //   .limit(10)
  //   .sort({ name: 1 }) // 1 is ascending, -1 is descending
  //   .select({ name: 1, tags: 1 });

  /*------------------------
    CONDITIONAL QUERY
      eq (equal)
      ne (not equal)
      gt (greater than)
      gte (greater than or equal to)
      lt (less than)
      lte (less than or equal to)
      in (in)
      nin (not in)
  ------------------------*/
  // const courses = await Course
  //   // .find({ price: { $gt: 10 } })
  //   // .find({ price: {$gte: 10, $lte: 20 } })
  //   .find({ price: { $in: [10, 15, 20] } })

  /*------------------------
    LOGICAL QUERY
      or / and
  ------------------------*/
  // const courses = await Course
  //   .find()
  //   // .or([{ author: 'Mosh' }, { isPublished: true }]);
  //   .and([{ author: 'Mosh' }, { isPublished: true }]);

  /*------------------------
    Regular Expression
    /^pattern/ - starts w/
    /pattern$/ - ends w/
    /.*pattern.* / - contains
  ------------------------*/
  // const courses = await Course
  //   // .find({ author: /^Mosh/ }); // starts with 'Mosh'
  //   // .find({ author: /Mosh$/ }); // ends with 'Mosh'
  //   // .find({ author: /Mosh$/i }); // ends with 'Mosh' (case insensitive)
  //   // .find({ author: /.*Mosh.*/i }); // contains 'Mosh' (case insensitive)
  //   .find({ name: /.*node.*/i });

  /*------------------------
    Count
  ------------------------*/
  // const courses = await Course
  //   .find()
  //   .count();

  /*------------------------
    Pagination
  ------------------------*/
  // const pageNumber = 2;
  // const pageSize = 1;

  // const courses = await Course
  //   .find()
  //   .skip((pageNumber - 1) * pageSize)
  //   .limit(pageSize);

  // console.log(courses);
}

getCourses();


/*------------------------
    UPDATE COURSES
------------------------*/
// mongoose.set('useFindAndModify', false); // needed to fix deprecation warning

// async function updateCourse(id) {
//   /*------------------------
//     Query first approach
//   ------------------------*/
//   // const course = await Course.findById(id);
//   // if (!course) return;

//   // course.isPublished = true;
//   // course.author = 'Another Author';
//   // // // ALTERNATIVE WAY TO UPDATE PROPS
//   // // course.set({
//   // //   isPublished: true,
//   // //   author: 'Another Author',
//   // // });

//   // const result = await course.save();
//   // console.log(result);

//   /*------------------------
//     Update first approach
//   ------------------------*/
//   // const result = await Course.updateOne({ _id: id }, {
//   //   $set: {
//   //     author: 'Mosh',
//   //     isPublished: false,
//   //   },
//   // });

//   const result = await Course.findOneAndUpdate(id, {
//     $set: {
//       author: 'Jack',
//       isPublished: true,
//     },
//   }, { new: true }); // gets us the new values
//   console.log(result);
// }

// updateCourse('5ba4663ac382bb36e8ffd33e');

/*------------------------
    REMOVE COURSES
------------------------*/
// mongoose.set('useFindAndModify', false); // needed to fix deprecation warning

// async function removeCourse(id) {
//   // const result = await Course.deleteOne({ _id: id });
//   // console.log(result);

//   // ALTERNATIVE - returns course that was deleted.
//   const course = await Course.findByIdAndRemove(id);
//   console.log(course);
// }

// removeCourse('5ba4663ac382bb36e8ffd33e');
