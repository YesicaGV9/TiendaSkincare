import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../mockdata/users';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      error: null,

      login: (email, password) => {
        const found = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (found) {
          const { password: _, ...safeUser } = found;
          set({ user: safeUser, error: null });
          return true;
        }
        set({ error: 'Correo o contraseña incorrectos' });
        return false;
      },

      register: (name, email, password) => {
        const exists = mockUsers.find((u) => u.email === email);
        if (exists) {
          set({ error: 'Este correo ya está registrado' });
          return false;
        }
        const newUser = { id: Date.now(), name, email };
        mockUsers.push({ ...newUser, password });
        set({ user: newUser, error: null });
        return true;
      },

      logout: () => set({ user: null, error: null }),
      clearError: () => set({ error: null }),
    }),
    { name: 'skincare-auth' }
  )
);
