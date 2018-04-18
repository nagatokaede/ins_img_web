'use strict';

const server = require('./web/server');
const router = require('./web/router');
const requestHandlers = require('./web/requestHandlers');
const spiderServer = require('./spider');

// 定义前端 request path 和调用的对应请求处理方法
let handle = {};
handle['/'] = requestHandlers.start;
handle['/show'] = requestHandlers.show;

server.server(router.route, handle, spiderServer.spiderServer);