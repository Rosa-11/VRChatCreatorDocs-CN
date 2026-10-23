# SyncedObjectManager

SyncedObjectManager 跟踪场景中所有已初始化的同步对象（IClientSimSyncable）。这些同步对象被放入两个列表：一个列表包含所有同步对象，另一个包含所有位置同步对象。SyncedObjectManager 目前只有两个主要功能。第一个功能是检查所有位置同步对象，验证它们是否高于重生高度。如果它们低于重生高度，会根据 [SceneManager](scene-manager.md) 中的设置将其重生到起始位置或销毁。第二个功能是在玩家离开时确保对象拥有正确的所有者。该管理器监听 OnPlayerLeft [Event](event-dispatcher.md)，遍历所有对象检查该玩家是否为所有者，然后将这些对象改为由主控玩家拥有。此所有权转移发生在 Udon 程序收到玩家离开通知之前。


VRC.SDK3.ClientSim.ClientSimSyncedObjectManager
