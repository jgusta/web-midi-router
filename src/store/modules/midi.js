const state = {
  midiAccess: "",
  midiInputs: [],
  midiOutputs: [],
  midiConnections: []
};

const mutations = {
  midiAccess(state, payload) {
    state.midiAccess = payload.midi;
  },
  addMidiInput(state, payload) {
    state.midiInputs.push(payload.midiInput);
  },
  addMidiOutput(state, payload) {
    state.midiOutputs.push(payload.midiOutput);
  },
  addMidiConnection(state, payload) {
    state.midiConnections.push(payload.midiConnection);
  },
  clearMidiInputs(state) {
    state.midiInputs = [];
  },
  clearMidiOutputs(state) {
    state.midiOutputs = [];
  }
};

const getters = {
  midiAccess: state => state.midiAccess,
  midiInputs: state => state.midiInputs,
  midiOutputs: state => state.midiOutputs,
  midiConnections: state => state.midiConnections
};

export default {
  state,
  getters,
  mutations
};
