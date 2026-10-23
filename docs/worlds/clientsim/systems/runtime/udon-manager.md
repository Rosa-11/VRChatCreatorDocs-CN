# UdonManager

UdonManager 跟踪场景中所有已初始化的 UdonBehaviour。请注意，在 VRCSDK 中，如果 UdonBehaviour 没有程序，它就不会初始化。这意味着没有程序的旧式位置同步 UdonBehaviour 不会被跟踪，即使有 SyncedObjectManager 也不行。UdonManager 有两个主要职责。第一个是在 ClientSim 完成初始化时通知所有 Udon 辅助类，从而允许 UdonBehaviour 启动。第二个是监听特定的 ClientSim [Event](event-dispatcher.md) 并将其转发给所有 UdonBehaviour。目前 UdonManager 只转发以下事件：
* OnPlayerJoined
* OnPlayerLeft
* OnPlayerRespawn
