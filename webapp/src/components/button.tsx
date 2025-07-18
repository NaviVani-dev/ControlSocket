import { usePress } from "@react-aria/interactions";
import { sendData } from "~/lib/socket";
import { getStyledIcons } from "~/lib/utils";
import { useRef } from "react";
import { useStore } from "~/lib/store";
import type { ButtonsPositions, ButtonsSize } from "~/lib/interfaces/overlay";
import type {
  GamepadButtons,
  GamepadTriggers,
} from "../lib/interfaces/gamepad";

export default function Button({
  button,
  size = { width: "92px", height: "92px" },
  position,
}: {
  button: GamepadButtons | GamepadTriggers;
  size?: ButtonsSize;
  position?: ButtonsPositions;
}) {
  const svgprops = { width: "100%", height: "100%" };
  const { setSettings } = useStore();
  const Icons = getStyledIcons();
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pressKey = () => {
    sendData({ input: button, value: 1 });

    if (button == "home") {
      holdTimeout.current = setTimeout(() => {
        setSettings(true);
      }, 5000);
    }
  };

  const releaseKey = () => {
    sendData({ input: button, value: 0 });
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };

  const { pressProps, isPressed } = usePress({
    onPressStart: pressKey,
    onPressEnd: releaseKey,
  });

  const Idle = {
    a: <Icons.A {...svgprops} />,
    b: <Icons.B {...svgprops} />,
    x: <Icons.X {...svgprops} />,
    y: <Icons.Y {...svgprops} />,
    start: <Icons.Start {...svgprops} />,
    select: <Icons.Select {...svgprops} />,
    home: <Icons.Home {...svgprops} />,
    lthumb: <Icons.LThumb {...svgprops} />,
    rthumb: <Icons.RThumb {...svgprops} />,
    l1: <Icons.L1 {...svgprops} />,
    r1: <Icons.R1 {...svgprops} />,
    l2: <Icons.L2 {...svgprops} />,
    r2: <Icons.R2 {...svgprops} />,
  };

  const Pressed = {
    a: <Icons.APressed {...svgprops} />,
    b: <Icons.BPressed {...svgprops} />,
    x: <Icons.XPressed {...svgprops} />,
    y: <Icons.YPressed {...svgprops} />,
    start: <Icons.StartPressed {...svgprops} />,
    select: <Icons.SelectPressed {...svgprops} />,
    home: <Icons.HomePressed {...svgprops} />,
    lthumb: <Icons.LThumbPressed {...svgprops} />,
    rthumb: <Icons.RThumbPressed {...svgprops} />,
    l1: <Icons.L1Pressed {...svgprops} />,
    r1: <Icons.R1Pressed {...svgprops} />,
    l2: <Icons.L2Pressed {...svgprops} />,
    r2: <Icons.R2Pressed {...svgprops} />,
  };

  if (!button) return null;

  return (
    <div
      role="button"
      className="p-3 absolute"
      style={{
        ...size,
        ...position,
      }}
      {...pressProps}
    >
      {!isPressed ? Idle[button] : Pressed[button]}
    </div>
  );
}
