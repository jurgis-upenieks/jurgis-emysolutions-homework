<template>
  <v-dialog
    max-width="500"
    :model-value="form.isOpen"
    persistent
    @update:model-value="store.closeForm()"
  >
    <v-card>
      <v-form ref="formRef" class="d-flex flex-column" @submit.prevent="handleSubmit">
        <v-card-title class="px-6 pt-6">{{ form.title }}</v-card-title>
        <v-card-text class="px-6 d-flex flex-column ga-4">
          <component
            :is="fieldComponent[field.type]"
            v-for="field in form.fields"
            :key="field.key"
            v-model="form.data[field.key]"
            v-bind="fieldProps(field)"
          />
        </v-card-text>
        <v-card-actions class="px-6 pb-6 ga-2">
          <v-spacer />
          <v-btn type="button" variant="text" @click="store.closeForm()">Cancel</v-btn>
          <v-btn color="primary" type="submit" variant="elevated">
            {{ form.submitText }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { VSelect, VTextarea, VTextField } from 'vuetify/components'
  import { type FormField, useDialogsStore } from '@/stores/dialogs'

  const store = useDialogsStore()
  const form = computed(() => store.form)

  const formRef = ref<{ validate: () => Promise<{ valid: boolean }> } | null>(null)
  const requiredRule = (v: string) => !!v?.trim() || 'This field is required'
  const requiredRules = [requiredRule]

  const fieldComponent = {
    text: VTextField,
    textarea: VTextarea,
    select: VSelect,
  } as const satisfies Record<FormField['type'], unknown>

  function fieldProps (field: FormField) {
    const base = {
      autofocus: field.autofocus,
      label: field.label,
      rules: field.required ? requiredRules : undefined,
      variant: 'outlined' as const,
    }

    if (field.type === 'textarea') return { ...base, rows: field.rows ?? 3 }
    if (field.type === 'select') return { ...base, items: field.options ?? [] }
    return base
  }

  async function handleSubmit () {
    const validation = await formRef.value?.validate()
    if (!validation?.valid) return

    const trimmed = Object.fromEntries(
      Object.entries(form.value.data).map(([key, value]) => [key, value.trim()]),
    ) as Record<string, string>

    form.value.onSubmit?.(trimmed)
    store.closeForm()
  }
</script>
