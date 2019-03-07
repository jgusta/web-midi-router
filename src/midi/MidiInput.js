class MidiInput {
  constructor(sysMidiInput) {
    this.sysMidiInput = sysMidiInput;
  }
  inputHandler(event) {
    console.log(event);
    this.midiConnection.sendOutput(event);
  }
  attachConnection(midiConnection) {
    this.midiConnection = midiConnection;
    this.sysMidiInput.onmidimessage = this.inputHandler.bind(this);
  }
}
export default MidiInput;
