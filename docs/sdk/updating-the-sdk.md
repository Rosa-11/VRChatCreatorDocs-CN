---
title: "更新SDK"
slug: "updating-the-sdk"
hidden: false
createdAt: "2019-07-24T03:33:36.520Z"
---
如果你需要更新SDK，务必遵循以下步骤，以确保更新顺利进行，并且不会留下任何旧文件或冲突文件。

## 版本控制 {#version-control}
如果你懂得如何使用版本控制软件，使用像[Git](https://git-scm.com/)这样的工具来管理项目可能会让你受益匪浅。你无需将仓库上传到Github或类似服务，也能享受版本控制带来的好处。在升级SDK之前创建一个提交，以防万一。

## VRChat Creator Companion
使用VCC让SDK保持最新非常简单。请参阅[VRChat Creator Companion文档](https://vcc.docs.vrchat.com/guides/getting-started)了解如何使用它！

## 迁移到VCC {#migrating-to-the-vcc}
如果你想了解如何将项目迁移为使用VCC，请查看[此处](https://vcc.docs.vrchat.com/vpm/migrating)的指南。

## 手动更新 {#manual-updates}
如果你使用VCC，就不必担心手动更新。
不过，如果你愿意，也可以登录VRChat账户后，从[VRChat网站](https://vrchat.com/home/download)下载SDK。

## 旧版SDK3 {#legacy-sdk3}
:::caution 

这些说明仅适用于旧版SDK（`Assets\VRCSDK`）的用户。
如果你的SDK位于`Packages`文件夹（`Packages\com.vrchat.base`）中，请不要按照以下说明操作。
:::

**对于SDK3，你应该只需将新SDK覆盖导入旧SDK即可完成更新，这也称为原地升级。** 这对于SDK3-Avatars尤为重要，因为如果更新方式不正确，你可能会丢失动画器上的State Behaviors！

如果你想格外谨慎，在更新SDK之前请务必备份项目。

### SDK3 - World
1. 关闭Unity。
2. 备份你的Unity项目！你不必备份Library文件夹，这些文件由Unity自动生成。

:::caution 2020.3.2之前的SDK3升级

**这是一个不常见的步骤，你很可能不需要执行它。** 

如果你要从早于2020.3.2的SDK升级，请进入项目的`Assets`文件夹，删除`VRCSDK`和`Udon`文件夹，以及`VRCSDK.meta`和`Udon.meta`文件。
:::
3. 打开你的Unity项目。
4. 将新的SDK3 - World覆盖导入旧版本。

### SDK3 - Avatars
:::danger 不要对SDK3 - Avatars执行“删除重装”！

***如果你在Unity关闭时删除SDK文件夹，然后在未安装SDK的情况下打开Unity，你将丢失State Behaviors。*** 它们很脆弱，无法在完全删除后重装的升级过程中保留下来。请务必经常备份项目，并保存/记录你的状态行为设置。

如果你**必须**对SDK3 - Avatars包执行完全删除后重装，请先备份项目。你将需要重新设置State Behaviors，因此请确保已详细记录它们。
:::
1. 关闭Unity。
2. 备份你的Unity项目！你不必备份Library文件夹，这些文件由Unity自动生成。
3. 打开你的Unity项目。
4. 将新的SDK3 - Avatars覆盖导入旧版本。如果导入完成后出现错误，请尝试随后重启Unity。 

:::note Avatar Dynamics升级时SDK3的预期错误

首次将适用于Avatars的SDK3升级到Avatar Dynamics SDK时，出现少量错误是正常的。这是因为SDK在安装过程中安装了Burst和Mathematics包，而Unity在早期导入它们时有点操之过急。

如果你清除错误或重启Unity，它们应该会消失。
:::

### SDK3 - Avatars - 独立项目流程 {#sdk3---avatars---separate-project-process}
如果你在上述升级过程中遇到问题，可以改用以下方法：
1. 关闭Unity。
2. 创建一个新的空白项目。
3. 将新的SDK3 - Avatars包导入该项目。
4. 关闭该Unity项目。
5. 使用资源管理器（此时不要打开Unity！），从你要升级的项目中删除VRCSDK3文件夹。在本指南另行说明之前，***不要打开Unity。***
6. 在你要升级的项目中，将`Packages/vpm-manifest.json`里VRChat SDK3的引用编辑为新SDK版本。
7. 在你导入SDK的新空白项目中，将VRCSDK3文件夹复制到你要升级的项目中。
8. 复制文件后，打开Unity并打开升级后的项目。你可以删除那个空白项目。

### 高级更新流程 {#advanced-update-process}

如果你要在包含使用复杂触发器设置的世界中重新安装SDK，这里有一种更安全的SDK更新方法。

1. 关闭Unity
2. 将项目备份到另一个文件夹（不要备份Library文件夹，这些文件由Unity自动生成）
3. 删除SDK和Plugins文件夹，以及相关的.META文件
4. 在你要升级的项目中，将`Packages/vpm-manifest.json`里VRChat SDK3的引用编辑为新SDK版本。
5. 使用Unity Hub创建一个空白Unity项目，以此创建一个新的“虚拟”Unity项目。
6. 在该虚拟项目上安装最新的VRChat SDK。
7. 将虚拟项目中新添加的`SDK/Plugin`文件夹及相关`.meta`文件复制到你的原项目中。
8. 完成。现在你可以打开升级后的项目了。

## 更新Unity {#updating-unity}

如果你要从之前的Unity版本更新，我们[有一份指南](/sdk/upgrade/index.md)，介绍如何更新到我们支持的最新版本！
