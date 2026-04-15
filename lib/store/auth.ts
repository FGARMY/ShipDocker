"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  refreshToken: string | null;
  customer: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null;
  isAuthenticated: boolean;

  login: (token: string, refreshToken: string, customer: AuthStore["customer"]) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      customer: null,
      isAuthenticated: false,

      login: (token, refreshToken, customer) =>
        set({ token, refreshToken, customer, isAuthenticated: true }),

      logout: () =>
        set({ token: null, refreshToken: null, customer: null, isAuthenticated: false }),

      setToken: (token) => set({ token }),
    }),
    { name: "smdrop-auth" }
  )
);
