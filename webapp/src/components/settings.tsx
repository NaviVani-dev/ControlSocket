import type { Gamepads } from "~/lib/interfaces/settings";
import { useStore, settingsStore } from "~/lib/store";

export default function Settings() {
  const { setSettings } = useStore();
  const closeSettings = () => setSettings(false);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-[95%] h-[90%] bg-white rounded-md flex flex-col gap-2 p-4 text-black relative">
        <p className="font-bold text-2xl">Settings</p>
        <div
          onClick={closeSettings}
          className="absolute top-4 right-6 bg-black/5 w-10 h-10 rounded-md flex items-center justify-center font-bold"
        >
          X
        </div>
        <SelectBackend />
        <SelectTheme />
      </div>
    </div>
  );
}

function SelectBackend() {
  const { gamepadType, setGamepadType } = settingsStore();
  const changeBackend = (type: Gamepads) => {
    setGamepadType(type);
    location.reload();
  };
  return (
    <div>
      <p className="font-bold">Controller Backend</p>
      <p>
        This changes how the PC recognizes your controller. Changing this will
        restart your session.
      </p>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => changeBackend("xbox")}
          className="px-4 py-2 bg-black/5 rounded-md border-2"
          style={{
            borderColor: gamepadType == "xbox" ? "black" : "transparent",
          }}
        >
          Xbox
        </button>
        <button
          onClick={() => changeBackend("ps4")}
          className="px-4 py-2 bg-black/5 rounded-md border-2"
          style={{
            borderColor: gamepadType == "ps4" ? "black" : "transparent",
          }}
        >
          PS4
        </button>
      </div>
    </div>
  );
}

function SelectTheme() {
  const { gamepadStyle, setGamepadStyle } = settingsStore();
  return (
    <div>
      <p className="font-bold">Controller Appearance</p>
      <p>
        This changes the appearance of your buttons. This does NOT affect your
        controller backend.
      </p>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => setGamepadStyle("xbox")}
          className="px-4 py-2 bg-black/5 rounded-md border-2"
          style={{
            borderColor: gamepadStyle == "xbox" ? "black" : "transparent",
          }}
        >
          Xbox
        </button>
        <button
          onClick={() => setGamepadStyle("ps4")}
          className="px-4 py-2 bg-black/5 rounded-md border-2"
          style={{
            borderColor: gamepadStyle == "ps4" ? "black" : "transparent",
          }}
        >
          PS4
        </button>
        <button
          onClick={() => setGamepadStyle("switch")}
          className="px-4 py-2 bg-black/5 rounded-md border-2"
          style={{
            borderColor: gamepadStyle == "switch" ? "black" : "transparent",
          }}
        >
          Switch
        </button>
      </div>
    </div>
  );
}
