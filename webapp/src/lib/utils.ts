import { XboxIcons } from "~/lib/icons/xboxIcons";
import { PS4Icons } from "~/lib/icons/ps4Icons";
import { SwitchIcons } from "~/lib/icons/switchIcons";
import { settingsStore } from "~/lib/store";
import type { GamepadIcons } from "~/lib/interfaces/gamepad";

export function getStyledIcons(): GamepadIcons {
  const style = settingsStore.getState().gamepadStyle;
  switch (style) {
    case "xbox":
      return XboxIcons;
    case "ps4":
      return PS4Icons;
    case "switch":
      return SwitchIcons;
    default:
      console.log("style not found, defaulting to the xbox style");
      return XboxIcons;
  }
}
