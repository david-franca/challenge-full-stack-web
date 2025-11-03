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
        {{ t('confirmDeleteDialog.title') }}
      </v-card-title>

      <v-card-text>
        <i18n-t v-if="props.name" keypath="confirmDeleteDialog.confirmationMessage" tag="span">
          <template #name>
            <strong>{{ props.name }}</strong>
          </template>
        </i18n-t>
        <span v-else>{{ t('confirmDeleteDialog.confirmationMessageGeneric') }}</span>
        <br /><br />
        {{ t('confirmDeleteDialog.irreversibleAction') }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :text="t('confirmDeleteDialog.cancelButton')"
          variant="plain"
          @click="$emit('update:modelValue', false)"
          :disabled="isLoading"
        ></v-btn>

        <v-btn
          color="error"
          variant="tonal"
          @click="$emit('confirm')"
          :loading="isLoading"
          :disabled="isLoading"
          :text="t('confirmDeleteDialog.deleteButton')"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  modelValue: boolean
  name?: string | null
  isLoading?: boolean
}>()

defineEmits(['update:modelValue', 'confirm'])
</script>
