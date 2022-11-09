<template>
  <div class="container">
    <div v-for="todo in todos" :key="todo?.id" class="mt-3 mb-3">
      <todo-item
        :title="todo?.title"
        :priority="todo?.priority"
        :checked="!todo?.is_active"
        :on-delete="() => onDelete(todo?.id, todo?.title)"
        :on-edit="() => onEdit(todo)"
        :on-check-click="() => onCheckClick(todo?.id)"
      />
    </div>
    <div
      v-if="todos.length === 0"
      class="d-flex justify-content-center pt-5"
      role="button"
      @click="onAdd"
    >
      <img
        class="w-80"
        src="@/assets/todo-empty-state.png"
        alt="Buat List Item kamu"
      />
    </div>
  </div>
</template>

<script>
import { TodoItem } from "@/components/molecules";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: {
    todos: {
      type: Array,
      default: () => [],
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
    onAdd: {
      type: Function,
      default: () => null,
    },
  },
};
</script>

<style scoped></style>
