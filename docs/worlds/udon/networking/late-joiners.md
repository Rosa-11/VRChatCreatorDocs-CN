# 后加入的玩家与同步问题 {#late-joiners--sync-issues}

当玩家在某些同步变量已被更改之后才加入 VRChat 实例时，需要让他们赶上世界的最新状态。本指南说明如何确保后加入的玩家获得一致且同步的世界体验。

## VRChat 如何处理后加入的玩家 {#how-vrchat-handles-late-joiners}
当新玩家加入实例时，VRChat 会执行以下操作：
- 通过`OnDeserialization`事件向他们发送最新的**同步变量**值。
- 将对象的所有者设置为正确的玩家。 
- 事件**不会**被重放。

## 确保后加入的玩家看到正确的状态 {#ensuring-late-joiners-see-the-correct-state}
### **1. 对于状态，使用同步变量而非事件** {#1-use-synced-variables-instead-of-events-for-state}
事件只触发一次且不会持久化，这意味着后加入的玩家**会错过任何基于事件的更改**。请改为：

- 将重要数据存储在`UdonSynced`变量中。
- 确保所有者在修改手动同步的 UdonBehaviour 的同步数据后调用`RequestSerialization()`。

示例：不要通过发送事件来开门，而是同步一个变量：
```cs
[SerializeField, UdonSynced] private bool isDoorClosed;

public void OpenDoor()
{
    isDoorClosed = false;
    RequestSerialization();
}
```
后加入的玩家在加入时会正确收到`isDoorClosed`状态。

### **2. 为后加入的玩家补上对象状态** {#2-catch-up-objects-for-late-joiners}

在他们加入时应用更改。你可以在`OnDeserialization`事件中实现，该事件会在他们加载完成后为其触发：
```cs
private GameObject lockedDoor;

public override void OnDeserialization()
{
    // 根据门的同步状态显示或隐藏门
    lockedDoor.SetActive(isDoorClosed);
}
```

### **3. 在需要时结合事件与同步变量** {#3-combine-events-and-synced-variables-when-needed}
如果需要，你可以从事件中更改同步变量。例如，要在任何人打开门时更新门的同步状态，你可以向对象的所有者发送事件：
```cs
public override void Interact()
{
    SendCustomNetworkEvent(NetworkEventTarget.Owner, nameof(OpenDoor));
}
```
这样你就不必仅仅为了设置变量而将门的所有者更改为与其交互的玩家。
