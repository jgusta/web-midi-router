<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <InputDeviceList />
    <OutputDeviceList />
    <StatusConsole />
    <ConnectionList />
    <vSelect />
  </div>
</template>

<script>
import InputDeviceList from "./components/InputDeviceList.vue";
import OutputDeviceList from "./components/OutputDeviceList.vue";
import StatusConsole from "./components/StatusConsole.vue";
import ConnectionList from "./components/ConnectionList.vue";
import MidiConnection from "./midi/MidiConnection.js";
import MidiInput from "./midi/MidiInput.js";
import MidiOutput from "./midi/MidiOutput.js";
import { mapGetters } from "vuex";
export default {
  name: "app",
  components: {
    InputDeviceList,
    OutputDeviceList,
    StatusConsole,
    ConnectionList
  },
  computed: {
    ...mapGetters([
      "midiAccess",
      "midiInputs",
      "midiOutputs",
      "midiConnections"
    ])
  },
  methods: {
    requestAccess() {
      let vm = this;
      if (!navigator.requestMIDIAccess) {
        // eslint-disable-next-line
        return new Promise(function(resolve, fail) {
          vm.$store.commit("log", {
            msg:
              "Your browser doesn't have navigator.requestMIDIAccess. Please try Google Chrome."
          });
          fail();
        });
      }
      return navigator.requestMIDIAccess().then(
        function(midi) {
          console.log("MIDI Initialized.");
          vm.$store.commit("log", {
            msg: "MIDI Initialized."
          });
          vm.$store.commit("midiAccess", { midi });
        },
        function(msg) {
          console.log("Failed to get MIDI." + msg);
        }
      );
    },
    enumerateMidiInputs() {
      let vm = this;
      return new Promise(function(resolve) {
        vm.$store.commit("clearMidiInputs");
        for (var entry of vm.midiAccess.inputs) {
          var input = entry[1];
          let midiInput = new MidiInput(input);
          vm.$store.commit("addMidiInput", { midiInput });
        }
        resolve();
      });
    },
    enumerateMidiOutputs() {
      let vm = this;
      return new Promise(function(resolve) {
        // note that there is some weird bug using the values() method
        // with outputs that causes the browser to crash
        vm.$store.commit("clearMidiOutputs");
        for (var entry of vm.midiAccess.outputs) {
          var output = entry[1];
          let midiOutput = new MidiOutput(output);
          vm.$store.commit("addMidiOutput", { midiOutput });
        }
        resolve();
      });
    },
    connectDevices(midiInput, midiOutput) {
      let midiConnection = new MidiConnection();
      midiConnection.plugInput(midiInput);
      midiConnection.plugOutput(midiOutput);
      this.$store.commit("addMidiConnection", { midiConnection });
    }
  },
  created() {
    let vm = this;
    this.requestAccess()
      .then(this.enumerateMidiInputs)
      .then(this.enumerateMidiOutputs)
      .then(function() {
        vm.connectDevices(vm.midiInputs[1], vm.midiOutputs[0]);
      });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
