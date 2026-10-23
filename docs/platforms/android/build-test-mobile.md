---
sidebar_position: 0
---

import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';

# 为 Android 移动端构建与测试 {#build-and-test-for-android-mobile}

你可以使用构建与测试功能，在不发布的情况下在 Android 设备上测试 VRChat 世界和虚拟形象（Avatar）。本文档介绍如何设置并使用该功能，以便更快速地构建世界和 Avatar！

## 为构建与测试做准备 {#set-up-for-build-and-test}

要使用 Android 移动端的构建与测试功能，你需要设置好 Unity Android 工具、项目以及设备。

### 设置 Unity Android 工具 {#set-up-unity-android-tools}

首先，你需要为兼容 VRChat 的 Unity Editor 安装 Android Build Support 模块，才能处理 Android 内容。你可能已经安装了它，因为 VRChat Creator Companion 默认会安装该模块。请按照以下步骤进行检查。

1. 打开 Unity Hub，然后点击左侧的 "Installs"。
2. 找到你的项目所用 Unity 版本的安装项（当前推荐版本为 [<CurrentUnityVersion/>](/sdk/upgrade/current-unity-version/)）。如果该安装项在 Editor 路径下方列出了 "Android"，说明你已安装该模块，可以直接前往设置项目。否则，请继续执行第 3 步。

![带有 Android 模块的 Unity 安装项](/img/platforms/unity-hub-modules.png)

3. 点击该安装项旁边的齿轮图标，然后点击 "Add modules"。
4. 找到 "Android Build Support"，勾选其旁边的复选框。
5. 点击继续以安装 Android 构建支持模块。

现在你应该能够为 Android 构建内容了。

### 将项目设置为面向 Android {#set-up-your-project-to-target-android}

选择 "VRChat SDK"->"Show Control Panel" 打开 SDK 面板，然后选择 Builder 选项卡。

找到 "Select Platform" 部分，并将其更改为 "Android"。

### 设置 Android 设备以测试世界 {#set-up-your-android-device-to-test-worlds}

