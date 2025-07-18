import { Button } from "~/components/basicButton";
import { useState } from "react";
import { getStyledIcons } from "~/lib/utils";
import { sendData } from "~/lib/socket";
import type { ButtonsPositions, ButtonsSize } from "~/lib/interfaces/overlay";
import type { GamepadDpad } from "~/lib/interfaces/gamepad";

// the array of booleans determine if certain direction is pressed, it goes:
// [up, down, left, right]
export default function Dpad({
  position,
  size = { width: "160px", height: "160px" },
}: {
  position?: ButtonsPositions;
  size?: ButtonsSize;
}) {
  const initstate = [false, false, false, false];
  const [pressedState, setPressedState] = useState<boolean[]>(initstate);

  const Icons = getStyledIcons();
  const changePressedStatus = (input: GamepadDpad, value: boolean) => {
    const index =
      input == "dpad_up"
        ? 0
        : input == "dpad_down"
        ? 1
        : input == "dpad_left"
        ? 2
        : 3;
    setPressedState((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
    sendData({ input, value: value ? 1 : 0 });
  };

  return (
    <div className="absolute" style={{ ...size, ...position }}>
      <div className="w-full h-full relative grid grid-cols-3 grid-rows-3">
        <Icons.Dpad className="w-[115%] h-[115%] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] pointer-events-none" />
        {pressedState[0] && (
          <Icons.DpadUp className="w-[115%] h-[115%] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] pointer-events-none" />
        )}
        {pressedState[1] && (
          <Icons.DpadDown className="w-[115%] h-[115%] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] pointer-events-none" />
        )}
        {pressedState[2] && (
          <Icons.DpadLeft className="w-[115%] h-[115%] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] pointer-events-none" />
        )}
        {pressedState[3] && (
          <Icons.DpadRight className="w-[115%] h-[115%] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] pointer-events-none" />
        )}
        <Button
          onPressStart={() => {
            changePressedStatus("dpad_up", true);
            changePressedStatus("dpad_left", true);
          }}
          onPressEnd={() => {
            changePressedStatus("dpad_up", false);
            changePressedStatus("dpad_left", false);
          }}
          className="w-full h-full"
        />
        <Button
          onPressStart={() => changePressedStatus("dpad_up", true)}
          onPressEnd={() => changePressedStatus("dpad_up", false)}
          className="w-full h-full"
        />
        <Button
          onPressStart={() => {
            changePressedStatus("dpad_up", true);
            changePressedStatus("dpad_right", true);
          }}
          onPressEnd={() => {
            changePressedStatus("dpad_up", false);
            changePressedStatus("dpad_right", false);
          }}
          className="w-full h-full"
        />
        <Button
          onPressStart={() => changePressedStatus("dpad_left", true)}
          onPressEnd={() => changePressedStatus("dpad_left", false)}
          className="w-full h-full"
        />
        <div className="empty-div-lmao" />
        <Button
          onPressStart={() => changePressedStatus("dpad_right", true)}
          onPressEnd={() => changePressedStatus("dpad_right", false)}
          className="w-full h-full"
        />
        <Button
          onPressStart={() => {
            changePressedStatus("dpad_down", true);
            changePressedStatus("dpad_left", true);
          }}
          onPressEnd={() => {
            changePressedStatus("dpad_down", false);
            changePressedStatus("dpad_left", false);
          }}
          className="w-full h-full"
        />
        <Button
          onPressStart={() => changePressedStatus("dpad_down", true)}
          onPressEnd={() => changePressedStatus("dpad_down", false)}
          className="w-full h-full"
        />
        <Button
          onPressStart={() => {
            changePressedStatus("dpad_down", true);
            changePressedStatus("dpad_right", true);
          }}
          onPressEnd={() => {
            changePressedStatus("dpad_down", false);
            changePressedStatus("dpad_right", false);
          }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
