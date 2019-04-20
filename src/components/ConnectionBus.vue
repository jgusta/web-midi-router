<template>
  <div>
    <div>
      <h5>Input</h5>
      <vSelect 
        @change="$emit('input-change', $event, cb_index)" 
        :options="midiInputs"/>
    </div>
    <div>
      <h5>Output</h5>
      <vSelect 
        @change="$emit('output-change', $event, cb_index)" 
        :options="midiOutputs"/>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
export default {
  props: ["midiInputs", "midiOutputs", "cb_index"],
  components: {
    vSelect
  }
};
</script>
