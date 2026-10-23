---
title: "Android 内容优化"
slug: "quest-content-optimization"
hidden: false
createdAt: "2019-04-08T23:52:28.397Z"
updatedAt: "2023-02-03T01:02:49.409Z"
---
为 Android 上的 VRChat 创建内容是一项挑战——你必须创建出有吸引力、引人入胜的内容，同时还要让内容针对移动设备进行优化。这与游戏开发者为移动端构建内容时必须面对的挑战相同。

在这里，我们会给出一些在为 Android 上的 VRChat 构建内容时需要牢记的通用准则。

除非另有说明，下列各项同时适用于 Avatar 和世界。

Unity 有一份关于[优化你的 VR/AR 体验](https://learn.unity.com/tutorial/optimizing-your-vr-ar-experiences)的指南，其中有很多不错的要点。

还有这个[由 Lucas Rizzotto 制作的关于优化 VR 内容的精彩视频](https://www.youtube.com/watch?v=w0n4fuC4fNU)！它制作得非常好，涵盖了我们这里讨论的许多内容。**该视频并非由 VRChat 制作，也并非专门针对 VRChat，并且需要善意提醒的是，其中包含一些粗俗用语。** 本文中的许多要点都在该视频中有所涉及。

最后要说明的是，本列表中的所有内容都可能发生变化。换言之，关于限制和建议，我们还没有完全确定下来，请牢记这一点。

## 限制的执行 {#limit-enforcement}

VRChat 的 Android 版本对 Avatar 内容设有若干硬性（和软性）限制。请查看 [Android 内容限制](/platforms/android/quest-content-limitations)了解更多信息，也请查看我们的 [Avatar 性能等级系统](/avatars/avatar-performance-ranking-system)页面，了解关于封禁机制的一些细节。

如果你上传的 Avatar 或包含 Avatar 的世界中，Avatar 大幅超出我们的推荐值，该世界或 Avatar 可能会被取消公开访问。

## Unity Profiler

我们非常非常强烈地建议你了解一下 [Unity Profiler](https://docs.unity3d.com/Manual/Profiler.html)。使用 Profiler，你可以量化世界或 Avatar 各项性能指标的具体数值。其中特别值得关注的可能是场景中的绘制调用数量，或者某个组件所占的帧时间比例。

当然，你强大的 PC 上的 Profiler 无法代表 Android 上 Profiler 的情形，但你仍然可以发现 X 组件相对于渲染等占用了大量帧时间。这都是相对的！

关于如何使用 Unity Profiler，网上有很多教程，其中包括 Unity 官方提供的两个：[面向初学者的 Profiler 概览](https://unity3d.com/learn/tutorials/topics/interface-essentials/profiler-overview-beginners)以及[中级 Profiler 入门](https://unity3d.com/learn/tutorials/topics/interface-essentials/introduction-profiler)。这些教程是为较旧版本的 Unity 制作的，但仍很好地涵盖了基本概念。

## 文件大小 {#file-size}

在移动平台上你只有有限的内存，牢记这一点极其重要。构建内容（在 SDK 中按下 "Build & Publish"）之后，你可以查看资源的大小，并在 Editor 日志中搜索 "statistics"。你要找的是压缩前的大小。

根据经验法则，请避免使用大尺寸（>1k）纹理。它们是内存占用过高的主要元凶。使用顶点颜色和平涂颜色可以极大地帮助减小纹理尺寸。

请注意，Crunch 压缩对内存中的大小*没有*帮助！Crunch 压缩只对下载大小有帮助。你的内容包在未使用 Crunch 的情况下就应当处于限制之内。

**世界**

对于 Android 上的 VRChat，你无法上传或访问构建时压缩后大小超过 100MB 的世界。

**Avatar**

你的目标应当是最大 5-8 MB。对于 Android 上的 VRChat，你无法上传、佩戴或查看构建时压缩后大小超过 10MB 的 Avatar。

## 三角形数量 {#triangle-count}

在移动平台上，保持较低的三角形数量非常重要。即便是对移动头显而言相当强大的 Quest，也有硬件限制。密切关注三角形数量对于保持高性能非常重要。

这些推荐值实际上会通过我们的 [Avatar 性能等级系统](/avatars/avatar-performance-ranking-system)强制执行。

**世界**

在构建世界时，你应尽量保持较低的三角形数量。你还需要为用户们的 Avatar 留出空间。**我们建议你为世界总共预留约 250,000 个三角形的预算。**

**Avatar**

适用于世界的一般规则同样适用于 Avatar。请记住，同一个房间中可能会有 10 个或更多用户，因此你需要相当谨慎地控制三角形使用量。**我们建议你的 Avatar 目标为少于 10,000 个三角形。**

对于偏好从各种来源导入角色而非自行创建 Avatar 的 Avatar 作者来说，这是一项挑战。简化到这个程度可能具有破坏性，你可能需要研究诸如重新拓扑几何体之类的技术，以降低多边形数量。

## 网格数量 {#mesh-count}

这同时适用于世界和 Avatar。

无论你使用什么工具，都应限制内容中使用的网格数量。对于世界中的静态物体，这并不那么重要（因为需要遮挡剔除），但对于 Avatar，这一点极其重要。

你的 Avatar 上应当只保留一个 Skinned Mesh Renderer。对 Avatar 的任何装饰或附加内容都应在 Blender 之类的 3D 编辑软件中完成，并合并到原始网格中。任何动画或移动都应通过形态键或骨骼来处理。

不久的将来，VRChat Quest Avatar 将设立硬性的网格数量限制。

对于世界，你应当从世界中的"物体"角度来思考。地面上一组花盆可以是一个单一物体，但你大概不会希望把这组花盆合并到地面网格中。否则，你可能会遇到各种优化问题，并且日后编辑世界时会很困难。

## 材质 {#materials}

减少材质数量对 Avatar 和世界都很重要。额外的材质会产生额外的子网格，从而消耗绘制调用。减少渲染视口所需的绘制调用数量非常重要。

**世界**

你的目标应当是让世界拥有尽可能少的材质数量。话虽如此，在世界方面你可以比在 Avatar 方面稍微宽松一些。最好将世界看作一组物体的集合，并相应地合并材质。

例如，如果你有一个海滩场景，一套椅子/遮阳伞/毯子大概应该是同一图集上的同一个材质。再远一点的海滩上的一组岩石则应是另一个材质和纹理。这样你就能把这些物体分开，以便进行遮挡剔除。

在世界中过于激进地合并材质和打包图集，会导致 Unity 进行批处理及其自身的运行时优化时出现一些非最优行为。

**Avatar**

你的目标应当是 Avatar 上只使用 1 个材质，不过在需要不同着色器变体的情况下使用 2 个也许是可接受的。打包纹理图集是必不可少的。

不久的将来，VRChat Quest Avatar 将设立硬性的材质限制。

**Avatar 与世界**

你应当为所有材质启用 GPU Instancing。尽管其实际用途更为复杂和技术性，但最好还是直接启用它。

## 纹理 {#textures}

关于纹理尺寸的考虑同样适用于 Avatar 和世界，但请记住，Avatar 的纹理尺寸应当减小，因为一个实例中会有多个 Avatar（而世界只有一个）。

保持较低的纹理尺寸很重要。你的目标应当是最大使用 1k（1024x1024）分辨率的纹理。你还应创建高效打包的图集，以便在相同尺寸内容纳更多纹理分辨率。

Avatar 压缩后大小不能超过 10MB，世界压缩后不能超过 100MB。由于其中大部分通常是纹理数据，你应保持纹理尺寸较小并对其进行压缩。

可以考虑使用 Crunch 压缩，但请记住，如果未来的 Unity 版本使用不兼容的 Crunch 版本，这可能会在之后破坏你的 Avatar。

## 光照 {#lighting}

本节仅适用于世界。

为世界烘焙光照是**必不可少的**。完全放弃实时光照并不算不合理，因为它们非常昂贵。请大量使用烘焙光照和光照探针。保持较低的光照贴图分辨率。即使光照贴图分辨率较低，光照效果也可以看起来非常好。

## 遮挡剔除 {#occlusion-culling}

本节仅适用于世界。

烘焙遮挡剔除极其重要。这样做可以让硬件只渲染它需要渲染的内容，并忽略你看不到的内容。设置遮挡剔除完全不需要多长时间。

这也是为什么你不应在世界中过于激进地合并网格——如果你有一些物体，例如地面上的某组建筑，你大概不希望把建筑网格合并到地面网格中，这样才能把建筑剔除掉。

## 骨骼数量 {#bone-count}

保持较低的骨骼数量对于降低蒙皮调用的开销很重要。如果某个骨骼没有被动画或骨骼绑定驱动，你应当将其权重合并到其父级并删除原骨骼。[Cat's Blender Plugin](https://github.com/michaeldegroot/cats-blender-plugin) 之类的工具可以让这变得极其简单。

:::caution 匹配骨骼绑定

确保你的骨骼绑定的基础骨骼布局和层级结构一致，包括缩放、旋转和位置。这尤其适用于你的根骨骼（通常是髋部骨骼）。若不一致，在跨平台查看内容时可能会导致异常行为。
:::

## 着色器 {#shaders}

**Avatar**

在 Android 上的 VRChat 中，Avatar 的着色器受到限制，你只能使用 VRChat SDK 中包含的 VRChat Mobile 着色器。

你可以在我们的 [Android 内容限制](/platforms/android/quest-content-limitations)页面中了解这些变体。

如果你的 Avatar 没有法线贴图，就不要使用 Bumped 变体。它对你没有任何作用，反而会带来一点性能开销。高光也是如此。

**世界**

在 Android 上的 VRChat 中，世界的着色器不受限制。但是，在编写和使用自定义着色器时你应当*格外小心*。一切以性能为先。如果你在寻找一个高度优化的基础世界着色器，请使用 `Mobile/VRChat/Lightmapped` 并烘焙你的光照。

你应当完全避免需要透明。Alpha 填充率是移动 GPU 的重要性能黑洞，因此请尽可能围绕无透明来进行设计。

## 其他组件 {#other-components}

### Cloth

Cloth 组件在 Android 上的 VRChat 中完全禁用。

### Cameras

相机组件在 Android 上的 VRChat 中对 Avatar 禁用。

它们在世界中是允许的，但你应注意不要过度使用。

### Lights

灯光在 Android 上的 VRChat 中对 Avatar 完全禁用。

### Post Processing（v1 和 v2） {#post-processing-v1-and-v2}

后处理系统在 Android 上的 VRChat 中完全禁用。

### Audio Sources

音频源在 Android 上的 VRChat 中对 Avatar 完全禁用。

音频源在 Android 上的 VRChat 中于世界内受到限制。

### 刚体、碰撞体和关节 {#rigidbodies-colliders-and-joints}

刚体、碰撞体和关节在 Android 上的 VRChat 中对 Avatar 完全禁用。

它们在世界中是允许的，但你应注意不要过度使用。

### 粒子 {#particles}

在 Android 上的 VRChat 中，Avatar 的粒子受到严格限制。
