<template>
  <v-sheet class="h-100 mx-auto" max-width="var(--v-container-max-width)">
    <v-sheet class="pa-4 d-flex flex-column ga-6">
      <TaskSearchFilters
        :search="search"
        :status-filter="statusFilter"
        :status-filter-items="statusFilterItems"
        @create="openTaskForm()"
        @update:search="search = $event"
        @update:status-filter="statusFilter = $event"
      />
      <v-sheet class="d-flex flex-wrap ga-4">
        <StatusColumn
          v-for="col in columns"
          :key="col.status"
          :dragged-task-id="drag.task?.id ?? null"
          :drop-target-task-id="drag.overStatus === col.status ? drag.targetTask?.id ?? null : null"
          :header-class="col.headerClass"
          :icon="col.icon"
          :is-drop-target="drag.overStatus === col.status"
          :tasks="store.getTasksByStatus(col.status, search)"
          :title="col.title"
          @delete-task="task => dialogs.openDelete(task.title, () => store.deleteTask(task.id))"
          @dragenter="drag.overStatus = col.status"
          @dragleave="drag.overStatus = null; drag.targetTask = null"
          @drop="store.reorderTask(drag.task!.id, drag.targetTask?.id ?? null, col.status); resetDrag()"
          @edit-task="openTaskForm"
          @task-dragend="resetDrag"
          @task-dragover="drag.targetTask = $event"
          @task-dragstart="drag.task = $event"
        />
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts" setup>
  import { useDialogsStore } from '@/stores/dialogs'
  import { type Task, type TaskStatus, useTasksStore } from '@/stores/tasks'

  const store = useTasksStore()
  const dialogs = useDialogsStore()
  const search = ref<string | null>('')
  const statusFilter = ref<TaskStatus | 'all'>('all')
  const drag = reactive({ task: null as Task | null, overStatus: null as TaskStatus | null, targetTask: null as Task | null })

  const board: { status: TaskStatus, title: string, icon: string, headerClass: string }[] = [
    { status: 'todo', title: 'Todo', icon: 'mdi-clipboard-list-outline', headerClass: 'bg-surface-variant' },
    { status: 'in-progress', title: 'In Progress', icon: 'mdi-progress-clock', headerClass: 'bg-info text-on-info' },
    { status: 'done', title: 'Done', icon: 'mdi-check-circle-outline', headerClass: 'bg-success text-on-success' },
  ]
  const statusOptions = board.map(b => ({ title: b.title, value: b.status }))
  const statusFilterItems = [{ title: 'All', value: 'all' as const }, ...statusOptions]
  const columns = computed(() => statusFilter.value === 'all' ? board : board.filter(c => c.status === statusFilter.value))

  function resetDrag () {
    Object.assign(drag, { task: null, overStatus: null, targetTask: null })
  }

  function openTaskForm (task?: Task) {
    const isEdit = !!task
    dialogs.openForm(
      isEdit ? 'Edit Task' : 'Create New Task',
      [
        { key: 'title', type: 'text', label: 'Title', required: true, autofocus: true },
        { key: 'description', type: 'textarea', label: 'Description (optional)', rows: 3 },
        { key: 'status', type: 'select', label: 'Status', options: statusOptions },
      ],
      data => isEdit
        ? store.updateTask(task.id, { title: data.title ?? '', description: data.description ?? '', status: data.status as TaskStatus })
        : store.createTask(data.title ?? '', data.description ?? '', (data.status || 'todo') as TaskStatus),
      { title: task?.title ?? '', description: task?.description ?? '', status: task?.status ?? 'todo' },
      isEdit ? 'Save' : 'Create',
    )
  }
</script>
