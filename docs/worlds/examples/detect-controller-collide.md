---
title: 检测控制器碰撞
description: "检测CharacterController与某物发生碰撞。"
sidebar_custom_props:
    customIcon: 🧱
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';
import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

![检测控制器碰撞](/img/worlds/examples/detect-controller-collide.png)

Unity事件<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/MonoBehaviour.OnControllerColliderHit.html">OnControllerColliderHit</UnityVersionedLink>可用于判断<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/CharacterController.html">CharacterController</UnityVersionedLink>何时与另一个对象发生碰撞。VRChat添加了事件[OnControllerColliderHitPlayer](/worlds/udon/players/player-collisions#physics)，用于检测CharacterController何时与另一个玩家发生碰撞。该事件包含一个`ControllerColliderPlayerHit`结构体，其中引用了被碰撞玩家的[VRCPlayerApi](https://udonsharp.docs.vrchat.com/vrchat-api/#vrcplayerapi)对象。

访问[检测控制器碰撞示例世界](https://vrchat.com/home/world/wrld_7da557ad-3584-4b0a-bf61-6cbba33701d4)亲自体验吧！

## 使用示例 {#using-the-example}

在Unity编辑器中启动场景，或在VRChat中访问该世界。查看世界中的画布，观察当胶囊体“character”与“Last hit:”标签下方的空白区域发生碰撞时，该区域会变为“Wall”。

站在胶囊体的生成点与墙壁之间，让它前往墙壁的途中撞到你，当它与你碰撞时，你应该会看到标签变为你的显示名称！它会重置到生成点并继续撞向你，直到你移到一旁。届时，它会再次撞到墙壁，并将标签改回“Wall”。

<HowToImportExample/>

## 技术拆解 {#technical-breakdown}

该场景有一个`DetectControllerCollide` GameObject，其中包含示例的主要预制件和逻辑。

第一个子对象`CharacterController`上有一个CharacterController组件，以及一个带有Graph Program的UdonBehaviour，用于检测碰撞的逻辑。

### OnCharacterControllerHitExampleGraph

#### 变量 {#variables}

该图表包含以下公共变量：

| **Name**                           | **Description**                                                                                   |
|------------------------------------|---------------------------------------------------------------------------------------------------|
| `CharacterController`              | 指向CharacterController的引用，包含它是为了在`Update()`期间运行`Move()`方法。      |
| `float` moveSpeed                  | characterController移动的速度，内部会乘以`Time.deltaTime`。  |
| `TextMeshProUGUI` hitNameText      | 指向目标textField的引用，在检测到碰撞时更新。                       |
| `Transform` characterControllerStartPos | characterController每次开始移动的起始位置。            |

#### 事件 {#events}

该图表有四个事件：

* `Update()`持续运行，调用characterController上的`Move()`使其向前移动。
* `OnControllerColliderHit()`在characterController与非玩家对象发生碰撞时运行。对象名称从事件传入的`ControllerColliderHit`结构体中提取，并设置到`hitNameText`字段。
* `OnControllerColliderHitPlayer()`在characterController与玩家发生碰撞时运行。玩家名称从事件传入的`ControllerColliderPlayerHit`结构体中提取，并设置到`hitNameText`字段。
* `__ResetCharacterController()`是一个自定义事件，由两个碰撞事件调用，用于将characterController重置回起始位置。
