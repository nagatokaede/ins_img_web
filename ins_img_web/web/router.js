'use strict';

const route = (request, response, pathname, handle, spiderServer) => {
    if(typeof(handle[pathname]) === 'function') {
        handle[pathname](request, response, spiderServer);
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found!')
        response.end();
    }
    
}

exports.route = route
