<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card prepend-icon="mdi-school" :title="cardTitle">
      <v-card-text>
        <v-form v-model="isFormValid" ref="form">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                :label="t('userFormDialog.labels.name')"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="email"
                :label="t('userFormDialog.labels.email')"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="password"
                type="password"
                :label="
                  isEditing
                    ? t('userFormDialog.labels.newPassword')
                    : t('userFormDialog.labels.password')
                "
                :required="!isEditing"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <small class="text-caption text-medium-emphasis">{{
          t('userFormDialog.requiredFields')
        }}</small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          :text="t('userFormDialog.cancelButton')"
          variant="plain"
          @click="dialog = false"
        ></v-btn>

        <v-btn
          color="primary"
          :text="saveButtonText"
          variant="tonal"
          :loading="isCreating || isUpdating"
          :disabled="!isFormValid"
          @click="saveStudent"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useCreateUser } from '@/services/users/hooks/useCreateUser'
import { useUpdateUser } from '@/services/users/hooks/useUpdateUser'
import type { User } from '@/types'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: boolean
  user: User | null
}>()

const { t } = useI18n()
const emit = defineEmits(['update:modelValue'])

const { mutateAsync: createUser, isPending: isCreating } = useCreateUser()
const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser()

const isFormValid = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref<'admin' | 'user'>('user')

const dialog = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const isEditing = computed(() => !!props.user)

const cardTitle = computed(() =>
  isEditing.value ? t('userFormDialog.editTitle') : t('userFormDialog.createTitle'),
)
const saveButtonText = computed(() =>
  isEditing.value ? t('userFormDialog.updateButton') : t('userFormDialog.saveButton'),
)

const rules = {
  required: (value: string) => !!value || t('userFormDialog.rules.required'),
  email: (value: string) => /.+@.+\..+/.test(value) || t('userFormDialog.rules.email'),
}

function resetForm() {
  name.value = ''
  email.value = ''
  password.value = ''
  role.value = 'user'
  isFormValid.value = false
}

async function saveStudent() {
  if (!isFormValid.value) return

  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
  }

  if (isEditing.value && props.user) {
    await updateUser({
      id: props.user.id,
      payload: {
        email: payload.email,
        name: payload.name,
        password: payload.password,
        role: payload.role,
      },
    })
  } else {
    await createUser(payload)
  }
  dialog.value = false
}

watch(
  () => props.modelValue,
  (isVisible) => {
    // Se o diálogo não estiver visível, não faz nada.
    if (!isVisible) return

    // Se um aluno foi passado, preenche o formulário (modo de edição).
    if (props.user) {
      const newUser = props.user
      name.value = newUser.name
      email.value = newUser.email
      role.value = newUser.role
      password.value = ''
    } else {
      // Se nenhum aluno foi passado, limpa o formulário (modo de criação).
      resetForm()
    }
  },
)
</script>

<style scoped></style>
