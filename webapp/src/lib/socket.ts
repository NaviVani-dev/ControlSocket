import type { GamepadData } from "~/lib/interfaces/gamepad";
import { useStore, settingsStore } from "~/lib/store";

let socket: WebSocket | null = null;

export const connectSocket = (url: string) => {
  if (socket) return socket;
  if (!url) return;

  socket = new WebSocket(url);
  socket.onmessage = (msg) => {
    console.log(msg);
  };

  socket.onopen = () => {
    console.log("WebSocket opened!");
    useStore.setState({ connected: true, connectionLost: false });
    const gamepad_type = settingsStore.getState().gamepadType || "xbox";
    socket?.send(JSON.stringify({ type: "config", gamepad_type }));
  };
  socket.onclose = () => {
    console.log("WebSocket closed");
    useStore.setState({ connected: false, connectionLost: true });
  };
  socket.onerror = (e) => {
    console.log("WebSocket closed", e);
    useStore.setState({ connected: false, connectionLost: true });
  };

  return socket;
};

export const sendData = (data: Partial<GamepadData>) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "input", ...data }));
  } else {
    console.log("WebSocket not open");
  }
};

export const closeSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
