<template>
  <div>
    <div>
      <h5>Input</h5>
      <vSelect @change="changedInputValue" :options="midiInputs"></vSelect>
    </div>
    <div>
      <h5>Output</h5>
      <vSelect @change="changedOutputValue" :options="midiOutputs"></vSelect>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { mapGetters } from "vuex";
import { MidiConnection } from "../midi";
export default {
  created: function() {
    this.cb_index = this.key;
  },
  computed: {
    ...mapGetters([
      "midiAccess",
      "midiInputs",
      "midiOutputs",
      "midiConnections"
    ])
  },
  props: ["cb"],
  data: function() {
    return {
      connection: '',
      input: '',
      output: ''
    };
  },
  methods: {
    changedInputValue(value) {
      console.log(value);
      this.input = value;
      this.doConnect();
    },
    changedOutputValue(value) {
      console.log(value);
      this.output = value;
      this.doConnect();
    },
    doConnect() {
      if (this.input && this.output) {
        this.connectDevices(this.input, this.output);
      }
    },
    connectDevices(midiInput, midiOutput) {
      console.log("Trying to make connection");
      let midiConnection = new MidiConnection(this.cb);
      this.connection = midiConnection;
      midiConnection.plugInput(midiInput);
      midiConnection.plugOutput(midiOutput);
      this.$store.commit("addMidiConnection", { midiConnection });
    }
  },
  components: {
    vSelect
  }
};
</script>
