<template>
  <div class="main-select">
    <label>
      <base-text _as="caption" :font-weight="600">{{
        label.toUpperCase()
      }}</base-text>
    </label>
    <div class="dropdown">
      <button
        :id="`select-${name}`"
        class="custom-button d-flex justify-content-between"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div>
          {{ selectedOption.text }}
        </div>
        <base-text _as="b1"><i class="bi bi-chevron-down"></i></base-text>
      </button>
      <div class="dropdown-menu" :aria-labelledby="`#select-${name}`">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="select-option"
          role="button"
          @click="() => handleChangeSelect(option.text, option.value)"
        >
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div v-if="option.color" class="me-3">
                <colored-circle :size="14" :color="option.color" />
              </div>
              <base-text _as="b1" color="#4A4A4A">{{ option.text }}</base-text>
            </div>
            <div v-if="option.value === selectedOption">
              <base-text _as="h6" color="#4A4A4A"
                ><i class="bi bi-check2"></i
              ></base-text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseText, ColoredCircle } from "@/components/atom";

export default {
  name: "BaseSelect",
  components: {
    BaseText,
    ColoredCircle,
  },
  props: {
    name: {
      type: String,
      required: true,
      validator: (val) => val.split(" ").length === 1,
    },
    selectedOption: {
      type: Object,
      default: () => ({ text: "", value: "" }),
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      required: true,
    },
    handleChangeSelect: {
      type: Function,
      default: () => null,
    },
  },
};
</script>
<style scoped>
.main-select label {
  margin-bottom: 9px;
}
.select-option {
  padding: 14px 17px;
  border-bottom: 1px solid #e5e5e5;
}
.select-option:last-child {
  border: none;
}
.select-option:hover {
  background: #e5e5e5;
}
.dropdown-menu {
  padding: 0;
  border-radius: 6px;
  border-radius: 0px 0px 6px 6px;
  width: 200px;
}
.custom-button {
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 6px 6px 0px 0px;
  padding: 14px 17px;
  margin: 0;
  width: 200px;
  text-align: left;
}
</style>
