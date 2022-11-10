<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div class="d-flex align-items-center">
      <div role="button" class="me-4" data-cy="todo-back-button">
        <router-link to="/">
          <base-text _as="h5"><i class="bi bi-chevron-left"></i></base-text
        ></router-link>
      </div>
      <input
        v-model="activityTitle"
        id="activity-title"
        class="activity-title-custom-input"
        data-cy="todo-title"
        @focus="handleClickEditActivityName"
        @blur="handleClickEditActivityName"
      />
      <div
        role="button"
        class="ms-4"
        data-cy="todo-title-edit-button"
        @click="
          () => {
            if (!isEditingActivityName) {
              handleClickEditActivityName();
            }
          }
        "
      >
        <base-text _as="h6" color="#A4A4A4"
          ><i class="bi bi-pencil"></i
        ></base-text>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div class="me-3">
        <base-select
          name="todo-sort"
          :options="sortOptions"
          :selected-option="selectedSort"
          selector-type="icon"
          as-dropdown
          selector-content="bi bi-arrow-down-up"
          :handle-change-select="
            (text, value) => handleChangeSelectedSort(text, value)
          "
          menu-cy="sort-parent"
          selector-cy="todo-sort-button"
        />
      </div>
      <base-button
        icon="bi bi-plus-lg"
        data-cy="todo-add-button"
        @click="handleOpenModalAdd"
        >Tambah</base-button
      >
    </div>
  </div>
  <todo-list
    :todos="sortedTodos"
    :on-delete="(id, title) => handleOpenModalDelete(id, title)"
    :on-add="handleOpenModalAdd"
    :on-edit="(todo) => handleOpenModalEdit(todo)"
    :on-check-click="(id, is_active) => handleChangeCheckbox(id, is_active)"
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
    mode="add"
  />

  <!-- Modal Edit Todo -->
  <modal-add-edit-todo
    :is-open="isModalEditOpen"
    :on-close="handleCloseModalEdit"
    :on-confirm="async (name, priority) => await handleEdit(name, priority)"
    title="Edit Item"
    :data="modalEditData"
    mode="edit"
  />

  <base-alert
    text="Item berhasil dihapus"
    icon="bi bi-exclamation-circle"
    icon-color="#00A790"
    :is-open="isAlertDeleteOpen"
  />
</template>

<script>
import {
  TodoList,
  ModalDeleteTodo,
  ModalAddEditTodo,
} from "@/components/organism";
import { BaseText } from "@/components/atom";
import { BaseButton, BaseSelect, BaseAlert } from "@/components/molecules";
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
    BaseSelect,
    BaseAlert,
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
      } finally {
        sortTodos();
      }
    };
    onMounted(() => fetchTodos());

    const isModalDeleteOpen = ref(false);
    const modalDeleteData = ref(null);
    const isAlertDeleteOpen = ref(false);
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
        isAlertDeleteOpen.value = true;
        setTimeout(() => {
          isAlertDeleteOpen.value = false;
        }, 2000);
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

    const handleChangeCheckbox = async (id, is_active) => {
      try {
        await api().patch(`/todo-items/${id}`, {
          is_active: !is_active,
        });
        await fetchTodos();
      } catch (error) {
        console.error(error);
      }
    };

    const isEditingActivityName = ref(false);
    const handleClickEditActivityName = async () => {
      if (isEditingActivityName.value) {
        try {
          await api().patch(`/activity-groups/${route.params.id}`, {
            title: activityTitle.value,
          });
          await fetchTodos();
          isEditingActivityName.value = false;
        } catch (error) {
          console.error(error);
        }
      } else {
        document.getElementById("activity-title").focus();
        isEditingActivityName.value = true;
      }
    };

    const sortOptions = [
      {
        text: "Terbaru",
        value: "terbaru",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-sort-down",
        },
        dataCy: "sort-selection",
      },
      {
        text: "Terlama",
        value: "terlama",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-sort-up-alt",
        },
        dataCy: "sort-selection",
      },
      {
        text: "A-Z",
        value: "az",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-sort-alpha-down",
        },
        dataCy: "sort-selection",
      },
      {
        text: "Z-A",
        value: "za",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-sort-alpha-down-alt",
        },
        dataCy: "sort-selection",
      },
      {
        text: "Belum Selesai",
        value: "belum-selesai",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-arrow-down-up",
        },
        dataCy: "sort-selection",
      },
    ];
    const sortedTodos = ref([]);
    const selectedSort = ref({
      text: "Terbaru",
      value: "terbaru",
    });
    const handleChangeSelectedSort = (text, value) => {
      selectedSort.value = { text, value };
      sortTodos();
    };
    const sortTodos = () => {
      const spreadNewVal = [...todos.value];
      switch (selectedSort.value.value) {
        case "terbaru":
          spreadNewVal.sort((a, b) => b.id - a.id);
          sortedTodos.value = spreadNewVal;
          break;
        case "terlama":
          spreadNewVal.sort((a, b) => a.id - b.id);
          sortedTodos.value = spreadNewVal;
          break;
        case "az":
          spreadNewVal.sort((a, b) => {
            let loweredA = a.title.toLowerCase();
            let loweredB = b.title.toLowerCase();
            if (loweredA < loweredB) {
              return -1;
            }
            if (loweredA > loweredB) {
              return 1;
            }
            return 0;
          });
          sortedTodos.value = spreadNewVal;
          break;
        case "za":
          spreadNewVal.sort((a, b) => {
            let loweredA = a.title.toLowerCase();
            let loweredB = b.title.toLowerCase();
            if (loweredA < loweredB) {
              return -1;
            }
            if (loweredA > loweredB) {
              return 1;
            }
            return 0;
          });
          spreadNewVal.reverse();
          sortedTodos.value = spreadNewVal;
          break;
        case "belum-selesai":
          spreadNewVal.sort((a, b) => b.is_active - a.is_active);
          sortedTodos.value = spreadNewVal;
          break;
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
      handleChangeCheckbox,
      isEditingActivityName,
      handleClickEditActivityName,
      sortOptions,
      sortedTodos,
      selectedSort,
      handleChangeSelectedSort,
      isAlertDeleteOpen,
    };
  },
};
</script>

<style scoped>
.activity-title-custom-input {
  /* H4 font size */
  font-size: 2.25rem !important;
  line-height: 3.375rem !important;
  font-weight: 700;
  border: none;
}
.activity-title-custom-input:focus {
  outline: none;
  border-bottom: 1px solid #d8d8d8;
}
</style>
