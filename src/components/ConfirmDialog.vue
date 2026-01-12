<template>
  <v-dialog max-width="400" :model-value="confirm.isOpen" persistent @update:model-value="store.closeConfirm()">
    <v-card>
      <v-card-title class="px-6 pt-6">{{ confirm.title }}</v-card-title>
      <v-card-text class="px-6">{{ confirm.message }}</v-card-text>
      <v-card-actions class="px-6 pb-6 ga-2">
        <v-spacer />
        <v-btn variant="text" @click="store.closeConfirm()">Cancel</v-btn>
        <v-btn :color="confirm.color" variant="elevated" @click="confirmAndClose">
          {{ confirm.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { useDialogsStore } from '@/stores/dialogs'

  const store = useDialogsStore()
  const confirm = computed(() => store.confirm)

  function confirmAndClose () {
    confirm.value.onConfirm?.()
    store.closeConfirm()
  }
</script>
