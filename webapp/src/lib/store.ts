import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PageStore, UserSettings } from "~/lib/interfaces/settings";

export const useStore = create<PageStore>()((set) => ({
  connected: false,
  setConnected: (value) => set({ connected: value }),
  connectionLost: false,
  setConnectionLost: (value) => set({ connectionLost: value }),
  acceptedOverlay: false,
  setAcceptedOverlay: (value) => set({ acceptedOverlay: value }),
  settings: false,
  setSettings: (value) => set({ settings: value }),
}));

export const settingsStore = create<UserSettings>()(
  persist(
    (set) => ({
      gamepadType: "xbox",
      setGamepadType: (value) => set({ gamepadType: value }),
      gamepadStyle: "xbox",
      setGamepadStyle: (value) => set({ gamepadStyle: value }),
    }),
    { name: "user-settings" }
  )
);
