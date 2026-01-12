<template>
  <v-container class="kanban-container" fluid>
    <v-row align="center" class="toolbar" no-gutters>
      <v-text-field
        v-model="search"
        class="search-field"
        clearable
        density="compact"
        hide-details
        label="Search tasks"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
      />
      <v-select
        v-model="statusFilter"
        class="status-filter"
        density="compact"
        hide-details
        :items="[{ title: 'All', value: 'all' }, ...statusOptions]"
        label="Filter by status"
        variant="outlined"
      />
      <v-spacer />
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="openTaskDialog()"
      >
        New Task
      </v-btn>
    </v-row>

    <v-row class="columns-row" no-gutters>
      <v-col
        v-for="col in columns"
        :key="col.status"
        class="column-wrapper"
      >
        <v-card
          class="column-card"
          :class="{ 'drag-over': dragOver === col.status }"
          variant="outlined"
          @dragenter.prevent="dragOver = draggedTask?.status !== col.status ? col.status : null"
          @dragleave="dragOver = null"
          @dragover.prevent
          @drop="dropTask(col.status)"
        >
          <v-card-title
            class="column-header"
            :style="{ backgroundColor: col.color }"
          >
            <v-icon :icon="col.icon" />
            <span>{{ col.title }}</span>
            <v-chip size="small" variant="tonal">
              {{ store.getTasksByStatus(col.status, search).length }}
            </v-chip>
          </v-card-title>

          <v-card-text class="column-content">
            <v-card
              v-for="task in store.getTasksByStatus(col.status, search)"
              :key="task.id"
              class="task-card"
              draggable="true"
              variant="elevated"
              @dragend="draggedTask = null; dragOver = null"
              @dragstart="draggedTask = task"
            >
              <v-card-title class="task-title">{{ task.title }}</v-card-title>
              <v-card-text v-if="task.description" class="task-description">
                {{ task.description }}
              </v-card-text>
              <v-card-actions class="task-actions">
                <v-btn
                  icon="mdi-pencil"
                  size="small"
                  variant="text"
                  @click="openTaskDialog(task)"
                />
                <v-btn
                  color="error"
                  icon="mdi-delete"
                  size="small"
                  variant="text"
                  @click="taskToDelete = task"
                />
              </v-card-actions>
            </v-card>

            <v-card
              v-if="store.getTasksByStatus(col.status, search).length === 0"
              class="empty-state"
              variant="tonal"
            >
              <v-icon icon="mdi-clipboard-text-outline" size="large" />
              <v-card-text class="empty-text">No tasks</v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="taskDialogOpen" max-width="500" persistent>
      <v-card>
        <v-card-title class="dialog-title">
          {{ editingTask ? 'Edit Task' : 'Create New Task' }}
        </v-card-title>
        <v-card-text class="dialog-content">
          <v-form ref="formRef" @submit.prevent="saveTask">
            <v-text-field
              v-model="form.title"
              autofocus
              label="Title"
              :rules="[v => !!v?.trim() || 'Title is required']"
              variant="outlined"
            />
            <v-textarea
              v-model="form.description"
              class="mt-4"
              label="Description (optional)"
              rows="3"
              variant="outlined"
            />
            <v-select
              v-model="form.status"
              class="mt-4"
              :items="statusOptions"
              label="Status"
              variant="outlined"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-spacer />
          <v-btn variant="text" @click="taskDialogOpen = false">Cancel</v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="saveTask"
          >
            {{ editingTask ? 'Save' : 'Create' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialogOpen" max-width="400" persistent>
      <v-card>
        <v-card-title class="dialog-title">Delete Task</v-card-title>
        <v-card-text class="dialog-content">
          Are you sure you want to delete "{{ taskToDelete?.title }}"? This action cannot be undone.
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-spacer />
          <v-btn variant="text" @click="taskToDelete = null">Cancel</v-btn>
          <v-btn
            color="error"
            variant="elevated"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
  import { type Task, type TaskStatus, useTasksStore } from '@/stores/tasks'

  const store = useTasksStore()

  const search = ref('')
  const statusFilter = ref<TaskStatus | 'all'>('all')
  const draggedTask = ref<Task | null>(null)
  const dragOver = ref<TaskStatus | null>(null)

  const taskDialogOpen = ref(false)
  const editingTask = ref<Task | null>(null)
  const formRef = ref<{ validate: () => Promise<{ valid: boolean }> } | null>(null)
  const form = ref({ title: '', description: '', status: 'todo' as TaskStatus })

  const taskToDelete = ref<Task | null>(null)
  const deleteDialogOpen = computed({
    get: () => !!taskToDelete.value,
    set: v => {
      if (!v) taskToDelete.value = null
    },
  })

  const columns = [
    { status: 'todo' as TaskStatus, title: 'Todo', icon: 'mdi-clipboard-list-outline', color: 'rgb(var(--v-theme-surface-variant))' },
    { status: 'in-progress' as TaskStatus, title: 'In Progress', icon: 'mdi-progress-clock', color: 'rgb(var(--v-theme-info))' },
    { status: 'done' as TaskStatus, title: 'Done', icon: 'mdi-check-circle-outline', color: 'rgb(var(--v-theme-success))' },
  ]

  const statusOptions = [
    { title: 'Todo', value: 'todo' },
    { title: 'In Progress', value: 'in-progress' },
    { title: 'Done', value: 'done' },
  ]

  function openTaskDialog (task?: Task) {
    editingTask.value = task ?? null
    form.value = task
      ? { title: task.title, description: task.description, status: task.status }
      : { title: '', description: '', status: 'todo' }
    taskDialogOpen.value = true
  }

  async function saveTask () {
    const validation = await formRef.value?.validate()
    if (!validation?.valid) return

    const { title, description, status } = form.value
    if (editingTask.value) {
      store.updateTask(editingTask.value.id, { title: title.trim(), description: description.trim(), status })
    } else {
      store.createTask(title.trim(), description.trim(), status)
    }
    taskDialogOpen.value = false
  }

  function dropTask (status: TaskStatus) {
    if (draggedTask.value && draggedTask.value.status !== status) {
      store.updateTask(draggedTask.value.id, { status })
    }
    draggedTask.value = null
    dragOver.value = null
  }

  function confirmDelete () {
    if (taskToDelete.value) store.deleteTask(taskToDelete.value.id)
    taskToDelete.value = null
  }
</script>

<style scoped>
.kanban-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: clamp(8px, min(2vw, 2vh), 24px);
}

.toolbar {
  gap: clamp(8px, min(2vw, 2vh), 16px);
  margin-bottom: clamp(12px, min(2vw, 2vh), 24px);
  flex-wrap: wrap;
}

.search-field {
  flex: 1 1 auto;
  min-width: clamp(150px, 30vw, 300px);
  max-width: clamp(200px, 40vw, 400px);
}

.status-filter {
  flex: 0 1 auto;
  min-width: clamp(120px, 20vw, 180px);
  max-width: clamp(150px, 25vw, 200px);
}

.columns-row {
  flex: 1;
  gap: clamp(8px, min(2vw, 2vh), 16px);
  overflow-x: auto;
}

.column-wrapper {
  flex: 1 1 0;
  min-width: clamp(250px, 25vw, 350px);
}

.column-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.column-card.drag-over {
  outline: 2px dashed rgb(var(--v-theme-primary));
  outline-offset: -2px;
}

.column-header {
  padding: clamp(8px, min(1.5vw, 1.5vh), 16px);
  display: flex;
  align-items: center;
  gap: clamp(4px, 1vw, 8px);
}

.column-content {
  flex: 1;
  overflow-y: auto;
  padding: clamp(8px, min(1.5vw, 1.5vh), 16px);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, min(1vw, 1vh), 12px);
}

