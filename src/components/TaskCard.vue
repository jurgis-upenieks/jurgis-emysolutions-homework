<template>
  <v-card
    class="pa-4"
    draggable="true"
    variant="elevated"
    @dragend="emit('dragend')"
    @dragover.prevent="emit('dragover')"
    @dragstart="emit('dragstart')"
  >
    <v-card-title class="pa-0 text-subtitle-2">{{ task.title }}</v-card-title>
    <v-card-text v-if="task.description" class="pa-0 pt-2 text-body-2 text-medium-emphasis">
      {{ task.description }}
    </v-card-text>
    <v-card-actions class="pa-0 pt-2 ga-1 justify-end">
      <v-btn
        icon="mdi-pencil"
        size="small"
        variant="text"
        @click="emit('edit')"
      />
      <v-btn
        color="error"
        icon="mdi-delete"
        size="small"
        variant="text"
        @click="emit('delete')"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
  import type { Task } from '@/stores/tasks'

  defineProps<{ task: Task }>()

  const emit = defineEmits<{
    (e: 'dragstart' | 'dragend' | 'dragover' | 'edit' | 'delete'): void
  }>()
</script>
