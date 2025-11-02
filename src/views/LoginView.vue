<template>
  <div class="login-container-base">
    <div class="image-logo-container">
      <v-img src="./dark.png" alt="MaisA Logo" width="18rem" />
    </div>
    <div class="card-container">
      <v-card variant="text">
        <v-img src="./teacher.svg" alt="MaisA Logo" height="6rem" class="mb-4" />
        <v-card-title class="text-h5 text-center text-wrap"> {{ t('login.title') }} </v-card-title>
        <v-card-subtitle class="text-center pb-4 text-wrap">
          {{ t('login.subtitle') }}
        </v-card-subtitle>
        <v-form ref="form" @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            :label="t('login.email')"
            type="email"
            variant="outlined"
            :rules="emailRules"
            required
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :label="t('login.password')"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            variant="outlined"
            :rules="passwordRules"
            required
            class="mb-2"
          ></v-text-field>

          <v-btn type="submit" color="primary" size="large" block :loading="isPending" class="mt-2">
            {{ t('login.button') }}
          </v-btn>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '@/services/auth/hooks/useLogin'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

type VForm = InstanceType<(typeof import('vuetify/components'))['VForm']>

const { mutate, isPending } = useLogin()
const { t } = useI18n()

// --- Estado (State) ---
const email = ref('admin@example.com')
const password = ref('hashed_password_here')
const showPassword = ref(false)
const form = ref<VForm | null>(null)

const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
]
const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 3 || 'Senha deve ter pelo menos 3 caracteres',
]

// --- Métodos (Methods) ---
const handleLogin = async () => {
  if (!form.value) return

  const { valid } = await form.value.validate()
  if (!valid) return

  mutate({
    email: email.value,
    password: password.value,
  })
}
</script>

<style scoped lang="css">
.login-container-base {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;

  width: 100dvw;
  height: 100dvh;
}

.image-logo-container {
  background: #020024;
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 100%,
    rgba(0, 212, 255, 1) 35%
  );
  width: 60%;
  display: flex;
  height: 100dvh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-container {
  width: 40%;
  padding: 4rem;
}

@media (max-width: 768px) {
  .login-container-base {
    flex-direction: column;
  }

  .image-logo-container {
    display: none;
  }

  .card-container {
    width: 100%;
    padding: 2rem;
  }
}
</style>