移动端的构建与测试功能使用 [Android Debug Bridge](https://developer.android.com/tools/adb)（ADB）将构建好的资源包文件传输到你的 Android 设备。

ADB 使用 Android 设备上的 USB 调试与设备通信。这使得 ADB 可以发送文件、启动应用，以及执行许多其他与调试相关的功能。

启用 USB 调试还需要你在设备上进入开发者模式。

:::caution 警告

USB 调试允许你的计算机在没有任何通知的情况下执行许多可能具有危险性的操作。你只应在信任的应用上使用它。

VRChat SDK 使用 USB 调试向你的设备发送文件、打开 VRChat 应用，并启动你的测试世界或加载你的测试 Avatar。

:::

#### 📱 在 Android 手机和平板上启用开发者模式 {#-enabling-developer-mode-on-android-phones-and-tablets}

要在 Android 手机或平板上启用开发者模式，你必须执行以下操作：

1. 确保使用能够传输数据的 USB 线缆将手机连接到计算机。
2. 通过进入 "Settings"->"About Phone" 并向下滚动到底部的 "Build number" 来启用开发者模式。连续点击 build number 7 次以启用开发者模式。
3. 现在开发者模式已启用，你可以看到更多开发者选项。进入 "Settings"->"System"->"Developer Options"，找到 "USB Debugging" 复选框，勾选 "USB Debugging"。

#### 🥽 在 Meta Quest 头显上启用开发者模式 {#-enabling-developer-mode-on-a-meta-quest-headset}

要在 Meta Quest 设备上构建与测试，你还需要启用开发者模式并允许 USB 调试。

你必须使用 [Meta Quest Developer Hub](https://developers.meta.com/horizon/documentation/unity/ts-odh/) 将 Meta Quest 头显切换到开发者模式。

要了解如何在头显上设置开发者模式，请阅读 [Meta 的说明](https://developers.meta.com/horizon/documentation/unity/unity-quickstart-mqdh/#connect-headset-to-meta-quest-developer-hub)。

## 使用构建与测试 {#use-build-and-test}

在启用开发者模式、启用 USB 调试并连接好 Android 设备之后，你现在应该能够进行构建与测试了。

### 首次启动 {#first-launch}
Avatar 和世界都可以在 Android 设备上测试。流程基本相同。
#### Avatar
要在 Android 上测试新的 Avatar，你必须先[按照上述步骤启用 USB 调试](#set-up-your-android-device-to-test-worlds)。

成功设置 USB 调试后，打开 VRChat 应用并加载进入一个实例。然后，点击 SDK 中的 "Build and Test New Build" 按钮。

你的 Avatar 会出现在主菜单的 Avatar 区域中，位于 "SDK Test Avatars" 选项卡下。

当你使用测试 Avatar 时，每次构建与测试都会自动切换到其最新版本。

#### 世界 {#worlds}
测试世界有一些额外要求
* 确保在尝试测试世界之前至少启动过一次应用，以便生成应用目录，然后关闭 VRChat。
* 首次启动进入测试世界之前，必须关闭 VRChat 应用。
* 你的 Android 设备必须保持解锁状态，ADB 才能将 VRChat 应用启动到测试世界。

在完成上述所有设置且项目处于 Android 模式后，按下 "Build and Test New Build" 按钮即可在设备上测试世界。

世界构建完成后，你应该会看到 VRChat 应用自动打开。如果你尚未登录该应用，将会被直接带到登录界面。登录后你将被直接带到测试世界。

如果你已经登录，客户端加载完成后你应该会被直接带到测试世界。底部的播放按钮指示客户端的加载状态，加载完成后稍等片刻你就会被带到该世界。

之后当你要对世界进行修改时，再次按下 "Build and Test New Build"。你的世界将重新构建、发送到设备并重新加载，无需任何进一步操作。

## 工具与疑难解答 {#tools--troubleshooting}

本节介绍如何修复一些常见问题，以及一些能在移动端开发过程中提供帮助的工具。

### 疑难解答 {#troubleshooting}

如果你是出于其他原因使用调试模式的开发者，请确保拔下或禁用除你要用于构建与测试的 Android 设备之外的所有其他设备上的 USB 调试。

对于 Android 手机和平板，如果已启用 USB 调试但计算机无法识别你的手机/平板，最好的排查方法是完全重新执行 USB 调试流程。
   1. 拔下 Android 设备。
   2. 禁用开发者模式和 USB 调试。
   3. 插入 Android 设备。
   4. 通过连续点击 7 次 "About Phone"->"Build Number" 来启用开发者模式。
   5. 在 "System"->"Developer Options" 部分启用 USB 调试。
   6. 再次尝试构建与测试。

如果由于某种原因你的 VRChat 应用没有 `com.vrchat.mobile.playstore` 这个包名，你可以在项目设置中修改 SDK 查找的包名。该设置位于 "VRChat"->"SDK"->"Android App Package Name"

如果你正在 VRChat 应用的测试版上进行构建与测试，或者由于某种原因你使用的不是来自 Google Play 商店的正式版本，这可能会很有用。除非你有充分的理由更改，否则请保持其为 `com.vrchat.mobile.playstore`。

### 实用的设备投屏工具 {#useful-device-mirroring-tool}

你可能希望能在桌面窗口中查看手机画面，而不必每次都低头看手机。有一个名为 [scrcpy](https://github.com/Genymobile/scrcpy) 的实用开源工具可以实现这一点。

[scrcpy](https://github.com/Genymobile/scrcpy) 利用 ADB 在桌面上的小窗口中显示设备的屏幕截图。你可以用它通过鼠标与手机交互，而无需直接操作手机。

要使用该工具，请下载适用于你的平台的[最新版本](https://github.com/Genymobile/scrcpy/releases)（例如，在 Windows 上应下载 `scrcpy-win64` zip 文件）。你会得到一个压缩文件夹，其中包含运行 `scrcpy.exe` 所需的全部文件。将其解压到方便的位置。

你可以双击 `scrcpy.exe` 运行它，或在该文件夹中的命令提示符里运行 `scrcpy.exe`。如果你已成功设置 USB 调试，将会出现一个窗口，镜像显示你设备上的内容。

请注意，ADB 无法录制锁屏界面，因此在尝试解锁手机时预览窗口会全黑。你可以手动解锁手机，然后继续通过镜像窗口进行交互。

此外，建议在启动 Unity *之后*再启动 scrcpy。这是因为如果尚无正在运行的 ADB 服务器，scrcpy 会启动自己的 ADB 服务器，而 Unity 在启动时会终止所有现有的 ADB 服务器，从而关闭你的设备镜像窗口。

你可能会发现启用 "System"->"Developer Options" 中的 "Stay Awake" 也很有用，这样可以避免需要不断点击设备以保持其唤醒并防止锁定。只要设备插电充电中，它就会一直保持唤醒状态。

### 通过 Wi-Fi 构建与测试 {#build-and-test-over-wi-fi}

你也可以进行无线构建与测试。这对某些配置可能更方便，但它也需要一些命令行交互才能连接，因此通常不推荐替代 USB 调试。

要启用无线调试，你需要直接在命令行中与 ADB 交互。

1. 首先确保 Unity 已打开，这样 ADB 会使用 Unity 的 ADB 服务器进程
2. 导航到你的项目所用 Unity 版本的 Unity 安装文件夹。
    * 你可以通过打开 Unity Hub、点击左侧的 "Installs"、点击你的安装项旁边的齿轮、点击 "Show in Explorer" 找到该文件夹。
    * `adb.exe` 位于 Data/PlaybackEngines/AndroidPlayer/SDK/platform-tools
    * 在该文件夹中打开命令提示符：启动命令提示符，并使用 `cd [your unity install path]/Data/PlaybackEngines/AndroidPlayer/SDK/platform-tools` 导航到该文件夹。

现在你可以使用 ADB 命令了。如果你仍启用了 USB 调试，测试是否正常的一个好命令是 `adb devices -l`，它应列出所有已启用调试的设备。你也可以尝试 `adb shell ls` 来打印设备上的部分顶层文件夹，这同样需要启用调试。

现在我们已经找到 ADB，那么那个花哨的 Wi-Fi 调试呢？
1. 禁用 USB 调试，并且为确保无误拔下设备
2. 启用 System->Developer Options->Wireless Debugging。
3. 点击 Wireless Debugging 以查看更多选项。
4. 点击 "Pair device with pairing code"，你应该会得到一个用于配对的 6 位验证码，以及要使用的 IP 地址和端口。
5. 运行 `adb pair [ip]:[port]`
    * 例如，如果配对界面显示的 IP 地址为 `127.0.0.1`、端口为 `1234`，则运行 `adb pair 127.0.0.1:1234`
    * 请注意，端口每次都会随机变化，因此每次想要通过 Wi-Fi 调试时都必须回到此步骤。
6. 在提示时输入配对验证码。
7. 现在输入 `adb connect [ip]:[port]` 以连接到设备

现在你应该可以通过 Wi-Fi 使用 ADB 了。

尝试运行 `adb devices -l` 看看是否有效。你现在应该能在设备列表中看到你的设备。

现在你可以回到 SDK，点击 "Build & Test New Build" 通过 Wi-Fi 测试内容。
