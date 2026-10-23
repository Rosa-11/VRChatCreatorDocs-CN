# Unity 事件系统 {#unity-event-system}

ClientSim 使用两个类将操作转换为 Unity 的 EventSystem。这些类把 Unity 的旧输入系统解耦为基于 ClientSim 当前绑定的值，并匹配 VRChat 的可交互 UI 对象过滤方式。

## BaseInput

ClientSimBaseInput 系统扩展了 Unity 的 BaseInput 类。Unity 的 BaseInput 负责将鼠标位置和按钮输入传入 EventSystem。ClientSim BaseInput 系统重写了这些方法，改为根据当前的 ClientSim 输入绑定和最近的 [PlayerRaycaster](player.md#raycaster) 结果传入值。鼠标输入被替换为当前绑定的 [Use Input](input.md)。由于 Use 输入是分左右手的动作，只有最后激活的那只手的值会作为鼠标输入传入。发送给事件系统的鼠标位置会忽略实际的鼠标位置，改为计算最近一次交互射线检测的屏幕位置。使用射线检测位置可以抽象掉真实鼠标位置，使桌面和 VR 能通过同一套系统使用 Unity UI。
BaseInput 系统还负责向 ClientSim 的其他部分提供当前鼠标位置。它控制鼠标指针是隐藏并锁定在屏幕中央，还是可见且可自由移动。此鼠标位置用于显示 [Desktop Reticle](player.md#reticle)，以及使用鼠标为 [DesktopRayProvider](player.md#rayprovider) 生成射线方向。

## InputModule

ClientSimInputModule 扩展了 Unity 的 StandaloneInputModule。该系统处理 Unity 鼠标事件，并过滤掉当前不可交互的 UI 对象。当以下所有条件都满足时，UI 对象才是可交互的：

1. [PlayerRaycaster](player.md#playerraycaster) 最近击中的对象带有 VRC_UIShape 组件。此数据由 ClientSimBaseInput 提供。
2. 该 UI 对象的父级中有一个 UIShape 组件
3. 父级 UIShape 对象所在的图层属于当前可交互图层。可交互图层由 [InteractiveLayerProvider](interactive-layer-provider.md) 决定。
4. UI 对象射线检测的命中点位于 UIShape 的碰撞体内。如果其中任一条件不满足，该 UI 就无法交互。
