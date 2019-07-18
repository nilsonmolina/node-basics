const readline = require('readline');
const bcrypt = require('bcrypt');

// SETUP
const rl = readline.createInterface(process.stdin, process.stdout);
const salt = 10;

// PROGRAM
rl.question('List the passwords to be hashed - (ex: password, p@$$w0rd)\n', async (input) => {
  const passwords = input.replace(/\s+/g, '').split(',');
  const promises = passwords.map(async p => bcrypt.hash(p, salt));

  const hashed = await Promise.all(promises);
  console.log(hashed);
  rl.close();
});
