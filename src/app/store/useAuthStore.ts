import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  userCode: string | null;
  setUserCode: (code?: string) => void;
  clearUser: () => void;
};

const defaultData = {
  userCode: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...defaultData,
      setUserCode: (code?: string) => set({ userCode: code }),
      clearUser: () => set(defaultData),
    }),
    {
      name: "code-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
