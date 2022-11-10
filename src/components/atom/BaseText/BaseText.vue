<template>
  <div
    :class="[
      'main-font',
      `font-${_as}`,
      `font-weight-${fontWeight}`,
      $attrs.class,
    ]"
    :style="{ color }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseText",
  props: {
    _as: {
      type: String,
      default: "b1",
      validator: (val) =>
        ["h4", "h5", "h6", "b1", "b2", "btn", "caption"].includes(val),
    },
    fontWeight: {
      type: Number,
      default: 400,
      validator: (val) =>
        [100, 200, 300, 400, 500, 600, 700, 800, 900].includes(val),
    },
    color: {
      type: String,
      default: "#111111",
    },
  },
};
</script>

<style scoped>
.font-h4 {
  font-size: 2.25rem; /* 36px */
  line-height: 3.375rem; /* 54px */
}
.font-h5 {
  font-size: 1.5rem; /* 24px */
  line-height: 2.25rem; /* 36px */
}
.font-h6 {
  font-size: 1.125rem; /* 18px */
  line-height: 1.688rem; /* 27px */
}
.font-b1 {
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
}
.font-b2 {
  font-size: 0.875rem; /* 14px */
  line-height: 1.313rem; /* 21px */
}
.font-btn {
  font-size: 1.125rem; /* 18px */
  line-height: 1.688rem; /* 27px */
}
.font-caption {
  font-size: 0.75rem; /* 12px */
  line-height: 1.125rem; /* 18px */
}
.font-weight-100 {
  font-weight: 100;
}
.font-weight-200 {
  font-weight: 200;
}
.font-weight-300 {
  font-weight: 300;
}
.font-weight-400 {
  font-weight: 400;
}
.font-weight-500 {
  font-weight: 500;
}
.font-weight-600 {
  font-weight: 600;
}
.font-weight-700 {
  font-weight: 700;
}
.font-weight-800 {
  font-weight: 800;
}
.font-weight-900 {
  font-weight: 900;
}
</style>
