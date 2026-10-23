# 调试虚拟形象组件 {#debugging-avatar-components}

由于虚拟形象组件可能变得相当复杂，所以在构建虚拟形象时犯错是可以理解的。为了帮助测试和调试问题，我们为用户提供了一些工具，让这个过程更轻松。

### 在游戏内调试 {#in-game-debugging}

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8hqDquZWvhY?si=Mp7pM80fCYZPei81" title="YouTube 视频播放器" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

使用 Action Menu，你可以通过 Avatar Overlay 选项在游戏中实时显示虚拟形象上 [PhysBones](/common-components/physbones) 和 [Contacts](/common-components/contacts) 的可视化表示。这对于准确查看正在发生的情况，或检查对象是否已正确设置非常有用。

:::tip

你是在自己的世界中使用这些组件的世界创作者吗？你可以改用[调试视图](/worlds/udon/world-debug-views#debug-view-7)来将它们可视化。

:::

### 在编辑器内调试 {#in-editor-debugging}
[PhysBones](/common-components/physbones) 和 [Contacts](/common-components/contacts) 都会像在 VRChat 中一样在编辑器中运行。进入播放模式，你就可以模拟这些系统并查看虚拟形象的反应，而无需上传它。

你可以在编辑器中以播放模式和编辑模式测试[约束](/common-components/constraints)。如果你愿意，可以通过 SDK 控制面板停止在编辑模式下运行的约束(VRChat SDK > Show Control Panel > Settings > Execute VRChat Constraints in Edit Mode)。

如果你在进入播放模式之前向虚拟形象的 Animator 组件添加了 Animator Controller，那么虚拟形象上的参数就会像在 VRChat 中一样更新。

此外，即使没有设置任何动画控制器，你仍然可以查看每个组件，了解它们为每个参数提供的值。
