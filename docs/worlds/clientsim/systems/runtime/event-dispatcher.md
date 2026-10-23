# 事件分发器与事件 {#event-dispatcher-and-events}

EventDispatcher 负责在 ClientSim 内发生特定事件时通知其他系统。一个行为可以订阅某种事件类型，或者向整个 ClientSim 发送某种特定类型的事件，而无需知道将由谁来处理它。EventDispatcher 其实就是一组与事件处理程序配对的事件类型集合。这种方式在 ClientSim 中解耦了不同系统，而无需创建直接的依赖关系。所有发送的事件都必须扩展 IClientSimEvent 接口，但可以携带该事件所需的各种数据。
