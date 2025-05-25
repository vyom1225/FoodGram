import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User | null, token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user, token) => set({ user, token, isAuthenticated: !!user && !!token }),
      logout: () => {
        // Clear the state
        set({ user: null, token: null, isAuthenticated: false })
        // Clear the persisted state from localStorage
        localStorage.removeItem('auth-storage')
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage
    }
  )
) 