const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {

  // Build file path

  let filePath = path.join(__dirname, "public", request.url === "/" ? "index.html" : request.url);

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check extension and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    default:
      contentType = "text/html";
      break;
  }

  if (contentType === "text/html" && extname === "") {
    filePath += ".html";
  } // else, contentType has an extname, doNothing();

  // Read file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == "ENOENT") {
        // Page not found
        fs.readFile(path.join(__dirname, "public", "404.html"), (error, content) => {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(content, "utf-8");
        });
      } else {
        // Some server error
        response.writeHead(500);
        response.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });


  // if (request.url === "/") {
  //   fs.readFile(path.join(__dirname, "public", "index.html"), (error, content) => {
  //     if (error) throw error;
  //     response.writeHead(200, { "Content-Type": "text/html" });
  //     response.end(content);
  //   });
  // }
  
  // if (request.url === "/api/users") {
  //   const users = [
  //     { name: "Bob Smith", age: 40 },
  //     { name: "John Doe", age: 30 },
  //   ];
  //   response.writeHead(200, { "Content-Type": "application/json" });
  //   response.end(JSON.stringify(users));
  // }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));


// const person = require('./person');
// const Person = require("./person");

// const person1 = new Person("John Doe", 30);

// console.log(person);
// person1.greeting();



// const fs = require("fs");
// const Logger = require("./logger");
// const path = require("path");

// const logger = new Logger();

// fs.mkdir(path.join(__dirname, "/logs"), {}, error => {
//   if (error) throw error;
//   console.log("Folder created...");
// });

// fs.writeFile(path.join(__dirname, "/logs", "logs.txt"), "No history available. Create a log to record it here.", error => {
//   if (error) throw error;
//   console.log("File written to...");
// });

// logger.on("message", (data) => console.log("Called Listener", data));
// logger.on("message", (data) => 
//   fs.appendFile(path.join(__dirname, "/logs", "logs.txt"), `\n${JSON.stringify(data)}`, error => {
//     if (error) throw error;
//     console.log("Logged entry to file...");
//   })
// );

// logger.log("Log 1");
// logger.log("Log 2");
// logger.log("Log 3");
