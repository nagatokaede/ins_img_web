'use strict';

const server = require('./web/server');
const router = require('./web/router');
const requestHandlers = require('./web/requestHandlers');
const spiderServer = require('./spider');

let handle = {};
handle['/'] = requestHandlers.start;
handle['/show'] = requestHandlers.show;

server.server(router.route, handle, spiderServer.spiderServer);