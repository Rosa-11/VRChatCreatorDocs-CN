import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 动画器参数 {#animator-parameters}

:::caution

本文档需要你了解 Unity 的 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/AnimationParameters.html">Animator Controllers</UnityVersionedLink> 和 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AnimatorController.html">Animation Parameters</UnityVersionedLink>。

:::

你可以在虚拟形象的 [Playable Layers](/avatars/playable-layers/) 中使用动画器参数，以控制或影响虚拟形象的动画器状态。

- 部分参数是[内置于 VRChat](#built-in-parameters)的，你可以在任何 Playable Layer 上使用它们。
- 你也可以创建自己的[自定义参数](#custom-parameters)，这需要创建一个[Expression Parameters 资源](#expression-parameters-asset)。

:::tip 

你应当假设参数随时都可能发生变化。避免「死胡同」——如果你的状态没有出口，虚拟形象的动画器可能会崩溃。

:::
## 内置参数 {#built-in-parameters}



你可以通过将 VRChat 内置的虚拟形象参数添加到虚拟形象的 Playable Layers 来访问它们。
如果你添加了其中一个参数，VRChat 会根据 VRChat 中发生的情况自动更新其值。例如，如果你添加了 `VelocityMagnitude` 参数，它的值会根据玩家当前的速度更新。

所有内置参数都是只读的。你无法通过[表情菜单](/avatars/expression-menu-and-controls)或 [OSC](https://docs.vrchat.com/docs/osc-overview) 更改它们。

下表列出了 VRChat 的所有内置参数、它们的描述、类型以及它们的[同步类型](#sync-types)。

| 名称 | 描述 | 类型 | 同步 |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------------- |
| IsLocal | 如果虚拟形象在本地被佩戴则为 true，否则为 false | Bool | None |
| [PreviewMode](/avatars/animator-parameters/preview-mode) | 如果虚拟形象正在被预览则返回 `1`，否则返回 `0` | Int | None |
| [Viseme](/avatars/animator-parameters#viseme-values) | [Oculus viseme 索引](https://developer.oculus.com/documentation/unity/audio-ovrlipsync-viseme-reference)(`0-14`)。使用 Jawbone/Jawflap 时，范围为 `0-100`，表示音量 | Int | Speech |
| Voice | 麦克风音量(`0.0-1.0`) | Float | Speech |
| [GestureLeft](/avatars/animator-parameters#gestureleft-and-gestureright-values) | 来自左手控制器的手势(0-7) | Int | IK |
| [GestureRight](/avatars/animator-parameters#gestureleft-and-gestureright-values) | 来自右手控制器的手势(0-7) | Int | IK |
| GestureLeftWeight | 左手模拟扳机(0.0-1.0)[^1] | Float | Playable |
| GestureRightWeight | 右手模拟扳机(0.0-1.0)[^1] | Float | Playable |
| AngularY | Y 轴上的角速度 | Float | IK |
| VelocityX | 横向移动速度(m/s) | Float | IK |
| VelocityY | 垂直移动速度(m/s) | Float | IK |
| VelocityZ | 前进移动速度(m/s) | Float | IK |
| VelocityMagnitude | 速度的总量级 | Float | IK |
| Upright | 你的「直立」程度。0 为俯卧，1 为完全直立 | Float | IK |
| Grounded | 如果玩家接触地面则为 true | Bool | IK |
| Seated | 如果玩家在 station 中则为 true | Bool | IK |
| AFK | 玩家是否不可用(HMD 接近传感器 / End 键) | Bool | IK |
| [TrackingType](/avatars/animator-parameters#trackingtype-parameter) | 见下方描述 | Int | Playable |
| VRMode | 如果用户处于 VR 中则返回 `1`，否则返回 `0` | Int | IK |
| MuteSelf | 如果用户已将自己静音则返回 `true`，如果未静音则返回 `false` | Bool | Playable |
| InStation | 如果用户在 station 中则返回 `true`，否则返回 `false` | Bool | IK |
| Earmuffs | 如果用户的 Earmuff 功能已开启则返回 `true`，否则返回 `false` | Bool | Playable |
| IsOnFriendsList | 如果查看该虚拟形象的用户与佩戴它的用户是好友则返回 `true`。在本地为 `false`。 | Bool | Other |
| [AvatarVersion](/worlds/components/vrc_station/#detecting-sdk2-avatars) | 如果虚拟形象是使用 VRChat 的 SDK3(2020.3.2)或更晚版本构建的则返回 `3`，否则返回 `0`。 | Int | IK |
| IsAnimatorEnabled | 在虚拟形象的动画器被禁用前一帧返回 `false`，在启用时返回 `true`。 | Bool | None |

[^1]: GestureLeftWeight 和 GestureRightWeight 会因扳机扣动程度而在不同手势中从 0.0 变化到 1.0。例如，如果你握拳但不扣动左手的扳机，GestureLeft 会是 1，但 GestureLeftWeight 会是 0.0。当你开始扣动扳机时，它会从 0.0 向 1.0 攀升。这可用于创建「模拟」手势或有条件地检测各种情况。

### 虚拟形象缩放参数 {#avatar-scaling-parameters}

你的 Playable Layer 可以使用以下参数来响应玩家当前的[虚拟形象缩放](/avatars/avatar-scaling):

| 名称 | 描述 | 类型 | 同步 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | -------- |
| ScaleModified | 如果用户使用虚拟形象缩放进行了缩放则返回 `true`，如果虚拟形象处于默认大小则返回 `false`。 | Bool | Playable |
| ScaleFactor | 虚拟形象默认高度与当前高度之间的关系。默认眼高为 1m 的虚拟形象缩放到 2m 时会报告 `2`。 | Float | Playable |
| ScaleFactorInverse | 虚拟形象默认高度与当前高度之间的反向关系(`1/x`)。默认眼高为 1m 的虚拟形象缩放到 2m 时会报告 `0.5`。在极端情况下可能不准确。 | Float | Playable |
| EyeHeightAsMeters | 虚拟形象以米为单位的眼高。 | Float | Playable |
| EyeHeightAsPercent | 虚拟形象以米为单位的眼高相对于默认缩放限制(`0.2`-`5.0`)的关系。缩放到 2m 的虚拟形象会报告 `(2.0 - 0.2) / (5.0 - 0.2)` = `0.375`。 | Float | Playable |


### 参数类型 {#parameter-types}

你可以在 [Expression Parameters 资源](#expression-parameters-asset)中定义以下类型的参数:

| 参数类型 | 范围 | 参数内存占用 | 备注 |
| :------------- | :---------------- | :--------------------- | :---------------------------------   |
| `int`          | `0`-`255`         | 8 位 | 无符号 8 位整数。 |
| `float`        | `-1.0` 到 `1.0`   | 8 位 | 有符号 8 位定点小数[^2]。 |
| `bool`         | `True` 或 `False` | 1 位 |  |

[^2]: 远程同步的 `float` 值有 255 个可能值，在网络上的精度为 `1/127`，并且可以精确存储 `-1.0`、`0.0` 和 `1.0`。在本地更新时，例如通过 [OSC](https://docs.vrchat.com/docs/osc-overview)，float 值在动画器中以原生(32 位)浮点值存储。 

每个同步参数都会占用一定量的参数内存。VRChat 最多可以同步 256 位的自定义参数。VRChat 还会将你的虚拟形象限制为总共 8192 个自定义 Expression Parameters(同步的和未同步的)。[内置参数](#built-in-parameters)不计入这些限制。

### GestureLeft 与 GestureRight 的值 {#gestureleft-and-gestureright-values}

GestureLeft 和 GestureRight 使用以下值:

| 索引 | 手势 |
| ----- | ----------- |
| 0     | Neutral     |
| 1     | Fist        |
| 2     | HandOpen    |
| 3     | FingerPoint |
| 4     | Victory     |
| 5     | RockNRoll   |
| 6     | HandGun     |
| 7     | ThumbsUp    |

### Viseme 值 {#viseme-values}

我们使用 [Oculus viseme 索引](https://developer.oculus.com/documentation/unity/audio-ovrlipsync-viseme-reference)，从上到下，其中 `sil` 为 0。供参考:

| Viseme 参数 | Viseme |
| :--------------- | :----- |
| 0                | `sil`  |
| 1                | `pp`   |
| 2                | `ff`   |
| 3                | `th`   |
| 4                | `dd`   |
| 5                | `kk`   |
| 6                | `ch`   |
| 7                | `ss`   |
| 8                | `nn`   |
| 9                | `rr`   |
| 10               | `aa`   |
| 11               | `e`    |
| 12               | `i`    |
| 13               | `o`    |
| 14               | `u`    |


### AFK 状态 {#afk-state}

AFK 状态由以下情况触发:

- 用户摘下头显，且 HMD 接近传感器返回头显未被佩戴
- 系统菜单处于打开状态。这取决于你所使用的平台在系统菜单弹出时如何传递数据——例如，Oculus Dash 不会被记录为 AFK，但 SteamVR 的菜单**会**被记录为 AFK。这多少是一种连带效应，而非刻意设计的行为。
- 用户按下了 End 键，切换 AFK 状态。

### TrackingType 参数 {#trackingtype-parameter}

`TrackingType` 包含了几项信息。 

如果 `VRMode` 为 1 时该值为 3、4 或 6，则该值表示虚拟形象的佩戴者启用了多少追踪点且当前正在追踪。**这个值可能会变化！** 如果处于 6 点追踪的用户移除了额外的三个追踪点，其值将从 6 变为 3。在设计动画器时要考虑到这一点。 

如果 `VRMode` 为 1 时该值为 0、1 或 2，则该值表示虚拟形象仍在初始化中。你不应基于这种取值组合来设计动画器的分支，而应等待 3、4 或 6 这样的「有效」值。

:::caution 考虑数值变化

在虚拟形象初始化期间，这个值可能会变化！请确保你的动画器考虑了可能的变化，并且不会「死胡同」到任何分支中。

:::

| 参数 | 描述 |
| --- | :-- |
| 0 | 未初始化。通常只在用户切换虚拟形象且其 IK 尚未开始发送时出现。 |
| 1 | Generic 骨骼绑定。用户可能开启了任意类型的追踪，但虚拟形象被绑定为 Generic，因此追踪被忽略。如果 `VRMode` 为 0，_可能_ 是桌面用户。 |
| 2 | _仅在 AV2 中出现，因此对于虚拟形象上的 AV3 控制器，你不应期望长时间处于此状态。在 SDK3 station 中仍可能出现。_ <br />仅有手部追踪，没有手指。这只会出现在过渡状态中——也就是说，你应预期 `TrackingType` 会再次变化，虚拟形象不应停留在该状态。 |
| 3 | 头部和手部追踪。如果 `VRMode` 为 `1`，该用户处于 3 点 VR。如果 `VRMode` 为 `0`，则是使用人形虚拟形象的桌面用户。 |
| 4 | 4 点 VR 用户。头部、手部和髋部。 |
| 5 | 5 点 VR 用户。头部、手部和脚部被追踪。基本上是全身追踪但没有髋部。 |
| 6 | 全身追踪 VR 用户。头部、手部、髋部和脚部被追踪。 |

## 自定义参数 {#custom-parameters}

你可以向虚拟形象的 Playable Layers 添加自己的参数。

你必须[创建 Expression Parameters 资源](#expression-parameters-asset)，它允许你[在 VRChat 中控制参数](#how-to-control-custom-parameters)。例如，你可以设置[表情菜单](/avatars/expression-menu-and-controls)，让用户在 VRChat 中自定义你的虚拟形象。

### Expression Parameters 资源 {#expression-parameters-asset}

Expression Parameters 资源包含你的 Playable Layers 可以使用的自定义参数列表。每个参数都有名称、类型和默认值。你还可以选择该参数是否应与其他玩家同步，从而让其他玩家看到由动画器和自定义参数引起的变化。

![默认情况下 Expression Parameters 的样子。](/img/avatars/expression-menu/default-parameters.png)

:::tip

阅读[表情菜单](/avatars/expression-menu-and-controls#creating-an-expressions-menu)文档，了解如何创建 Expression Parameters 资源。

:::

### 如何控制自定义参数 {#how-to-control-custom-parameters}

在虚拟形象的 Playable Layers 和 Expression Parameters 资源中设置好自定义参数后，你可以通过三种不同的方式控制它们:

- 设置[表情菜单](/avatars/expression-menu-and-controls)，让用户可以轻松地在 VRChat 中控制参数，例如在服装之间切换或播放自定义动画。表情菜单是控制自定义参数最简单、最常用的方法。
- 你可以将状态行为[Avatar Parameter Driver](/avatars/state-behaviors#avatar-parameter-driver)附加到 Playable Layer 中的状态上。它可以自动设置、增加或随机化你在 Expression Parameters 资源中定义的参数。
- 你可以为虚拟形象设置 [OSC](https://docs.vrchat.com/docs/osc-overview)，让用户和第三方工具可以控制参数。例如，[VRCFaceTracking](https://docs.vrcft.io/) 使用面部和眼部追踪硬件来控制虚拟形象的面部表情参数。 

### 默认 AV3 别名 {#default-av3-aliasing}

VRChat 的模板 AV3 控制器中使用了一些「默认」设置，如果你不想自己构建控制器，可以直接使用它们。得益于别名机制，它们不会与你自己的使用冲突(只要你不使用相同的名称)。

具体来说，Default Action 和 FX 图层使用了别名。你无需担心使用这些图层中已有的 Expression。 

Actions 使用名为 `VRCEmote` 的别名参数，它是一个范围为 1 到 16 的 Int。

FX 使用名为 `VRCFaceBlendH`(-1,1)和 `VRCFaceBlendV`(-1,1)的别名 Float 参数，如果你想尝试用自己的菜单来使用它们的话。默认 FX 图层要求你有一个名为 `Body` 的蒙皮网格，并带有 `mood_happy`、`mood_sad`、`mood_surprised` 和 `mood_angry` 形态键。

再重申一次，如果你有一个以 Avatar3 虚拟形象上传且没有任何自定义 Playable Layers 的虚拟形象，只要你有上述命名的形态键，你就能在其中使用一些内置表情。

如果你还有 `eyes_closed` 形态键，那么当你使用默认的 Die 表情或进入 AFK 时，它会让眼睛闭上。

### 跨平台参数同步 {#cross-platform-parameter-sync}

当使用同时上传了 Quest 和 PC 版本的虚拟形象时，参数是按照它们在参数列表中的位置和参数类型来同步的，**而不是**按参数名称。要让某个参数在 PC 和 Quest 之间同步，它必须位于参数列表中的相同位置，并且具有相同的参数类型。 

因此，你应始终为虚拟形象的 PC 版和 Quest 版使用同一个 Expression Parameters 资源，即使其中一个版本并未使用所有参数。

### 参数类型不匹配时的转换 {#mismatched-parameter-type-conversion}

当你在[动画器](https://docs.unity3d.com/Manual/AnimationParameters.html)中选择[参数类型](/avatars/animator-parameters/#parameter-types)时，最好选择与你尝试使用的[内置参数](/avatars/animator-parameters/#built-in-parameters)或[自定义参数](/avatars/expression-menu-and-controls/#creating-an-expressions-menu)相同的类型。例如:如果你在动画器中使用 VRChat 内置的 `AFK` 参数，你应选择 `bool` 类型。

不过，你*可以*为参数选择不匹配的类型。VRChat 会尝试将参数的值转换为动画器使用的类型。例如，如果你为 `AFK` 参数选择 `float` 类型，VRChat 会自动将 `AFK` 设置为 `1.0` 或 `0.0`，而不是 `true` 或 `false`。这也让你可以在动画器的[混合树](https://docs.unity3d.com/Manual/class-BlendTree.html)中使用 `AFK` 参数。

下表显示了转换不匹配的参数时其变化情况。 

| 源类型 | 动画器类型 | 转换行为 | 示例 |
|:-----------:|:-------------:|:-------------------------------------------------------------------------------------------------------------:|---------------------------------------|
| `int`       | `float`       | 直接转换为 `float`。 | `1` → `1.0` |
| `int`       | `bool`        | `0` 为 `false`，其他任何值都为 `true` | `1` → `true` |
| `float`     | `int`         | 舍入到最接近的 `int`(与 [`Mathf.Round`](https://docs.unity3d.com/ScriptReference/Mathf.Round.html) 相同) | `0.5` → `0`，`0.6` → `1`，`1.5` → `2` |
| `float`     | `bool`        | `0.0` 为 `false`，其他任何值都为 `true` | `0.5` → `true` |
| `bool`      | `int`         | `true` 为 `1`，`false` 为 `0` | `true` → `1` |
| `bool`      | `float`       | `true` 为 `1.0`，`false` 为 `0.0` | `true` → `1.0` |

### Trigger 类型参数 {#trigger-typed-parameters}

目前我们不建议在动画控制器中使用 Trigger 类型参数。这些值可能会在你的虚拟形象的不同版本之间失同步，包括查看你虚拟形象的远程客户端，或在镜子里查看虚拟形象等特殊情况下。如果你想表示虚拟形象的状态，请使用 Int、Float 或 Bool 类型的参数。

## 同步类型 {#sync-types}

VRChat 会将大多数[内置](#built-in-parameters)参数与实例中的其他玩家同步，你也可以为自己的[自定义](#custom-parameters)参数启用同步。

同步类型决定了 VRChat 如何同步每个参数。参数使用以下同步类型之一:

- **Speech**
	- 仅用于 viseme。
	- 根据你的语音驱动 Oculus Lipsync 输出参数。
	- 在本地更新，不直接同步(因为它由音频驱动)
- **Playable**
	- 一种较慢的同步模式，用于同步运行时间较长的动画状态。
	- 根据参数变化按需每 0.1 到 1 秒更新一次(每秒 1 到 10 次更新)，但你不应依赖它进行快速同步。
- **IK**
	- 一种较快的同步模式，用于同步频繁变化的值。
	- 每 0.1 秒持续更新(每秒 10 次更新)，并在远程用户本地对 `float` 值进行插值。
	- 根据参数的不同，也可能只是根据虚拟形象本地渲染的 IK 状态计算得出。
- **None**
	- 此参数不会与其他玩家同步。 
	- 例如，`IsLocal` 对本地玩家的虚拟形象始终为 true，对其他玩家的虚拟形象则为 `false`。 

如果你为[自定义](#custom-parameters)参数启用同步，VRChat 通常使用 **Playable** 同步类型。然而，当你用[木偶控制](/avatars/expression-menu-and-controls#types-of-controls)控制参数时，VRChat 会从 **Playable** 切换到 **IK** 同步，从而提高更新频率并实现平滑插值。当你关闭木偶控制时，它会恢复为 Playable 同步。
