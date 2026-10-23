---
sidebar_label: SteamVR 驱动
---
# SteamVR 骨骼手部追踪驱动指南 {#steamvr-skeletal-hand-tracking-driver-guide}

本指南旨在帮助自定义 **SteamVR 骨骼输入驱动**的作者让自己的驱动在 VRChat 中良好运行，因为 VRChat 正在升级到 SteamVR Input 2.0。无论你已有一个想确保正常工作的现有驱动，还是你正在创建一个全新的驱动以便通过 SteamVR 在 VRChat 中使用，都建议你先阅读 [Valve 关于创建 SteamVR 骨骼驱动的文档](https://github.com/ValveSoftware/openvr/wiki/Creating-a-Skeletal-Input-Driver)以及更通用的 [驱动 API 文档](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md)

## VRChat 何时以及如何使用 SteamVR 骨骼数据？ {#when--how-does-vrchat-use-steamvr-skeletal-data}

### 为虚拟形象播放动画 {#animating-avatars}

为了给虚拟形象（Avatar）的双手播放动画，只要 ```SkeletonLeftHand``` 或 ```SkeletonRightHand``` 动作绑定了输入源且可用，VRChat 就会使用绑定到这些动作的任何骨骼数据。在每种此类情况下，```VRSkeletalMotionRange_WithoutController``` 的骨骼动画都会从该动作中获取，并存储到一个中间层中。该中间层的内部表示会存储骨骼的*位置*以及*旋转*，但是，在撰写本文档时，应用到虚拟形象上的重定向*只*会提供旋转。这是因为，除非虚拟形象的 3D 手部网格经过仔细而周全的设计，能与任意手指长度的手部关节位置良好配合，否则它们看起来可能会变形或被挤压。其缺点是，具有任意比例的虚拟形象手部无法保证准确作为捏合和抓取等动作的视觉反馈。

### 作为玩法/菜单等输入 {#as-a-gameplaymenuetc-input}

每当 Skeleton 动作的 ```eSkeletalTrackingLevel``` 值为 ```VRSkeletalTrackingLevel.VRSkeletalTracking_Full``` 时，VRChat 会决定按每只手分别将提供的骨骼动画数据用作输入

作为回顾，```eSkeletalTrackingLevel``` 具有以下值：

* ```VRSkeletalTracking_Estimated``` - 身体部位位置无法由设备直接确定。设备提供的任何骨骼姿势都是通过假设激活按钮、扳机、摇杆或其他输入传感器所需的位置来估计的。Vive 控制器是最著名的例子
* ```VRSkeletalTracking_Partial``` - 身体部位位置可以直接测量，但自由度少于实际的身体部位。某些身体部位位置可能无法由设备测量，而是根据其他输入数据估计。例如 Index 控制器、Etee 控制器，或仅测量手指弯曲的一类手套等
* ```VRSkeletalTracking_Full``` - 在整个身体部位的运动范围内，身体部位位置都可以直接测量。例如 Ultraleap 追踪、Meta 手部追踪、MediaPipe 手部追踪，以及可测量每个手指关节段旋转的各类手套

因此，我们为何使用这个值应该很明显了——它直接告诉我们，在所提供的骨架内部，关于手部姿势的*实际信息*有多少。它是 API 中唯一能提供此类信息的部分，所以我们不得不将它用于此目的。


全保真骨骼手部追踪的交互模型建立在我们对骨骼数据进行相当多复杂处理的基础之上。我们通过进行从拇指尖到指尖的距离检查来计算我们自己的**捏合检测**，并将它用于界面中的"点击"，以及围绕所有手指（食指、中指、无名指和小指）的拇指-指尖捏合构建的手势输入。以下是当前的手势动作：

左手：

* 拇指-食指捏合：
    * 当掌心正对用户头部时：打开菜单
    * 当掌心背对，且射线检测处于激活状态时：界面点击
* 拇指-中指捏合：移动
* 拇指-无名指捏合并在大致朝向用户头部时保持：麦克风静音
* 拇指-小指捏合并在大致朝向用户头部时保持：禁用手势输入

右手：

* 拇指-食指捏合：无
* 拇指-中指捏合：转向
* 拇指-无名指捏合并在大致朝向用户头部时：跳跃
* 拇指-小指捏合并在大致朝向用户头部时：取消/放下

这意味着你**不需要从**任何与骨骼手部追踪所来自的"设备"相关的非骨骼、非姿势（布尔、标量、vector2 等）[输入组件句柄](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#creating-components)**提供这些动作**。事实上，这样做可能会导致双重点击和/或意外激活。我们将在后面的**控制器模拟**章节中进一步讨论这一点。

这也意味着*正确计算你的关节姿势至关重要*。大多数追踪系统都需要进行某种坐标空间转换，才能与 SteamVR 的坐标空间正确匹配，而这一过程会带来引入错误的机会。这就引出了下一节：以可视方式检查你的骨骼数据。

### 以可视方式调试你的骨骼数据 {#debugging-your-skeleton-data-visually}

出于调试目的，你可以将骨骼数据可视化。

![准确的手部图像](/img/input/ghost-hands.png)

在我们的菜单中，这些被称为*准确的手部*。它们始终会出现在菜单和加载场景中，或者当虚拟形象是通用（非人形）虚拟形象时出现。你也可以在控制菜单中可选地启用它们，以*替换*虚拟形象的手部（本地可见，网络上不可见）

正如上面的说明文字所示，VRChat 有一个我们称为*准确的手部*（与 Avatar Hands 相对）的手部可视化。它们是我们能提供的、最接近底层追踪数据的表示，同时看起来仍像 3D 手部网格。这在许多情况下都很有用，但就本文档而言，我们邀请你将它们用作调试/确认工具，以确保你提供的追踪数据准确无误，并经过精细调整以提供尽可能最佳的输入体验。做捏合手势时指尖应当接触，如果你使用的追踪系统会测量每个关节的长度，那么这一点也应在此体现出来。

要激活此模式，你需要打开**主菜单**，然后前往 **Settings** 页面，再进入 **Controls** 分类。


![Controls 页面](/img/input/controls-page.png)


点击右侧的"Accurate"按钮。手部应当会切换。

## 控制器模拟 {#controller-emulation}

迄今为止，让光学手指追踪（或不太常见的各类手套）在 SteamVR 中工作的最常见技术，是一种称为"控制器模拟"的方法。即由自定义 SteamVR 驱动使用某个[输入配置](https://github.com/ValveSoftware/openvr/wiki/Input-Profiles)、带有 SteamVR 生态系统中某个现有知名设备（通常是 Touch 或 Index 控制器）的[属性](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#device-properties)和渲染模型的被追踪设备对象，以试图冒充它们。然后沿骨骼追踪输入句柄发送来自源追踪系统（如 Meta Quest 或 Ultraleap）的骨骼数据，使其进入应用程序的骨骼追踪动作，有时还会将保真级别发送为 full。虽然这确实能将手指追踪数据传入应用程序，但这并不是理想的方法。

* 应用程序无法分辨实际使用的硬件是什么
* 控制器的某些属性（例如保真级别枚举）在骨骼输入组件初始化后无法更改，这使得应用程序无法对运行时在控制器与手部之间的多模态切换做出响应
* 填充虚拟控制器其他输入（扳机、摇杆、按钮等）的最省事做法，是放入简单的不可见手势，从用户体验角度看令人沮丧。
* 其他动作的虚拟输入（上述扳机、摇杆、按钮等）可能会与应用程序侧根据追踪数据生成的输入发生冲突。这可能会表现为菜单交互的双重点击，或者抓取事件同时由驱动和应用程序的手势输入系统触发。这可能会给用户带来意外且令人困惑的结果。
* 用户将无法为手指追踪和握持控制器分别设置不同的绑定。如果用户更改或禁用了手部的输入-动作映射（很可能是为了避免上述问题），那么当他们回到控制器时，该绑定也会继续保留。在点击或抓取的情况下，这会导致他们回到控制器时无法点击或抓取。

出于这些原因，我们并不正式支持这种"控制器模拟"方法。我们有一些代码会尝试检测这种情况，并可能告诉用户该输入不受支持，这可能会产生意想不到的副作用。

*请*不要错误地表示你发送给 SteamVR/VRChat 的硬件/输入。你可能注意到 Valve 在[他们的文档中](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#notes-on-hand-tracking-compatibility)指出，VRChat 在激活手指追踪前会检查当前控制器是否为 Knuckles，并且你应使用他们内置的通用控制器模拟来面向 VRChat。**这已不再属实**。本指南应被视为权威。如果你已经使用这套模拟系统为 VRChat 设置了控制器模拟绑定，则应将其移除。

## 推荐方法 {#recommended-approaches}

### 串流应用 {#streaming-applications}

如果你正在构建一个将独立设备（如 Meta Quest）连接到 SteamVR 的串流应用，你的应用很可能除了无控制器手部追踪外，还希望支持 Touch 等被追踪控制器。除了"多模态"用法（一只手握持控制器，另一只手以无控制器方式被追踪）之外，你可能还希望支持从控制器到手的快速切换。现有的 SteamVR 驱动（如 lighthouse）向我们表明，**多个输入设备可以存在于单个 SteamVR 驱动中**。因此，我们推荐的方法是：

为你的串流应用所支持的每种现有物理控制器类型创建一个虚拟控制器（[输入配置](https://github.com/ValveSoftware/openvr/wiki/Input-Profiles)、被追踪设备 id 与[属性](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#device-properties)、[输入组件句柄](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#creating-components)等）。

创建一个完全专用于无控制器手部追踪的全新虚拟控制器。

#### 物理控制器 {#physical-controllers}

对于这些控制器，只需复制你正在透传的控制器即可。它们应具有与平时相同的输入配置和组件——摇杆、按钮等，以及相同的被追踪设备属性（型号名称、渲染模型、制造商等），和相同的输入源/角色（控制器的左手/右手，头显的头部），并将骨骼追踪级别初始化为该控制器所提供的级别（对于 Touch，这将是 Estimated）。

#### 手部虚拟控制器 {#hand-virtual-controller}

对于这些控制器，你需要一个输入配置和组件句柄，提供最低限度必要的输入。这些是：

* Dashboard
* System click（用于与 Dashboard 交互）
* Hand Pose
* Skeleton

如果你愿意，也可以提供其他输入（特别是如果你的手势设计良好，和/或你有能为其提供反馈的叠加层），但我们建议将它们排除在你提供给 VRChat 的默认绑定之外。

接下来，你需要为你的虚拟手部控制器提供一组描述性的属性。我们用一个假设的例子：你的串流应用是"**Bitriver**"，它串流来自 Meta Quest 的骨骼手部追踪。你可以为每个属性这样做：

左手和右手：

| 属性                           | 值                                |
| ------------------------------ | --------------------------------- |
| Prop_ManufacturerName_String   | Meta                              |
| Prop_TrackingSystemName_String | Oculus Insight                    |
| Prop_ModelNumber_String        | Bitriver_Hand                     |
| Prop_ControllerType_String     | Bitriver_Hand                     |
| TrackedDeviceClass             | Controller                        |
| Prop_InputProfilePath_String   | *指向输入配置文件 json 的路径* |

对于左手：

| 属性                          | 值                 |
| ----------------------------- | ------------------ |
| Prop_SerialNumber_String      | BitRiver_Left_Hand |
| Prop_ControllerRoleHint_Int32 | 1                  |


对于右手：

| 属性                          | 值                  |
| ----------------------------- | ------------------- |
| Prop_SerialNumber_String      | BitRiver_Right_Hand |
| Prop_ControllerRoleHint_Int32 | 2                   |

:::note
每个支持骨骼输入的控制器都会有一个被追踪设备，而该被追踪设备的 **Pose** 组件被称为骨架的**基础姿势**（Base Pose）——骨架的变换坐标空间是该基础姿势的子级。
:::

当你的用户的 VR 系统表示它正在手部追踪与控制器追踪之间切换时，你需要在调用 `vr::VRserverDriverHost()->  TrackedDevicePoseUpdated()` 时，通过更改每个被追踪设备的 **Base Pose** 组件中发送的布尔值来表示这一切换。DriverPose_t 中的相关字段是：

- `poseIsValid`
- `deviceIsConnected`

当你的**控制器**处于活动状态时，将其 ```poseIsValid``` 设为 ```true```（除非你的控制器 API 为此提供了更好的值，例如你使用的 API 表示某个姿势置信度低且应被拒绝），并将 ```deviceIsConnected``` 设为 true。然后将虚拟手部的 ```poseIsValid``` 设为 ```false```，并将虚拟手部的 ```deviceIsConnected``` 设为 ```false```

当你的**手部追踪**处于活动状态时，你需要设置相反的值。将控制器被追踪设备姿势组件的 ```poseIsValid``` 和 ```deviceIsConnected``` 设为 ```false```，并将虚拟手部的 ```poseIsValid``` 在手部被追踪时设为 ```true```、在未被追踪时设为 ```false```，并将 ```deviceIsConnected``` 设为 ```true```。

#### PCVR 外设 {#pcvr-peripherals}

如果你正在为 PCVR 构建单一外设（例如编写你自己的计算机视觉手部追踪系统，或者你在制作一只手套），你只需完成上一节的第二部分——构建一个命名恰当的、用于表示手部的全新虚拟控制器。你不需要做任何控制器与手部之间的交接。

## 手指追踪独占模式 {#finger-tracking-exclusive-mode}

:::warning 已弃用

VRChat 未来可能会移除该功能。任何为各种动作提供自身输入的不符合规范的驱动，都会带来更差的用户体验。

*VRChat 在开发期间使用了该功能。所有驱动都为 SteamVR 动作提供了输入，而 VRChat 基于追踪的自定义输入系统本可以自行推断这些输入。手指追踪独占模式允许在开发期间实现全保真的手部追踪，而不会出现双重点击、双重抓取等问题。*

:::

当用户启用手指追踪独占模式时，VRChat 会忽略绑定到除 Pose、SkeletonLeftHand 和 SkeletonRightHand 之外动作的任何 SteamVR 输入。
