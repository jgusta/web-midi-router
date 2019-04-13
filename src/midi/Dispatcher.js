class Dispatcher {
  constructor() {
    this.routes = [];
  }

  midiMessageHandler(event) {
    if (
      this.routes[event.target.id] &&
      typeof this.routes[event.target.id] === "function"
    ) {
      this.routes[event.target.id](event);
    }
  }

  addMapping(name, callback) {
    if (typeof callback !== "function") {
      console.error("callback parameter not a function", callback);
    }
    this.routes[name] = callback;
  }

  removeMapping(name) {
    this.routes[name] = undefined;
  }
}

export default Dispatcher;
