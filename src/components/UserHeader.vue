<template>
  <v-card-title
    class="pa-4 d-flex flex-column flex-sm-row align-center justify-space-between flex-wrap"
  >
    <div
      class="order-1 d-flex flex-row align-center justify-space-between mb-2 mb-sm-0 w-100 w-sm-auto mr-sm-2"
    >
      <h2 class="text-h5">
        {{ t('userHeader.title') }}
      </h2>
      <v-btn
        v-if="isAdmin"
        size="small"
        @click="isDialogVisible = true"
        icon="mdi-plus"
        color="primary"
        class="d-flex d-sm-none d-md-none d-lg-none d-xl-none"
      ></v-btn>
    </div>
    <v-text-field
      v-model="search"
      append-inner-icon="mdi-magnify"
      density="compact"
      :label="t('userHeader.searchPlaceholder')"
      variant="solo"
      hide-details
      single-line
      @click:append-inner="onSearch"
      @keydown.enter="onSearch"
      class="flex-grow-1 w-100 ml-auto w-sm-auto mr-sm-4 mb-sm-2 order-3 order-sm-2"
      max-width="500px"
    ></v-text-field>
    <v-btn
      v-if="isAdmin"
      color="primary"
      class="text-none font-weight-regular w-100 w-sm-auto order-2 mb-2 order-sm-3 d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
      @click="isDialogVisible = true"
    >
      <v-icon icon="mdi-plus"></v-icon>
      <span class="ml-2 d-sm-none d-md-block d-lg-block d-xl-block">{{
        t('userHeader.registerUser')
      }}</span>
    </v-btn>
    <UserFormDialog v-model="isDialogVisible" :user="null" />
  </v-card-title>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import UserFormDialog from './UserFormDialog.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { isAdmin } = useAuth()
const router = useRouter()
const route = useRoute()
const isDialogVisible = ref(false)
const search = ref(route.query.search || '')

function updateRouteSearch(value: string) {
  const query = { ...route.query }
  if (value) {
    query.search = value
  } else {
    delete query.search
  }
  router.replace({ query })
}

function onSearch() {
  if (!search.value) return
  if (typeof search.value === 'string') {
    updateRouteSearch(search.value)
  } else {
    updateRouteSearch('')
    search.value = ''
  }
}

watch(search, (value) => {
  if (!value) updateRouteSearch('')
})
</script>
