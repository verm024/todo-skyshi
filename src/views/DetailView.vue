<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <base-text _as="h4" :font-weight="700">Activity</base-text>
    <base-button icon="bi bi-plus-lg">Tambah</base-button>
  </div>
  <todo-list :todos="todos" />
</template>

<script>
import { TodoList } from "@/components/organism";
import { BaseText } from "@/components/atom";
import { BaseButton } from "@/components/molecules";
import api from "@/utils/api";

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "DetailView",
  components: {
    TodoList,
    BaseText,
    BaseButton,
  },
  setup() {
    const route = useRoute();
    const todos = ref([]);
    const fetchTodos = async () => {
      try {
        const res = await api().get(
          `/todo-items?activity_group_id=${route.params.id}`
        );
        const { data } = res.data;
        todos.value = data;
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => fetchTodos());

    return {
      todos,
    };
  },
};
</script>

<style scoped></style>
