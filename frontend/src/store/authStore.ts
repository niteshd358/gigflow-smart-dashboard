// Zustand is a fast, scalable, and lightweight global state management library for React and Next.js
import { create } from "zustand";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    
    setAuth: ( user : User , token: string ) => void;

    logout: () => void;
}

const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const useAuthStore = create<AuthState>((set) => ({
        user: savedUser ? JSON.parse(savedUser) : null,
        token: savedToken,

        setAuth: (user, token) => {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            set({ user, token });
        },

        logout: () => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            set({ user: null, token: null });
        },
    })
);

export default useAuthStore;