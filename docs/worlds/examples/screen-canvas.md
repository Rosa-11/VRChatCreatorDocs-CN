---
description: "面向移动端和桌面端用户的2D UI画布。"
sidebar_custom_props:
    customIcon: 📲
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';

# 屏幕画布 {#screen-canvas}

![屏幕画布世界预览](/img/worlds/examples/screen-canvas/screen-canvas.jpg)

本示例展示了如何为使用移动端及非VR桌面端等2D屏幕的用户创建一个屏幕空间UI画布。它还演示了如何将用户传送到目标位置与朝向。

访问[屏幕画布示例世界](https://vrchat.com/home/world/wrld_1448021c-b126-4cb9-ac92-1ab660884b02)亲自体验一下吧！

## 使用示例 {#using-the-example}

打开`screen-canvas`场景，先在Unity编辑器中测试它，或在VRChat客户端中访问[这个世界](https://vrchat.com/home/world/wrld_1448021c-b126-4cb9-ac92-1ab660884b02)。
本示例需要TextMeshPro，如果你的项目中还没有TextMeshPro，会弹出一个窗口提示“Import TMP Essentials”。接受该提示，并在导入完成后重新打开场景。

当使用移动设备或配有显示器的Windows PC等非VR显示设备进入世界时，屏幕边缘会出现一圈粗白色轮廓，以及一个显示“传送”的按钮。按下这个按钮——在移动端，只需轻点屏幕即可激活它。在桌面端，按住Tab键将光标从屏幕中心释放出来，然后按下它。无论哪种方式，你都会被传送到世界中的第二个位置，面前是另一个画布，上面写着“第二位置 / 你到了！”。

![第二位置截图](/img/worlds/examples/screen-canvas/screen-canvas-second-location.jpg)

当你使用VR显示设备访问该世界时，画布会被隐藏，而不是贴在你脸上让你无法使用按钮。

### 额外内容 {#extras}

![Game视图中、层级视图中与检视面板中的VRCButtonLayout](/img/worlds/examples/screen-canvas/screen-canvas-vrcbuttonlayout.jpg)

`VRCButtonLayout`对象是一个很有用的工具，可以显示VRChat移动端UI中各个按钮出现的位置，方便你设法避开它们。它被标记为`EditorOnly`，不会随你的世界上传。

<HowToImportExample/>

## 技术解析 {#technical-breakdown}

本节讲解提供上述功能的两个Graph程序。你可以在场景中的“ScreenCanvas”对象上找到这两个程序。

### HideInVR

![在VR中隐藏对象的Graph程序](/img/worlds/examples/screen-canvas/screen-canvas-hideinvr-graph.png)

该程序在`Start`时运行，通过检查本地玩家的`IsUserInVR`值，如果玩家处于VR中，就调用`GameObject.SetActive(false)`来停用ScreenCanvas及其UdonPrograms。如果玩家不在VR中，则无需进一步操作。
该程序与下面的传送功能分开提供，以便于将其添加到各种对象上。

### TeleportToTarget

![传送本地玩家的Graph程序](/img/worlds/examples/screen-canvas/screen-canvas-teleport-localplayer-graph.png)

该程序由Button触发，Button会触发它的`_Trigger`自定义事件。它有一个公开的`target` Transform变量。被触发时，它会对`target`调用`Transform.GetPositionAndRotation()`，然后将位置和朝向传递给`VRCPlayerApi.TeleportTo(position,rotation)`来移动玩家。
你可以修改target的值来更新位置，或移动`TeleportTarget`transform。请注意，该transform有一个子Sprite，用于在地面上显示玩家将被传送到的位置，这只是为了方便。这个Sprite是主transform的子物体，因为它需要一个我们不希望在玩家传送时施加到玩家身上的朝向。

## 已知问题 {#known-issue}

![大画布的Scene视图](/img/worlds/examples/screen-canvas/screen-canvas-knownissue.png)

在ClientSim中，为ScreenCanvas生成的碰撞体始终位于(0,0,0)，并且覆盖画布的整个尺寸。在VRChat客户端中，则使用已有的碰撞体，并出现在正确的位置。为了让场景在ClientSim中可用，初始出生位置被偏移，以便将用户放置在生成的Collider前方。
