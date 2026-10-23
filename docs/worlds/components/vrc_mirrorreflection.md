---
title: "VRC Mirror Reflection"
slug: "vrc_mirrorreflection"
hidden: false
createdAt: "2017-07-06T06:10:45.478Z"
updatedAt: "2022-08-17T20:23:01.162Z"
---
该组件可用于在你的 VRChat 世界中创建镜子。

它需要在同一个游戏对象上有一个[网格渲染器组件](https://docs.unity3d.com/Manual/class-MeshRenderer.html)。它会写入网格渲染器第一个材质的 `_MainTex` 值。你可以在[SDK 预制件](/worlds/sdk-prefabs#vrcmirror)中找到一个名为 `VRCMirror.prefab` 的示例。

| 参数 | 描述 |
| --- | --- |
| Disable Pixel Lights | 禁用实时的像素着色点光源和聚光灯。启用此项后，像素着色光源将回退到顶点光照。 |
| Turn Off Mirror Occlusion | 禁用镜子上的遮挡剔除。如果你看到镜子中的物体闪烁，请启用此项。 |
| Reflect Layers | 只有处于所选图层的物体才会在镜子中渲染。Water 图层上的物体永远不会在镜子中渲染。 |
| Mirror Resolution | 镜子的渲染分辨率（在 VR 中为每只眼睛）。Auto 会以与用户 HMD 或显示器相同的分辨率渲染，最高不超过 2048x2048[^1]。 |
| Maximum Antialiasing | 应用于镜子中所渲染图像的最大 MSAA 级别。可能会被客户端图形设置覆盖。 |
| Custom Shader | 如果提供了着色器，镜子将使用该着色器而不是默认着色器。 |
| Camera Clear Flags | 指定镜子在渲染前用于清除背景的 CameraClearFlags。默认的“From Reference Camera”将使用与渲染镜面的摄像机相同的标志。 |
| Custom Skybox | 如果“Camera Clear Flags”设置为“Custom Skybox”，则将在镜子中显示该天空盒。如果选择了“Custom Skybox”模式但未提供任何内容，背景将为黑色。 |
| Custom Clear Color | 如果“Camera Clear Flags”设置为“Solid Color”，则将使用该颜色作为背景。请注意，Alpha 通道会被遵循，因此你可以用它来清除 Alpha 并在自定义着色器中使用（例如，用于镂空风格的镜子）。 |

镜子可能会大幅降低 VRChat 世界的帧率。为避免这种情况，请尝试以下做法：
- 默认保持镜子关闭。在用户靠近时自动启用它们，或允许用户手动启用它们。
- 不要反射所有图层，或允许用户选择要反射哪些图层。（“高质量”和“低质量”镜子。）
- 如果你的用户仍然遇到性能问题，请降低镜子的分辨率。

[^1]: 分辨率高于 2048px 的显示器会导致镜子质量下降。用户可以在 VRChat 的设置中将镜子分辨率切换为“Unlimited”。这会提升质量，但会降低 VRChat 的性能。
