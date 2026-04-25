import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [], // Simulated database

      // Register user
      register: (email, password, name) => {
        const users = get().users;
        const userExists = users.some((u) => u.email === email);

        if (userExists) {
          return { success: false, message: 'Email already registered' };
        }

        const newUser = {
          id: Date.now(),
          email,
          password,
          name,
          createdAt: new Date().toISOString(),
        };

        set({ users: [...users, newUser] });
        return { success: true, message: 'User registered successfully' };
      },

      // Login user
      login: (email, password) => {
        const users = get().users;
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
          return { success: false, message: 'Invalid email or password' };
        }

        const loggedInUser = { id: user.id, email: user.email, name: user.name };
        set({ user: loggedInUser, isAuthenticated: true });
        return { success: true, message: 'Login successful', user: loggedInUser };
      },

      // Logout user
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      // Update user profile
      updateProfile: (name) => {
        const user = get().user;
        if (user) {
          const updatedUser = { ...user, name };
          set({ user: updatedUser });
        }
      },

      // Check if email exists
      emailExists: (email) => {
        return get().users.some((u) => u.email === email);
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
