import type { App } from 'vue'
import vuetify from './vuetify'
import router from '@/router'
import pinia from '@/stores'

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia)
}
