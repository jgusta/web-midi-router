<template>
  <div>
    Input port [type:'"
    {{input.type}}
    "'] id:'"
    {{ input.id }}
    "' manufacturer:'"
    {{ input.manufacturer }}
    "' name:'"
    {{ input.name }}
    "' version:'"
    {{ input.version }}
    "'"
  </div>
</template>
<script>
export default {
  props: ["input", "idx"]
};
</script>