---
title: "VRChat 着色器全局变量"
slug: "vrchat-shader-globals"
hidden: false
createdAt: "2023-04-11T20:25:09.753Z"
updatedAt: "2023-04-11T20:28:55.746Z"
---
VRChat 提供了多个全局着色器参数，着色器创作者可以使用它们来实现 VRChat 特有的功能。

:::warning

请不要在本页所记录的内容之外，为自定义着色器中的着色器变量使用 `_VRChat` 前缀。该前缀被视为受保护的命名空间，随时可能引入新的变量，包括未记录的变量。

:::

以下着色器全局变量目前可用：

| 变量                                               | 类型     | 内容                                                                                                                                                                             |
| ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_VRChatCameraMode`                                    | `float`  | <ul><li>`0` - 正常渲染</li><li>`1` - 在 VR 手持相机中渲染</li><li>`2` - 在桌面模式手持相机中渲染</li><li>`3` - 为截图而渲染</li></ul> |
| `_VRChatCameraMask`                                    | `uint`   | 活动相机的 `cullingMask` 属性，在 `_VRChatCameraMode != 0` 时可用                                                                                               |
| `_VRChatMirrorMode`                                    | `float`  | <ul><li>`0` - 正常渲染，不在镜子中</li><li>`1` - 在 VR 中观看的镜子内渲染</li><li>`2` - 在桌面模式下观看的镜子内渲染</li></ul>                |
| `_VRChatFaceMirrorMode`                                | `float`  | 渲染面部镜子时为 `1`（VR 和桌面使用不同的相机类型！），否则为 `0`                                                                                       |
| `_VRChatMirrorCameraPos`                               | `float3` | 镜子相机的世界空间位置（与眼睛无关，在 VR 中“居中”），不在镜子中渲染时为 `(0,0,0)`                                                                  |
| `_VRChatScreenCameraPos`/<br />`_VRChatPhotoCameraPos` | `float3` | 主屏幕相机/<br />手持拍照相机的世界空间位置（相机未激活时为 `(0,0,0)`）                                                                         |
| `_VRChatScreenCameraRot`/<br />`_VRChatPhotoCameraRot` | `float4` | 主屏幕相机/<br />手持拍照相机的世界空间旋转（四元数）（相机未激活时为 `(0,0,0,0)`）                                                          |

## VRChat 时间全局变量 {#vrchat-time-global}

`_VRChatTime` 全局变量提供各类关于时间的信息。你可以将它们用于时钟或动画同步。

下面列出的所有全局变量都包含无符号整数位模式，应声明为 `uint`。以下表格列出了每个全局变量的内容，方括号中的数字是位范围（包含端点，从零开始索引）。

| 变量 | 内容 |
| --- | --- |
| `_VRChatTimeUTCUnixSeconds` | 当前 UTC 时间自 Unix 纪元以来秒数的低 32 位。请注意，此值应被视为无符号数，因此在 2038 年（尚）不会溢出。如果系统时间设置为 1970 年之前，此值未定义。 |
| `_VRChatTimeNetworkMs` | 同步的网络时间，单位为毫秒。这与 Udon 中 `Networking.GetServerTimeInMilliseconds` 返回的值相同。从技术上讲这是一个有符号值，但可以按无符号处理。它只应用于同步和偏移，因为其绝对值并不代表任何有意义的量。此值可能会回绕。 |

| 变量（位） | 内容 |
| --- | --- |
| `_VRChatTimeEncoded1` (0-4) | 当前一天中的时间（UTC）的小时部分。 |
| `_VRChatTimeEncoded1` (5-10) | 当前一天中的时间（UTC）的分钟部分。 |
| `_VRChatTimeEncoded1` (11-16) | 当前一天中的时间（UTC 与本地，共用）的秒部分。 |
| `_VRChatTimeEncoded1` (17-21) | 当前一天中的时间（本地）的小时部分。 |
| `_VRChatTimeEncoded1` (22-27) | 当前一天中的时间（本地）的分钟部分。 |
| `_VRChatTimeEncoded1` (28-31) | 保留。 |

| 变量（位） | 内容 |
| --- | --- |
| `_VRChatTimeEncoded2` (0-9) | 当前一天中的时间（UTC 与本地，共用）的毫秒部分。 |
| `_VRChatTimeEncoded2` (10) | 时区偏移的符号位。偏移为负时为 1。 |
| `_VRChatTimeEncoded2` (11-26) | 从 UTC 到本地时间的时区偏移，单位为秒。 |
| `_VRChatTimeEncoded2` (27-31) | 保留。 |

所有相对于 UTC 的时区偏移和本地时间值都受 VRChat 菜单中“首选时区”设置的影响。

“当前一天中的时间”始终指本地用户的一天中的时间。也就是说，如果虚拟形象上的自定义着色器使用这些值来显示时钟，它将始终显示观察者的本地时间，而不是穿戴者的本地时间。

时间值在 VRChat 客户端和所有 VRChat SDK 中于播放模式下可用。

VRChat SDK 附带一个头文件，其中包含用于解码时间格式的辅助函数。下面的 HLSL 代码片段展示了包含路径并列出了可用的函数：

```c
#include "Packages/com.vrchat.base/ShaderLibrary/VRCTime.cginc"

uint VRC_GetUTCUnixTimeInSeconds();
uint VRC_GetNetworkTimeInMilliseconds();
void VRC_GetUTCTime(out uint hours, out uint minutes, out uint seconds, out uint milliseconds);
void VRC_GetLocalTime(out uint hours, out uint minutes, out uint seconds, out uint milliseconds);
int VRC_GetTimezoneOffsetSeconds();
```
