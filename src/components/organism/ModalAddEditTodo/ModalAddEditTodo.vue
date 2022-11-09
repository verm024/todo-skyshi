<template>
  <div
    id="modal-add-edit-todo"
    ref="modalAddEditTodo"
    class="modal fade"
    tabindex="-1"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <base-text class="modal-title" _as="h6" :font-weight="600">{{
            title
          }}</base-text>
          <button type="button" class="btn-close" @click="handleClose"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <labeled-input
              v-model="name"
              input-placeholder="Tambahkan nama list item"
              label="NAMA LIST ITEM"
            />
          </div>
          <div>
            <base-select
              name="add-edit-activity"
              :options="options"
              :selected-option="priority"
              label="PRIORITY"
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
import { convertPriorityToColor } from "@/utils/helperFunctions";

import { ref, watch, onMounted } from "vue";
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
  },
  setup(props) {
    const modalAddEditTodo = ref(null);
    let modal;
    onMounted(() => {
      modal = new Modal(modalAddEditTodo.value);
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

    const name = ref("");
    const options = [
      {
        text: "Very High",
        value: "very-high",
        color: convertPriorityToColor("very-high"),
      },
      {
        text: "High",
        value: "high",
        color: convertPriorityToColor("high"),
      },
      {
        text: "Normal",
        value: "normal",
        color: convertPriorityToColor("normal"),
      },
      {
        text: "Low",
        value: "low",
        color: convertPriorityToColor("low"),
      },
      {
        text: "Very Low",
        value: "very-low",
        color: convertPriorityToColor("very-low"),
      },
    ];
    const priority = ref({
      text: "Very High",
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
        text: "Very High",
        value: "very-high",
        color: convertPriorityToColor("very-high"),
      };
    };
    const handleClose = () => {
      props.onClose();
      name.value = "";
      priority.value = {
        text: "Very High",
        value: "very-high",
        color: convertPriorityToColor("very-high"),
      };
    };

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