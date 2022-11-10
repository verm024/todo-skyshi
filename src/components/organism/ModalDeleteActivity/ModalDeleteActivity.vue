<template>
  <div
    id="modal-delete-activity"
    ref="modalDeleteActivity"
    class="modal fade"
    tabindex="-1"
    data-bs-backdrop="static"
    data-cy="modal-delete"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content pb-4 pt-4">
        <div class="modal-body">
          <div class="text-center icon-wrapper">
            <base-text _as="h4" color="#ED4C5C" data-cy="modal-delete-icon">
              <i class="bi bi-exclamation-triangle"></i
            ></base-text>
          </div>
          <div class="text-center mb-5 mt-4" data-cy="modal-delete-title">
            <base-text _as="h6" :font-weight="500"
              >Apakah anda yakin menghapus activity</base-text
            >
            <base-text _as="h6" :font-weight="700">"{{ title }}"?</base-text>
          </div>
          <div class="d-flex justify-content-center">
            <div class="me-3">
              <base-button
                variant="secondary"
                data-cy="modal-delete-cancel-button"
                @click="onClose"
                >Batal</base-button
              >
            </div>
            <div class="ms-3">
              <base-button
                variant="danger"
                data-cy="modal-delete-confirm-button"
                @click="onConfirm"
                >Hapus</base-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseText } from "@/components/atom";
import { BaseButton } from "@/components/molecules";

import { ref, watch, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "ModalDeleteActivity",
  components: {
    BaseText,
    BaseButton,
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
    const modalDeleteActivity = ref(null);
    let modal;
    onMounted(() => {
      modal = new Modal(modalDeleteActivity.value);
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
    return {
      modalDeleteActivity,
    };
  },
};
</script>

<style scoped>
.icon-wrapper i {
  font-size: 60px !important;
}
</style>
