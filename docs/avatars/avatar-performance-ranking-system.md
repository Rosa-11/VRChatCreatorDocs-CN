# 性能等级 {#performance-ranks}

Avatar 性能等级系统让你通过分析某个用户虚拟形象（Avatar）上的组件，看出该用户的 Avatar 对性能的影响有多大。你也可以对自己使用它，看看自己的 Avatar 性能表现如何。

该系统旨在告知用户其 Avatar 上最可能吃性能的组件是什么，并就优化 Avatar 时应关注哪些方面提供基本建议。

它还用于驱动[最低显示性能等级](/avatars/avatar-performance-ranking-system#minimum-displayed-performance-rank-on-pc)系统，后者让用户可以根据性能等级决定希望显示哪些 Avatar。

**该系统并非 Avatar 性能的终极权威**，但它是一个很好的通用指南，可指示某个 Avatar 是否还需要一些优化才能获得良好性能。
:::danger 性能等级并非最终定论！

尽管性能等级系统已尽力判断 Avatar 性能的「最坏情况」，但有很多方法可以让一个优化良好的 Avatar 显示为「Very Poor」，也可以让一个吃 FPS 的 Avatar 被评为「Excellent」。

对于技术向的读者：性能等级系统基于对 Avatar 属性的静态分析，不考虑动画器、着色器、纹理分辨率、像素光源等诸多因素。*不过*，它在 95% 的情况下都能很好地用作检测问题 Avatar 的试金石！
:::

## 简要版 {#short-version}
**以 Good 等级为目标。** 如果做不到，**Medium 也完全没问题。**

制作 Avatar 本身就已经很难，制作优化良好的 Avatar 更是难上加难。这是一项需要长期积累的技能！

请记住，VRChat 中的许多活动、群组和地点可能会要求你在以 Very Poor Avatar 出现时更换 Avatar。因此，即使你选择在和朋友一起的小型实例中使用 Very Poor Avatar，也请确保你还拥有一个适合在人数更多的实例中使用的 Avatar。

你的 Avatar 会影响其他所有人的帧率，所以请注意你的选择会如何影响他人的体验。否则，他们可能只会看到你的 Fallback！
## 性能等级图标 {#performance-ranking-icons}
打开快捷菜单（Quick Menu）后，你会看到用户名牌上方出现图标。

等级如下：

| 图标                                                  | 性能等级 | 说明                                                                                                                                                                       |
|-------------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![image](/img/avatars/performance-rank/excellent.png) | Excellent        | 这已经是最好的了！「冰箱上的金星」等级。                                                                                                               |
| ![image](/img/avatars/performance-rank/good.png)      | Good             | 足够好了！一个值得追求的目标。                                                                                                                                           |
| ![image](/img/avatars/performance-rank/medium.png)    | Medium           | 别被名字骗了，Medium 已经相当不错。如果你处于这一等级且不想再往上优化，那也没问题。                                                            |
| ![image](/img/avatars/performance-rank/poor.png)      | Poor             | 还可以再优化一下。                                                                                                                                                              |
| ![image](/img/avatars/performance-rank/very-poor.png) | Very Poor        | 这个 Avatar 存在一些严重的性能问题。由于该等级没有上限，你的性能很可能因为这个 Avatar 可见而受到影响。 |

## 查看详细的 Avatar 统计信息 {#viewing-detailed-avatar-stats}
在快捷菜单打开时点击某个用户，你会注意到左侧出现一个新的 **「Show Avatar Stats」** 按钮，显示该用户性能等级的图标。


![avatar-perormance-breakdown.gif](/img/avatars/view-avatar-details-qm.png)

点击该图标后，你可以查看该 Avatar 的详细 **Avatar 统计信息**。你也可以查看自己 Avatar 的统计信息：进入你的 Avatar 菜单，点击你自己的某个 Avatar，然后点击屏幕左下角的 **Avatar Stats** 按钮。


![avatar-perormance-breakdown.gif](/img/avatars/view-avatar-details-preview.png)


点击 **Avatar Stats** 按钮后，会弹出一个界面，显示你正在查看的 Avatar 的详细信息，或你自己 Avatar 的详细信息（如果你是在 Avatar 标签页中点击的按钮）。

![avatar-perormance-breakdown.gif](/img/avatars/avatar-perormance-breakdown.gif)


文字颜色与该项统计把等级「拖低」到的等级相匹配。

你还会看到以「Original」和「Perf Filtered」两行形式呈现的「前后对比」。如果你正在使用[最低显示性能等级](/avatars/avatar-performance-ranking-system#minimum-displayed-performance-rank-on-pc)系统，就能看到该系统移除组件前后的统计值。如果 Avatar 因性能原因被最低显示性能等级系统屏蔽，你只会看到原始统计值。

在上面的示例中，Lights 和 Particle Systems 因超出所定义的上限而被禁用。由于每个 Particle System 至少使用一个材质，Particle Systems 贡献的材质数量也会从过滤前的 Avatar 中扣除。

你也可以看到我们链接到了我们的**文档**，特别是 [Avatar 优化技巧](/avatars/avatar-optimizing-tips)。
## Avatar 性能等级统计项 {#avatar-performance-ranking-stats}
以下是该系统所检查的所有统计项及其说明。

**加粗**的统计项在超出最低显示性能等级时会导致 Avatar 被完全屏蔽。如果其他统计项（bounds 除外）超出最低显示性能等级，Avatar 只会被部分屏蔽。显示 Avatar 时，与超标统计项相关的组件会被移除。

例如，当最低显示性能等级设为 Poor 时，一个拥有 9 个 Trail Renderer（Very Poor）的 Avatar 在显示时其所有 Trail Renderer 都会被移除。更多信息请参阅[最低显示性能等级](/avatars/avatar-performance-ranking-system#minimum-displayed-performance-rank-on-pc)。

| Avatar 质量                  | 质量说明                                                                                                                                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 三角形                       | 所讨论模型的三角形数量。（过去曾被错误地称为「多边形」。）                                                                                                                                                                                                                                  |
| Bounds 尺寸                     | Avatar 的总尺寸。如果这个值非常大，该用户的 Avatar 上很可能有一个并非始终显示的大型动画。<br/>重要提示：Bounds Size 不会导致 Avatar 被屏蔽，即使它低于「最低显示性能等级」设置。                                                 |
| 纹理内存                  | Avatar 纹理预计占用的内存量。这些纹理会同时占用系统 RAM 和显卡内存。                                                                                                                                                                                         |
| 蒙皮网格                  | Avatar 上 Skinned Mesh Renderer 组件的数量。                                                                                                                                                                                                                                                                                |
| 基础网格                    | Avatar 上（非蒙皮）Mesh Renderer 组件的数量。                                                                                                                                                                                                                                                                          |
| 材质槽位                  | Avatar 上材质槽的数量。材质槽是网格上用来放置材质的位置。它会计入子网格（Submesh）的创建，从而产生更多绘制调用。请记住，Particle System 会占用一个材质槽，带拖尾的 Particle System 占用两个，Line Renderer 占用一个材质槽。 |
| PhysBones 组件            | Avatar 上 PhysBone 组件的数量。                                                                                                                                                                                                                                                                                             |
| PhysBones 受影响的 Transform   | Avatar 上受 PhysBones 组件影响的 transform 总数。                                                                                                                                                                                                                                                               |
| PhysBones 碰撞体             | Avatar 上 PhysBone collider 脚本的数量。                                                                                                                                                                                                                                                                                       |
| PhysBones 碰撞检查次数 | 每个碰撞体可以影响的 PhysBone transform 数量之和。这可能会重复计算某些 transform，因为单个 transform 可能受多个碰撞体影响。                                                                                                                                                                 |
| Contact 接触器                       | Avatar 上 Contact 的数量。不计入[过滤](/common-components/contacts/#filtering-1)设置为「Local Only」的[接收方](/common-components/contacts/#vrccontactreceiver)。                                                                                                                                            |
| 约束数量                | Avatar 上 VRChat 约束和 Unity 约束的总数。[点击此处了解更详细的信息。](/common-components/constraints#performance)                                                                                                                                                                                 |
| 约束深度                | Avatar 上所有约束之间最深的依赖链。[点击此处了解更详细的信息。](/common-components/constraints#performance)                                                                                                                                                                                     |
| 动画器                       | Avatar 上动画器的数量。重要提示：由于根动画器会被计入，该值始终至少为 1。这意味着若要获得 Excellent 评级，你不能有额外的动画器。                                                                                                                               |
| 骨骼                           | Avatar 骨骼绑定中的骨骼数量。                                                                                                                                                                                                                                                                                                     |
| 光源                          | Avatar 上 Light 组件的数量。                                                                                                                                                                                                                                                                                                |
| 粒子系统                | Avatar 上 Particle System 组件的数量。                                                                                                                                                                                                                                                                                      |
| 活跃粒子总数          | Avatar 上所有粒子系统的 maxParticles 之和。                                                                                                                                                                                                                                                                           |
| 网格粒子活跃多边形数      | 处于激活状态的粒子系统所发射的 Mesh Particle 的三角形总数。换言之，maxEmission * meshParticleVerts。                                                                                                                                                                                                |
| 启用粒子拖尾         | 如果 Avatar 上任一 Particle System 启用了 Particle Trails，此项为 True。                                                                                                                                                                                                                                                       |
| 启用粒子碰撞      | 如果 Avatar 上任一 Particle System 启用了 Particle Collision，此项为 True。                                                                                                                                                                                                                                                    |
| Trail Renderer                 | Avatar 上 Trail Renderer 的数量。                                                                                                                                                                                                                                                                                          |
| Line Renderer                  | Avatar 上 Line Renderer 的数量。                                                                                                                                                                                                                                                                                                  |
| 射线检测                        | Avatar 上 VRCRaycast 组件的数量。                                                                                                                                                                                                                                                                                           |
| Cloth 组件                          | Avatar 上 Cloth 组件的总数。                                                                                                                                                                                                                                                                                          |

## Avatar 性能等级 - 各等级数值上限 {#avatar-performance-ranks---value-maximums-per-rank}
下面列出了每个性能等级的上限。如果任何类别的数值超过这些数字，你就会被归入下一个等级。

例如（在 PC 上），如果你的 Avatar 有 2 个蒙皮网格，其等级将为 Good，因为这超出了 Excellent 的评级，但未超出 Good 的评级。
:::caution 所有 GameObject 和组件都会被计入！

所有 GameObject 和组件，**包括当前被禁用的**，都会计入 Avatar 性能等级。
:::

:::caution 网格读写已禁用

如果你在 Avatar 的**任何**网格（包括粒子系统）上禁用了 Mesh Read/Write，「三角形」计数会显示为「Mesh Read/Write Disabled」，并且无论 Avatar 实际的三角形数量如何，其性能等级都会立即降为「Very Poor」。

SDK 会就此向你发出警告，并要求你在上传前修复它。
:::

## PC 限制 {#pc-limits}
| Avatar 质量                                                  | Excellent          | Good         | Medium       | Poor         |
|-----------------------------------------------------------------| ------------------ | ------------ | ------------ |--------------|
| 三角形                                                       | 32,000             | 70,000       | 70,000       | 70,000       |
| Bounds 尺寸[^1]                                                 | 2.5m x 2.5m x 2.5m | 4m x 4m x 4m | 5m x 6m x 5m | 5m x 6m x 5m |
| 纹理内存                                                  | 40 MB              | 75 MB        | 110 MB       | 150 MB       |
| 蒙皮网格                                                  | 1                  | 2            | 8            | 16           |
| 基础网格                                                    | 4                  | 8            | 16           | 24           |
| 材质槽位                                                  | 4                  | 8            | 16           | 32           |
| [PhysBones](/common-components/physbones) 组件            | 4                  | 8            | 16           | 32           |
| [PhysBones](/common-components/physbones) 受影响的 Transform   | 16                 | 64           | 128          | 256          |
| [PhysBones](/common-components/physbones) 碰撞体             | 4                  | 8            | 16           | 32           |
| [PhysBones](/common-components/physbones) 碰撞检查次数 | 32                 | 128          | 256          | 512          |
| [Contacts](/common-components/contacts)                         | 8                  | 16           | 24           | 32           |
| [Constraint](/common-components/constraints) 数量              | 100                | 250          | 300          | 350          |
| [Constraint](/common-components/constraints) 深度              | 20                 | 50           | 80           | 100          |
| 动画器                                                       | 1                  | 4            | 16           | 32           |
| 骨骼                                                           | 75                 | 150          | 256          | 400          |
| 光源                                                          | 0                  | 0            | 0            | 1            |
| 粒子系统                                                | 0                  | 4            | 8            | 16           |
| 活跃粒子总数                                          | 0                  | 300          | 1000         | 2500         |
| 网格粒子活跃多边形数                                      | 0                  | 1000         | 2000         | 5000         |
| 启用粒子拖尾                                         | False              | False        | True         | True         |
| 启用粒子碰撞                                      | False              | False        | True         | True         |
| Trail Renderer                                                 | 1                  | 2            | 4            | 8            |
| Line Renderer                                                  | 1                  | 2            | 4            | 8            |
| [射线检测](/avatars/avatar-components/raycast)[^3]              | 1                  | 4            | 8            | 15           |
| Cloth 组件                                                          | 0                  | 1            | 1            | 1            |
| Cloth 顶点总数                                            | 0                  | 50           | 100          | 200          |
| 物理碰撞体                                               | 0                  | 1            | 8            | 8            |
| 物理刚体                                               | 0                  | 1            | 8            | 8            |
| 音频源                                                   | 1                  | 4            | 8            | 8            |

下表描述了 PC Avatar 获得某一性能等级所需满足的要求：


### PC 默认性能等级屏蔽 {#pc-default-performance-rank-blocking}

在 PC 上，默认的最低显示性能等级为「Very Poor」。这意味着默认情况下用户可以看到大多数 Avatar。如果用户启用了[最低显示性能等级](/avatars/avatar-performance-ranking-system#minimum-displayed-performance-rank-on-pc)系统，他们可以选择隐藏性能较差的 Avatar。

不过，如果你的 Avatar 极度缺乏优化，VRChat 可能会阻止你使用它。你可以通过提升其性能等级、确保它不超过 VRChat 的 [Avatar 尺寸限制](/avatars/avatar-size-limits)，然后重新上传该 Avatar 来解决此问题。

## 移动端限制 {#mobile-limits}

Android 和 iOS 上的 VRChat（手机、平板和 Meta Quest）的限制比 PC 上的 VRChat 更严格。

下表描述了移动端 Avatar 获得某一性能等级所需满足的要求：

| Avatar 质量                                                      | Excellent          | Good         | Medium       | Poor         |
|---------------------------------------------------------------------|--------------------|--------------|--------------|--------------|
| 三角形                                                           | 7,500              | 10,000       | 15,000       | 20,000       |
| Bounds 尺寸[^1]                                                     | 2.5m x 2.5m x 2.5m | 4m x 4m x 4m | 5m x 6m x 5m | 5m x 6m x 5m |
| 纹理内存                                                      | 10 MB              | 18 MB        | 25 MB        | 40 MB        |
| 蒙皮网格                                                      | 1                  | 1            | 2            | 2            |
| 基础网格                                                        | 1                  | 1            | 2            | 2            |
| 材质槽位                                                      | 1                  | 1            | 2            | 4            |
| 动画器                                                           | 1                  | 1            | 1            | 2            |
| 骨骼                                                               | 75                 | 90           | 150          | 150          |
| [PhysBones](/common-components/physbones) 组件[^2]            | 0                  | 4            | 6            | 8            |
| [PhysBones](/common-components/physbones) 受影响的 Transform[^2]   | 0                  | 16           | 32           | 64           |
| [PhysBones](/common-components/physbones) 碰撞体[^2]             | 0                  | 4            | 8            | 16           |
| [PhysBones](/common-components/physbones) 碰撞检查次数[^2] | 0                  | 16           | 32           | 64           |
| [Contacts](/common-components/contacts)[^2]                         | 2                  | 4            | 8            | 16           |
| [Constraint](/common-components/constraints) 数量[^2]              | 30                 | 60           | 120          | 150          |
| [Constraint](/common-components/constraints) 深度[^2]              | 5                  | 15           | 35           | 50           |
| 粒子系统                                                    | 0                  | 0            | 0            | 2            |
| 活跃粒子总数                                              | 0                  | 0            | 0            | 200          |
| 网格粒子活跃多边形数                                          | 0                  | 0            | 0            | 400          |
| 启用粒子拖尾                                         | False              | False        | False        | True         |
| 启用粒子碰撞                                          | False              | False        | False        | True         |
| Trail Renderer                                                     | 0                  | 0            | 0            | 1            |
| Line Renderer                                                      | 0                  | 0            | 0            | 1            |
| [射线检测](/avatars/avatar-components/raycast)[^3]                  | 1                  | 2            | 4            | 8            |

[^1]: Bounds Size 由 Avatar 上所有组件的最大尺寸决定。Trail Renderer 和 Line Renderer 不计入此计算。

[^2]: 如果在移动端超出 Very Poor 的数值，无论该 Avatar 当前处于何种「Show Avatar」状态，该 Avatar 上的所有 [PhysBones](/common-components/physbones)、[Contacts](/common-components/contacts) 和 [VRChat Constraints](/common-components/constraints) 都会被移除。

[^3]: VRCRaycast 组件在所有平台上每个 Avatar 的硬性上限为 80 个。

### 移动端默认性能等级屏蔽 {#mobile-default-performance-rank-blocking}
在移动端，最低显示性能等级默认为「Medium」。这意味着用户无法看到任何被评为「Poor」或「Very Poor」的 Avatar。

用户可以将自己的性能等级屏蔽级别设为「Poor」，从而看到「Poor」Avatar。但是，他们不能将屏蔽级别设为「Very Poor」。

例如，如果移动端 Avatar 超过 20,000 个三角形，它就会被评为「Very Poor」，用户在 VRChat 中看不到它。不过，用户可以通过选中该用户并点击「Show Avatar」强制显示「Very Poor」Avatar。

:::warning

未来，VRChat 可能会移除「Very Poor」移动端 Avatar，以及为「Very Poor」移动端 Avatar 使用「Show Avatar」的功能。在制作移动端 Avatar 时请记住这一点。
:::

### 移动端 Avatar 组件限制 {#mobile-avatar-component-limits}

部分 [Avatar 组件](/avatars/avatar-components) 在移动端 Avatar 上有数量限制。你不能超过以下限制：

- 8 个 [PhysBone](/common-components/physbones) 组件
- 64 个受 [PhysBones](/common-components/physbones) 影响的 transform
- 16 个 [PhysBones](/common-components/physbones) 碰撞体
- 64 次 [PhysBones](/common-components/physbones) 碰撞体检查
- 16 个 [Contacts](/common-components/contacts)
- 150 个 [Constraint](/common-components/constraints) 组件
- 依赖深度达到 50 个 [Constraints](/common-components/constraints)

你无法通过「Show Avatar」绕过上述限制。如果移动端 Avatar 超出某个限制，即使在 VRChat 中启用了「Show Avatar」，所有受限的 Avatar 组件也会从该 Avatar 上被移除。

### 移动端被移除的组件 {#mobile-removed-components}
以下组件在移动设备上被禁用，因为它们永远无法出现在 Avatar 上：

  * 光源
  * Cloth 组件
  * Cloth 顶点总数
  * 物理碰撞体
  * 物理刚体
  * 音频源

这些数值仍可能出现在 VRChat 的 Avatar 详情界面中，但它们始终为零。

## 最低显示性能等级 {#minimum-displayed-performance-rank}
你可以选择根据 Avatar 性能等级来管理 Avatar。该选项位于 [Performance Options](https://docs.vrchat.com/docs/vrchat-configuration-window) 菜单中，可通过主菜单 Safety 标签页右上角的按钮进入。

当你在 VRChat 的菜单中选择了某个性能等级后，所有低于该等级的 Avatar 将按以下方式管理其组件/显示。

| 参数                                                                        | 说明                                                                              |
|:---------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| 三角形                                                                        | **Avatar 被替换为[回退 Avatar（Fallback）](https://docs.vrchat.com/docs/avatar-fallback-system)** |
| Bounds 尺寸                                                                      | 无变化                                                                                |
| 纹理内存                                                                   | **Avatar 被替换为[回退 Avatar（Fallback）](https://docs.vrchat.com/docs/avatar-fallback-system)** |
| 蒙皮网格                                                                   | **Avatar 被替换为[回退 Avatar（Fallback）](https://docs.vrchat.com/docs/avatar-fallback-system)** |
| 基础网格                                                                     | **Avatar 被替换为[回退 Avatar（Fallback）](https://docs.vrchat.com/docs/avatar-fallback-system)** |
| 材质槽位                                                                   | **Avatar 被替换为[回退 Avatar（Fallback）](https://docs.vrchat.com/docs/avatar-fallback-system)** |
| PhysBone 组件、Transform、碰撞体、CollisionCheckCount 或 Contact | 移除所有 PhysBone、PhysBone Collider 和 Contact 组件                           |
| 约束数量或深度                                                        | 移除所有 Constraint 组件                                                        |
| 动画器                                                                        | 移除所有动画器（根动画器除外）                                         |
| 骨骼                                                                            | **Avatar 被替换为[回退 Avatar（Fallback）](https://docs.vrchat.com/docs/avatar-fallback-system)** |
| 光源                                                                           | 移除所有光源                                                                       |
| 粒子系统                                                                 | 移除所有粒子系统                                                             |
| 活跃粒子总数                                                           | 移除所有粒子系统                                                             |
| 网格粒子活跃多边形数                                                       | 移除所有粒子系统                                                             |
| 启用粒子拖尾                                                          | 移除所有粒子系统                                                             |
| 启用粒子碰撞                                                       | 移除所有粒子系统                                                             |
| Trail Renderer                                                                  | 移除所有 Trail Renderer                                                              |
| Line Renderer                                                                   | 移除所有 Line Renderer                                                               |
| 射线检测                                                                         | 移除所有射线检测                                                                     |
| Cloth 组件                                                                           | 移除所有 Cloth 组件                                                             |
| Cloth 顶点总数                                                             | 移除所有 Cloth 组件                                                             |
| 物理碰撞体                                                                | 移除所有物理碰撞体                                                            |
| 物理刚体                                                              | 移除所有物理刚体                                                          |
| 音频源                                                                    | 移除所有音频源                                                                |

### PC 上的最低显示性能等级 {#minimum-displayed-performance-rank-on-pc}
在 PC 版 VRChat 中，最低显示性能等级默认设为「Very Poor」。这意味着默认情况下，PC 上不会有任何 Avatar 因性能原因而使其组件或显示受到影响。如果你希望更改这一点，可以在「Medium」、「Poor」或「Very Poor」之间选择。

### 移动端上的 Avatar 性能等级屏蔽 {#avatar-performance-rank-blocking-on-mobile}
在移动设备版 VRChat 中，Avatar 性能等级屏蔽默认设为「Medium」。你可以将其改为「Poor」以看到该等级的 Avatar，但你的性能可能会因此受到影响。

你无法在移动端禁用 Avatar 性能等级屏蔽系统。换言之，被评为「Very Poor」的 Avatar 在移动端始终会由 VRChat 管理其显示，甚至可能完全不显示。

无论你选择哪项设置，如果在移动设备上超出 [Avatar 组件](/avatars/avatar-components) 限制，所有这些组件都会被移除。简而言之，移动端 Avatar 的 Avatar 组件存在硬性上限。

### 覆盖单个 Avatar {#overriding-individual-avatars}
:::danger

**针对 Very Poor Avatar 的「Show Avatar」功能可能会在未来被移除，Very Poor Avatar 也可能从 Android 和 iOS 上完全移除。** 在为移动设备上的 VRChat 制作 Avatar 时请记住这一点。
:::
你可以通过对你希望显示的每个用户选择「Show Avatar」，来覆盖整个系统（以及 Safety 系统）。
