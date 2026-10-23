---
sidebar_position: 0
---

import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';

# 为 iOS 构建与测试 {#build-and-test-for-ios}

本指南向你展示如何通过将 iOS 设备连接到 Unity，在 iOS 上测试你的 VRChat 内容。构建与测试允许你在不发布的情况下，在 VRChat 中快速测试你的世界和虚拟形象（Avatar）。

## 为构建与测试做准备 {#set-up-for-build-and-test}

要使用 iOS 的构建与测试，你必须设置好 Unity 项目，并将你的 iOS 设备连接到 SDK。

### 安装 iOS Build Support Unity 模块 {#install-ios-build-support-unity-module}

你必须安装 Unity 的 iOS Build Support 模块，才能在 iOS 上构建或发布 VRChat 内容。请按照以下步骤安装：

1. 打开 Unity Hub，并导航到左侧的"Installs"。
2. 找到你的项目所使用的 Unity 版本的安装项（当前推荐版本为 [<CurrentUnityVersion/>](/sdk/upgrade/current-unity-version/)）。
  - 如果你的安装项在 Editor 路径下方列出了"iOS"，则说明该模块已经安装，你可以直接[设置你的项目](#set-up-your-project-to-target-ios)。

![带有 iOS 模块的 Unity 安装项](/img/platforms/unity-hub-modules.png)

3. 点击该安装项旁边的齿轮图标，然后点击"Add modules"。

	- 如果你没有看到"Add modules"按钮，说明 Unity Hub 无法自动安装该模块。此时你必须从 [Unity 下载存档](https://unity.com/releases/editor/archive)下载并运行该模块的安装程序。
4. 找到"iOS Build Support"并勾选它旁边的复选框。
5. 点击继续以安装 iOS 构建支持模块。

现在你可以为 iOS 构建世界（以及虚拟形象）了。

### 将你的项目设置为面向 iOS {#set-up-your-project-to-target-ios}

1. 通过选择"VRChat SDK"->"Show Control Panel"打开 SDK 面板，然后选择 Builder 选项卡。

2. 找到"Select Platform"区域，并将其更改为"iOS"。

3. 将平台切换为 iOS 后，你应该会在控制台中看到 `[VTP] Listening on port 9002...`。
如果你没有看到，请参阅[调试步骤](#debugging-connection-issues)。

### VRChat 测试协议 {#vrchat-test-protocol}

iOS 的构建与测试利用 VRChat 测试协议（VTP）来促进 SDK 与 iOS 设备之间的通信。

SDK 使用 VTP 通过本地网络将世界和虚拟形象文件发送到你的 iOS 设备，因此你可以立即在 iOS 客户端中看到构建结果。

### 将 SDK 连接到你的 iOS 设备 {#connecting-the-sdk-to-your-ios-device}

你可以通过在 iOS 应用设置中输入本地 IP 地址，将 SDK 连接到你的 iOS 设备。

1. 找到运行 SDK 的机器的本地 IP 地址，你可以在 SDK 设置选项卡中按下"Show Local IP Address"按钮来查看。
2. 将 SDK 设置面板中找到的本地 IP 地址，输入到 iOS 应用设置中的"Settings"->"Apps"->"VRChat"->"SDK IP Address"。
3. 启动 VRChat 并按下"Play"按钮进入世界。
4. 加载进入世界后，应用可能会请求通过本地网络进行通信的权限。你必须允许该权限，VRChat 测试协议才能与你的设备通信。
5. 接受本地网络权限后，检查 SDK 控制台以确认连接是否成功。你应该会看到 `[VTP] Client connected.`，以及有关连接了哪个设备的详细信息。如果你没有看到，请参阅[调试步骤](#debugging-connection-issues)。
6. 现在你可以点击 Build and Test，直接在你的 iOS 设备上测试内容。

测试虚拟形象时，你可以在主菜单的 Avatars 区域中的"SDK Test Avatars"选项卡下找到它们。

选择测试虚拟形象后，当你再次构建该虚拟形象时，会自动切换到最新的构建。

## 调试连接问题 {#debugging-connection-issues}

如果你发现自己无法在 iOS 设备与 SDK 之间建立连接，请按照以下步骤调试该问题。

- 如果你在 SDK 中切换到 iOS 平台后没有看到 `[VTP] Listening on port 9002...`，请确保没有其他选择了 iOS 的编辑器处于打开状态。此外，请确保没有其他正在运行的应用程序占用 9002 端口，因为同一时间只能有一个应用程序打开该端口。

- 如果你确实在控制台中看到了 `[VTP] Listening on port 9002...`，但无法建立连接：

- 请确保 SDK 设置选项卡中显示的 IP 地址与 VRChat iOS 应用设置页面中"Settings"->"Apps"->"VRChat"->"SDK IP Address"下的地址一致。

- 请确保 SDK 所在机器和 iOS 设备连接到同一个 Wi-fi 网络。

- 请确保你已在 iOS 设备上允许本地网络访问。你可以在"Settings"->"Privacy & Security"->"Local Network"中找到该设置。找到 VRChat 应用并启用该权限。

- 请确保你已在 SDK 所在机器上允许本地网络访问。在 Windows 上，本地网络访问请求会以标题为"Windows Security"的提示框出现，你必须在勾选 Public networks 复选框的情况下点击"Allow access"。

![Windows 本地网络访问权限提示](/img/platforms/windows-local-network.png)

- 有可能你之前拒绝了访问，而提示框不再出现。在这种情况下，你必须在 Windows Defender 防火墙中找到该规则并允许它。
    - 要快速测试这是否是问题所在，你可以临时禁用防火墙，不过按照以下步骤允许 Unity 访问你的本地网络要安全得多。

- 要在 Windows 上为 Unity 编辑器启用本地访问：
    1. 搜索"Firewall"，找到"Windows Defender firewall"，然后查找"Inbound Rules"。
    2. 在入站规则列表中，查找任何标题为"Unity Editor"的规则
    3. 删除任何带有红色圆圈加斜杠标记、标题为"Unity Editor"的规则
    
![Unity Editor 被禁用的 Windows 防火墙规则](/img/platforms/windows-firewall-rule.png)

    4. 重新启动 Unity 编辑器。启动后（并且已选择 iOS 作为平台），你应该会看到"Windows Security"请求本地网络权限。

# VPN 使用 {#vpn-usage}
- 由于 VTP 通过本地网络通信，使用 VPN 可能会根据 VPN 配置阻止 SDK 与 iOS 设备建立连接。建议在使用 VTP 时禁用 VPN。
