import Dispatcher from "./Dispatcher";
import MidiInput from "./MidiInput";
import MidiOutput from "./MidiOutput";

var midiAccess;
// all this does is assing midiAccess then open inputs and return a promise, does not seem to store inputs
// i think this is some initialization step thing
function _initMidi() {
  if (!navigator.requestMIDIAccess) {
    return Promise(function(resolve, fail) {
      fail(
        "Your browser doesn't have navigator.requestMIDIAccess. Please try Google Chrome."
      );
    });
  }
  return navigator.requestMIDIAccess().then(
    function(midi) {
      midiAccess = midi;
      var promises = [];
      let inputs = midiAccess.inputs.values();
      for (
        var input = inputs.next();
        input && !input.done;
        input = inputs.next()
      ) {
        promises.push(input.value.open());
      }
      let outputs = midiAccess.outputs.values();
      for (
        var output = outputs.next();
        output && !output.done;
        output = outputs.next()
      ) {
        promises.push(output.value.open());
      }
      return Promise.all(promises).then(() => midiAccess);
    },
    function(err) {
      console.log("Failed to get MIDI." + err);
    }
  );
}

// does this sysMidiInput match this abstraction, basically?
function isMatch(low, high) {
  if (low.id === high.portId && high.label === low.name) {
    return true;
  }
  return false;
}

class Delegator {
  constructor(callback, recalledInputs, recalledOutputs, dispatcher) {
    callback =
      callback ||
      function() {
        console.log("ready");
      };
    let _allReadyResolve;

    this._highInputs = recalledInputs || [];
    this._highOutputs = recalledOutputs || [];
    this.readyPromise = new Promise(
      resolve => (_allReadyResolve = resolve)
    ).then(callback);
    this.dispatcher = dispatcher || new Dispatcher();
    _initMidi()
      .then(midi => (this.midiAccess = midi))
      .then(() => this.updateAllPorts())
      .then(_allReadyResolve);
  }

  updateAllPorts() {
    console.log(this);
    return this.updateInputs(
      this.midiAccess,
      this._highInputs,
      this.dispatcher
    ).then(() =>
      this.updateOutputs(this.midiAccess, this._highOutputs, this.dispatcher)
    );
  }

  retrieveMidiAccess() {
    return this.midiAccess || false;
  }

  retrieveDispatcher() {
    return this.dispatcher || false;
  }

  retrieveInputs() {
    return this._highInputs || [];
  }

  retrieveOutputs() {
    return this._highOutputs || [];
  }

  updateInputs(midi, _highInputs, dispatcher) {
    let lowInputs = midi.inputs.values();
    let promises = [];
    for (let lowInput of lowInputs) {
      let add = true;
      for (let highInput of _highInputs) {
        if (isMatch(lowInput, highInput)) {
          // matching abstraction exists, so match this lowInput to it
          promises.push(highInput.attachInput(lowInput));
          add = false;
          break;
        }
      }
      if (add) {
        // matching abstraction doesnt exist so create a new one
        promises.push(
          new Promise(res => {
            let newHighInput = new MidiInput(lowInput, dispatcher);
            _highInputs.push(newHighInput);
            newHighInput.attachInput(lowInput).then(res);
          })
        );
      }
    }
    return Promise.all(promises);
  }

  updateOutputs(midi, _highOutputs, dispatcher) {
    let lowOutputs = midi.outputs.values();
    let promises = [];
    for (let lowOutput of lowOutputs) {
      let add = true;
      for (let highOutput of _highOutputs) {
        if (isMatch(lowOutput, highOutput)) {
          promises.push(highOutput.attachOutput(lowOutput));
          add = false;
          break;
        }
      }
      if (add) {
        promises.push(
          new Promise(res => {
            let newHighOutput = new MidiOutput(lowOutput, dispatcher);
            _highOutputs.push(newHighOutput);
            newHighOutput.attachOutput(lowOutput).then(res);
          })
        );
      }
    }
    return Promise.all(promises);
  }

  onReady(callback) {
    this.readyPromise.then(callback);
  }
}

// to use
// import Delegator from './Delegator';
// var midi = Delegator.getInstance();
// midi.onReady(function() {
//  // do something
//});
export default Delegator;
