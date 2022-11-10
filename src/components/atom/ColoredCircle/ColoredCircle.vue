<template>
  <div
    :style="{
      background: color,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '100px',
    }"
  ></div>
</template>

<script>
export default {
  name: "ColoredCircle",
  props: {
    color: {
      type: String,
      default: "black",
    },
    size: {
      type: Number,
      default: 9,
    },
  },
};
</script>

<style scoped></style>
