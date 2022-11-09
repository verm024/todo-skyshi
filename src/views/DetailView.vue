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
    <base-button icon="bi bi-plus-lg" @click="handleOpenModalAdd"
      >Tambah</base-button
    >
  </div>
  <todo-list
    :todos="todos"
    :on-delete="(id, title) => handleOpenModalDelete(id, title)"
    :on-add="handleOpenModalAdd"
    :on-edit="(todo) => handleOpenModalEdit(todo)"
  />
  <modal-delete-todo
    :is-open="isModalDeleteOpen"
    :on-close="handleCloseModalDelete"
    :on-confirm="handleDelete"
    :title="modalDeleteData?.title || ''"
  />

  <!-- Modal Add Todo -->
  <modal-add-edit-todo
    :is-open="isModalAddOpen"
    :on-close="handleCloseModalAdd"
    :on-confirm="async (name, priority) => await handleAdd(name, priority)"
    title="Tambah List Item"
  />

  <!-- Modal Edit Todo -->
  <modal-add-edit-todo
    :is-open="isModalEditOpen"
    :on-close="handleCloseModalEdit"
    :on-confirm="async (name, priority) => await handleEdit(name, priority)"
    title="Edit Item"
    :data="modalEditData"
  />
</template>

<script>
import {
  TodoList,
  ModalDeleteTodo,
  ModalAddEditTodo,
} from "@/components/organism";
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
    ModalDeleteTodo,
    ModalAddEditTodo,
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

    const isModalDeleteOpen = ref(false);
    const modalDeleteData = ref(null);
    const handleOpenModalDelete = (id, title) => {
      isModalDeleteOpen.value = true;
      modalDeleteData.value = { id, title };
    };
    const handleCloseModalDelete = () => {
      isModalDeleteOpen.value = false;
      modalDeleteData.value = null;
    };
    const handleDelete = async () => {
      try {
        await api().delete(`/todo-items/${modalDeleteData.value.id}`);
        await fetchTodos();
      } catch (error) {
        console.error(error);
      } finally {
        handleCloseModalDelete();
      }
    };

    const isModalAddOpen = ref(false);
    const handleOpenModalAdd = () => {
      isModalAddOpen.value = true;
    };
    const handleCloseModalAdd = () => {
      isModalAddOpen.value = false;
    };
    const handleAdd = async (name, priority) => {
      try {
        await api().post("/todo-items", {
          activity_group_id: route.params.id,
          title: name,
          priority,
        });
        await fetchTodos();
      } catch (error) {
        console.error(error);
      } finally {
        handleCloseModalAdd();
      }
    };

    const isModalEditOpen = ref(false);
    const modalEditData = ref(null);
    const handleOpenModalEdit = (todo) => {
      isModalEditOpen.value = true;
      modalEditData.value = { ...todo };
    };
    const handleCloseModalEdit = () => {
      isModalEditOpen.value = false;
      modalEditData.value = null;
    };
    const handleEdit = async (name, priority) => {
      try {
        await api().patch(`/todo-items/${modalEditData.value.id}`, {
          title: name,
          priority,
        });
        await fetchTodos();
      } catch (error) {
        console.error(error);
      } finally {
        handleCloseModalEdit();
      }
    };

    return {
      todos,
      activityTitle,
      handleOpenModalDelete,
      isModalDeleteOpen,
      handleCloseModalDelete,
      handleDelete,
      modalDeleteData,
      handleOpenModalAdd,
      isModalAddOpen,
      handleCloseModalAdd,
      handleAdd,
      handleOpenModalEdit,
      isModalEditOpen,
      handleCloseModalEdit,
      handleEdit,
      modalEditData,
    };
  },
};
</script>

<style scoped></style>
