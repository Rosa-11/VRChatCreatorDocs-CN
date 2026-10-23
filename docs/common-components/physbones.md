# PhysBones

PhysBones 是一组组件，可让你为虚拟形象（Avatar）和世界中的对象添加次级运动，使你能够为头发、尾巴、耳朵、衣物、电线、植物等物体添加运动！妥善使用它们会让你的虚拟形象看起来更加动态、真实，让你的世界更具沉浸感。

在 Avatars SDK 中可以找到关于如何在虚拟形象上使用 PhysBones 的示例。要访问它，请从 Unity 窗口顶部的菜单栏进入 `VRChat SDK\Samples`，并选择适合你平台的示例虚拟形象。

## VRCPhysBone

定义一条将由 PhysBones 驱动的骨骼链。它们可用于模拟软体和次级运动，如头发、尾巴、下垂的耳朵等！它有许多配置选项，并可通过多种方式设置。

此外，你和其他人都可以与 PhysBones 进行交互！你可以抓住 PhysBones 来移动它们，并在抓住 PhysBone 的同时扣动 Trigger 来为其“摆姿势”并将其固定在当前位置。你也可以在配置中禁用这些功能，以不允许摆姿势、不允许抓取，或完全不允许碰撞。对于附着在你虚拟形象上的 PhysBones，如果你的交互设置允许，其他人也可以抓取并为你的 PhysBones 摆姿势！

尽管并非为此而设计，但在我们实现自己的 Cloth 组件之前，PhysBones 也可作为合理的布料替代品。

![](/img/avatars/physbone-inspector.png)

### 版本 {#versions}

你可以直接在组件上选择想要使用的 VRCPhysBone 组件版本。默认情况下，创建新组件时会选择最新版本。现有的 PhysBones 将继续使用其先前的版本，除非手动更新并重新上传。

版本 1.0：

- VRCPhysBone 组件的基础版本。

版本 1.1：

- Squishy Bones 更新，允许骨骼被挤压，且长度受运动影响。
- 重力现在表示骨骼在静止状态下旋转幅度的比例。需要正的 Pull，骨骼才会沿重力方向移动。
- 硬度现在表示使骨骼保持其先前朝向的比例。

### 变换 {#transforms}

`Root Transform` - 该组件的起始变换。如果留空，我们假定从该游戏对象开始。  
`Ignore Transforms` - 被忽略的变换列表，这些变换不应受该组件影响。被忽略的变换会自动包含该变换的所有子对象。  
`Ignore Other Phys Bones` - 如果启用，该 PhysBone 会忽略其他 PhysBones 以及其在场景层级中位于自身下方且受影响的变换。此选项默认启用，禁用可能导致不受支持的行为。  
`Endpoint Position` - 用于在链条的每个端点创建额外骨骼的向量。仅当值非零时使用。通常你会希望沿 +Y 方向增大该值，+Y 指向骨骼的“上方”。  
`Multi-Child Type` - 当存在多条骨骼链时根骨骼的行为。共有三种模式：

 如果设置为 **Ignore**，根骨骼将不会移动，并会忽略物理。这适用于虚拟形象上的头发之类的情况，因为你可以只在根部使用一个 PhysBone 组件来影响所有头发骨骼！

 如果设置为 **First**，根骨骼将与层级中的第一条骨骼链形成一条连续的链。其他每条链仍然有效，但它们将从各自链的第一根骨骼开始，而不是像第一条链那样从根开始。

 如果设置为 **Average**，根骨骼的运动将是所有其他链的平均值。这意味着每条链的基部都可以移动。 

:::caution

如果你使用的是单根骨骼，或是带若干子骨骼（但没有孙骨骼）的单根骨骼，你**必须**定义端点位置！

例如，如果你将 PhysBone 组件放在下面任意一个 `RootBone` 上，你**必须**定义 **Endpoint Position**，PhysBones 才能正常工作。这与 Dynamic Bones 不同！
 
单根骨骼 
- `RootBone`

多个子骨骼，单个根

 - `RootBone`
 - `ChildBone1`
 - `ChildBone2`
 - `ChildBone3`
 - `ChildBone4`
 
你也可以通过在每个 `ChildBone` 之后添加“末端骨骼”来解决此问题，但这涉及编辑骨架。

:::

### 作用力 {#forces}

