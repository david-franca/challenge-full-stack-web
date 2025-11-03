import { computed, ref } from 'vue'
import { describe, it, expect, beforeEach, vi, type Mock, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createI18n } from 'vue-i18n'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

vi.mock('@/stores/auth.store', () => ({
  useAuth: vi.fn(),
}))
vi.mock('vue-router', () => ({
  useRoute: () => ({ query: {} }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}))

const mockStudents = [{ id: '1', name: 'Aluno Teste', ra: '123', cpf: '123', email: 'a@a.com' }]
vi.mock('@/services/students/hooks/useGetAllStudents', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ref } = require('vue')
  return {
    useGetAllStudents: vi.fn(() => ({
      data: ref({ items: mockStudents, meta: { totalItems: 1 } }),
      isLoading: ref(false),
      isSuccess: ref(true),
    })),
  }
})
vi.mock('@/services/students/hooks/useRemoveStudent', () => ({
  useRemoveStudent: () => ({
    mutateAsync: vi.fn(),
    isPending: { value: false },
  }),
}))
vi.mock('@/stores/messages.store', () => ({
  useMessages: () => ({ addMessage: vi.fn() }),
}))

import StudentListView from './StudentList.vue'
import { useAuth } from '@/stores/auth.store'

const vuetify = createVuetify({ components, directives })

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: {
    pt: {
      studentList: {
        loading: 'Carregando...',
        noData: 'Sem dados',
        editStudent: 'Editar Aluno',
        deleteStudent: 'Excluir Aluno',
        headers: {
          ra: 'RA',
          name: 'Nome',
          email: 'Email',
          cpf: 'CPF',
          actions: 'Ações',
        },
      },
      studentHeader: {
        title: 'Consulta de Alunos',
        searchPlaceholder: 'Digite sua busca...',
        registerStudent: 'Cadastrar Aluno',
      },
    },
  },
})

describe('StudentListView RBAC', () => {
  let wrapper: VueWrapper<unknown>

  const mountComponent = () => {
    setActivePinia(createPinia())
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })

    return mount(StudentListView, {
      global: {
        plugins: [vuetify, i18n, [VueQueryPlugin, { queryClient }]],
        stubs: {
          VDataTableServer: {
            template: `
              <div>
                <div v-for="item in items" :key="item.ra">
                  <slot name="item.actions" :item="item" />
                </div>
              </div>`,
            props: ['headers', 'items', 'itemsLength'],
          },

          StudentHeader: { template: '<div>Student Header Stub</div>' },
          StudentFormDialog: { template: '<div>StudentForm</div>' },
          ConfirmDeleteDialog: { template: '<div>ConfirmDeleteDialog</div>' },
          VSkeletonLoader: { template: '<div>Loading...</div>' },
        },
      },
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should NOT show delete icon for non-admin user', async () => {
    ;(useAuth as unknown as Mock).mockReturnValue({
      isAdmin: ref(false),
    })

    wrapper = mountComponent()
    await wrapper.vm.$nextTick()

    const deleteIcon = wrapper.find('v-icon[small]:contains("mdi-delete")')
    expect(deleteIcon.exists()).toBe(false)
  })

  it('should show delete icon for admin user', async () => {
    ;(useAuth as unknown as Mock).mockReturnValue({
      isAdmin: computed(() => true),
    })

    wrapper = mountComponent()
    await wrapper.vm.$nextTick()

    const deleteTooltip = wrapper.findComponent({
      name: 'v-tooltip',
      props: { text: 'Excluir Aluno' },
    })
    expect(deleteTooltip.exists()).toBe(true)
  })
})
