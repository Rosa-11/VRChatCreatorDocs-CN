# 玩家管理器 {#player-manager}
PlayerManager 系统负责 ClientSim 运行期间的 VRCPlayerApi 数据。该系统负责创建和销毁玩家、管理谁是当前 master，并发送相关的[事件](event-dispatcher.md)，例如 OnPlayerJoin、OnPlayerLeft 和 OnNewMaster。PlayerManager 与 CyanEmu 中的实现类似，但这次是实例化的类而非静态类。大部分 VRCPlayerApi SDK 钩子都链接到该类中的静态函数。
