<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card prepend-icon="mdi-school" :title="cardTitle">
      <v-card-text>
        <v-form v-model="isFormValid" ref="form">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                :label="t('studentFormDialog.labels.name')"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="email"
                :label="t('studentFormDialog.labels.email')"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="ra"
                :disabled="isEditing"
                :label="t('studentFormDialog.labels.ra')"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="maskedCpf"
                :disabled="isEditing"
                :label="t('studentFormDialog.labels.cpf')"
                required
                placeholder="000.000.000-00"
                :rules="[rules.required, rules.cpfLength, rules.cpfValid]"
                maxlength="14"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <small class="text-caption text-medium-emphasis">{{
          t('studentFormDialog.requiredFields')
        }}</small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          :text="t('studentFormDialog.cancelButton')"
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
import { useCreateStudent } from '@/services/students/hooks/useCreateStudent'
import { useUpdateStudent } from '@/services/students/hooks/useUpdateStudent'
import type { Student } from '@/types/Student'
import { validateCPF } from '@/utils'
import { computed, ref, watch, type Ref } from 'vue'
import { useMask } from 'vuetify'

const props = defineProps<{
  modelValue: boolean
  student: Student | null // O aluno a ser editado (ou null para criar)
}>()

const emit = defineEmits(['update:modelValue'])

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { mutateAsync: createStudent, isPending: isCreating } = useCreateStudent()
const { mutateAsync: updateStudent, isPending: isUpdating } = useUpdateStudent()

const isFormValid = ref(false)
const name = ref('')
const email = ref('')
const ra = ref('')
const cpf = ref('')
const { mask, unmask } = useMask({
  mask: '###.###.###-##',
})

const dialog = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const isEditing = computed(() => !!props.student)

const cardTitle = computed(() =>
  isEditing.value ? t('studentFormDialog.editTitle') : t('studentFormDialog.createTitle'),
)
const saveButtonText = computed(() =>
  isEditing.value ? t('studentFormDialog.updateButton') : t('studentFormDialog.saveButton'),
)

const rules = {
  required: (value: string) => !!value || t('studentFormDialog.rules.required'),
  email: (value: string) => /.+@.+\..+/.test(value) || t('studentFormDialog.rules.email'),
  cpfLength: (value: string) =>
    (value && value.length === 14) || t('studentFormDialog.rules.cpfLength'),
  cpfValid: (value: string) => validateCPF(value) || t('studentFormDialog.rules.cpfValid'),
}

const maskedCpf: Ref<string> = ref('')

function resetForm() {
  name.value = ''
  email.value = ''
  ra.value = ''
  cpf.value = ''
  maskedCpf.value = ''
  isFormValid.value = false
}

async function saveStudent() {
  if (!isFormValid.value) return

  const payload = {
    name: name.value,
    email: email.value,
    ra: ra.value,
    cpf: cpf.value,
  }

  if (isEditing.value && props.student) {
    await updateStudent({
      ra: payload.ra,
      payload: {
        email: payload.email,
        name: payload.name,
      },
    })
  } else {
    await createStudent(payload)
  }
  dialog.value = false
}

watch(maskedCpf, (newValue) => {
  // Aplica a máscara e atualiza o valor bruto (sem máscara)
  const unmaskedValue = unmask(newValue ?? '') ?? ''
  cpf.value = unmaskedValue
  const maskedValue = mask(unmaskedValue)
  if (maskedCpf.value !== maskedValue) {
    maskedCpf.value = maskedValue
  }
})

watch(
  () => props.modelValue,
  (isVisible) => {
    // Se o diálogo não estiver visível, não faz nada.
    if (!isVisible) return

    // Se um aluno foi passado, preenche o formulário (modo de edição).
    if (props.student) {
      const newStudent = props.student
      name.value = newStudent.name
      email.value = newStudent.email
      ra.value = newStudent.ra
      cpf.value = newStudent.cpf
      maskedCpf.value = mask(newStudent.cpf)
    } else {
      // Se nenhum aluno foi passado, limpa o formulário (modo de criação).
      resetForm()
    }
  },
)
</script>

<style scoped></style>
