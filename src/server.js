const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlHandler.js');
const jsonHandler = require('./jsonHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addUser(request, res, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedUrl, requestMethod) => {

  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response, requestMethod);
  } else {
    jsonHandler.notFound(request, response, requestMethod);
  }
};

const onRequest = (request, response) => {

  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl, request.method);
  }
};


http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
