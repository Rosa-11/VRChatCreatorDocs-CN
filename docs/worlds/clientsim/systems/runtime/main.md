# Client Sim Main

ClientSimMain 是 ClientSim 的核心，负责处理 ClientSim 的初始化和销毁。它包含在 ClientSimSystem 预制件中。创建时，所有核心系统都会连同其依赖项一起初始化。该系统还维护所有 VRCSDK 钩子的实现，以便把 VRC 组件链接到 ClientSim Helpers。ClientSimMain 是一个单例，以确保同一时间只有一个实例在运行，同时也便于从编辑器窗口和测试中传递信息。ClientSim 内部的任何运行时系统都不依赖 ClientSimMain 作为单例。

![ClientSimSystem 层级视图](/img/worlds/clientsim/client-sim-main-hierarchy.png)
