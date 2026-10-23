---
slug: "vrc_cameradolly"
---

# VRC Camera Dolly

允许将摄像机轨道动画应用到 VRChat 用户摄像机。
有三个组件用于定义动画：
* `VRC Camera Dolly Animation`：表示整个动画的顶层组件
* `VRC Camera Dolly Path`：单个动画路径。动画可以包含任意数量的路径。不过，每个路径和动画的点数都是有限制的。
* `VRC Camera Dolly Point`：一个点表示一个动画关键帧。


## 示例层级结构 {#example-hierarchy}
带有这些组件的游戏对象应按如下方式嵌套：
```
Animation
├── Path 1
│   ├── Point 1
│   └── Point 2
└── Path 2
    ├── Point 1
    ├── Point 2
    ├── Point 3
    └── Point 4
```

## 用法 {#usage}
1. 将 `VRC Camera Dolly Animation` 组件添加到任意游戏对象，并定义动画参数
2. 将 `VRC Camera Dolly Path` 组件添加到上述对象的子对象
3. 添加一组游戏对象，每个都带有 `VRC Camera Dolly Point` 组件，并定义关键帧参数
4. 选择顶层对象并点击 `Collect Paths & Points`。每当该层级结构更新后都需要执行此操作。
5. 调用 `VRCCameraDollyAnimation.Import()`，将定义好的设置和动画应用到本地玩家的 VRC 用户摄像机

编辑器辅助图标（gizmos）可以让你大致了解某个动画的效果。
不过，目前 ClientSim 不支持预览摄像机动画。
要查看动画的实际效果，请使用构建与测试。


## VRC Camera Dolly Animation

| 参数                  | 描述                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------|
| Is Relative To Player | 该动画应相对于世界原点还是玩家应用？                                                    |
| Is Speed Based        | 该动画是基于时间的（使用时长）还是基于速度的（使用飞行速度值）？                        |
| Is Using Look At Me   | 该动画是否使用 Look-At-Me 偏移？                                                        |
| Is Using Greenscreen  | 该动画是否使用绿幕 HSL 值？                                                             |
| Is Using Multi Stream | 这是否是一个多路流动画？                                                                |
| Path Type             | 定义所有动画路径的插值方式                                                              |
| Loop Type             | 定义动画应如何循环                                                                      |
| Capture Type          | 定义动画应如何被捕获                                                                    |
| Focus Mode            | 该动画中摄像机应使用哪种对焦模式？                                                      |
| Anchor Mode           | 该动画中摄像机应使用哪种锚点模式？                                                      |
| Paths                 | 属于该动画的路径列表                                                                    |


## VRC Camera Dolly Path

| 参数                 | 描述                     |
|----------------------|---------------------------------------|
| Points               | 属于该路径的点列表       |


## VRC Camera Dolly Path Point

| 参数                | 描述                                                                |
|---------------------|---------------------------------------------------------------------|
| Zoom                | 关键帧的缩放值                                                      |
| Duration            | 关键帧的时长（使用基于时间的运动时）                                |
| Speed               | 关键帧的速度值（使用基于速度的运动时）                              |
| Focal Distance      | 关键帧的焦距（使用手动对焦时）                                      |
| Aperture            | 关键帧的光圈（使用手动或半自动对焦时）                              |
| Hue                 | 关键帧的绿幕色相（使用绿幕时）                                      |
| Saturation          | 关键帧的绿幕饱和度（使用绿幕时）                                    |
| Lightness           | 关键帧的绿幕亮度（使用绿幕时）                                      |
| Look At Me X Offset | 关键帧的水平 Look At Me 偏移（使用 Look At Me 时）                  |
| Look At Me Y Offset | 关键帧的垂直 Look At Me 偏移（使用 Look At Me 时）                  |
