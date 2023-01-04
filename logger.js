const EventEmitter = require("events");
const uuid = require("uuid");

class Logger extends EventEmitter {
  log(msg) {
    // Call event
    this.emit("message", { msg, id: uuid.v4() });
  }
}

module.exports = Logger;