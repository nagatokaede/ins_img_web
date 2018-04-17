'use strict';

const fs = require('fs');


const regexImgUrl = (rawData, path, file) => { 
    let regex = /https?:[\'\"]?([^\'\"]*)(?:((n.jpg)|(n.png)))/gi;

    let regexImgUrls = rawData.match(regex);

    let imgUrls = [];

    let cache = [];

    for(let i = 0; i < regexImgUrls.length; i++){
        if (regexImgUrls[i].indexOf('s150x150') == -1 && regexImgUrls[i].indexOf('sh0.08') == -1) {
            cache[regexImgUrls[i]] = i;
        }
    }
    for (let key in cache) {
        imgUrls.push(key);
    }

    if (imgUrls == null) {
        console.error('ERROR: \n html => regex => null');
    }

    file.writeFileHtml(imgUrls, path, 'imgUrls.txt');

    let imgObj = {};
    imgObj['urls'] = imgUrls;

    imgObj['path'] = path;

    console.log('imgs sum: ' + imgUrls.length);
    file.imgDown(imgObj);
}

exports.regexImgUrl = regexImgUrl;