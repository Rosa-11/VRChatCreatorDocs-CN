---
title: 小地图
description: "使用Graphics.Blit显示实时小地图"
sidebar_custom_props:
    customIcon: 📌
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';

![小地图示例世界](/img/worlds/examples/minimap-example-world.png)

本示例包含一个小地图，你可以拾取它并带在身边环游世界。你的位置在地图上显示为蓝点，其他玩家显示为绿点。

访问[小地图示例世界](https://vrchat.com/home/world/wrld_12492ad5-ff17-445d-9f90-7b14376b1f32)亲自体验吧！

## 使用示例 {#using-the-example}

从说明区域拿起小地图，并在世界中四处走动。观察蓝色点（你）如何在中央保持不动，而地图在你周围更新。

返回出生点附近的说明区域，按下标有“Toggle Visibility of Other Players”的按钮将其开启。如果你在ClientSim中测试，请使用暂停菜单生成一个远程玩家。如果你在VRChat中测试，请使用小号加入世界或邀请朋友。远程玩家应该会以绿色显示在你的地图上。你可以再次按下按钮来隐藏绿色点。

<HowToImportExample/>

## 技术拆解 {#technical-breakdown}

### Udon程序 {#udon-program}

Udon程序按以下方式工作：
  - 在Start时：作为预制件一部分的摄像机从上方捕捉你的场景。作为世界创作者，你可以将其放置在世界中的任何位置。
  - 在Update时：获取本地玩家的位置，并将其传递给特殊着色器（`MiniMap Blit`）。
  - 然后，着色器会在玩家位置处将一个点叠加到地图捕捉画面上。
  - 如果你允许显示其他玩家，就可以使用`_ShowOthersToggle`来开启和关闭其他玩家的点。和朋友们一起试试吧！

### 拾取 {#pickup}

该拾取物则非常简单。它只是使用一个材质，并将最终输出纹理`MiniMap RT`指定为其Main Texture和Emission。

### 其他说明 {#other-notes}

`Graphics.Blit`的优点之一是你可以从中获得常规纹理，然后将其用于任何你想要的用途！

你还可以通过更频繁或更少地调用`Graphics.Blit`来控制更新速率。

几乎所有你能想到的参数都可以通过`MiniMap`程序调整，所以请随意尝试！

如果你打算在你的世界中使用此示例预制件，别忘了调整`MaxPlayers`变量以匹配你的`World Capacity`。
