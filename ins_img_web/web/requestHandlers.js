'usr strict'

const fs = require('fs');
const querystring = require("querystring");


const postRequest = (request, response, spiderServer) => {
    console.log("Request handler 'postRequest' was called.");

        // input['name'=text] POST 请求处理
        let path = ''
        let postData = '';
        request.setEncoding("utf8");
        request.on("data", (postDataChunk) => {
            postData += postDataChunk;
            console.log("Received POST data chunk '" + querystring.parse(postData).text + "'.");

            path = './download/' + new Date().getTime() + '/';
            spiderServer(querystring.parse(postData).text, path);
        });
        request.on("end", () => {
            setTimeout(() => {
                fs.readFile(path + 'imgUrls.txt', 'utf-8', (error, file) => {
                    if (error) {
                    console.log('error: \n' + error);
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.write(error + '\n');
                    response.end();
                    } else {

                        let imgLests = file.split(',');

                        let dataHtml = '';

                        for (let i = 0; i < imgLests.length; i++) {
                            dataHtml += '<img src="' + imgLests[i] + '"/></br>'
                        }

                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write(dataHtml);
                        response.end();
                    }
                });
            }, 2000);
        });
}

const start = (request, response) => {
    fs.readFile('./templates/index.html', 'utf-8', (error, file) => {
        if (error) {
            console.log('error: \n' + error);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(error + '\n');
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(file);
            response.end();
        }
    });
}

const show = (request, response, spiderServer) => {
    postRequest(request, response, spiderServer);
}

exports.start = start
exports.show = show
