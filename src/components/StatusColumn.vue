<template>
  <v-card
    :border="isDropTarget ? 'primary' : true"
    class="d-flex flex-column flex-grow-1 min-w-lg"
    :class="{ 'text-primary': isDropTarget }"
    variant="outlined"
    @dragenter.prevent="emit('dragenter')"
    @dragleave="emit('dragleave')"
    @dragover.prevent
    @drop="emit('drop')"
  >
    <v-toolbar class="ga-2 px-4" :class="headerClass" density="compact" flat>
      <v-icon :icon="icon" />
      <v-toolbar-title class="text-subtitle-2">{{ title }}</v-toolbar-title>
      <v-chip size="small" variant="tonal">{{ tasks.length }}</v-chip>
    </v-toolbar>

    <v-card-text class="d-flex flex-column ga-2 flex-grow-1 overflow-y-auto pa-4">
      <template v-for="task in tasks" :key="task.id">
        <v-sheet
          v-if="dropTargetTaskId === task.id && draggedTaskId !== task.id"
          class="bg-primary rounded"
          height="4"
        />
        <TaskCard
          :task="task"
          @delete="emit('delete-task', task)"
          @dragend="emit('task-dragend')"
          @dragover="emit('task-dragover', task)"
          @dragstart="emit('task-dragstart', task)"
          @edit="emit('edit-task', task)"
        />
      </template>

      <v-card v-if="tasks.length === 0" class="text-center opacity-60 pa-8" variant="tonal">
        <v-icon icon="mdi-clipboard-text-outline" size="large" />
        <v-card-text class="pt-3">No tasks</v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import type { Task } from '@/stores/tasks'

  defineProps<{
    title: string
    icon: string
    headerClass: string
    tasks: Task[]
    isDropTarget: boolean
    dropTargetTaskId: string | null
    draggedTaskId: string | null
  }>()

  const emit = defineEmits<{
    (e: 'dragenter' | 'dragleave' | 'drop' | 'task-dragend'): void
    (e: 'task-dragstart' | 'task-dragover' | 'edit-task' | 'delete-task', task: Task): void
  }>()
</script>