.task-card {
  cursor: grab;
  padding: clamp(8px, min(1.5vw, 1.5vh), 16px);
}

.task-title {
  padding: 0;
  font-size: clamp(0.875rem, min(2vw, 2vh), 1rem);
  line-height: 1.4;
}

.task-description {
  padding: clamp(4px, min(0.5vw, 0.5vh), 8px) 0 0 0;
  font-size: clamp(0.75rem, min(1.5vw, 1.5vh), 0.875rem);
  opacity: 0.7;
}

.task-actions {
  padding: clamp(8px, min(1vw, 1vh), 12px) 0 0 0;
  gap: clamp(4px, min(0.5vw, 0.5vh), 8px);
}

.empty-state {
  padding: clamp(16px, min(3vw, 3vh), 32px);
  text-align: center;
  opacity: 0.6;
}

.empty-text {
  padding: clamp(8px, min(1vw, 1vh), 12px) 0 0 0;
}

.dialog-title {
  padding: clamp(12px, min(2vw, 2vh), 20px);
}

.dialog-content {
  padding: clamp(12px, min(2vw, 2vh), 20px);
}

.dialog-actions {
  padding: clamp(12px, min(2vw, 2vh), 20px);
  gap: clamp(8px, min(1vw, 1vh), 12px);
}
</style>
