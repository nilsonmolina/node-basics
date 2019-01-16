const promise = new Promise((resolve, reject) => {
  // kick off async work
  setTimeout(() => {
    resolve(1);
    reject(new Error('something went wrong'));
  }, 2000);
});

promise.then(result => console.log('Result', result))
  .catch(err => console.log('Error', err.message));
