---
title: 将项目升级到2022
sidebar_position: 2
---
import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';

本页说明如何将你的VRChat项目从2019.4.31f1版本升级到Unity <CurrentUnityVersion/>。
使用最新版本的VRChat SDK需要Unity <CurrentUnityVersion versionKey="major"/>。你可以查看[升级的好处](/sdk/upgrade/current-unity-version)。

如果你使用Creator Companion，升级项目很简单！但首先，请确保为项目创建备份。

## 备份Unity项目 {#backing-up-your-unity-project}

如果你使用[VRChat Creator Companion](https://creators.vrchat.com/)，它会在迁移前自动建议备份项目。

1. 要备份项目，请点击“Manage Project”按钮旁边的三点菜单，然后选择“Create Backup”选项。这是推荐的备份方法，尤其适合新创作者！ 
	- 请注意，“Create Backup”不会备份`Udon`、`UdonSharp`或`VRChat Examples`文件夹。如果你对这些文件夹做了更改，请选择其他备份选项。
	- 你也可以通过复制整个项目文件夹并重命名的方式备份项目，例如`MyProject-Backup`。  
	- 你*可以*将整个项目导出为Unity Package，但这需要很长时间，并且可能会导致错误。我们不推荐这样做。

![创建备份。](/img/sdk/migrate-2019-2022/creating_backup.png)

:::danger 不要跳过此步骤！
对珍贵的项目进行重大更改时，保留备份始终是个好主意。

升级可能会失败。如果失败，你的备份可以作为检查点。如果你妥善保管原始项目文件，就可以恢复它们、重试并找出问题所在。

**没有备份，你就没有第二次机会。** 如果你犯了错误或升级失败，修复起来可能很困难，甚至**不可能。**
:::

1. 在Unity 2019中打开项目，查看[Unity控制台](https://docs.unity3d.com/Manual/Console.html)或[VRChat SDK Build面板](https://creators.vrchat.com/worlds/creating-your-first-world#step-4---configure-your-world-in-the-sdk-build-panel)中是否有任何错误或警告。
	- 如果你不修复Unity 2019项目中的问题，它们可能会在Unity 2022中引发问题。
	- *部分*警告可以安全地忽略，但你应该尝试理解它们为何出现。

现在你可以开始升级了！

:::danger 上传前测试你的内容

使用Unity 2022成功上传世界或虚拟形象（Avatar）后，你将无法再使用Unity 2019上传它。

:::

## 使用Creator Companion {#using-the-creator-companion}

你可以通过两种方式从VCC升级项目：直接从Projects页面升级，或从每个Manage Project页面升级。**在继续之前，请确保要升级的项目已关闭。**

1. 前往Settings，然后点击Updates，查看Creator Companion是否需要更新。如果不更新，将不会显示升级到Unity 2022的提示。

![检查VCC更新。](/img/sdk/migrate-2019-2022/updating_vcc.png)

2. 在Projects页面上，你会看到一个新的**Unity**列，其中包含每个项目的版本切换器。点击它，然后点击Migrate to Unity 2022。

![点击正确的项目。](/img/sdk/migrate-2019-2022/updating_vcc_via_projects.png)

否则，点击任意项目上的**Manage Project**，你会看到“Upgrade to 2022”横幅。

![通过Manage Project升级。](/img/sdk/migrate-2019-2022/manage_project_upgrade.png)

## 使用Unity Hub {#using-the-unity-hub}

Unity Hub是一个独立的应用程序，可让你同时无缝安装和使用多个Unity版本。如果你不想使用Creator Companion，也可以用它来安装Unity 2022。

1. 安装[Unity Hub](https://unity.com/download)。
	- 你可以按照Unity官方的[安装指南](https://learn.unity.com/tutorial/install-the-unity-hub-and-editor)。
	- 安装Unity Hub后，你需要创建一个[Unity账户](https://id.unity.com/account/new)。
2. 访问[Unity的下载存档](https://unity.com/releases/editor/archive)。
3. 点击**Unity 2022.x**。
4. 向下滚动，直到看到Unity <CurrentUnityVersion versionKey="patch"/>，然后点击蓝色的**Unity Hub**按钮。
	- 不要选择列表中的第一个Unity版本！
	- 你也可以前往[当前Unity版本页面](/sdk/upgrade/current-unity-version)查找下载正确Unity版本的链接。

![在Unity存档中选择要安装的正确版本。](/img/sdk/migrate-2019-2022/unity_webpage_search.png)

![接受浏览器提示以打开Unity Hub。](/img/sdk/migrate-2019-2022/browser-prompt-unity-hub.png)

5. 在网页浏览器中点击**Open Unity Hub**。

![如果你希望能够为Android设备开发内容，请启用Android Build Support。](/img/sdk/migrate-2019-2022/unity_version_hub_upgrade_android.png)

6. 在Unity安装界面中启用**Android Build Support**。
	- 如果你还不打算将内容上传到Android或Quest，可以跳过此步骤。
	- 你可以稍后在Unity Hub中选择[Add modules](https://docs.unity3d.com/hub/manual/AddModules.html)来完成此步骤。
7. 点击**Continue**安装Unity <CurrentUnityVersion versionKey="patch"/>。

## 管理Unity版本 {#managing-unity-versions}

查看电脑上有哪些Unity版本可供Creator Companion使用很简单。你还可以更改用于打开所有*新*项目的Unity版本。

1. 在CC中，前往**Settings**。
2. 在**Unity Editors**下，使用下拉菜单更改默认的Unity编辑器。这**不会**追溯应用于已经创建的任何项目。
3. 如果你尚未安装Unity <CurrentUnityVersion versionKey="patch"/>，请[按照上述说明操作](#using-the-creator-companion)。
4. 如果你在此处看不到已安装的Unity版本，请尝试使用刷新按钮，或使用文件按钮直接查找路径。

## 包 {#packages}

如果你尝试向2022项目添加包，请注意：

- 每个精选包（Curated Package）都有一个可在2022中使用的版本。
- 其他包*可能*可用，但有些可能需要包作者提供新版本！
- 使用过时的包会导致许多错误，因此请确保导入的任何内容都与Unity 2022兼容。

# 故障排除 {#troubleshooting}

- 在上传世界之前先测试它。检查Unity控制台是否有错误，并在VRChat中测试世界，看看它是否能正常工作。
	- 使用Unity 2022成功上传世界后，你将无法再使用Unity 2019上传同一个世界。
- [确保激活你的Unity Personal许可证](https://support.unity.com/hc/en-us/articles/211438683-How-do-I-activate-my-license-)后再使用VRChat的SDK。Unity个人使用是免费的。
- 要了解有关Unity Hub的更多信息，请访问[Unity的文档](https://docs.unity3d.com/hub/manual/index.html)。
- 如果你遇到与SDK本身相关的问题，请阅读我们的[SDK故障排除](/sdk/sdk-troubleshooting)页面。
