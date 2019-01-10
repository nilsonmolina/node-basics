const router = require('express').Router();

router.get('/pug', (req, res) => {
    // res.send('Hello World!');
    res.render('index', {
        title: 'My Express App',
        message: 'Hello from Pug!'
    });
});

module.exports = router;