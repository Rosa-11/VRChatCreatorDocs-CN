---
sidebar_position: -1
---
# Udon Node Graph

Udon Node Graph 是创建 Udon 程序的默认界面。本节介绍如何使用它。如果你想直接查看示例，请参阅 [Udon 示例场景](/worlds/examples/udon-example-scene)。

## 界面 {#interface}

你可以使用 **VRChatSDK > Udon Graph** 下的菜单项打开 Udon Graph 窗口，或单击 UdonBehaviour 组件上的 **Open Udon Graph** 按钮。

![Udon 窗口](/img/worlds/index-a1d7f43-open-graph.png)

如果你通过菜单命令打开窗口，你将看到欢迎屏幕，其中包含变更日志和一些设置。

可以同时打开多个图表，你可以使用图表窗口顶部的选项卡在它们之间切换。 

你可以通过单击要关闭的选项卡角落的 X 来关闭选项卡。图表选项卡不是“真正的”选项卡，只会在你选择它们时重新打开每个选项卡。这意味着切换选项卡所需的时间与打开图表一样长。

## 流程 {#flow}
图表的流程定义了哪些节点将运行，以及它们运行的顺序。
![](/img/worlds/index-f9c508c-simple-branching.png)

上图中的三角形是_流程_端口，它们按照从左到右的顺序触发，沿着连接它们的面条。要理解 Udon 图表中发生的事情并制作自己的图表，请_跟随流程_。 

顶部栏上有一个“Highlight flow”开关，启用后，会高亮显示通过流程边连接的节点，让你可以快速查看程序是如何到达特定节点的。 
![](/img/worlds/index-2139dee-simple-flow-highlight.png)

如果节点没有任何流程连接，则不会发生任何事情。

在上图中：
1. _Start_ 事件在世界加载时触发
2. 接下来触发 Branch。它检查其复选框的值，然后触发 *True* 或 *False* 路径。
3. 如果值为 True，则触发顶部节点，该节点发送名为“Hello”的自定义事件。
4. 否则，我们将发送名为“Goodbye”的自定义事件

如果你还不知道**发送自定义事件**是什么意思，也没关系。学习阅读图表的流程是理解它们作用的第一步。

## 创建节点 {#creating-nodes}
节点是表示你可以触发的方法的方框。构建图表包括创建节点并将它们连接在一起以创建程序。

有几种创建节点的方法：
  * [快捷键](#hotkeys)
  * [拖放操作](#drag-and-drop-for-gameobjects-and-components)
  * [搜索菜单](#searching-for-nodes)

### 快捷键 {#hotkeys}
按住以下某个键，然后在图表上任意位置单击以创建相应节点：
* `1`：float
* `2`：Vector2
* `3`：Vector3
* `4`：Vector4
* `+`：浮点加法
* `-`：浮点减法
* `=` - 浮点相等比较
* `b`：Branch
* `shift+b`：Block 

### 其他快捷键： {#other-hotkeys}
* 按住“C”，然后单击常量以将其转换为变量。
* Shift+A 对齐所选节点 
* 按住 Ctrl+G 进行快速分组
* L+单击记录所选节点的值 
* 按住“Shift+F”，然后单击输出数组类型的节点，以自动生成 foreach 循环
其中许多功能也可在相应节点的右键菜单中使用。
![以简单的方式创建 for 循环！](/img/worlds/index-87b33a4-for-loop.gif)
### 为 GameObject 和组件拖放 {#drag-and-drop-for-gameobjects-and-components}

如果你想为 GameObject 或组件添加交互性，可以将它们从层级视图拖放到图表中。例如，你可以从“Light”标题处拖动 Light 组件并将其放到图表上。
![轻松获取 Light 组件的引用，以便你对其进行操作。](/img/worlds/index-6238d1e-light-component.jpg)
通过这种方式拖放创建节点会创建绑定到 GameObject 或组件的变量，因此你会看到变量窗口中出现一个新变量，以及一个实际上是“Get Variable”节点的节点，该节点已自动设置好以获取你的新组件。

### 为变量拖放 {#drag-and-drop-for-variables}

你可以通过按图表侧边栏变量窗格中的 **+** 按钮来创建任意类型的变量。然后你可以将变量名拖放到图表上以创建“Get Variable”节点，拖动时按住 **Ctrl** 键可创建“Set Variable”节点，或按住 **Alt** 键可创建“On Variable Changed”节点。

### 搜索节点 {#searching-for-nodes}

按**空格键**打开快速搜索，然后输入你想要交互的类的前几个字母。
![](/img/worlds/index-08df7d3-gameobject-search.png)

如果你了解 Unity 的基本类和对象类型，这种搜索方法效果最好。还有其他搜索方式，请参阅：[搜索节点](/worlds/udon/graph/searching-for-nodes)

## 编译图表 {#compiling-the-graph}
图表会定期在后台自动编译。发生这种情况时，你会看到图表右上角闪烁，如果一切顺利，状态框会变绿，如果有问题则会变红。无论哪种情况，你都可以单击状态框查看生成的程序集代码，或者如果出现问题，查看错误信息。

![状态框显示“OK”，我们可以看到此程序集顶部声明的变量。](/img/worlds/index-fc0a2c0-assembly.png)
## 运行图表 {#running-the-graph}
在上传图表到 VRChat 之前，有两种方式可以在场景中运行图表。

### 在编辑器中运行 {#running-in-editor}
你可以使用 Unity 的播放按钮直接在编辑器中运行场景，以测试一些图表。这对一些简单的方法和逻辑有效，但以下项目不会按预期工作：
* 同步变量和网络事件

### 运行构建与测试 {#running-build--test}
使用 VRChat SDK 窗口进行本地测试。这会稍微耗时更长，因为它会将你的内容打包到一个离线世界中，并启动实际的 VRChat 客户端，为你提供一个可以交互对象并发出 VRCPlayerAPI 请求的虚拟形象。
![测试同步功能最简单的方法是启动 2 个本地客户端。](/img/worlds/index-32da932-local-testing-2.png)

要测试同步变量和 NetworkEvents，你需要两个客户端——你可以使用“Number of Clients”字段启动最多 8 个本地客户端，它们将在私有测试世界中启动。它们都将具有相同的 DisplayName，但在其他方面会被识别为不同的玩家，因此你可以测试你的交互。

如果“Force Non-VR”对你不起作用，请切换到 VRChat SDK 窗口的“Settings”选项卡，并将你的 VRChat Client Path 设置为指向你实际的 VRChat 安装位置。

![VRChat SDK 中的已安装客户端路径设置](/img/worlds/index-6d24b40-client-path.png)

## 上传你的世界 {#uploading-your-world}
只要你[创建 VRChat 账号](https://vrchat.com/home/register)，就可以进行构建与测试。为了发布世界以供他人访问，你需要在 VRChat 中花一些时间——访问世界、结交朋友并获得灵感！
