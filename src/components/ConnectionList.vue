<template>
  <div id="connection-list">
    <h3>Connections</h3>
    <button @click="addBlankConnection">Add connection</button>
    <Connection
      v-for="(cb, idx) in connectionBoxes"
      v-bind:key="idx"
      v-bind:cb="cb"
    ></Connection>
  </div>
</template>

<script>
import Connection from "./Connection.vue";
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
      connectionBoxes: []
    };
  },
  methods: {
    addBlankConnection: function() {
      this.connectionBoxes.push({
        input: "",
        output: ""
      });
    }
  },
  components: {
    Connection
  }
};
</script>
