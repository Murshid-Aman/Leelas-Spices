import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserType } from '@/types';

interface AuthStore {
  user: UserType | null;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserType) => void;
  setAdminAuthenticated: (isAdmin: boolean) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdminAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      setAdminAuthenticated: (isAdmin) => set({ isAdminAuthenticated: isAdmin }),
      clearUser: () =>
        set({ user: null, isAuthenticated: false, isAdminAuthenticated: false, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'leelas-auth',
    }
  )
);
