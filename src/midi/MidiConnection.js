class MidiConnection {
  constructor(key) {
    this.key = key;
  }
  sendOutput(event) {
    // note: midi spec says "timestamp", chrome sends "timeStamp"
    this.midiOutput.sendEvent(event.data, event.timeStamp || event.timestamp);
  }
  notifyDisconnectInput() {
    this.midiInput = null;
  }
  notifyDisconnectOutput() {
    this.midiOutput = null;
  }
  plugInput(midiInput) {
    this.midiInput = midiInput;
    this.midiInput.attachConnection(this);
  }
  plugOutput(midiOutput) {
    this.midiOutput = midiOutput;
  }
}

export default MidiConnection;
