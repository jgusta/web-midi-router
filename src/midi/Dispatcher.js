class Dispatcher {
  constructor(logger) {
    this.logger =
      logger ||
      function(msg) {
        console.log(msg);
      };
    this.routes = [];
  }

  // make sure its arrow func
  midiMessageHandler = event => {
    if (this.hasMapping(event.target.id)) {
      this.routes[event.target.id].receiveMidiEvent(event);
    } else {
      this.logger("MIDI Message Sent No Where!", event);
    }
  };

  addMapping(mapId, receivable) {
    // incoming is a string
    // outgoing is an object with a method .recieveMidiEvent(event)
    this.routes[mapId] = receivable;
  }

  hasMapping(identifier) {
    console.log("has mapping check: " + identifier, this.routes);
    return this.routes[identifier] ? true : false;
  }

  removeMapping(identifier) {
    if (this.hasMapping(identifier)) {
      delete this.routes[identifier];
    }
  }
}

export default Dispatcher;
