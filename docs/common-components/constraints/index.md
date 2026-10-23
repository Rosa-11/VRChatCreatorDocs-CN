# 约束 {#constraints}

VRChat提供了自己的自定义约束系统，它允许你的虚拟形象（Avatar）或世界中的变换相对于其他变换移动、旋转和缩放。

它旨在对等地替代Unity的约束系统，并基于VRChat Avatar通常使用约束的方式增加了一些额外功能。如果你以前从未使用过约束，参考[Unity的约束文档](https://docs.unity3d.com/Manual/Constraints.html)可能会有所帮助。

在创建Avatar时，你应当使用VRChat的约束而不是Unity的约束。如果你的Avatar包含任何Unity约束，它们会在你的Avatar于游戏内加载时自动转换为VRChat约束，因此直接使用VRChat约束能让你更准确地了解Avatar的实际行为，并获得更准确的性能等级。

至于世界，你可以选择使用VRChat约束或Unity约束，甚至将两者组合使用。注意不要过度使用Unity约束，因为场景中同时存在过多Unity约束会导致严重的性能问题。与使用Unity约束相比，使用VRChat约束可提供额外的可选功能，也可能改善你的世界性能。

本页侧重于总体理解和Avatar性能。如果你想通过Udon或使用C#编写的SDK工具与约束交互，请查看[VRChat Constraints的技术API](/common-components/constraints/constraints-api)。

## 约束类型 {#constraint-types}

VRChat目前提供以下约束类型，它们的设计目标是与Unity六种内置约束的工作方式相同：
- [**VRCAimConstraint**](/common-components/constraints/vrc-aim-constraint) - 旋转目标变换，使其朝向源。你可以自定义将哪个方向视为前方。
- [**VRCLookAtConstraint**](/common-components/constraints/vrc-look-at-constraint) - 简化版的Aim约束，会旋转目标变换，使其正Z轴始终朝向源。
- [**VRCParentConstraint**](/common-components/constraints/vrc-parent-constraint) - 像目标变换是其源的子级一样，移动并旋转目标变换。
- [**VRCPositionConstraint**](/common-components/constraints/vrc-position-constraint) - 更改目标变换的位置，使其与源的位置匹配。
- [**VRCRotationConstraint**](/common-components/constraints/vrc-rotation-constraint) - 更改目标变换的旋转，使其与源的旋转匹配。
- [**VRCScaleConstraint**](/common-components/constraints/vrc-scale-constraint) - 更改目标变换的缩放，使其与源的缩放匹配。

访问上面的链接，了解每种约束类型可用设置的更多信息。

## 高级约束设置 {#advanced-constraint-settings}

高级设置折叠面板包含VRChat约束提供的一些额外功能。

### Target Transform

`Target Transform`设置允许你更改此约束所针对的变换。默认情况下，此设置为空，约束会应用到约束组件所附加的那个变换上。请注意，无法通过动画更改此变换。

如果你想将Avatar或世界预制件上的所有约束组件集中放在一处，或者你正在搭建一个使用约束的系统并希望它能在不同的Avatar或世界预制件之间转移，这一设置可能会很有用。

### Solve In Local Space

通常，约束在世界空间中解算，这意味着它会匹配其源的**世界**位置/旋转/缩放。如果启用了`Solve In Local Space`选项，约束将改为匹配其源的**局部**位置/旋转/缩放。

这在诸如为Avatar设置额外的假肢体等情况下很有用。例如，你可能有一串局部解算的旋转约束，它们分别引用Avatar真实手臂的每根骨骼，这会使该链条随着真实手臂的移动而旋转。不过，这并不限于旋转约束——所有类型都可以使用局部解算。

下面的视频以旋转约束为例，说明了全局解算与局部解算之间的差异。在此片段中，中间和右侧的箭头各自使用旋转约束来匹配左侧箭头的旋转，其中中间箭头使用世界空间解算，右侧箭头使用局部空间解算。注意，世界解算的约束始终匹配目标在世界空间中的旋转。相比之下，局部解算的约束始终匹配目标相对于其父骨骼的朝向。

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/6iBJ5QntrMU?si=YxAkg17x3LvinnL_" title="YouTube视频播放器" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Freeze To World

启用`Freeze To World`后，约束会忽略其所有源，并将目标变换锁定在世界空间中。在禁用`Freeze To World`之前，该变换的位置/旋转/缩放将保持不变。

此设置在通过Avatar动画或世界Udon脚本开启和关闭时效果最好。例如，在Avatar上：

 1. 为`Freeze To World`设置一个[表情开关](/avatars/expression-menu-and-controls/#types-of-controls)，并默认将其禁用。
 2. 当在你的动画剪辑中启用`Freeze To World`时，变换会被锁定在世界空间中。
 3. 当在你的动画剪辑中禁用`Freeze To World`时，变换会重新跟随约束的源。

这允许Avatar将物体放置在世界中的固定位置。当你走开时，物体不会跟随你的Avatar。父约束最适合用于此目的，因为它们可以同时冻结目标变换的位置_和_旋转。不过，`Freeze To World`也可用于所有其他约束类型。

要在世界中用约束实现此效果，你应使用Udon脚本而不是动画剪辑来更改`FreezeToWorld`的值。

`Freeze To World`属性只影响在约束设置部分中被选为冻结的轴。如果你想要让物体完全停在原地，必须冻结所有轴。否则，那些轴不会被更新，变换也不会保持锁定在世界空间中。

:::note

启用`Freeze To World`并不等同于禁用约束组件！

- 当约束被禁用时，受影响的变换会停止在**局部**空间中移动。它仍然会跟随包含它的物体的移动（例如，在Avatar上时跟随你的移动）。
- 当你启用`Freeze To World`时，约束会主动在局部空间中移动该变换，以防止它在**世界**空间中移动。

此外，默认开启`Freeze To World`意味着约束会在加载进场景的瞬间将自身冻结在其起始位置/旋转/缩放处。这并不是将其放置在世界空间中某个特定位置/旋转/缩放处的可靠方法。

:::

#### Rebake Offsets When Unfrozen

启用`Rebake Offsets When Unfrozen`后，当约束因禁用`Freeze To World`而解除冻结时，它会重新计算其相对于源的偏移量，而不是像通常那样保留其原始偏移量。

切换此值本身没有任何效果——它只是决定当`Freeze To World`被禁用时应当发生什么。

## 性能 {#performance}

本节仅适用于Avatar上使用的约束，因为世界不会应用性能等级。

有两个与约束相关的性能类别。关于各平台的限制，请参阅[性能等级](/avatars/avatar-performance-ranking-system#avatar-performance-ranks---value-maximums-per-rank)页面。

### 约束数量 {#constraint-count}

约束数量相当直白——它是附加到你的Avatar上的约束总数，包括已禁用的约束。这既包括VRChat约束，也包括Unity约束。当你的Avatar在游戏内加载时，Unity约束会自动转换为VRChat约束。

减少约束总数可以改善Avatar的性能。

### 约束深度 {#constraint-depth}

当你在Avatar上设置一串约束时（例如，沿额外肢体设置一串旋转约束），这些约束需要按特定顺序逐个解算，从链条底部的约束一直到链条末端的约束。如果这条链上有3个约束，那么该链的约束深度就是3。Avatar的整体约束深度评级是整个Avatar上最长的一条依赖链。

可以通过缩短最长的约束链来降低约束深度。请记住，此类别寻找的是*最长*的链，而不是所有链的总和——如果你的Avatar有若干条手臂的深度都是3，该Avatar的整体评分仍将是3（假设Avatar上其他地方没有更长的链）。

约束深度很重要，因为与仅仅统计约束总数相比，它能更好地估计Avatar上约束的性能表现。通过合理安排约束来尽量减少它们之间的依赖，许多约束就能同时运行，与约束必须一个接一个运行的情况相比，这会带来更好的性能。

:::info[使用Unity约束时的约束深度]

只有当Avatar完全使用VRChat约束时，其约束深度才能被准确计算。

如果你的Avatar包含任何Unity约束，约束深度很有可能会被高估，因为该类别假定Unity约束一次只能运行一个。你可以使用SDK控制面板中相关的自动修复选项，将Avatar上的所有Unity约束转换为等效的VRChat约束。

:::

## 使用提示 {#usage-tips}

- 如果你的约束似乎不起作用，请确认它确实在运行。
	- `Is Active`选项应处于启用状态。
	- 组件本身应处于启用状态（其名称旁边的勾选框），并且应附加到一个处于激活状态的游戏对象上。
	- 确认`Lock`选项已启用。否则，约束会重新计算其`At Rest`和`Offset`值，而不是影响变换。
- `Target Transform`引用无法通过动画或Udon脚本更改。这是因为更改约束所针对的变换会在运行时被缓存，以提升性能。如果你想更改约束针对的变换，可以改为在多个具有不同目标变换的约束组件之间切换。
- 如果可能的话，不要使用动画或Udon脚本更改约束引用哪些变换。在运行时更改变换引用可能会给你的Avatar带来性能问题，因为每次引用发生变化时，约束可能都需要重新解算。
    - 这具体指的是更改约束对某个变换的_引用_——对变换的位置、旋转和缩放做动画是没问题的！
	- 在Avatar上，由于技术限制，无法为单个源对变换引用做动画。作为更简单的替代方案，你可以设置多个使用不同变换的源，并改为对它们的权重做动画。
