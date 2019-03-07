<template>
  <div id="input-device-list">
    <h3>Detected MIDI inputs</h3>
    <template>
      <InputDevice
        v-for="(input, idx) in inputDevices"
        v-bind:key="idx"
        v-bind:input="input"
      ></InputDevice>
    </template>
  </div>
</template>

<script>
import InputDevice from "./InputDevice.vue";

export default {
  data() {
    return {
      inputDevices: "",
      midiAccess: "",
      midiConnection: []
    };
  },
  components: {
    InputDevice
  }
};
</script>
