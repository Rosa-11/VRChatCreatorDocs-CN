# 世界调试视图 {#world-debug-views}

VRChat 提供了一些调试视图，可以帮助你排查世界中的问题。有时这些视图也可能包含供 VRChat 内部开发使用的信息。在[Canny](https://feedback.vrchat.com/)上的用户支持或工作人员可能会向你索要这些界面的截图。不过一般情况下，你不应与其他用户分享这些视图。

你可以通过快速菜单设置页底部的按钮进入调试菜单：

![快速菜单设置页上的“Toggle Debug UI”按钮。](/img/worlds/world-debug-views-qm-open.png)

## 快捷键 {#shortcuts}

部分调试视图页面有可直接打开的快捷键：`Right Shift` + `~` + `< Number >`，其中“Number”会在下文的标题旁以方括号给出。

如果你的键盘布局中`~`不在 1 键的正左侧，请尝试使用 1 键正左侧的那个键，因为该快捷键优先考虑按键的位置而不是按键本身的字符。

![指示该使用哪个按键的键盘示意图](/img/worlds/world-debug-views-2103941-szhLVX11II.png)

## 受限视图 {#restricted-views}

部分调试视图和叠加层是受限的。默认情况下，只有世界创作者可以访问调试视图 6（Net Objects）、音频源（Audio Sources）页面以及世界叠加层。不过，你也可以通过在网站上你的世界设置中启用 World Debugging 来允许其他人看到它。别忘了点击“Save Changes”！在你启用 World Debugging 后，其他用户需要重新加入世界才能访问此调试视图。

![网站上的“World Debugging”设置](/img/worlds/world-debug-views-da70084-unknown_7.png)

## 调试菜单页面 {#debug-menu-pages}

这些调试视图在主调试菜单中作为标签页提供，也可以通过它们的快捷键直接打开。

### AssetBundle 与内存视图 (1) {#assetbundle-and-memory-view-1}

![AssetBundle 与内存页面](/img/worlds/world-debug-views-assetbundles.png)

AssetBundle 与内存页面显示 VRChat 当前已加载到内存中的虚拟形象、世界、物品和其他资源的相关信息。

此视图主要用于排查 VRChat 本身的问题，在世界开发过程中很少有用。

:::warning

“Force GC”和“Force GC (full)”按钮会触发一次内部垃圾回收。这看似会降低内存占用，但**不**建议在未完全理解其作用的情况下使用。

**它不会提升性能，也不会真正改善 RAM 占用！** 相反，反复使用可能导致性能问题或不稳定。

:::

### 版本与信息 (2) {#version--info-2}

![版本与信息页面](/img/worlds/world-debug-views-version-and-info.png)

版本与信息页面显示关于调试视图系统的一些帮助信息、你当前运行的 VRChat 构建版本以及热键信息（以红色显示）。
这些按钮可让你在不同的[调试世界叠加层](#debug-world-overlays)之间切换。

请注意，使用其快捷键（`Right Shift` + `~` + `2`）切换此视图时，会先切换到一个仅显示基本信息的精简 HUD 变体。再次按下该快捷键会打开完整的调试视图。

### 日志查看器 (3) {#log-viewer-3}

![日志查看器页面](/img/worlds/world-debug-views-log-viewer.png)

日志查看器页面会显示你的输出日志。它可以向你显示重要信息，例如 Udon Behaviour 崩溃、通过`Debug.Log`函数记录的任何信息，以及由 Unity 或 VRChat 产生的关于你的世界的其他潜在错误。

顶部的按钮可启用或禁用某些日志类型，可用作筛选器。

“Background”选项会在调试选项关闭时仍在此视图中收集日志。它在重启之间会保留，但如果处于活动状态，会在启动时警告你一次。

:::warning
在后台收集日志可能会对性能产生明显影响。
:::


### 玩家 (4) {#players-4}

![玩家页面](/img/worlds/world-debug-views-players.png)

调试视图 4 显示关于其他玩家的各种统计信息。

* M：该玩家是否为[实例的主控者](/worlds/udon/networking#the-instance-master)
* L：该玩家是否为本地玩家
* VR：该玩家是否处于 VR 中
* Group：该玩家当前所在的组。此上下文中的分组是一种内部网络系统，用于按距离将多个对象组合在一起，以便它们的数据可以一起发送。
* Intrvl：该玩家发送关于自身的同步数据之间的时间间隔。
* Fnl D：内部系统目标中的期望延迟。实际延迟会经常调整，以在延迟与平滑度之间找到良好平衡。

顶部包含一些关于当前实时网络状态的一般信息。例如，“Suffering”字段显示世界的 Udon behaviours 是否发送了过多数据。Udon 可以使用[网络统计 API](/worlds/udon/networking/network-stats/)检查其中大多数值。

底部的按钮会将一些统计数据导出到 JSON 文件中。该文件会写入与日志相同的文件夹。它主要用于内部测试目的，不应依赖它来进行世界开发工作。

### Net Objects (6)

![Net Objects 视图](/img/worlds/world-debug-views-net-objects.png)

Net Objects 页面显示你世界中的所有网络对象以及各种统计数据。

* Owner：对象所有者的 playerid。
* Group：此对象当前所在的组。此上下文中的分组是一种内部网络系统，用于按距离将多个对象组合在一起，以便它们的数据可以一起发送。
* Sleeping：该对象是否处于休眠状态。只有带有 VRCObjectSync 的对象可以休眠。休眠会使对象停止传输数据。
* Delay：此对象在所有者与查看者之间的当前延迟
* Size：此对象每次序列化的当前字节数。每次需要同步时，它都会发送这么多字节。
* Bps：此对象大约每秒消耗多少字节的粗略估计。
* Since Last：此对象自上次发送数据以来经过时间的累计计数。
* Interval：此对象大约每秒尝试同步多少次数的粗略估计。

请注意，当对象很多时，此页面在打开期间可能导致一些性能下降。

### 音频源 {#audio-sources}

![音频源调试页面](/img/worlds/world-debug-views-audio-sources.png)

音频源页面显示世界中所有当前活动的`AudioSource`组件的信息。其中显示的部分信息仅对内部调试有用。

* Name：`GameObject`名称。
* Clip：所分配`AudioClip`的名称。不包含`PlayOneShot`。如果未设置则为`<null>`。
* Type：该源是存在于世界中、属于某个 Avatar，还是内部的。对普通用户而言，只有`World`源可见。
* Vol：在 Unity 中设置的源音量。不包含来自`VRC_SpatialAudioSource`的`Gain`。
* 3D：`spatialBlend`值。
* Act/Prog：该源当前是否正在播放，以及相对于所分配`Clip`的当前进度。如果未分配剪辑则为`-1.0%`。
* VRC/SAS：该源是否带有`VRC_SpatialAudioSource`，以及它是否已被转换为 Steam Audio。
* Dist：到音频源的距离（物理单位），括号中为用于近场计算的虚拟距离（受 Avatar 缩放影响）。
* lG/rG dB：用于近场模拟的左/右耳音量偏移，单位为分贝（是偏移量，不是 dbFS）。
* d：用于计算 lG/rG 的方向性系数。
* PPC°：透视校正偏移。以度为单位的值估计的是：音频源相对于音频监听器的物理位置角度，与应用桌面或相机透视校正后它看起来所在的位置角度之间的差异。

音频源可以按 Scene（加载顺序）或按与监听者的距离排序。使用顶部的按钮切换排序方式。

你可以切换一个额外的叠加层，用于显示附近`AudioSource`的基本射线和位置信息。这主要供内部使用。

此页面需要[世界调试权限](#restricted-views)。

## 调试世界叠加层 {#debug-world-overlays}

叠加层不是调试菜单中的页面，而是直接在你周围的世界中显示数据。

你可以通过它们的快捷键启用它们，或从“版本与信息 (2)”页面启用。

所有这些都要求启用“World Debugging”，或者要求你本人上传了当前世界。World Debugging 的状态显示在调试菜单的左下角。

### PhysBone 与 Contact 叠加层 (7) {#physbone--contact-overlay-7}

![PhysBone 与 Contact 叠加层](/img/worlds/world-debug-views-physbone-contact.png)

调试视图 7 会高亮显示世界中所有附近的[PhysBones](/common-components/physbones)和[Contacts](/common-components/contacts)。当这些组件的行为不符合你的预期时，这对于调试它们很有用。

### 网络对象信息叠加层 (8) {#network-object-info-overlay-8}

![网络对象信息叠加层](/img/worlds/world-debug-views-88ea4e6-VRChat_6e9Vhf8jnq.png)

网络对象信息叠加层会在世界中每个同步对象的上方显示一个面板。每个面板会显示关于该特定对象的各种统计数据：

* P：所有者的 Ping
* Q：数据质量（100% 表示没有丢包）
* O：对象所有者的 PlayerID
* G：此对象当前所在的组。此上下文中的分组是一种内部网络系统，用于按距离将多个对象组合在一起，以便它们的数据可以一起发送。
* Held：如果该对象是可拾取的，它是否正被持有
* Status：显示关于此对象正在做什么的各种信息，例如`Should Sleep`、`Player`、`Held`或`Discontinuity`

### 玩家信息叠加层 (9) {#player-info-overlay-9}

与“网络对象信息叠加层 (8)”类似，此叠加层会在每个玩家脚下的面板上显示其调试统计信息。

### `VRC_UiShape` 调试叠加层 (0) {#vrc_uishape-debug-overlay-0}

![VRC_UiShape 叠加层示例](/img/worlds/world-debug-views-vrcuishape.jpg)

`VRC_UiShape`调试叠加层会显示你世界中每个[VRC_UiShape](/worlds/components/vrc_uishape)的轮廓。此外，它还会在你的屏幕（桌面模式）或你的手部（VR 模式）上显示一个文本叠加层，指示你当前正指向什么。用它来诊断你世界中的 UI 交互问题。
