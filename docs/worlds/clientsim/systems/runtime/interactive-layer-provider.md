# InteractiveLayerProvider

InteractiveLayerProvider 只是监听菜单打开状态事件，并提供一个图层遮罩，用于指明当前哪些图层是可交互的。菜单打开时，只有 UI 和 UIMenu 图层可交互。菜单关闭时，除 MirrorReflection 之外的所有其他图层都可交互。InteractiveLayerProvider 由 [Raycasters](player.md#raycaster) 和 [ClientSimInputModule](input.md) 使用。
