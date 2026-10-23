---
title: "Unity次要版本升级"
---
有时，VRChat会在Unity次要版本内更新。例如，VRChat可能会从Unity 2022.1.**1**更新到Unity 2022.1.**2**。

## 安装新的Unity版本 {#install-the-new-unity-version}

1. 关闭所有已打开的Unity项目。

2. 查看[当前支持的Unity版本](/sdk/upgrade/current-unity-version)，并通过Unity Hub安装新版本的Unity。 
    - 尽管我们在该页面上列出了独立安装程序，但我们强烈建议使用Hub。本文档假设你正在使用它。

## 复制项目 {#copy-your-project}

1. 复制或备份你的项目。
	- 如果你使用[VRChat Creator Companion](https://creators.vrchat.com/)，它会在迁移前自动建议复制项目。你可以使用“Make Backup”按钮创建项目备份。
	- 否则，复制整个项目文件夹并为其指定新名称。
	- 将整个项目导出为Unity Package。这需要很长时间，并且可能会导致错误。

:::danger 不要跳过此步骤！
升级可能会失败。如果你妥善保管原始项目文件，就可以恢复它们、重试并找出问题所在。

如果没有备份，你就没有第二次机会。如果你犯了错误或升级失败，修复起来可能很困难，甚至不可能。
::: 

如果你是高级用户，并且知道如何使用[Git](https://git-scm.com/)之类的版本控制，就应该使用它。

## 打开项目 {#open-your-project}

1. 在新版本中打开项目的副本。 
    - 你会看到一些升级警告。这没关系！点击确认按钮。

2. 一段时间后，迁移将完成。就是这样！

## 可选信息与提示 {#optional-info-and-tips}

次要版本升级并不总是需要更新SDK。如果需要，此时就是进行更新的时机。

1. 升级后关闭项目。
2. 使用[VCC](https://vcc.docs.vrchat.com/)升级你的SDK。

#### Unity警告 {#unity-warnings}

迁移期间可能会弹出一些Unity警告，你可以放心地点击跳过。以下是你可能看到的一些警告：

![migrating-to-a-newer-minor-unity-version-f3995eb-image_10.png](/img/sdk/migrating-to-a-newer-minor-unity-version-f3995eb-image_10.png)

![migrating-to-a-newer-minor-unity-version-b20553b-image_11.png](/img/sdk/migrating-to-a-newer-minor-unity-version-b20553b-image_11.png)

#### 清理副本 {#clean-up-the-copy}

如果你的项目很大，迁移可能需要很长时间。如果项目特别庞大，有一些文件夹不需要迁移。你可以安全地从副本中删除以下任何文件夹。

```text
/Library/
/Temp/
/Obj/
/Build/
/Builds/
/Logs/
/UserSettings/
```
#### 版本警告 {#version-warnings}

即使你_知道_自己使用的是正确版本，SDK也可能警告你版本错误。

![migrating-to-a-newer-minor-unity-version-1b8194d-2022-11-30_10-35-54_chrome.png](/img/sdk/migrating-to-a-newer-minor-unity-version-1b8194d-2022-11-30_10-35-54_chrome.png)

这没关系！如果你确信自己使用的是正确版本，可以忽略此消息。
