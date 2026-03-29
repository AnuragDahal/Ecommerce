import {create} from "zustand";
import {persist} from "zustand/middleware";
import { authService } from "@/services/auth.service";

interface User {
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
    updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (email, password) => {
                const response = await authService.login({ email, password });
                set({
                    user: response.user,
                    token: response.token,
                    isAuthenticated: true,
                });
            },
            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },
            setUser: (user) => {
                set({ user, isAuthenticated: !!user });
            },
            updateUser: (userData) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                }));
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
                user: state.user,
            }),
        }
    )
);
