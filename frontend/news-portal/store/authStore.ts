import { IUser } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

interface AuthActions {
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user: IUser | null) => {
        if (user?.email) {
          set({
            isAuthenticated: true,
            user,
          });
        } else {
          set({
            isAuthenticated: false,
            user: null,
          });
        }
      },
      clearUser: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    { name: "auth-token" }
  )
);
