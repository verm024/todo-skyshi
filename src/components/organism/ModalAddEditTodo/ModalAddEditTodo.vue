<template>
  <div
    id="modal-add-edit-todo"
    ref="modalAddEditTodo"
    class="modal fade"
    tabindex="-1"
    :data-cy="`modal-${mode}`"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <base-text
            class="modal-title"
            _as="h6"
            :font-weight="600"
            :data-cy="`modal-${mode}-title`"
            >{{ title }}</base-text
          >
          <button
            type="button"
            class="btn-close"
            :data-cy="`modal-${mode}-close-button`"
            @click="handleClose"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <labeled-input
              v-model="name"
              input-placeholder="Tambahkan nama list item"
              label="NAMA LIST ITEM"
              :input-cy="`modal-${mode}-name-input`"
              :label-cy="`modal-${mode}-name-title`"
            />
          </div>
          <div>
            <base-select
              name="add-edit-activity"
              :options="options"
              :selected-option="priority"
              label="PRIORITY"
              :parent-cy="`modal-${mode}-priority-dropdown`"
              :selected-cy="`modal-${mode}-priority-item`"
              :label-cy="`modal-${mode}-priority-title`"
              :handle-change-select="
                (text, value) => handleChangePriority(text, value)
              "
            ></base-select>
          </div>
        </div>
        <div class="modal-footer">
          <base-button
            variant="primary"
            :disabled="name === ''"
            :data-cy="`modal-${mode}-save-button`"
            @click="handleConfirm"
            >Simpan</base-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseText } from "@/components/atom";
import { BaseButton, BaseSelect, LabeledInput } from "@/components/molecules";
import {
  convertPriorityToColor,
  convertPriorityToText,
} from "@/utils/helperFunctions";

import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "ModalAddEditTodo",
  components: {
    BaseText,
    BaseButton,
    BaseSelect,
    LabeledInput,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => null,
    },
    onConfirm: {
      type: Function,
      default: () => null,
    },
    title: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: () => null,
    },
    mode: {
      type: String,
      default: "add",
      validator: (val) => ["add", "edit"].includes(val),
    },
  },
  setup(props) {
    const modalAddEditTodo = ref(null);
    let modal;
    onMounted(() => {
      modal = new Modal(modalAddEditTodo.value);
      modalAddEditTodo.value.addEventListener("hidden.bs.modal", handleClose);
    });
    watch(
      () => props.isOpen,
      (newIsOpen) => {
        if (newIsOpen) {
          modal.show();
        } else {
          modal.hide();
        }
      }
    );
    onBeforeUnmount(() => {
      modalAddEditTodo.value.addEventListener("hidden.bs.modal", handleClose);
    });

    const name = ref("");
    const options = [
      {
        text: convertPriorityToText("very-high"),
        value: "very-high",
        color: convertPriorityToColor("very-high"),
        dataCy: "modal-add-priority-item",
      },
      {
        text: convertPriorityToText("high"),
        value: "high",
        color: convertPriorityToColor("high"),
        dataCy: "modal-add-priority-item",
      },
      {
        text: convertPriorityToText("normal"),
        value: "normal",
        color: convertPriorityToColor("normal"),
        dataCy: "modal-add-priority-item",
      },
      {
        text: convertPriorityToText("low"),
        value: "low",
        color: convertPriorityToColor("low"),
        dataCy: "modal-add-priority-item",
      },
      {
        text: convertPriorityToText("very-low"),
        value: "very-low",
        color: convertPriorityToColor("very-low"),
        dataCy: "modal-add-priority-item",
      },
    ];
    const priority = ref({
      text: convertPriorityToText("very-high"),
      value: "very-high",
      color: convertPriorityToColor("very-high"),
    });
    const handleChangePriority = (text, value) => {
      priority.value = { text, value, color: convertPriorityToColor(value) };
    };

    const handleConfirm = async () => {
      await props.onConfirm(name.value, priority.value.value);
      name.value = "";
      priority.value = {
        text: convertPriorityToText("very-high"),
        value: "very-high",
        color: convertPriorityToColor("very-high"),
      };
    };
    const handleClose = () => {
      props.onClose();
      name.value = "";
      priority.value = {
        text: convertPriorityToText("very-high"),
        value: "very-high",
        color: convertPriorityToColor("very-high"),
      };
    };

    watch(
      () => props.data,
      (newVal) => {
        name.value = newVal?.title || "";
        priority.value = {
          text: convertPriorityToText(newVal?.priority || "very-high"),
          value: newVal?.priority || "very-high",
          color: convertPriorityToColor(newVal?.priority || "very-high"),
        };
      }
    );

    return {
      modalAddEditTodo,
      name,
      priority,
      options,
      handleChangePriority,
      handleConfirm,
      handleClose,
    };
  },
};
</script>

<style scoped>
.modal-dialog {
  max-width: 830px;
}
.modal-header,
.modal-body,
.modal-footer {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
