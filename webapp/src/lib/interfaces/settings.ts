export interface PageStore {
  connected: boolean;
  setConnected: (value: boolean) => void;
  connectionLost: boolean;
  setConnectionLost: (value: boolean) => void;
  acceptedOverlay: boolean;
  setAcceptedOverlay: (value: boolean) => void;
  settings: boolean;
  setSettings: (value: boolean) => void;
}

export type Gamepads = "xbox" | "ps4";
export type GamepadStyles = "xbox" | "ps4" | "switch";

export interface UserSettings {
  gamepadType: Gamepads;
  setGamepadType: (value: Gamepads) => void;
  gamepadStyle: GamepadStyles;
  setGamepadStyle: (value: GamepadStyles) => void;
}
