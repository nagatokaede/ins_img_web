'use strict';

const route = (request, response, pathname, handle, spiderServer) => {
    // 路由设置，判断访问服务器的 url 是否正确，否则输出 404 Not Found！
    if(typeof(handle[pathname]) === 'function') {
        handle[pathname](request, response, spiderServer);
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found!')
        response.end();
    }
    
}

exports.route = route
