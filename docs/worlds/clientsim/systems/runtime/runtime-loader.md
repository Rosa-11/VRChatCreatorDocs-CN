# RuntimeLoader
RuntimeLoader 是一个静态类，负责在进入播放模式时启动 ClientSim。它使用 Unity 的 InitializeOnLoad 钩子检查设置实例，以判断是否应启动 ClientSim，并创建一个 ClientSimMain 实例。该类还负责删除场景中仅编辑器使用的对象。为了便于对 ClientSim 进行测试，它提供了若干方法用于设置测试设置和事件分发器覆盖。
