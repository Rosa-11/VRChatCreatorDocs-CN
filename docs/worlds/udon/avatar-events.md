# Avatar 事件 {#avatar-events}

这些事件允许 Udon 对与玩家虚拟形象（Avatar）相关的更改做出反应。

## OnAvatarChanged

返回触发该事件的玩家的 `VRCPlayerApi` 对象。当玩家的虚拟形象加载完成时调用。

### 持久化的眼高 {#persisted-eye-heights}
玩家的虚拟形象加载后，会同步其相对于预制件眼高的任何偏差，并触发 `OnAvatarEyeHeightChanged` 事件。

如果该 `VRCPlayerApi` 对象属于本地玩家，那么在此事件期间获取其眼高将返回预制件的高度。

如果该 `VRCPlayerApi` 对象属于远程玩家，请注意该远程玩家可能尚未同步其新的眼高，因此在这种情况下你不应依赖返回的值。

## OnAvatarEyeHeightChanged

返回触发该事件的玩家的 `VRCPlayerApi` 对象，以及一个 `float`，描述其之前的或先前已同步的眼高（以米为单位）。当玩家通过切换到另一个虚拟形象或通过[虚拟形象缩放系统](/worlds/udon/players/player-avatar-scaling)改变眼高时调用。

### 首次加载虚拟形象 {#first-avatar-load}
当本地或远程用户加入世界时，为该用户收到的第一个先前眼高值可能是 `0`。

### 虚拟形象更改、远程玩家与事件顺序 {#avatar-changes-remote-players-and-event-ordering}
当**本地**用户更换其虚拟形象并应用持久化的眼高时（如果其保存的值与预制件高度不同），此事件应只针对其持久化高度执行一次。

当**远程**用户更换其虚拟形象并应用持久化的眼高时（如果其保存的值与预制件眼高不同），此事件可能会执行多次。

对于远程玩家，每当远程玩家向你同步新的眼高时，你就会收到此事件。这意味着你可能在 `OnAvatarChanged` 事件之前收到 `OnAvatarEyeHeightChanged` 事件，但你不应收到顺序错乱的 `OnAvatarEyeHeightChanged` 事件。


:::note 更多信息

有关此功能的更多信息，请参阅[玩家虚拟形象缩放](/worlds/udon/players/player-avatar-scaling)。

:::
