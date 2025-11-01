<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card>
    <StudentHeader />
    <v-card-text>
      <v-data-table-server
        mobile-breakpoint="md"
        :headers="headers"
        :items="data?.items"
        :loading="isLoading"
        :page="page"
        :items-per-page="itemsPerPage"
        :items-length="data?.meta.totalItems || 0"
        :sort-by="[{ key: field, order: order }]"
        loading-text="Carregando dados... Por favor, aguarde."
        no-data-text="Nenhum aluno encontrado."
        class="elevation-1"
        @update:options="updateOptions"
      >
        <template v-slot:item.cpf="{ value }">
          {{ formatCPF(value) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip location="top" text="Editar Aluno">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" small class="mr-2" @click="openEditModal(item)">
                mdi-pencil
              </v-icon>
            </template>
          </v-tooltip>

          <v-tooltip location="top" text="Excluir Aluno">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" small @click="openDeleteConfirm(item)"> mdi-delete </v-icon>
            </template>
          </v-tooltip>
        </template>
      </v-data-table-server>
    </v-card-text>
    <StudentFormDialog v-model="isDialogVisible" :student="selectedStudent" />
    <ConfirmDeleteDialog
      v-model="isDeleteDialogOpen"
      :student="selectedStudent"
      :is-loading="isPending"
      @confirm="handleDeleteConfirm"
    />
  </v-card>
</template>

<script setup lang="ts">
import StudentHeader from '@/components/StudentHeader.vue'
import { useGetAllStudents } from '@/services/students/hooks/useGetAllStudents'
import type { Student } from '@/types/Student'
import { formatCPF } from '@/utils/formatCPF'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { DataTableSortItem } from 'vuetify'
import StudentFormDialog from '@/components/StudentFormDialog.vue'
import { useRemoveStudent } from '@/services/students/hooks/useRemoveStudent'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue'

const route = useRoute()
const router = useRouter()
const search = computed(() => route.query.search?.toString() || '')
const page = ref(Number(route.query.page) || 1)
const field = ref(route.query.field?.toString() || 'name')
const order = ref<DataTableSortItem['order']>(
  (route.query.order?.toString() as DataTableSortItem['order']) || 'asc',
)
const itemsPerPage = ref(Number(route.query.limit) || 10)
const selectedStudent = ref<Student | null>(null)
const isDialogVisible = ref(false)
const isDeleteDialogOpen = ref(false)
const { data, isLoading } = useGetAllStudents({ search, limit: itemsPerPage, page, field, order })
const { mutateAsync, isPending } = useRemoveStudent()

const headers = ref([
  { title: 'RA', key: 'ra', align: 'start' as const },
  { title: 'Nome', key: 'name', align: 'start' as const },
  { title: 'Email', key: 'email', align: 'start' as const },
  { title: 'CPF', key: 'cpf', align: 'start' as const },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' as const },
])

interface Options {
  page: number
  itemsPerPage: number
  sortBy: { key: string; order: 'asc' | 'desc' }[] // Se precisar de ordenação no futuro
}

function updateOptions({ page: newPage, itemsPerPage: newItemsPerPage, sortBy }: Options) {
  router.push({
    query: {
      ...route.query,
      page: newPage,
      limit: newItemsPerPage,
      field: sortBy[0]?.key,
      order: sortBy[0]?.order,
    },
  })
}

// --- Métodos dos Modais (Serão implementados) ---
function openEditModal(student: Student) {
  console.log('🚀 ~ openEditModal ~ student:', student)
  selectedStudent.value = student
  isDialogVisible.value = true
}

function openDeleteConfirm(student: Student) {
  selectedStudent.value = student
  isDeleteDialogOpen.value = true
}

async function handleDeleteConfirm() {
  if (selectedStudent.value) {
    await mutateAsync(selectedStudent.value.ra)
    isDeleteDialogOpen.value = false
  }
}

// Observa a rota para atualizar as refs locais de paginação
watch(
  () => route.query,
  (newQuery) => {
    page.value = Number(newQuery.page) || 1
    itemsPerPage.value = Number(newQuery.limit) || 10
    field.value = newQuery.field?.toString() || 'name'
    order.value = (newQuery.order?.toString() as DataTableSortItem['order']) || 'asc'
  },
)
</script>

<style scoped>
/* Você pode adicionar estilos específicos aqui, se necessário */
</style>
