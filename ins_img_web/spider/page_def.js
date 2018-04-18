'use strict';

const fs = require('fs');


const regexImgUrl = (rawData, path, file) => { 
    // 处理爬取的页面信息为可用的图片地址
    // 获取页面中的所有图片地址
    let regex = /https?:[\'\"]?([^\'\"]*)(?:((n.jpg)|(n.png)))/gi;
    let regexImgUrls = rawData.match(regex);

    let imgUrls = [];
    let cache = [];
    // 过滤掉头像等其他不相关图片（s150x150 && sh0.08）地址
    for(let i = 0; i < regexImgUrls.length; i++){
        if (regexImgUrls[i].indexOf('s150x150') == -1 && regexImgUrls[i].indexOf('sh0.08') == -1) {
            cache[regexImgUrls[i]] = i;
        }
    }
    // 过滤相同地址的图片地址
    for (let key in cache) {
        imgUrls.push(key);
    }
    
    if (imgUrls == null) {
        // 如果图片列表为空则抛出 error 需改进
        console.log('ERROR: \n html => regex => null');
        imgUrls.push('Error')
        imgUrls.push('爬取的 ins 地址中图片为空！');

    } else {
        // 执行下载图片程序
        let imgObj = {};
        imgObj['urls'] = imgUrls;
        imgObj['path'] = path;

        console.log('imgs sum: ' + imgUrls.length);
        file.imgDown(imgObj);
    }
    // 将爬取的图片地址列表或错误信息写入 imgUrls.txt 文件中
    file.writeFileHtml(imgUrls, path, 'imgUrls.txt');
}

exports.regexImgUrl = regexImgUrl;