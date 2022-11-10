<template>
  <div class="main-card card d-flex justify-content-between flex-column">
    <div
      class="card-title"
      role="button"
      data-cy="activity-item"
      @click="onTitleClick"
    >
      <base-text _as="h6" :font-weight="700" data-cy="activity-item-title">{{
        title
      }}</base-text>
    </div>
    <div class="card-text d-flex justify-content-between align-items-center">
      <base-text
        _as="b2"
        color="#888888"
        :font-weight="500"
        data-cy="activity-item-date"
        >{{ formattedDate }}</base-text
      >
      <div
        role="button"
        @click="onDelete"
        data-cy="activity-item-delete-button"
      >
        <base-text _as="h5" color="#888888"
          ><i class="bi bi-trash3"></i
        ></base-text>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { BaseText } from "@/components/atom";
import { formatDate } from "@/utils/helperFunctions";

export default {
  name: "ActivityCard",
  components: {
    BaseText,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: null,
      validator: (val) => {
        const d = new Date(val);
        return d.getTime().toString() !== "NaN";
      },
    },
    onTitleClick: {
      type: Function,
      default: () => null,
    },
    onDelete: {
      type: Function,
      default: () => null,
    },
  },
  setup(props) {
    const formattedDate = computed(() => formatDate(new Date(props.date)));
    return {
      formattedDate,
    };
  },
};
</script>

<style scoped>
.main-card {
  width: 235px;
  height: 234px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 22px 27px;
}
</style>
