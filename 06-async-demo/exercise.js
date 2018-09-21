/*-----------------------------------------
  EXERCISE QUESTION
  - Convert callback functions into Promise
-----------------------------------------*/
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...');
//       });
//     });
//   }
// });

// function getCustomer(id, callback) {
//   setTimeout(() => {
//     callback({
//       id: 1,
//       name: 'Mosh Hamedani',
//       isGold: true,
//       email: 'email',
//     });
//   }, 2000);
// }

// function getTopMovies(callback) {
//   setTimeout(() => {
//     callback(['movie1', 'movie2']);
//   }, 2000);
// }

// function sendEmail(email, movies, callback) {
//   setTimeout(() => {
//     callback();
//   }, 2000);
// }

/*-----------------------------------------
  SOLUTION
-----------------------------------------*/
async function emailCustomer() {
  try {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);

    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log('Top movies: ', movies);

      await sendEmail(customer.email, movies);
      console.log('Email sent...');
    }
  } catch (err) {
    console.log(err.message);
  }
}

emailCustomer();


function getCustomer(id) {
  return new Promise((resolve, reject) => {
    if (!id) { reject(new Error('"id" not found...')); return; }
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email',
      });
    }, 2000);
  });
}

function getTopMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    if (!email || !movies) { reject(new Error('error getting "email" or "movies"')); return; }
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
