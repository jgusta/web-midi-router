class MidiOutput {
  constructor(sysMidiOutput) {
    this.sysMidiOutput = sysMidiOutput;
    this.label = this.sysMidiOutput.name;
    this.value = this.sysMidiOutput.id;
    this.manufacturer = this.sysMidiOutput.manufacturer;
    this.name = this.sysMidiOutput.name;
  }
  sendEvent(data, timestamp) {
    console.log(data, timestamp);
    // this.sysMidiOutput.send(data, timestamp);
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
