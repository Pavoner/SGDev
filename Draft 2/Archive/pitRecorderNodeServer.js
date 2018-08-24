const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

http.createServer((request, response) => {
    console.log(request.headers);
    console.log(request.method);
    console.log(request.statusCode);
    console.log(request.url);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    if (request.method == 'POST') {
        let buff = '';
        request.on('data', (chunk) => {
            buff += chunk;
        })
        request.on('end', ()=> {
            //console.log('Body:' + buff);
            try {
                const parsedData = JSON.parse(buff);
                console.log(parsedData);
                //console.log(typeof parsedData);
                fs.writeFile('./pitList.json', buff, function (error){
                    if(error) return console.error(error)
                    console.log('writing complete.')
                })
            } catch (e) {
                console.error(e.message);
            }
            response.end('\nAccepted Body\n\n');
        }) 
    } 
    else if (request.method == 'GET') {
        console.log('Get Received');
        fs.readFile(path.join(__dirname, './pitList.json'), {encoding: 'utf-8'}, function (error, data) {
            if (error) return console.error(error)
            //console.log(data)
            console.log('Get Request Received')
            response.end(data);
        }) 
    }
    else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello World!\n');
    }}).listen(port);
    console.log('pitRecorder Server Running...');