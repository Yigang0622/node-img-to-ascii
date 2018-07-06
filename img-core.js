const fs = require('fs');
const jimp = require('jimp');

let original = fs.readFileSync('template.html','utf-8');

module.exports = {
  getASCIIHtml: getASCIIHtml
};

/*
this method will convert image to ASCII and save the html file to completed folder and return the file name
 */
function getASCIIHtml(file, callback, error){

    jimp.read(file).then(function (image) {
        var image = image.resize(500,jimp.AUTO);           // resize

        const width = image.bitmap.width;
        const height = image.bitmap.height;

        // let chars = [' ', '.', ';', '+', '*', '$', '&', '#' ];
        let chars = ['#', '&', '$$', '*', '+', ';', '.', ' ' ];
        let new_chars = ['@', '%', '#', 'x', '+', '=', ':', '-', '.', ' ' ];
        let sequence = "";

        for (let i = 0; i<height;i++){
            for (let j =0;j<width;j++){
                let color = image.getPixelColor(j,i);
                let rgb = jimp.intToRGBA(color);
                let gray = (rgb.r + rgb.g + rgb.b) / 3;
                let level = 0;
                if (gray>=0&&gray<=31.875){
                    level = 0;
                } else if (gray>=31.875 &&gray<=63.75){
                    level = 1;
                } else if (gray>=63.75&&gray<=95.625){
                    level = 2;
                } else if (gray>=95.625&&gray<=127.5){
                    level = 3;
                } else if (gray>=127.5&&gray<=159.375){
                    level = 4;
                } else if (gray>=159.375&&gray<=191.25){
                    level = 5;
                } else if (gray>=191.25&&gray<=223.125){
                    level = 6;
                }else if (gray>=223.125&&gray<=255){
                    level = 7;
                }
                sequence += chars[level];
            }
            sequence+='\n';
        }
        // console.log(sequence);
        let htmlDiv = sequence.replaceAll(' ','&nbsp;').replaceAll('\n','<br>');
        let htmlAll = original.replaceAll("REPLACE",htmlDiv);
        let id = new Date().getTime();
        fs.writeFile('./completed/'+id+'.html',htmlAll,'utf-8',()=>{
            callback(id);
        });

    }).catch(function (err) {
        error('Parsing image error');
        console.error(err);
    });
}


String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

