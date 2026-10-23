import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 网络组件 {#network-components}

本文介绍你可以在 Udon 程序中使用的网络组件、属性和事件。

## 网络属性 {#networking-properties}

你可以从网络系统中*获取*的特殊属性：

| 属性名称    | 描述 |
| ---------------- | ----------- |
| LocalPlayer      | 返回本地玩家的 [VRC Player API](/worlds/udon/players) 对象。 |
| IsInstanceOwner  | 对于 Invite、Invite+、Friends 和 Friends+ 实例中的实例创建者返回 `true`。<br />在 Group 实例、Public 实例以及 SDK 的 "Build & Test" 模式中始终返回 `false`。 |
| InstanceOwner    | 返回拥有该实例的玩家的 [VRC Player API](/worlds/udon/players) 对象。如果该拥有者当前不在实例中，则返回 `null`。如果拥有者返回，则再次返回实例拥有者。<br />实例拥有者拥有特殊的审核权限。实例所有权永不改变。
| IsMaster         | 如果本地玩家是[实例管理员](/worlds/udon/networking/#the-instance-master)，则返回 `true`。管理员是网络游戏对象的默认拥有者。<br/>你不应将此用于安全用途或限制对世界的访问。请改用 `IsInstanceOwner` 或实现审核系统。 |
| Master           | 返回当前实例管理员的玩家的 [VRC Player API](/worlds/udon/players) 对象。始终有效。 |
| IsNetworkSettled | 如果实例中的所有数据都已反序列化、应用并可供使用，则返回 `true`。 |
| IsClogged        | 如果试图发送出去的数据过多，则返回 `true`。你可以用它等待网络不再拥堵，或调整你的逻辑。 |
| SimulationTime   | 返回玩家或带有网络组件的对象的当前模拟时间。详情见下文。 |

### 模拟时间 {#simulation-time}

模拟时间是一个时间戳，指某个对象在时间上被模拟到多久之前。该值在内部用于 [`VRCObjectSync`](/worlds/udon/networking/network-components#vrc-object-sync) 和[玩家](/worlds/udon/players#simulationtime)，但也可以在 Udon 脚本中使用。例如，如果你的 ` Time.realtimeSinceStartup ` 为 45，而某个对象的 SimulationTime 为 44.5，那么 VRChat 认为需要 500ms 的延迟才能在该时刻平滑地复制该对象。你可以用这个数字了解 `VRCObjectSync` 正在做什么，或创建你自己的类似 `VRCObjectSync` 的系统。例如，如果你执行 `Time.realTimeSinceStartup - SimulationTime(player)`，就能准确得知该玩家在那一刻有多大的延迟。
 
模拟时间会根据网络状况频繁调整，包括延迟、可靠性和接收数据包的频率等诸多因素。这种调整的目标是尽可能接近实时以减少延迟，同时留出足够的余量以防止卡顿。导致卡顿的因素有很多，但一个例子是从拥有者那里接收的数据包耗尽。

## 网络事件 {#networking-events}

这些是网络系统中可用来控制数据如何同步的事件。

### OnPreSerialization
该事件在序列化数据即将发送出去之前触发，是设置你希望为其他玩家更新的同步变量的好地方。

### OnDeserialization
该事件在同步数据从字节转换回可用变量时触发。它不会告诉你*哪些*数据被更新了，但可以作为更新所有监视同步变量的内容的起点，或者用于将新数据与旧数据对比并做出特定更新的地方。

### OnDeserialization(DeserializationResult)
与 OnDeserialization 相同，但带有关于请求发送和接收时间的附加信息。

#### DeserializationResult
`DeserializationResult` 包含三个属性：
- `sendTime`：此消息发送时的时间（以秒为单位）。
- `receiveTime`：此消息接收时的时间（以秒为单位）。
- `isFromStorage`：如果为 true，则包含的数据是从存储中恢复的，而不是从其他实时客户端接收的。

`sendTime` 和 `receiveTime` 都以从你的视角看 VRChat 启动以来的秒数来衡量（参见 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Time-realtimeSinceStartup.html">Time.realtimeSinceStartup</UnityVersionedLink>）。这意味着，如果你想知道某次反序列化是在多少秒之前发送的，可以用 `Time.realtimeSinceStartup - sendTime` 计算得出。

请注意，每个用户的 `Time.realtimeSinceStartup` 都不同，因此一个玩家的 `sendTime` 会与另一个玩家的 `sendTime` 不同。因此，如果你想把特定的 `sendTime` 同步给其他玩家，需要减去你的 `Time.realtimeSinceStartup` 来计算出它的偏移量。然后，当其他玩家收到该偏移量时，可以再加上他们自己的 `Time.realtimeSinceStartup`，从而确定相对于他们自己时钟的绝对时间。

如果消息是在你启动 VRChat 之前由其他人发送的，SendTime 可能为负数。

### OnPostSerialization
该事件在尝试发送序列化数据之后触发。它返回一个 **SerializationResult** 结构体，包含一个 'success' 布尔值和一个表示已发送字节数的 'byteCount' 整数。

### OnSpawn
该事件已弃用——如果你想在对象从池中"Spawn"时做些什么，请使用常规的 OnEnabled 事件。

### OnOwnershipRequest
该事件在有人请求获取所有权时触发。它包含请求者和被请求拥有者的 PlayerObject。要批准或拒绝该变更，请将布尔值设置到 "Set Return Value" 节点中。此逻辑在请求者和拥有者两端都会本地运行，因此请注意，两端逻辑不一致会导致不同步。这最可能表现为拥有者意外拒绝了所有权转移。

### OnOwnershipTransferred
当对象的拥有权发生变更时，该事件会为实例中的每个人触发，并包含新拥有者的 PlayerObject。

### OnMasterTransferred
当实例管理员因上一任实例管理员离开实例而发生变化时，该事件会为实例中的每个人触发。
它包含一个参数 `newMaster,`，即成为管理员的玩家的 [VRC Player API](/worlds/udon/players) 对象。该参数始终有效。
对于加入新实例的第一个用户，该事件将在 `OnPlayerJoined` 之后触发，表示管理员状态是从"无"转移而来的。

### OnVariableChanged
这是一种特殊类型的事件，你可以为任何变量创建。在 Udon Graph 中，按住 alt 将变量拖放到图中即可创建它。该事件检测变量何时发生变化，其中也包括你从其他玩家那里接收到同步变量的时候。
* 更改数组的内容不会触发变化，因为数组本身仍是同一个。
* OnVariableChanged 在变量本身被写入时立即触发，而 OnDeserialization 在所有同步变量写入完成后才触发。这意味着，如果你使用一个同步变量的 OnVariableChanged 并尝试获取另一个同步变量的内容，不保证它已经更新为最新的同步数据。
  
## VRC Object Sync
该组件会自动同步你所挂载对象上的 Transform（位置、旋转、缩放）和 Rigidbody（物理）。它有一些你可以访问的特殊方法和属性：

### FlagDiscontinuity
当你想传送对象时触发此项——你在这一帧所做的更改将立即应用而不会平滑过渡。

### Set/Get Gravity
开启重力时，此刚体会受重力影响并落向地面。通常，重力是刚体的属性。但是，当你使用 VRCObjectSync 时，此属性必须改由 VRCObjectSync 组件控制。你可以使用这些函数来实现。这实际上表现得像一个同步变量，因此**只有拥有者可以设置重力。**

### Set/Get Kinematic
开启运动学时，此刚体会忽略力、碰撞和关节。通常，运动学是刚体的属性。但是，当你使用 VRCObjectSync 时，此属性必须改由 VRCObjectSync 组件控制。你可以使用这些函数来实现。这实际上表现得像一个同步变量，因此**只有拥有者可以设置运动学。**

### Respawn
将此对象传送回其起始位置和旋转，并清除其速度。
具体而言，它会把 **DiscontinuityHint** 设为 true，使以下更改立即生效而非平滑过渡。然后它会：
* 将 transform.position 设为初始位置
* 将 transform.rotation 设为初始旋转

如果对象带有刚体：
* 将 rigidbody.velocity 设为 Vector3.zero
* 将 rigidbody.angularVelocity 设为 Vector3.zero
* 将 rigidbody.position 设为初始位置
* 将 rigidbody.rotation 设为初始旋转
  
## VRC Object Pool
VRC Object Pool 提供了一种轻量级的方法来管理游戏对象数组。该池会管理并同步它所持有的每个对象的激活状态。

要使对象处于激活状态，池的拥有者会触发 **TryToSpawn** 节点，该节点将返回被激活的对象；如果没有可用的对象，则返回 null 对象。对象可以由池的拥有者通过 **Return** 节点归还到池中并自动禁用。

后加入的玩家会看到这些对象在适当的地方被自动设为激活或非激活状态。
