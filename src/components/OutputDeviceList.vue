<template>
  <div id="output-device-list">
    <h3>MIDI outputs</h3>
    <template>
      <OutputDevice
        v-for="(output, idx) in midiOutputs"
        v-bind:key="idx"
        v-bind:output="output"
      ></OutputDevice>
    </template>
  </div>
</template>

<script>
import OutputDevice from "./OutputDevice.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "midiAccess",
      "midiInputs",
      "midiOutputs",
      "midiConnections"
    ])
  },
  data() {
    return {
    };
  },
  components: {
    OutputDevice
  }
};
</script>
