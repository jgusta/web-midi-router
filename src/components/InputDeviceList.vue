<template>
  <div id="input-device-list">
    <h3>Detected MIDI inputs</h3>
    <template>
      <InputDevice 
        v-for="(input,idx) in inputDevices" 
        v-bind:key="idx" 
        v-bind:input="input">
        </InputDevice>
    </template>
  </div>
</template>

<script>
import InputDevice from "./InputDevice.vue";

export default {
  data() {
    return {
      inputDevices: "",
      midiAccess: ""
    };
  },
  created() {
    this.requestAccess().then(this.listMidiInputs);
  },
  components: {
    InputDevice
  },
  methods: {
    requestAccess() {
      let vm = this;
      return navigator.requestMIDIAccess().then(
        function(access) {
        console.log("Got get MIDI.");
          vm.midiAccess = access;
        },
        function(msg) {
          console.log("Failed to get MIDI." + msg);
        }
      );
    },
    listMidiInputs() {
      this.inputDevices = [];
      for (var entry of this.midiAccess.inputs) {
        var input = entry[1];
        this.inputDevices.push(input);
        console.log(
          "Input port [type:'" +
            input.type +
            "'] id:'" +
            input.id +
            "' manufacturer:'" +
            input.manufacturer +
            "' name:'" +
            input.name +
            "' version:'" +
            input.version +
            "'"
        );
      }
    }
  }
};
</script>