# 输入事件 {#input-events}

你可以使用Udon输入事件，以跨所有平台的统一方式读取玩家控制器的输入。即使玩家重新映射了控制，这些事件也能正常工作。

目前有两种类型的事件——[按钮](#button-events)和[轴](#axis-events)，它们包含布尔值和浮点值。每个事件还持有一个特殊的[UdonInputEventArgs](#udoninputeventargs)对象。你也可以使用[Unity输入方法和属性](/worlds/udon/input-events#unity-input-methods-and-properties)直接读取输入数据。

## 按钮事件 {#button-events}
按钮事件包含一个*bool*值，按钮按下时为**true**，释放时为**false**。

### InputJump
桌面端为空格键，控制器上通常是面部按钮。

### InputUse
桌面端为左键单击，控制器上通常是扳机按钮。

### InputGrab
桌面端为左键单击，VR控制器上通常是握持按钮。

### InputDrop
桌面端为右键单击，Vive Wand和部分Windows Mixed Reality控制器上为按下握持按钮，其他控制器上为释放握持按钮。

## 轴事件 {#axis-events}
轴事件有一个**float**值，通常范围在-1到1之间。使用带模拟摇杆的控制器时，每次值变化都会触发新事件，从0到0.1，再到0.2，依此类推。桌面用户会输出整数：-1、0、1等。

### InputMoveHorizontal
桌面端为A和D，控制器上通常是左摇杆/触摸板左右移动。

### InputMoveVertical
桌面端为W和S，控制器上通常是左摇杆/触摸板上下移动。

### InputLookVertical
桌面端为上下移动鼠标，游戏手柄和VR控制器上通常是右摇杆上下移动。

### InputLookHorizontal
桌面端为左右移动鼠标；在未启用Comfort Turning的VR控制器上，使用右摇杆/触摸板左右转向；游戏手柄上通常是右摇杆左右移动。

## UdonInputEventArgs
此对象包含在每个输入事件中，并保存该事件的附加数据，这些数据可能有用。我们将来可能会向此对象添加更多数据，如果你想到希望在此引用的有用内容，请告诉我们。目前，它包括：

- **UdonInputEventType**：BUTTON或AXIS
- **boolValue**：如果是按钮事件则为True/False，如果是轴事件则为false（默认值）
- **floatValue**：轴事件为-1到1之间的数字，按钮事件为0（默认值）
- **handType**：LEFT或RIGHT。键盘和鼠标用户也会包含此项（鼠标为RIGHT，键盘为LEFT）。

## OnInputMethodChanged
每当用户切换输入方法时，例如从键盘切换到鼠标、控制器或触摸屏，此事件都会触发。它的参数包含一个[VRCInputMethod](/worlds/udon/graph/type-nodes/#vrcsdkbasevrcinputmethod)枚举。

:::note

在PC上使用的大多数VR控制器显示为`SteamVR2`。不过，用户仍可能在会话期间切换为其他输入类型。例如，切换到Quest/Pico手部追踪会将输入方法更改为`Embodied`。

:::

:::note Vive输入名称歧义

- `VRCInputMethod.Vive`是通过SteamVR运行的Vive控制器。
- `VRCInputMethod.ViveXr`是通过OpenXR运行的Vive XR Elite控制器。

:::

## Unity输入方法和属性 {#unity-input-methods-and-properties}

Udon可以访问[`UnityEngine.Input`](https://docs.unity3d.com/ScriptReference/Input.html)命名空间中的一些方法和属性。它们提供有关用户输入的详细信息。

以下方法和属性在Udon中可用：
- [`Input.anyKey`](https://docs.unity3d.com/ScriptReference/Input-anyKey.html), [`Input.anyKeyDown`](https://docs.unity3d.com/ScriptReference/Input-anyKeyDown.html)
- [`Input.inputString`](https://docs.unity3d.com/ScriptReference/Input-inputString.html)
- [`Input.imeIsSelected`](https://docs.unity3d.com/ScriptReference/Input-imeIsSelected.html)
- [`Input.GetAxis()`](https://docs.unity3d.com/ScriptReference/Input.GetAxis.html), [`Input.GetAxisRaw()`](https://docs.unity3d.com/ScriptReference/Input.GetAxisRaw.html)
- [`Input.GetButton()`](https://docs.unity3d.com/ScriptReference/Input.GetButton.html), [`Input.GetButtonDown()`](https://docs.unity3d.com/ScriptReference/Input.GetButtonDown.html), [`Input.GetButtonUp()`](https://docs.unity3d.com/ScriptReference/Input.GetButtonUp.html)
- [`Input.GetMouseButton()`](https://docs.unity3d.com/ScriptReference/Input.GetMouseButton.html), [`Input.GetMouseButtonDown()`](https://docs.unity3d.com/ScriptReference/Input.GetMouseButtonDown.html), [`Input.GetMouseButtonUp()`](https://docs.unity3d.com/ScriptReference/Input.GetMouseButtonUp.html)
- [`Input.GetJoystickNames()`](https://docs.unity3d.com/ScriptReference/Input.GetJoystickNames.html)
- [`Input.GetKey()`](https://docs.unity3d.com/ScriptReference/Input.GetKey.html), [`Input.GetKeyUp()`](https://docs.unity3d.com/ScriptReference/Input.GetKeyUp.html), [`Input.GetKeyDown()`](https://docs.unity3d.com/ScriptReference/Input.GetKeyDown.html)

## 在VRChat菜单中的输入检测 {#input-detection-in-vrchat-menus}

当以下任何VRChat菜单打开时，Udon无法检测输入：
- 主菜单
- 快捷菜单（仅桌面端或移动端）
- 文本输入弹出窗口

当你打开VRChat菜单时，Udon会释放所有按住的输入，即使你继续按住它们。例如：
- 如果你按住方向键并打开VRChat菜单，`Input.GetButtonUp()`对该键返回`true`。
- 如果你按住跳跃按钮并打开VRChat菜单，Udon会执行`InputJump(false)`。

当你关闭VRChat菜单时，Udon会按下所有按住的**Unity**输入。例如：
- 如果你在关闭VRChat菜单时按住右方向键，`Input.GetButtonDown()`对该键返回`true`。
- 如果你按住跳跃按钮并关闭VRChat菜单，Udon**不会**执行`InputJump(true)`。
