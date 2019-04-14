class Dispatcher {
  constructor(logger) {
    this.logger =
      logger ||
      function(msg) {
        console.log(msg);
      };
    this.routes = [];
  }

  midiMessageHandler(event) {
    if (
      this.routes[event.target.id] &&
      typeof this.routes[event.target.id] === "object"
    ) {
      this.routes[event.target.id].receiveMidiEvent(event);
    } else {
      this.logger("MIDI Message Sent No Where!", event);
    }
  }

  addMapping(mapId, receivable) {
    // incoming is a string
    // outgoing is an object with a method .recieveMidiEvent(event)
    this.routes[mapId] = receivable;
  }

  removeMapping(identifier) {
    this.routes[identifier] = undefined;
  }
}

export default Dispatcher;
