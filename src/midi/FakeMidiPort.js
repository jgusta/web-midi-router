// MidiInput and Output implement MIDIPort

// interface MIDIPort : EventTarget {
//     readonly    attribute DOMString               id;
//     readonly    attribute DOMString?              manufacturer;
//     readonly    attribute DOMString?              name;
//     readonly    attribute MIDIPortType            type;
//     readonly    attribute DOMString?              version;
//     readonly    attribute MIDIPortDeviceState     state;
//     readonly    attribute MIDIPortConnectionState connection;
//                 attribute EventHandler            onstatechange;
//     Promise<MIDIPort> open ();
//     Promise<MIDIPort> close ();
// };

// enum MIDIPortDeviceState {
//     "disconnected",
//     "connected"
// };

// enum MIDIPortConnectionState {
//     "open",
//     "closed",
//     "pending"
// };

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getDefaults(type, number) {
  let myNumber = number || getRandomInt(100000);
  return {
    id: type + "-" + myNumber,
    name: "Fake Midi " + myNumber,
    manufacturer: "github.com/sfscs",
    type: type,
    version: "0.0",
    state: "disconnected",
    connection: "closed"
  };
}

function _extend() {
  for (var i = 1; i < arguments.length; i++)
    for (var key in arguments[i])
      if (arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

class FakeMidiPort {
  constructor(options) {
    if (options === "input") {
      _extend(this, getDefaults("input"));
    } else if (options === "output") {
      _extend(this, getDefaults("output"));
    } else {
      if (!options.type) {
        throw new Error(
          "Pass 'input' or 'output' OR object with key 'type' into constructor"
        );
      }
      _extend(this, getDefaults(options.type, options.number || null), options);
    }
  }

  open() {
    return new Promise(res => {
      this.state = "open";
      this.connection = "connected";
      res(this);
    });
  }

  close() {
    return new Promise(res => {
      this.state = "closed";
      this.connection = "disconnected";
      res(this);
    });
  }
}

export default { FakeMidiPort };
