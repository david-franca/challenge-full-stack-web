import { createI18n } from 'vue-i18n'
import { pt } from './pt'
import { en } from './en'
import { es } from './es'

const lang = localStorage.getItem('locale') || 'pt'

export const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: 'en',
  messages: {
    pt,
    en,
    es,
  },
})
