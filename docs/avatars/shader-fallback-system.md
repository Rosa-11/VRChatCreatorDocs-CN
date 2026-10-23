---
title: "着色器阻止与回退系统"
slug: "shader-fallback-system"
hidden: false
createdAt: "2018-09-25T20:49:23.385Z"
updatedAt: "2022-08-12T01:21:02.481Z"
---
本页介绍着色器阻止系统（Shader Blocking System）的工作方式，以及着色器作者如何配合它，使用户在虚拟形象（Avatar）上屏蔽着色器时，着色器能够平稳回退。

## VRChat 2021.4.2 回退系统升级 {#vrchat-202142-fallback-system-upgrade}
着色器回退改进通过使用着色器顶部的“Tags”字段来工作。
```text
Tags{"Queue"="Geometry"}
```
Tags 字段默认可能如下所示。

现在你可以在 `VRCFallback` 名称下添加不同的标签，以指定尝试使用哪个回退着色器：
```text
Tags{"Queue"="Geometry" "VRCFallback"="Toon"}
```
部分回退标签可以组合，例如你可以使用 `ToonCutout`：
```text
Tags{"Queue"="Geometry" "VRCFallback"="ToonCutout"}
```
支持的标签如下：

```text
Unlit
VertexLit
Toon
Transparent
Cutout
Fade
Particle
Sprite
Matcap
MobileToon
DoubleSided
Hidden //(this will hide the mesh from view if the shader is blocked, useful for things like raymarching effects.)
toonstandard
toonstandardoutline
```

Toon 和 Unlit 也可以与 Transparent、Cutout 和 Fade 标签组合，实现更精细的控制。Toon 还额外支持“DoubleSided”以及“DoubleSidedCutout”等变体。

:::caution

请注意，将 Transparent 或 Fade 标签与 Toon 一起使用会导致回退到 Transparent Unlit。选择回退标签时你可能需要考虑到这一点。
:::

指定任何其他标签都会导致回退到 Standard 着色器。

`toonstandard` 和 `toonstandardoutline` 标签比较特殊，它们不能组合。它们分别保证回退到 `VRChat/Mobile/Toon Standard` 和 `VRChat/Mobile/Toon Standard (Outline)` 着色器。所有同名关键字和属性都会被复制过去。

如果未提供标签，将使用旧的回退系统，遵循着色器名称、关键字等模式。

