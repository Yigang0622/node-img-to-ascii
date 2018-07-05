const express = require('express');
const formidable = require('formidable');

var app = express();

app.set('view engine', 'hbs');

app.get('/', (req,res) => {
    res.render('index.hbs');
});

app.post('/upload', (req,res) => {
   console.log('upload');
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(files);
    });
    res.send('success');
});

app.listen(3000, ()=>{
    console.log('Server started at 3000');
});