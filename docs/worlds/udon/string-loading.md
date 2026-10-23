# 字符串加载 {#string-loading}

字符串加载（String Loading）允许你从互联网下载文本文件，并在你的 VRChat 世界中使用它们。你可以使用 SDK 中附带的 `DownloadString` 脚本，也可以使用新的 `VRCStringDownloader.LoadUrl` 函数编写自己的脚本。

- 你的文本文件可以是任何格式，例如 `.txt` 或 `.json`。
* 每五秒可以下载一个字符串。
如果超出此限制，字符串下载会排队并以随机顺序下载。
* 一个字符串的大小上限为 100MB
* 队列中最多可以有 1000 个元素

## 受信任的 URL {#trusted-urls}
如果某个站点不在列表中，则它不会被下载，除非用户的设置中已启用"Allow Untrusted URLs"。

以下 URL 可用：

* Disbridge（`*.disbridge.com`）
* GitHub（`*.github.io`）
* Github Gist（`gist.githubusercontent.com`）
* Pastebin（`pastebin.com`）
* VRCDN（`*.vrcdn.cloud`）

## 指南 {#guides}

在你的世界中使用字符串加载有多种方式。

### 使用 `DownloadString` 脚本下载字符串 {#using-the-downloadstring-script-to-download-a-string}
SDK 包含一个可轻松下载字符串的脚本：

1. 在场景中创建一个新的 GameObject。
2. 添加一个 `UdonBehaviour` 组件。
3. 选择 `DownloadString` 作为程序源。
4. 输入 URL，并选择你希望显示下载文本的文本组件。

### 为 LoadUrl 创建你自己的脚本 {#create-your-own-script-for-loadurl}
你可以按照以下步骤，使用函数 `VRCStringDownloader.LoadUrl` 在你自己的脚本中下载字符串：

1. 使用 URL 执行 `VRCStringDownloader.LoadUrl`，并指定一个 UdonBehaviour。
	- 你可以在 `VRC.SDK3.StringLoading` 命名空间中找到 `VRCStringDownloader`。
2. 等待在指定的 UdonBehaviour 上调用 `OnStringLoadSuccess` 或 `OnStringLoadError` 事件。
3. 使用事件的 `IVRCStringDownload` 获取字符串下载的 `Result`。

## 新事件 {#new-events}

### OnStringLoadSuccess
返回 `IVRCStringDownload`。当函数 `LoadUrl` 成功从互联网下载字符串时被调用。

### OnStringLoadError
返回 `IVRCStringDownload`。当函数 `LoadUrl` 下载字符串失败时被调用。

## 新类型 {#new-types}
### VRCStringDownloader

使用此静态类从网络下载字符串。

#### VRCStringDownloader.LoadUrl
* **Url**：要从互联网加载的 URL。
* **UdonBehaviour**：用于接收事件的 UdonBehaviour。 
    * 在 Udon Graph 中，这默认为当前的 UdonBehaviour
    * 在 Udon Sharp 中，你可以使用 `this`


### IVRCStringDownload
字符串加载事件的结果。

* **Get Error (`string`)**：`OnStringLoadError` 的错误消息。
* **Get ErrorCode (`int`)**：`OnStringLoadError` 的 HTTP 错误代码。
* **Get ResultBytes (`byte[]`)**：以字节数组形式下载的原始数据。你可以对其使用 `System.Text.Encoding` 来以自定义格式解码字符串。访问此属性将返回数据的副本。
* **Get Result (`string`)**：下载的字符串，通过 UTF8 标准解码。
* **Get UdonBehaviour (`UdonBehaviour`)**：事件发送到的 UdonBehaviour。
* **Get Url (`VRCUrl`)**：获取尝试下载的 URL。

## 示例代码 {#example-code}

```csharp title="String Download Example, Custom Text Encoding"
using System.Text;
using UdonSharp;
using UnityEngine;
using VRC.SDK3.StringLoading;
using VRC.SDKBase;

public class ResultBytesExample : UdonSharpBehaviour
{
    [SerializeField]
    private VRCUrl url;

    void Start()
    {
        VRCStringDownloader.LoadUrl(url, this);
    }

    public override void OnStringLoadSuccess(IVRCStringDownload result)
    {
        string resultAsUTF8 = result.Result;
        byte[] resultAsBytes = result.ResultBytes;
        string resultAsASCII = Encoding.ASCII.GetString(resultAsBytes);
        Debug.Log($"UTF8: {resultAsUTF8}");
        Debug.Log($"ASCII: {resultAsASCII}");
    }

    public override void OnStringLoadError(IVRCStringDownload result)
    {
        Debug.LogError($"Error loading string: {result.ErrorCode} - {result.Error}");
    }
}
```
