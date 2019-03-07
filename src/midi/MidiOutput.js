class MidiOutput {
  constructor(sysMidiOutput) {
    this.sysMidiOutput = sysMidiOutput;
  }
  sendEvent(data, timestamp) {
    console.log(data, timestamp);
    // this.sysMidiOutput.send(data, timestamp);
  }
}
export default MidiOutput;
