import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 图片加载 {#image-loading}

图片加载允许你在VRChat世界中显示来自互联网的图片。当用户访问你的世界时，图片可以从互联网下载，并作为纹理用于你的材质。以下是图片加载的一些使用示例：

- 无需重新上传即可更新世界中的纹理。
- 在世界中创建海报，并为季节性活动或派对更新它。
- 在多个世界中复用同一纹理，并一次性更新全部世界。

SDK包含一个易于使用的`ImageDownload`脚本，你也可以使用新的`VRCImageDownloader`对象编写自己的脚本。

:::tip
你可以[查看我们的图片加载器示例](/worlds/examples/image-loading)来快速上手。
:::
## 开始之前 {#before-you-begin}

你需要了解一些图片加载器的限制和参数：

- 最大分辨率为2048 × 2048像素。尝试下载更大的图片会导致错误。
- 每五秒可以下载一张图片。
  - 如果超过此限制，图片下载会排队，并以随机顺序下载。
  - 此限制适用于整个场景，无论使用了多少个VRCImageDownload组件。
- URL必须直接指向图片文件。不允许URL重定向，否则会导致错误。
- 下载的图片会自动解释为RGBA、RGB或RG图像。
  - 例如，带Alpha通道的灰度图像会被解释为RG图像。
- 队列中的元素数量上限为1000。
- 输入和输出缓冲区最大均限制为32MB，超过此限制的图片会导致错误。

并且只允许特定域名。如果某个域名不在列表中，除非用户设置中启用了**Allow Untrusted URLs**，否则图片不会下载。


- DisBridge (`*.disbridge.com`)
- Dropbox (`dl.dropbox.com`,`dl.dropboxusercontent.com`)
- GitHub (`*.github.io`)
- ImageBam (`images4.imagebam.com`)
- ImgBB (`i.ibb.co`)
- imgbox (`images2.imgbox.com`)
- Imgur (`i.imgur.com`)
- Postimages (`i.postimg.cc`)
- Reddit (`i.redd.it`)
- Twitter (`pbs.twimg.com`)
- VRCDN (`*.vrcdn.cloud`)
- VRChat (`assets.vrchat.com`)
- Ytimg (`i.ytimg.com`)

## 内存管理 {#memory-management}

下载的图片可能占用大量内存。使用完图片后，你应当通过Udon释放它，从而为其他内容腾出内存。

例如，如果你下载了一张新图片，并想用它替换之前下载的另一张图片，你应当使用下文记录的`Dispose`方法将旧图片从内存中移除。如果不这样做而持续下载新图片，访问你世界的玩家可能在停留足够长时间后耗尽内存并崩溃！

## UdonGraph节点 {#udongraph-nodes}

### VRCImageDownloader

使用`VRCImageDownloader`的构造函数创建一个图片下载器，它可以在运行时从互联网下载图片。

#### DownloadImage

下载一张图片，并调用一个表示成功或失败的事件（见下方的“Events”）。  
返回一个`IVRCImageDownload`，可用于跟踪下载进度。

- **Instance**：用于下载图片的`ImageDownloader`组件。  
- **Url**：要下载的纹理的`VRCURL`。  
- **Material**（可选）：自动将下载的图片作为主纹理应用到的材质。
- **UdonBehavior**（可选）：用于接收`VRCImageDownloader`事件的`Udonbehavior`。如果在UdonGraph中将`udonBehavior`留空，当前UdonBehaviour将接收所有事件。
  - 请注意，除非指定`udonBehavior`，否则UdonSharp不会接收任何事件。
- **TextureInfo**（可选）：包含新创建纹理设置的`TextureInfo`对象。

#### Dispose

清理`VRCImageDownloader`。从内存中释放已下载的纹理。

对`VRCImageDownloader`调用`Dispose`会使该对象失效，这意味着它不能再用于下载任何新图片。

**关于释放和垃圾回收的说明：**

- 调用`Dispose`会使`VRCImageDownloader`、其所有关联的`IVRCImageDownload`对象以及这些下载关联的纹理失效。
  - 如果你只想释放单个下载，请改为对`IVRCImageDownload`对象调用`Dispose`。
- 请务必将对`VRCImageDownloader`的引用保存为变量，以防它（以及任何已下载的纹理）被意外垃圾回收。

### TextureInfo

包含要应用于已下载纹理的设置。

- **GenerateMipMaps**：启用Mipmap生成。（默认值：`false`）
- **FilterMode**：设置纹理的`FilterMode`。（默认值：`Trilinear`）
- **WrapModeU**：沿U（水平）轴的`TextureWrapMode`（默认值：`Repeat`）
- **WrapModeV**：沿V（垂直）轴的`TextureWrapMode`（默认值：`Repeat`）
- **WrapModeW**：沿W（深度，仅与Texture3D相关）轴的`TextureWrapMode`。（默认值：`Repeat`）
- **AnisoLevel**：纹理的`anisoLevel`。值为0时禁用过滤，16相当于完全过滤。（默认值：`9`）
  - VRChat使用强制各向异性过滤。当anisoLevel值在1到9之间时，Unity会将anisoLevel设置为9。如果该值高于9，Unity会将其限制在9到16之间。
- **MaterialProperty**：如果`DownloadImage`中指定了`material`，则覆盖要将下载的纹理应用到的`MaterialProperty`。（默认值：`_MainTex`）

### IVRCImageDownload

包含已下载图片的信息。由`VRCImageDownloader`的`DownloadImage`函数、`OnImageLoadSuccess`和`OnImageLoadError`返回。  
请注意，在下载完成或失败之前，其中许多字段将无效。

- **Get Error**：获取与该事件关联的`VRCImageDownloadError`。
- **Get Errormessage**：以`string`形式获取错误消息。  
- **Get Material**：获取传入`DownloadImage`函数的材质。  
- **Get Progress**：以0到1之间的`float`形式获取图片下载的进度。使用它来跟踪下载进度，例如用于自定义加载条。
- **Get Result**：已下载图片的`Texture2d`。  
- **Get SizeInMemoryBytes**：以`int`形式获取纹理的字节大小。
- **Get State**：获取表示图片下载状态的`VRCImageDownloadState`。  
- **Get TextureInfo**：传给DownloadImage函数的纹理信息（TextureInfo）。  
- **Get Udonbehavior**：获取下载图片事件发送到的给定udonbehavior（UdonBehavior）。
- **Get URL**：获取图片下载的`VRCURL`。

VRChat会自动选择已下载图片的<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/TextureFormat.html">纹理格式</UnityVersionedLink>。
- 带Alpha通道的图片会加载为RGBA32、RGB64等。
- 不带Alpha通道的图片会加载为RGB24、RGB48等。
- 灰度图片会加载为R8、R16等。

#### Dispose

清理`IVRCImageDownload`。卸载已下载的纹理并释放它占用的内存。

与`VRCImageDownloader`的dispose方法不同，这只会释放此单个下载及其关联的纹理，其他下载及其纹理保持不变。

释放`IVRCImageDownload`会将其`State`更改为`Unloaded`。

### VRCImageDownloadState

表示`IVRCImageDownload`中图片下载的状态：

- **Pending**：尚未开始或仍在进行中。
- **Error**：下载失败并出现错误（见`VRCImageDownloadError`）。
- **Complete**：下载完成，纹理已可使用。
- **Unloaded**：已对`IVRCImageDownload`调用`Dispose`，等待垃圾回收。
- **Unknown**：未知状态。

### VRCImageDownloadError

当图片下载失败时，会调用`OnImageLoadError`。`IVRCImageDownload`的`Error`字段将包含以下错误状态之一：

- **InvalidURL**：`DownloadImage`中使用的下载URL无效。
- **AccessDenied**：对URL的访问被拒绝。
- **InvalidImage**：下载的图片无效。
- **DownloadError**：发生Web请求错误。
- **Unknown**：未知错误状态。

## 事件 {#events}

* **OnImageLoadSuccess**：返回`IVRCImageDownload`。当`VRCImageDownloader`成功下载图片时调用。
* **OnImageLoadError**：返回`IVRCImageDownload`。当`VRCImageDownloader`下载图片失败时调用。
