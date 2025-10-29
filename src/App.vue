<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title>CRUD de Alunos</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Nenhum script necessário para este layout básico
</script>
