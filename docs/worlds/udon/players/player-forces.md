---
title: "玩家作用力"
slug: "player-forces"
hidden: false
createdAt: "2021-01-22T00:32:15.132Z"
updatedAt: "2021-01-22T01:07:11.156Z"
---
以下是作用于玩家的作用力相关节点。有关处理玩家位置的节点，请参阅[玩家位置](/worlds/udon/players/player-positions) 

:::note 仅限本地玩家

这些节点只能用于[本地玩家](/worlds/udon/players/getting-players/#networkingget-localplayer)。它们不能用于远程玩家。

:::



### GetWalkSpeed / SetWalkSpeed
*float，有效范围约为 0-5*

玩家在你的世界中行走的速度。应将其设置得低于奔跑速度。默认值为 2。

### GetRunSpeed / SetRunSpeed
*float，有效范围约为 0-10*

玩家在你的世界中奔跑的速度。应将其设置得高于行走速度。默认值为 4。

### GetStrafeSpeed / SetStrafeSpeed
*float，有效范围约为 0-5*

玩家在你的世界中横向移动的速度。建议设置为与行走速度相同。不受奔跑影响。默认值为 2。

### GetJumpImpulse / SetJumpImpulse
*float，有效范围约为 0-10*

玩家跳跃时施加的力的大小。默认值为 0，因此如果你想在世界中启用跳跃，就需要设置此项。默认的 VRCWorld 预制件将其设置为 3。

### GetGravityStrength / SetGravityStrength
*float，有效范围约为 0-10*

世界重力（设置为地球默认值）的倍数。不要在你的项目中更改 Unity 的 Physics.Gravity，而应在此处获取和设置。默认值为 1。

### Immobilize
*Boolean*

设置为 true 可使玩家固定原地，关闭其移动。请注意，VR 玩家可能仍然可以让其视点稍微移动，但他们的 Avatar 会留在原地。
