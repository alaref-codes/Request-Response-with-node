const http = require('http');
const fs = require('fs');
const lo = require('lodash');

const server = http.createServer((req , res) => {
    res.setHeader('Content-Type' , 'text/html');
    let path = './views/';

    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('location' , '/about')
            break;
        default:
            res.statusCode = 404;
            path += '404.html'
    }
    fs.readFile( path , (err, data) => {
        if (err) {
            console.log(err);
            res.end()
        } else {
            res.end(data)
        }

    })
});
server.listen(3000 , 'localhost' , () => {
    console.log(lo.random(6.3));
    console.log('Lestining for a request');
})
  