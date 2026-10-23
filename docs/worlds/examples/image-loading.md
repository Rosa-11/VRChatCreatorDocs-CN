---
description: "加载远程图片。"
sidebar_custom_props:
    customIcon: 🖼️
---

# 图片加载示例 {#image-loading-example}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<video loop="loop" autoplay="autoplay" muted>
  <source src="/img/worlds/image-loader.mp4" type="video/mp4" />
    你的浏览器不支持video标签。
</video>

Udon可以从互联网加载图片，并将其显示为UI元素或世界对象上的纹理。下面的示例世界展示了该系统如何工作，以及如何使用GitHub托管图片和说明文字。

## 示例世界 {#example-world}

[下载示例项目](https://github.com/vrchat-community/examples-image-loading/archive/refs/heads/main.zip)或[访问GitHub仓库](https://github.com/vrchat-community/examples-image-loading)以自行克隆。

该场景有一个画框，它会自动切换以显示不同的图片及匹配的说明文字。图片和说明文字都免费托管在GitHub Pages上，并包含在上面的GitHub仓库中。

场景文件：`Assets/_Project/Gallery`

## 在你的世界中使用预制件 {#using-the-prefab-in-your-world}

要使用该预制件，你需要将其添加到项目中，并设置图片说明文字的URL。

该仓库发布到[GitHub Pages](https://pages.github.com/)以实现免费托管。你可以将图片和说明文字托管在任何地方，但我们建议使用GitHub Pages，因为它免费、易于设置，而且你可以将图片和说明文字保存在与世界相同的仓库中。如果你将它们托管在其他地方，请跳到第4步。

1. [复刻示例仓库](https://github.com/vrchat-community/examples-image-loading/fork)到你自己的GitHub账户。

2. 编辑“Web”目录中的图片和说明文字。你可以忽略或删除`index.html`页面，它只是作为在浏览器中测试图片和说明文字的示例。你可以保留图片命名为1.jpg等，以便更方便地使用预制件，也可以重命名它们并更新预制件中的URL。

:::tip
当“Web”目录中的文件被编辑后，网站会重新发布。只要文件名保持不变（图片为1.jpg、2.jpg等），世界中的URL就会指向新发布的文件。重新发布通过[包含的GitHub Action](https://github.com/vrchat-community/examples-image-loading/actions/workflows/static.yml)自动完成。
:::
3. 将仓库克隆到你的电脑。

4. 确保你的项目具有SDK 3.2.3或更高版本，以及ClientSim和UdonSharp，你可以通过[Creator Companion](https://vcc.docs.vrchat.com/)轻松添加它们。

5. 将[Prefab Unitypackage](https://github.com/vrchat-community/examples-image-loading/releases/download/0.2.0/SlideshowFrame.unitypackage)导入到你的项目中。

6. 将**SlideshowFrame**预制件拖入你的场景。

7. 在场景的检视面板中选择**SlideshowFrame**。

8. 在**SlideshowFrame**组件中，将**Image Urls**数组大小设为要加载的图片数量，然后更新URL以匹配你的图片URL。如果你使用GitHub Pages，URL格式将为`https://<your-github-username>.github.io/<your-repo-name>/1.jpg`。

9. 更新**String Url**以匹配你的说明文字URL。如果你使用GitHub Pages，URL格式将为`https://<your-github-username>.github.io/<your-repo-name>/captions.csv`。

#### 测试 {#testing-it-out}

如果你使用GitHub托管图片和说明文字，请确保已将更改提交并推送到GitHub，这会触发GitHub Action将文件发布到GitHub Pages。

1. 在Unity中进入播放模式。
2. 图片和说明文字应自动加载。如果没有加载，请检查Console中的错误。
3. 运行构建与测试，确保它在VRChat中也能正常工作。你可能需要在设置中开启“Untrusted URLs”。

## 重要GameObject {#important-gameobjects}

场景中最需要检查的对象是[TheFrame](#theframe)和[SlideshowFrame](#slideshowframe)。


![图片](https://user-images.githubusercontent.com/737888/219288603-2fc2753b-27a1-4f61-ad22-a51df527907d.png)

### TheFrame

TheFrame是一个包含几个重要部分的GameObject：
* **SlideshowFrame**：一个`UdonBehaviour`，负责从Web服务器加载图片和说明文字。
* **Mesh**：是图片周围的黑色边框。
* **Picture**：是一个`Mesh`，用于渲染下载的纹理。
* **UI**：是一个世界空间`Canvas`，用于渲染说明文字。

### SlideshowFrame

**SlideshowFrame** `UdonBehaviour`包含从Web服务器下载图片和说明文字的全部逻辑。

![图片](https://user-images.githubusercontent.com/737888/219288738-ace09705-18d4-4f8e-bb45-792ff662bf7b.png)

它具有以下公共变量：
* **Image Urls**：所有要下载图片的`VRCUrls`组成的`Array`。
* **String Url**：是一个`VRCUrl`，可从中下载说明文字。
* **Renderer**：目标`Renderer's`的**sharedMaterial**将使用下载的纹理来设置其纹理。
* **Field**：该`UI Element's`的**text**属性将根据匹配纹理的下载说明文字进行设置。
* **Slide Duration Seconds**：每张图片显示多长时间。

脚本的基本逻辑流程如下：

## 创建图片下载器 {#creating-an-image-downloader}

### 使用`ImageDownload`脚本下载图片 {#using-the-imagedownload-script-to-download-an-image}

SDK包含一个用于轻松下载图片的脚本：

1. 在场景中创建一个新GameObject。
2. 添加UdonBehaviour组件。
3. 选择`ImageDownload`作为程序源。
4. 选择要应用下载纹理的材质
5. （可选）自定义`TextureInfo`以更改下载纹理的设置。

### 为`VRCImageDownloader`创建自己的脚本 {#create-your-own-script-for-vrcimagedownloader}

你可以在自己的Udon Graph脚本中使用`VRCImageDownloader`。

1. 使用其Constructor节点创建一个新的`VRCImageDownloader`对象。
2. 将新创建的`VRCImageDownloader`保存为变量。（这是**必需的**。）
3. 在`VRCImageDownloader`实例上执行`DownloadImage`函数。
4. （可选）等待`OnImageLoadSuccess`或`OnImageLoadError`事件执行。

#### 脚本的基本逻辑流程如下： {#the-basic-logic-flow-of-the-script-is}

1. 在Start时，构造一个`VRCImageDownloader`以便复用于下载所有图片。保留它是很重要的，这样纹理才能持续存在。

```csharp
// 重要：将VRCImageDownloader存储为变量，以防它被垃圾回收！
_imageDownloader = new VRCImageDownloader();
```

2. 从`String Url`下载说明文字/字符串。

如果字符串下载成功，将其逐行拆分为单独的字符串，并保存到`_captions`数组中。如果下载失败，记录错误消息。


<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![在Udon Graph中使用图片加载的示例。Udon Graph无法直接使用换行字符，因此改用整数转换为字符。](/img/worlds/string-load-graph-example.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
private void Start()
{
    _udonEventReceiver = this;
        
    // 说明文字只下载一次。成功后，将调用OnImageLoadSuccess()。
    VRCStringDownloader.LoadUrl(stringUrl, _udonEventReceiver);
}

public override void OnStringLoadSuccess(IVRCStringDownload result)
{
    _captions = result.Result.Split('\n');
    UpdateCaptionText();
}

public override void OnStringLoadError(IVRCStringDownload result)
{
    Debug.LogError($"Could not load string {result.Error}");
}
```

</TabItem>
</Tabs>

3. 尝试加载下一张图片。递增`_loadedIndex`以跟踪当前位置，然后在我们先前保存的下载器上调用`DownloadImage()`。

如果图片下载成功，保存对它的引用，然后在`Renderer`上加载它。如果失败，记录错误消息。

4. 再次调用加载下一张图片的函数，并按`SlideDurationSeconds`延迟。每次加载调用期间都会递增`_loadedIndex`，并在到达数组中的最后一个URL后重新开始。

当每张图片第二次或更多次被访问时，它将从保存的Texture2D引用中显示，而不是重新加载，除非它第一次下载失败。

:::tip 源代码
在GitHub上查看[SlideshowFrame.cs的完整源代码](https://github.com/vrchat-community/examples-image-loading/blob/main/Assets/_Project/Frame/SlideshowFrame.cs)。
:::

## 已知问题 {#known-issues}

* 第一张图片的说明文字加载得不够快，因此在第一次循环之前不会显示。

:::tip Udon

查看[图片加载主文档页面](/worlds/udon/image-loading)，了解图片加载系统的完整细节，包括域名和文件限制。

:::
