---
description: "静音和取消静音其他玩家。"
sidebar_custom_props:
    customIcon: 🔇
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';

# 静音其他玩家 {#mute-others}

![静音其他玩家世界预览](/img/worlds/examples/mute-others.jpg)

本示例展示如何静音和取消静音其他玩家。

访问[静音其他玩家示例世界](https://vrchat.com/home/world/wrld_6b2ed4f1-09be-4dee-91b2-fc49e12ecb88)亲自体验吧！

## 使用示例 {#using-the-example}

打开`mute-others`场景，先在Unity编辑器中进行测试，或在VRChat客户端中访问[此世界](https://vrchat.com/home/world/wrld_6b2ed4f1-09be-4dee-91b2-fc49e12ecb88)。
本示例需要TextMeshPro；如果你的项目中尚未包含TextMeshPro，会弹出一个窗口提示“Import TMP Essentials”。接受该提示，并在导入完成后重新打开场景。

按下标有“Mute Players”的按钮，即可静音与你处于同一实例中的所有其他玩家，并将按钮标签改为“Unmute Players”。再次按下该按钮，即可恢复其他玩家的声音以及原来的“Mute Players”标签。

<HowToImportExample/>

## 技术拆解 {#technical-breakdown}

![静音其他玩家检视面板](/img/worlds/examples/mute-others-inspector.png)

“PlayerMuteLogic”GameObject上有一个U#程序，其中包含该演示的全部逻辑。

### MuteOthers.cs

该程序有一个布尔变量`_areOtherPlayersMuted`，当场景中的MuteButton调用`_Trigger()`函数时，该变量会被切换。

在切换此变量的值后，会调用`OnMuteUpdated()`，它会获取实例中所有玩家的列表，然后更改他们的[VoiceDistanceFar](/worlds/udon/players/player-audio#set-voice-distance-far)以有效地静音和取消静音他们。当此值设为0时，意味着其他玩家的声音传播0米后就会静音。

取消静音时，该值会恢复为`_defaultVoiceDistance`，除非你在检视面板中更改它，否则该值为25，因此他们的声音可以在默认的25米距离内被听到。
此函数还会更改按钮上的文本，该文本通过`_buttonLabel`引用。

![用于更改按钮文本的检视面板](/img/worlds/examples/mute-others-inspector-2.png)

每个状态要显示的消息都可以在检视面板中轻松更改，即`Message Muted`和`Message Unmuted`。

#### 变量 {#variables}
* Button Label - 按钮标签的引用，用于更改其消息，应该已经正确设置。
* Message Muted - 当其他玩家被静音时按钮上显示的文本，默认是“Unmute Players”
* Message Unmuted - 当其他玩家未被静音时按钮上显示的文本，默认是“Mute Players”
* Default Voice Distance - 当玩家取消静音时，为所有玩家语音距离设置的值，默认是25，这是平台范围的默认值。

---

## 挑战 {#challenge}

你能更新这个预制件，使其只静音部分玩家吗？一种方法是根据玩家所在的位置来实现；作为起点，你可以查看[PlayerJoinZones](/worlds/examples/player-join-zones)示例，它会根据玩家是否位于触发器区域来创建玩家集合。
