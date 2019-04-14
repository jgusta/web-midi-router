<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <template v-if="loaded">
      <div id="connection-list" class="conn-wrapper">
        <h3>Connections</h3>
        <button @click="addBlankBus">Add connection</button>
        <div class="conn" v-for="(bIdx) in busList" v-bind:key="bIdx">
          <div>
            <h5>Input</h5>
            <vSelect @change="changedInputValue" :options="availableInputs"></vSelect>
          </div>
          <div>
            <h5>Output</h5>
            <vSelect @change="changedOutputValue" :options="availableOutputs"></vSelect>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Delegator } from "./midi";
import vSelect from "vue-select";
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
    availableInputs() {
      let result = [];
      let dispatcher = this.WebMidiRouter.retrieveDispatcher();
      for (let input of this.WebMidiRouter.retrieveInputs()) {
        if (!dispatcher.hasMapping(input)) {
          result.push(input);
        }
      }
      return result;
    },
    availableOutputs() {
      let result = [];
      let dispatcher = this.WebMidiRouter.retrieveDispatcher();
      for (let input of this.WebMidiRouter.retrieveOutputs()) {
        // if (!dispatcher.hasMapping(input)) {
          result.push(input);
        // }
      }
      return result;
    }
  },
  methods: {
    addBlankBus: function() {
      this.busList.push(this.busIndex++);
    },
    changedInputValue: function() {},
    changedOutputValue: function(){}
  },
  created() {
    this.WebMidiRouter = new Delegator();
    this.WebMidiRouter.onReady(() => {this.loaded = true});
  },
  components: {
    vSelect
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
