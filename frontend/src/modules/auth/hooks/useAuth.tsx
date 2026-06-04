/**
 * useAuth — auth Context + hook. JWT lives ONLY in memory here (never localStorage).
 *
 * SRP: holds the session state and exposes login/register/logout.
 * DIP: depends on IAuthService (injected, defaults to the concrete authService).
 * Pattern: Singleton (Context) + Observer (reactive state).
 * Security: on mount there is no session (page reload requires re-login — expected).
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import type { ReactNode } from 'react'
import type {
  IAuthService,
  AuthUser,
  LoginCredentials,
  RegisterData,
} from '../interfaces/IAuthService'
import { authService as defaultAuthService } from '../services/AuthService'
import { apiClient } from '../../../infrastructure/http/ApiClient'
import { socketClient } from '../../../infrastructure/websocket/SocketClient'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<{ message: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
  service?: IAuthService
}

export function AuthProvider({ children, service = defaultAuthService }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Wire ApiClient's forced-logout (refresh failure) to clear our state.
  useEffect(() => {
    apiClient.setForcedLogoutHandler(() => {
      setUser(null)
      setRefreshToken(null)
    })
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const { user: u, tokens } = await service.login(credentials)
      apiClient.setTokens(tokens.accessToken, tokens.refreshToken)
      socketClient.connect(tokens.accessToken)  // live notifications (Observer FE)
      setRefreshToken(tokens.refreshToken)
      setUser(u)
    } finally {
      setIsLoading(false)
    }
  }, [service])

  const register = useCallback((data: RegisterData) => service.register(data), [service])

  const logout = useCallback(async () => {
    try {
      if (refreshToken) await service.logout(refreshToken)
    } finally {
      apiClient.setTokens(null, null)
      socketClient.disconnect()
      setUser(null)
      setRefreshToken(null)
    }
  }, [service, refreshToken])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>.')
  return ctx
}
