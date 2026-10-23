# PlayerData


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PlayerData 是一个[键值数据库](https://en.wikipedia.org/wiki/Key%E2%80%93value_database)，用于存储关于玩家的[持久化数据](/worlds/udon/persistence/)，例如他们在游戏中的得分或他们在某个世界中的偏好设置。

## 设置 {#setup}

为了让某个 UdonBehaviour 使用 PlayerData，你只需要使用下文介绍的各种 PlayerData 函数即可。任何 UdonBehaviour 都可以在几乎任何时间、任何位置访问这些函数。

## 最佳实践 {#best-practices}

* 使用 `OnPlayerDataUpdated` 时，请考虑你的脚本是否可以只限于在本地玩家发生变化时触发，还是也需要为每位远程玩家触发。 
    * 例如——视频播放器音量的用户设置可以只对本地玩家更新，但一个合作撸狗游戏需要统计整个实例的「撸狗总数」得分，因此它需要对任何玩家得分的增加做出反应，以累加全局得分。
* 在使用玩家数据之前，请等待 `OnPlayerRestored` 事件。`OnPlayerRestored` 表示该玩家保存的数据已加载完成，可以安全地由 Udon 访问。即使你没有任何存档数据，此事件也会运行。
* 如果你有大量玩家键，遍历所有玩家键可能会很慢。一般建议：如果你只检查少数几个键，或者要检查的键超过十个，请使用 `TryGet` 方法直接检查特定键的值。

## 网络 {#networking}

PlayerData 不依赖 UdonBehaviour 的[同步](/worlds/udon/networking/)设置，因为它不与任何特定的 UdonBehaviour 绑定。将脚本设置为「None」而不是「Manual」或「Continuous」，既不会阻止该脚本访问和修改 PlayerData，也不会对 PlayerData 的整体运作产生负面影响。

当某个 UdonBehaviour 在 PlayerData 中设置一个值时，PlayerData 会自动同步该值。在内部，PlayerData 发送该值的方式类似于使用 `RequestSerialization` 事件进行手动同步。这意味着一个 UdonBehaviour 可以同时设置多个 PlayerData 键并将它们一起发送。该 UdonBehaviour 无需单独发送每个键。同样地，如果某个 UdonBehaviour 将一个键设为某个值，然后立即改为其他值，远程用户不会收到中间值。如果数据变化过快，远程用户只会收到最终状态。

PlayerData 的[带宽开销](/worlds/udon/networking/network-details)与一个将[同步](/worlds/udon/networking/)设置为「Manual」的 UdonBehaviour 类似。

你世界中的所有 UdonBehaviour 共享对你世界 PlayerData 的访问权限。当你设置一个 PlayerData 键时，你世界中的任何 UdonBehaviour 都可以访问它。PlayerData 不会在不同的 UdonBehaviour 之间「分隔」。

当你更改本地玩家的**任何**数据时，他们**所有**的 PlayerData 都会被发送，包括未发生变化的数据。如果你的数据量很小但更新非常频繁，或者数据量很大但更新很慢，你不太可能会遇到 [Udon 的带宽限制](/worlds/udon/networking/network-details#bandwidth-limits)。但如果你使用 PlayerData 来同步**大量**数据以及**高频**数据，你应该考虑将其中之一迁移到[玩家对象](/worlds/udon/persistence/player-object)。你可以使用玩家对象来同步持久化变量，但每个对象是分别同步的。这让你可以将快速变化的数据与大数据分离，从而降低世界的网络带宽占用。

## 事件 {#events}

| 事件 | 输出 | 备注 |
| -------- | -------- | -------- |
| OnPlayerDataUpdated | VRCPlayerApi player, PlayerData.Info[] infos | 如果任何玩家的 PlayerData 发生变化或被接收，则在帧末触发。<br/>提供与该数据关联的玩家的 VRCPlayerApi，以及一个包含该数据中所有键信息的信息数组。数组中的信息既包含该数据使用的键，也包含该数据的状态，例如它是被更改、添加还是未更改。 |
| [OnPlayerRestored](/worlds/udon/graph/event-nodes#onplayerrestored) | VRCPlayerApi player | 在 VRChat 玩家的持久化数据加载完成后触发。 |
| [OnPersistenceUsageUpdated](/worlds/udon/graph/event-nodes#onpersistenceusageupdated) | VRCPlayerApi player | 在 VRChat 玩家的持久化用量更新时触发。 |
| [OnPlayerDataStorageExceeded](/worlds/udon/graph/event-nodes#onplayerdatastorageexceeded) | VRCPlayerApi player | 在 VRChat 玩家的玩家数据用量超出允许的存储限制时触发。 |
| [OnPlayerDataStorageWarning](/worlds/udon/graph/event-nodes#onplayerdatastoragewarning) | VRCPlayerApi player | 在 VRChat 玩家的玩家数据用量接近允许的存储限制时触发。 |

:::info 注意时序问题

在读取或写入 PlayerData 之前，请等待 `OnPlayerRestored` 事件。

当玩家加入时，会调用 [OnPlayerJoined](/worlds/udon/graph/event-nodes#onplayerjoined) 事件。不过，接收到他们的 PlayerData 可能还需要一些额外时间。如果你过早设置 PlayerData，它可能会在接收到持久化数据时被覆盖。 

:::

## PlayerData 信息 {#playerdata-info}

`OnPlayerDataUpdated` 事件会提供一个 `PlayerData.Info` 数组。该数组包含与该玩家关联的所有当前 PlayerData 键。每个元素包含以下信息：

| 属性 | 类型 | 备注 |
| -------- | -------- | -------- |
| Key | String | 与该 PlayerData 键关联的字符串，可用于查询和修改器。 |
| State | Enum | 在此次 OnPlayerDataUpdated 发生时该 PlayerData 键的最新状态。 |

`State` 枚举描述了以下可能的状态：

| State     | Index | 备注 |
| --------- | ----- | -------- |
| Unchanged | 0     | 表示自上次更新以来，该键中的数据未发生变化。 |
| Added     | 1     | 表示自上次更新以来，该键已被添加。 |
| Removed   | 2     | 表示自上次更新以来，该键已被移除。被移除的键只会以该状态在此数组中显示一次，下一次它们将不再出现。*<br/>注意：目前无法移除键。* |
| Changed   | 3     | 表示自上次更新以来，该键中的数据已发生变化。 |
| Restored  | 4     | 表示该键已从持久化记录中恢复。这仅在你此前曾到访该实例后再次加入时发生。 |

## 最佳实践 {#best-practices-1}

* 使用 `OnPlayerDataUpdated` 时，请考虑你的脚本是否可以只限于在本地玩家发生变化时触发，还是也需要为每位远程玩家触发。 
    * 例如——视频播放器音量的用户设置可以只对本地玩家更新，但一个合作撸狗游戏需要统计整个实例的「撸狗总数」得分，因此它需要对任何玩家得分的增加做出反应，以累加全局得分。
* 在使用 PlayerData 之前，请等待 `OnPlayerDataRestored` 事件。`OnPlayerRestored` 表示该玩家保存的数据已加载完成，可以安全地由 Udon 访问。
* 如果你有大量玩家键，遍历所有玩家键可能会很慢。一般建议：如果你只检查少数几个键，或者要检查的键超过十个，请使用 `TryGet` 方法直接检查特定键的值。

## 方法 {#methods}

### 存储信息 {#storage-information}

玩家数据存储信息方法位于 `VRC.SDKBase.Networking` 命名空间中，与玩家对象存储信息方法放在一起。

| 函数 | 输入 | 输出 | 备注 |
| -------- | -------- | -------- | ------- |
| GetPlayerDataStorageLimit | | int | 返回玩家数据的玩家数据存储限制，单位为字节。 |
| GetPlayerDataStorageUsage | VRCPlayerApi target | int | 返回目标玩家最近一次计算得出的玩家数据存储用量。 |
| RequestStorageUsageUpdate | | void | 请求计算本地玩家的 PlayerData 和 PlayerObject 存储用量；结果通过 OnPersistenceUsageUpdated 返回 |

请注意，存储信息可能会随时间变得过时，可能需要更新。请避免频繁调用 RequestStorageUsageUpdate。

### 查询 {#queries}

使用这些方法可以获取关于某个键所关联值的更多信息。在尝试对某个键执行操作之前，它们有助于了解该键处存在什么内容。

| 函数 | 输入 | 输出 | 备注 |
| -------- | -------- | -------- | ------- |
| HasKey | VRCPlayerApi player, string key     | bool value     | 如果 PlayerData 中该键处存在值，则返回 true |
| GetType | VRCPlayerApi player, string key | Type | 获取 PlayerData 中该键处所包含值的类型 |
| TryGetType | VRCPlayerApi player, string key | out Type t, bool success | 获取 PlayerData 中该键处所包含值的类型。如果该键不存在，则返回 false |

### 修改器 {#mutators}

使用这些方法可以为本地玩家保存 PlayerData。无法设置远程玩家的数据。

值可以被覆盖，即使它们之前是其他类型。**键在写入后无法删除。**

| 函数      | 输入                        |
| ------------- | ---------------------------- |
| SetString     | string key, string value     |
| SetBool       | string key, bool value       |
| SetSByte      | string key, sbyte value      |
| SetByte       | string key, byte value       |
| SetBytes      | string key, byte[] value     |
| SetShort      | string key, short value      |
| SetUShort     | string key, ushort value     |
| SetInt        | string key, int value        |
| SetUInt       | string key, uint value       |
| SetLong       | string key, long value       |
| SetULong      | string key, ulong value      |
| SetFloat      | string key, float value      |
| SetDouble     | string key, double value     |
| SetQuaternion | string key, Quaternion value |
| SetVector4    | string key, Vector4 value    |
| SetVector3    | string key, Vector3 value    |
| SetVector2    | string key, Vector2 value    |
| SetColor      | string key, Color32 value    |
| SetColor32    | string key, Color32 value    |

### 访问器 {#accessors}

使用这些方法可以获取实例中任何玩家的 PlayerData。

如果某个键不存在，则返回该类型的默认值。例如，调用 `PlayerData.GetInt()` 会返回 `0`。

当使用错误的访问器类型时也会返回默认值，例如对包含 `string` 的键使用 `GetInt`。

如果默认值不符合需要，请使用 `TryGet` 或查询来区分默认值与不存在的键。 

| 函数 | 输入 | 输出 |
| -------- | -------- | -------- |
| GetString | VRCPlayerApi player, string key | string value |  
| TryGetString | VRCPlayerApi player, string key | string value, bool success | 
| GetBool | VRCPlayerApi player, string key | bool value | 
| TryGetBool | VRCPlayerApi player, string key | bool value, bool success | 
| GetSByte | VRCPlayerApi player, string key | sbyte value | 
| TryGetSByte | VRCPlayerApi player, string key | sbyte value, bool success | 
| GetByte | VRCPlayerApi player, string key | byte value | 
| TryGetByte | VRCPlayerApi player, string key | byte value, bool success | 
| GetBytes | VRCPlayerApi player, string key | byte[] value | 
| TryGetBytes | VRCPlayerApi player, string key | byte[] value, bool value | 
| GetShort | VRCPlayerApi player, string key | short value | 
| TryGetShort | VRCPlayerApi player, string key | bool value | 
| GetUShort | VRCPlayerApi player, string key | ushort value | 
| TryGetUShort | VRCPlayerApi player, string key | ushort value, bool success | 
| GetInt | VRCPlayerApi player, string key | int value | 
| TryGetInt | VRCPlayerApi player, string key | int value, bool success | 
| GetUInt | VRCPlayerApi player, string key | uint value | 
| TryGetUInt | VRCPlayerApi player, string key | uint value, bool success | 
| GetLong | VRCPlayerApi player, string key | long | 
| TryGetLong | VRCPlayerApi player, string key | long value, bool success | 
| GetULong | VRCPlayerApi player, string key | ulong | 
| TryGetULong | VRCPlayerApi player, string key | ulong value, bool success | 
| GetFloat | VRCPlayerApi player, string key | float | 
| TryGetFloat | VRCPlayerApi player, string key | float value, bool success | 
| GetDouble | VRCPlayerApi player, string key | double | 
| TryGetDouble | VRCPlayerApi player, string key |  double value, bool success | 
| GetQuaternion | VRCPlayerApi player, string key | Quaternion | 
| TryGetQuaternion | VRCPlayerApi player, string key |  Quaternion value, bool success | 
| GetVector4 | VRCPlayerApi player, string key | Vector4 | 
| TryGetVector4 | VRCPlayerApi player, string key | Vector4 value, bool success | 
| GetVector3 | VRCPlayerApi player, string key | Vector3 | 
| TryGetVector3 | VRCPlayerApi player, string key | Vector3 value, bool success | 
| GetVector2 | VRCPlayerApi player, string key | Vector2 | 
| TryGetVector2 | VRCPlayerApi player, string key | Vector2 value, bool success | 
| GetColor | VRCPlayerApi player, string key | Color | 
| TryGetColor | VRCPlayerApi player, string key | Color value, bool success | 
| GetColor32 | VRCPlayerApi player, string key | Color32 | 
| TryGetColor32 | VRCPlayerApi player, string key | Color32 value, bool success | 

## 示例 {#examples}

### 持久化跳跃计数器 {#persistent-jumps-counter}

<Tabs>
<TabItem value="graph" label="Udon Graph">


![Udon Graph 中的持久化跳跃计数器示例脚本。](/img/worlds/udon/persistence/graph-jump-counter.png)


</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using TMPro;
using UdonSharp;
using VRC.SDK3.Persistence;
using VRC.SDKBase;
using VRC.Udon.Common;

public class JumpCounter : UdonSharpBehaviour
{
    public TextMeshProUGUI jumpText;
    private const string JumpsKey = "jumps";
    public override void InputJump(bool value, UdonInputEventArgs args)
    {
        if (value)
        {
            AddJump();
        }
    }

    public override void OnPlayerDataUpdated(VRCPlayerApi player, PlayerData.Info[] infos)
    {
        if (player.isLocal)
        {
            UpdateTextComponent();
        }
    }

    private void AddJump()
    {
        var currentJumps = PlayerData.GetInt(Networking.LocalPlayer, JumpsKey);
        PlayerData.SetInt(JumpsKey, currentJumps + 1);
    }
    
    private void UpdateTextComponent()  
    {  
        jumpText.text = $"Jumps: {PlayerData.GetInt(Networking.LocalPlayer, JumpsKey)}";    
    }
}
```

</TabItem>
</Tabs>
