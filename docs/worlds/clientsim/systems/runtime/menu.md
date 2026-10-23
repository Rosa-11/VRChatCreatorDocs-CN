# Client Sim Menu

ClientSimMenu 有四个页面，可根据不同情况显示。菜单现在位于世界空间中，而不再是相机的叠加层。它会渲染在所有内容之上，以确保玩家能够使用菜单。

## 警告页面 {#warning-page}

![警告](/img/worlds/clientsim/warning.png)

每次 ClientSim 启动时都会显示警告页面。该页面向用户说明 ClientSim 与 VRChat 并不相同，两者会存在差异。它只有一个按钮，用户必须按下该按钮才能关闭页面并关闭菜单。

## 暂停页面 {#pause-page}

![警告](/img/worlds/clientsim/pause.png)

用户在接受警告页面之后，每次打开菜单时都会显示暂停页面。该页面包含三个部分：操作、玩家信息和设置。

## 操作 {#actions}

操作部分包含四个按钮：
1. 关闭菜单 - 关闭菜单并允许玩家移动
2. 重生 - 关闭菜单并将玩家传送到出生点
3. 设置窗口 - 打开 ClientSim [设置窗口](../editor/settings-window.md)
4. 退出播放模式 - 退出 Play 模式并返回编辑模式。

## 玩家信息 {#player-info}

玩家信息部分包含有关本地玩家的信息。
1. 玩家名称
2. 玩家 ID
3. 本地玩家是否为 master
4. 本地玩家是否为实例所有者
5. 一个用于生成远程玩家以便测试的按钮

## 设置 {#settings}

设置部分提供了用于更改当前 ClientSim 运行时设置的选项。更改这些设置后，即使在播放模式结束后也会保存其值。
* **显示工具提示** - 切换交互工具提示的显示。
* **桌面准星** - 切换屏幕中央的桌面准星。如果鼠标悬停在可交互的 UI 对象上，这不会禁用 UI 指针。
* **反转鼠标视角** - 切换是否反转鼠标 Y 轴。
* **控制台日志** - 切换是否将调试信息记录到控制台。
* **玩家身高** - 用于设置玩家身高的滑块。默认值为 1.9 个 Unity 单位高。滑块被限制在 0.2 到 4 个单位之间。如果在 ClientSim Unity Settings Window 中设置了值，则身高最高可被覆盖到 80 个单位。切换菜单时会限制最大值，以便在不退出播放模式的情况下保持滑块可用。注意 PlayerHeight 与 TrackingScale 不同，尽管这两个值彼此相关。

## 延迟启动页面 {#delay-start-page}

![延迟](/img/worlds/clientsim/delay.png)

当 [ClientSim Settings](settings.md) 中 ClientSim 启动前需要延迟的时长被设置为非零值时，就会显示延迟启动页面。ClientSim 启动时，该页面会自动关闭。如果玩家控制器已生成，随后会显示警告页面。用户无法关闭此页面，必须等待这段时间结束或退出播放模式。

## 无效设置页面 {#invalid-settings-page}

![无效设置](/img/worlds/clientsim/invalid-settings.png)

当用户的 Unity 项目设置未配置为使用 ClientSim 时，就会显示无效设置页面。这种情况可能发生在 ClientSim 刚导入时，或者用户修改了 ClientSim 所依赖的某项设置时。显示此页面时，会强制显示 [设置窗口](../editor/settings-window.md)，以便用户点击修改项目设置所需的按钮。如果玩家没有正确的 Unity 输入设置，菜单上的按钮将不会有任何作用。除了退出播放模式并修正无效设置之外，无法跳过此页面。
