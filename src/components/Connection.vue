<template>
  <div>
    <h5>Input</h5>
    <vSelect></vSelect>
    <h5>Output</h5>
    <vSelect></vSelect>
  </div>
</template>

<script>
import vSelect from "vue-select";
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
  props: ["cb"],
  methods: {
    connect: function() {},
    disconnect: function() {}
  },
  components: {
    vSelect
  }
};
</script>
