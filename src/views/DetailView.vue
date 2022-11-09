<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div class="d-flex align-items-center">
      <div role="button" class="me-4">
        <router-link to="/">
          <base-text _as="h5"><i class="bi bi-chevron-left"></i></base-text
        ></router-link>
      </div>
      <base-text _as="h4" :font-weight="700">{{ activityTitle }}</base-text>
      <div role="button" class="ms-4">
        <base-text _as="h6" color="#A4A4A4"
          ><i class="bi bi-pencil"></i
        ></base-text>
      </div>
    </div>
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
    const activityTitle = ref("");
    const fetchTodos = async () => {
      try {
        const res = await api().get(`/activity-groups/${route.params.id}`);
        const { data } = res;
        todos.value = data?.todo_items;
        activityTitle.value = data?.title;
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => fetchTodos());

    return {
      todos,
      activityTitle,
    };
  },
};
</script>

<style scoped></style>
