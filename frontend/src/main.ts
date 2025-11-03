import './assets/main.css'
import 'unfonts.css'

import { createApp } from 'vue'

import App from './App.vue'
import { registerPlugins } from './plugins'
import router from './router'
import { useAuth } from './stores/auth.store'
import { setAuthHeader } from './services/auth/api/authService'
import { useMessages } from './stores/messages.store'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  const { isLoggedIn, token, isUser } = useAuth()
  const { addMessage } = useMessages()

  if (token) {
    setAuthHeader(token)
  }

  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !isLoggedIn) {
    return next('/login')
  }

  if (to.path === '/users' && isUser) {
    addMessage({
      text: 'Usuário não autorizado',
      color: 'error',
    })
    return next('/home')
  }

  if (!authRequired && isLoggedIn) {
    return next('/home')
  }

  next()
})

registerPlugins(app)

app.mount('#app')
