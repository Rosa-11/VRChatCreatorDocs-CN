---
title: "为创建 Android 内容设置 Unity"
slug: "setting-up-unity-for-creating-quest-content"
hidden: false
createdAt: "2019-04-10T00:53:35.417Z"
updatedAt: "2019-10-28T19:23:09.636Z"
sidebar_position: -1
---

如果你要开始一个全新的项目，这根本不会花多少时间。但是，如果你要把 Windows 平台项目转换为 Android 平台项目，你就需要相应地转换你的资源。对于较大的项目，这可能要花上相当长的时间。

有关处理双平台项目时最佳实践的更多细节，请阅读我们关于[跨平台设置](/platforms/android/cross-platform-setup)的文档。

## 让你的内容上架 VRChat for Android 的 3 个步骤 {#3-steps-to-get-your-content-on-vrchat-for-android}

### 1. 打开 VRChat SDK 面板 {#1-open-the-vrchat-sdk-panel}

1. 点击 Unity 顶部栏中的 VRChat SDK 菜单并选择"Show Control Panel"，打开 VRChat SDK 面板。
2. 切换到"Builder"选项卡

### 2. 将平台切换为 Android {#2-switch-platform-to-android}

1. 在 Build 区域中，点击"Platform"下拉菜单
2. 取消勾选"Windows"并勾选"Android"。点击下拉菜单外的任意位置将其关闭。

![选择 Android](/img/platforms/android-switch-platform.png)

3. 在出现的窗口中点击"Confirm"以开始切换过程。

![选择 Confirm](/img/platforms/android-switch-platform-confirm.png)

:::caution 需要额外设置

如果你是通过 Unity Hub 而不是 Creator Companion 安装 Unity 的，并且下拉菜单中的"Android"选项无法选择——你可能需要安装 Android Build Support 模块。你可以按照[设置 Unity Android 工具](/platforms/android/build-test-mobile#set-up-unity-android-tools)指南进行安装。

:::

### 3. 发布新构建 {#3-publish-a-new-build}

就是这样！现在你可以使用"Build and Publish"按钮将你的内容发布到 VRChat for Android。请务必阅读[Android 内容限制](/platforms//android//quest-content-limitations.md)和[Android 内容优化](/platforms/android/quest-content-optimization.md)页面，以确保你的内容针对 Android 设备进行了优化。

要了解更多关于为 VRChat 支持的所有平台发布内容的信息，请查看我们的[跨平台设置](/platforms/android/cross-platform-setup.md)文档。
