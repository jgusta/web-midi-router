<template>
  <div>
    <div v-for="log in logs" v-bind:key="log.key">{{ log }}</div>
  </div>
</template>
<script>
//import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    logs() {
      return this.$store.state.logs;
    }
  }
};
</script>
