<template>
  <div>
    Output port id: {{ output.id }}<br>
    manufacturer: {{ output.manufacturer }}<br>
    name: {{ output.name }}
  </div>
</template>
<script>
export default {
  props: ["output", "idx"],
  created: function() {
    console.log(this.output);
  }
};
</script>
