<template>
  <div id="connection-list" class="conn-wrapper">
    <h3>Connections</h3>
    <button @click="addBlankConnection">Add connection</button>
    <ConnectionBus
      class="conn"
      v-for="(bIdx) in busList"
      v-bind:key="bIdx"
      v-bind:cb="bIdx"
    ></ConnectionBus>
  </div>
</template>

<script>
import ConnectionBus from "./ConnectionBus.vue";
export default {
  data() {
    return {
      busList: [],
      busIndex: 0
    };
  },
  methods: {
    // add a blank connection with blank selected
    addBlankConnection: function() {
      this.busList.push(this.busIndex++);
    }
  },
  components: {
    ConnectionBus
  }
};
</script>
