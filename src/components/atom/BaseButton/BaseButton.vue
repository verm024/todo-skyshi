<template>
  <button v-bind="$attrs" :class="['main-button', `button-${variant}`]">
    <base-text :color="textColor" _as="btn" :fontWeight="600"
      ><slot></slot
    ></base-text>
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
  padding: 13px 14px;
  border-radius: 45px;
  outline: none;
  border: none;
  width: 150px;
  height: 54px;
}
.button-primary {
  background: #16abf8;
}
.button-danger {
  background: #ed4c5c;
}
.button-secondary {
  background: transparent;
}
</style>
