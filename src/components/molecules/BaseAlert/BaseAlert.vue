<template>
  <div
    ref="alert"
    class="modal fade"
    tabindex="-1"
    data-bs-backdrop="static"
    data-cy="modal-information"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body d-flex align-items-center">
          <base-text
            :color="iconColor"
            _as="btn"
            data-cy="modal-information-icon"
          >
            <i v-if="icon" :class="[icon, 'me-3']"></i>
          </base-text>
          <base-text
            _as="b2"
            :font-weight="500"
            data-cy="modal-information-title"
            >Activity berhasil dihapus</base-text
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseText } from "@/components/atom";

import { ref, watch, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "BaseAlert",
  components: {
    BaseText,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: "black",
    },
    text: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const alert = ref(null);
    let modal;
    onMounted(() => {
      modal = new Modal(alert.value);
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
      alert,
    };
  },
};
</script>

<style scoped></style>
