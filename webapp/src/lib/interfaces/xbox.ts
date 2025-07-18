export type XboxButtons =
  | "XUSB_GAMEPAD_A"
  | "XUSB_GAMEPAD_B"
  | "XUSB_GAMEPAD_X"
  | "XUSB_GAMEPAD_Y"
  | "XUSB_GAMEPAD_START"
  | "XUSB_GAMEPAD_BACK"
  | "XUSB_GAMEPAD_GUIDE"
  | "XUSB_GAMEPAD_LEFT_THUMB"
  | "XUSB_GAMEPAD_RIGHT_THUMB"
  | "XUSB_GAMEPAD_LEFT_SHOULDER"
  | "XUSB_GAMEPAD_RIGHT_SHOULDER";

export type XboxDpad =
  | "XUSB_GAMEPAD_DPAD_UP"
  | "XUSB_GAMEPAD_DPAD_DOWN"
  | "XUSB_GAMEPAD_DPAD_LEFT"
  | "XUSB_GAMEPAD_DPAD_RIGHT";

export type XboxTriggers = "TRIGGER_LEFT" | "TRIGGER_RIGHT";

export type XboxJoysticks = "JOYSTICK_LEFT" | "JOYSTICK_RIGHT";

export type XboxInputs = XboxButtons | XboxDpad | XboxTriggers | XboxJoysticks;

export interface XboxControllerData {
  input: XboxInputs;
  value: number | [number, number];
}
