<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="500px"
    persistent
  >
    <v-card class="pa-2">
      <v-card-title class="text-h5 d-flex align-center">
        <v-icon color="warning" class="mr-3">mdi-alert-circle-outline</v-icon>
        Confirmar Exclusão
      </v-card-title>

      <v-card-text>
        Você tem certeza que deseja excluir
        <strong v-if="props.name">"{{ props.name }}"</strong>? <br /><br />
        Esta ação não pode ser desfeita.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          variant="plain"
          @click="$emit('update:modelValue', false)"
          :disabled="isLoading"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="error"
          variant="tonal"
          @click="$emit('confirm')"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Excluir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  name?: string | null
  isLoading?: boolean
}>()

defineEmits(['update:modelValue', 'confirm'])
</script>
