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
export default {
  data() {
    return {
      connectionBoxes: []
    };
  },
  methods: {
    // add a blank connection with blank selected
    addBlankConnection: function() {
      //Build the COnnection item, destoy th blank connection
      this.connectionBoxes.push({
        input: "",
        output: ""
      });
    },
    // tkae two connectionBoxes and return solid connection
    attachConnection: function() {}
  },
  components: {
    Connection
  }
};
</script>
