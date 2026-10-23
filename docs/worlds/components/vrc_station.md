# VRC Station

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

允许用户通过与物体交互来坐下。SDK中提供了一个示例：[VRCChair3](/worlds/examples/udon-example-scene#vrcchair3)。

该组件也可用于虚拟形象（Avatar），以在虚拟形象上创建座位！

## 参数与选项 {#parameters-and-options}

| 参数                    | 描述                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| Player Mobility              | 玩家是否能够移动，选项包括：                                                     |
|                              | - Mobile：允许用户在坐在station中时移动。                                               |
|                              | - Immobilize：阻止用户移动。                                                            |
|                              | - Immobilize For Vehicle：与Immobilized相同，但针对移动的station进行了优化。                        |
| Can Use Station From Station | 用户坐在station中时是否可以切换到其他station。                                              |
| Animation Controller (optional) | 用于以自定义动画覆盖正常的就座动画。                                        |
| Disable Station Exit         | 如果用户无法通过常规方式退出station，则使用触发器让用户离开座位。                    |
| Seated                       | 这是一个用户应该坐下的station吗？有关这意味着什么，请参阅上文详情。 |
| Station Enter Player Location | 定义用户就座时应被传送到哪里的Transform。                            |
| Station Exit Player Location  | 定义用户离开座位时应被传送到哪里的Transform。                  |
| Controls Object              | 用于可以控制某个物体（例如载具）的station。                           |
## 使用Udon创建station {#creating-a-station-with-udon}

你可以在自己的自定义Udon脚本中使用station。制作一把可以坐的椅子相当简单。VRCSDK附带的[VRCChair3](/worlds/examples/udon-example-scene#vrcchair3)预制件展示了如何设置一个station。

椅子所需的只是一个包含以下组件的GameObject：
1. `VRC_Station`，其进入点和退出点设置为自身或另一个Transform，用于指定玩家被固定在station上的位置。
2. 一个碰撞体，通常启用“Is Trigger”。
3. 一个UdonBehaviour，其Udon程序负责处理坐在station中。
4. （可选）一个看起来像椅子的网格。

VRChat SDK附带了一个处理第3步的程序，名为**StationGraph**。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![station graph，VRCChair3预制件的一部分。](/img/worlds/station-graph.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;  
using UnityEngine;  
using VRC.SDKBase;  
  
public class StationGraph : UdonSharpBehaviour  
{  
    public override void Interact()  
    {  
        Networking.LocalPlayer.UseAttachedStation();  
    }  
  
    public override void OnStationEntered(VRCPlayerApi player)  
    {  
        Debug.Log($"{player.displayName} Entered");  
    }  
  
    public override void OnStationExited(VRCPlayerApi player)  
    {  
        Debug.Log($"{player.displayName} Exited");  
    }  
}
```

</TabItem>
</Tabs>

Udon的“OnStationEntered”和“OnStationExited”事件会同时为本地玩家和远程玩家运行。

这些事件对高级用例非常有用，例如检测哪位玩家进入或离开了移动中的载具。

## 在世界中使用station {#stations-used-in-worlds}

你的动画器可以访问虚拟形象参数，以便对虚拟形象进入station做出反应。

- 使用`InStation`参数检测虚拟形象是否已进入station，但可能未启用Seated-IK。
- 使用`Seated`参数检测该虚拟形象在station中是否启用了Seated-IK。
	- `Seated`参数仅在station上的`Seated`属性启用时使用。

### 检测SDK2虚拟形象 {#detecting-sdk2-avatars}

对于使用非常旧版本VRChat SDK（SDK2）上传的虚拟形象，station的行为略有不同。

检查`AvatarVersion`参数以检测SDK2虚拟形象。例如：
- 如果`AvatarVersion`为`3`，则该虚拟形象使用现代的SDK3。
- 如果`AvatarVersion`小于`3`，则该虚拟形象使用过时的SDK2。

使用`AvatarVersion`和`InStation`来过渡到不同的自定义就座动画。差异如下所述。

### SDK2虚拟形象 {#sdk2-avatars}

如果SDK2虚拟形象使用你的station，你的动画器应应用固定的就座姿势（如果启用了`Seated`），或者在未启用`Seated`时应用全身动画。

### SDK3虚拟形象 {#sdk3-avatars}

如果SDK3虚拟形象使用你的station，你的动画器可以选择SDK3虚拟形象可用的动画、Tracking Control更改和Pose Space更改的任意组合。但是，不会应用任何幕后的State Behaviors（而在SDK2 station中会应用）。

请注意，由于创作者决定应用哪种类型的Tracking Control，station上的Seated属性并不一定表示SDK3虚拟形象上的追踪类型。

我们的示例Seated控制器展示了这种分支行为，以及应用就座动画时正确的过渡和State Behavior设置。

:::caution

Station只能影响虚拟形象上已存在的参数。你不能使用[State Behaviors](/avatars/state-behaviors)创建新参数。

:::
## 在虚拟形象上使用station {#stations-used-on-avatars}
SDK中包含的默认`VRCChair`预制件可用于虚拟形象，让其他玩家“坐”在你身上。你可以借此将虚拟形象变成一辆汽车、一张会移动的餐桌等等！一个虚拟形象最多可以有6个station。

在虚拟形象上使用你希望通过动画开启或关闭的station时，你需要切换特定的对象和组件。

![图像](/img/worlds/vrc_station-0adc923-av-station-fix.png)

**红框（在上方截图中）在上传时必须启用。如果上传时处于禁用状态，station将无法工作！**

切换红框会移除当前坐在station中的任何玩家。切换绿框只会阻止新玩家坐在station中。由于这涉及禁用/启用组件和对象，因此**必须**在FX图层中完成。

请记住，用户可以通过[安全系统](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system)禁用动画。如果虚拟形象station默认开启（即默认开启这些开关），那么即使佩戴者使用动画将其关闭，station仍会保持活动状态。

上传时还有另外两项限制：
- 进入点和退出点之间的距离不得超过2米。
- 虚拟形象上最多可以有6个station。超出的将被禁用。

## 参数与选项 {#parameters-and-options-1}

| 参数 | 描述 |
| - | - |
| Player Mobility | 玩家在使用station时是否允许四处走动。 |
| | - Mobile：允许玩家在坐在station中时移动。 |
| | - Immobilize：阻止用户移动，并将其移动到“Station Enter Location”。 |
| | - Immobilize For Vehicle：与“Immobilize”相同，但针对移动的station进行了优化。 |
| Can Use Station From Station | 玩家坐在station中时是否可以切换station。 |
| Animation Controller (optional) | 覆盖虚拟形象控制器中的“Sitting”可播放图层。 |
| Disable Station Exit | 阻止玩家通过移动或跳跃退出station。<br />使用`ExitStation`节点将玩家从station中移除。 |
| Seated | 玩家使用station时其虚拟形象是坐下还是站立。<br />这会影响虚拟形象可播放图层的“Seated”参数。 |
| Station Enter Player Location | 玩家进入station时会被移动到该Transform的位置。 |
| Station Exit Player Location | 玩家退出station时会被移动到该Transform的位置。 |

## 限制 {#limitations}

虚拟形象必须满足以下要求才能坐在station中：

- 虚拟形象必须具有[Animator组件](https://docs.unity3d.com/Manual/class-AnimatorController.html)并指定了[Unity Avatar](https://docs.unity3d.com/Manual/AvatarCreationandSetup.html)。对于人形虚拟形象，这通常会自动指定。
- Animator组件必须与虚拟形象描述符组件位于同一个游戏对象上。
