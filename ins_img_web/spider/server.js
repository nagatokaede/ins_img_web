'use strict';

// // 引入 required 模块
const https = require('https'),
    http = require('http'),
    fs = require('fs'),
    querystring = require("querystring"),
    iconv = require('iconv-lite');


const spiderServer = (url, path, file) => {
    https.get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];
        let error;

        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' + 'Status Code: ' + { statusCode });
        } else if (contentType != 'text/html') {
            error = new Error('Invalid content-type.\n' +
                              'Expected text/html but received ' + contentType);
        }
        if (error) {
            console.error(error.message);
            res.resume();
            return;
        }


        let chunks = [];
        res.on('data', (chunk) => {
            chunks.push(chunk);
        });

        res.on('end', () => {
            let html = iconv.decode(Buffer.concat(chunks), 'utf-8');

            //let now = new Date().getTime();
            //let path = './download/' + now + '/';
            fs.mkdirSync(path);

            file.regexImgUrl(html, path, file);
        });

    }).on('error', (e) => {
        console.error(`错误: ${e.message}`);
    });
}


exports.spiderServer = spiderServer;
