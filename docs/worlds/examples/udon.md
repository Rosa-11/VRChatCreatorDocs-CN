---
sidebar_position: -1
description: "Udon Graph和UdonSharp中的非常简单的Udon程序。"
sidebar_custom_props:
    customIcon: 🐣
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Udon基础 {#udon-basics}

本页包含如何使用[Udon](/worlds/udon/)的示例。所有示例都可以以[Udon Graph](/worlds/udon/graph)或UdonSharp的形式查看。

## 旋转的立方体 {#rotating-cube}

此行为每秒绕其局部Y轴将游戏对象（例如立方体）旋转90度。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![用于旋转立方体的Udon Graph。](\img\worlds\udon\examples\spinning-cube.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs showLineNumbers
using UnityEngine;
using VRC.SDKBase;

public class RotatingCubeBehaviour : UdonSharpBehaviour
{
    private void Update()
    {
        transform.Rotate(Vector3.up, 90f * Time.deltaTime);
    }
}
```

</TabItem>
</Tabs>

## 交互 {#interact}

此行为使用[Interact](/worlds/udon/graph/event-nodes/#interact)让玩家与对象交互以将其禁用。例如，这可用于玩家点击后消失的消息或门。游戏对象必须具有碰撞体组件，玩家才能与其交互。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![一个在交互时禁用对象的Udon Graph。它包含若干注释。例如，它演示了在“Get gameObject”节点中将“instance”留空会导致检索此脚本所附加到的游戏对象。](\img\worlds\udon\examples\interact.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs showLineNumbers
using UnityEngine;
using VRC.SDKBase;

public class ClickMe: UdonSharpBehaviour
{
    public override void Interact()
    {
        gameObject.SetActive(false);
    }
}
```

</TabItem>
</Tabs>

## 传送玩家 {#teleport-player}

此行为使用[Interact](/worlds/udon/graph/event-nodes/#interact)和[TeleportTo](/worlds/udon/players/player-positions/#teleportto)来传送玩家。`targetPositon`变换决定了玩家传送后的目标位置和旋转。不要忘记为目标位置GameObject添加碰撞体组件。


<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![一个将玩家传送到目标位置的Udon Graph程序。注释指出必须将“targetPosition”定义为“public”，以便在此脚本的实例的检视面板中进行设置。](\img\worlds\udon\examples\teleport-player.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">
```cs showLineNumbers
using UnityEngine;
using VRC.SDKBase;

public class TeleportPlayer : UdonSharpBehaviour
{
    public Transform targetPosition;
    
    public override void Interact()
    {
        Networking.LocalPlayer.TeleportTo(
            targetPosition.position,   
            targetPosition.rotation);
    }
}
```
</TabItem>
</Tabs>

## 发送事件 {#sending-events}

此行为展示了如何与其他行为交互。UdonBehaviour可以通过变量和自定义事件相互通信。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![一个与其他图形程序通信的Udon Graph。来自其他脚本的公共变量和自定义事件名称被指定为常量字符串，并输入到各种节点的“symbolName”参数中。](\img\worlds\udon\examples\custom-events.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">
```cs showLineNumbers
using UdonSharp;  
using UnityEngine;  
using VRC.Udon.Common.Interfaces;  
  
public class SomeExample : UdonSharpBehaviour  
{  
    [SerializeField] private SomeOtherExample otherBehaviour;  
  
    void Start()  
    {  
        if(otherBehaviour.somePublicBoolean)  
        {  
            otherBehaviour.SomeCustomEvent();  
        }  
    }  
      
    public override void Interact()  
    {  
        DoStuff();  
    }  
  
    private void DoStuff()  
    {  
        SendCustomNetworkEvent(NetworkEventTarget.All, nameof(DoNetworkEventStuff));  
    }  
  
    public void DoNetworkEventStuff()  
    {  
        otherBehaviour.somePublicBoolean = false;  
        otherBehaviour.SomeCustomEvent();  
        otherBehaviour.SendCustomNetworkEvent(NetworkEventTarget.Owner, nameof(DoOwnerStuff));  
    }  
}
```
</TabItem>
</Tabs>
