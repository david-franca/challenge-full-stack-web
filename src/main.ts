import './assets/main.css'
import 'unfonts.css'

import { createApp } from 'vue'

import App from './App.vue'
import { registerPlugins } from './plugins'
import router from './router'
import { useAuth } from './stores/auth.store'
import { setAuthHeader } from './services/auth/api/authService'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  const { isLoggedIn, token } = useAuth()

  if (token) {
    setAuthHeader(token)
  }

  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !isLoggedIn) {
    return next('/login')
  }

  if (!authRequired && isLoggedIn) {
    return next('/students')
  }

  next()
})

registerPlugins(app)

app.mount('#app')
