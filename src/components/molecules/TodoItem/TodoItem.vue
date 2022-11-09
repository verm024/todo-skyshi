<template>
  <div
    class="main-todo-item w-100 d-flex align-items-center justify-content-between"
  >
    <div class="d-flex align-items-center">
      <base-checkbox :checked="checked" :on-check-click="onCheckClick" />
      <div class="ms-3">
        <colored-circle :color="priorityColor" />
      </div>
      <base-text
        class="ms-3 me-3"
        _as="h6"
        :font-weight="500"
        style="{textDecoration: checked ? 'line-through' : 'none'}"
        >{{ title }}</base-text
      >
      <div role="button" @click="onEdit">
        <base-text _as="b1" color="#C4C4C4"
          ><i class="bi bi-pencil"></i
        ></base-text>
      </div>
    </div>
    <div role="button" @click="onDelete">
      <base-text _as="h6" color="#888888"
        ><i class="bi bi-trash3"></i
      ></base-text>
    </div>
  </div>
</template>

<script>
import { BaseText, ColoredCircle, BaseCheckbox } from "@/components/atom";
import { convertPriorityToColor } from "@/utils/helperFunctions";

import { computed } from "vue";

export default {
  name: "TodoItem",
  components: { BaseText, ColoredCircle, BaseCheckbox },
  props: {
    priority: {
      type: String,
      default: "very-high",
      validator: (val) =>
        ["very-high", "high", "normal", "low", "very-low"].includes(val),
    },
    checked: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    onDelete: {
      type: Function,
      default: () => null,
    },
    onEdit: {
      type: Function,
      default: () => null,
    },
    onCheckClick: {
      type: Function,
      default: () => null,
    },
  },
  setup(props) {
    const priorityColor = computed(() => {
      const { priority } = props;
      return convertPriorityToColor(priority);
    });
    return {
      priorityColor,
    };
  },
};
</script>

<style scoped>
.main-todo-item {
  height: 80px;
  padding: 0 30px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
</style>
