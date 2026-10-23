# 玩家 {#player}

与 CyanEmu 相比，ClientSim 中玩家的表示方式已被拆分为许多组件。每个组件负责处理玩家的一方面。下面你可以看到本地玩家和远程玩家预制件的层级视图。
![本地玩家层级视图](/img/worlds/clientsim/player-local-hierarchy.png)![远程玩家层级视图](/img/worlds/clientsim/player-remote-hierarchy.png)

## ClientSimPlayer

ClientSimPlayer 类是容纳玩家所有系统的容器。虽然本地玩家和远程玩家都有 ClientSimPlayer，但它只为本地玩家初始化。除 [Avatar](#avatar) 和 VRCPlayerApi 可更改的数据之外，远程玩家的所有系统都保持空白。ClientSimPlayer 是 Player 预制件顶层对象上的第一个组件。在检视面板中，你可以在运行时查看并修改 VRCPlayerApi 数据，例如 Locomotion Settings 和 Audio Settings。

## TrackingProvider

TrackingProvider 接口是一种通用方式，用于定义应如何控制玩家的追踪数据。抽象的 TrackingProviderBase 类提供头部、手部和游戏区（playspace）的位置数据，还会根据头部高度确定玩家当前的姿态。可以对追踪提供器进行缩放，以将玩家相机向上或向下移动，从而帮助测试各种玩家虚拟形象场景。它会监听 PlayerHeightUpdate 事件，并根据请求的玩家身高计算新的追踪缩放。默认的虚拟形象身高为 1.9，对应 TrackingScale 1。由于该类是抽象的，因此必须对其扩展才能在 ClientSim 中使用。目前 ClientSim 中仅包含 DesktopTrackingProvider。要在 ClientSim 中实现 VR，需要新增 VRTrackingProvider。追踪提供器应当是 [PlayerController](#playercontroller) 的子对象，但在实现 VR 时需要重新考虑，因为游戏区的 x/z 偏移不会应用于玩家控制器。

### DesktopTrackingProvider

目前这是 ClientSim 中唯一实现了的 TrackingProvider。该追踪提供器将手部位置锁定为相对于相机的位置。相机高度会根据[蹲下和趴下输入事件](input.md)修改。每帧该追踪提供器都会检查视角输入的变化，并更新相机的 x 旋转（上/下）。如果玩家坐在固定座位中，则头部的 y 旋转会被解锁，允许玩家左右转动，最多可偏离游戏区旋转 90 度。

## PlayerController

PlayerController 现在只控制玩家的移动。在 CyanEmu 中，PlayerController 类包含了与玩家相关的所有内容。现在这些系统已被拆分出来，使 PlayerController 专注于单纯处理玩家移动。每帧控制器都会检查移动输入以及 [TrackingProvider](#trackingprovider) 姿态，以了解该帧玩家应移动多少。

## PlayerStationManager

PlayerStationManager 管理玩家与固定座位（station）进行交互的方式。它保存玩家当前所在的座位，以及玩家是否被锁定在该座位上。当玩家被锁定到座位时，在该帧结束时，对于所有 Update、LateUpdate 和 FixedUpdate 方法，[PlayerController](#playercontroller) 的位置都会更新为座位的位置。这一操作在该帧结束时进行，以确保其他修改座位位置的脚本先执行。 

## InteractManager

InteractManager 负责判断给定的 GameObject 是否可交互，并执行交互。它使用 [TrackingProvider](#trackingprovider) 当前的 TrackingScale 以及每个 Interact 的邻近值来计算玩家当前可交互的距离。

## Raycaster

ClientSim 的交互检测通过 Raycaster 来处理。该系统会根据提供给 Physics.Raycast 的射线搜索可交互对象。射线检测时会使用 [InteractiveLayerProvider](interactive-layer-provider.md) 来确定要考虑哪些图层。然后根据找到的组件对所有命中的对象进行过滤。带有 UIShape 的对象始终优先。InteractManager 用于确定对象上可与之交互的组件。每次射线检测都会返回一个 RaycastResult。其中包含有关射线、命中的对象以及可交互类型（如果存在）的信息。

### RayProvider
Raycaster 使用 RayProvider 来了解从哪个方向和起点发射射线。RayProvider 是一种通用方式，让你无需了解确切细节即可提供射线。ClientSim 实现了两种 RayProvider：

#### CameraRayProvider
给定一个相机和当前鼠标位置，创建一条从相机穿过鼠标的射线。当 TrackingProvider 设置为非 VR 时，使用的就是该 RayProvider。

#### TransformRayProvider
给定一个 transform，根据该 transform 的位置和前向方向创建一条射线。当 TrackingProvider 设置为 VR 时，这用于从手部发射射线。

## PlayerRaycaster

PlayerRaycaster 负责在世界中搜索可交互对象，并根据搜索结果发送事件。它还会为左手和右手更新 [PlayerHand](#playerhand) 系统。初始化时，PlayerRaycaster 会创建两个 [Raycaster](#raycaster)，一个用于左手，另一个用于右手。如果 TrackingProvider 不是 VR（即桌面模式），则右手使用带有基于鼠标的 [RayProvider](#rayprovider) 的 Raycaster。左手不进行初始化，因为在非 VR 环境下它永远不会被使用。如果 [TrackingProvider](#trackingprovider) 处于 VR 模式，则左手和右手的 Raycaster 会使用基于 transform 的射线提供器进行初始化，该提供器使用 TrackingProvider 的手部 transform。每帧都会更新两个手部的 Raycaster 系统以搜索可交互对象，结果会通过 [EventDispatcher](event-dispatcher.md) 发送。每只手最后找到的交互对象会保存为该手悬停的交互对象。如果悬停的交互对象是 Pickupable，则该 Pickupable 会被设置为对应 PlayerHand 的悬停 Pickupable。如果在悬停于某个交互对象上时该手触发了 Use 输入动作，则会与该悬停的对象进行交互。

## PlayerHand

PlayerHand 系统负责管理 Pickupable 对象。[PlayerRaycaster](#playerraycaster) 会设置当前悬停的可拾取对象。然后 PlayerHand 会监听 Grab 输入事件，以确定何时拾取悬停的 Pickupable。PlayerHand 还会监听 Use 和 Drop 事件，以对当前持有的可拾取对象执行操作。如果可拾取对象是运动学的，则每帧都会直接设置该对象的位置，使其与 PlayerHand 的刚体 transform 匹配。如果可拾取对象不是运动学的，则会通过固定关节将其附加到 PlayerHand 的刚体上。当右手持有可拾取对象时，可以使用不同的 Manipulate 绑定来操控该对象。 

## PlayerAvatarManager

PlayerAvatarManager 管理与玩家虚拟形象相关的项目。本地玩家和远程玩家都有 Avatar Manager。所有玩家的 Avatar 都是 VRChat Default Robot。该管理器负责向 VRCPlayerApi 提供 Avatar 信息。GetBonePosition 和 GetBoneRotation 在这里实现为对 Animator.GetBoneTransform 的包装。只有本地玩家的 Avatar 管理器会被正确初始化，这使它能够监听 [TrackingScale](#trackingprovider) 变更[事件](event-dispatcher.md)，进而更新 Avatar 的缩放以匹配新的追踪缩放。

## Reticle

ClientSimReticle 系统负责在 Unity Game 视图的中心显示准星图标。该系统只应在 [DesktopTrackingProvider](#desktoptrackingprovider) 下可用。可以通过设置菜单禁用准星。除了中心准星之外，每当 [PlayerRaycaster](#playerraycaster) 悬停在带有 UIShape 的对象上时，它都会在鼠标位置显示一个指针。该指针不限于屏幕中心，并且在松开鼠标时仍会显示。鼠标位置由 [ClientSimBaseInput](input.md) 提供。
