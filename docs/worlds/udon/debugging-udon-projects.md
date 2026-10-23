import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 调试 Udon 项目 {#debugging-udon-projects}

调试是了解 VRChat、你的世界以及你的 Udon 代码内部运行情况的途径。无论对于一般的编程，还是对于构建你的世界，这都是一项需要培养的关键技能。

在发布你的世界之前，在 VRChat 中测试它们很重要。大多数错误可以在 Unity 编辑器中修复，但有时你会遇到只能在 VRChat 中调试的世界或 Udon 程序。

## VRChat 的调试日志 {#vrchats-debug-log}

为了帮助你找到错误并让它们更易于理解，VRChat 会保存关于你访问过的世界、你遇到的错误以及其他后台信息。这被称为“输出日志”或“调试日志”。

你可以直接在 VRChat 中访问 VRChat 的日志，也可以在电脑上以文本文件的形式访问它。

### 1. 在 VRChat 中查看日志 {#1-view-logs-in-vrchat}

当你启用 Debug GUI 启动 VRChat 时（见下文），你可以在桌面模式和 VR 模式中打开特殊的调试叠加层。要在日志消息产生时查看它们，请按 RShift + Backtick[^1] + 3。你可以在[键盘与鼠标](https://docs.vrchat.com/docs/keyboard-and-mouse)页面找到不同调试叠加层可用的所有快捷键。

[^1]: 在标准的英文 US QWERTY 布局键盘上，"Backtick"是左上角紧邻 `1` 键的那个键。它与波浪号（`~`）字符共用一个键。

### 2. 在文本编辑器中查看日志 {#2-view-logs-in-a-text-editor}
你可以在 VRChat 会话进行期间或结束后，在磁盘上找到并打开这些文件来查看它们。它们通常保存在以下文件夹中，其中'YourName'是你的电脑用户名：

`C:\Users\YourName\AppData\LocalLow\VRChat\VRChat`

在这个文件夹中，你会看到一些文件夹，以及一些文件名如下所示的文件：
` output_log_08-55-48.txt`

这些就是你的日志文件——每次启动 VRChat 时都会新建一个，并带有时间戳以保持文件名唯一。你可以用任何文本浏览器打开它们，以查找会话期间发生的事情的详细信息。

## 如何启用 Udon 调试 {#how-to-enable-udon-debugging}
默认情况下，VRChat 的日志不包含关于 Udon 的详细信息。

当你使用 VRChat 控制面板中的按钮“构建与测试”你的世界时，Unity 会启用额外的调试功能来启动 VRChat。这会为你提供尽可能多的信息。

为了复制*构建与测试*启动 VRChat 的方式，你需要使用额外的启动参数来启动 VRChat。

配置 VRChat 启动参数的方法有三种，如下所述。

### 1. VRC Quick Launcher

[VRC Quick Launcher](https://vcc.docs.vrchat.com/tools/vrc-quick-launcher/)允许你选择要启用哪些调试功能。你可以在 [Creator Companion](https://vcc.docs.vrchat.com/)的"Tools"标签页中找到 VRC Quick Launcher。

### 2. 批处理文件 {#2-batch-files}
你可以使用批处理文件以特殊选项启动 VRChat。批处理文件是一个包含一些特殊命令的纯文本文件。这为你提供了一个便捷的快捷方式，可以立即以启用调试的方式启动 VRChat。
1. 在机器上 VRChat.exe 旁边新建一个名为 `debug.bat` 的文本文件。
2. 向该文件添加这一行：`VRChat.exe --no-vr --enable-debug-gui --enable-sdk-log-levels --enable-udon-debug-logging`
	- 此命令会开启三个用于额外日志记录的标志，同时强制 VRChat 在桌面测试时跳过 VR。
	- 你还可以传入更多选项——你可以使用 [VRChat 启动选项](https://docs.vrchat.com/docs/launch-options)页面以及 [Unity 独立播放器命令行参数](https://docs.unity3d.com/2022.3/Documentation/Manual/CommandLineArguments.html)中的任何标志。
	- 例如，以下命令会在你的第二个 VRChat 配置文件上启动 VRChat，并强制屏幕高度为 720 像素：
`VRChat.exe --profile=1 --no-vr --enable-debug-gui --enable-sdk-log-levels --enable-udon-debug-logging -screen-width 1280 -screen-height 720`
3. 保存批处理文件并运行它。
4. （可选）右键单击该批处理文件，创建快捷方式，然后将快捷方式移到桌面。
5. 双击批处理文件来运行它。

### 3. Steam 启动选项 {#3-steam-launch-options}
如果你使用 Steam 版的 VRChat，可以通过更改 VRChat 的启动选项来启用调试。

1. 在 Steam 库中，右键单击 VRChat 条目并选择“属性”。
2. 在“通用”标签页中，按“设置启动选项”按钮。
3. 在出现的字段中，你可以输入希望始终启用的 VRChat 专用标志，例如 `--enable-debug-gui --enable-udon-debug-logging`，以始终启用 Debug GUI 和 Udon 调试。

:::note 调试会降低性能

**不**建议始终启用调试。它会降低 VRChat 的性能并增大日志文件的大小。如果不需要调试，请将其禁用。

:::

## 如何向你的 Udon 程序添加日志 {#how-to-add-logs-to-your-udon-program}

如果你遇到 Udon 没有执行你期望的操作的情况，一种很好的诊断方法是添加带有独特文本的 `Debug Log` 节点。你可以在脚本的任何位置、任何时间这样做。例如：

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![一个 Udon Graph，显示"InputJump"事件、"Debug Log"节点和一个字符串常量。](/img/worlds/udon/examples/debug-log.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;  
using UnityEngine;  
using VRC.Udon.Common;  
  
public class JumpDetector : UdonSharpBehaviour  
{  
    public override void InputJump(bool value, UdonInputEventArgs args)  
    {  
        Debug.Log("Local player jumped!");  
    }  
}
```

</TabItem>
</Tabs>

在脚本执行重要操作之前或之后添加日志消息。当你的 UdonBehaviour 运行时，查看 Unity 或 VRChat 的日志以查看你的日志消息。这有助于你判断脚本是否按预期运行，或者脚本是否在你的 `Debug.Log` 得以执行之前就停止了运行。

## 理解 Udon 错误 {#understanding-udon-errors}
当 UdonBehaviour 在客户端运行时遇到重大问题，它会禁用自身。如果你查看 VRChat 的日志，会看到类似这样的条目：
`[UdonBehaviour] An exception occurred during Udon execution, this UdonBehaviour will be halted.`
要了解更多发生的情况，请使用上文*查找日志*下的说明打开你的日志文件，并搜索单词"halted"。在那里，你会找到关于所发生情况的更多信息。

### 示例 {#example}
下面是你可能在 Udon 中遇到的错误。让我们来剖析它：


```
2020.08.28 17:40:51 Error      -  [UdonBehaviour] An exception occurred during Udon execution, this UdonBehaviour will be halted.
VRC.Udon.VM.UdonVMException: An exception occurred in an UdonVM, execution will be halted. ---> VRC.Udon.VM.UdonVMException: An exception occurred during EXTERN to 'VRCSDK3VideoComponentsBaseBaseVRCVideoPlayer.__GetTime__SystemSingle'. ---> System.NullReferenceException: Object reference not set to an instance of an object.
  at VRC.SDK3.Internal.Video.Components.AVPro.AVProVideoPlayerInternal.GetTime () [0x00000] in <00000000000000000000000000000000>:0 
  at VRC.Udon.Wrapper.Modules.ExternVRCSDK3VideoComponentsBaseBaseVRCVideoPlayer.__GetTime__SystemSingle (VRC.Udon.Common.Interfaces.IUdonHeap heap, System.UInt32[] parameterAddresses) [0x00000] in <00000000000000000000000000000000>:0 
```

- 重要信息在第二行。
	- `An exception occurred during EXTERN to 'VRCSDK3VideoComponentsBaseBaseVRCVideoPlayer.__GetTime__SystemSingle'. ---> System.NullReferenceException: Object reference not set to an instance of an object.`
- 这个错误告诉你，我们的世界正试图访问某个不存在的东西。
	- 具体来说，脚本试图访问一个 `VRCVideoPlayer`，但并没有为它指定任何对象。这就是 ` Object reference not set to an instance of an object` 的含义，而 `VRCSDK3VideoComponentsBaseBaseVRCVideoPlayer.__GetTime__SystemSingle` 告诉你它发生在试图对 `VRCVideoPlayer` 调用 `GetTime` 的时候。
	- 一旦你熟悉了阅读日志，这类信息会非常宝贵。
- 现在你可以前往那个试图调用 `VRCVideoPlayer.GetTime` 的图，并确认是否有 `VRCVideoPlayer` 连接到它。

## 使用 Debug Log 诊断 Udon {#use-debug-log-to-diagnose-udon}
如果你遇到 Udon 没有执行你期望的操作的情况，一种很好的诊断方法是添加日志记录。

将"Debug Log"节点添加到你的 Udon Graph 中，或在 UdonSharp 中执行 `Debug.Log`。添加独特的消息以帮助你理解日志，例如"The Rotating Cube script has finished running its Start event."

将 Debug Log 放在脚本尝试执行重要操作之前或之后。然后在运行 UdonBehaviour 时，你可以观察日志，了解它执行到了哪里，以及它是否在做你期望的事。

## 在 Unity 中查看 UdonSharp 日志 {#view-udonsharp-logs-in-unity}

UdonSharp 包含一个运行时异常监视器，它会从 VRChat 的输出日志中查找 Udon 异常。它让你能够准确看到 UdonSharp 脚本中抛出异常的行。此功能默认启用，但可以在 Project Settings 中禁用：

![Project Settings](/img/worlds/udon/udonsharp/red-1.png)
![Listen for Client Exceptions](/img/worlds/udon/udonsharp/red-2.png)

在 VRChat 中，你的世界中抛出的任何错误都会显示在编辑器的控制台中。例如，在以下示例中，脚本 `FullBodyPlayerTracker.cs` 在第 92 行的第 86 个字符处遇到了错误：

![Error in Console](/img/worlds/udon/udonsharp/red-6.png)
