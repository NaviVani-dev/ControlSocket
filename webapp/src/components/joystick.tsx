import type { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { Joystick } from "react-joystick-component";
import { sendData } from "~/lib/socket";
import type { ButtonsPositions } from "../lib/interfaces/overlay";
import type { GamepadJoysticks } from "~/lib/interfaces/gamepad";

export default function JoystickC({
  joystick,
  position,
}: {
  joystick: GamepadJoysticks;
  position?: ButtonsPositions;
}) {
  if (!joystick) return;

  const handleMove = (m: IJoystickUpdateEvent) => {
    sendData({ input: joystick, value: [m.x || 0, m.y || 0] });
  };

  const handleStop = () => {
    sendData({ input: joystick, value: [0, 0] });
  };

  return (
    <div className="absolute" style={position}>
      <Joystick
        move={handleMove}
        stop={handleStop}
        baseColor="#ffffff30"
        stickColor="#ffffff"
      />
    </div>
  );
}
