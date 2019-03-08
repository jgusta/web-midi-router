class MidiOutput {
  constructor(sysMidiOutput) {
    this.sysMidiOutput = sysMidiOutput;
  }
  sendEvent(data, timestamp) {
    console.log(data, timestamp);
    // this.sysMidiOutput.send(data, timestamp);
  }
  get id() {
    return this.sysMidiOutput.id;
  }
  get name() {
    return this.sysMidiOutput.name;
  }
  get manufacturer() {
    return this.sysMidiOutput.manufacturer;
  }
}
export default MidiOutput;
