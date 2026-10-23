# HighlightManager

HighlightManager 会接收一个对象，并为该对象显示轮廓高亮效果。此系统包装了 VRChat 的 HighlightFX 类。HighlightFX 只接收单个渲染器，而 HighlightManager 接收的是 GameObject。为与 VRChat 处理对象高亮的方式保持一致，对象本身及其所有子对象上的所有渲染器都会被用于高亮。已禁用、网格为 null 或属于静态批处理的渲染器会被忽略。如果某个对象没有有效的渲染器，则会基于该对象上的第一个碰撞体使用 Highlight Proxy。Highlight Proxy 会复制原网格的变换值，并应用碰撞体的大小和缩放，使其看起来像是碰撞体被高亮。HighlightManager 用于将 [PlayerRaycaster](player.md#playerraycaster) 系统的结果可视化。可以高亮的对象数量没有固定上限，但通过 ClientSim 预计同时只会高亮 2 个对象，每个玩家手部一个。HighlightManager 链接到 VRCSDK 的 InputManager.EnableObjectHighlight API。不过该钩子只接收渲染器，不会执行查找子对象和创建代理的完整步骤。

:::note
目前 HighlightManager 只展示对象在 Quest 上外观的预览。与 Windows 系统匹配的样式即将推出。
:::
