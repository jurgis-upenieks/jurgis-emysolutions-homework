<template>
  <v-app>
    <v-main>
      <KanbanBoardPage />
    </v-main>
    <ConfirmDialog />
    <FormDialog />
  </v-app>
</template>

<script lang="ts" setup>
  import ConfirmDialog from '@/components/ConfirmDialog.vue'
  import FormDialog from '@/components/FormDialog.vue'
  import KanbanBoardPage from '@/pages/KanbanBoardPage.vue'
</script>
