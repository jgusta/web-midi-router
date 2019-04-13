class MidiOutput {
  constructor(sysMidiOutput, dispatcher) {
    this.dispatcher = dispatcher;
    this.isAttached = false;
    // sysMidiInput doesnt have to be an actual output, it can be an object of values

    this.label = sysMidiOutput.name;
    this.value = sysMidiOutput.id;
    this.portId = sysMidiOutput.id;
    this.manufacturer = sysMidiOutput.manufacturer;
    this.name = sysMidiOutput.name;

    /***** */
  }
  receiveEvent(event) {
    this._sysMidiOutput.send(event.data, event.timeStamp || event.timestamp);
    console.log(event.data, event.timestamp, this.value);
  }

  attachOutput(sysMidiOutput) {
    return new Promise((resolve, reject) => {
      sysMidiOutput
        .open()
        .then(() => {
          this.label = sysMidiOutput.name;
          this.value = sysMidiOutput.id;
          this.portId = sysMidiOutput.id;
          this.manufacturer = sysMidiOutput.manufacturer;
          this.name = sysMidiOutput.name;
          this._sysMidiOutput = sysMidiOutput;
          this.isAttached = true;
          resolve(this.value);
        })
        .fail(what => {
          this.isAttached = false;
          reject(what);
        });
    });
  }

  isAttached() {
    return (
      this.isAttached &&
      this._sysMidiOutput.state === "connected" &&
      this._sysMidiOutput.connection === "closed"
    );
  }

  /*
  connection: "closed"
  id: "output-1"
  manufacturer: "Microsoft Corporation"
  name: "Komplete Audio 6 MIDI"
  onstatechange: null
  state: "connected"
  type: "output"
  version: "10.0"
  */
}
export default MidiOutput;
