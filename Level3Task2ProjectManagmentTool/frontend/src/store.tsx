import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface userStore {
  user: any
  token: string
  login: (userData: any, token: String) => void
  logout: () => void
}

const useAuth = create<userStore>(
  persist(
    set => ({
      user: null,
      token: '',
      login: (userData, token) => set(() => ({ user: userData, token: token })),
      logout: () => set(() => ({ user: null, token: '' }))
    }),
    { name: 'auth', storage: createJSONStorage(() => sessionStorage) }
  )
)

export default useAuth
