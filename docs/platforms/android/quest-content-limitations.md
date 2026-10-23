---
title: "Android 内容限制"
slug: "quest-content-limitations"
hidden: false
createdAt: "2019-05-15T01:40:38.749Z"
updatedAt: "2022-07-04T09:34:33.253Z"
---
本页将介绍 VRChat Android 版本中各项限制。这些限制的设立是为了保证性能、用户安全，并遏制恶意行为。

在我们的 [Android 内容优化](/platforms/android/quest-content-optimization)页面中可以找到关于受限组件的更多信息。

## Avatar 专属限制 {#avatar-specific-limitations}

尽管当前版本的 VRChat 并未实施硬性限制，**但我们未来可能会基于三角形数量、材质数量、网格数量及其他质量指标对 Avatar 实施硬性限制。** 请牢记我们在 [Android 内容优化](/platforms/android/quest-content-optimization)中所述的推荐建议。

目前，如果你上传的 Avatar 或包含 Avatar 的世界中，Avatar 超出了我们的推荐值，该世界或 Avatar 可能会被取消公开访问。

## 着色器 {#shaders}

Android 或 Quest 上的 VRChat 仅允许 Avatar 使用最新 SDK 提供的着色器。这些着色器及其简要说明和输入项列于下方。此列表可能发生变化，当有新着色器可用时我们会在补丁说明中公告。

下方列出的所有着色器都位于着色器选择对话框中的 `VRChat/Mobile` 下。

**出于性能考虑，请确保始终在材质上启用 "Enable GPU Instancing"。**

| 着色器名称                | 着色器说明 |
| :-- | :-- |
| Toon Standard              | 移动平台上 VRChat 可用的功能最强大、最可配置的卡通风格着色器。在 Standard Lite 不合适的大多数情况下推荐使用它。它支持以下功能：<ul> <li>来自 UV0 或 UV1 的细节贴图与自发光贴图。</li> <li>自定义阴影渐变、可配置的简化高光光照、边缘光以及 Matcap。</li> <li>可遮罩的色相偏移，用于反照率、自发光和细节。</li> <li>法线贴图，包括可平铺和可遮罩的细节法线。</li> <li>遮罩纹理，可为不同颜色通道配置，以便将多张贴图组合为不同的打包格式。</li> </ul> 注意："Outline" 版本仅在 PC 上受支持，移动设备会自动回退到非描边版本。你也可以在 PC Avatar 上使用该着色器，不过它目前不支持实时阴影。 |
| Standard Lite              | Unity Standard 的"精简"版本，所需 VRAM 更少。<ul> <li> 支持 Unity 标准金属设置的通道映射，但 Alpha 和视差除外。 </li> <li> 漫反射纹理会被网格的顶点颜色着色。 </li> <li> 你可以通过将不同通道打包到同一纹理中来优化它们：<ul> <li> 纹理 1：Albedo（RGB）和 Detail Mask（A） </li> <li> 纹理 2：Metallic（R）、Occlusion（G）和 Smoothness（A） </li> </ul> </li> <li> 不推荐在 PC 上使用，因为它不支持实时光照。 </li> </ul> |
| Bumped Diffuse             | 带法线贴图的漫反射。漫反射纹理会被顶点颜色着色。 |
| Bumped Mapped Specular     | 漫反射，但在 alpha 通道上带有高光贴图（光泽度）。漫反射纹理会被顶点颜色着色。同时也支持法线贴图。 |
| Diffuse                    | 就是漫反射！漫反射纹理会被顶点颜色着色。 |
| Matcap Lit                 | 漫反射，但带有 matcap 输入。可用于模拟闪亮的金属表面。漫反射纹理会被顶点颜色着色。 |
| Toon Lit                   | 提供卡通风格的着色和阴影。应用于使用平涂颜色的卡通风格角色。漫反射纹理会被顶点颜色着色。 |
| Particles/Additive         | 应用于粒子。使用 Additive 模式混合。 |
| Particles/Multiply         | 应用于粒子。使用 Multiply 模式混合。 |
| Lightmapped (Only for worlds) | 支持光照贴图的基础漫反射着色器。该着色器仅用于世界，不能用于 Avatar。它不支持实时光照。 |
| Skybox (Only for worlds)      | 该着色器是优化的天空盒着色器，用于世界。 |
| Supersampled UI (Only for worlds) | 一个无光照着色器，它在纹理采样阶段进行超采样。配合 mipmap 使用，可使世界内的 UI 文字清晰锐利，而不会出现颗粒感或分散注意力。

## 组件 {#components}

以下组件在 Android 或 Quest 上不受支持，将无法工作。此列表可能发生变化。当这些内容发生变化时，我们会在补丁说明和更新的文档中注明。

| 着色器名称                | 着色器说明 |
| :-- | :-- |
| Dynamic Bones              | 在 Android 和 Quest 上完全禁用。请改用 [PhysBones](/common-components/physbones)！！ |
| Cloth                      | 在 Android 和 Quest 上完全禁用。 |
| Cameras                    | 在 Android 和 Quest 上对 Avatar 完全禁用。允许在世界中使用。请注意不要过度使用。 |
| Lights                     | 在 Android 和 Quest 上对 Avatar 完全禁用。 |
| Video Players | 可以工作，但有一些限制。详见[视频播放器](/worlds/udon/video-players)。 |
| Post-Processing | 后处理系统在 Android 和 Quest 上完全禁用。GPU 并不适合很好地处理这些效果。 |
| Audio Sources | 音频源在 Android 和 Quest 上对 Avatar 完全禁用。音频源会消耗大量 CPU 资源，而语音具有更高优先级。 |
| Physics Objects | 刚体、碰撞体和关节在 Android 和 Quest 上对 Avatar 完全禁用。<br /> 它们在世界中是允许的，但你应注意不要过度使用。 |
| Particle Systems | 在 Android 和 Quest 上，Avatar 的粒子受到严格限制，其设置与 PC 上的 [Avatar 粒子系统限制](https://docs.vrchat.com/docs/avatar-particle-system-limits)一致。 |
| Constraints | 由于复杂的性能问题，Unity 约束在 Android 和 Quest 上对 Avatar 完全禁用。请改用 [VRChat Constraints](/common-components/constraints)。<br /><br />允许在世界中使用。请注意不要过度使用，因为它们对性能的影响比之前认为的更大，尤其是在 Quest 和移动设备资源有限的情况下。 |
| FinalIK | 自定义 FinalIK 组件在 Android 和 Quest 上对 Avatar 完全禁用。<br />FinalIK 组件是资源占用的无底洞。我们目前不计划在这些平台上启用它们。 |
