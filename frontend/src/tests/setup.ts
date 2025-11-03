import { setActivePinia, createPinia } from 'pinia'
import { beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// Antes de cada arquivo de teste, crie um novo Pinia
beforeEach(() => {
  setActivePinia(createPinia())
})

export { vuetify }
