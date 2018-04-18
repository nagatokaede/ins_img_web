'usr strict'

const fs = require('fs');
const querystring = require("querystring");


const postRequest = (request, response, spiderServer) => {
    // 接收前端提交的 post 请求并处理
    console.log("Request handler 'postRequest' was called.");

    // input['name'=text] POST 请求处理
    let path = ''
    let postData = '';
    request.setEncoding("utf8");

    request.on("data", (postDataChunk) => {
        postData += postDataChunk;
        // 读取前端提交的 ins url，text 为 input 标签中 name 的值
        let url = querystring.parse(postData).text;
        console.log("Received POST data chunk '" + url + "'.");
        // 判断前端提交的 url 是否带有 www. ，没有则添加进去，否则爬取页面会报 statusCode 错误
        if (url.indexOf('www.') == -1) {
            url = url.replace(/https:\/\//, "https://www.");
        }
        // 创建爬取后存储地址
        path = './download/' + new Date().getTime() + '/';
        // 启动爬虫服务
        spiderServer(url, path);
    });

    request.on("end", () => {
        let dataHtml = '';
        // 延时 1s 执行程序，给爬虫程序写入 imgUrls.txt 文件提供时间
        setTimeout(() => {
            // 读取 imgUrls.txt 文件，并返回给前端页面显示
            fs.readFile(path + 'imgUrls.txt', 'utf-8', (error, file) => {
                if (error) {
                console.log('error: \n' + error);
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.write(error + '\n');
                response.end();
                } else {
                    // 解析 imgUrls.txt 文件信息，并将 imgurl 写入 html
                    let imgLists = file.split(',');
                    // 判断 imgUrls.txt 文件中是否带错误信息
                    if (imgLists[0] == 'Error') {
                        dataHtml = imgLists[1];
                    } else {
                        for (let i in imgLists) {
                            dataHtml += '<img class="img-responsive" src="' + imgLists[i] + '"/></br>'
                        }
                        //console.log('dataHtml_1:' + dataHtml);
                    }
                    // response.writeHead(200, {"Content-Type": "text/html"});
                    // response.write(dataHtml);
                    // response.end();
                }
            });
            setTimeout(function() {
                fs.readFile('./templates/index.html', 'utf-8', (error, file) => {
                    if (error) {
                        //console.log('error: \n' + error);
                        response.writeHead(500, {'Content-Type': 'text/plain'});
                        response.write(error + '\n');
                        response.end();
                    } else {
                        //console.log(dataHtml);
                        let htmlpage = file.replace(/<dataHtml><\/dataHtml>/, dataHtml);
                        response.writeHead(200, {"Content-Type": "text/html"});
                        //console.log(htmlpage);
                        response.write(htmlpage);
                        response.end();
                    }
                });
            }, 500);
        }, 1500);
    });
}

const start = (request, response) => {
    // 初始页面
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
    // 图片显示页面
    postRequest(request, response, spiderServer);

}

exports.start = start
exports.show = show
