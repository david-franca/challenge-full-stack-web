<template>
  <v-app>
    <router-view />
    <v-snackbar-queue
      location="right top"
      closable
      close-text="X"
      timeout="2000"
      v-model="messages.queue"
    ></v-snackbar-queue>
    <VueQueryDevtools />
  </v-app>
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useMessages } from './stores/messages.store'

const messages = useMessages()
</script>
