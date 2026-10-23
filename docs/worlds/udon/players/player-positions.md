---
title: "玩家位置"
slug: "player-positions"
hidden: false
createdAt: "2021-01-22T00:32:00.432Z"
updatedAt: "2023-03-28T19:07:26.827Z"
---
玩家的位置、旋转和速度都可以通过 Udon 访问和更改。以下所有节点都需要 `VRCPlayerAPI` 作为输入。

有关处理玩家作用力的节点，请参阅[玩家作用力](/worlds/udon/players/player-forces)。 
### GetPosition

获取玩家的位置。

**输出**
- `Vector3`：玩家在世界空间中的位置。 


### GetRotation

获取玩家的旋转。

**输入**

**输出**
- `Quaternion`：玩家在世界空间中的旋转。 

### GetBonePosition

获取玩家 Avatar 中指定骨骼的位置，如果该骨骼不存在则返回 Vector3.Zero (0,0,0)。请注意，Avatar 可能并不都在你预期的位置拥有相同的骨骼，因此根据骨骼位置推断玩家的身高、姿势等属性的做法要谨慎。

**输入**
- `HumanBodyBones`：要检查的骨骼。

**输出**
- `Vector3`：骨骼在世界空间中的位置。
### GetBoneRotation

获取玩家 Avatar 中指定骨骼的旋转，如果该骨骼不存在则返回 Quaternion.Identity (0,0,0,1)。请注意，Avatar 可能并不都在你预期的位置拥有相同的骨骼，因此根据骨骼旋转推断玩家的身高、姿势等属性的做法要谨慎。

**输出**
- `Quaternion`：骨骼在世界空间中的旋转。

### GetTrackingData

获取名为 TrackingData 的结构体，其中包含独立的 Position 和 Rotation 数据。这是获取玩家头部和手部位置与旋转数据的推荐方式。对于本地玩家，它会从 TrackingManager 返回数据（即来自其头显／追踪器的数据）；对于远程玩家，它会从 RightHand、LeftHand 和 Head 骨骼返回数据。Origin 对本地 VR 用户返回其游玩空间的中心，而对本地桌面用户和所有远程用户则返回玩家位置。AvatarRoot 返回 Avatar 根变换的数据（与玩家胶囊体所附加的变换相同）。对于使用全身追踪的用户，AvatarRoot 不会随头部朝向旋转。如果你需要反映玩家总体朝向的数据，请考虑改用 GetRotation。

**输入**
- `TrackingDataType`：要检查的追踪数据类型。

**输出**
- `TrackingData`：指定类型的玩家追踪数据。 

### GetVelocity

获取玩家移动的速度和方向。

**输出**
- `Vector3 velocity`：玩家在世界空间中的速度。 

### SetVelocity

设置玩家移动的速度和方向。如果对本地玩家调用 SetVelocity，其 'IsGrounded' 属性会被设置为 false，因为在此期间他们并非直接控制自己的移动。

**输入**
- `Vector3`：玩家在世界空间中的速度。 

### IsPlayerGrounded

获取玩家是否接触地面，这关系到跳跃能否使用。

**输出**
- `bool IsPlayerGrounded`：玩家是否在地面上。 

### TeleportTo

将[本地玩家](/worlds/udon/players/getting-players/#networkingget-localplayer)发送到新的位置和指定的旋转，除非 Station 不允许这样做。

- Udon 只能传送本地玩家。请使用[网络](/worlds/udon/networking/)让其他玩家自行传送。 
- Station 可以阻止 Udon 传送玩家。
- 当你频繁传送或传送距离非常短时，请考虑将 `lerpOnRemote` 设置为 `false`。
- 将玩家传送超过 1 米的距离或超过 45 度的旋转会重置其动画和 IK，**除非** `lerpOnRemote` 设置为 true，因为这表示该传送被视为普通移动。

:::warning

请不要在网络更新期间（例如 [OnDeserialization](/worlds/udon/networking/network-components/#ondeserialization)）传送玩家。否则，他们的 Avatar 可能会在传送过程中意外地与几何体发生碰撞。请改用 [SendCustomEventDelayedFrames](/worlds/udon/graph/special-nodes/#sendcustomeventdelayedframes) 将传送延迟一帧。

:::

**输入**
- `Vector3 teleportPos`：目标位置（世界空间）。
- `Quaternion teleportRot`：目标旋转（世界空间）。
- `SceneDescriptorSpawnOrientation TeleportOrientation`（可选）：如何让玩家与目标位置和旋转对齐。 
- `bool lerpOnRemote`（可选）：是否为远程玩家对玩家的移动进行插值。
    - （默认）如果为 `false`，传送对远程玩家来说看起来是瞬间完成的。网络带宽开销会增加。如果传送距离足够大，Avatar 动画和 IK 会被重置。
    - 如果为 `true,`，传送会被视为普通的玩家移动，远程玩家看到的移动会显得平滑。Avatar 动画和 IK 不会因传送而被重置。
