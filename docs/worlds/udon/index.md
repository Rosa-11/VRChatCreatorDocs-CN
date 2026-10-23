---
sidebar_position: 1
---
# Udon

Udon允许玩家以有趣的方式与你的世界交互！你可以使用其他创作者编写的脚本，也可以创建自己的游戏、预制件和其他体验。

## 什么是Udon？ {#what-is-udon}

Udon是一种用于VRChat世界的编程语言[^1]。脚本可以与场景对象、[玩家](./players)、[同步的网络变量](./networking)等交互。Udon让你的世界栩栩如生！

Udon既在VRChat中运行，*也*在Unity编辑器中运行。你无需构建并上传VRChat世界即可测试和调试脚本。你还可以使用[Udon的调试功能](debugging-udon-projects)。

在你[创建VRChat世界](/sdk/)之后，主要有两种创建Udon脚本的方式：
- [Udon Node Graph](./graph)是一个可视化编程界面，使用节点和连线来连接流程、输入和输出。
	- 该图类似于Unity动画器、Blender着色器、几何节点或Unreal蓝图。
	- 该图是VRChat SDK独有的，不需要任何第三方工具。
	- 如果你刚接触编程，或只想创建非常简单的脚本，请使用该图。
- [UdonSharp](./udonsharp)允许你使用C#创建脚本。
	- UdonSharp类似于Unity内置的C#脚本系统。
	- 大多数UdonSharp用户使用[IDE](https://en.wikipedia.org/wiki/Integrated_development_environment)。[Visual Studio](https://visualstudio.microsoft.com/vs/unity-tools/)是免费的，[Rider](https://www.jetbrains.com/rider/)对非商业用途免费。
	- 如果你已经熟悉编程，或想创建功能强大的脚本，请使用UdonSharp。


如果你是专家用户：

- 你可以编写自己的编译器来生成Udon Assembly代码。
	- 从技术上说，VRChat Udon是一个[虚拟机](https://en.wikipedia.org/wiki/Virtual_machine)，运行从Udon Assembly编译的字节码。
	- 你*可以*手动编写Udon Assembly代码，不过这种情况极为罕见。

## 错误报告和功能请求 {#bug-reports-and-feature-requests}
要提交错误报告或功能请求，请使用VRChat的[Canny反馈板](https://vrchat.canny.io/udon)。

[^1]: 给技术倾向更强的读者：**VRChat Udon**是一个运行从**Udon Assembly**编译的字节码的虚拟机。你可以使用内置的**VRChat Udon Node Graph** UI、编写自己的**Udon Assembly**，甚至编写自己的编译器直接生成**Udon Assembly**或字节码程序，来生成**Udon Assembly**。

