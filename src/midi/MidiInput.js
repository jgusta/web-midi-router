class MidiInput {
  // note we dont even store the reference to the sysMidiInput
  constructor(sysMidiInput, dispatcher) {
    this.dispatcher = dispatcher;
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
          sysMidiInput.onmidimessage = this.dispatcher.midiMessageHandler;
          this.isAttached = true;
          resolve(this.value);
        })
        .catch(what => {
          this.isAttached = false;
          reject(what);
        });
    });
  }

  isAttached() {
    return (
      this.isAttached &&
      this._sysMidiInput.state === "connected" &&
      this._sysMidiInput.connection === "closed"
    );
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


