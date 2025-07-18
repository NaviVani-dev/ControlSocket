import { useStore } from "../lib/store";
export default function OverlayScreen({
  type,
}: {
  type: "connecting" | "connected" | "fullscreen" | "disconnected";
}) {
  const { setAcceptedOverlay } = useStore();
  const acceptConnected = () => {
    setAcceptedOverlay(true);
    fullscreenShit();
  };
  const fullscreenShit = () => document.body.requestFullscreen();
  // since the app is not that advanced atm, reloading to try to reconnect the websocket is not that important, atleast imo
  const kamikazeReload = () => location.reload();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-[100] flex flex-col gap-2 items-center justify-center text-center">
      {type == "connecting" && (
        <>
          <p className="font-bold text-2xl">Connecting to websocket</p>
          <p>Please wait...</p>
        </>
      )}
      {type == "connected" && (
        <>
          <p className="font-bold text-2xl">Connected to PC!</p>
          <button
            className="bg-white text-black py-3 px-6 rounded-md"
            onClick={acceptConnected}
          >
            Start playing
          </button>
        </>
      )}
      {type == "fullscreen" && (
        <>
          <p className="font-bold text-2xl">You're still connected!</p>
          <p>Press to keep playing</p>
          <button
            className="bg-white text-black py-3 px-6 rounded-md"
            onClick={fullscreenShit}
          >
            Continue
          </button>
        </>
      )}
      {type == "disconnected" && (
        <>
          <p className="font-bold text-2xl">Connection has been lost!</p>
          <button
            className="bg-white text-black py-3 px-6 rounded-md"
            onClick={kamikazeReload}
          >
            Reload
          </button>
        </>
      )}
    </div>
  );
}
