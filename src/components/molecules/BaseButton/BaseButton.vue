<template>
  <button
    v-bind="$attrs"
    :class="[
      'main-button d-flex justify-content-center align-items-center align-center',
      `button-${variant}`,
    ]"
  >
    <base-text :color="textColor" _as="btn">
      <i v-if="icon && iconPosition === 'left'" :class="[icon, 'me-2']"></i>
    </base-text>
    <base-text :color="textColor" _as="btn" :font-weight="600">
      <slot></slot>
    </base-text>
    <base-text :color="textColor" _as="btn">
      <i v-if="icon && iconPosition === 'right'" :class="[icon, 'ms-2']"></i>
    </base-text>
  </button>
</template>

<script>
import { computed } from "vue";
import { BaseText } from "@/components/atom";

export default {
  name: "BaseButton",
  components: {
    BaseText,
  },
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (val) => ["primary", "secondary", "danger"].includes(val),
    },
    icon: {
      type: String,
      default: null,
    },
    iconPosition: {
      type: String,
      default: "left",
      validator: (val) => ["left", "right"].includes(val),
    },
  },
  setup(props) {
    const textColor = computed(() => {
      const { variant } = props;
      if (variant === "primary" || variant === "danger") {
        return "white";
      } else {
        return "#4a4a4a";
      }
    });
    return {
      textColor,
    };
  },
};
</script>

<style scoped>
.main-button {
  padding: 0 40px;
  border-radius: 45px;
  outline: none;
  border: none;
  width: fit-content;
  height: 54px;
}
.button-primary {
  background: #16abf8;
}
.button-danger {
  background: #ed4c5c;
}
.button-secondary {
  background: #f4f4f4;
}
</style>
