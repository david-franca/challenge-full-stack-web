<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app permanent>
      <v-img src="./logo.png" width="4rem" class="mx-auto py-2 mb-2" />
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
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

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
import { ref } from 'vue'
import authService from '@/services/authService'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- Estado (State) ---

// Controla se o menu lateral está visível (importante para telas móveis)
// Iniciamos como 'true' para que ele seja visível em desktops por padrão.
const drawer = ref(true)

// Itens do menu de navegação
const menuItems = ref([
  { title: 'Alunos', icon: 'mdi-school', to: '/students' },
  { title: 'Usuários', icon: 'mdi-account', to: '/users' },
])

// --- Métodos (Methods) ---
function handleLogout() {
  try {
    authService.logout()
    router.push('/login')
  } catch (error) {
    console.error('Erro no logout:', error)
  }
}
</script>

<style scoped lang="css">
.app-bar-container {
  background: #020024;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 100%,
    rgba(0, 212, 255, 1) 35%
  );
}
</style>
