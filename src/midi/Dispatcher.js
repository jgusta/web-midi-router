class Dispatcher {
  constructor(logger) {
    this.logger =
      logger ||
      function(msg) {
        console.log(msg);
      };
    this.routes = {};
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
    this.routes[mapId] = receivable;
  }

  hasInputMapping(identifier) {
    return this.routes[identifier] ? true : false;
  }

  hasOutputMapping(identifier) {
    let portId = identifier.portId;
    let result = false;
    Object.keys(this.routes).forEach((val) => {
      if (this.routes[val].portId === portId) {
        result = true;
      }
    });
    return result;
  }

  removeInputMapping(identifier) {
    if (this.hasMapping(identifier)) {
      delete this.routes[identifier];
    }
  }

  removeOutputMapping(identifier) {
    Object.keys(this.routes).forEach(val => {
      if (this.routes[val].portId === identifier.portId) {
        delete this.routes[val];
      }
    });
  }
}

export default Dispatcher;
