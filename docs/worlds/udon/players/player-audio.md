# 玩家音频 {#player-audio}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

玩家的音频有两个来源：来自其麦克风的语音，以及附加在其虚拟形象（Avatar）上的声音。使用 Udon，你可以改变某个玩家听到*其他*玩家语音和 Avatar 声音的方式。例如，这段代码通过将玩家的增益设置为 5 dB 来让该玩家更安静（该值低于默认的 15 dB）：

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![在 Udon Graph 中设置玩家的语音增益。](/img/worlds/player-audio-8e50220-setvoicegain.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
somePlayer.SetVoiceGain(5);
```

</TabItem>
</Tabs>

以下是你能够访问的所有属性：

## 语音 {#voice}

### Set Voice Gain
*以分贝为单位，范围 0-24*
以分贝为单位为玩家的语音增加提升量。默认值为 15。

### Set Voice Distance Near
*以米为单位，范围 0 - 1,000,000*
近端半径（以米为单位），音量从此处开始衰减。为获得真实感和用户语音的有效空间化效果，强烈建议将近端值保持为零。

### Set Voice Distance Far
*以米为单位，范围为 0 - 1,000,000*
这设置听见用户语音范围的最远端。默认值为 25 米。你可以调低该值，使其他玩家的语音传播得没那么远，一直调到 0 即可有效地"静音"该玩家。

### Set Voice Volumetric Radius
*以米为单位，范围为 0 -1,000*
默认值为 0。
玩家的语音通常被模拟为点声源，但改变此值可以让声源看起来来自更大的区域。使用时应谨慎，它主要适用于当你从旁边经过时需要听起来"很大"的远处声源。**除非你清楚自己在做什么，否则请保持为零。** 体积半径的值应始终小于 Voice Distance Far。

如果你希望无论距离多远，用户的语音听起来都像是在近处，可将 Voice Distance Near 范围提高到一个较大的值。

### Set Voice Lowpass
*开/关*
当语音有一定距离时，它会经过低通滤波器，以帮助在嘈杂的世界中听清。如果你希望跳过此滤波器，可以将其禁用。例如，如果你打算让某位玩家使用其语音通道播放高品质的 DJ 混音，建议关闭此滤波器。

## 虚拟形象 {#avatar}

### SetAvatarAudioGain
*以分贝为单位，范围 0-10*
设置 Avatar 音频所允许的最大增益。默认值为 10。

### SetAvatarAudioFarRadius
*以米为单位，范围不限*
这设置听见 Avatar 音频范围的最大末端。默认值为 40 米。你可以调低该值，使其他玩家的 Avatar 音频传播得没那么远，一直调到 0 即可有效地"静音"该玩家。请注意，此值会与音频源的 maxDistance 进行比较，并使用较小的值。

### SetAvatarAudioNearRadius
*以米为单位，范围不限*
这设置听见 Avatar 音频范围的最大起点。默认值为 0 米。提高此值可以使 Avatar 音频源在更远的距离就达到最大音量。请注意，此值会与音频源的 maxDistance 进行比较，并使用较小的值。

### SetAvatarAudioVolumetricRadius
*以米为单位，范围不限*
Avatar 的音频源通常被模拟为点声源，但改变此值可以让声源看起来来自更大的区域。使用时应谨慎，它主要适用于当你从旁边经过时需要听起来"很大"的远处声源。除非你清楚自己在做什么，否则请保持为零。体积半径的值应始终小于 Avatar AudioFarRadius。默认值为 0 米。

### SetAvatarAudioForceSpatial
*开/关*
如果此项开启，则会对该声源启用空间化，并将 spatialBlend 设置为 1。默认值为关闭。

### SetAvatarAudioCustomCurve
*开/关*
这设置音频源是否应使用预先配置的自定义曲线。默认值为关闭。
