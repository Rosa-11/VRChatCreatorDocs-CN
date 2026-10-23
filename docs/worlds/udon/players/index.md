---
sidebar_position: 1
---
# 玩家 API {#player-api}

你可以使用 Udon 获取世界实例中玩家的信息。

Udon 通过 VRCPlayerApi 与玩家交互。每个玩家都有一个 VRCPlayerApi 对象，当有玩家加入或离开时，你的世界会在任何监听这些事件的 UdonBehaviour 上触发 OnPlayerJoined / OnPlayerLeft 事件。

本页包含使用一些通用玩家属性与方法的信息。由于你可以用 VRCPlayerApi 对象做非常多的事情，我们把部分信息整理到了以下页面中：

* [获取玩家](/worlds/udon/players/getting-players)
* [玩家位置](/worlds/udon/players/player-positions)
* [玩家作用力](/worlds/udon/players/player-forces)
* [玩家碰撞](/worlds/udon/players/player-collisions)
* [玩家音频](/worlds/udon/players/player-audio)
* [玩家虚拟形象缩放](/worlds/udon/players/player-avatar-scaling)
* [玩家事件](/worlds/udon/graph/event-nodes#player-events)

## 常用的属性与方法 {#generally-useful-properties-and-methods}

### IsValid
*VRCPlayerApi, Boolean*

在尝试获取或设置玩家的任何内容之前，先检查 IsValid 是否返回 true。如果某个玩家在你保存了对他的引用之后离开了，这将返回 False。为了在 Graph 中更方便地使用，可以搜索通用的 "IsValid" 方法，它对任何 Object 都有效，因为它会为你提供 True 和 False 两条独立的流程。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![一张 Udon Graph 截图，显示 OnPlayerLeft 事件连接到 IsValid 节点。](/img/worlds/player-isvalid.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
   public override void OnPlayerLeft(VRCPlayerApi player)  
   {  
	if (Utilities.IsValid(player))
	{
		// 玩家有效
	}
	else
	{
		// 玩家无效
	}
}  
```

</TabItem>
</Tabs>



### EnablePickups
*VRCPlayerApi, Boolean*

关闭玩家拾取并使用世界中 VRCPickup 对象的能力。此属性默认处于*开启*状态，因此只有在你想要关闭它时才需要使用该方法。

### get displayName
*VRCPlayerApi*

获取玩家显示的名称（可能与 Username 不同，Username 用于登录 VRChat，且不会公开暴露）

### Get isLocal
in: *VRCPlayerApi*

out: *Boolean*

告诉你给定玩家是否为本地玩家。

### Get isMaster
in: *VRCPlayerApi*

out: *Boolean*

告诉你给定玩家是否为[实例主控者](/worlds/udon/networking#the-instance-master)。

### Get isInstanceOwner
in: *VRCPlayerApi*

out: *Boolean*

告诉你给定玩家是否为当前的实例所有者。

### Get isVRCPlus
in: *VRCPlayerApi*

out: *Boolean*

告诉你给定玩家是否拥有生效中的 VRC+ 订阅。

### Get isSuspended
in: *VRCPlayerApi*

out: *Boolean*

告诉你玩家使用的设备是否处于挂起状态。如果设备进入睡眠模式或切换到其他应用，则该设备处于挂起状态。在挂起期间，设备不会运行 Udon 代码，也不会响应网络事件，直到玩家重新打开 VRChat。

无论使用什么平台，你的代码都应考虑到任何设备随时可能进入挂起状态。PC 玩家目前从不会进入挂起状态，但不应假设总是如此。

注意，对于本地玩家，`isSuspended` 始终为 `false`——本地玩家挂起时 Udon 无法运行。

### GetPickupInHand
in: *VRCPlayerApi, Hand (none, left, right)*

out: *VRCPickup*

获取玩家在指定手上持有的拾取物。仅对本地玩家有效。如果未找到 VRCPickup，则返回 null。

### IsOwner
in: *VRCPlayerApi, GameObject*

out: *Boolean*

告诉你玩家是否为给定 GameObject 的所有者，这对同步很重要。

### IsUserInVR
in: *VRCPlayerApi*

out: *Boolean*

告诉你玩家是否正在使用 VR 头显。

### PlayHapticEventInHand
*VRCPlayerApi, Hand, float, float, float*

如果玩家有触觉控制器，则让其振动。float 输入应在 0-1 范围内。*duration* 是它们振动的时间长度，*amplitude* 是它们振动的强度，*frequency* 是它们振动的速度。不同控制器之间的感受可能会有相当大的差异。

### UseAttachedStation
*VRCPlayerApi*

让玩家进入与本 UdonBehaviour 位于同一 GameObject 上的 Station。

### SimulationTime
*float*

玩家的[模拟时间](/worlds/udon/networking/network-components)。

### UseLegacyLocomotion
*VRCPlayerApi*

**不推荐**——为该玩家开启旧版移动方式，模仿玩家在 VRChat 已弃用的 SDK2 中移动的方式。启用旧版移动方式后，它会一直保持启用状态，直到用户离开你的世界。

## 语言 {#language}

### GetCurrentLanguage
*string*

获取本地用户所选的语言。该值采用 RFC 5646 语法格式。（`en`、`ja`、`es`、`zh-CN` 等）

### GetAvailableLanguages
*string[]*

获取玩家可在 VRChat 设置中选择的所有可用语言。该值采用 RFC 5646 语法格式。（`en`、`ja`、`es`、`zh-CN` 等）
