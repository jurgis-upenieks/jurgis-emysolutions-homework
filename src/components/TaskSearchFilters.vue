<template>
  <v-sheet class="d-flex flex-wrap align-center ga-4">
    <v-text-field
      class="flex-grow-1 min-w-sm"
      clearable
      density="compact"
      hide-details
      label="Search tasks"
      :model-value="search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      @update:model-value="emit('update:search', $event)"
    />
    <v-select
      class="flex-grow-1 min-w-xs"
      density="compact"
      hide-details
      :items="statusFilterItems"
      label="Filter by status"
      :model-value="statusFilter"
      variant="outlined"
      @update:model-value="emit('update:statusFilter', $event)"
    />
    <v-spacer />
    <v-btn
      color="primary"
      prepend-icon="mdi-plus"
      @click="emit('create')"
    >
      New Task
    </v-btn>
  </v-sheet>
</template>

<script lang="ts" setup>
  import type { TaskStatus } from '@/stores/tasks'

  defineProps<{
    search: string | null
    statusFilter: TaskStatus | 'all'
    statusFilterItems: { title: string, value: TaskStatus | 'all' }[]
  }>()

  const emit = defineEmits<{
    (e: 'update:search', value: string | null): void
    (e: 'update:statusFilter', value: TaskStatus | 'all'): void
    (e: 'create'): void
  }>()
</script>
