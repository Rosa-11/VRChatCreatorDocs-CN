# 网络事件 {#network-events}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

网络事件允许你的脚本之间进行简单单向的网络通信。当脚本执行网络事件时，它会为实例中当前的目标玩家执行一次该事件。

网络事件不会为后加入的玩家重复执行，因此它们最适合只与短时间相关的临时操作，例如视觉效果。不要将网络事件用于对后加入的玩家而言重要的逻辑或状态变更。请改用[网络变量](/worlds/udon/networking/variables)。

## 定义事件 {#defining-an-event}

要声明事件，你必须为它取一个名称。该名称在每个 Udon behaviour 中必须唯一，但可以在不同的 behaviour 之间重复使用。名称由 Udon Graph 事件节点上的文本字段或 UdonSharp 方法定义决定，并且区分大小写。在 UdonSharp 中，使用`nameof`可让你的 IDE 为你检查这一点。

当使用`SendCustomNetworkEvent`[调用事件](#calling-an-event)时，事件名称决定了将执行哪个方法。

要允许方法或图表事件节点被远程执行，它必须遵循下面列出的规则。对于 Graph 和 UdonSharp，*接收*该事件的 UdonBehaviour **不得**使用[同步模式](/worlds/udon/udonsharp/attributes/#behavioursyncmode)`None`。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

要使 Udon Graph 自定义事件节点可以被网络调用，必须满足以下要求：

- 自定义事件的名称**不得**以下划线`_`开头。
- 事件节点必须具有活动的 Flow 连接。

</TabItem>

<TabItem value="cs" label="UdonSharp">

要使 UdonSharp 方法可以被网络调用，必须满足以下要求：

* 该方法**必须**使用特性`[NetworkCallable]`（例外情况见[旧版事件与安全](#legacy-events-and-security)）。
* 该方法**必须**使用访问修饰符`public`。
* 该方法**不得**使用修饰符`static`、`virtual`或`override`。
* 该方法**不得**使用[**成员重载**](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/member-overloading)，包括没有`[NetworkCallable]`特性的方法。
* 该方法**不得**有返回值，这种方式无法通过网络返回数据。

此外，如果该方法使用参数，参数必须满足以下要求：

* 该方法**不得**使用超过8个参数。
* 所有参数**必须**是[受支持的类型](/worlds/udon/networking/network-details#synced-variables)。
* 参数**不得**使用修饰符`params`。
* 参数**不得**具有默认值。

</TabItem>
</Tabs>

## 调用事件 {#calling-an-event}

要触发网络事件，请使用`UdonBehaviour`和`UdonSharpBehaviour`上提供的`SendCustomNetworkEvent`方法，或通过`NetworkCalling.SendCustomNetworkEvent`进行显式调用。二者完全相同，只是为了兼容性而提供。

调用所针对的`UdonBehaviour`可以与执行`SendCustomNetworkEvent`的不同。也可以针对已禁用的 behaviour。

### 示例 {#example}

按照下面的示例为你实例中的玩家触发自定义网络事件：

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![在与对象交互时会记录一条消息的 Udon Graph。](/img/worlds/udon/networking/custom-event-example-graph.png)

1. 确保你的 UdonBehaviour 的同步模式设置为“Continuous”或“Manual”，而不是“None”。
2. 创建一个“Event Custom”节点。
3. 使用其输入框为该节点指定一个唯一的名称。
4. 添加一个“Send Custom Network Event”节点。
5. 在`eventName`下拉列表中，选择你为该事件指定的名称。你也可以连接一个字符串流来动态选择事件名称，或输入来自其他 behaviour 的名称。
6. 保留默认的`All`作为目标，以在你房间中的每个玩家身上触发此事件，或将其更改为[其他选项](#event-targeting)。
7. 你可以将`instance`输入留空以针对当前的 UdonBehaviour，也可以连接对另一个 UdonBehaviour 的引用来改为在它上面触发自定义事件。

</TabItem>

<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;  
using VRC.SDK3.UdonNetworkCalling;  
using VRC.Udon.Common.Interfaces;  
  
public class SyncedHelloOnInteract : UdonSharpBehaviour  
{  
    public override void Interact()  
    {  
        SendCustomNetworkEvent(NetworkEventTarget.All, nameof(SayHello));  
    }  
      
    [NetworkCallable]  
    public void SayHello()  
    {  
        Debug.Log("Hello, World!");  
    }  
}
```

</TabItem>
</Tabs>

请注意，你的 Udon 代码不会等待这些事件在远程玩家上被调用——它只是把事件发出去然后立即继续执行。不过，如果你的事件会被发送方自己接收到，它_会_在继续之前先在本地触发，就像普通的函数调用一样。

只要你没有触发你自己定义的[速率限制](#rate-limiting)，事件的发送和接收顺序就是有保证的。如果你先发送事件`A`再发送事件`B`，接收方也会按`A, B`的顺序收到它们。这一保证在你的场景中所有 behaviour 范围内有效，但对于多个玩家同时发送事件的情况则不适用。

然而，如果某个事件被`[NetworkCallable(maxEventsPerSecond: X)]`特性[限速](#rate-limiting)（不包括 VRChat 内部的速率或吞吐量限制！），它不会阻止其他队列继续排空。例如，如果事件 A 的限制是每秒3个，而你一次发送五个事件：`A1, A2, A3, A4, B1`——那么它们会按`A1, A2, A3, B1, A4`的顺序到达，因为 A4 会触及速率限制，因此事件 B1 可以“插队”。

## 事件目标 {#event-targeting}

网络事件总是以实例中的一个或多个玩家为目标。你可以从以下目标中选择：

| 目标 | 描述 |
| - | - |
| `NetworkEventTarget.All` | 实例中的所有玩家都会收到该事件。 |
| `NetworkEventTarget.Others`| 实例中的所有玩家都会收到该事件，但不包括本地玩家。 |
| `NetworkEventTarget.Owner` | 对象的所有者会收到该事件。 |
| `NetworkEventTarget.Self` | “回环”目标。只有发送方玩家会收到该事件。这会绕过所有[速率限制](#rate-limiting)，因为它实际上从未通过网络发送。 |

如果本地玩家向自己发送网络事件，会立即执行。例如，`NetworkEventTarget.All`会向所有其他玩家发送网络事件，但本地玩家会立即执行该事件而不等待。

要向特定玩家发送事件，你可以将目标玩家的[`playerId`](/worlds/udon/players/getting-players#get-playerid)作为参数传入，并仅在收到的 ID 与本地玩家匹配时才执行事件。这种情况下请使用`NetworkEventTarget.All`，或为在本地触发事件添加一个特殊情况。

## 发送带参数的事件 {#sending-events-with-parameters}

一个网络事件最多可以携带**八个**参数。每个参数必须是[可同步的变量类型](/worlds/udon/networking/network-details#synced-variables)（`int`、`string`、`float`、`bool`等），并且在 UdonSharp 中，接收方法必须标记为`[NetworkCallable]`。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

在 Udon Graph 中创建自定义事件时，你可以选择它应有多少个参数。默认变体没有任何参数。你随时可以使用节点上的下拉列表更改参数数量。

在带参数的节点上，你可以在左侧的下拉列表中选择类型。输出数据端口会自动改变类型。

要从“Send Custom Network Event”节点发送参数，请从下拉列表中选择参数数量正确的重载。

例如，下面是一个接收字符串和整数的简单图表：

![在 Interact 时发送带有2个不同类型参数的事件的 Udon Graph。](/img/worlds/udon/networking/custom-event-parameters-example-graph.png)

</TabItem>

<TabItem value="cs" label="UdonSharp">

在 UdonSharp 中，你可以像平常一样声明带参数的可网络调用函数。

```cs
using UdonSharp;  
using UnityEngine;  
using VRC.SDK3.UdonNetworkCalling;  
using VRC.Udon.Common.Interfaces;  
  
public class EventParameterExample : UdonSharpBehaviour  
{  
    public override void Interact()  
    {  
        NetworkCalling.SendCustomNetworkEvent(this, NetworkEventTarget.All, nameof(PrintMessage), "VRCat", 11);  
        // or: this.SendCustomNetworkEvent(NetworkEventTarget.All, nameof(PrintMessage), "VRCat", 11);  
    }  
      
    [NetworkCallable]  
    public void PrintMessage(string name, int age)  
    {  
        Debug.Log($"Congratulations on your {age}th birthday, {name}!");  
    }  
}
```

</TabItem>
</Tabs>

你需要确保传递给`SendCustomNetworkEvent`的参数类型与你在事件上声明的类型匹配，否则发送会失败！

当向`SendCustomNetworkEvent`传入`null`作为输入时，接收方调用的方法将收到`default(T)`，其中`T`是该参数在方法签名中声明的类型。这意味着可空类型会收到`null`，而非可空类型会收到默认值（例如，以`null`发送的`int`参数会收到`0`，即`default(int)`）。

### 参数大小限制与事件拆分 {#parameter-size-limits-and-event-splitting}

一般来说，请尽量减小参数大小，并避免发送大型对象或复杂结构以免出现问题。有以下几项硬性限制：

* 单个网络事件中所有参数的总大小不能超过16 KB。
* 单个参数的大小不受限制，只受事件总大小的约束。
* 总输出数据被硬性限制在约18 KB/s。不过这包括_所有_网络开销，因此实际上你不太可能看到超过8-10 KB/s的情况。

此外，还有两个层面的限制可能会导致事件被延迟：

* 基于吞吐量的限制：适用于任意时刻正在处理的网络数据总量，遵循与常规 Udon 同步相同的规则。
* 用户配置的速率限制：控制每秒可以发送网络事件的频率，可通过`[NetworkCallable(maxEventsPerSecond: X)]`特性进行调整。

:::note

如果你发送的事件包含超过**1024字节**（1千字节）的参数数据，它会在内部被拆分为多个事件。这个过程对 Udon 来说_几乎_是透明的，因为接收方会重新组装该事件，并只在目标的`UdonBehaviour`上调用一次。

不过，这些内部事件在[速率限制队列](#rate-limiting)中以及通过`Get(All)QueuedEvents`函数是可见的。例如，如果你将速率限制配置为“每秒2个事件”，但调用`SendCustomNetworkEvent`时携带2048字节的数据，那么实际允许的速率将只有每秒1次事件调用。这是因为在2048字节时，单个自定义网络事件会变成2个内部事件。

:::

“参数大小”指的是你的参数数据被编码后的字节数。这**不**包括内部头部或其他你无法控制的开销。下面用几个例子来说明：

```cs
// 可放入 1 个内部事件：
int x = 0; // = 4 字节，sizeof(int)
Vector3 v = Vector3.zero; // = 12 字节，sizeof(float) * 3
new string('x', 400); // = 400 字节，UTF-8 编码
"うどんは美味しい"; // = 24 字节，使用非 ASCII 字符的 UTF-8 编码
new char[128]; // = 256 字节，UTF-16（遵循 C# 规范）
new byte[1024]; // = 1024 字节

// 需要多于 1 个内部事件：
new byte[1025]; // = 1025 字节，发送 2 个事件
new byte[16 * 1024] // = 16384 字节，发送 16 个事件，允许的最大大小
new int[512]; // = 2048 字节，sizeof(int) * 512，发送 2 个事件

// string[] 和 VRCUrl[] 是特殊情况：
new string[2] { "test", "foobar" }; // = 18 字节，来自 UTF-8 编码字符串的 4 + 6，每个数组项另有 8 字节用于长度值（2 * sizeof(int)）
```

## 速率限制 {#rate-limiting}

网络事件受到**速率限制**，以防止过度使用：
- 默认速率：**每秒5个事件**
- 可配置的最大速率：**每秒100个事件**

要修改速率限制，请使用`[NetworkCallable(maxEventsPerSecond: X)]`特性。`X`可以是1到100之间的任意整数（含两端）。

在 Udon Graph 中，只需在节点上对应的输入字段中设置所需的值。请注意，对于没有参数的事件，你可以将其设置为0，使其成为[旧版事件](#legacy-events-and-security)。

此参数指定事件可以发送的速度。它以“每秒事件数”为单位，例如值为5表示“每秒最多5个事件”。**就速率限制而言，一次`SendCustomNetworkEvent`调用可能会发出多个事件，请参见[事件拆分](#parameter-size-limits-and-event-splitting)！**

所有速率限制都是尽力而为地施加的，受本地性能、网络利用率或服务器负载影响，它可能无法与配置或指定的值完全一致。

:::warning

存在此限制是为了让你能把它用作安全措施！强烈建议将此值**设置得尽可能低**，以减轻恶意行为者滥用你的事件在你世界中制造问题的影响。

:::

请注意，此速率限制在发送方客户端和服务器端都会强制执行。在常规使用中，服务器端仅用于防御恶意用户，通常不可见。本地客户端的行为是排队，这意味着如果在短时间内发送了过多事件，它们会排队等待，直到速率限制允许发送。排队消息的数量没有上限，所以要注意不要无限期地过快发送消息，因为这会影响到你世界中_所有_的 Udon 网络功能。

由于事件对本地玩家是立即执行的，因此在那种情况下不会施加速率限制。这意味着事件可能已经在本地执行完毕，却还在为远程玩家排队。

最后，请注意对外发送的事件还有一个全局总体限制，目前也大约是每秒100个事件。该限制是动态的且不可配置——它可能随时变化，不过 VRChat 会在任何大幅降低之前提前通知。此限制的应用方式与可配置限制相同，事件都会排队。

### 拥塞监控 {#congestion-monitoring}

`NetworkCalling`中提供以下函数来帮助处理速率限制：

| 函数 | 描述 |
|----------|-------------|
| `int NetworkCalling.GetQueuedEvents(udonBehaviour, eventName)` | 返回当前有多少事件正在排队等待发送。在正常运行中，该数字会在0和你配置的速率限制之间。如果超过你的速率限制，说明你发送事件过快，它们会排队直到速率限制允许其排空。 |
| `int NetworkCalling.GetAllQueuedEvents()` | 返回整个世界中排队的事件数量。大于0的数字并不自动表示网络状况不佳，因为即使在低负载下，事件也可能在短时间内处于排队状态。 |

你也可以使用全局的`Networking.IsClogged`属性来判断网络状况。过度发送事件会影响到它。

例如：

```cs
using TMPro;  
using UdonSharp;  
using UnityEngine;  
using VRC.SDK3.UdonNetworkCalling;  
using VRC.Udon.Common.Interfaces;  
  
public class EventQueueExample : UdonSharpBehaviour  
{  
    [SerializeField] private TextMeshProUGUI queueStatus;  
      
    void Update()  
    {  
        queueStatus.text = $"Queue: {NetworkCalling.GetAllQueuedEvents()}";  
        queueStatus.text += $"\nSpecific Event Queue: {NetworkCalling.GetQueuedEvents(this, "SomeNetworkEvent")}";  
        queueStatus.text += $"\nClogged: {Networking.IsClogged}";  
    }  
      
    // 一些网络事件……  
}  
```

### 同一实例中的世界版本不匹配 {#mismatched-world-versions-in-the-same-instance}

作为一个非常特殊的边缘情况，存在一种场景：服务器端速率限制可能会在没有恶意行为的情况下主动丢弃事件。由于速率限制是基于每个客户端对世界的_本地_视图来施加的，如果你上传了降低了速率限制的世界新版本，而同一实例中的用户分布在不同的世界版本上，那么发送方客户端可能会超出接收方客户端的速率限制预期。在这种情况下，且_仅在_这种情况下，服务器可能会静默丢弃事件而不投递它们。

## 访问事件的发送方 {#accessing-the-sender-of-an-event}

`NetworkCalling`类提供了一些用于处理事件的有用属性：

| 属性                                    | 描述                                                                                        |
|---------------------------------------------|----------------------------------------------------------------------------------------------------|
| `VRCPlayerApi NetworkCalling.CallingPlayer` | 发起此网络调用的玩家的`VRCPlayerApi`。如果不在网络调用中则为`null`。 |
| `bool NetworkCalling.InNetworkCall`         | 指示当前行是否作为网络调用的一部分执行。请注意，只有在入口函数终止后才会重置，也就是说，从事件入口点调用次级脚本或其他函数时该状态会保持。 |

## 旧版事件与安全 {#legacy-events-and-security}

`[NetworkCallable]`是在 SDK 3.8.1 中引入的——Udon 过去允许调用任何公共方法，除非它以`_MethodName`这样的下划线开头。为了向后兼容，你仍然可以调用任何不以下划线开头且没有参数的公共方法，但不推荐这样做。给带下划线的方法添加`[NetworkCallable]`特性_会_允许它通过网络被调用。

在 Udon Graph 中，如果`MaxEventsPerSecond`输入字段设置为0，则自定义事件节点被视为“旧版”。

:::warning

要防止公共方法或图表事件通过网络被调用，你应该使用以下划线`_`开头的名称。这可以提高你的世界或预制件的安全性。

:::

### 组件索引定位 {#component-index-targeting}

关于旧版事件还有一点特别说明，请考虑将事件发送给`GameObject`与发送给对象上特定`Component`的语义差异。

调用通过`[NetworkCallable]`标记的函数会使该调用使用`Component`定位语义。这意味着即使一个 GameObject 上有2个或更多`UdonBehaviour`，也只有指定的`UdonBehaviour`会收到该事件。

旧版情况——即向_未_标记`[NetworkCallable]`的函数发送不带参数的事件——将使用`GameObject`语义。也就是说，它的行为类似于 Unity 内置的[`GameObject.SendMessage`](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.SendMessage.html)，并会在包含你所定位的 behaviour 的对象上的_所有_`UdonBehaviours`上调用该函数。

请注意，`Component`定位依赖于组件索引（顺序），这意味着不建议在使用联网`UdonBehaviour`的`GameObject`上对组件使用`Destroy`。这样做会导致未定义行为。
