import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 状态行为 {#state-behaviors}

:::caution 需要 Unity 知识

本文档假定你了解一些 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AnimatorController.html">Unity 动画器</UnityVersionedLink> 的知识。
:::
当你在 Animator 视图中选中特定状态时，就可以添加状态行为（State Behaviors）。它们有点像状态用的组件，会执行不同的功能。试着添加它们，你就会看到它们能做什么！

所有状态行为都会在该状态过渡的第一帧运行。

状态行为*应该*无论状态机在包含该状态行为的状态中停留多久都会运行。

:::caution

这里特意使用“应该”一词，因为 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/StateMachineBehaviours.html">Unity 文档</UnityVersionedLink> 并未保证在过渡或状态持续时间极短时状态行为一定会执行。

如果你想要**完全**安全，请确保在包含该状态行为的状态以及直接过渡到该状态的任何过渡中花费的总时间至少为 0.02 秒——不过在实践中，这似乎并不需要。

:::

## Animator Layer Controller

![VRC Animator Layer Control 组件](/img/avatars/state-behaviours/animator-layer-control.png)

Animator Layer Control 允许你在任意给定时间内混合任意给定 Playable Layer 中特定 Animator Layer 的权重。

如果状态在混合持续时间中途退出，目标图层会立即设置为目标权重。

图层权重会一直保持，直到其他状态再次运行此状态行为并将其重置。

| 属性名称  | 用途                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------- |
| Playable       | 允许你选择要影响的 Playable Layer。                                  |
| Layer          | 你希望影响的 Playable Layer 的索引。你不能更改第 0 层（基础层）的权重——它始终设置为 1.0 权重。 |
| Goal Weight    | 定义你希望混合到的权重。                                                      |
| Blend Duration | 定义你希望混合花费的时间段（以秒为单位）。0 表示瞬时。        |
| Debug String   | 当此 StateBehavior 运行时，此字符串将打印到输出日志。可用于调试。 |


## Animator Locomotion Control

![VRC Animator Locomotion Control 组件](/img/avatars/state-behaviours/animator-locomotion-control.png)

Animator Locomotion Control 允许你在动画器的给定状态中禁用移动。移动状态会一直保持，直到其他状态再次运行此状态行为并更改它。

在 Desktop 模式下，这会禁用平移移动，并将旋转（视角）移动限制在垂直轴上。在 VR 中，这会禁用控制器的平移和旋转移动，并限制半身 IK（全身 IK 不受影响）。在两种模式下，玩家的胶囊体都会冻结在原地。

| 参数 | 描述 |
| - | - |
| Disable Locomotion | 如果设置为 True，将禁用移动（使用控制进行移动）。房间尺度移动仍然可行。如果设置为 False，将启用移动。 |
| Debug String | 当此 StateBehavior 运行时，此字符串将打印到输出日志。可用于调试。 |

## Animator Temporary Pose Space

![VRC Animator Temporary Pose Space 组件](/img/avatars/state-behaviours/animator-temporary-pose-space.png)

Animator Temporary Pose Space 控制允许你在动画器状态的给定时间点，将佩戴该虚拟形象的人的视点移动到头部。

视图会一直保持设置，直到其他状态再次运行此状态行为并将其重置或清除。

此行为会在延迟时间过去后执行。

Animator Temporary Pose Space **只**应在因姿势变化（例如坐在地上或躺在地上）而需要更新视图高度时使用。它不能用于“缩放”所佩戴的虚拟形象，如果以这种方式使用，会导致严重的故障问题。
:::danger

如果此行为所在的状态在 `Delay Time` 过去之前退出或被中断，此状态行为**将不会执行**！
:::

| 属性名称 | 用途                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pose Space    | Enter 或 exit。Enter 会设置姿态空间，exit 会将其清除为默认值。                                                                                    |
| Fixed Delay   | 延迟时间应该是固定时间段，还是状态持续时间的百分比？                                                                   |
| Delay Time    | 如果给定一个值，视点将在延迟后设置。如果你要在一定时间内混合到某个动画中，这会很有用。                                |
| Debug String  | 当此 StateBehavior 运行时，此字符串将打印到输出日志。可用于调试。                                                          |


## Animator Tracking Control

![VRC Animator Tracking Control 组件](/img/avatars/state-behaviours/animator-tracking-control.png)

Animator Tracking Control 允许你在虚拟形象身体的各个不同部位启用或禁用 IK 或模拟移动。将选项设置为“No Change”不会更改身体部位的当前值。“Tracking”会将其设置为跟随 IK 或模拟移动。“Animation”会强制该身体部位遵循虚拟形象 Animator 给出的值。

如果你将所有 IK 跟踪点设置为 Animation，你的动画将作为 Animation 远程播放，而不是通过网络 IK 转换。对于各种类型的跟踪，这些“IK 跟踪点”是：

- Desktop：头部、左手、右手
- 3pt Tracking：头部、左手、右手
- 6pt / FBT Tracking：头部、左手、右手、臀部、左脚、右脚

:::note

除了眼睛和眼睑是模拟的之外，所有部位都由 IK 驱动。嘴部和下颚由 viseme 驱动。

例如，将左手和右手设置为 Animation 将忽略 IK 定义的手部（和手臂）位置，转而使用任何当前活动状态的运动来定义手部和手臂的位置。将它们重新设置为 Tracking 将改为使用 IK。

将 Eyes & Eyelid 设置为 Animation 将禁用眼睛移动和眼睑眨眼。将 Eyes & Eyelid 设置为 Tracking 将重新启用模拟的眼睛移动和眨眼。

将 Mouth and Jaw 设置为 Animation 将禁用 viseme，viseme 参数将停止更新。将 Mouth and Jaw 设置为 Tracking 将重新启用 viseme，它们将再次开始更新。
:::
Tracking 设置会一直保持，直到其他状态再次运行此状态行为并将其重置。

| 参数 | 描述                                                                                         |
| :-- |:----------------------------------------------------------------------------------------------------|
| Tracking Control | 见上文描述。                                                                              |
| Debug String | 当此 State Behavior 运行时，此字符串将打印到输出日志。可用于调试。 |

## Avatar Parameter Driver

![图像](/img/avatars/state-behaviors-fa19a1d-2022-06-02_18-11-06_Unity.png)

Avatar Parameter Driver 能以多种方式操纵 Animator 参数。单个 Avatar Parameter 可以执行多个操作，这些操作按从上到下的顺序执行。这些操作会在进入该行为所在的状态时*一次性*完成。

`Local Only` 会使驱动器仅在本地运行，作为检测 `isLocal` 的一种快捷方式。

点击“Add”会向驱动器添加一个新操作。第一种类型（默认选中）是“Set”。

如果修改同步的参数（VRCExpressionParameters 对象中定义的任何内容），这些值将被限制在其最大范围内。Int [0,255] Float [-1,1]。

不过，仅在 Animation Controller 中定义的参数（又称“本地参数”）仍然可以由参数驱动器修改。这些值不会被限制。

你也不能驱动任何 [VRChat 定义的 Animator 参数](/avatars/animator-parameters)。

Set、Add、Random 和 Copy 适用于 `float` 和 `int`。Set、Random 和 Copy 适用于 `bool`。

### Set
Set 会简单地将 Value 设置到 Destination 中指定的 Parameter。

![state-behaviors-121fe2a-2022-06-02_18-11-13_NVIDIA_Share.png](/img/avatars/state-behaviors-121fe2a-2022-06-02_18-11-13_NVIDIA_Share.png)

### Add
Add 会将 Value 加到 Destination 中指定的 Parameter。

正如组件所指出的，在虚拟形象的远程实例上运行时，使用 Add 可能不会产生相同的结果。使用 Add 时，建议使用同步的 Destination Parameter，并仅在本地运行驱动器。

![state-behaviors-e10bb6a-2022-06-02_18-11-17_Unity.png](/img/avatars/state-behaviors-e10bb6a-2022-06-02_18-11-17_Unity.png)
        
### Random
Random 会将 Destination Parameter 设置为 Min Value 和 Max Value 之间的随机数。

正如组件所指出的，在虚拟形象的远程实例上运行时，使用 Random 可能不会产生相同的结果。使用 Random 时，建议使用同步的 Destination Parameter，并仅在本地运行驱动器。

使用布尔参数时，你可以使用 Chance 变量来设置参数被设为 true 的概率。

使用 Int 参数时，你可以使用 Prevent Repeats 设置来防止连续两次选中相同的值。

![state-behaviors-99c6248-2022-06-02_18-11-23_Unity.png](/img/avatars/state-behaviors-99c6248-2022-06-02_18-11-23_Unity.png)

### Copy
Copy 会将 Source Parameter 的值设置到 Destination Parameter。这可用于让一个 float 与另一个 float 匹配、将一个 float 重映射到不同范围，或在两种完全不同的类型之间转换。
:::caution

VRChat 的内置参数（例如 `GestureLeftWeight`）**可以**指定，但无法作为源参数使用。
:::

![state-behaviors-bffdb10-2022-06-02_18-11-30_Unity.png](/img/avatars/state-behaviors-bffdb10-2022-06-02_18-11-30_Unity.png)

#### 在类型之间转换 {#converting-between-types}
从 `bool` 转换时，False 计为 0，True 计为 1。

转换为 `bool` 时，0 为 False，*任何*其他值都为 True。
转换为 `int` 时，它会始终*向下*舍入到最接近的整数。
转换为 `float` 时，它会直接复制该值，即使该值超出了其能够同步给其他玩家的范围。

#### 自定义范围 {#custom-ranges}
你还可以使用 `Convert Range` 复选框来启用一些额外的 UI，从而设置自定义转换范围。这可用于重映射值，或更精确地控制如何从一种类型转换为另一种类型。

![state-behaviors-cab639b-2022-06-02_18-35-32_Unity.png](/img/avatars/state-behaviors-cab639b-2022-06-02_18-35-32_Unity.png)

## Playable Layer Control

![VRC Animator Layer Control 组件](/img/avatars/state-behaviours/animator-playable-layer-control.png)

Playable Layer Control 允许你在指定持续时间内将整个 Playable Layer 的权重混合到指定值。它与 Animator Layer Control 非常相似，但控制的是整个 Playable Layer。

Action Playable 层会经常使用此状态行为，因为 Action 层默认权重为零，并且在动画完成后应始终混合回零。

如果状态在混合持续时间中途退出，Playable Layer 会立即设置为目标权重。

| 属性名称  | 用途                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| Layer          | 要影响的 Playable Layer。                                                                                   |
| Goal Weight    | 混合完成后要目标的 Playable Layer 权重。                                                 |
| Blend Duration | 混合到该图层所需的时间。零表示瞬时。                                              |
| Debug String   | 当此 StateBehavior 运行时，此字符串将打印到输出日志。可用于调试。             |

## Animator Play Audio

![图像](/img/avatars/state-behaviors-animatorplayaudio.png)

“Animator Play Audio”行为会在过渡到动画状态时修改 AudioSource。它可以更改音频剪辑、音高或循环值，并且可以播放 AudioSource。

AudioSource 的相对路径（即 `Armature/Hips/Spine/`）必须输入到“Source Path”属性中。可以通过选择音频源组件来自动填充此属性。如果音频源位于虚拟形象的根节点上，“Source Path”应为空。


**“Playback order”属性并不保证所有玩家都以相同顺序播放音频剪辑。** 例如，“Random”设置可能会为每位玩家选择不同的剪辑。如果你希望保证所有玩家听到相同的剪辑，请使用多个动画状态，或将“Playback Order”更改为“Parameter”并结合同步的动画器参数使用。

“Animator Play Audio”可以添加到子状态机内的状态中。不过，不建议将其添加到子状态机本身。该状态行为将在子状态机中的每次状态过渡时应用，这可能会与其他状态行为产生意外交互。

| 属性名称 | 用途 |
| ---- | ---- |
| Source Path | 相对于虚拟形象根变换的 AudioSource 路径。<br/>如果在首次过渡到此状态时找不到该 AudioSource，AnimatorPlayAudio 将被禁用。 |
| Playback Order | 确定过渡到此状态时选择哪个音频剪辑。<br/>• Random：随机选择一个剪辑。（默认）<br/>• Unique Random：随机选择一个音频剪辑，但不会连续两次选择同一剪辑。<br/>• Roundabout：选择第一个剪辑，然后第二个，依此类推。最后一个剪辑之后，会再次选择第一个剪辑。<br/>• Parameter：根据[“int”类型虚拟形象参数](/avatars/animator-parameters#parameter-types)选择剪辑。例如，如果参数为 0，则选择第一个剪辑。该参数必须在虚拟形象的 Expressions Parameters 中定义。如果找不到该参数，则会改为选择第一个剪辑。 |
| Clips | 过渡到此状态时可以应用到 AudioSource 的 AudioClip 列表。 |
| Random Volume | 过渡到此状态时应用到 AudioSource 的随机音量。限制在 0 到 1 之间。<br/>• Min：最小随机音量。（默认：1）<br/>• Max：最大随机音量。（默认：1） |
| Random Pitch | 过渡到此状态时应用到 AudioSource 的随机音高。限制在 -3 到 3 之间。<br/>• Min：最小随机音高。（默认：1）<br/>• Max：最大随机音高。（默认：1） |
| Loop | 过渡到此状态时，是否启用或禁用 AudioSource 的循环。 |
| On Enter | 过渡进入此状态时，是启动还是停止 AudioSource。<br/>🗹 Stop Audio Source（默认：启用）<br/>🗹 Play Audio Source（默认：启用） |
| On Exit | 过渡离开此状态时，是启动还是停止 AudioSource。<br/>☐ Stop Audio Source（默认：禁用）<br/>☐ Play Audio Source（默认：禁用） |
| Play On Enter Delay In Seconds | 如果启用，“Play On Enter”播放剪辑前的延迟。限制在 0 到 60 秒之间。（默认：0 秒） |

每个音频设置都有一个附加属性。默认情况下，它设置为“Apply If Stopped”。如果音频源尚未播放完其上一个剪辑，并且“Stop Audio Source On Enter”已禁用，这会阻止应用该设置。

| 设置名称     | On Enter |
|------------------|------------------------------------------------------------------------------------------- |
| Always Apply     | 即使音频源当前正在播放剪辑，也会将设置应用到音频源。               |
| Apply If Stopped | 除非音频源已经在播放剪辑，否则将设置应用到音频源。（默认）   |
| Never Apply      | 该设置不会被使用，并在检视面板中显示为灰色。                                     |
