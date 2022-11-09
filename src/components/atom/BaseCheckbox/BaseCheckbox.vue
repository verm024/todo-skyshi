<template>
  <div class="main-checkbox">
    <input
      :checked="checked"
      class="form-check-input"
      type="checkbox"
      @click="onCheckClick"
    />
  </div>
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    onCheckClick: {
      type: Function,
      default: () => null,
    },
  },
};
</script>
<style scoped>
.main-checkbox input {
  width: 20px;
  height: 20px;
  border-radius: 0;
}
.main-checkbox input:checked {
  background-color: #16abf8;
  border-color: #16abf8;
}
</style>
