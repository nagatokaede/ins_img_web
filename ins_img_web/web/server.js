'use strict';

const http = require('http');
const url = require('url');


// 服务器地址和端口设置
const hostname = '0.0.0.0';
const port = 80;

const server = (route, handle, spiderServer) => {
    http.createServer((request, response) => {

        let pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received.');

        route(request, response, pathname, handle, spiderServer);
        
    }).listen(port, hostname, () => {
        console.log('Server running at http://' + hostname + ':' + port);
    });
}

exports.server = server
