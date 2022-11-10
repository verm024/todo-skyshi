<template>
  <div class="main-select">
    <label>
      <base-text _as="caption" :font-weight="600">{{
        label.toUpperCase()
      }}</base-text>
    </label>
    <div :class="['dropdown', `dropdown-${selectorType}`]">
      <button
        :id="`select-${name}`"
        :class="[`${selectorType}-selector`]"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div
          v-if="!asDropdown"
          class="d-flex align-items-center justify-content-between"
        >
          <div class="d-flex align-items-center">
            <div v-if="selectedOption.color" class="me-3">
              <colored-circle :size="14" :color="selectedOption.color" />
            </div>
            <base-text _as="b1" color="#4A4A4A">{{
              selectedOption.text
            }}</base-text>
          </div>
          <base-text _as="b1"><i class="bi bi-chevron-down"></i></base-text>
        </div>
        <div v-else>
          <div
            v-if="selectorType === 'basic'"
            class="d-flex align-items-center justify-content-between"
          >
            <base-text _as="b1" color="#4A4A4A">{{
              selectorContent
            }}</base-text>
            <base-text _as="b1"><i class="bi bi-chevron-down"></i></base-text>
          </div>
          <div v-else-if="selectorType === 'icon'">
            <base-text _as="h5" color="#888888"
              ><i :class="selectorContent"></i
            ></base-text>
          </div>
        </div>
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
              <div v-if="option.icon" class="me-3">
                <base-text _as="h6" :color="option.icon?.color || '#888888'"
                  ><i :class="option.icon?.icon"></i
                ></base-text>
              </div>
              <base-text _as="b1" color="#4A4A4A">{{ option.text }}</base-text>
            </div>
            <div v-if="option.value === selectedOption.value">
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
      default: () => ({ text: "", value: "", color: "" }),
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
    selectorType: {
      type: String,
      default: "basic",
      validator: (val) => ["basic", "icon"].includes(val),
    },
    asDropdown: {
      type: Boolean,
      default: false,
    },
    selectorContent: {
      type: String,
      default: "",
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
.dropdown-icon .dropdown-menu {
  border-radius: 6px;
  box-shadow: 0px 6px 15px 5px rgba(0, 0, 0, 0.1);
}
.basic-selector {
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 6px 6px 0px 0px;
  padding: 14px 17px;
  margin: 0;
  width: 200px;
  text-align: left;
}
.icon-selector {
  background-color: white;
  border: 1px solid #e5e5e5;
  width: 54px;
  height: 54px;
  border-radius: 45px;
}
</style>
