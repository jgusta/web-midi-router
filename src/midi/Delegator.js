import Dispatcher from "./Dispatcher";
import MidiInput from "./MidiInput";

// these are the abstractions
var _highInputs = [];
var _highOutputs = [];

var inputs = [];
var outputs = [];

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
      inputs = midiAccess.inputs.values();
      for (
        var input = inputs.next();
        input && !input.done;
        input = inputs.next()
      ) {
        promises.push(input.value.open());
      }
      outputs = midiAccess.outputs.values();
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
function isMatch(lowInput, highInput) {
  if (lowInput.id === highInput.portId && highInput.label === lowInput.name) {
    return true;
  }
  return false;
}

var _instance;

// function getInstance(callback) {
//   if (_instance) {
//     _instance.readyPromise.then(callback);
//     return _instance;
//   } else {
//     _instance = new Delegator(callback);
//     return _instance;
//   }
// }

class Delegator {
  constructor(callback, recalledInputs, recalledOutputs) {
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
    this.dispatcher = new Dispatcher();
    _initMidi().then(midi => {
      // loop through low inputs
      // if there is a high input whose value matches the low
      if (midi) {
        this.midiAccess = midi;
        this.updateInputs(midi, this._highInputs)
          .then(() => this.updateOutputs(midi, this._highOutputs))
          .then(_allReadyResolve);
      }
    });
  }

  retrieveMidiAccess() {
    return this.midiAccess || false;
  }

  updateInputs(midi, _highInputs) {
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
            let newHighInput = new MidiInput(lowInput, this.dispatcher);
            _highInputs.push(newHighInput);
            newHighInput.attachInput(lowInput).then(res);
          })
        );
      }
    }
    return Promise.all(promises);
  }

  updateOutputs(midi) {

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
export default {
  DawlessUsb: Delegator
};
// var outside = 'hey';
// var ass = new Promise((good,bad) =>  {
//   good(outside);
// });

// ass.then((stuff)=>console.log(stuff))
// var _allReadyResolve;
// readyPromise = new Promise((resolve) => _allReadyResolve = resolve);
// readyPromise.then(function(hey) {console.log('boom')});
// _allReadyResolve();
