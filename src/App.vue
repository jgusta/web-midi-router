<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <StatusConsole />
    <ConnectionList />

    <template v-if="loaded">
      

    </template>

  </div>
</template>

<script>
import StatusConsole from "./components/StatusConsole.vue";
import ConnectionList from "./components/ConnectionList.vue";
import { WebMidiRouter } from "./midi";
export default {
  name: "app",
  data: function () {
    return {
      loaded: false,
      DawlessUsb: ''
    }
  },
  components: {
    StatusConsole,
    ConnectionList
  },
  computed: {
    
  },
  methods: {

  },
  created() {
    this.WebMidiRouter = new WebMidiRouter();
  }
}
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
