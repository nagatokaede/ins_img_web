const async = require('async'),
    request = require('request'),
    https = require('https'),
    fs = require('fs');

const downloadPic = (src, dest, imgObj) => {
    request(src).pipe(fs.createWriteStream(dest)).on('close', () => {
        console.log('pic saved! ' + imgObj['i']++);
        if(imgObj['i'] == imgObj['urls'].length){
            console.log('finish!');
        }
    })
}

const imgDown = (imgObj) => {
    imgObj['i'] = 1;
    async.mapSeries(imgObj['urls'], (item, callback) => {
        setTimeout(() => {
            let tails = item.split('/');
            let tail = tails[tails.length-1];
            let writeFileImgPath = imgObj['path'] + tail;

            downloadPic(item, writeFileImgPath, imgObj);
            callback(null, item);
        }, 400);
    }, (err, results) => {
    });
}


exports.imgDown = imgDown;