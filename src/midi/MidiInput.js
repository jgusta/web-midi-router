class MidiInput {
  // note we dont even store the reference to the sysMidiInput
  constructor(sysMidiInput, Dispatcher) {
    this.Dispatcher = Dispatcher;
    this.isAttached = false;
    // sysMidiInput doesnt have to be an actual input, it can be an object of values
    this.label = sysMidiInput.name;
    this.value = sysMidiInput.id;
    this.portId = sysMidiInput.id;
    this.manufacturer = sysMidiInput.manufacturer;
    this.name = sysMidiInput.name;
  }

  attachInput(sysMidiInput) {
    return new Promise((resolve, reject) => {
      sysMidiInput
        .open()
        .then(() => {
          this.label = sysMidiInput.name;
          this.value = sysMidiInput.id;
          this.portId = sysMidiInput.id;
          this.manufacturer = sysMidiInput.manufacturer;
          this.name = sysMidiInput.name;
          this._sysMidiInput = sysMidiInput;
          sysMidiInput.onmidimessage = this.Dispatcher.midiMessageHandler;
          this.isAttached = true;
          resolve(this.value);
        })
        .fail(function(what) {
          reject(what);
        });
    });
  }

  isAttached() {
    return this.isAttached
      ? this._sysMidiInput.connected === "connected"
        ? true
        : false
      : false;
  }

  /*
    connection: "closed"
    id: "input-0"
    manufacturer: "Microsoft Corporation"
    name: "Komplete Audio 6 MIDI"
    onmidimessage: null
    onstatechange: null
    state: "connected"
    type: "input"
    version: "10.0"
    */
}
export default MidiInput;
