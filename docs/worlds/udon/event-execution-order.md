import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 事件执行顺序 {#event-execution-order}

Udon 和 Unity 内置了一些事件，如果你在脚本中包含它们，它们就会被自动调用。例如，`Start()` 事件对每个脚本运行一次，而 `Update()` 事件每帧运行一次。在编写 Udon 脚本时，了解这些事件中哪些先发生会很有帮助。
:::note

Unity 提供了一份（不完整的）<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/ExecutionOrder.html">内置事件列表</UnityVersionedLink>，其中许多事件在 VRChat 中也可用。
:::
下图展示了 Udon 和 Unity 中最重要的可用事件的执行顺序。

![示例横幅](/img/worlds/event-execution-order.svg)

:::caution

Unity 和 VRChat 的更新可能会改变上图所描绘的事件执行顺序。
并非所有事件都被列出，而且某些事件可能会根据具体情况（如是否为对象的所有者、是否后加入世界等）以不同的顺序执行。

:::
