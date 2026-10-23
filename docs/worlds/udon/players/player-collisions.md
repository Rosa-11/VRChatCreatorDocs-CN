import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 玩家碰撞 {#player-collisions}

Udon 有三种检测玩家与对象碰撞的方式——**触发器**、**物理**和**粒子**。

## 触发器 {#triggers}

如果你想检测玩家何时进入或离开某个区域，最好的选择是使用 **OnPlayerTrigger **事件。共有三个这样的事件：

- **OnPlayerTriggerEnter** 在玩家的胶囊体进入触发器碰撞体时被调用 
- **OnPlayerTriggerStay** 在玩家的胶囊体位于触发器碰撞体内部的帧上被调用
- **OnPlayerTriggerExit** 在玩家的胶囊体退出触发器碰撞体时被调用。

![一个勾选了 'Is Trigger' 的简单 Box Collider。](/img/worlds/player-collisions-6d9aaf6-trigger-collider.png)

要使用这些事件，请添加一个带有[碰撞体](https://docs.unity3d.com/Manual/collider-shapes-introduction.html)组件的对象，并在碰撞体上勾选 'Is Trigger' 复选框。触发器碰撞体允许对象和玩家穿过它，并在那些对象带有碰撞体时调用事件。你可以在 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/CollidersOverview.html">Unity 文档中的 Collision</UnityVersionedLink> 中了解更多内容。


:::danger

有些边缘情况可能会跳过这些事件之一，例如当玩家瞬移进入/离开碰撞体时，或者移动得非常快时。

:::
## 物理 {#physics}
当你拥有像弹力球或子弹这样通过物理移动的对象时，还有另一组事件可以使用。这些对象带有 IsTrigger 关闭的碰撞体，因此它们会与环境以及彼此发生交互。

要检测这些碰撞体上的事件，你可以使用：
- **OnPlayerCollisionEnter** 在玩家的胶囊体进入碰撞体时被调用。
- **OnPlayerCollisionStay** 在玩家的胶囊体位于碰撞体内部的帧上被调用。
- **OnPlayerCollisionExit** 在玩家的胶囊体退出碰撞体时被调用。
- **OnControllerColliderHitPlayer** 在 CharacterController 撞到玩家时被调用。

:::caution OnPlayerCollision 事件用于移动中的对象

当玩家"走进"静止对象时，这些事件不会被调用。如果你想处理这种情况，请使用触发器碰撞体。

:::
## 粒子 {#particles}
最后，你可以使用 **OnPlayerParticleCollision** 来检测粒子与玩家发生碰撞的情况，前提是该粒子系统已开启 Collision 和 Send Collision Messages。

![此粒子系统已开启 Collision 模块，设置为 'World' 和 '3D' 模式，并开启了 'Send Collision Messages'。](/img/worlds/player-collisions-40d1f44-particle-collisions.png)
## 示例 {#examples}

[Udon 示例场景](https://creators.vrchat.com/worlds/examples/udon-example-scene/)演示了如何使用全部三种检测玩家碰撞的方法。

![查看 Udon 示例场景，了解这些事件可以如何使用。](/img/worlds/player-collisions-f98c33a-udonexamplescene-collisions.png)
