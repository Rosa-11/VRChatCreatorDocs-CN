# 事件节点 {#event-nodes}

这是一份被视为“事件”的 Udon 节点列表。

你的脚本可以使用事件来检测操作并触发一连串操作或逻辑。[输入事件](/worlds/udon/input-events)有专门的页面。要在图表中跳转到某个事件，请在图表侧边栏中单击它。

以下所有节点在逻辑需要时都有流程节点。

:::note

更多与网络特别相关的事件列在[网络组件](/worlds/udon/networking/network-components/#networking-events)页面上。

:::

### Interact
当本地玩家与此 GameObject 交互时触发。

- 玩家只能与具有 Collider 组件和 UdonBehaviour 组件的 GameObject 交互。
- 如果你希望玩家与 2D UI 交互，请改用 [VRC Ui Shape](/worlds/components/vrc_uishape/) 和 Button 组件。

### OnDrop
当本地玩家在持有此对象后放下它时触发。

### OnPickup
当此对象被本地玩家拾取时触发。

### OnPickupUseDown
当持有此对象的本地玩家按下“Use”按钮时触发。在按钮被按下时触发。在桌面模式下需要启用“Auto Hold”。
 
### OnPickupUseUp
当持有此对象的本地玩家按下“Use”按钮时触发。在按钮被释放时触发。在桌面模式下需要启用“Auto Hold”。

### OnPlayerJoined
输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当任意玩家加入实例时触发。输出加入的 `player`。

当你加入实例时，你会为实例中的每位玩家执行 OnPlayerJoined，包括你自己。当另一位玩家加入你的实例时，你只会为加入的玩家执行 OnPlayerJoined。
 
### OnPlayerLeft
`Event_OnPlayerLeft`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当实例中任意玩家离开时触发。输出离开的 `player`。

### OnPlayerRestored
`Event_OnPlayerRestored`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当实例中某位玩家的所有持久化数据完成加载后触发，包括其所有 [PlayerData](/worlds/udon/persistence/player-data) 和 [PlayerObjects](/worlds/udon/persistence/player-object)。输出数据已加载的 `player`。

当你加入实例时，你会为实例中的每位玩家执行 OnPlayerRestored，包括你自己。当另一位玩家加入你的实例时，你只会为加入的玩家执行 OnPlayerRestored。

### OnStationEntered
`Event_OnStationEntered`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当玩家进入此对象上的站台时触发。

这包括本地玩家和远程玩家。如果你只想处理其中一种，请检查 [`VRCPlayerApi.isLocal`](/worlds/udon/players/#get-islocal)。

### OnStationExited
`Event_OnStationExited`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当玩家离开此对象上的站台时触发。

这包括本地玩家和远程玩家。如果你只想处理其中一种，请检查 [`VRCPlayerApi.isLocal`](/worlds/udon/players/#get-islocal)。

### OnVideoEnd
`Event_OnVideoEnd`

当此对象上的视频播放器播放完毕时触发，无论是因视频结束还是因玩家交互。

### OnVideoError
`Event_OnVideoError`

输出：`videoError` - `VRC.SDK3.Components.Video.VideoError`

当视频播放器在加载视频时遇到错误时触发。

### OnVideoLoop
`Event_OnVideoLoop`

如果启用了循环播放，则在视频播放器完成一次循环时触发。
 
### OnVideoPause
`Event_OnVideoPause`

当此对象上的视频播放器暂停时触发。
 
### OnVideoPlay
`Event_OnVideoPlay`

当此对象上的视频播放器开始播放时触发，无论是因队列中的新视频开始、取消暂停，还是因玩家交互。

### OnVideoStart
`Event_OnVideoStart`

当此对象上的视频播放器从停止状态开始播放时触发。

### OnVideoReady
`Event_OnVideoReady`

当视频播放器加载新视频时触发。
## 玩家事件 {#player-events}
### OnPlayerTriggerEnter
`Event_OnPlayerTriggerEnter`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当实例中任意玩家的胶囊碰撞体进入触发器碰撞体时触发。

### OnPlayerTriggerStay
`Event_OnPlayerTriggerStay`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当实例中任意玩家的胶囊碰撞体位于触发器碰撞体内时，每帧触发。

### OnPlayerTriggerExit
`Event_OnPlayerTriggerExit`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当实例中任意玩家的胶囊碰撞体离开触发器碰撞体时触发。

### OnPlayerCollisionEnter
`Event_OnPlayerCollisionEnter`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当实例中任意玩家的胶囊碰撞体进入碰撞体时触发。

### OnPlayerCollisionStay
`Event_OnPlayerCollisionStay`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当实例中任意玩家的胶囊碰撞体位于碰撞体内时，每帧触发。

### OnPlayerCollisionExit
`Event_OnPlayerCollisionExit`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当实例中任意玩家的胶囊碰撞体离开碰撞体时触发。

### OnPlayerParticleCollision
`Event_OnPlayerParticleCollision`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当粒子与实例中任意玩家的胶囊碰撞体碰撞时触发，前提是该粒子系统已开启“Collision”和“Send Collision Messages”。

### OnPlayerRespawn
`Event_OnPlayerRespawn`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当本地玩家通过在其菜单中选择“Respawn”重生时触发。

### OnPersistenceUsageUpdated
`Event_OnPersistenceUsageUpdated`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当玩家的持久化用量更新时触发。

### OnPlayerDataStorageExceeded
`Event_OnPlayerDataStorageExceeded`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当玩家超出其玩家数据存储配额时触发。

### OnPlayerDataStorageWarning
`Event_OnPlayerDataStorageWarning`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当玩家接近其玩家数据存储上限时触发。

### OnPlayerObjectStorageExceeded
`Event_OnPlayerObjectStorageExceeded`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当玩家超出其玩家对象存储配额时触发。

### OnPlayerObjectStorageWarning
`Event_OnPlayerObjectStorageWarning`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当玩家接近其玩家对象存储上限时触发。

### OnScreenUpdate
`Event_OnScreenUpdate`

输出：`data` - `VRC.SDK3.Platform.ScreenUpdateData`

当本地玩家首次在移动设备上进入世界时触发，以及当其设备方向发生变化时触发。输出一个包含以下值的 `ScreenUpdateData` 结构体：
* `type` - `ScreenUpdateType` - 目前仅 `OrientationChanged`，将来可能会扩展。
* `orientation` - `VRCOrientation` - 玩家设备的方向，表示为 `VRC.SDKBase.Platform.VRCOrientation` 枚举，其值为 `Landscape` 或 `Portrait`。
* `resolution` - `Vector2` - 玩家设备的分辨率，表示为 `Vector2` 结构体。 

### OnInputMethodChanged
`Event_OnInputMethodChanged`
输出：`inputMethod` - `VRC.SDKBase.VRCInputMethod`
当本地玩家使用不同的输入方式时触发——键盘、鼠标、控制器等。

### OnLanguageChanged
`Event_OnLanguageChanged`
输出：`language` - `string`
当本地玩家更新其显示语言时触发。

### OnPlayerSuspendChanged
`Event_OnPlayerSuspendChanged`

输出：`player` - `VRC.SDKBase.VRCPlayerApi`

当实例中任意玩家的设备进入挂起状态时触发。如果设备进入睡眠模式或切换到其他应用，则该设备被视为挂起。对于正在被挂起的玩家，此事件将在唤醒时触发。检查 `VRCPlayerApi.isSuspended` 可了解这是唤醒事件还是挂起事件。

设备处于挂起状态时，不会运行 Udon 代码，也不会响应网络事件，直到玩家重新打开 VRChat。

当你在 VRChat 中创建多人交互时，你应该对挂起的玩家做出响应，以确保你的 Udon 代码按预期继续运行。例如，你可能希望将重要对象的所有权转移给[未处于挂起状态的玩家](/worlds/udon/players/#get-issuspended)。

无论平台如何，你的代码都应考虑到任何设备随时可能进入挂起状态。PC 玩家目前永远不会进入挂起状态，但不应假设总是如此。

### OnVRCPlusMassGift
`Event_OnVRCPlusMassGift`

输出：
* `gifter` - `VRC.SDKBase.VRCPlayerApi`
* `numGifts` - `int`

当实例中任意玩家投下礼物炸弹时触发。

### OnVRCCameraSettingsChanged
`Event_OnVRCCameraSettingsChanged`

输出：`camera` - `VRC.SDK3.Rendering.VRCCameraSettings`

当用户在 VRChat 图形设置中更改某些选项时触发，例如“Near Clip Override”或“Field of View”。

通过 `VRCCameraSettings` 自行更改值将_不会_触发此事件！同样，相机的 `Position` 和 `Rotation` 也不会触发它，因为它们几乎每帧都会变化。

传入的 `camera` 对象指 `ScreenCamera` 或 `PhotoCamera`（见 [VRCCameraSettings](/worlds/udon/vrc-graphics/vrc-camera-settings)）。请注意，当用户使用 `PhotoCamera` 上的缩放滑块，或 Dolly 路径正在调整缩放值时，此事件会每帧触发，因为它们会影响 `FieldOfView` 值。

更改屏幕分辨率（包括调整 VRChat 窗口大小）也会每帧调用此事件。建议尽量减少处理，以避免影响性能。

此事件每帧可能触发多次。

### OnVRCQualitySettingsChanged
`Event_OnVRCQualitySettingsChanged`

当用户调整图形设置，影响 `VRC.SDK3.Rendering.VRCQualitySettings` 中的一个或多个值时触发。

与 `OnVRCCameraSettingsChanged` 类似，此事件可能频繁触发，建议保持处理轻量。

### Advanced Notes
此列表中的所有节点类型均为 `System.Void`。
