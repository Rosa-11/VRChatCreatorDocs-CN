import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 网络变量 {#network-variables}

网络变量（也称为同步变量）允许 Udon 脚本在 VRChat 实例中的所有玩家之间共享数据。与触发一次且不持久的网络事件不同，网络变量确保所有玩家——包括后加入的玩家——都能看到对象的正确状态。

本指南介绍网络变量如何工作、何时使用它们，以及保持网络高效的最佳实践。

## 同步变量如何工作 {#how-synced-variables-work}

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

如果你勾选 "synced" 复选框，VRChat 会同步变量。

![一张 Udon Graph 截图，显示 OnPlayerLeft 事件连接到 IsValid 节点。](/img/worlds/udon/networking/graph-synced-variable.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

VRChat 会同步标记了 `[UdonSynced]` 属性的变量。

```cs
[UdonSynced] private string score;
```

</TabItem>
</Tabs>

同步变量的行为与其他变量不同：

- 如果你的 UdonBehaviour 使用[手动同步](/worlds/udon/networking/network-details/#manual-synchronization)，则必须调用 `RequestSerialization()` 才能将变量从拥有者同步到所有玩家。
- 如果你的 UdonBehaviour 使用[连续同步](/worlds/udon/networking/network-details/#continuous-synchronization)，变量会自动为所有玩家更新。
- 你的脚本必须执行[所有权转移](/worlds/udon/networking/ownership)，才能允许其他玩家修改同步变量。
- [后加入的玩家](/worlds/udon/networking/late-joiners)会收到变量的最新状态，就像实例中的其他用户一样。无论同步类型如何都能生效，你无需在用户加入时手动调用 `RequestSerialization`。
- 并非所有类型的变量都能被同步。例如，你无法同步对场景对象的引用。支持的类型列在[此处](/worlds/udon/networking/network-details#synced-variables)。

## 变量同步的类型 {#types-of-variable-syncing}

可用的同步类型有两种：

### **1. 连续同步** {#1-continuous-sync}
- 当拥有者更改值时自动更新。
- 最适合频繁更新的值（例如进度条、玩家位置跟踪器）。
- 可以应用插值来平滑更新之间的变化。
- 无需调用 `RequestSerialization()`——更新会定期发送出去。

### **2. 手动同步** {#2-manual-sync}
- 需要调用 `RequestSerialization()` 才能发送数据更新。
- 最适合不常变化的关键值（例如计分板、游戏状态变量）。
- 有助于减少不必要的网络流量。

### 设置同步模式 {#setting-the-sync-mode}

![展示如何在检视面板中设置同步类型](/img/worlds/udon/networking/set-sync-inspector.png)

你可以使用 UdonBehaviour 检视面板中的 Synchronization 下拉菜单来设置其同步模式，如上图所示。

对于 UdonSharpBehaviour，你也可以改用 [UdonBehaviourSyncMode](/worlds/udon/udonsharp/attributes/#udonbehavioursyncmode) 属性从脚本中控制此设置，如下所示。

```cs
[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class Example : UdonSharpBehaviour 
{
  // 此类的同步模式为手动。
}
```


### 示例：使用手动同步 {#example-using-manual-sync}
```cs
[SerializeField, UdonSynced] private bool isDoorOpen;

public void ToggleDoor()
{
    isDoorOpen = !isDoorOpen;
    RequestSerialization(); // 手动向所有玩家发送更新
}
```

## 使用变量处理后加入的玩家 {#handling-late-joiners-with-variables}

务必了解如何为[后加入的玩家](/worlds/udon/networking/late-joiners)同步变量！

## 处理网络兼容性 {#handling-network-compatibility}

务必查看世界在不同平台变体和发行版本中的[网络兼容性](/worlds/udon/networking/compatibility)是如何确定的。
