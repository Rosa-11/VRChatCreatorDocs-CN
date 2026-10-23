# 黑名单管理器 {#blacklist-manager}
BlacklistManager 是访问 Udon 黑名单系统的接口。它唯一的职责是将某个对象的层级结构加入黑名单。当通过 [PlayerManager](player-manager.md) 生成玩家以及生成 ClientSim 系统本身时，就会用到它。
