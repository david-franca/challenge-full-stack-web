<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card elevation="0" color="transparent">
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" md="5" class="d-flex align-center justify-center pa-6">
              <v-img src="/studying.svg" max-width="350" contain />
            </v-col>
            <v-col cols="12" md="5" class="d-flex flex-column justify-center pa-8">
              <h1 class="text-h4 font-weight-bold mb-3 text-primary">{{ t('homeView.title') }}</h1>
              <p class="text-body-1 mb-8">{{ t('homeView.subtitle') }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
