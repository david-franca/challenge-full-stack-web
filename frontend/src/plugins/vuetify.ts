// src/plugins/vuetify.ts

// Importa os estilos principais do Vuetify
import 'vuetify/styles'
import { useI18n } from 'vue-i18n'

import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { i18n } from '@/locales/i18n'

// Define o tema (opcional, mas bom para ter o modo escuro)
const lightTheme = {
  dark: false,
  colors: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
}

// Exporta a instância do Vuetify
export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
    },
  },
  icons: {
    defaultSet: 'mdi', // Define o conjunto de ícones padrão
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
})
