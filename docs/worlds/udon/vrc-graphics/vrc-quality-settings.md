---
title: "VRC 质量设置"
slug: "vrc-quality-settings"
hidden: false
createdAt: "2025-04-22T18:46:09.500Z"
updatedAt: "2025-04-22T18:46:09.500Z"
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# VRCQualitySettings

对 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/QualitySettings.html">UnityEngine.QualitySettings</UnityVersionedLink> 的属性所做的一层只读薄封装。

目前公开的内容：

- `int AntiAliasing`
- `int PixelLightCount`
- `float LODBias`
- `int MaximumLODLevel`
- `ShadowResolution ShadowResolution`
- `float ShadowDistance`
- `int ShadowCascades`
- `int vSyncCount`
- `bool RealtimeReflectionProbes`
- `ShadowmaskMode ShadowmaskMode`

其中一些可能会受用户的图形设置影响。

### 世界质量设置脚本 {#world-quality-settings-script}

[VRCWorld 预制件](/worlds/sdk-prefabs/#vrcworld)包含“World Quality Settings”脚本。它允许你轻松配置以下 Unity 设置：

- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/shadow-distance.html">阴影距离</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/LightMode-Mixed-Shadowmask.html">Shadowmask 光照模式</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/RefProbeTypes.html">实时探针</UnityVersionedLink>


### 阴影距离 {#shadow-distance}

你可以使用 `VRCQualitySettings.SetShadowDistance()` 覆盖你世界中的<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/shadow-distance.html">阴影距离</UnityVersionedLink>。在 VRChat 中，该值被限制在 `0.1f` 到 `10000.0f` 之间。

`SetShadowDistance()` 接受四个 float 参数：`low`、`medium`、`high` 和 `mobile`。它们分别对应图形设置菜单中的“低”“中”和“高”阴影质量设置。如果你指定了不同的值，将使用与本地用户当前设置相匹配的参数。`mobile` 适用于所有非 PC 平台，与设置无关。如果你想为全部四个参数使用相同的值，请使用接受单个参数的 `SetShadowDistance()` 重载方法。

一旦你使用此属性设置了阴影距离，用户配置的“阴影质量”设置将被覆盖。用户将在其图形设置中看到一条警告。请谨慎设置阴影距离，因为较大的值可能会对性能产生严重影响。

要禁用覆盖并恢复用户配置的阴影距离值，你可以调用 `VRCQualitySettings.ResetShadowDistance()`。

此外，以下 2 个与阴影相关的属性可以以读写方式访问：

- `float shadowCascade2Split`
- `Vector3 shadowCascade4Split`

所有属性在世界加载时都会重置。

## OnChanged 事件 {#onchanged-event}

当用户更改了会影响某个已公开属性的图形设置时，会触发 [OnVRCQualitySettingsChanged](/worlds/udon/graph/event-nodes/#onvrcqualitysettingschanged) 事件。
