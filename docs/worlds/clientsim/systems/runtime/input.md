# 输入 {#input}

在 ClientSim 中，所有输入调用都放在同一个类里，用于处理输入并发送事件。ClientSimInputManager 使用新的 Input System，从而支持事件驱动的输入。它使用 PlayerInput 组件，根据下面显示的输入绑定（Input Bindings）获取特定的输入事件。由于新的 Unity Input System 包默认不会包含在内，而且 Unity 需要特殊设置才能启用它，所以所有对 Input System 的引用都被包裹在 define 条件中，以避免导入新项目时出现错误。

## 输入事件 {#input-events}

与 [EventDispatcher](event-dispatcher.md) 类似，InputManager 也有自己的事件，不同系统可以直接监听。这些事件与 EventDispatcher 本身分开，因为所有输入事件都有相似的参数，而且还带有不会通过事件广播的输入值，需要由监听系统轮询以获取更新后的轴（axis）值。

## 输入绑定 {#input-bindings}

Input System 还允许为各种控制方案设置不同的绑定。下方列出了包含的绑定：KeyboardMouse、Gamepad 和实验性的 XR Controller 绑定。请注意，在 Unity 2019 中，InputSystem 内的 XR 输入绑定非常有限。需要扩展 InputManager 才能正确支持各种 VR 控制器。


## UdonInput

UdonInput 系统是 InputManager 预制件的一部分，它会订阅 InputManager 中相应的事件，同时轮询移动和视角类输入的更新。由于 Unity 发送输入事件的时机与 Udon 应接收输入事件的时机并不一致，所有基于按钮的输入都会被排队，并在该帧稍后与移动和视角类输入一同处理。这种排队与处理机制让输入事件可以在 Udon 的 update 方法被调用之后发生，与 VRChat 中的情形类似。
