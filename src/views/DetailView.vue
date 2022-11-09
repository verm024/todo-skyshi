<script setup>
import { TodoList } from "@/components/organism";
</script>

<template>
  <todo-list
    :todos="[
      {
        is_active: true,
        priority: 'very-high',
        created_at: '2022-11-09T09:08:28.182Z',
        updated_at: '2022-11-09T09:08:28.182Z',
        id: 4891,
        activity_group_id: 14342,
        title: 'item 5.4',
      },
      {
        is_active: true,
        priority: 'very-high',
        created_at: '2022-11-09T09:08:28.182Z',
        updated_at: '2022-11-09T09:08:28.182Z',
        id: 4892,
        activity_group_id: 14342,
        title: 'item 5.4',
      },
      {
        is_active: false,
        priority: 'very-low',
        created_at: '2022-11-09T09:08:28.182Z',
        updated_at: '2022-11-09T09:08:28.182Z',
        id: 4893,
        activity_group_id: 14342,
        title: 'item 5.4',
      },
    ]"
  />
</template>

<style scoped></style>
