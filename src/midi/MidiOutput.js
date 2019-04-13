class MidiOutput {
  constructor(sysMidiOutput) {
    this.sysMidiOutput = sysMidiOutput;
    this.label = this.sysMidiOutput.name;
    this.value = this.sysMidiOutput.id;
    this.manufacturer = this.sysMidiOutput.manufacturer;
    this.name = this.sysMidiOutput.name;
  }
  receiveEvent(event) {
    this.sysMidiOutput.send(event.data, event.timeStamp || event.timestamp);
    console.log(event.data, event.timestamp, this.value);
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
