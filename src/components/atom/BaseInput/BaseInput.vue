<template>
  <div class="main-input">
    <input
      v-bind="$attrs"
      class="form-control"
      type="text"
      :placeholder="inputPlaceholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    inputPlaceholder: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped></style>
