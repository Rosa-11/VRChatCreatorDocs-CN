---
description: "跟随你的NPC。"
sidebar_custom_props:
    customIcon: 🗺️
---
# AI Navigation示例 {#ai-navigation-example}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';

## 示例世界 {#example-world}

![example world](/img/worlds/ai-navigation-world.jpg)

Udon可以使用[AI Navigation](/worlds/udon/ai-navigation)。本示例展示了如何将其用于寻路，以及创建在你的世界中行走的NPC角色。

访问[AI Navigation示例世界](https://vrchat.com/home/world/wrld_b7b99484-d92f-403d-ac10-4da7e5a9ce14)亲自体验吧！

## 使用示例 {#using-the-example}

本场景包含一组NPC，它们试图从红色方块前往绿色方块。你可以移动蓝色方块，为它们铺出一条通路。Unity的AI Navigation会在你放下方块时自动重新计算NPC的寻路路径。

在Unity编辑器中打开场景以测试基本功能。它的运行效果应该与VRChat中大致相同。当你进入播放模式时，NPC会尝试到达绿色方块。你可以移动蓝色方块来帮助AI到达目标。你可以按下“Reset”按钮重试。

<HowToImportExample/>

## 技术拆解 {#technical-breakdown}

让我们探索使这个场景运作起来的Udon逻辑、场景结构和网络。

### 逻辑 {#logic}

场景初始化时，每个NPC都会将“NPC Finish”方块设为其`destination`。它们会尝试到达那里，但由于没有直达连接而失败。每当放下一个NPCStep时，它会调用`NavMeshSurface.BuildNavMesh`来重建主表面。如果这带来了通往目标的更好路径，每个Agent就会跳上来继续它们的旅程。每0.5秒，通过比较第一个NPC与目标方块之间的距离和场景开始时保存的初始距离，重新计算进度。如果某次检查时距离小于0.15个单位，就会触发粒子效果，并停止进度检查。然后你可以按下“Reset”按钮重新开始。

### 场景概览 {#scene-overview}

该场景的层级视图包含以下内容：

- “World”包含场景描述符、地板、光照等。
- “Course”定义了NPC可以移动的区域。
  - [NavMeshSurface](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshSurface.html)组件允许Unity在运行时重建导航逻辑。
  - CourseManager UdonBehaviour组件负责进度条及其重置。
  - “NPC Start”和“NPC Finish”子GameObject定义了NPC的起始位置和目标位置。
  - 三个“NPC Step”子GameObject充当NPC的表面。
    - 每个NPC Step都有一个NavMeshModifier组件，它会尝试将其表面添加到主NavMeshSurface。
    - 它还有一个VRCPickup组件和一个UdonBehaviour，后者会在被携带时锁定其旋转以保持水平，并应用重建主导航表面的逻辑。
- “NPCs”有四个子“NPC”GameObject，它们是带有[NavMeshAgent](https://docs.unity3d.com/ScriptReference/AI.NavMeshAgent.html)和UdonBehaviour的胶囊体。
  - NavMeshAgent提供基本的导航和移动逻辑，而UdonBehaviour则包含我们为场景所需的逻辑。
- “Canvas”包含进度指示器和重置按钮。

### 网络 {#networking}
发生的所有事情都应为实例中的所有用户同步，这需要谨慎选择哪些变量和逻辑要同步、哪些要在本地运行。

Course有一个同步变量——一个`progress`浮点数，它在Course的所有者上进行检查，并在每次更新时同步给所有其他用户。其他用户监听该变量的变化，并在其变化时更新自己的进度条。Course还使用Networked Event在`progress`大于`successThreshold`时向所有人调用`Win`事件，该阈值设为`0.8`，以考虑到其他NPC会挡住我们测量进度的那个NPC。

每个NPC由其所有者设备上的`NavMeshAgent`移动，`VRCObjectSync`组件会自动为其他所有人更新其位置。只有NavMesh的所有者会持续重建实际的NavMesh，因为同步的NPC并不需要它。

---

## 自行修改 {#making-your-own-changes}

复制场景后，试试以下一些想法来进一步扩展场景，并探索AI Navigation包的能力：

* 更改路线，将起点和终点分得更远。
* 将可用方块数量从3个减少到2个。
* 让目标点随时间移动。
* 让世界中的每个人都有自己的NPC和NavMesh，把它变成一场比赛！
