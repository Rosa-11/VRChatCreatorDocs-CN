---
title: "SDK疑难解答"
slug: "sdk-troubleshooting"
excerpt: "常见SDK问题及其解决方法"
hidden: false
createdAt: "2017-09-29T02:44:14.279Z"
updatedAt: "2020-04-23T03:39:19.161Z"
---
以下是你在使用SDK时可能遇到的常见问题及其解决方法。你还可以在我们的[帮助知识库](http://help.vrchat.com)中找到一些额外帮助。

## VRChat SDK菜单下拉框中没有出现构建控制面板！ {#the-build-control-panel-isnt-appearing-in-the-vrchat-sdk-menu-dropdown}
这可能是由两个主要原因造成的：

请确保你使用的是VRChat推荐的版本。（参见[设置SDK](/sdk)）

检查你的控制台标签页，确保没有来自第三方脚本或组件的编译错误。如果有，你可能需要移除这些组件/脚本。

## 我上传了内容，但在游戏中看不到它！ {#i-uploaded-my-content-but-i-cant-see-it-in-game}
这可能由几个原因造成。以下是一些需要检查的事项：
- 请确保你使用的是[正确的Unity版本](/sdk/upgrade/current-unity-version)。
- 请确保你在游戏中使用的是正确的账户，且未登录平台账户。
- 检查控制面板窗口中的`Content Manger`标签页，看看你的内容是否在其中。
- 检查编辑器控制台，看看上传时是否有任何错误。

## 我看不到某个窗口，但没有任何错误！ {#i-cant-see-one-of-the-windows-but-there-arent-any-errors}
在少数情况下，Unity标签页可能会跑到屏幕外而变得无法访问。你需要删除一些注册表项才能将这些窗口恢复到屏幕上。

1. 关闭Unity。
2. 按下Windows键并输入`regedit`。按回车。系统会通过UAC提示你授予管理员访问权限。
3. 在`regedit`中要非常小心！此应用程序包含你PC的所有设置。
4. 找到以下项：`Computer\HKEY_CURRENT_USER\Software\Unity Technologies\Unity Editor 5.x`。你可以将其粘贴到`regedit`顶部的地址栏中，如果你的窗口顶部没有地址栏，也可以在左侧的目录列表中逐级导航。
5. 删除该目录中所有以`VRC`开头的项，包括`VRCSDK2`或任何其他相关项。
6. 关闭`regedit`。
7. 重新打开Unity。应该就没问题了！

## 在使用SDK2的项目中我遇到与SDK3或Udon相关的错误，或在使用SDK3的项目中遇到与VRC_SpatialAudioSource相关的错误！ {#im-getting-errors-related-to-sdk3-or-udon-in-a-project-using-sdk2-or-vrc_spatialaudiosource-in-a-project-using-sdk3}

1. 按照[正确步骤](/sdk/updating-the-sdk)移除你的SDK：关闭Unity，并删除所有SDK相关文件夹及其相关的`.meta`文件。
2. 转到`Project Settings`，在`Player > Other Settings`下找到`Scripting Define Symbols`。
3. 移除与你的项目所用SDK不相关的符号。对于使用SDK2创建的项目，移除`UDON`和`VRC_SDK_VRCSDK3`。对于使用SDK3创建的项目，移除`VRC_SDK_VRCSDK2`。符号之间用`;`分隔。之后按`Enter`保存更改。
4. 将正确的SDK导入项目。

## 我遇到的问题知识库没有解决，也没有列在这里！ {#i-have-a-problem-that-the-knowledgebase-doesnt-solve-and-isnt-listed-here}

很抱歉！请浏览我们的[官方知识库](http://help.vrchat.com/)，或[提交支持请求](https://help.vrchat.com/hc/en-us/requests/new)。我们很乐意帮助你。
