<template>
  <div class="main-labeled-input">
    <label :data-cy="labelCy">
      <base-text _as="caption" :font-weight="600">{{
        label.toUpperCase()
      }}</base-text>
    </label>
    <base-input
      v-model="localModelValue"
      :data-cy="inputCy"
      :input-placeholder="inputPlaceholder"
    />
  </div>
</template>

<script>
import { BaseInput, BaseText } from "@/components/atom";

import { computed } from "vue";

export default {
  name: "LabeledInput",
  components: {
    BaseInput,
    BaseText,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    inputPlaceholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: true,
    },
    inputCy: {
      type: String,
      default: null,
    },
    labelCy: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const localModelValue = computed({
      get: () => {
        return props.modelValue;
      },
      set: (newValue) => {
        emit("update:modelValue", newValue);
      },
    });
    return {
      localModelValue,
    };
  },
};
</script>
<style scoped>
.main-labeled-input label {
  margin-bottom: 9px;
}
</style>
