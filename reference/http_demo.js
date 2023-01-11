const http = require('http');

// Create Server Object
http.createServer((request, response) => {
  // Write response
  response.write("Hello World");
  response.end();
}).listen(5000, () => console.log("Server running..."));