<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div class="d-flex align-items-center">
      <div role="button" class="me-4" data-cy="todo-back-button">
        <router-link to="/">
          <base-text _as="h5"><i class="bi bi-chevron-left"></i></base-text
        ></router-link>
      </div>
      <base-text
        v-if="!isEditingActivityName"
        _as="h4"
        :font-weight="700"
        data-cy="todo-title"
        >{{ activityTitle }}</base-text
      >
      <div v-else class="activity-title-custom-input">
        <input
          v-model="activityTitle"
          data-cy="todo-title"
          @blur="handleClickEditActivityName"
        />
      </div>
      <div
        role="button"
        class="ms-4"
        data-cy="todo-title-edit-button"
        @click="handleClickEditActivityName"
      >
        <base-text _as="h6" color="#A4A4A4"
          ><i class="bi bi-pencil"></i
        ></base-text>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div class="me-3">
        <base-select
          name="filter-and-sort-activity"
          :options="filterAndSortOptions"
          :selected-option="selectedFilterOrSort"
          selector-type="icon"
          as-dropdown
          selector-content="bi bi-arrow-down-up"
          :handle-change-select="
            (text, value) => handleChangeSelectedFilterOrSort(text, value)
          "
          menu-cy="sort-parent"
          data-cy="todo-sort"
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
    :todos="filteredOrSortedTodos"
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
import { BaseButton, BaseSelect } from "@/components/molecules";
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
        filterOrSortTodos();
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
        isEditingActivityName.value = true;
      }
    };

    const filterAndSortOptions = [
      {
        text: "Terbaru",
        value: "terbaru",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-sort-down",
        },
        dataCy: "sort-latest",
      },
      {
        text: "Terlama",
        value: "terlama",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-sort-up-alt",
        },
        dataCy: "sort-oldest",
      },
      {
        text: "A-Z",
        value: "az",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-sort-alpha-down",
        },
        dataCy: "sort-az",
      },
      {
        text: "Z-A",
        value: "za",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-sort-alpha-down-alt",
        },
        dataCy: "sort-za",
      },
      {
        text: "Belum Selesai",
        value: "belum-selesai",
        icon: {
          color: "#16ABF8",
          icon: "bi bi-arrow-down-up",
        },
        dataCy: "sort-unfinished",
      },
    ];
    const filteredOrSortedTodos = ref([]);
    const selectedFilterOrSort = ref({
      text: "Terbaru",
      value: "terbaru",
    });
    const handleChangeSelectedFilterOrSort = (text, value) => {
      selectedFilterOrSort.value = { text, value };
      filterOrSortTodos();
    };
    const filterOrSortTodos = () => {
      const spreadNewVal = [...todos.value];
      switch (selectedFilterOrSort.value.value) {
        case "terbaru":
          spreadNewVal.sort((a, b) => b.id - a.id);
          filteredOrSortedTodos.value = spreadNewVal;
          break;
        case "terlama":
          spreadNewVal.sort((a, b) => a.id - b.id);
          filteredOrSortedTodos.value = spreadNewVal;
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
          filteredOrSortedTodos.value = spreadNewVal;
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
          filteredOrSortedTodos.value = spreadNewVal;
          break;
        case "belum-selesai":
          filteredOrSortedTodos.value = spreadNewVal.filter(
            (el) => el.is_active
          );
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
      filterAndSortOptions,
      filteredOrSortedTodos,
      selectedFilterOrSort,
      handleChangeSelectedFilterOrSort,
    };
  },
};
</script>

<style scoped>
.activity-title-custom-input input {
  /* H4 font size */
  font-size: 2.25rem !important;
  line-height: 3.375rem !important;
  font-weight: 700;
  border: none;
  border-bottom: 1px solid #d8d8d8;
}
.activity-title-custom-input input:focus {
  outline: none;
}
</style>
