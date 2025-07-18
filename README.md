# ControlSocket
Use your **phone** as a **gamepad** for your PC, no installations needed!

## Why?

Sometimes you just want to play a quick game with friends, but:
- You forgot your physical controller at home.
- You prefer touch controls.
- You want an instant solution **without installing extra apps** on your phone.

Most apps for this require installing a native app on Android — which can exclude iOS users or you just dont want to download a one-time app in your phone.
Other solutions only support **Windows**, without any Linux support.

**ControlSocket** solves this:
- Runs **cross-platform** (Linux & Windows)
- No phone installation required — just scan a QR code, open a webpage, and play!

## Usage

- Download the **pre-built executables** for **Linux** or **Windows** from the [Releases](#) page.
  - Windows users need to install the [ViGEmBus driver](https://github.com/nefarius/ViGEmBus)
  - Linux users, please follow [this guide](https://github.com/yannbouteiller/vgamepad/blob/main/readme/linux.md) if your controllers doesnt work properly.

- Run the executable. It will start a local server and display a **QR code** in your terminal.
- Scan the QR code with your phone — it will open the Gamepad Web App in your browser.
- Use your phone as a touch gamepad!!

## Building

If you want to build the project you can follow this guide <3

- Install the needed dependencies
```bash
pip install -r requirements.txt
```
- Enter the `webapp` folder and install the needed dependencies
```bash
node install
# or
bun install
```
- Build the web app:
```bash
bun run build
```
- Build the Python executable:
```bash
pyinstaller main.spec
```

# Contributing
This was made as a hobby project, _and to learn how to use websockets_.

However PRs, issues and ideas are **always welcome**.

