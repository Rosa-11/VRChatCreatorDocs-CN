# AI 导航 {#ai-navigation}

AI 导航（AI Navigation）允许你创建非玩家角色（NPC），这些角色可以借助根据你的场景（Scene）几何结构自动生成的导航网格在游戏世界中智能移动。动态障碍物让你能在运行时改变角色的导航，而离网链接（offmesh links）让你可以构建特定动作，例如开门、跳过缺口或从边缘跳下。

:::tip

AI 导航是 Unity 的内置功能。请阅读 [Unity 官方文档](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/index.html)，以了解关于如何使用它的重要概念。

:::

## 与 Unity 2019 导航功能的差异 {#differences-from-unity-2019-navigation-features}

与之前的版本相比，Unity 2022 改变了 AI 导航在 Unity 中的工作方式：

* 该系统现在是独立包，由 Unity 维护，而不再集成到核心中。
* 运行时生成！你现在可以在 VRChat 客户端中于运行时创建和更新导航网格。此前这只能在 Unity 编辑器中实现。
* [NavMesh Links](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshLink.html) 和 [Off-Mesh Links](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/CreateOffMeshLink.html) 更易于使用。
* NavMesh 的生成整体上有所改进，也更加稳定。
* 障碍物现在可以是动态的。
* 你可以在你的世界中使用多个 [NavMesh Surfaces](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshSurface.html)。
* NavMesh Surfaces、[Modifiers](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshModifier.html) 和 [Modifier Volumes](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshModifierVolume.html) 提供了对该系统更精细的控制。
* 区域开销（Area costs）现在会被正确地导出到世界数据中，并在加入世界时恢复。

## VRChat 中的限制 {#limitations-in-vrchat}

AI 导航的部分功能无法在 VRChat 客户端中使用，或者目前尚无用处：

### 自定义代理类型（Custom Agent Types） {#custom-agent-types}

[Unity 允许你声明不同类型的代理](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshAgent.html)，这些代理可以有不同的 Radius、Height、Step Height、Max Slope 等值。这些信息会打包进世界数据，但 VRChat 目前没有用于检索并应用自定义代理类型的方法。此功能正在考虑中，但目前你需要使用默认的代理类型。

### 各类方法与属性 {#various-methods-and-properties}

* `NavMeshLink.agentTypeID` - 运行时烘焙不适用于自定义代理，因此这没什么用。
* `NavMeshSurface.CollectObjects` - 枚举数组在 Udon 中不可用。
* `NavMeshSurface.agentTypeID` - 运行时烘焙无法配合自定义代理工作，因此这没有用。
* `NavMeshSurface.UpdateNavMesh()` - 返回一个 AsyncOperation，无法使用。该方法本身应该仍然有效。
