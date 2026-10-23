# 对象所有权 {#object-ownership}

## 简介 {#introduction}
在 VRChat 中，每个联网的 GameObject 都有一个拥有者。所有权决定了哪个玩家可以修改和更新联网对象。理解并管理所有权对于在实例中所有玩家之间正确同步对象至关重要。

## 所有权如何工作 {#how-ownership-works}
- **第一个**加入实例的玩家默认成为所有联网对象的拥有者。
- 所有权可以在玩家之间动态**转移**。
- 只有联网对象的**拥有者**才能修改其同步的 Udon 变量。
- 如果拥有者离开实例，VRChat 会**自动分配**新的拥有者。

## 转移所有权 {#transferring-ownership}
你可以使用 Udon 转移对象的所有权：

```cs
Networking.SetOwner(VRCPlayerApi player, GameObject obj);
```

### 示例：更改对象所有权 {#example-changing-object-ownership}
如果你希望玩家在与对象交互时取得该对象的所有权：

```cs
public override void Interact()
{
    Networking.SetOwner(Networking.LocalPlayer, gameObject);
}
```

此函数运行后，本地玩家将成为该对象的新拥有者。

## 所有权事件 {#ownership-events}
VRChat 提供两个与所有权相关的关键事件：

### OnOwnershipRequest

该事件在所有权转移**之前**被调用，允许你**批准或拒绝**该请求。

```cs
public override bool OnOwnershipRequest(VRCPlayerApi requestingPlayer, VRCPlayerApi newOwner)
{
    return true; // 批准转移
}
```

### OnOwnershipTransferred
当对象的所有权发生变化时触发。你可以用它来在所有权转移时更新 UI 元素或其他行为。

```cs
public override void OnOwnershipTransferred(VRCPlayerApi newOwner)
{
    Debug.Log($"New owner: {newOwner.displayName}");
}
```

## 转移事件图示 {#transfer-events-diagram}
此图展示了事件顺序，以便你了解成功转移对象所有权所涉及的步骤。

![](/img/worlds/udon-networking-813f99e-OnOwnershipRequest_Activity.svg)

## 实例管理员 {#the-instance-master}

实例管理员是拥有任何从未被手动设置或转移过所有权的对象的玩家。你可以通过 [`VRCPlayerApi.isMaster`](/worlds/udon/players/#get-ismaster) 检查某个玩家是否为管理员。

玩家是否为实例管理员_不应_被用作限制访问世界某些功能的方式。为此，请考虑改用"实例拥有者"。

管理员玩家的选择遵循以下规则：

- 实例中始终会有一个有效的管理员玩家。
- 第一个进入先前为空的实例的玩家将成为初始管理员。
- 当现任管理员离开实例时，管理员玩家会发生更改。
	- 如果管理员玩家使用 Android 且将 VRChat 在后台保留了太长时间，管理员也可能发生更改。
- 当现任管理员离开时，会在调用 `OnPlayerLeft` 之前从实例中的其他玩家中选出新的管理员。
- 你不得依赖任何特定玩家成为管理员。新的管理员玩家将根据服务器端的各种标准（平台、网络状况等）选出。

这些是 VRChat 目前对网络管理员行为做出的_唯一_保证。任何其他观察到的行为都可能发生变化。

:::note 如果可以避免，请不要依赖管理员！

建议尽可能使用所有权检查来构建你的网络逻辑，而不是检查实例管理员。
在某些情况下，管理员玩家可能会暂时无响应，而这段时间内的事件可能不会被执行。
:::

## 最佳实践 {#best-practices}
- 如果你希望玩家能够更改对象上的变量，请确保先检查或请求所有权。
- 确保与所有权相关的逻辑考虑了**玩家断开连接**和**后加入的玩家**。
- 尽可能避免依赖**实例管理员**——请改用正确的所有权处理方式。

## 后续步骤 {#next-steps}
如需了解更多细节，请探索以下网络主题：
- [使用变量进行同步](/worlds/udon/networking/variables)
- [使用事件进行同步](/worlds/udon/networking/events)
- [调试联网对象](/worlds/udon/networking/debugging)

