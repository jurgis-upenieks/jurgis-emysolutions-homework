import { defineStore } from 'pinia'
import { reactive } from 'vue'

export interface FormField {
  key: string
  type: 'text' | 'textarea' | 'select'
  label: string
  required?: boolean
  autofocus?: boolean
  rows?: number
  options?: { title: string, value: string }[]
}

export const useDialogsStore = defineStore('dialogs', () => {
  const confirm = reactive({
    isOpen: false,
    title: '',
    message: '',
    text: 'Confirm',
    color: 'primary',
    onConfirm: null as (() => void) | null,
  })

  const form = reactive({
    isOpen: false,
    title: '',
    fields: [] as FormField[],
    data: {} as Record<string, string>,
    submitText: 'Submit',
    onSubmit: null as ((data: Record<string, string>) => void) | null,
  })

  const openConfirm = (title: string, message: string, onConfirm: () => void, text = 'Confirm', color = 'primary') =>
    Object.assign(confirm, { isOpen: true, title, message, text, color, onConfirm })

  const closeConfirm = () => Object.assign(confirm, { isOpen: false, onConfirm: null })

  const openForm = (title: string, fields: FormField[], onSubmit: (data: Record<string, string>) => void, initialValues: Record<string, string> = {}, submitText = 'Submit') =>
    Object.assign(form, { isOpen: true, title, fields, data: Object.fromEntries(fields.map(f => [f.key, initialValues[f.key] ?? ''])), submitText, onSubmit })

  const closeForm = () => Object.assign(form, { isOpen: false, onSubmit: null })

  const openDelete = (itemName: string, onConfirm: () => void) =>
    openConfirm('Delete Task', `Are you sure you want to delete "${itemName}"? This action cannot be undone.`, onConfirm, 'Delete', 'error')

  return { confirm, form, openConfirm, closeConfirm, openForm, closeForm, openDelete }
})