**Integration Type** 定义了用于模拟受该组件影响的任何变换运动的数学类型。根据你的选择，Forces 部分中可用的选项会发生变化。你可以从以下两种中选择：

- `Simplified` 是一种更稳定的方法，感觉稍慢、对外部冲量和作用力的反应较弱，但更易于配置。
- `Advanced` 稳定性较低，但允许更复杂的配置，并且通常对外部冲量和作用力的反应更强。  
  在默认设置下，这两种模式的表现相当相似，但调整设置并进行测试会很快揭示它们的差异。

:::info

下面的选项大多数（即使不是全部）都允许通过按滑块旁边的 C 按钮来使用曲线（Curves）。曲线让你可以沿骨骼链的长度调整数值，并允许在骨骼链内实现**非常**复杂的设置！

事实上，大多数 PhysBones 设置都允许使用曲线！学会使用它们，你的 PhysBones 将会看起来非常出色！

:::

![physbones-054e326-2022-04-19_11-32-12_Unity.png](/img/avatars/physbones-054e326-2022-04-19_11-32-12_Unity.png)

`Pull` - 用于将骨骼拉回其静止位置的作用力大小。  
`Spring` - 骨骼在尝试到达其静止位置时的摆动幅度。仅在 Simplified Integration Type 中可用。  
`Momentum` - 骨骼在尝试到达其静止位置时的摆动幅度。仅在 Advanced Integration Type 中可用。尽管描述相同，但其效果与 Spring 略有不同。  
`Stiffness` - 骨骼尝试保持在静止位置的强度。仅在 Advanced Integration Type 中可用。  
`Gravity` - 应用于骨骼的重力大小。正值将骨骼向下拉，负值向上拉。  
`Gravity Falloff` - 仅在 Gravity 非零时可用。它控制在静止位置时移除多少重力。值为 1.0 表示骨骼在静止位置时重力完全不影响它。这让你可以在骨骼偏离初始位置时获得重力效果，而不影响骨骼的静止状态。

使用 Gravity Falloff 参数的一种方式是：如果你的虚拟形象的头发在正常站立时已经建模成你想要的姿势，你可以使用 1.0 的重力衰减。这样，当你只是站在那里时，重力不会影响你，你的头发会停留在其建模位置。如果你的头发被建模成水平向外 45 度，而你希望它受重力影响以形成漂亮的弧度（但既不是完全水平向外，也不是完全垂直向下），滑块允许你微调，使用类似 0.5-0.8 的值，使静止姿势下只有一部分重力。

`Immobile Type` 改变 `Immobile` 的工作方式。 

如果设置为 **All Motion**，`Immobile` 会减弱根据根变换的父级计算出的任何运动。这是新 PhysBones 和转换后的 Dynamic Bones 的**默认模式**。在此模式下，场景空间或游玩空间中的所有 PhysBone 移动都会被 `Immobile` 系数减弱。

如果设置为 **World (Experimental)**，`Immobile` 仅抵消以场景根变换为参照的位移运动。通过动画或 IK 产生的运动仍会正常影响骨骼。_此模式未来可能会改变！_

对于你正在使用的虚拟形象而言，这意味着在游玩空间中走动仍会正常影响 PhysBones 的移动，但移动（推动摇杆移动）的运动会被 `Immobile` 系数减弱。

### 限制 {#limits}

设置 Limits 可让你限制 PhysBone 链可移动的量。这在某些情况下很有用，例如在虚拟形象上使用时避免头发穿入头部，并且它比碰撞体**性能好得多**！

此外，在配置 Limits 选项时，当你选中 PhysBone 链，Scene 视图中会显示这些限制的可视化效果。这些在微调 Limits 时非常有用！

`Limit Type` 有几种模式。它们都允许以 `Pitch`、`Yaw` 和 `Roll` 的形式调整 `Rotation`——或者分别沿 X、Y、Z 轴调整。

#### 无 {#none}

`None` 表示此骨骼链未启用任何限制。没有配置选项。

#### 角度 {#angle}

![physbones-b7abe1f-2022-04-19_11-49-26_Unity.png](/img/avatars/physbones-b7abe1f-2022-04-19_11-49-26_Unity.png)

`Angle` 表示骨骼链将被限制在某个 `Max Angle` 内，该角度以 `Rotation` 定义的轴为中心。这在 Scene 视图中可视化为一个圆锥。

