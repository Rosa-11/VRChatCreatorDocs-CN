# PlayerObject

PlayerObject 允许你自动为每位加入你世界的玩家提供一份游戏对象副本，例如手电筒、生命值条或一把剑。

- 当玩家加入你的世界时，VRChat 会自动为每位玩家生成该游戏对象的一份副本。
- 该副本包含所有组件和子游戏对象。
- 该副本生成时的位置、旋转、缩放和父级都与原始 [PlayerObject 模板](#playerobject-templates)相同。


## 设置 {#setup}

按照以下说明创建一个简单的 PlayerObject。当玩家加入实例时，VRChat 会为他们生成该 PlayerObject。

1. 在场景的层级视图中创建一个游戏对象。
2. 添加 `VRCPlayerObject` 组件 
	- 这会将你的游戏对象变为 PlayerObject [模板](#playerobject-templates)。
3. （可选）为该游戏对象（或其某个子对象）添加 `UdonBehaviour` 组件。
4. （可选）如果你希望同步的变量持久化，请将 `VRCEnablePersistence` 添加到与 `UdonBehaviour` 相同的游戏对象上。

## 加载持久化的用户数据 {#loading-persistent-user-data}

VRChat 会自动为满足以下条件的 PlayerObject 加载持久化用户数据：

- 该 PlayerObject（或其某个子游戏对象）带有 `UdonBehaviour` 组件。
- 该 `UdonBehaviour` 带有同步的变量。
- 该 `UdonBehaviour` 所在的游戏对象也带有 `VRCEnablePersistence` 组件。

使用 [`OnPlayerRestored`](/worlds/udon/graph/event-nodes#onplayerrestored) 来检测某个 PlayerObject 是否已完成用户数据的加载。此事件会为实例中的每位玩家各执行一次，包括该 PlayerObject 的所有者。

OnPlayerRestored 会包含一个指向刚刚恢复数据的玩家的引用。你可以借此让该游戏对象的所有者初始化变量或执行事件。

在 `Start` 和 `OnDeserialization` 事件中，所有权可以保证是正确的。不过，你应该避免在 `OnPlayerRestored` 事件之前读取或写入 PlayerObject 的用户数据。你可能会意外读取或写入过期的用户数据，而当从 VRChat 服务器接收到用户数据时，你的更改可能会被覆盖。

## 所有权 {#ownership}

当玩家拥有一个 PlayerObject 时，他们也拥有该 PlayerObject 内所有带同步 `UdonBehaviour` 的游戏对象。他们无法将其转移给其他任何人。

这非常便于给玩家提供永远不会被其他玩家「偷走」的工具或可拾取物。你可以保证他们始终拥有自己的 PlayerObject。 

## PlayerObject 模板 {#playerobject-templates}

PlayerObject 模板是你在编辑器中通过添加 `VRCPlayerObject` 而创建的原始游戏对象。VRChat 会复制你的模板来生成 PlayerObject。

模板和 PlayerObject 上的组件可以包含对其他组件的引用：
- 模板可以引用自己的组件或子组件。
- 模板可以引用你场景中的其他组件。
- 你场景中的组件**不能**引用模板。
	- 相反，你的场景对象必须使用对已生成的 PlayerObject 的直接引用。
	- 模板会被 VRChat 自动禁用，但仍然存在于场景中。
	- 在模板被禁用后，不要修改、销毁或编辑你的模板！这可能会导致错误或意外行为。
  
在脚本中使用以下方法来查找对 PlayerObject 及其组件的引用：
- 使用 `Networking.GetPlayerObjects` 获取与某位玩家关联的所有 PlayerObject，然后在该数组中筛选，找到你正在寻找的特定对象。
- 使用 `Networking.FindComponentInPlayerObjects` 将来自 PlayerObject 模板的引用转换为某位特定玩家的 PlayerObject 中的引用。
- 参见下面的[示例](#examples)。

## 事件 {#events}

以下事件与 PlayerObject 相关：

| 事件 | 输出 | 备注 |
| -------- | -------- | -------- |
| [OnPlayerRestored](/worlds/udon/graph/event-nodes#onplayerrestored) | VRCPlayerApi player | 在 VRChat 玩家的所有持久化数据加载完成后触发。 |
| [OnPersistenceUsageUpdated](/worlds/udon/graph/event-nodes#onpersistenceusageupdated) | VRCPlayerApi player | 在 VRChat 玩家的持久化用量更新时触发。 |
| [OnPlayerObjectStorageExceeded](/worlds/udon/graph/event-nodes#onplayerobjectstorageexceeded) | VRCPlayerApi player | 在 VRChat 玩家的玩家对象用量超出允许的存储限制时触发。 |
| [OnPlayerObjectStorageWarning](/worlds/udon/graph/event-nodes#onplayerobjectstoragewarning) | VRCPlayerApi player | 在 VRChat 玩家的玩家对象用量接近允许的存储限制时触发。 |


## 方法 {#methods}

PlayerObject 方法位于 `VRC.SDKBase.Networking` 命名空间中。

| 函数 | 输入 | 输出 | 备注 |
| -------- | -------- | -------- | ------- |
| GetPlayerObjects | VRCPlayerApi target | GameObject[] objects | 返回与所提供玩家关联的所有 PlayerObject 组成的数组 |
| FindComponentInPlayerObjects | VRCPlayerApi player, Component referenceComponent | Component | 使用 `referenceComponent`（它必须是某个 PlayerObject 模板的子对象），此函数返回与所提供玩家关联的对应组件。 |
| GetPlayerObjectStorageLimit | | int | 返回玩家对象的玩家对象存储限制，单位为字节。 |
| GetPlayerObjectStorageUsage | VRCPlayerApi target | int | 返回目标玩家最近一次计算得出的玩家对象存储用量。 |
| RequestStorageUsageUpdate | | void | 请求计算本地玩家的 PlayerData 和 PlayerObject 存储用量；结果通过 OnPersistenceUsageUpdated 返回 |

请注意，存储信息可能会随时间变得过时，可能需要更新。请避免频繁调用 RequestStorageUsageUpdate。

这些方法的实用封装位于 `VRCPlayerApi` 类上。

| 函数 | 输入 | 输出 | 备注 |
| -------- | -------- | -------- | ------- |
| GetPlayerObjects | | GameObject[] objects | 返回与所提供玩家关联的所有 PlayerObject 组成的数组。 |

## 示例 {#examples}

### 在 PlayerObject 上查找自定义脚本 {#finding-a-custom-script-on-a-playerobject}

此示例会自动遍历所有 PlayerObject，并找到你正在寻找的特定组件。请将 `CustomPlayerObjectScript` 替换为你想要查找的组件类型。

```cs
public CustomPlayerObjectScript Find(VRCPlayerApi player)
{
    var objects = Networking.GetPlayerObjects(player);
    for (int i = 0; i < objects.Length; i++)
    {
        if (!Utilities.IsValid(objects[i])) continue;
        CustomPlayerObjectScript foundScript = objects[i].GetComponentInChildren<CustomPlayerObjectScript>();
        if (Utilities.IsValid(foundScript)) return foundScript;
    }
    return null;
}
```

### 在 PlayerObject 上查找组件 {#finding-a-component-on-a-playerobject}

此示例将使用 `FindComponentInPlayerObjects` 函数，将来自 PlayerObject 模板的引用转换为某位特定玩家 PlayerObject 中的引用。 

```cs
public Transform referenceChildTransform; // 对 PlayerObject 或其子对象上某个 Transform 的引用

public void Find(VRCPlayerApi targetPlayer)
{
    Component foundComponent = Networking.FindComponentInPlayerObjects(targetPlayer, referenceChildTransform);
    // foundComponent 将是 Transform 类型，并对应 targetPlayer 中与该引用匹配的 PlayerObject。
}
```
