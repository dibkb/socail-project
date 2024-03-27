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
const skeletonUser: User = {
  id: "",
  name: "",
  email: "",
  username: "",
  bio: "",
  profilePic: "",
  followingIds: [],
  followerIds: [],
};
export type UserState = {
  user: User | null;
};

export type UserActions = {
  setUser: (user: User) => void;
  addFollowing: (userid: string) => void;
  removeFollowing: (userid: string) => void;
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
        addFollowing: (userid: string) =>
          set((state) => {
            if (
              state.user &&
              state.user.followingIds &&
              state.user.followingIds.length > 0
            ) {
              return {
                ...state,
                user: {
                  ...skeletonUser,
                  ...state.user,
                  followingIds: [...state.user.followingIds, userid],
                },
              };
            }
            return {
              ...state,
              user: {
                ...skeletonUser,
                ...state.user,
                followingIds: [userid],
              },
            };
          }),
        removeFollowing: (userid: string) => {
          set((state) => {
            if (
              state.user &&
              state.user.followingIds &&
              state.user.followingIds.length > 0
            ) {
              return {
                ...state,
                user: {
                  ...skeletonUser,
                  ...state.user,
                  followingIds: [
                    ...state.user.followerIds.filter((id) => id !== userid),
                  ],
                },
              };
            }
            return {
              ...state,
            };
          });
        },
      }),
      {
        name: "user-profile",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
