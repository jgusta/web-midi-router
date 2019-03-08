<template>
  <div>
    Input port id: {{ input.id }}<br>
    manufacturer: {{ input.manufacturer }}<br>
    name: {{ input.name }}
  </div>
</template>
<script>
export default {
  props: ["input", "idx"],
  created: function() {
    console.log(this.input);
  }
};
</script>
