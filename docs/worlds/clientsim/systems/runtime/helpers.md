# VRCSDK 辅助组件 {#vrcsdk-helpers}

Helper 组件会被添加到对象上，用于帮助处理 VRC SDK 组件的行为。与 CyanEmu 和 Phase 2 相比，这些组件的职责保持不变，不过一些并非该对象自身功能所特有的逻辑已被剥离出去。例如，在 CyanEmu 中，CyanEmuPickupHelper 脚本负责处理持有拾取物的逻辑。现在这一行为已从 pickup helper 类中移出，放入了拾取物管理系统中。PickupHelper 代码现在只提供数据，说明 PlayerHand 应如何处理该拾取物。

Helper 类也可能扩展 ClientSim 中使用的接口。接口分为两类：[Usables](#usable-interfaces) 和 [Handlers](#handler-interfaces)。

## 可用接口 {#usable-interfaces}

可用接口通常以“able”结尾，表示可在 ClientSim 中以某种方式使用的物品。它们提供关于如何使用这些物品的信息，但不包含使用它们的方法。

| 名称 | 描述 |
|----------------------------|------------------------------------------------------------------|
| IClientSimInteractable     | 表示一个可以与之交互的对象 |
| IClientSimPickupable       | 表示一个可以被拾取的对象，扩展 Interactable |
| IClientSimStation          | 表示一个玩家可以用来坐下的对象 |
| IClientSimSyncable         | 表示一个可以拥有所有者的对象 |
| IClientSimPositionSyncable | 表示一个同步其位置的对象，扩展 Syncable |

## 处理器接口 {#handler-interfaces}

借助这两种接口类型，Helper 类成为包装 VRChat SDK 组件信息并将其提供给 ClientSim 的方式。

| 名称 | 描述 |
|----------------------------|------------------------------------------------------------------|
| PositionSyncedHelperBase   | VRCObjectSync 的辅助类，扩展 PositionSyncedHelperBase。Syncable、PositionSyncable、RespawnHandler |
| ObjectSyncHelper| VRCObjectSync 的辅助类，扩展 PositionSyncedHelperBase。Syncable、PositionSyncable、RespawnHandler |
| UdonHelper          | UdonBehaviour 的辅助类，扩展 PositionSyncedHelperBase。Syncable、PositionSyncable、RespawnHandler、Interactable、PickupHandler、StationHandler、SyncableHandler |
| PickupHelper     | VRCPickup 的辅助类。Pickupable |
| StationHelper | VRCStation 的辅助类。实现 IClientSimStation |
| ObjectPoolHelper| VRCObjectPool 的辅助类。Syncable |
| CombatSystemHelper | Udon CombatSetup 的辅助类。实现 IVRC_Destructible。初始化时会将辅助组件直接添加到玩家对象上。 |
| SpatialAudioHelper | VRCSpatialAudioSource 的辅助类 |
