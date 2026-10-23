# 接触器（Contact） {#contacts}

接触器（Contact）是一套允许虚拟形象（Avatar）和世界检测与其他接触器碰撞的系统。你可以利用碰撞来驱动虚拟形象和世界的行为，实现各种自定义交互。

这些与 Unity 标准碰撞体不同。接触器分为发送方和接收方。发送方只是用于被检测。接收方检测发送方，然后相应地更新参数或触发事件。

在虚拟形象上使用接触器时，你使用的接触器数量会影响其[性能等级](/avatars/avatar-performance-ranking-system#pc-limits)。

## VRCContactSender

接触器发送方组件定义一个空间体积，当它与接触器接收方接触时会发出接触器信号。

![](/img/avatars/contact-sender-inspector.png)

- `Root Transform` - 该接触器放置所在的变换。若为空，我们将使用此 GameObject 的变换。

### 形状 {#shape}

本节包含定义 ContactSender 形状的设置。
- `Shape Type` - 此接触器使用的碰撞形状类型。你可以在 Sphere、Capsule 和 Box 之间选择。
- `Radius` - 碰撞体从其原点延伸的大小。仅当 Shape Type 设为 Sphere 或 Capsule 时使用。
- `Height` - 胶囊体沿 Y 轴的高度，包括两端的半球。仅当 Shape Type 设为 Capsule 时使用。
- `Size` - 盒形碰撞体沿各轴的大小。仅当 Shape Type 设为 Box 时使用。
- `Position` - 相对于根变换的位置偏移。
- `Rotation` - 相对于根变换的旋转偏移。

接触器形状的最大半径限制为 3 米，最大宽度/高度/深度限制为 6 米。如果接触器附加到已缩放的游戏对象上，这些限制会在缩放后应用。

### 过滤 {#filtering}

本节包含的设置允许你调整和定义此 ContactSender 将如何与[接触器接收方](/common-components/contacts/#vrccontactreceiver)交互。

- `Local Only` - 仅对虚拟形象上的接触器发送方可用。将此接触器限制为仅在本地客户端工作。若启用，该接触器不会降低你虚拟形象的[性能等级](/avatars/avatar-performance-ranking-system)。
- `Content Types` - 仅对世界中的接触器发送方可用。允许你设置此接触器发送方是否触发世界、虚拟形象和/或物品中的接触器接收方。
- `Collision Tags` - 字符串列表，用于指定它可以影响/受什么影响。要成功发生碰撞，发送方和接收方都需要至少有一对匹配的字符串。碰撞标签区分大小写。一个接触器最多可以有 16 个标签。

举一个例子，下面的标签会使发送方在与默认的 Head [ContactReceiver](/common-components/contacts/#vrccontactreceiver) 或任何带有 `Face` 标签的自定义 [ContactReceiver](/common-components/contacts/#vrccontactreceiver) 接触时发出接触器信号——注意大写 F！

![](/img/avatars/contacts-de34d55-2022-04-19_11-53-34_NVIDIA_Share.png)

你可以使用任意文本作为标签，但 SDK 还提供了一份建议标签列表，使用它们可以更容易地创建与你未参与制作的虚拟形象和世界兼容的接触器系统。更多信息请参见[内置接触器标签](/common-components/contacts/built-in-contact-tags)。

如果你决定使用自定义碰撞标签，建议使用 PascalCase 书写，以与内置标签的格式保持一致。

### 标准碰撞体 {#standard-colliders}

在虚拟形象上，一组「标准碰撞体」在 Avatar Descriptor 中名为「Colliders」的部分定义。该部分允许你定义每个虚拟形象上都存在的若干标准碰撞体。如果你不做任何改动，它们会被自动设置好，但也可以微调以完全贴合你的虚拟形象。这些碰撞体不会影响性能评级。

- 头部
- 躯干
- 手部左/右
- 脚部左/右
- 手指左/右
  - 食指
  - 中指
  - 无名指
  - 小指

这些碰撞体主要作为接触器发送方，使用[内置身体部位标签](/common-components/contacts/built-in-contact-tags#body-parts)，其他人可以用他们的虚拟形象检测到它们。不过，手指和手部碰撞体也被用于创建全局 [PhysBone](/common-components/physbones) 碰撞体，可用于影响他人的 PhysBones 以及世界中的 PhysBones。

## VRCContactReceiver

接触器接收方组件定义一个空间体积，当它与接触器发送方接触时会接收接触器信号。

![](/img/avatars/contact-receiver-inspector.png)

- `Root Transform` - 该接触器放置所在的变换。若为空，我们将使用此 GameObject 的变换。

接触器接收方从接触器发送方接收信号后会发生什么，取决于该接触器接收方属于什么：

- 如果接触器接收方是虚拟形象的一部分，它会按虚拟形象作者定义的方式设置[动画器参数](/avatars/animator-parameters)。
- 如果接触器接收方是世界的一部分，它则会在与接收方附加到同一 GameObject 的所有 Udon 行为上触发以下事件之一：
  - `OnContactEnter(ContactEnterInfo contactInfo)` - 当接触器发送方开始接触接触器接收方时引发的事件。
  - `OnContactExit(ContactExitInfo info)` - 当接触器发送方停止接触接触器接收方时引发的事件。

### 形状 {#shape-1}

本节包含定义 ContactReceiver 形状的设置。

- `Shape Type` - 此接触器使用的碰撞形状类型。你可以在 Sphere、Capsule 和 Box 之间选择。
- `Radius` - 碰撞体从其原点延伸的大小。仅当 Shape Type 设为 Sphere 或 Capsule 时使用。
- `Height` - 胶囊体沿 Y 轴的高度，包括两端的半球。仅当 Shape Type 设为 Capsule 时使用。
- `Size` - 盒形碰撞体沿各轴的大小。仅当 Shape Type 设为 Box 时使用。
- `Position` - 相对于根变换的位置偏移。
- `Rotation` - 相对于根变换的旋转偏移。

接触器形状的最大半径限制为 3 米，最大宽度/高度/深度限制为 6 米。如果接触器附加到已缩放的游戏对象上，这些限制会在缩放后应用。

### 过滤 {#filtering-1}

本节包含的设置允许你调整和定义此 ContactReceiver 将如何与[接触器发送方](/common-components/contacts/#vrccontactsender)交互。

- `Allow Self` - 仅对虚拟形象上的接触器接收方可用。允许此接触器受到你自己的影响。
- `Allow Others` - 仅对虚拟形象上的接触器接收方可用。允许此接触器受到其他人的影响。
- `Local Only` - 仅对虚拟形象上的接触器接收方可用。将此接触器限制为仅在本地客户端工作。若启用，该接触器不会降低你虚拟形象的[性能等级](/avatars/avatar-performance-ranking-system)。
  - 通过启用此选项，你可以在单个虚拟形象上使用最多 256 个接触器组件。如果超过此限制，你将无法上传该虚拟形象。
- `Content Types` - 仅对世界中的接触器接收方可用。允许你设置此接触器接收方是否触发世界、虚拟形象和/或物品中的接触器接收方。
- `Collision Tags` - 字符串列表，用于指定它可以影响/受什么影响。要成功发生碰撞，发送方和接收方都需要至少有一对匹配的字符串。碰撞标签区分大小写。一个接触器最多可以有 16 个标签。

### 接收方 {#receiver}

本节包含定义接收方在收到信号时执行什么操作的设置。

#### 虚拟形象上的接收方 {#receivers-on-avatars}

在虚拟形象上使用时，接触器接收方会通过设置虚拟形象动画器中的[动画器参数](/avatars/animator-parameters)来响应接触器信号。

`Receiver Type` 定义收到信号时参数设置的行为。
- `Constant` - 在有接触器存在时通知你。未检测到接触器时重置。理想情况下在此使用 bool 参数。对 Float 设置 `1.0`，对 Bool 设置 `True`，对 Int 设置 `1`。
- `OnEnter` - 在检测到接触器的那一帧通知你。下一帧立即重置。理想情况下在此使用 bool 参数。对 Float 设置 `1.0`，对 Bool 设置 `True`，对 Int 设置 `1`。可选地定义 `Min Velocity`。
- `Proximity` - 根据接触器与触发器的接近程度，给你一个 `0.0-1.0` 的 Float 值，如下所述。你必须使用 Float。如果检测到多个接触器，它会给出最近的那个。
- `Parameter` - 在动画控制器上更新的参数。此参数不需要在同步的 Avatar 参数列表中定义。参数可以是 Float、Bool 或 Int，取决于所用的 Receiver Type。
- `Value` - 检测到碰撞时参数更新为的值。没有碰撞存在时参数将重置为零。
- `Min Velocity` - 传入碰撞体影响此触发器所需的最小速度，仅在 `OnEnter` 类型中生效。

接近度值告诉你接触器与触发器中心的接近程度。它按发送方到接收方的最近点计算。

对于盒形的接触器接收方，你可以启用选项 `Use Face Proximity`。此选项会改变接近度的计算方式，以告诉你接触器与盒体正 Z 面的接近程度。

#### 世界中的接收方 {#receivers-in-worlds}

世界中的接触器接收方组件除了配置盒形接触器接收方的接近度计算方式（见上文）之外，不提供其他配置选项。

相反，接收方总是通过与接收方附加到同一 GameObject 的任何 Udon 脚本中调用事件来响应接触器信号。关于使用 Udon 与接触器交互的更多信息，请参见下面小节。

## 世界中的 Udon 访问 {#udon-access-in-worlds}

- 你可以使用 `VRCContactSender` 和 `VRCContactReceiver` 类型分别创建引用世界中接触器发送方和接触器接收方的字段与变量。这两个类都位于命名空间 `VRC.SDK3.Dynamics.Contact.Components` 中。`ContactEnterInfo` 和 `ContactExitInfo` 参数类型位于命名空间 `VRC.Dynamics` 中。
- 要检测接触器发送方和接触器接收方何时接触，你可以将 UdonGraph 或 UdonSharp 行为附加到与接触器接收方组件相同的游戏对象上，并使用以下事件：
  - `OnContactEnter(ContactEnterInfo contactInfo)` - 当接触器发送方开始接触接触器接收方时调用。参数是一个数据结构，包含有关该接触的以下信息：
    - `ContactSenderProxy contactSender` - 对此碰撞中涉及的接触器发送方组件的引用。
    - `ContactReceiverProxy contactReceiver` - 对此碰撞中涉及的接触器接收方组件的引用。
    - `Vector3 enterVelocity` - 接触时接触器发送方相对接触器接收方的相对速度。
    - `Vector3 contactPoint` - 接触器接收方表面上接触点的估计位置，使用世界空间坐标。
    - `string[] matchingTags` - 接触器发送方和接触器接收方共有的标签数组。
  - `OnContactExit(ContactExitInfo contactInfo)` - 当接触器发送方停止接触接触器接收方时调用。与进入事件一样，参数是一个包含有关该碰撞的一些信息的数据结构：
    - `ContactSenderProxy contactSender` - 对此碰撞中涉及的接触器发送方组件的引用。
    - `ContactReceiverProxy contactReceiver` - 对此碰撞中涉及的接触器接收方组件的引用。
    - `string[] matchingTags` - 接触器发送方和接触器接收方共有的标签数组。
- 在上述每个事件中，`contactSender` 和 `contactReceiver` 都是代理对象，引用碰撞中涉及的接触器发送方和接触器接收方。你可以使用 `==` 或 `!=` 比较这两个对象，以检查它们是否匹配你世界中的 `VRCContactSender` 或 `VRCContactReceiver`。代理对象本身包含以下属性：
  - `bool isValid` - 如果此代理对象引用的是有效的接触器组件则为 true，否则为 false。在访问任何其他属性之前，你应先检查此项是否为 true。
  - `VRCPlayerApi player` - 对此接触器组件所属玩家的引用（如适用）。对于世界中的接触器组件，此值将为 null。
  - `DynamicsUsage usage` - 描述此接触器组件属于何种内容。对于属于你世界的接触器，此值为 `World`；对于属于虚拟形象的接触器，此值为 `Avatar`。
  - `Vector3 position` - 接触器组件根变换的世界空间位置。
  - `Quaternion rotation` - 接触器组件根变换的世界空间旋转。
  - `Vector3 scale` - 接触器组件根变换的损耗缩放（lossy scale）。
- 你可以通过获取和设置 `radius`、`height`、`size`、`position` 和 `rotation` 属性来读取和设置接触器发送方或接触器接收方的这些属性。
  - 如果你改动了这些属性，必须在完成所有更改后对接触器调用 `ApplyConfigurationChanges()`，否则它们不会被实际应用回接触器。
  - **对接触器的配置更改可能开销很大！** 如果做得过头，可能会造成性能问题，使你的世界让玩家感到不适——避免过于频繁地更改这些属性，并尽量在应用前批量合并尽可能多的更改。
- 任何时候，你都可以使用接收方上的 `CalculateProximity()` 方法计算接收方与发送方之间的接近度。它返回一个 `0.0-1.0` 的 Float 值，表示发送方与接收方中心（或接收方的正 Z 面，如果接收方是启用了 `Use Face Proximity` 的盒体）的接近程度。
- 你可以使用 `UpdateContentTypes(DynamicsUsageFlags newContentTypes)` 和 `UpdateCollisionTags(string[] newCollisionTags)` 方法更改接触器允许的内容类型集合和碰撞标签集合。
  - 请记住接触器有 16 个标签的硬性限制。如果你尝试设置超过 16 个标签，只有前 16 个会生效。
