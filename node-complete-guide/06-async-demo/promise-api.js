/*-------------------------------------------
    SETTLED PROMISES
    Sometimes you want an already resolved
    promise, like when unit-testing.
-------------------------------------------*/
// // RESOLVED
// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

// // REJECTED
// const p = Promise.reject(new Error('I kept my promise, but failed to get what you wanted.'));
// p.catch(err => console.log('Error:', err.message));

/*-------------------------------------------
    PARALLEL PROMISES
    This is NOT concurrency or multi-threaded,
    but the same thread kicks off both Async
    functions so that they can run in the
    background at the same time, rather than
    waiting for one to finish and then starting
    the next one.
-------------------------------------------*/
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation 1');
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const isResolved = true;
    if (!isResolved) { reject(new Error('I kept my promise, but failed to get what you wanted')); return; }

    console.log('Async operation 2');
    resolve(2);
  }, 1000);
});

// WAIT FOR ALL PROMISES TO COMPLETE
// Promise.all([p1, p2])
//     .then(result => console.log(result))
//     .catch(err => console.log('Error', err.message));

// WAIT UNTIL THE FIRST FULFILLED PROMISE
Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log('Error', err.message));
