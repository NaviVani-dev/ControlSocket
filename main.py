import asyncio
import websockets
import json
import socket
import argparse
import qrcode
import os
from aiohttp import web
from input import Gamepad
from plyer import notification

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

async def socket_handler(websocket):
    try:
        print(f"{websocket.remote_address} connected.")
        notify(
            title="Controller connected",
            message=f"{websocket.remote_address[0]} has connected to the websocket.",
        )
        gamepad = None
        async for message in websocket:
            data = json.loads(message)

            if data.get("type") == "config":
                if gamepad is None:
                    gamepad_type = data.get("gamepad_type") or "xbox"
                    gamepad = Gamepad(type=gamepad_type)
                    response = {"status": "ok"}
                else:
                    response = {
                        "status": "error",
                        "message": f"Gamepad of type '{gamepad_type}' already created.",
                    }
            elif data.get("type") == "input":
                if gamepad is None:
                    response = {"status": "error", "message": "No gamepad created."}
                try:
                    gamepad.input(data.get("input"), data.get("value"))
                    response = {"status": "ok"}
                except Exception as e:
                    print(f"ERROR: {e}")
                    response = {"status": "error"}

            await websocket.send(json.dumps(response))
    except Exception as e:
        print(f"ERROR: {e}")
    finally:
        print(f"{websocket.remote_address} disconnected.")
        notify(
            title="Controller disconnected",
            message=f"{websocket.remote_address[0]} has disconnected from the websocket.",
        )

async def http_handler(request):
    return web.FileResponse("./app/index.html")

async def miniapi_handler(request):
    data = {"port": request.app["socketport"], "ip": request.app["host_ip"]}
    return web.json_response(data)

def print_qr(url: str):
    qr = qrcode.QRCode()
    qr.add_data(url)
    qr.make(fit=True)
    qr.print_ascii(invert=True)

def notify(title, message):
    icon_path = os.path.join(BASE_DIR, "icon.ico")
    notification.notify(title=title, message=message, app_name="ControlSocket", app_icon=icon_path, timeout=5)

async def main(ip, port, socketport):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    host_ip = s.getsockname()[0]
    print("ControlSocket started!")
    s.close()

    await websockets.serve(socket_handler, ip, socketport)
    print(f"Websocket: ws://{host_ip}:{socketport}")
    
    app = web.Application()
    app["socketport"] = socketport
    app["host_ip"] = host_ip
    app.add_routes([web.get("/", http_handler), web.get("/socket", miniapi_handler)])
    app.router.add_static("/assets/", path=os.path.join(BASE_DIR, "app", "assets"), name="assets")
    runner = web.AppRunner(app)
    await runner.setup()
    http_site = web.TCPSite(runner, ip, port)
    print(f"App: http://{host_ip}:{port}")
    print_qr(f"http://{host_ip}:{port}")

    await asyncio.gather(http_site.start(), asyncio.Future())


if __name__ == "__main__":
    parser = argparse.ArgumentParser(prog="ControlSocket",description="Use your mobile devices as touch controllers.")
    parser.add_argument("--ip", type=str, default="0.0.0.0", help="IP address to bind the server to. (default: 0.0.0.0)")
    parser.add_argument("--web-port", type=int, default=6870, help="Port number for the Web app. (default: 6870)")
    parser.add_argument("--socket-port", type=int, default=6871, help="Port number for the websocket. (default: 6871)")
    args = parser.parse_args()
    
    try:
        asyncio.run(main(args.ip, args.web_port, args.socket_port))
    except KeyboardInterrupt:
        print("\nControlSocket stopped. Bye!")
