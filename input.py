import vgamepad as vg

xbox_buttons = {
  "a": vg.XUSB_BUTTON.XUSB_GAMEPAD_A,
  "b": vg.XUSB_BUTTON.XUSB_GAMEPAD_B,
  "x": vg.XUSB_BUTTON.XUSB_GAMEPAD_X,
  "y": vg.XUSB_BUTTON.XUSB_GAMEPAD_Y,
  "start": vg.XUSB_BUTTON.XUSB_GAMEPAD_START,
  "select": vg.XUSB_BUTTON.XUSB_GAMEPAD_BACK,
  "home": vg.XUSB_BUTTON.XUSB_GAMEPAD_GUIDE,
  "l1": vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_SHOULDER,
  "r1": vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_SHOULDER,
  "lthumb": vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_THUMB,
  "rthumb": vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_THUMB,
  "dpad_up": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_UP,
  "dpad_down": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_DOWN,
  "dpad_left": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_LEFT,
  "dpad_right": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_RIGHT
}

ps4_buttons = {
  "a": vg.DS4_BUTTONS.DS4_BUTTON_CROSS,
  "b": vg.DS4_BUTTONS.DS4_BUTTON_CIRCLE,
  "x": vg.DS4_BUTTONS.DS4_BUTTON_SQUARE,
  "y": vg.DS4_BUTTONS.DS4_BUTTON_TRIANGLE,
  "start": vg.DS4_BUTTONS.DS4_BUTTON_SHARE,
  "select": vg.DS4_BUTTONS.DS4_BUTTON_OPTIONS,
  "home": vg.DS4_SPECIAL_BUTTONS.DS4_SPECIAL_BUTTON_PS,
  "l1": vg.DS4_BUTTONS.DS4_BUTTON_SHOULDER_LEFT,
  "r1": vg.DS4_BUTTONS.DS4_BUTTON_SHOULDER_RIGHT,
  "lthumb": vg.DS4_BUTTONS.DS4_BUTTON_TRIGGER_LEFT,
  "rthumb": vg.DS4_BUTTONS.DS4_BUTTON_TRIGGER_RIGHT,
  "dpad_none": vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_NONE,
  "dpad_up": vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_NORTH,
  "dpad_upleft": vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_NORTHWEST,
  "dpad_upright": vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_NORTHEAST,
  "dpad_down": vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_SOUTH,
  "dpad_downleft": vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_SOUTHWEST,
  "dpad_downright": vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_SOUTHEAST,
  "dpad_left": vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_WEST,
  "dpad_right": vg.DS4_DPAD_DIRECTIONS.DS4_BUTTON_DPAD_EAST
}

buttons_index = ["a","b","x","y","start","select","home","l1","r1","lthumb","rthumb"]
dpad_index = ["dpad_none","dpad_up","dpad_upleft","dpad_upright","dpad_down","dpad_downleft","dpad_downright","dpad_left","dpad_right"]
triggers_index = ["l2", "r2"]
joystick_index = ["lstick", "rstick"]

dpad_directions = {
  "dpad_up": 0,
  "dpad_down": 1,
  "dpad_left": 2,
  "dpad_right": 3
}

class Gamepad:
  def __init__(self, type="xbox"):
    if type == "xbox":
      self.controller = "xbox"
      self.gamepad = vg.VX360Gamepad()
      self.button_map = xbox_buttons
    elif type == "ps4":
      self.controller = "ps4"
      self.gamepad = vg.VDS4Gamepad()
      self.button_map = ps4_buttons
      self.dpad_status = [False,False,False,False] # up, down, left, right
    else:
      raise ValueError("invalid gamepad type, must be 'xbox' or 'ps4'")
  
  def input(self,input,value):
    if not self.gamepad: 
      print("gamepad not initialized")
      return

    if self.controller == "ps4" and input == "home":
      if value == 1:
        self.gamepad.press_special_button(self.button_map[input])
      elif value == 0:
        self.gamepad.release_special_button(self.button_map[input])
    elif self.controller == "ps4" and input in dpad_index:
      if value == 1:
        self.dpad_status[dpad_directions[input]] = True
      elif value == 0:
        self.dpad_status[dpad_directions[input]] = False
      if all(not status for status in self.dpad_status):
        self.gamepad.directional_pad(direction=ps4_buttons["dpad_none"])
      elif self.dpad_status[0]:
        if self.dpad_status[2]:
          self.gamepad.directional_pad(direction=ps4_buttons["dpad_upleft"])
        elif self.dpad_status[3]:
          self.gamepad.directional_pad(direction=ps4_buttons["dpad_upright"])
        else:
          self.gamepad.directional_pad(direction=ps4_buttons["dpad_up"])
      elif self.dpad_status[1]:
        if self.dpad_status[2]:
          self.gamepad.directional_pad(direction=ps4_buttons["dpad_downleft"])
        elif self.dpad_status[3]:
          self.gamepad.directional_pad(direction=ps4_buttons["dpad_downright"])
        else:
          self.gamepad.directional_pad(direction=ps4_buttons["dpad_down"])
      elif self.dpad_status[2]:
        self.gamepad.directional_pad(direction=ps4_buttons["dpad_left"])
      elif self.dpad_status[3]:
        self.gamepad.directional_pad(direction=ps4_buttons["dpad_right"])
    elif input in buttons_index or input in dpad_index:
      if value == 1:
        self.gamepad.press_button(self.button_map[input])
      elif value == 0:
        self.gamepad.release_button(self.button_map[input])
    elif input == triggers_index[0]:
      self.gamepad.left_trigger_float(value)
    elif input == triggers_index[1]:
      self.gamepad.right_trigger_float(value)
    elif input == joystick_index[0]:
      self.gamepad.left_joystick_float(value[0], value[1])
    elif input == joystick_index[1]:
      self.gamepad.right_joystick_float(value[0], value[1])
    self.gamepad.update()
