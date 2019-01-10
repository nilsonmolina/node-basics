/*-----------------------------------
    USING THE PATH MODULE
-----------------------------------*/
// const path = require('path');

// let pathObj = path.parse('__filename');
// console.log(pathObj);



/*-----------------------------------
    USING THE OS MODULE
-----------------------------------*/
// const os = require('os');

// let totalMemory = os.totalmem / 1024000;
// let freeMemory = os.freemem / 1024000;

// console.log(`Total Memory: ${totalMemory} mb`);
// console.log(`Free Memory: ${freeMemory} mb`);



/*-----------------------------------
    USING THE FS MODULE
-----------------------------------*/
// const fs = require('fs');

// // const files = fs.readdirSync('./');
// // console.log(files);

// fs.readdir('./', (err, files) => {
//     if (err) console.log("error:", err);
//     else console.log("result:", files);

// })

/*-----------------------------------
    USING THE EVENTS MODULE
-----------------------------------*/
// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// // Register a listener
// emitter.on('messageLogged',(arg) => {
//     console.log('listener called', arg);
// })

// // Raise an event
// emitter.emit('messageLogged', { id: 1, url: 'http://' });


/*-----------------------------------
    LISTENING TO LOGGER EVENTS
-----------------------------------*/
// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('messageLogged', (args) => { console.log(args); });

// logger.log('message');

/*-----------------------------------
    USING THE HTTP MODULE - low level
-----------------------------------*/
// const http = require('http');

// const server = http.createServer();
// server.on('connection', (socket) => { console.log('New connection')});

// server.listen(3000);

// console.log('Listening on port 3000...');

/*-----------------------------------
    USING THE HTTP MODULE
-----------------------------------*/
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000...');
