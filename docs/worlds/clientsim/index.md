---
sidebar_position: 0
---

# ClientSim

![ClientSim 截图。Scene视图显示本地玩家和一名远程玩家。Game视图显示 ClientSim 的“Pause”菜单，其中有重生玩家、生成远程玩家、关闭菜单以及其他各种选项的按钮。ClientSim Settings 窗口和 PlayerData 窗口也可见。](/img/worlds/clientsim/clientsim-screenshot.png)

ClientSim 是 client simulator 的缩写，它是 Worlds SDK 的一部分，可在 Unity 编辑器中复刻 VRChat 客户端的行为，并可用于加速开发。

## 功能 {#features}

- 无需打开 VRChat，即可在 Unity 中测试你的世界。
- 使用鼠标和键盘或游戏手柄控制玩家。
- 在播放模式下检视 Udon 变量。
- 抓取可拾取物（Pickup），使用交互（Interact）、UI 和站点（Station）。
- 进入播放模式时删除 EditorOnly 对象。

在将世界公开之前，一定要先在 VRChat 中测试你的世界！ClientSim 无法模拟 VRChat 的全部功能。

## 窗口 {#windows}

ClientSim 添加了多个 Unity 编辑器窗口，帮助你调试和测试你的世界：

- ClientSim Settings 允许你更改本地玩家的名称和玩家身高、禁用 ClientSim 等。
- 在播放模式下，按「Escape」键可打开游戏内设置窗口。
- [ClientSim PlayerData](playerdata-editor-window)窗口允许你调试 PlayerData。
- [ClientSim PlayerObject](playerObject-editor)窗口允许你调试 PlayerObject。

## 入门 {#getting-started}

1. 打开你的 VRChat 世界场景。
2. 在 Unity 中按下播放。
3. 在 Unity 的“Game”窗口中测试你的世界。

在 [Systems](systems) 章节中进一步了解所有系统的工作原理

## ClientSim 中的网络差异 {#networking-differences-in-clientsim}

ClientSim 只模拟本地 VRChat 玩家，而不模拟远程玩家。[反序列化事件](/worlds/udon/networking/network-components/#ondeserialization)会为本地玩家模拟，但不会为生成的远程玩家模拟。

VRChat 服务器的部分内容是模拟的。例如，当你生成一个远程玩家时，本地玩家会收到 `OnPlayerRestored` 事件。

ClientSim 对 VRChat 的网络序列化器有不同实现。因此，事件属性中存储和序列化的数据量存在差异。`OnPostSerialization` 和 `OnDeserialization` 等事件中的数据在 ClientSim 与 VRChat 中有所不同（见下文）。

### [OnPostSerialization(SerializationResult)](/worlds/udon/networking/network-components/#onpostserialization)

ClientSim 仅在事件属于同步的 Player Object 时才执行该事件。

|                               | 在 ClientSim 中                               | 在 VRChat 中                          |     |
| ----------------------------- | --------------------------------------------- | ------------------------------------ | --- |
| SerializationResult.success   | 始终为 true                                   | 序列化成功时为 true                  |     |
| SerializationResult.byteCount | 对象上已序列化的属性数量                      | 发送的字节数                         |     |


### [OnDeserialization(DeserializationResult)](/worlds/udon/networking/network-components/#ondeserializationdeserializationresult)

ClientSim 仅在事件属于同步的 Player Object 时才执行该事件。

|                                     | 在 ClientSim 中 | 在 VRChat 中                                           |
| ----------------------------------- | --------------- | ------------------------------------------------------ |
| DeserializationResult.sendTime      | 始终为 0        | 此消息发送时的时间，单位为秒。                         |
| DeserializationResult.receiveTime   | 始终为 0        | 此消息接收时的时间，单位为秒                           |
| DeserializationResult.isFromStorage | 正常运作        | 从持久化存储发送时为 true                              |
