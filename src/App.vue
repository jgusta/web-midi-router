<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <template v-if="loaded">
      <div id="connection-list" class="conn-wrapper">
        <h3>Connections</h3>
        <button @click="addBlankBus">Add connection</button>
        <ConnectionBus
          class="conn"
          v-for="(item, index) in busList"
          v-bind:key="index"
          v-bind:cb_index="index"
          v-bind:midiInputs="availableInputs()"
          v-bind:midiOutputs="availableOutputs()"
          @input-change="handleInputChange"
          @output-change="handleOutputChange"
        ></ConnectionBus>
      </div>
    </template>
  </div>
</template>

<script>
import { Delegator } from "./midi";
import ConnectionBus from "./components/ConnectionBus.vue";
export default {
  name: "app",
  data() {
    return {
      loaded: false,
      busList: [],
      busIndex: 0,
      WebMidiRouter: ""
    };
  },
  computed: {
    dispatcher() {
      return this.WebMidiRouter.retrieveDispatcher();
    }
  },
  methods: {
    addBlankBus() {
      this.busList.push({
        input: false,
        output: false
      });
    },
    handleInputChange(value, index) {
      this.busList[index].input = value;
      this.doConnection(index);
    },
    handleOutputChange(value, index) {
      this.busList[index].output = value;
      this.doConnection(index);
    },
    doConnection(index) {
      let dispatcher = this.dispatcher;
      if (this.busList[index].output && this.busList[index].input) {
        let input = this.busList[index].input;
        let output = this.busList[index].output;
        dispatcher.addMapping(input.portId, output);
        console.log(input.name + " connected to " + output.name);
      }
    },
    availableInputs() {
      let result = [];
      let dispatcher = this.dispatcher;
      for (let input of this.WebMidiRouter.retrieveInputs()) {
        if (!dispatcher.hasInputMapping(input.portId)) {
          result.push(input);
        }
      }
      return result;
    },
    availableOutputs() {
      let result = [];
      let dispatcher = this.dispatcher;
      for (let output of this.WebMidiRouter.retrieveOutputs()) {
        if (!dispatcher.hasOutputMapping(output)) {
          result.push(output);
        }
      }
      return result;
    }
  },
  created() {
    this.WebMidiRouter = new Delegator();
    this.WebMidiRouter.onReady(() => {
      this.loaded = true;
    });
  },
  components: {
    ConnectionBus
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
.conn-wrapper {
  max-width: 500px;
}
.conn {
}
</style>
