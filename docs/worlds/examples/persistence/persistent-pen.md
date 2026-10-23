---
description: "使用 PlayerObject 保存画笔线条。"
sidebar_custom_props:
    customIcon: 🖊️
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# 持久化画笔 {#persistent-pen}

![持久化闲置游戏世界预览](/img/worlds/examples/persistence/persistent-pen.jpg)

本示例允许玩家使用画笔绘制最多20条彩色线条。线条会为所有玩家同步。橡皮擦可以高亮并删除由本地玩家绘制的线条。

访问[持久化画笔示例世界](https://vrchat.com/home/world/wrld_e24ce788-1fda-42dc-912b-69cd9e51140c)亲自试用！

## 使用示例 {#using-the-example}

播放场景，拾起画笔，在不怎么移动画笔的情况下轻按“Use”即可在可用颜色之间循环。按住“Use”并移动画笔即可在3D空间中绘制线条，松开“Use”即可完成该线条。

放下画笔并拾起橡皮擦，然后把橡皮擦直接插入你的任意一条线条中。已知问题：在ClientSim中，这不会高亮该线条——在VRChat客户端中则可以正常工作。

按“Use”可删除选中的线条——这会把它加回你20条线条的收藏中。

停止场景然后重新启动它，即可看到你的线条被恢复！

<HowToImportExample/>

## 技术解析 {#technical-breakdown}
`SimplePenSystem`上有一个`VRCPlayerObject`组件，它指示VRChat为世界中的每个玩家自动生成它，并在玩家离开时移除它。[VRCEnablePersistence](/worlds/components/vrc_enablepersistence)确保画笔系统的所有同步属性，例如每条线条的位置、点和颜色，都会被自动保存和加载。

### Udon程序详情 {#udon-program-details}

这个体验由两个程序驱动——一个用于[画笔](#udon-pen)，另一个用于每条[线条](#lines)。

#### Udon画笔 {#udon-pen}

查看场景中`SimplePenSystem/Pen`下的`Udon Pen`脚本。
- 更改用作`Palette Color`的渐变即可替换可用颜色。

#### 线条 {#lines}
你可以在`SimplePenSystem/Lines`下找到画笔使用的Lines。
- 如果你希望每支画笔有更多可用线条，只需复制一些现有线条！无需其他改动。
- 你可以对每条线条进行修改，例如设置不同的宽度或材质。

---

## 路线图 {#roadmap}
我们计划在未来对这个示例做以下改进：
- 当画笔距离你超过X个单位时重新生成它。
- 添加颜色选择器：按住按钮显示调色板，然后移动到你想使用的颜色。
- 重构预制件以允许无限条线条。
