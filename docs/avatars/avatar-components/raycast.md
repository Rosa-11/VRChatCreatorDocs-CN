# 射线检测 {#raycast}

VRChat中的`VRCRaycast`组件允许虚拟形象（Avatar）向场景发射射线，与世界的碰撞体或玩家发生碰撞。射线检测命中某个点时，会有一个Transform被定位到该点。

## 组件属性 {#component-properties}

![Unity检视面板中的VRC Raycast组件](/img/avatars/vrcraycast.png)

下表列出了你可以配置的所有参数：

| 属性                    |                          | 描述                                                                                                                                                                                                                                                                          |
|-----------------------------|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Root Transform**          |                          | 射线检测的起始Transform。如果为空，则使用此组件所附加到的Transform。                                                                                                                                                                 |
| **Raycast Direction**       |                          | 发射射线的方向。此方向在局部空间中应用，因此会受到Transform旋转的影响。                                                                                                                                                           |
| **Distance**                |                          | 射线检测能够行进的最大距离。如果将其设为零，射线检测将尽可能远地行进（1000个单位）。                                                                                                                                                |
| **Apply Transform Scale**   |                          | 如果启用此属性，射线起始Transform的有损Z轴缩放值将影响射线检测距离。                                                                                                                                                                |
| **Collision Mode**          |                          | 控制此射线检测组件会与哪些[图层](/worlds/layers)发生碰撞：可以让它与世界使用的图层、玩家碰撞体使用的图层，或同时与两者碰撞。对于高级用例，你还可以手动定义要碰撞的特定图层。 |
|                             | *Hit Worlds*             | 射线将与`Default`和`Environment`图层以及所有用户控制的图层发生碰撞。（默认）                                                                                                                                                             |
|                             | *Hit Players*            | 射线将与`Player`和`PlayerLocal`图层发生碰撞。                                                                                                                                                                                                                         |
|                             | *Hit Worlds And Players* | 射线将同时与世界和玩家发生碰撞，合并上述两个选项的图层。                                                                                                                                                                                    |
|                             | *Hit Custom Layers*      | 射线将与一组你手动指定的图层发生碰撞。                                                                                                                                                                                                                 |
| **Custom Collision Layers** |                          | 当Collision Mode设为Hit Custom Layers时使用的自定义图层集。未使用自定义图层时，此属性会隐藏。                                                                                                                                               |
| **Result Transform**        |                          | 将被移动并可选地旋转以匹配射线检测碰撞点的Transform。必须指定Result Transform，此组件才有实际用途。                                                                                                        |
| **Apply Rotation**          |                          | 默认情况下，Result Transform只会改变位置。如果启用Apply Rotation，它还会旋转，使其Alignment Axis指向被命中表面的外侧（碰撞法线）。                                                                  |
| **Alignment Axis**          |                          | 当对结果Transform应用旋转时，此属性控制哪个轴将与命中的表面对齐。未对结果应用旋转时，此属性会隐藏。                                                                                            |
| **Behavior On Miss**        |                          | 控制Result Transform组件在未命中任何物体时应如何表现：                                                                                                                                                                                                |
|                             | *Do Nothing*             | 不对Result Transform做任何操作。（默认）                                                                                                                                                                                                                                      |
|                             | *Snap To Start*          | 将Result Transform移动到射线的起始点。如果启用了Apply Rotation，还会应用朝向射线检测组件后方的旋转。                                                                                                                     |
|                             | *Snap To End*            | 将Result Transform移动到射线的终点。如果启用了Apply Rotation，还会应用朝向射线检测组件后方的旋转。                                                                                                                       |
| **Parameter**               |                          | 用于向Avatar的动画器传递射线检测信息的前缀。更多详情，请参阅下方的[射线检测参数](/avatars/avatar-components/raycast/#raycast-parameters)。                                                                                              |

:::warning

每个Avatar最多只能有80个VRCRaycast组件。

出于兼容性原因，此限制与[FinalIK](/avatars/whitelisted-avatar-components/whitelisted-avatar-components/#root-motion-finalik)组件共享；通常，当VRCRaycast足以满足需求时，不应使用这些组件。

:::

## 射线检测参数 {#raycast-parameters}

`Parameter`属性允许你定义若干参数，用于向Avatar控制器传递射线检测信息。例如，在以下各项中，将Parameter设为`Beam`会将`{parameter}`替换为`Beam`

一旦`Parameter`被设为任意值，以下参数将被设置到Avatar的动画器上：

- `{parameter}_Hit` [Bool] - 射线是否命中了某物。

- `{parameter}_Ratio` [Float] - 范围0.0-1.0。射线在命中某物之前所经过的距离占总距离的比例。例如，如果它经过了配置的最大距离的一半，此值将被设为0.5（50%）。

- `{parameter}_Distance` [Float] - 射线在命中某物之前实际经过的世界距离。

当射线未命中任何物体时，`{parameter}_Ratio`和`{parameter}_Distance`参数的行为如下：

- 如果`Positioning On Miss`设为`Do Nothing`，这些参数都会保留上一次射线命中某物时的值。如果射线从未命中任何物体，它们都会被设为零。

- 如果`Positioning On Miss`设为`Snap To Start`，这些参数都会被设为零。

- 如果`Positioning On Miss`设为`Snap To End`，比例会被设为一，距离会被设为此组件允许射线检测行进的最大距离。


## 使用提示 {#usage-tips}
- 射线检测的最大距离限制为1000个单位。
- 不要将`VRCRaycast`组件所附加到的Transform或其任何父级用作它自己的结果Transform。这样做可能导致不可预测的行为，因为射线检测组件会被它自己的结果所移动。
- 启用gizmos时，在Avatar项目中选中`VRCRaycast`组件后，Scene 视图会绘制一条橙色线，显示射线检测的路径。
- 你可以在Avatar项目中进入播放模式，无需构建Avatar即可测试射线检测的行为。
