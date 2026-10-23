import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# VRC Spatial Audio Source

使用`VRC_SpatialAudioSource`为Unity`Audio Source`组件添加3D空间化效果。

添加后，`VRC_SpatialAudioSource`会自动添加一个Unity`Audio Source`组件。

该组件既可用于虚拟形象（Avatar），也可用于世界。

![图像](/img/worlds/vrc_spatialaudiosource-1.png)
## Unity编辑器界面 {#unity-editor-interface}

该组件会生成两个<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Gizmos.html">Unity Gizmos</UnityVersionedLink>，用于显示：

- Far
- Near

此外，`Audio Source`组件还会生成一个“Volumetric Radius”gizmo。

以下是这些gizmo的外观：
![图中的组件略显过时，但gizmo是相同的。](/img/worlds/vrc_spatialaudiosource-e975780-Unity_2019-07-09_11-51-13.png)
该组件为所有属性提供了工具提示。将鼠标悬停在属性名称上即可查看简短说明。

## 衰减机制 {#falloff-mechanics}

所有单位均为*米*。音频强度的衰减默认大致为平方反比，如下图所示：
![](/img/worlds/vrc_spatialaudiosource-c969d41-crowhurst_basic_audio_vol1-39.gif)

你可以使用`Audio Source`上的曲线图来覆盖该曲线。此曲线决定了给定距离处的音频强度。

当距离接近`Far`值时，根据你的设置，音频可能会更快地淡出。

### 使用2D音频 {#using-2d-audio}

2D音频是指无论你在世界中的哪个位置，音频音量都保持恒定的音频。它可用于已经录制为空间化声源的背景噪声（现场录音）或背景音乐。

**如果你愿意，可以通过禁用组件中的`Use Spatialized Audio`选项来使用2D虚拟形象音频**。除非你选择使用不同的音频衰减曲线，否则强度仍会像之前一样随距离衰减，只是不再具有空间化效果。

尽管如此，**我们不建议使用2D音频。**所有现实世界中的声源都有明确的点声源或体积声源。如果你仍希望使用2D音频，请确保你：
- 取消勾选`VRC_SpatialAudioSource`上的`Use Spatialized Audio`
- 将`Audio Source`上的Spatial Blend调整为100% 2D

## 虚拟形象上的空间音频 {#spatial-audio-on-avatars}

VRChat支持在虚拟形象上使用`VRC_SpatialAudioSource`，但有一些[限制](/worlds/components/vrc_spatialaudiosource#avatar-limitations)。这些限制旨在防止滥用和恶意声音。

除这些限制外，`VRC_SpatialAudioSource`在虚拟形象上的工作方式与在世界中完全相同。

:::warning

别忘了为你虚拟形象的音频源添加`VRC_SpatialAudioSource`！否则，VRChat SDK会创建该组件并选择默认设置，你可能会遇到意外、未记录且不希望出现的行为。

如果你使用现有虚拟形象的`Audio Source`，请确保它具有`VRC_SpatialAudioSource`组件！

:::

## 组件属性 {#component-properties}

`VRC_SpatialAudioSource`组件具有以下属性：

:::info

不支持在运行时通过动画调整这些属性。这些值在初始化时设置。

对`Audio Source`的属性进行动画处理仍应对与空间化设置无关的属性（如pitch）有效。

:::

| 属性                         | 描述     |
| :-- | :-- |
| Gain                             | 音量的额外提升（0-24 dB）。默认情况下，世界音频源会获得10dB的提升。虚拟形象音频源的最大增益限制为10dB。 |
| Far                              | 远端半径（以米为单位），音量在此之外衰减至静音。默认设置为40m。Avatar音频最大限制为40m。 <br /> 只有当你开启VRC_SpatialAudioSource上的“Use Spatializer Falloff”复选框时，Far才会覆盖Audio Source曲线。 |
| 高级：Near                   | 近端半径（以米为单位），音量从此处开始衰减。为了真实感和有效的空间化，我们建议将其保持为零。默认值为0m。 <br /> 只有当你开启VRC_SpatialAudioSource上的“Use Spatializer Falloff”复选框时，Near才会覆盖Audio Source曲线。  |
| 高级：Volumetric Radius      | 音频源通常被模拟为点声源，但更改此值可以让声源看起来来自更大的区域。应谨慎使用此设置，它主要用于那些在你经过时需要听起来“很大”的远处音频源。 <br /> 为获得最佳效果，听者不应靠近该半径。除非你清楚自己在做什么，否则请保持为零。默认值为0m。 <br />  Volumetric Radius的值应始终小于Far。 |
| 高级：Use AudioSource Volume Curve | 使用AudioSource的“3D Sound Settings”音量曲线。如果未勾选，则使用平方反比衰减。建议保持禁用，以确保真实且逼真的空间化效果。 <br /> <br /> 默认值为False。 |
| 高级：Enable Spatialization  | 取消勾选此项可禁用默认的平方反比衰减曲线，转而使用Audio Source的空间化设置。 <br /><br /> 默认值为True。|

## 虚拟形象限制 {#avatar-limitations}
你可以调整基于虚拟形象的`Audio Sources`上的衰减曲线。只需将`Use AudioSource Volume Curve`设置为True，在`Audio Source`中调整曲线，VRChat便会使用该衰减曲线而非默认的平方反比曲线。

但是，如上所述，虚拟形象上的`VRC_SpatialAudioSource`组件存在一些限制。这些限制在运行时强制执行。

- `Gain`不能超过10db
- `Far`不能超过40m

[Player Audio](/worlds/udon/players/player-audio)可以覆盖这些设置。

:::note

在虚拟形象上，最好禁用和启用Audio Source组件，而不是整个GameObject。
:::

### 曲线压缩 {#curve-squashing}

如果你尝试在世界中使用自定义衰减曲线播放虚拟形象音频，而该世界的`Far`距离比正常情况更短，VRChat将通过更改虚拟形象音频源的“Max Distance”设置来“压缩”曲线。你可以在Unity中调整Audio Source上的“Max Distance”范围来观察会发生什么。

### 虚拟形象音频压缩器 {#avatar-audio-compressor}
VRChat在虚拟形象音频通道上使用压缩器，以防止声音被恶意地放大。这不应影响对音量水平合理的虚拟形象音频源的正常使用。

### 避免压缩器的技巧 {#tips-for-avoiding-the-compressor}

如果你的虚拟形象上有音频，你可以在之前对音频做一些处理，以确保不会触发压缩器。

1. 尽量使用“干”音频文件——即没有经过任何效果处理的音频文件。混响和延迟最容易导致压缩器“抽吸”。
2. 在音频文件中留出一些余量。换句话说，不要让波形填满范围的最高和最低处。在Audacity（或其他波形编辑器）中，将音频标准化到-6到-12db之间。
3. 尽量避免波形中出现具有极短起音的极高峰值——换句话说，不要突然将音频“抽”到非常高的电平。如果你进行了标准化，这通常会自动从文件中消失。

## 在旧场景中替换ONSP {#replacing-onsp-in-old-scenes}

使用Build Control Panel中的“Enable 3D Spatialization on all AudioSources”按钮现在会将任何`ONSPAudioSource`转换为`VRC_SpatialAudioSource`组件。其中一些音频源在转换后可能需要进行调整。
