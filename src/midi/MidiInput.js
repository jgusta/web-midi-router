class MidiInput {
  constructor(sysMidiInput) {
    this.sysMidiInput = sysMidiInput;
    this.label = this.sysMidiInput.name;
    this.value = this.sysMidiInput.id;
    this.manufacturer = this.sysMidiInput.manufacturer;
    this.name = this.sysMidiInput.name;
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
}
export default MidiInput;
