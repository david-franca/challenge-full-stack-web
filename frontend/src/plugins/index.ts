import type { App } from 'vue'
import vuetify from './vuetify'
import router from '@/router'
import pinia from '@/stores'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { i18n } from '@/locales/i18n'

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia).use(VueQueryPlugin).use(i18n)
}
