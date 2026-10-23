---
slug: "vrc_scenedescriptor"
---

# VRC Scene Descriptor

描述你的 VRChat 世界。对于你希望用作 VRChat 世界的每个 Unity 场景，它都是必需的。

| 参数                            | 描述                                                                                                                                                                                     |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spawns                          | 用作世界生成点参考的变换数组。                                                                                                                                                           |
| Spawn Radius                    | 玩家会在该半径范围内随机生成。设置为零可使玩家在精确位置生成。                                                                                                                           |
| Spawn Order                     | 应使用生成位置的顺序，选项包括：                                                                                                                                                         |
|                                 | - First：始终使用第一个生成点                                                                                                                                                            |
|                                 | - Sequential：按生成点列出的顺序                                                                                                                                                         |
|                                 | - Random：随机生成用户                                                                                                                                                                   |
|                                 | - Demo：生成点代表你的房间范围的中心，也就是说，例如，如果你距离房间范围中心一米远，你就会在距离生成点一米远的位置生成。                                                                  |
| Spawn Orientation               | 用户生成时所处的朝向，选项包括：                                                                                                                                                         |
|                                 | - Default：VRChat 默认的生成设置（目前为 Align Player With Spawn Point）                                                                                                                 |
|                                 | - Align Player With Spawn Point：使玩家与生成变换的旋转对齐                                                                                                                               |
|                                 | - Align Room With Spawn Point：使玩家的房间范围以生成点为中心对齐                                                                                                                         |
| Reference Camera                | 此摄像机的设置会应用到房间中的用户。可以是场景中的对象或预制件。                                                                                                                         |
| Respawn Height -Y               | 玩家重生以及拾取物重生或被销毁的高度。                                                                                                                                                   |
| Object Behaviour At Respawn     | 当拾取物掉出世界时应该做什么，选项包括：                                                                                                                                                 |
|                                 | - Destroy：删除拾取物                                                                                                                                                                    |
|                                 | - Respawn：将拾取物重生到它最初所在的位置                                                                                                                                                |
| Forbid Free Modification        | 如果为 true，非同步对象不能被非主控者操作。                                                                                                                                              |
| Forbid User Portals             | 阻止用户从世界菜单中打开传送门。                                                                                                                                                         |
| User Custom Voice Falloff Range | 启用接下来的几个选项，这些选项控制语音衰减范围。                                                                                                                                         |
| Unity Version                   | 正在使用的 Unity 版本；你永远不需要改动此项。                                                                                                                                            |
| Dynamic Prefabs                 | *已弃用，在 VRChat SDK3 中未使用。*                                                                                                                                                      |
| Dynamic Materials               | *已弃用，在 VRChat SDK3 中未使用。*                                                                                                                                                      |
| Interact Passthrough            | 定义哪些用户图层（User Layers）应允许交互通过的掩码。更多信息请参见[图层](/worlds/layers)页面。                                                                                          |
