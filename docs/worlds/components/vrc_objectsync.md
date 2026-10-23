---
title: "VRC Object Sync"
slug: "vrc_objectsync"
hidden: false
createdAt: "2017-07-07T19:28:16.383Z"
updatedAt: "2021-10-20T20:08:39.807Z"
---
VRC Object Sync 组件会将游戏对象的变换与实例中的所有玩家同步。它会同步对象的：

- 位置
- 旋转
- 运动学状态（参见 `SetKinematic`）
- 以及重力状态（参见 `SetGravity`）。

## 属性 {#properties}

| 参数 | 描述 |
| --- | --- |
| Allow Collision Ownership Transfer | 如果勾选，当该对象与另一位玩家拥有的另一个对象发生碰撞时，所有权将转移。 |
| Force Kinematic On Remote | 如果勾选，对于所有非拥有该对象的玩家，所附加的刚体将被强制进入运动学模式。 |

## 方法 {#methods}

| 名称 | 摘要 |
| --- | --- |
| SetKinematic(bool value) | 更改运动学状态，通常由对象的 Rigidbody 处理，但为了同步目的而在此控制。当运动学状态开启时，该 Rigidbody 会忽略力、碰撞和关节。 |
| SetGravity(bool value) | 更改重力状态，通常由对象的 Rigidbody 处理，但为了同步目的而在此控制。 |
| FlagDiscontinuity() | 当你想要传送对象时触发此项——你在本帧所做的更改将在不进行平滑处理的情况下被应用。 |
| TeleportTo([Transform](https://docs.unity3d.com/ScriptReference/Transform.html) targetLocation) | 将对象移动到指定位置。 |
| Respawn() | 将对象移回其初始生成位置。 |
