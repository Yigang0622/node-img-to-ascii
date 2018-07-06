const express = require('express');
const formidable = require('formidable');
const imageCore = require('./img-core');

var app = express();

app.set('view engine', 'hbs');

app.get('/', (req,res) => {
    res.render('index.hbs');
});

app.post('/upload', (req,res) => {
   console.log('upload');

    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        imageCore.getASCIIHtml(file.path, (id) => {
            res.sendFile(__dirname+'/completed/'+id+'.html')
        });
    });

    //
    // form.on('end', function(fields, files) {
    //     console.log('upload complete');
    //     console.log(this.openedFiles[0]);
    //     imageCore.getASCIIHtml(this.openedFiles[0].path);
    //     // /* Temporary location of our uploaded file */
    //     // var temp_path = this.openedFiles[0].path;
    //     // /* The file name of the uploaded file */
    //     // var file_name = this.openedFiles[0].name;
    //     // /* Location where we want to copy the uploaded file */
    //     // var new_location = 'c:/localhost/nodejs/';
    //     //
    //     // fs.copy(temp_path, new_location + file_name, function(err) {
    //     //     if (err) {
    //     //         console.error(err);
    //     //     } else {
    //     //         console.log("success!")
    //     //     }
    //     // });
    //
    // });

});

app.listen(3000, ()=>{
    console.log('Server started at 3000');
});