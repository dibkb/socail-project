// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  profilePic: string;
  followingIds: string[];
  followerIds: string[];
}
export type UserState = {
  user: User | null;
};

export type UserActions = {
  setUser: (user: User) => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (): UserState => {
  return { user: null };
};

export const defaultInitState: UserState = {
  user: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    persist(
      (set, get) => ({
        ...initState,
        setUser: (user) => set({ user }),
      }),
      {
        name: "user-profile",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
