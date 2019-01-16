/*--------------------------------------------
    Try and guess the what the following
    blocks of code would output.
        run with: $ node index.html
--------------------------------------------*/
// // BLOCK 1
// console.log('Before');
// setTimeout(() => {
//     console.log('Reading a user from database...');
// }, 2000);
// console.log('After');


// // BLOCK 2
// console.log('Before');
// const user = getUser(1);
// console.log(user);
// console.log('After');

// function getUser(id) {
//     setTimeout(() => {
//         console.log('Reading a user from a database...');
//         return { id: id, user: 'mosh' };
//     }, 2000);
// }

/*--------------------------------------------
    Let's try using Callbacks
--------------------------------------------*/
// console.log('Before');
// getUser(1, (user) => {
//     console.log('User', user);
// });
// console.log('After');

// function getUser(id, callback) {
//     console.log('Reading a user from a database...');
//     setTimeout(() => {
//         callback({ id: id, user: 'mosh' });
//     }, 2000);
// }

/*--------------------------------------------
    Make an asynchronous function called
    getRepos, that accepts a username and
    returns an array of repos.  Call this
    function after receiving the user.
--------------------------------------------*/
// console.log('Before');
// getUser(1, (user) => {
//   console.log('User', user);
//   getRepos(user, (repo) => {
//     console.log('Repo', repo);
//   });
// });
// console.log('After');

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log('Reading a user from database...');
//     callback({ id, user: 'mosh' });
//   }, 2000);
// }

// function getRepos(username, callback) {
//   setTimeout(() => {
//     console.log('Calling API...');
//     callback(['repo1', 'repo2', 'repo3']);
//   }, 2000);
// }

/*--------------------------------------------
    Callback Hell
        As you can see, it's much easier to
        follow what the synchronous code is
        doing. The deeply nested structure
        of asynchronous code, is referred to
        as callback hell.
--------------------------------------------*/
// // Asynchronous
// console.log('Before');
// getUser(1, (user) => {
//     getRepo(user.githubUsername, (repos) => {
//         getCommits(repo, (commits) => {
//             console.log(commits);
//         });
//     });
// });
// console.log('After');

// // Synchronous
// console.log('Before');
// const user = getUser(1);
// const repos = getRepositories(user.githubUsername);
// const commits = getCommits(repos[0]);
// console.log(commits);
// console.log('After');

/*--------------------------------------------
    Using Named Functions to fix the deeply
    nested structure of Callbacks. Names
    cannot be the same!
--------------------------------------------*/
// console.log('Before');
// getUserAsync(1, getRepos);
// console.log('After');

// // Named Functions
// function getRepos(user) {
//     getReposAsync(user, getCommits);
// }
// function getCommits(repos) {
//     getCommitsAsync(repos[0], displayCommits);
// }
// function displayCommits(commits) {
//     console.log(commits);
// }

// // Asynchronous Functions
// function getUserAsync(id, callback) {
//     setTimeout(() => {
//         console.log('Got the username!');
//         callback({ id: id, user: 'mosh' });
//     }, 2000);
// }
// function getReposAsync(user, callback) {
//     setTimeout(() => {
//         console.log('Retrieved the list of repos...');
//         callback(['repo1', 'repo2', 'repo3']);
//     }, 2000);
// }
// function getCommitsAsync(repo, callback) {
//     setTimeout(() => {
//         console.log('Listing the commits:');
//         callback(['commit1', 'commit2', 'commit3']);
//     }, 2000);
//   }


/*--------------------------------------------
    Promise
    An object that holds the eventual result
    of an async operation.
--------------------------------------------*/
// console.log('Before');
// getUser(1)
//     .then(user => getRepos(user))
//     .then(repos => getCommits(repos))
//     .then(commits => console.log(commits))
//     .catch(err => console.log(err.message));
// console.log('After');

// // Asynchronous Functions
// function getUser(id) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (!id) { reject(new Error('could not get user.')); return; }

//             console.log('Got the username!');
//             resolve({ id: id, user: 'mosh' });
//         }, 2000);
//     });
// }
// function getRepos(user) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (!user) { reject(new Error('could not retrieve repos')); return; }

//             console.log('Retrieved the list of repos...');
//             resolve(['repo1', 'repo2', 'repo3']);
//         }, 2000);
//     });
// }
// function getCommits(repo) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (!repo) { reject(new Error('could not list commits')); return; }

//             console.log('Listing the commits:');
//             resolve(['commit1', 'commit2', 'commit3']);
//         }, 2000);
//     });
//   }


/*--------------------------------------------
    Async/Await
    An object that holds the eventual result
    of an async operation.
--------------------------------------------*/
// console.log('Before');
// async function displayCommits() {
//   try {
//     const user = await getUser(1);
//     const repos = await getRepos(user);
//     const commits = await getCommits(repos[0]);
//     console.log(commits);
//   } catch (err) {
//     console.log('Error', err.message);
//   }
// }
// displayCommits();
// console.log('After');


// // Asynchronous Functions
// function getUser(id) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (!id) { reject(new Error('could not get user.')); return; }

//       console.log('Got the username!');
//       resolve({ id, user: 'mosh' });
//     }, 2000);
//   });
// }
// function getRepos(user) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (!user) { reject(new Error('could not retrieve repos')); return; }

//       console.log('Retrieved the list of repos...');
//       resolve(['repo1', 'repo2', 'repo3']);
//     }, 2000);
//   });
// }
// function getCommits(repo) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (!repo) { reject(new Error('could not list commits')); return; }

//       console.log('Listing the commits:');
//       resolve(['commit1', 'commit2', 'commit3']);
//     }, 2000);
//   });
// }
