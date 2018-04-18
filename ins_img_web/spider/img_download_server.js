'use strict';

const async = require('async');
const request = require('request');
const https = require('https');
const fs = require('fs');


const downloadPic = (src, writeFileImgPath, imgObj) => {
    request(src).pipe(fs.createWriteStream(writeFileImgPath)).on('close', () => {
        console.log('pic saved! ' + imgObj['i']++);
        if(imgObj['i'] == imgObj['urls'].length){
            console.log('finish!');
        }
    })
}

const imgDown = (imgObj) => {
    imgObj['i'] = 1;
    // 取出 imgLists 
    async.mapSeries(imgObj['urls'], (item, callback) => {
        setTimeout(() => {
            // 取出 url 的后缀名
            let tails = item.split('/');
            let tail = tails[tails.length-1];
            // 写入 img 的 path
            let writeFileImgPath = imgObj['path'] + tail;
            // 调用下载器
            downloadPic(item, writeFileImgPath, imgObj);
            // 回调函数
            callback(null, item);
        }, 400);
    }, (err, results) => {
    });
}


exports.imgDown = imgDown;