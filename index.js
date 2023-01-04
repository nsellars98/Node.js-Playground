// const person = require('./person');
// const Person = require("./person");

// const person1 = new Person("John Doe", 30);

// console.log(person);
// person1.greeting();

const fs = require("fs");
const Logger = require("./logger");
const path = require("path");

const logger = new Logger();

fs.mkdir(path.join(__dirname, "/logs"), {}, error => {
  if (error) throw error;
  console.log("Folder created...");
});

fs.writeFile(path.join(__dirname, "/logs", "logs.txt"), "No history available. Create a log to record it here.", error => {
  if (error) throw error;
  console.log("File written to...");
});

logger.on("message", (data) => console.log("Called Listener", data));
logger.on("message", (data) => 
  fs.appendFile(path.join(__dirname, "/logs", "logs.txt"), `\n${JSON.stringify(data)}`, error => {
    if (error) throw error;
    console.log("Logged entry to file...");
  })
);

logger.log("Log 1");
logger.log("Log 2");
logger.log("Log 3");
