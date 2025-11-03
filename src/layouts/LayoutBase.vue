<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-img src="./logo.png" width="4rem" class="mx-auto py-2 my-2" />
      <v-list dense nav>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.to" link>
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="app-bar-container">
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
        class="d-lg-none"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-translate" variant="text" color="white" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" :value="i">
            <v-list-item-title @click="changeLanguage(item.value)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon color="white" @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/auth.store'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { clearAuth, isUser } = useAuth()
const { t, locale } = useI18n()

const drawer = ref(true)

const allMenuItems = computed(() => [
  { title: t('layout.home'), icon: 'mdi-home', to: '/home' },
  { title: t('layout.students'), icon: 'mdi-school', to: '/students' },
  { title: t('layout.users'), icon: 'mdi-account', to: '/users' },
])

const menuItems = computed(() => {
  if (isUser) {
    return allMenuItems.value.filter((item) => item.to !== '/users')
  }

  return allMenuItems.value
})

const items = [
  { title: 'Português', value: 'pt' },
  { title: 'Inglês', value: 'en' },
  { title: 'Espanhol', value: 'es' },
]

// --- Métodos (Methods) ---
function changeLanguage(lang: string) {
  locale.value = lang // muda o idioma
  localStorage.setItem('locale', lang)
}

function handleLogout() {
  clearAuth()
}
</script>

<style scoped lang="css">
.v-toolbar.app-bar-container {
  background: #020024;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 100%,
    rgba(0, 212, 255, 1) 35%
  );
}
</style>
