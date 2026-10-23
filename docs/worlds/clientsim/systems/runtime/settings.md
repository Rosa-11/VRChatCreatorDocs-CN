# 设置 {#settings}

ClientSim 设置本身不是一个系统，而是关于如何运行 ClientSim 的数据。
### 启用 ClientSim {#enable-clientsim}
进入播放模式时是否应启用 ClientSim？在上传世界时，ClientSim 会被强制禁用。

### 启用控制台日志 {#enable-console-logging}
是否将调试信息记录到控制台？

### 移除“EditorOnly” {#remove-editoronly}
进入播放模式时，是否应删除所有标记为“EditorOnly”的对象？

### 设置目标帧率 {#set-target-framerate}
ClientSim 是否应设置应用程序的目标帧率？

### 目标帧率 {#target-framerate}
在播放模式下 Unity 的预期帧率。这将同时设置 Application.TargetFramerate 和 FixedTimeDelta。

### 启动延迟 {#startup-delay}
ClientSim 在启动并初始化 Udon 之前应等待多长时间？可以用它来模拟较长的世界加载时间，并验证 Unity 组件的行为。

### 生成玩家控制器 {#spawn-player-controller}
在启动 ClientSim 时生成一个可控制的玩家。若禁用，仍会创建一个本地玩家，以防止 Udon 程序崩溃。

### 显示桌面准星 {#show-desktop-reticle}
是否显示桌面准星？

### 显示工具提示 {#show-tooltips}
在可交互对象上方显示工具提示

### 反转鼠标视角 {#invert-mouse-look}
是否反转鼠标 Y 轴

### 玩家身高 {#player-height}
玩家在 Unity 单位中的高度。该值被限制在 0.2 到 80 之间。

### 本地玩家名称 {#local-player-name}
本地玩家的名称是什么，用于 VRCPlayerApi.displayName

### 本地玩家是主控 {#local-player-is-master}
设置为 false 时，会生成一个远程玩家并将其设为主控。

### 是实例所有者 {#is-instance-owner}
本地玩家是否为实例所有者？
