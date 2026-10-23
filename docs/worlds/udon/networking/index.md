# 网络 {#networking}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

多人体验是 VRChat 的核心。要创造一个能对玩家做出反应并在玩家之间同步数据的世界，你需要了解 VRChat 中的网络。

本指南介绍核心的网络概念，并提供深入学习的方向。

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FMb6ZYBEhxiI%3Flist%3DPLe9XHNvXcouQjg5GULWGLj1tMzeythnQi&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DMb6ZYBEhxiI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FMb6ZYBEhxiI%2Fhqdefault.jpg&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=youtube" width="854" height="480" scrolling="no" title="YouTube 嵌入视频" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>

## 概述 {#overview}

VRChat 网络围绕三个核心概念构建：

- **变量（Variables）**——变量存储可在世界中所有玩家之间共享的数据。这些值可以表示从数值分数到对象位置或玩家状态的任何内容。当变量被同步时，其更新会发送给实例中的所有玩家。

- **事件（Events）**——事件是在特定时刻发生的被触发的动作。与持有持久值的变量不同，事件执行一次然后消失。它们可用于创建交互、触发动画或激活脚本行为。

- **所有权（Ownership）**——所有权决定哪个玩家可以修改和更新联网对象。默认情况下，第一个进入实例的玩家拥有所有联网对象。所有权可以在玩家之间转移，使不同的用户能够控制对象并同步他们与他人的交互。

理解这些核心概念对于在 VRChat 中构建联网体验至关重要。以下各节将探讨如何有效地使用变量、事件和所有权。

## 使用变量进行同步 {#using-variables-for-syncing}

可用的同步有两种类型：
1. **Continuous**——最适合频繁更新的值（例如一棵正在生长的树）。
2. **Manual**——最适合必须始终正确的关键值（例如记分板）。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![Udon Graph 中的 Variables 窗口会显示你创建的变量，并允许你编辑它们的属性。](/img/worlds/index-e057e35-slider-program-variables.png)

在上图中，我们有三个不同的变量，其中 'sliderValue' 变量勾选了 'synced' 复选框。此 GameObject 的所有者将负责该变量的值，其更改会发送给其他所有人。

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
[SerializeField] private Slider slider;
[SerializeField] private Text sliderValueText;
[SerializeField, UdonSynced] private float sliderValue;
```

在上面的代码中，我们有三个不同的变量，其中 'sliderValue' 变量带有 'UdonSynced' 特性。此 GameObject 的所有者将负责该变量的值，其更改会发送给其他所有人。

</TabItem>
</Tabs>

### 示例：同步滑块 {#example-synced-slider}
![](/img/worlds/udon-networking-8472b6b-synced-slider.png)

在此示例中，Slider 的所有者将其值同步给其他所有人。请注意，这只是为了说明概念——我们将发布一个单独的示例，深入讲解具体的“如何做”细节。

滑块的值是0到1之间的数字，我们称之为浮点值，简称 float。因此我们创建一个名为*sliderValue*、类型为**float**的变量来保存并同步该值。 

我们设置滑块，使所有者移动它时更新*sliderValue*。然后该变量被打包发送给其他所有人，以更新他们自己的*sliderValue*变量使其保持一致。 

打包并发送变量的过程称为**序列化（Serialization）**，而**反序列化（Deserialization）**是接收并解包数据的过程。

当新玩家加入实例时，该世界中所有同步变量都会发送给他们，以便他们能看到其他所有人看到的内容。

## 使用事件进行同步 {#using-events-for-syncing}
与变量不同，**事件不会留存**——它们发生然后消失。如果我们在上面的同步滑块示例中使用事件，任何加入实例的新玩家的滑块都不会被同步。因此，事件适用于你希望**立即**为**当前**在实例中的每个人发生的事情。

### 示例：泡泡枪 {#example-bubble-gun}
![](/img/worlds/udon-networking-33702b1-bubble-gun-shooting.png)

在此示例中，我们有一个带有粒子系统的对象，以及一个使其泡泡棒旋转并生成泡泡粒子的动画器。我们希望当手持泡泡棒的用户按下扳机时，世界中的每个人都能看到这一效果。

在我们的 Udon Graph 中，有一个名为“Trigger”的自定义事件，它会播放 'Spin' 动画并触发发射22个粒子——这只是我们图表中的一个本地事件。

为了让每个人都能看到，我们绑定**OnPickupUseDown**事件——当有人手持我们的泡泡枪按下 Use 时触发——并使用**SendCustomNetworkEvent**，目标设为*All*，为包括对象所有者在内的所有人触发“Trigger”事件。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![Udon Graph 中的联网拾取物粒子](/img/worlds/udon-networking-e21b3b0-bubble-gun-graph.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;  
using UnityEngine;  
using VRC.Udon.Common.Interfaces;  
  
[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]  
public class BubbleGun : UdonSharpBehaviour  
{  
    [SerializeField] private Animator animator;  
    [SerializeField] private ParticleSystem particles;  
      
    public override void OnPickupUseDown()  
    {  
        SendCustomNetworkEvent(NetworkEventTarget.All, nameof(Trigger));  
    }  
  
    public void Trigger()  
    {  
        animator.Play("Spin");  
        particles.Emit(22);  
    }  
}
```

</TabItem>
</Tabs>

## 示例包与后续步骤 {#example-package--next-steps}
要查看这些概念的实际应用，请下载示例包：

[UdonNetworkingConcepts.unitypackage](https://assets.vrchat.com/sdk/UdonNetworkingConcepts.unitypackage)

在阅读上述内容并探索示例之后，请继续阅读以下内容，深入了解 VRChat 网络。

## 更多网络概念 {#more-networking-concepts}

- **[自定义网络事件](/worlds/udon/networking/events)**
  - 如何通过网络发送和接收事件，包括参数。
- **[网络变量](/worlds/udon/networking/variables)**
  - 关于如何最好地使用变量使玩家保持同步的更多信息。
- **[后加入的玩家](/worlds/udon/networking/late-joiners)**
  - 了解如何快速让任何加入你世界的人与其他玩家同步，而不是挂上“不支持后加入的玩家”的牌子。
- **[对象所有权](/worlds/udon/networking/ownership)**
  - 动态更改对象的所有权。
- **[调试网络问题](/worlds/udon/networking/debugging)**
  - 使用调试工具追踪同步问题。

请查看导航栏，了解与网络相关的完整主题列表！
