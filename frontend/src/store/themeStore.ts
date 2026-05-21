import {create} from "zustand";

interface ThemeState {
    darkMode: boolean;
    toggleTheme: () => void;
}

const savedTheme = localStorage.getItem("theme");
const isDark = savedTheme === "dark";

const useThemeStore = create<ThemeState>((set) => ({
    darkMode: isDark,
    toggleTheme: () => set((state) => { 
        const newTheme = !state.darkMode;

        if(newTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        return {
            darkMode: newTheme,
        };
        
    }),
})) ;

// INITIAL LOAD

if(isDark) {
    document.documentElement.classList.add("dark");
}

export default useThemeStore;