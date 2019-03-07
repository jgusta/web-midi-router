class MidiConnection {
  sendOutput(event) {
    // note: midi spec says "timestamp", chrome sends "timeStamp"
    this.midiOutput.sendEvent(event.data, event.timeStamp || event.timestamp);
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
