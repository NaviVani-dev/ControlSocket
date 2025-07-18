export type GamepadButtons =
  | "a"
  | "b"
  | "x"
  | "y"
  | "start"
  | "select"
  | "home"
  | "l1"
  | "r1"
  | "lthumb"
  | "rthumb";

export type GamepadDpad =
  | "dpad_up"
  | "dpad_upleft"
  | "dpad_upright"
  | "dpad_down"
  | "dpad_downleft"
  | "dpad_downright"
  | "dpad_left"
  | "dpad_right";

export type GamepadTriggers = "l2" | "r2";
export type GamepadJoysticks = "lstick" | "rstick";

export type GamepadInputs =
  | GamepadButtons
  | GamepadDpad
  | GamepadTriggers
  | GamepadJoysticks;

export interface GamepadData {
  type: "input";
  input: GamepadInputs;
  value?: number | [number, number];
}

export type GamepadSVG = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
  }
>;

export interface GamepadIcons {
  ControllerIcon: GamepadSVG;
  Dpad: GamepadSVG;
  DpadUp: GamepadSVG;
  DpadDown: GamepadSVG;
  DpadLeft: GamepadSVG;
  DpadRight: GamepadSVG;
  A: GamepadSVG;
  APressed: GamepadSVG;
  B: GamepadSVG;
  BPressed: GamepadSVG;
  X: GamepadSVG;
  XPressed: GamepadSVG;
  Y: GamepadSVG;
  YPressed: GamepadSVG;
  L1: GamepadSVG;
  L1Pressed: GamepadSVG;
  R1: GamepadSVG;
  R1Pressed: GamepadSVG;
  L2: GamepadSVG;
  L2Pressed: GamepadSVG;
  R2: GamepadSVG;
  R2Pressed: GamepadSVG;
  Start: GamepadSVG;
  StartPressed: GamepadSVG;
  Select: GamepadSVG;
  SelectPressed: GamepadSVG;
  Home: GamepadSVG;
  HomePressed: GamepadSVG;
  LThumb: GamepadSVG;
  LThumbPressed: GamepadSVG;
  RThumb: GamepadSVG;
  RThumbPressed: GamepadSVG;
}
