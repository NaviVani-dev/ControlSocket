import Button from "~/components/button";
import Dpad from "~/components/dpad";
import Joystick from "~/components/joystick";
import Settings from "~/components/settings";
import { connectSocket } from "~/lib/socket";
import { useState, useEffect } from "react";
import { useStore } from "~/lib/store";
import { KeepAwake } from "react-keep-awake";
import OverlayScreen from "~/components/overlayScreen";

function App() {
  const { connected, connectionLost, acceptedOverlay, settings } = useStore();
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    });
  }, []);

  useEffect(() => {
    const connectLmao = async () => {
      const url = `${window.location.origin}/socket`;
      const res = await fetch(url);
      const data = await res.json();
      const websocketUrl = `ws://${data.ip}:${data.port}`;
      connectSocket(websocketUrl);
      return () => {};
    };
    connectLmao();
  }, []);

  return (
    <div className="grid grid-cols-2 w-screen h-screen overflow-hidden">
      {!connected && !connectionLost && <OverlayScreen type="connecting" />}
      {connected && !acceptedOverlay && !connectionLost && (
        <OverlayScreen type="connected" />
      )}
      {connected && !fullscreen && acceptedOverlay && !connectionLost && (
        <OverlayScreen type="fullscreen" />
      )}
      {connectionLost && <OverlayScreen type="disconnected" />}
      {connected && fullscreen && acceptedOverlay && !connectionLost && (
        <KeepAwake />
      )}
      {settings && <Settings />}
      <Button button="lthumb" position={{ top: 140, left: 0 }} />
      <Button button="l1" position={{ top: 0, left: 20 }} />
      <Button button="l2" position={{ top: 0, left: 120 }} />
      <Button button="select" position={{ top: 0, left: 260 }} />
      <Button button="home" position={{ top: 20, left: 350 }} />
      <Button button="start" position={{ top: 0, right: 260 }} />
      <Button button="a" position={{ top: 170, right: 100 }} />
      <Button button="b" position={{ top: 120, right: 50 }} />
      <Button button="x" position={{ top: 120, right: 150 }} />
      <Button button="y" position={{ top: 70, right: 100 }} />
      <Button button="r1" position={{ top: 0, right: 20 }} />
      <Button button="r2" position={{ top: 0, right: 120 }} />
      <Button button="rthumb" position={{ bottom: 0, right: 80 }} />
      <Joystick joystick="lstick" position={{ top: 90, left: 90 }} />
      <Joystick joystick="rstick" position={{ bottom: 30, right: 200 }} />
      <Dpad position={{ bottom: 0, left: 60 }} />
    </div>
  );
}

export default App;
