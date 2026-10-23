# 特性 {#attributes}

特性可扩展UdonSharp类、字段和方法的功能。UdonSharp新增了一些特性，同时也支持许多现有的C#和Unity特性。

:::tip

如需了解UdonSharp特性的实用概览，请阅读[Varneon的UdonSharp开发实践](https://vrclibrary.com/wiki/books/varneons-udonsharp-development-practices/page/attributes)。
:::

## UdonSharp特性 {#udonsharp-attributes}

以下特性是UdonSharp和VRChat SDK独有的。

### UdonSynced
`[UdonSynced]` / `[UdonSynced(UdonSyncMode)]`

带有此特性的字段会在网络上为实例中的所有玩家同步。阅读VRChat的[网络文档](/worlds/udon/networking/)了解更多。

**示例**
```cs
public class Example : UdonSharpBehaviour 
{
    [UdonSynced]
    public bool synchronizedBoolean;

    [UdonSynced(UdonSyncMode.Linear)]
    // 此float将进行线性插值
    public float synchronizedFloat;
}
```
### UdonSyncMode
`UdonSharp.UdonSyncMode`

默认情况下，`[UdonSynced]`字段不会进行插值。当字段变化时，它会立即改变。你可以更改同步模式，以在旧值和新值之间平滑插值。

| 名称        | 摘要                                      |
| ----------- | ----------------------------------------- |
| None        | 不进行插值（默认）                        |
| Linear      | 线性插值                                  |
| Smooth      | 平滑插值                                  |
| *NotSynced* | *（未使用`[UdonSynced]`时的默认值）*      |
### UdonBehaviourSyncMode
`[UdonBehaviourSyncMode]` / `[UdonBehaviourSyncMode(BehaviourSyncMode)]`

此特性允许你选择一种[同步模式](#behavioursyncmode)，该模式会应用于此UdonBehaviour的所有实例。如果添加此特性，UdonSharp将隐藏Unity中用于选择同步模式的下拉菜单。它还会启用额外的验证，以确保你的同步变量适合所选的同步模式。

**示例**
```cs
[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class Example : UdonSharpBehaviour 
{
  // 此类的同步模式为手动。
}
```

### BehaviourSyncMode
`UdonSharp.BehaviourSyncMode`

将此与[UdonBehaviourSyncMode](#udonbehavioursyncmode)结合使用，为你的行为选择同步模式。

| 名称           | 摘要                                                                                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Any            | 不强制执行任何限制。你可以在Unity中设置任意同步类型。（默认）                                                                                                                                   |
| Continuous     | 同步变量会以极高的频率自动更新，但为了节省带宽，可能并不总能可靠地更新。                                                                                                                           |
| Manual         | 同步变量由用户以较低频率手动更新，但可确保在请求时更新是可靠的。                                                                                                                                 |
| None           | 强制该行为不包含同步变量，并在UI中隐藏同步模式的选择下拉菜单。不会同步任何内容，且SendCustomNetworkEvent/NetworkCalling在该行为上无法工作。                                                    |
| NoVariableSync | 强制该行为不包含同步变量，隐藏同步模式选择下拉菜单，并允许你在使用Manual或Continuous同步的GameObject上使用这些行为。                                                                          |
