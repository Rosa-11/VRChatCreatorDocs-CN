# 脚本执行顺序 {#script-execution-order}

| 执行顺序 | 系统名称                | 描述                                                                                                                                                    |
|-----------------|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -Infinity       | UnityInputSystem     | Unity InputSystem在所有MonoBehaviour之前更新。来自用户按键的输入会被发送到ClientSimInput，然后分发事件。                             |
| -3000           | TrackingProvider     | 检查输入以更新TrackignProvider。例如：桌面模式下的头部X轴旋转。                                                                         |
| -3000           | PlayerController     | 在射线检测之前更新玩家位置。                                                                                                                      |
| -2000           | PlayerRaycaster      | 将PlayerHands的位置更新为TrackingProvider的手部数据。通过射线检测查找世界中的可交互对象。这必须发生在EventSystems更新之前。 |
| -1000           | Unity Event System   | 发送鼠标事件以与UI交互。顺序无法更改。                                                                                                |
| 0               | ClientSimBehaviours  |                                                                                                                                                                |
| 0               | UdonBehaviour        | 向Udon程序发送Update事件。                                                                                                                           |
| 1               | UdonInput            | 这必须发生在UdonBehaviour.Update之后，以确保事件顺序正确。                                                                                      |
| 10000           | ClientSimBaseInput   | 更新输入事件的当前帧计数。仅用于确保测试与播放模式在处理输入的时间上表现一致。                         |
| 30000           | PlayerStationManager | 尽可能晚地更新坐在站台上的玩家位置，以便所有其他脚本都有时间先完成计算。                                          |
| 30001           | TooltipManager       | 在确定玩家位置后更新工具提示视觉元素的位置。                                                                                 |
| 31000           | PostLateUpdater      | VRChat发送给UdonBehaviour的PostLateUpdate事件。                                                                                                          |