我们现在还会将所有标准着色器参数复制到回退材质，包括以下内容：
```text
_MainTex
_MetallicGlossMap
_SpecGlossMap
_BumpMap
_ParallaxMap
_OcclusionMap
_EmissionMap
_DetailMask
_DetailAlbedoMap
_DetailNormalMap
_Color
_EmissionColor
_SpecColor
_Cutoff
_Glossiness
_GlossMapScale
_SpecularHighlights
_GlossyReflections
_SmoothnessTextureChannel
_Metallic
_SpecularHighlights
_GlossyReflections
_BumpScale
_Parallax
_OcclusionStrength
_DetailNormalMapScale
_UVSec
_Mode
_SrcBlend
_DstBlend
_ZWrite
```
## 旧回退系统 {#old-fallback-system}
当着色器被安全系统阻止时，首先会在此列表中检查是否匹配某个内部预编译着色器：
```text title="Pre-Compiled Internal Shaders"
  "Standard",
  "Standard (Specular setup)",
  "Effects/Rim",
  "Effects/GlowAdditiveSimple",
  "Legacy Shaders/Bumped Diffuse",
  "Legacy Shaders/Bumped Specular",
  "Legacy Shaders/Decal",
  "Legacy Shaders/Diffuse",
  "Legacy Shaders/Diffuse Detail",
  "Legacy Shaders/Diffuse Fast",
  "Legacy Shaders/Lightmapped/Diffuse",
  "Legacy Shaders/Lightmapped/Specular",
  "Legacy Shaders/Lightmapped/VertexLit",
  "Legacy Shaders/Parallax Diffuse",
  "Legacy Shaders/Parallax Specular",
  "Legacy Shaders/Reflective/Bumped Diffuse",
  "Legacy Shaders/Reflective/Bumped Specular",
  "Legacy Shaders/Reflective/Bumped Unlit",
  "Legacy Shaders/Reflective/Bumped VertexLit",
  "Legacy Shaders/Reflective/Diffuse",
  "Legacy Shaders/Reflective/Parallax Diffuse",
  "Legacy Shaders/Reflective/Parallax Specular",
  "Legacy Shaders/Reflective/Specular",
  "Legacy Shaders/Reflective/VertexLit",
  "Legacy Shaders/Self-Illum/Bumped Diffuse",
  "Legacy Shaders/Self-Illum/Bumped Specular",
  "Legacy Shaders/Self-Illum/Diffuse",
  "Legacy Shaders/Self-Illum/Parallax Diffuse",
  "Legacy Shaders/Self-Illum/Parallax Specular",
  "Legacy Shaders/Self-Illum/Specular",
  "Legacy Shaders/Self-Illum/VertexLit",
  "Legacy Shaders/Specular",
  "Legacy Shaders/Transparent/Bumped Diffuse",
  "Legacy Shaders/Transparent/Bumped Specular",
  "Legacy Shaders/Transparent/Cutout/Bumped Diffuse",
  "Legacy Shaders/Transparent/Cutout/Bumped Specular",
  "Legacy Shaders/Transparent/Cutout/Diffuse",
  "Legacy Shaders/Transparent/Cutout/Soft Edge Unlit",
  "Legacy Shaders/Transparent/Cutout/Specular",
  "Legacy Shaders/Transparent/Cutout/VertexLit",
  "Legacy Shaders/Transparent/Diffuse",
  "Legacy Shaders/Transparent/Parallax Diffuse",
  "Legacy Shaders/Transparent/Parallax Specular",
  "Legacy Shaders/Transparent/Specular",
  "Legacy Shaders/Transparent/VertexLit",
  "Legacy Shaders/VertexLit",
  "MatCap/Vertex/Textured Lit",
  "Mobile/Bumped Diffuse",
  "Mobile/Bumped Specular",
  "Mobile/Bumped Specular (1 Directional Light)",
  "Mobile/Diffuse",
  "Mobile/Unlit (Supports Lightmap)",
  "Mobile/Particles/Additive",
  "Mobile/Particles/Alpha Blended",
  "Mobile/Particles/Multiply",
  "Mobile/Particles/VertexLit Blended",
  "Particles/~Additive-Multiply",
  "Particles/Additive",
  "Particles/Additive (Soft)",
  "Particles/Alpha Blended",
  "Particles/Alpha Blended Premultiply",
  "Particles/Anim Alpha Blended",
  "Particles/Multiply",
  "Particles/Multiply (Double)",
  "Particles/VertexLit Blended",
  "Sprites/Default",
  "Sprites/Diffuse",
  "Toon/Lit",
  "Toon/Lit (Double)",
  "Toon/Lit Cutout",
  "Toon/Lit Cutout (Double)",
  "Toon/Lit Outline",
  "UI/Default",
  "Unlit/FailShader",
  "VRChat/UI/Default"
```
如果匹配到内部着色器，回退就是同类型的新着色器，但使用内部编译的着色器。所有参数都会被复制。未包含的新版本或变体将无法工作，因为它们会被替换。

如果着色器未在内部匹配，则使用着色器名称（不是文件名，而是着色器源码顶部提供的名称）来匹配某些识别特征，并替换为类似类型的回退着色器：
```text title="Fallback Shader Name Searches"
  "Unlit",
  "VertexLit",
  "Toon",
  "Outline",
  "Transparent",
  "Fade",
  "Cutout",
  "Particle",
  "Sprite",
  "MatCap"
```
这些名称可以出现在着色器名称完整字符串中的任意位置。

此外，还会搜索一些着色器属性：
```text title="Shader Properties"
"_Ramp" == "Toon"
"_ALPHABLEND_ON" == "Transparent"
"_ALPHATEST_ON" == "Cutout"
```
所有匹配都区分大小写。

会尝试创建近似匹配名称的回退材质。例如，名称包含“Sprite”的着色器会回退到 Unity 内置的“Sprites/Default”着色器。

你可以组合“Toon”和“Cutout”，或“Toon”和“Outline”来生成组合着色器，但“Transparent”和“Fade”目前没有 Toon Lit 着色器，而是回退到“Unlit/Transparent”。

对“Outline”的支持高度实验性，如果性能受到影响可能会被移除。

对于“Toon”着色器，会复制“_Ramp”参数（Texture2D）。
对于“MatCap”着色器，会复制“_MatCap”参数（Texture2D）

如果在着色器名称中未找到匹配项，则使用 Standard 材质。

会尝试将名为“_MainTex”和“_Color”的参数传输到回退着色器。如果两个参数都未匹配，则提供一个 Matcap 着色器，颜色设置为用户的等级颜色。

随着我们调整着色器回退系统，所有这些都可能发生很大变化。

## 为你的虚拟形象预览回退着色器 {#previewing-fallback-shaders-for-your-avatar}
可以通过 Action Menu 中的开关，在本地强制你自己的虚拟形象使用回退着色器。要激活此选项，请打开 Action Menu 并选择“Options”->“Avatar”->“Fallback Shaders”。开启后，你使用的任何虚拟形象都会在本地以回退着色器显示。切换虚拟形象时该选项会保持激活，但切换世界时会重置。此选项不会影响其他人查看你的虚拟形象的方式。
