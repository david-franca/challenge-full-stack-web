<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card>
    <UserHeader />
    <v-card-text>
      <v-skeleton-loader v-if="isLoading && !isSuccess" type="table-row@5"></v-skeleton-loader>

      <v-data-table-server
        v-else
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
        <template v-slot:item.role="{ value }">
          {{ value === 'admin' ? 'Administrador' : 'Professor' }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip location="top" text="Editar Usuário">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" small class="mr-2" @click="openEditModal(item)">
                mdi-pencil
              </v-icon>
            </template>
          </v-tooltip>

          <v-tooltip location="top" text="Excluir Usuário">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" small @click="openDeleteConfirm(item)"> mdi-delete </v-icon>
            </template>
          </v-tooltip>
        </template>
      </v-data-table-server>
    </v-card-text>
    <UserFormDialog v-model="isDialogVisible" :user="selectedUser" />
    <ConfirmDeleteDialog
      v-model="isDeleteDialogOpen"
      :name="selectedUser?.name"
      :is-loading="isPending"
      @confirm="handleDeleteConfirm"
    />
  </v-card>
</template>

<script setup lang="ts">
import UserFormDialog from '@/components/UserFormDialog.vue'
import UserHeader from '@/components/UserHeader.vue'
import { useGetAllUsers } from '@/services/users/hooks/useGetAllUsers'
import { useRemoveUser } from '@/services/users/hooks/useRemoveUser'
import type { User } from '@/types'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { DataTableSortItem } from 'vuetify'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue'

interface Options {
  page: number
  itemsPerPage: number
  sortBy: { key: string; order: 'asc' | 'desc' }[] // Se precisar de ordenação no futuro
}

const route = useRoute()
const router = useRouter()
const search = computed(() => route.query.search?.toString() || '')
const page = ref(Number(route.query.page) || 1)
const field = ref(route.query.field?.toString() || 'name')
const order = ref<DataTableSortItem['order']>(
  (route.query.order?.toString() as DataTableSortItem['order']) || 'asc',
)
const itemsPerPage = ref(Number(route.query.limit) || 10)
const selectedUser = ref<User | null>(null)
const isDialogVisible = ref(false)
const isDeleteDialogOpen = ref(false)
const { data, isLoading, isSuccess } = useGetAllUsers({
  search,
  limit: itemsPerPage,
  page,
  field,
  order,
})
const { mutateAsync, isPending } = useRemoveUser()

const headers = ref([
  { title: 'ID', key: 'id', align: 'start' as const },
  { title: 'Nome', key: 'name', align: 'start' as const },
  { title: 'Email', key: 'email', align: 'start' as const },
  { title: 'Cargo', key: 'role', align: 'start' as const },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' as const },
])

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

function openEditModal(user: User) {
  selectedUser.value = user
  isDialogVisible.value = true
}

function openDeleteConfirm(user: User) {
  selectedUser.value = user
  isDeleteDialogOpen.value = true
}

async function handleDeleteConfirm() {
  if (selectedUser.value) {
    await mutateAsync(selectedUser.value.id)
    isDeleteDialogOpen.value = false
  }
}

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

<style scoped></style>