#### 铰链 {#hinge}

![physbones-b7723cc-2022-04-19_11-50-04_Unity.png](/img/avatars/physbones-b7723cc-2022-04-19_11-50-04_Unity.png)

`Hinge` 表示骨骼链将被限制在由 `Rotation` 定义的平面内某个 `Max Angle` 范围内。这可可视化为圆的一部分，类似于披萨或派的一块。

#### 极坐标 {#polar}

![physbones-824db3c-2022-04-19_11-51-22_Unity.gif](/img/avatars/physbones-824db3c-2022-04-19_11-51-22_Unity.gif)

`Polar` 稍微复杂一些。如果你取一个 `Hinge` 并沿 `Yaw` 扫过一定角度，就会在 `Polar` 坐标系中得到一个球面片段。你可以配置 `Max Pitch` 和 `Max Yaw` 来调整该片段的大小，并使用 `Rotation` 定义该片段在球面上的位置。`Polar` 的可视化尤其有用。

不要过度使用 Polar 限制，因为它们有非零的性能开销。使用大量（粗略地说：超过 64 个）可能会导致一些问题。如果你的 `Max Pitch` 和 `Max Yaw` 值相近或相同，`Angle` 限制就足够了，而且在性能上开销更小。

### 碰撞 {#collision}

`Radius` - 每根骨骼周围的碰撞半径，单位为米。同时用于碰撞和抓取。  
`Allow Collision` - 允许与此组件指定的碰撞体之外的碰撞体发生碰撞。  
`Colliders` - 专门与这些骨骼发生碰撞的碰撞体列表。

`Allow Collision` 有三个可用选项：

如果设置为 **True**，此 PhysBone 将与全局碰撞体碰撞。这包括由各自虚拟形象定义的每位玩家的双手，以及虚拟形象上或世界中任何自定义的全局碰撞体。

如果设置为 **False**，此 PhysBone 仅与 `Colliders` 列表中列出的碰撞体碰撞。

如果设置为 **Other**，你将获得更多选项，可根据这是虚拟形象还是世界来控制碰撞行为。对于虚拟形象上的 PhysBone，你可以筛选仅与此虚拟形象以及其它虚拟形象/世界上的碰撞体碰撞。对于世界中的 PhysBone，你可以设置它是否能响应世界、虚拟形象、物品或三者混合体上的碰撞体。

### 拉伸与挤压 {#stretch--squish}

