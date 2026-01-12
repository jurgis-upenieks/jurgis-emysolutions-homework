import { defineStore } from 'pinia'

export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'kanban-tasks'
const normalize = (text: string) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '')

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Task[],
  }),

  getters: {
    getTasksByStatus: state => (status: TaskStatus, search?: string | null): Task[] => {
      const tasks = state.tasks.filter(t => t.status === status)
      const query = (search ?? '').trim()
      if (!query) return tasks

      const tokens = query.split(/\s+/).map(normalize)
      return tasks.filter(task =>
        tokens.every(token => normalize(task.title).includes(token) || normalize(task.description).includes(token))
      )
    },
  },

  actions: {
    persist () {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks))
    },

    createTask (title: string, description = '', status: TaskStatus = 'todo'): Task {
      const now = new Date().toISOString()
      const task: Task = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, title, description, status, createdAt: now, updatedAt: now }
      this.tasks.push(task)
      this.persist()
      return task
    },

    updateTask (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>) {
      const task = this.tasks.find(t => t.id === id)
      if (!task) return
      Object.assign(task, updates, { updatedAt: new Date().toISOString() })
      this.persist()
    },

    deleteTask (id: string) {
      const index = this.tasks.findIndex(t => t.id === id)
      if (index === -1) return
      this.tasks.splice(index, 1)
      this.persist()
    },

    reorderTask (taskId: string, targetTaskId: string | null, status: TaskStatus) {
      const taskIndex = this.tasks.findIndex(t => t.id === taskId)
      if (taskIndex === -1) return

      const task = this.tasks[taskIndex]!
      this.tasks.splice(taskIndex, 1)
      Object.assign(task, { status, updatedAt: new Date().toISOString() })

      const insertAt = targetTaskId
        ? this.tasks.findIndex(t => t.id === targetTaskId)
        : this.tasks.map(t => t.status).lastIndexOf(status) + 1

      insertAt !== -1 ? this.tasks.splice(insertAt, 0, task) : this.tasks.push(task)
      this.persist()
    },
  },
})
