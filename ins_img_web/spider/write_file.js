'use strict';

const fs = require('fs');


const writeFileHtml = (html, path, type) => {
    let writeFileHtmlPath = path + type;
    fs.writeFile(writeFileHtmlPath, html, (err) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error('myfile already exists');
                return;
            }
            throw err;
        } else {
            console.log('write ' + type + ' finish!');
        }       
    });
}

exports.writeFileHtml = writeFileHtml;