`Stretch Motion` - 运动对骨骼拉伸/挤压的影响程度。值为零意味着骨骼只会因抓取或碰撞而拉伸/挤压。  
`Max Stretch` - 骨骼可拉伸的最大量。此值是原始骨骼长度的倍数。[注意：最大边界](/common-components/physbones#maximum-bounds)  
`Max Squish` - 骨骼可收缩的最大量。此值是原始骨骼长度的倍数。

### 抓取与摆姿势 {#grab--pose}

`Allow Grabbing` - 允许玩家抓取骨骼。在虚拟形象上，你可以选择在穿戴该虚拟形象的用户和其他用户之间进行筛选。  
`Allow Posing` - 允许玩家在抓取后为骨骼摆姿势。在虚拟形象上，你可以选择在穿戴该虚拟形象的用户和其他用户之间进行筛选。  
`Grab Movement` - 控制被抓取的骨骼如何移动。值为零时，骨骼使用 pull 与 spring 到达被抓取的位置。值为一时，骨骼会立即移动到被抓取的位置。  
`Snap To Hand` - 当骨骼被抓取时，它会吸附到抓取它的骨骼上。

### 选项 {#options}

`Parameter` - 仅对虚拟形象上的 PhysBones 可用的选项（关于如何从世界中的 PhysBone 获取此数据，请参阅[世界中的 PhysBone Udon 访问](/common-components/physbones#physbone-udon-access-in-worlds)）。这是一个前缀，用于向虚拟形象控制器提供多个参数。例如，在以下各项中，将 Parameter 设置为 `Tail` 会将 `{parameter}` 替换为 `Tail`

一旦 `Parameter` 设置为任意值，以下参数将被设置到你的虚拟形象的动画器上： 

- `{parameter}_IsGrabbed` [Bool] - 骨骼当前是否正被抓取

- `{parameter}_IsPosed` [Bool] - 骨骼在被抓取后是否已被摆姿势

- `{parameter}_Angle` [Float] - 范围 0.0-1.0。末端骨骼相对其原始静止位置形成的归一化 180 度角。换句话说，如果你将骨骼完全扭转至与其起始方向相反，该参数的值将为 1.0。

- `{parameter}_Stretch` [Float] - 范围 0.0-1.0。骨骼接近其最大拉伸长度的程度。

- `{parameter}_Squish` [Float] - 范围 0.0-1.0。骨骼接近其最大收缩长度的程度。

`Is Animated` - 允许对骨骼变换进行动画。每帧骨骼静止位置将根据动画内容更新。必须启用此项，PhysBone 链中的任何骨骼（包括根骨骼！）才会遵循应用于它的动画。

`Reset When Disabled` - 当此组件被禁用时，骨骼将自动重置到其默认位置，参数值将重置为 false/零。

### Gizmos

这些设置控制 PhysBone 在 Unity 编辑器的 Scene 视图中的显示方式。它们不会影响 PhysBone 的行为。

`Show Gizmos` - 是否在 Scene 视图中显示此组件的 Gizmos。如果你看不到它们，请确保你也在 Scene 视图本身中启用了 Gizmos。  
`Bone Opacity` - 设置表示骨骼本身的 Gizmos 的不透明度。  
`Limit Opacity` - 设置表示应用于骨骼的移动限制的 Gizmos 的不透明度。

### 重要说明、使用提示等 {#important-notes-usage-tips-etc}

**不要让 Constraint 和 PhysBone 组件影响同一个游戏对象**，因为这会导致执行顺序问题。

请改为将 Constraint 应用于父游戏对象。你仍然可以将 Constraint 的源变换设置为原始游戏对象。

:::caution 

**虚拟形象上的 PhysBones 在 Meta Quest 上有硬性限制。** 这样做是为了防止 Meta Quest 设备上的性能下降，这些设备通常 CPU 资源已经不足。

你可以查看这些限制，即 [Minimum Displayed Performance Rank](/avatars/avatar-performance-ranking-system#mobile-limits) 文档中描述的 Quest 的 Very Poor 限制。

此硬性限制不适用于世界，但如果你的世界上架于移动端，你仍应考虑限制 PhysBones，以避免造成性能问题而将玩家挤出你的世界。

:::

#### 每组件限制 {#per-component-limitations}

**单个 PhysBone 组件一次影响的变换不能超过 256 个。** 这包括根骨骼以及所有子对象。_这也影响虚拟形象上的 Dynamic Bone 转换！_ 

但是，你首先应尽量避免需要动画这么多变换。尝试将链中的骨骼向上合并到其直接父级。社区制作的工具（如 Cat's Blender Plugin）可以为你完成此操作。

#### 更改 PhysBone 属性 {#changing-physbone-properties}

PhysBone 属性（如 Spring、Pull、Stiffness 等）在初始化时设置。

在虚拟形象上，这些值旨在保持恒定，**无法被动画**。但是，如果你为 PhysBone 组件的某个属性设置动画，然后将该组件动画关闭再打开，你*可能*会得到你想要的行为。请注意，这不是受支持的为这些属性设置动画的方法，且在未来变更中也不会被支持。（换句话说，它可能会失效，如果失效，我们不会尝试修复它。）

在世界中，你可以选择通过 Udon 脚本更改 PhysBone 的属性，不过你仍应尽量限制这样做的频率。更多信息请参阅[世界中的 PhysBone Udon 访问](/common-components/physbones#physbone-udon-access-in-worlds)。

#### Humanoid 骨骼 {#humanoid-bones}

**不要将 Humanoid 骨骼设置为 PhysBone 根骨骼。** 换句话说，不要将 Hip、Spine、Chest、Upper Chest、Neck、Head 或任何肢体骨骼设置为根。这会导致严重问题。

请改为复制你想用作根的骨骼，并将所有你想动画的子骨骼重新父级到该新的复制根上。这应在 Blender 中完成。社区制作的工具（如 Cat's Blender Plugin）可以为你完成此操作。

#### PhysBone 旋转 {#physbone-rotation}

与 Dynamic Bones 不同，**PhysBone 链的根骨骼允许旋转。** 但它不能平移。这在某些设置下可能会产生一些后果——请自行尝试以了解其表现。

#### PhysBone AV3 参数 {#physbone-av3-parameters}

在影响 AV3 虚拟形象上的参数时，**无需使用由 `VRCExpressionParameters` 对象定义的同步参数**。这些参数已经在本地和远程机器上更新，因为两者都会运行 PhysBones。

#### PhysBone Immobile 行为 {#physbone-immobile-behavior}

Dynamic Bones 的 `Inert` 值基于组件放置的位置，而非根变换。这可能是 Dynamic Bones 的一个缺陷。因此，PhysBones 的 `Immobile` 值基于根变换。这在某些情况下可能会影响行为。

### 最佳组件用法 {#optimal-component-usage}

由于 PhysBones 的多线程特性，将所有骨骼放入单条链并不总是最高效的。多个组件让我们可以将工作拆分到多个线程上。不过，你仍应尽量减少组件数量……但在虚拟形象或世界对象上拥有几个组件，并不像使用 Dynamic Bones 时那么糟糕。

如果你*真的*需要一个数字，当单个组件影响的变换超过 128 个时，你应考虑拆分骨骼链集合。如果你有一条 256 根骨骼的裙子，并且它在根部处分叉，将其拆分为两个或三个组件是可行的。

但是，如果你处理的只是大约 32 根骨骼……那就别担心了。你大概能看出，这些并不是严格的规则！我们将来可能会在某个设置看起来应该以另一种方式配置时引入一些软性警告。

### 最大边界 {#maximum-bounds}

每个 VRCPhysBone 组件都有一个包围盒，它会随着骨骼移动而增大和缩小。这些包围盒有助于检测玩家接触和抓取 PhysBones 时的碰撞。为了提高效率，包围盒被强制限制在最大 10×10×10 米。PhysBones 可以超出此范围并继续按预期工作。但是，玩家可能因其所处位置而无法接触或抓取那些骨骼。

包围盒只考虑具有碰撞且半径大于零的骨骼。在你需要提供极长拉伸的情况下，只要在拉伸点之外仍存在具有碰撞的骨骼，你就能避免触及此最大边界限制。

### 世界中的 PhysBone Udon 访问 {#physbone-udon-access-in-worlds}

尽管最初是为虚拟形象设计的，PhysBones 也可以在世界中使用。在世界中，你应改用 Udon 脚本，而不是使用动画器来与 PhysBone 交互。以下是世界中使用 PhysBone 时的主要区别：

- 使用类型 `VRCPhysBone` 访问 PhysBone，它位于命名空间 `VRC.SDK3.Dynamics.PhysBone.Components` 中。
- 要检测 PhysBone 何时被抓取、释放、摆姿势或取消摆姿势，你可以将 UdonGraph 或 UdonSharp 行为附加到与 PhysBone 组件相同的游戏对象上，并使用以下事件：
  - `OnPhysBoneGrabbed(PhysBoneGrabbedInfo physBoneInfo)` - 当 PhysBone 被玩家抓取时调用。
  - `OnPhysBoneReleased(PhysBoneReleasedInfo physBoneInfo)` - 当 PhysBone 被玩家松开抓取时调用。
  - `OnPhysBonePosed(PhysBonePosedInfo physBoneInfo)` - 当 PhysBone 被玩家锁定为某个姿势时调用。
  - `OnPhysBoneUnPosed(PhysBoneUnPosedInfo physBoneInfo)` - 当 PhysBone 的姿势被释放时调用。
- 你可以分别使用属性 `IsGrabbed` 和 `IsPosed` 检查 PhysBone 当前是否被抓取或已摆姿势。
- 你可以随时使用属性 `Angle`、`Squish` 和 `Stretch` 读取 PhysBone 的角度、挤压和拉伸值。
- 你可以通过相应命名的字段（`pull`、`stretch` 等）以及这些属性可使用的曲线（`pullCurve`、`stretchCurve` 等）读取和设置 PhysBone 的所有属性。
    - 如果你更改了这些属性，必须在完成所有更改后调用 PhysBone 上的 `ApplyConfigurationChanges()`，否则它们实际上不会被应用回 PhysBone。
    - **对 PhysBones 的配置更改开销可能很大！** 如果你做得太过，可能会造成性能问题，使你的世界对玩家而言体验不佳——避免过于频繁地更改这些属性，并尽量在应用之前批量合并尽可能多的更改。
- 如果你的 PhysBone 允许抓取或摆姿势，你可以使用下面的 Udon 方法强制停止这些交互。**这些方法仅在本地客户端运行**，因此如果你想为所有人释放抓取或姿势，你需要从所有客户端都会接收到的[网络事件](/worlds/udon/networking/events)中调用它们。
    - 当你调用 `ReleaseGrabs()` 时，如果本地玩家当前正抓着该 PhysBone，其将被强制松开。
    - 当你调用 `ReleasePoses()` 时，应用于该 PhysBone 的任何冻结姿势都将被释放，使其恢复自然形状。

## VRCPhysBoneCollider

定义一个碰撞体，它会对配置正确的 PhysBones 产生影响。

![](/img/avatars/physbone-collider-inspector.png)

`Root Transform` - 放置此碰撞体的变换。如果为空，我们使用该游戏对象的变换。  
`Global Collision` - 允许其他 PhysBones 与此碰撞体发生潜在碰撞，即使它不在它们的 Colliders 列表中。有关此属性的更多信息，请参见下文。  
`Shape Type` - 此碰撞体使用的碰撞形状类型。你可以选择 Sphere、Capsule 或 Plane 碰撞体。Global Collision 仅在 Sphere 和 Capsule 碰撞体上受支持。  
`Radius` - 碰撞体从原点延伸的大小。  
`Height` - 胶囊体沿 Y 轴的高度，包括两端的半球。仅在 Shape Type 设置为 Capsule 时使用。  
`Position` - 相对根变换的位置偏移。  
`Rotation` - 相对根变换的旋转偏移。  
`Inside Bounds` - 启用后，此碰撞体将把骨骼包含在其边界内，而不是将它们挡在外面。  
`Bones As Sphere` - 启用后，此碰撞体将把 PhysBone 碰撞半径视为以骨骼位置为中心的球体，而不是沿骨骼长度延伸的胶囊体。

`Global Collision` 有三个可用选项：

如果设置为 **True**，所有 PhysBones 都会将此碰撞体视为其 `Colliders` 列表的一部分。在决定是否实际处理碰撞时，PhysBone 的 Allow Collision 规则仍会生效。

如果设置为 **False**，此碰撞体仅应用于在其 `Colliders` 列表中列出它的 PhysBones。

如果设置为 **Other**，你将获得更多选项，可根据这是虚拟形象还是世界来控制碰撞行为。对于虚拟形象上的 PhysBone 碰撞体，你可以筛选仅与此虚拟形象以及其它虚拟形象/世界上的 PhysBones 碰撞。对于世界中的 PhysBone 碰撞体，你可以设置它是否能响应世界、虚拟形象、物品或三者混合体上的 PhysBones。在决定是否实际处理碰撞时，PhysBone 的 Allow Collision 规则仍会生效。

虚拟形象最多只能有四个启用了 Global Collision 的 PhysBone 碰撞体。世界对全局碰撞体没有限制。

### 标准碰撞体 {#standard-colliders}

在虚拟形象上，一组“标准碰撞体”在 Avatar Descriptor 中定义，位于名为“Colliders”的部分。此部分让你可以定义每个虚拟形象上都存在的若干标准碰撞体。如果你不做任何改动，它们将被自动设置，但也可以对其进行调整以完全适合你的虚拟形象。这些碰撞体不影响性能等级。

- Head
- Torso
- Hands L/R
- Feet L/R
- Fingers L/R
  - Index
  - Middle
  - Ring
  - Little

这些碰撞体主要使用[内置身体部位标签](/common-components/contacts/built-in-contact-tags#body-parts)充当[接触器](/common-components/contacts)的发送方，其他人可以用他们的虚拟形象来检测这些标签。不过，手指和手部碰撞体也被用于创建全局 PhysBone 碰撞体，这些碰撞体可用于影响其他人的 PhysBones 以及世界中的 PhysBones。

### 世界中的碰撞体 Udon 访问 {#collider-udon-access-in-worlds}

与 PhysBones 类似，在世界中工作时，可以使用 Udon 访问和修改 PhysBone 碰撞体的主要属性。在世界中，你应使用 Udon 脚本而不是动画器来修改碰撞体。

- 使用类型 `VRCPhysBoneCollider` 访问 PhysBone 碰撞体，它位于命名空间 `VRC.SDK3.Dynamics.PhysBone.Components` 中。
- 你可以读取和设置 PhysBone 碰撞体的以下属性：`shapeType`、`radius`、`height`、`position` 和 `rotation`。
    - 如果你更改了这些属性，必须在完成所有更改后调用 PhysBone 碰撞体上的 `ApplyConfigurationChanges()`，否则它们实际上不会被应用回碰撞体。
    - **对 PhysBone 碰撞体的配置更改开销可能很大！** 如果你做得太过，可能会造成性能问题，使你的世界对玩家而言体验不佳——避免过于频繁地更改这些属性，并尽量在应用之前批量合并尽可能多的更改。

## VRCPhysBoneRoot

此组件让你可以为一个或多个 PhysBone 组件定义移动根，并设置它们在移动时应以固定时间还是实时时间更新。此组件是可选的，且仅在世界中可用。

![](/img/avatars/physbone-root-inspector.png)

`Timing` - 设置此组件所附加的 GameObject 的所有子级 VRCPhysBone 链所使用的计时模式。

你可以从三种计时选项中选择：
- `Automatic`（默认）：子级 PhysBones 自动决定是以固定时间还是实时时间移动。它可以根据变换的移动方式在两者之间动态切换，以最大限度地减少可见抖动。
- `Fixed Time`：子级 PhysBones 以固定时间更新，即使用与 Unity 的 `FixedUpdate()` 回调相对应的固定时间步长。
- `Real Time`：子级 PhysBones 以实时时间更新，即使用与 Unity 的 `Update()` 回调相对应的可变时间步长。

当没有手动定义移动根时，PhysBones 会尝试自动确定它们应使用的更新计时。

## 自动转换 Dynamic Bone {#automatic-dynamic-bone-conversion}

:::note

世界中的 Dynamic Bone 组件不会自动转换为 PhysBones。我们建议改用 PhysBones，以提升性能并允许玩家抓取和与 PhysBones 交互。

:::

当虚拟形象加载时，客户端始终会自动将虚拟形象上的 Dynamic Bones 转换为 PhysBones。这样做是为了提高整体性能，也是虚拟形象之间交互所必需的。

默认情况下，Dynamic Bone 转换使用 Advanced 模式，因为我们能够使用 Advanced 集成方法更精确地匹配 Dynamic Bone 行为。此外，DB 转换的 Multi-Child 类型使用 Ignore。这可能会在某些边缘情况的 Dynamic Bone 设置中造成问题，但在转换过程中，使用 First 或 Average 在几乎所有情况下都会导致不想要的行为。

**需要注意的是，Dynamic Bones 和 PhysBones 并不完全相同。** 程序内转换过程会尽力尽可能接近地匹配行为，但它永远不会完美！自动转换的目标是让大多数设置能相当好地工作且不出现故障，而不是完美地复制行为。_预期是，所有为 VRChat 制作虚拟形象的用户现在都已转而使用 PhysBones 而不是 Dynamic Bones。_

### 手动转换 Dynamic Bone {#manual-dynamic-bone-conversion}

你可以选择使用 SDK 将你的虚拟形象从 Dynamic Bones 转换为 PhysBones。 

此过程会删除你虚拟形象上先前的 Dynamic Bone 组件，且不易逆转。因此，在尝试此转换之前，请备份你的虚拟形象。

你可以在 SDK 中通过查看 Build Control Panel 访问此工具，或在 Unity 菜单中的 `VRChat SDK/Utilities/Convert DynamicBones to PhysBones` 下访问它。为此，你必须事先选中虚拟形象。

### 未迁移的 Dynamic Bone 组件 {#unmigrated-dynamic-bone-components}

Dynamic Bones 中的某些功能和行为在 PhysBones 中不存在，因此不会被迁移。

`Force` - Dynamic Bone 在 X 或 Z 方向上的 `Gravity` 和 `Force` 值会被忽略，因为它们在 PhysBones 中没有等价项。

### Dynamic Bone 弃用 {#dynamic-bone-deprecation}

在虚拟形象方面，Dynamic Bones 已从 VRChat 中完全移除。这意味着所有仍在使用 Dynamic Bones 的旧虚拟形象现在都将改用自动生成的 PhysBones。

Dynamic Bones 目前在世界中仍可使用，但我们最终可能会以类似虚拟形象的方式弃用它们，即在世界加载时自动将其转换为 PhysBones。
