'use strict';

const server = require('./spider/server');
const pageDef = require('./spider/page_def');
const writeFile = require('./spider/write_file');
const img_download_server = require('./spider/img_download_server');


const file = {};
file['regexImgUrl'] = pageDef.regexImgUrl;
file['writeFileHtml'] = writeFile.writeFileHtml;
file['imgDown'] = img_download_server.imgDown;

const spiderServer = (url, path) => {
    server.spiderServer(url, path, file);
}

// 测试用 url && path
// let url = 'https://www.instagram.com/p/BhO2iQmFUFV/';
// let url ='https://www.instagram.com/p/Bhbwsfblpzr/';
// let path = './download/' + new Date().getTime() + '/';
// spiderServer(url, path);

exports.spiderServer = spiderServer
