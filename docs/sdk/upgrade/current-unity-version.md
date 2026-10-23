---
sidebar_position: 1
---
import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';
import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 当前Unity版本 {#current-unity-version}

VRChat当前使用的Unity版本是<UnityVersionedLink versionKey="patch" url="https://unity.com/releases/editor/whats-new/<VERSION>"><CurrentUnityVersion/></UnityVersionedLink>

安装最新Unity版本最简单的方法是使用[Creator Companion](https://vcc.docs.vrchat.com/#download-it)。安装Creator Companion后，只需按照说明操作。 

或者，如果你已安装Unity Hub，可以<UnityVersionedLink url="unityhub://<VERSION>">点击此链接</UnityVersionedLink>来安装正确版本的Unity。<CurrentUnityVersion/>也可在[Unity编辑器发布存档](https://unity.com/releases/editor/archive)中获取。

在安装界面中，如果你希望能够为iOS、Android和Quest创建世界或虚拟形象（Avatar），请选择“iOS Build Support”和“Android Build Support”。

有关如何从Unity 2019升级的说明，请[访问我们的Unity 2019到2022文档](/sdk/upgrade/unity-2022)。

## 2025年10月Unity安全漏洞警告 {#october-2025-unity-security-vulnerability-warning}

2025年10月，Unity[披露了一个漏洞](https://unity.com/security/sept-2025-01)，该漏洞影响使用未修补版本的Unity构建的独立Unity应用程序。该漏洞针对的是发布独立Unity游戏或应用程序的开发者。

如果Unity Hub因已知安全问题警告你升级Unity版本，对于VRChat世界或虚拟形象项目，你可以放心忽略该警告。

2025年10月的漏洞不适用于使用Unity编辑器为VRChat创建内容的情况。继续使用VRChat支持的Unity编辑器版本（`2022.3.22f1`）是安全的。升级你的版本将导致内容上传到VRChat后无法加载——请务必继续使用我们推荐的版本。

![Unity Hub的屏幕截图，其中的文字指示用户忽略表示安全问题的红色警告三角，此警告针对VRChat内容。](/img/sdk/unity-sec-issue-warning-banner.png)


## 与之前版本的差异 {#differences-from-previous-versions}

Unity 2022包含许多改进，例如更快的迭代时间、更短的资源导入时间、*快得多*的平台切换时间、更好的编辑器稳定性、完整的C# 8支持、快速搜索功能，[以及更多内容！](https://unity.com/releases/lts)


## 已知问题 {#known-issues}

* 首次打开场景并选中预制件内带有U# Behaviour的GameObject时，该U# Behaviour正下方组件的GUI将不会显示。取消选择并重新选择预制件即可解决此问题。
* 缓冲粒子（Buffer Particles）的工作方式与Unity 2019中不同，[社区成员hfcRed在这里提供了一个修复它们的变通方法](https://x.com/hfcRedddd/status/1696915379090604179)。
* Unity 2022有时会导致Rider的调试器因Unity的IMGUI中未处理的异常而停止。
    * 请参阅[此变通方法](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256)和[Jetbrains的bug跟踪器](https://youtrack.jetbrains.com/issue/RIDER-64944)了解更多信息。
* 空间化音频源（Spatialized Audio Sources）在进入播放模式或调整其设置时可能会产生警告。
