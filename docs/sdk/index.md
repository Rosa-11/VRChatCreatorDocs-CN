---
sidebar_position: -1
---

# 快速开始 {#getting-started}

在创建[虚拟形象](/avatars)和[世界](/worlds)之前，你需要执行以下步骤。

:::tip

如果你是VRChat新手，请阅读[VRChat的“快速开始”](https://vrch.at/getting-started)页面。

:::

**[VRChat Creator Companion](https://vcc.docs.vrchat.com/)**是开始使用最简单、最快捷的方式。它会为你安装[Unity](https://unity.com/)和VRChat软件开发工具包（SDK）。

- VRChat使用Unity游戏引擎。虚拟形象和世界也是在Unity中创建的。
- VRChat SDK允许你使用Unity创建虚拟形象和世界。

## 你的第一个项目 {#your-first-project}
你应使用Windows来创建你的第一个项目。

1. [下载VRChat Creator Companion (VCC)](https://vrchat.com/download/vcc)。
    - 阅读[文档](https://vcc.docs.vrchat.com/)。
2. 安装VCC。
	- 默认安装位置为`%LocalAppData%/Programs/VRChat Creator Companion`，但你可以按需更改。
4. VCC应会自动打开。如果没有，请在Windows中搜索“Creator Companion”。
5. 点击“Create New Project”。
6. 选择“Avatar”或“World project”。
7. 为你的项目命名。
8. 选择一个位置。
9. 点击“Create Project”。

:::note
你想上传到Android、Quest或iOS吗？请阅读[平台](/platforms)页面。
:::

## 打开你的项目 {#opening-your-project}

你现在可以打开你的新项目了！创建新项目后，Creator Companion的下一页会显示**Open Project**按钮。你也可以从左侧边栏的**Projects**标签页访问它。

如果你的项目未列出，请点击**Create New Project**旁的下拉菜单，然后通过项目界面选择**Add Existing Project**并选中它。项目打开后：

1. 检查标题栏，确保其以`PC, Mac & Linux Standalone <DX11>`结尾。
    - 如果不是，请转到`File > Build Settings...`，选择`PC, Mac & Linux Standalone`，然后点击左下角的`Switch Platform`。

2. 导航到`VRChat SDK > Show Control Panel > Authentication`。

3. 登录你的VRChat账户。你需要这样做才能上传你创建的任何内容。
    - 你必须拥有至少为“New User”[信任等级](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system)的VRChat账户才能上传内容。你不能使用Steam、Meta或Viveport账户上传内容。

## 改用Unity Hub {#using-unity-hub-instead}
虽然我们不推荐这样做，但如果你希望不通过VCC自行安装Unity，请查看[当前支持的Unity版本](/sdk/upgrade/current-unity-version)页面，并使用Unity Hub安装VRChat当前支持的Unity版本。

如果你没有使用VCC来设置项目，你还需要安装SDK。请通过[VRChat Creator Companion](https://vcc.docs.vrchat.com/guides/getting-started)进行。

仅使用Unity Hub创建项目：
* 打开Unity Hub（或仅打开编辑器，如果你选择这种方式）。
* 创建一个新项目，**将其设置为3D并保存**。
* 不要使用HDRP或URP。VRChat不使用它们。

仅使用Unity Hub打开项目：
* 点击右上角的**Open**，然后选择你项目所在的目录。

## 提示 {#tips}

* 如果你为Meta Quest构建VRChat内容，你还应同时为Android构建。查看我们的[Android文档](/platforms/android/index.md)以了解更多详情。
* 将项目保存在空间充足的存储驱动器上。Unity项目可能会变得非常大，尤其是在使用版本管理软件时
* 不要将单个项目用于大量不同的虚拟形象或世界。这会很快让未来的迁移变成巨大的麻烦！
* 如果你懂得如何使用[Git](https://git-scm.com/)或[Unity Version Control](https://unity.com/solutions/version-control)之类的版本控制软件，就用它！它能让你非常轻松地回滚破坏项目的更改。

### 理解“Player”与“User”这两个术语 {#understanding-the-terms-player-vs-user}

在VRChat中，“player”（玩家）和“user”（用户）这两个术语的含义会因上下文而不同：

- User（用户）：这是对任何使用VRChat的人的通用称呼，无论他们是否与你处在同一个世界。它是平台上所有参与者的通用术语。
- Player（玩家）：从技术角度讲，“player”特指用户在世界实例中的单个实例化。这一区分对底层系统和某些技术功能（如多人交互）更为相关。例如，在本地测试世界时，一个世界实例中可能存在同一用户的多个玩家。

### 接下来做什么？ {#whats-next}
你的项目已准备就绪！你可以继续[世界创建](/worlds)或[虚拟形象创建](/avatars)。

如果出现任何错误，即使是全新的空项目，也请[联系我们的支持团队](https://vrch.at/support)。
