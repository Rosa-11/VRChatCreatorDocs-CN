# 为创建 iOS 内容设置 Unity {#setting-up-unity-for-creating-ios-content}

:::warning
iOS 上的 VRChat 目前处于 Beta 阶段。请在 [Canny](https://feedback.vrchat.com/ios-mobile-beta) 上报告问题。
:::
本页面介绍如何在 iOS 上发布你的世界或虚拟形象（Avatar）。

如果你要开始一个全新的项目，这根本不会花多少时间。但是，如果你要把 Windows 或 Android 平台项目转换为 iOS 平台项目，SDK 必须相应地重新导入你的资源。对于较大的项目，这可能要花上相当长的时间。

有关处理跨平台项目时最佳实践的更多细节，请阅读我们关于[跨平台设置](/platforms/android/cross-platform-setup)的文档。

## 让你的内容上架 VRChat for iOS 的 3 个步骤 {#3-steps-to-get-your-content-on-vrchat-for-ios}

### 1. 打开 VRChat SDK 面板 {#1-open-the-vrchat-sdk-panel}

1. 点击 Unity 顶部栏中的 VRChat SDK 菜单并选择"Show Control Panel"，打开 VRChat SDK 面板。
2. 切换到"Builder"选项卡。

### 2. 将平台切换为 iOS {#2-switch-platform-to-ios}

1. 在 Build 区域中，点击"Platform"下拉菜单。
2. 取消勾选"Windows"并勾选"iOS"。点击下拉菜单外的任意位置将其关闭。

![选择 iOS](/img/platforms/ios-switch-platform.png)

3. 在出现的窗口中点击"Confirm"以开始切换过程。

![选择 Confirm](/img/platforms/ios-switch-platform-confirm.png)

:::caution 需要额外设置

在某些情况下，下拉菜单中的"iOS"选项将无法选择。如果是这样——你可能需要安装 iOS Build Support 模块。你可以按照[设置 iOS Build Support Unity 模块](/platforms/iOS/build-test-mobile#set-up-ios-build-support-unity-module)指南进行安装。

:::

## 3. 发布 -> 新构建 {#3-publish---new-build}

就是这样！现在你可以使用"Build and Publish"按钮将你的内容发布到 VRChat for iOS。请务必阅读[内容限制](/platforms/android/quest-content-limitations.md)和[内容优化](/platforms/android/quest-content-optimization.md)，以确保你的内容针对移动设备进行了优化。由于 iOS 与 Android 共享这些限制，你可以参考两个平台相同的限制。

要了解更多关于为 VRChat 支持的所有平台发布内容的信息，请查看我们的[跨平台设置](/platforms/android/cross-platform-setup.md)文档。
