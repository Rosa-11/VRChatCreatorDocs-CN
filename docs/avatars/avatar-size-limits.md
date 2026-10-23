
# 虚拟形象尺寸限制 {#avatar-size-limits}

上传自定义虚拟形象（Avatar）是在 VRChat 中表达自我的绝佳方式。不过，未经优化的虚拟形象需要更多带宽、RAM 和 VRAM，这会降低 VRChat 的性能。

本页说明 VRChat 对虚拟形象规定的最大**下载大小**和**未压缩大小**，以及如何减小你的虚拟形象尺寸。
## 下载大小与未压缩大小 {#download-size-and-uncompressed-size}
以下是 VRChat 计算你的虚拟形象文件大小的方式：
- 当你构建并上传虚拟形象时，VRChat SDK 会将其打包成一个 [Unity 资源包](https://docs.unity3d.com/Manual/AssetBundlesIntro.html)并压缩。**下载大小**就是你的虚拟形象压缩后资源包的文件大小。
- 当 VRChat 下载虚拟形象时，VRChat 会解压该资源包。**未压缩大小**就是解压后的资源包大小。

在计算你的虚拟形象大小的时候，VRChat _不会_解压单个资源！例如：如果你在[纹理的导入设置](https://docs.unity3d.com/Manual/class-TextureImporter.html)中将“Compression”设为“High Quality”，这会同时增大你虚拟形象的**下载大小**和未压缩大小。

## 虚拟形象尺寸限制 {#avatar-size-limits-1}
最大尺寸限制取决于你所游玩的平台：

| 平台                | 下载大小 | 未压缩大小 |
| ----------------------- | ------------- | ----------------- |
| Android                 | 10 MB         | 40 MB             |
| PC                      | 200 MB        | 500 MB            |

## 如何判断你是否低于这些限制 {#how-to-know-if-you-are-below-these-limits}
在 SDK 中，构建时如果你的虚拟形象突破任一限制，它会提示你并阻止上传；构建完成后，它会提醒你下载大小 / 未压缩大小分别是多少，以及对应的限制。使用构建与测试（Build & Test）时不会强制执行尺寸限制。

:::caution 保持你的 SDK 为最新版本！
在 [3.5.2](/releases/release-3-5-2) 之前，SDK 并未强制执行 Android 未压缩大小限制，请确保你_至少_使用该版本，否则一旦上传就只会因服务器端安全检查而失败！PC 上收紧后的限制从 [3.7.0](/releases/release-3-7-0) 开始强制执行，所以同样地，如果要上传到 PC，请确保你_至少_使用该版本。
:::

在客户端中，你可以在虚拟形象详情里看到这两项统计数据，无论是在快捷菜单还是主菜单中。

## 如何减小你的虚拟形象尺寸 {#how-to-decrease-your-avatars-size}
你可以通过优化资源来减小虚拟形象的尺寸：
- 纹理
  - 在[纹理导入设置](https://docs.unity3d.com/Manual/class-TextureImporter.html)中减小最大尺寸。
  - 通过删除/合并纹理或材质来减少纹理文件的数量。
  - 将纹理调整为[二的幂](https://en.wikipedia.org/wiki/Power_of_two)（即 512、1024、2048），或在[纹理导入设置](https://docs.unity3d.com/Manual/class-TextureImporter.html)中启用“Non-Power of 2”，以改善 Unity 的纹理压缩。
- 音频剪辑
  - 缩短过长的剪辑。
  - 降低剪辑的质量，或在[音频剪辑导入设置](https://docs.unity3d.com/Manual/class-AudioClip.html)中启用“Force to Mono”。
- 动画剪辑
  - 减少关键帧的数量。
- 形态键
  - 移除未使用的形态键。
  - 减少受形态键影响的顶点数量，尤其是当你的模型包含大量形态键时。

你可以在[虚拟形象优化技巧页面](/avatars/avatar-optimizing-tips)找到更多优化建议。
