# 网络统计 {#network-stats}
Udon 可以通过 `VRC.SDK3.Network.Stats` 静态类获取若干网络统计信息。

## 全局网络统计 {#global-network-statistics}

| 名称                    | 类型    | 描述                                                                         |
| ----------------------- | ------- | ----------------------------------------------------------------------------------- |
| `ThroughputPercentage`  | `float` | 当前正在使用的允许输出数据吞吐量的运行平均值。 |
| `RoundTripVariance`     | `float` | 到我们的服务器再返回的传输时间的统计方差。           |
| `BytesInMax`            | `float` | 每秒接收到的最大字节数。                                             |
| `BytesOutMax`           | `float` | 每秒发送的最大字节数。                                                 |
| `BytesOutAverage`       | `float` | 每秒发送字节数的运行平均值。                                       |
| `BytesInAverage`        | `float` | 每秒接收字节数的运行平均值。                                   |
| `HitchesPerNetworkTick` | `float` | 记录的缺失样本数量的运行平均值。                           |
| `Suffering`             | `float` | 排队中的出站消息数量的度量。                                |
| `TimeInRoom`            | `float` | 在当前实例中度过的时间长度。                                   |

## 每个游戏对象和每个玩家的统计信息 {#per-game-object-and-per-player-statistics}

如果对象未通过网络同步，或以任何其他方式联网，所有游戏对象统计信息都会返回默认值。

| 名称                            | 类型    | 描述                                                                                                                                                                 |
| ------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UpdateInterval`                | float   | 该对象网络消息发送之间的时间的运行平均值。                                                                                        |
| `ReceiveInterval`               | `float` | 该对象网络消息接收之间的时间的运行平均值。                                                                                        |
| `FinalDelay`                    | `float` | 该对象的同步时间调整值。                                                                                                                         |
| `Group`                         | `int`   | 为了网络同步的目的，所有对象都会与附近的相关对象分到同一组；此数字表示该对象当前关联的组。 |
| `GroupDelay`                    | `float` | 该对象所属组中所有对象的同步调整值的运行平均值。                                                                     |
| `Sleeping`                      | `bool`  | 如果对象处于静止状态且不发送或接收网络消息，则为 `true`。                                                                                              |
| `Size`                          | `int`   | 与该对象关联的最近一条网络消息的大小（以字节为单位）。                                                                                         |
| `BytesPerSecondAverage`         | `float` | 该对象网络吞吐量的运行平均值，以字节为单位。                                                                                                     |
| `TotalBytes`                    | `int`   | 该对象的网络数据总消耗量。                                                                                                                          |
| `ReliableEventsInOutboundQueue` | `int`   | 该对象当前排队等待发送的手动同步事件及其他可靠事件的数量。                                                                   |
| `LastSendTime`                  | `float` | 上一次代表该对象发送消息的时间。                                                                                                                   |
| `LastReceiveTime`               | `float` | 上一次收到该对象消息的时间。                                                                                                                        |
