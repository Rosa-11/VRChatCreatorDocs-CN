# 特殊节点 {#special-nodes}

“Special”类别包含用于自定义变量、自定义事件、流程控制以及与其他 UdonBehaviour 通信的节点。

### Block
将流程拆分为多个部分。一个流程输入，多个流程输出。从上到下执行所有右侧流程槽。

### Branch
输入：`Bool` - `System.Boolean`

根据条件求值分支执行。如果 `Bool` 为 True，则执行 `True` 流程路径。如果 `Bool` 为 False，则执行 `False` 流程路径。

### Comment
为用户提供输入注释字符串的空间。此字符串不会包含在编译中。

### Const Null
为 null 检查目的提供一个“null”值。

### Const This
提供对 UdonBehaviour 作为其组件的 GameObject 的引用。

### Event Custom
输入：`name` - `System.String`

可由 [UdonBehaviour 节点](#udonbehaviour-nodes)执行的自定义事件。 

你必须在图表中输入自定义事件的名称来命名它。程序运行时无法更改事件名称。

### For
输入：`start`、`end`、`step` - `System.Int32`

输出：`index` - `System.Int32`

使用计数器执行流程。计数器用 `start` 的值初始化。执行 `Body` 流程，然后将计数器增加 `step` 值。这一过程持续到计数器的值等于或大于 `end`。一旦发生这种情况，流程将继续沿 `Exit` 流程执行。

### Get Variable
输入：`name` - `System.String`

输出：`System.Object`

获取名为 `name` 的 Udon 变量，并将其作为输出提供。

### Set Variable
输入：`name` - `System.String` `value` - `System.Object` `sendChange` - `Boolean`

当流程执行时，将名为 `name` 的 Udon 变量设置为 `value`。如果勾选了 `sendChange`，它还会触发该变量的 OnVariableChanged 事件。

### Get Program Variable
输入：`instance` - `UdonBehaviour` `symbolName` - `string`

从另一个 UdonBehaviour `instance` 获取 Udon 变量 `symbolName` 的值。如果目标 UdonBehaviour 是公共变量，并且在检视面板中已连接，效果最佳，这允许你从下拉列表中选择目标变量名。如果没有 UdonBehaviour 连接到 instance，它将使用当前 UdonBehaviour 的变量名。如果你反而知道变量名并希望直接设置它，请使用 `String const` 节点手动写入。

### Set Program Variable
输入：`instance` - `UdonBehaviour` `symbolName` - `string` `value` - `Object`

将另一个 UdonBehaviour `instance` 上的 Udon 变量 `symbolName` 的值设置为 `value`。如果目标 UdonBehaviour 是公共变量，并且在检视面板中已连接，效果最佳，这允许你从下拉列表中选择目标变量名。如果没有 UdonBehaviour 连接到 instance，它将使用当前 UdonBehaviour 的变量名。如果你反而知道变量名并希望直接设置它，请使用 `String const` 节点手动写入。此节点还会触发目标变量的 OnVariableChanged 事件。

### On Variable Changed
输出：`newValue` `oldValue`

每当对目标变量调用 SetProgramVariable，或调用 Set Variable 并勾选 `sendChange` 时触发。也适用于同步变量！

### While
输入：`Bool` - `System.Boolean`

当 `Bool` 为 true 时执行 `Body` 流程。如果 `Bool` 为 false，则执行 `Exit` 流程。

## UdonBehaviour 节点 {#udonbehaviour-nodes}
UdonBehaviour 节点允许你的程序与其他 UdonBehaviour 交互——可以是本地的、带延迟的，或通过网络。

:::note UdonSharp

以下节点仅适用于 `public` 事件。如果你使用 Udon Graph，你的自定义事件始终是 `public`。如果你使用 UdonSharp，请确保在这里使用 `public` 而不是 `private` 事件！

:::

### SendCustomEvent
输入：`instance` - `UdonBehaviour`、`eventName` - String

在目标 UdonBehaviour 上运行事件“eventName”。如果 `instance` 留空，则指向其自身的事件之一。

### SendCustomEventDelayedFrames
输入：`instance` - `UdonBehaviour`、`eventName` - String、`delayFrames` - int、`eventTiming` - EventTiming

在等待 `delayFrames` 后，在目标 UdonBehaviour 上运行事件 `eventName`。它将根据所选的 `eventTiming` 在 `Update`、`LateUpdate`、`FixedUpdate` 或 `PostLateUpdate` 期间运行事件。最小延迟为 1 帧。

:::note 时序问题

请注意，[Unity 的帧计数](https://docs.unity3d.com/ScriptReference/Time-frameCount.html)基于 Update 事件。如果你在 [Update 事件之前](/worlds/udon/event-execution-order)调用 SendCustomEventDelayedFrames，例如在 [Start](https://docs.unity3d.com/ScriptReference/MonoBehaviour.Start.html) 或 [输入事件](/worlds/udon/input-events)中，延迟可能会比预期短 1 帧。

:::

### SendCustomEventDelayedSeconds
输入：`instance` - `UdonBehaviour`、`eventName` - String、`delaySeconds` - float、`eventTiming` - EventTiming

在等待 `delaySeconds` 后，在目标 UdonBehaviour 上运行事件“eventName”。它将根据所选的 `eventTiming` 在 `Update`、`LateUpdate`、`FixedUpdate` 或 `PostLateUpdate` 期间运行事件。

如果 `delaySeconds` 为零，事件将在同一帧*或*下一帧执行（参见上文的 [SendCustomEventDelayedFrames](/worlds/udon/graph/special-nodes#sendcustomeventdelayedframes)）。

### SendCustomNetworkEvent
输入：`instance` - `UdonBehaviour`、`target` - NetworkEventTarget、`eventName` - String

根据 `target` 为远程玩家在目标 UdonBehaviour 上运行事件 `eventName`。具有包含参数的重载。

查看[网络事件](/worlds/udon/networking/events)页面以了解更多详情。
