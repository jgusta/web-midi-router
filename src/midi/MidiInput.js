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
  spitInput() {
    return this.sysMidiInput;
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
  get id() {
    return this.sysMidiInput.id;
  }
  get name() {
    return this.sysMidiInput.name;
  }
  get manufacturer() {
    return this.sysMidiInput.manufacturer;
  }
}
export default MidiInput;
