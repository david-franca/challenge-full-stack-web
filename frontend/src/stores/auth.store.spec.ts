import { describe, it, expect, beforeEach, vi, afterEach, type Mock } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/services/auth/api/authService', () => ({
  setAuthHeader: vi.fn(),
}))
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}))

vi.mock('./messages.store', () => ({
  useMessages: vi.fn(),
}))
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

vi.mock('@/locales/i18n', () => ({
  i18n: {
    global: {
      t: (key: string) => key,
    },
  },
}))

import { useAuth } from './auth.store'
import { setAuthHeader } from '@/services/auth/api/authService'
import { useMessages } from './messages.store'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

const MOCK_ADMIN_TOKEN = 'token.admin.falso'
const MOCK_ADMIN_PAYLOAD = {
  sub: '1',
  name: 'Admin User',
  email: 'admin@test.com',
  role: 'admin',
  exp: Date.now() / 1000 + 3600,
  iat: Date.now() / 1000,
}

describe('Auth Store (auth.store.ts)', () => {
  let authStore: ReturnType<typeof useAuth>

  let mockRouterPush: Mock
  let mockAddMessage: Mock

  beforeEach(() => {
    setActivePinia(createPinia())

    vi.useFakeTimers()

    vi.clearAllMocks()
    ;(jwtDecode as Mock).mockReturnValue(MOCK_ADMIN_PAYLOAD)

    mockRouterPush = vi.fn()
    ;(useRouter as Mock).mockReturnValue({
      push: mockRouterPush,
    })

    mockAddMessage = vi.fn()
    ;(useMessages as unknown as Mock).mockReturnValue({
      addMessage: mockAddMessage,
    })

    authStore = useAuth()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should have correct initial state', () => {
    expect(authStore.token).toBe(null)
    expect(authStore.role).toBe(null)
    expect(authStore.isLoggedIn).toBe(false)
  })

  it('should set state correctly on setAuth', () => {
    authStore.setAuth(MOCK_ADMIN_TOKEN)

    expect(jwtDecode).toHaveBeenCalledWith(MOCK_ADMIN_TOKEN)
    expect(authStore.token).toBe(MOCK_ADMIN_TOKEN)
    expect(authStore.role).toBe('admin')
    expect(authStore.isAdmin).toBe(true)

    expect(setAuthHeader).toHaveBeenCalledWith(MOCK_ADMIN_TOKEN)
    expect(authStore.tokenTimer).not.toBe(null)
  })

  it('should clear state, timer, redirect, and show message on clearAuth', () => {
    authStore.setAuth(MOCK_ADMIN_TOKEN)
    vi.clearAllMocks()

    const logoutMsg = 'Sessão encerrada'
    authStore.clearAuth(logoutMsg)

    expect(authStore.token).toBe(null)
    expect(authStore.isLoggedIn).toBe(false)

    expect(mockRouterPush).toHaveBeenCalledWith('/login')
    expect(setAuthHeader).toHaveBeenCalledWith(null)
    expect(mockAddMessage).toHaveBeenCalledWith({
      text: logoutMsg,
      color: 'info',
      timeout: 5000,
    })
  })

  it('should trigger clearAuth automatically when token expires', () => {
    authStore.setAuth(MOCK_ADMIN_TOKEN)
    vi.clearAllMocks()

    vi.advanceTimersByTime(3600 * 1000 + 1000)

    expect(mockRouterPush).toHaveBeenCalledWith('/login')
    expect(setAuthHeader).toHaveBeenCalledWith(null)
    expect(mockAddMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'notifications.auth.sessionExpired',
      }),
    )
  })
})
