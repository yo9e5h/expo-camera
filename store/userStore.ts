import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type User = {
  name: string;
  email: string;
};

type UserState = {
  user: User | undefined;
  setUser: (user: User) => void;
  clear: () => void;
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,

      setUser: (user: User) => {
        set({ user });
      },

      clear: async () => {
        set(() => ({
          user: undefined,
        }));
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
