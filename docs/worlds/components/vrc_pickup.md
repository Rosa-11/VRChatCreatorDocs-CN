---
title: "VRC Pickup"
slug: "vrc_pickup"
hidden: false
createdAt: "2017-07-06T00:55:36.747Z"
updatedAt: "2023-05-04T21:43:45.162Z"
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# VRC Pickup

允许玩家拾取、持握和使用对象。

为了正常工作，拾取物需要在同一个游戏对象上同时具有 Rigidbody 和 Collider 组件。

默认情况下，如果本地玩家拾取了一个游戏对象，远程玩家看不到它移动。如果你希望在玩家之间同步拾取物的移动，请添加 [VRC Object Sync](/worlds/components/vrc_objectsync) 组件。

## 组件属性 {#component-properties}

要更改 VRC Pickup 的行为，你可以在 Unity 检视面板中以及通过 Udon 程序更改其属性。

![Unity 检视面板中的 VRC Pickup 组件](/img/worlds/components/vrcpickup.png)

下表列出了你可以配置的所有参数：

| 参数                             | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Auto Hold                        | 控制拾取物在玩家完成抓取动作后是否仍留在玩家手中。更多信息请参见[版本](#versions)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Use Text                         | 当玩家装备此对象时显示的文本，提示他们使用它。<br/><br/>需要启用“Auto Hold”。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Interaction Text                 | 当用户在 VR 中用手悬停在该对象上，或在非 VR 中注视该对象时显示的文本。如果为空，则改为显示一个默认标签。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Proximity                        | 用户可以拾取该对象的最大距离。更多详情请参见[接近规则](#proximity-rules)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Orientation                      | 对象的持握方式。更多详情请参见[朝向规则](#orientation-rules)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Exact Gun                        | 当 Orientation 设置为 Gun 时，控制对象的持握方式。更多详情请参见[朝向规则](#orientation-rules)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Exact Grip                       | 当 Orientation 设置为 Grip 时，控制对象的持握方式。更多详情请参见[朝向规则](#orientation-rules)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Pickupable                       | 控制该对象当前是否可以被拾取。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Disallow Theft                   | 控制是否防止该对象在被远程玩家持握时被拾取。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Allow Manipulation When Equipped | 控制玩家在使用键盘或控制器时，是否可以在持握拾取物时对其进行操作。[^1]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Momentum Transfer Method         | 当该拾取物撞击一个物理同步对象时，此项定义了碰撞力如何传递给另一个对象，使用 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Rigidbody.AddForceAtPosition.html">Rigidbody.AddForceAtPosition</UnityVersionedLink>。<br/><br/>只有在另一个对象开启了“AllowCollisionTransfer”时才会施加力。                                                                                                                                                                                                                                                                                                                                       |
| Throw Velocity Boost Min Speed   | 对象被释放时需要以多快的速度移动才会应用加速倍率，单位为世界单位每秒。负值表示不应用加速。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Throw Velocity Boost Scale       | 当该对象以足够快的速度被抛出时，抛出速度应缩放多少，作为应用于实际抛出速度的乘数。<br/><br/>1 表示不变，2 表示速度加倍，0.5 表示速度减半，依此类推。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Outline Renderers                | 当悬停在拾取物上时被描边的渲染器数组。仅支持 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/MeshRenderer.html">Mesh Renderers</UnityVersionedLink> 和 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/SkinnedMeshRenderer.html">Skinned Mesh Renderers</UnityVersionedLink>。如果没有列出有效的渲染器，则会自动确定要描边的渲染器。<br/><br/>通常你不需要更改此项，除非你的对象包含不应参与描边的“隐藏”网格。 |

[^1]: 当允许时，键盘和鼠标用户可以使用 I、J、K、L、U 和 O 键旋转持握的拾取物，而控制器用户可以通过按住 L1 并移动摇杆来旋转拾取物。

## 版本 {#versions}

![检视面板中的拾取物版本下拉菜单](/img/worlds/components/pickup_version.png)

你可以在组件上选择要使用的 VRCPickup 版本。默认情况下，创建新组件时会选择最新版本。

VRChat 建议使用可用的最新版本。

### 版本 1.0 {#version-10}

VRCPickup 组件的基础版本。

在该版本中，Auto Hold 属性是一个下拉菜单，包含以下选项：

- **Yes：** 拾取物会一直留在玩家手中，直到触发抓取或放下动作。
- **No：** 一旦初始的抓取动作完成，拾取物就会被释放。
- **Sometimes：** 与上面的“Yes”类似，但仅适用于使用 Keyboard、Mouse、Gamepad 和 Vive Wand 输入的玩家。这是一种旧类型，大多数情况下不应使用。
- **Auto Detect：** 应用与“Sometimes”相同的逻辑，但还需要定义 Gun 或 Grip 才能自动持握（AutoHold）。这是一种旧类型，大多数情况下不应使用。

### 版本 1.1 {#version-11}

Auto Hold 属性被简化为一个复选框——如果勾选，物品会在玩家首次执行“抓取”动作时附着到玩家手上，并在他们第二次执行“抓取”（或使用他们映射到控制器上的“放下”动作）时掉落。如果未勾选，物品会在初始抓取释放后立即掉落。

## 接近规则 {#proximity-rules}

“Proximity”值定义了你的拾取物可从多远距离被抓住。它以世界单位（米）表示，其中一个默认立方体的边长等于 1 个单位。

:::note

本节描述的所有规则同样适用于带有 `Interact` 事件的 UdonBehaviour，它们在检视面板中也会显示一个“Proximity”滑块。

:::

有 2 种抓取机制会用到 Proximity 值：

### 射线检测 {#raycast}

如果你离拾取物较远，或者你不在 VR 中游玩，当从你的手（VR）或头部（非 VR）发出的“激光”与拾取物对象上的碰撞体相交时，拾取物会被高亮。用于与 Proximity 比较的距离计算方式因你是否在 VR 中而不同：

- VR：激光原点（即你的手部控制器）与碰撞体上撞击点之间的米数距离
- 非 VR：激光原点（即你的头部或主摄像机位置）与碰撞体上撞击点之间的米数距离，减去一个“额外触及”值，以补偿无法向前移动双手的问题。这是一个近似值，也会考虑你的虚拟形象（Avatar）缩放（“更长的手臂”）。由于它是从距离中减去的，因此它将允许你抓取技术上超出“Proximity”范围、但在 VR 中站在该位置移动手臂时本可以抓取的对象。

### 悬停（仅 VR） {#hover-vr-only}

如果你的手离某个对象足够近，即使朝向 UI 激光方向的射线不会与该对象相交，拾取物也会被高亮。这样可以实现更自然的对象“抓取”。触及距离是一个以你的手为中心、半径为 0.4 米乘以你的 Avatar 缩放的球体（注意，该值不能直接与用户可用的“Avatar 缩放”系统相比较，尽管以那种方式更改 Avatar 缩放会影响触及范围）。

- “Proximity”值仍会与你的手和拾取物上的碰撞体之间的原始距离进行比较，这意味着所述的“触及距离”只是“Hover”模式触发所需接近程度的上限。
- 例如，将 Proximity 设置为 0 将要求手位于碰撞体_内部_才能使拾取物被高亮（不过，在非 VR 中它仍然可以被抓取，因为非 VR 用户会获得“额外触及”作为补偿）。
- 作为一项高级技巧，你可能希望根据[Avatar 缩放系统](/worlds/udon/players/player-avatar-scaling)提供的数据来调整 Proximity 值。

## 朝向规则 {#orientation-rules}

拾取物可以通过 Orientation 属性以三种朝向之一被持握。

当使用 Gun 或 Grip 朝向时，建议将 Exact Gun 和 Exact Grip 变换作为你的拾取物的子变换。不建议分配非子级的变换或完全不分配，因为这可能导致意外行为。

### Any

拾取物可以自由地朝任意方向持握。这是默认行为，不需要额外的设置。

### Gun

拾取后，拾取物会旋转，使 Exact Gun 的 +X 朝向前方（玩家瞄准的方向），其 +Z 朝向上方。

这对于任何你希望始终以特定朝向持握的拾取物都很有用。

### Grip

与 Gun 类似，不同之处在于朝向会根据抓取玩家是否在 VR 中而变化：

- 在 VR 中，拾取物会旋转，使 Exact Grip 的 +X 朝向前方，其 +Z 朝向上方。在此基础上，它随后会向前俯仰 30 度。
- 在非 VR 中，拾取物则旋转，使 Exact Grip 的 +Z 朝向前方，其 +X 朝向下方。

这样做的效果是，对象在 VR 中大致朝上持握，而在非 VR 中则朝前。这对于需要在 VR 和非 VR 之间具有不同特定朝向的拾取物很有用。例如，魔杖或类似对象可能由 VR 玩家横放在手掌中持握，而由非 VR 玩家则直接朝前持握。
