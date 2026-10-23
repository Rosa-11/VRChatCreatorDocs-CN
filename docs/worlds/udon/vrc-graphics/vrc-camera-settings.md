---
title: "VRC 相机设置"
slug: "vrc-camera-settings"
hidden: false
createdAt: "2025-02-21T18:46:09.500Z"
updatedAt: "2025-02-21T18:46:09.500Z"
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# VRCCameraSettings

通过此处列出的 API，提供有关用户屏幕相机、手持相机以及 Unity 全局质量设置的信息和有限控制。

你可以通过以下静态访问器访问该类的 2 个实例：

- `VRCCameraSettings.ScreenCamera`：用户的屏幕相机，即渲染其当前视图的相机（如果用户处于 VR 中，则为立体相机）
- `VRCCameraSettings.PhotoCamera`：用户的手持拍照相机。请注意，只有用户启用了相机时，该实例上的属性才会更新，你可以使用 `Active` 属性来检查这一点。还需注意，该属性始终指向渲染预览图像的相机，而不是用于拍摄照片本身的相机，也不是为串流相机渲染视图的相机（尽管按下快门时，大多数属性都会与它们双向同步）。
  - ⚠️ 在 ClientSim 中，该属性将为 `null`，因为不存在可用的拍照相机。在真实的 VRChat 客户端中，它永远不会为 `null`。

:::note

这两个属性在底层不一定总是指向单个真实的 `Camera` 组件。VRChat 为你抽象掉了部分复杂性，你永远不需要为此担心。但为完整起见，请注意以下内容：

- 更改 `VRCCameraSettings.ScreenCamera` 上的属性时，会影响[聚焦视图](/worlds/components/vrc_uishape/#focus-view)相机。
- 类似地，在“串流相机”模式下打开手持相机时所使用的组件，会在访问 `VRCCameraSettings.PhotoCamera` 时受到影响。
- `VRCCameraSettings.PhotoCamera` 也会关联到 Dolly Multi Cam 设置中使用的所有相机，尽管其中某些属性（如 `FieldOfView`）在它们之间可能有所不同。在这种情况下，将返回第一个相机的设置。

对于高级用例，可以通过 [`CameraMode`](#camera-mode) 属性读取此状态。

:::

### 公开的属性 {#exposed-properties}

这些实例将公开 Unity 的 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Camera.html">Camera</UnityVersionedLink> 类的某些属性（你可以参考 Unity 文档了解这些属性的详细信息）。请注意，出于安全原因，你将无法访问原始的 `Camera` 组件。不过，`Camera` 类对于你手动放入世界的组件是公开的。

目前以**只读**方式公开：

- `Vector3 Position`：世界空间位置
- `Quaternion Rotation`：世界空间旋转
- `Vector3 Forward`：世界空间前向向量，便捷属性
- `Vector3 Up`：世界空间上向向量，便捷属性
- `Vector3 Right`：世界空间右向向量，便捷属性
- `int PixelWidth` 和 `int PixelHeight`：当前渲染目标的大小（以像素为单位）（可能受 VR 超级采样设置的影响）
- `float Aspect`：渲染目标的当前宽高比
- `float FieldOfView`：相机的当前_垂直_视野（对 VR 用户可能不准确）
- `bool Active`：相机当前是否正在渲染。对 `ScreenCamera` 始终为 true，可用于通过 `PhotoCamera` 检测手持相机。当启用 Spout 串流时，`PhotoCamera` 的此值也为 `true`。
- `bool StereoEnabled`：如果用户处于 VR 中，`ScreenCamera` 的此值为 `true`。建议改用[玩家 API](/worlds/udon/players)来检测 VR 用户。


:::note

如果 `Active` 为 `false`，则 `Position` 和 `Rotation` 等变换数据将全部为 0。在这种情况下，`Forward/Up/Right` 将分别返回 `Vector3.forward/up/right`。

:::

目前以**读写**方式公开：

- `float NearClipPlane` 和 `float FarClipPlane`：你可以在运行时调整相机的裁剪平面。这遵循与通过场景描述符中的 Reference Camera 设置它们时类似的限制：
  - `NearClipPlane` 可能会被用户的“强制相机近距”设置调整。你可以在设置后回读该值来检测这种情况。
  - `NearClipPlane` 将被限制在 `0.001` 到 `0.05` 之间
  - `FarClipPlane` 最低只能设置为比 `NearClipPlane` 高 `0.1`，超出将被限制
  - 如果用户将“强制相机近距”设置为“动态”，调整 `FarClipPlane` 也可能调整 `NearClipPlane`
- `bool AllowHDR`：相机是否会将 HDR 值提交到渲染目标
- `DepthTextureMode DepthTextureMode`：可用于启用相机深度纹理渲染，这对某些着色器效果很有用。可以用它来替代启用阴影的实时灯光以强制生成相机深度纹理。但请注意，场景中存在这样的灯光不会改变 `DepthTextureMode` 属性，这意味着从此属性读取到 `None` 并_不_意味着场景中没有深度灯光在强制渲染深度通道。`PhotoCamera` 始终启用 `DepthTextureMode.Depth`，你无法禁用它，但可以叠加其他选项。
- `bool UseOcclusionCulling`：相机在渲染时是否使用遮挡剔除。默认为 `true`，但仅当你的世界烘焙了遮挡数据时才会生效。
- `bool AllowMSAA`：如果设置为 `false`，则无论用户设置如何，都会禁用此相机上的所有 MSAA（抗锯齿）。默认为 `true`，此时将使用用户的图形设置。
- `LayerMask CullingMask`：设置主相机要渲染的图层。除 `ScreenCamera` 外，为此属性赋值会抛出异常。任何 `reserved` [图层](/worlds/layers)、`MirrorReflection` 和 `InternalUI` 都无法更改。请注意，由于相机堆叠，在某些平台上即使 `InternalUI` 可见，读取到的值也可能为 0。
- `CameraClearFlags ClearFlags`：设置渲染此相机时使用的背景清除模式。
  - `Color BackgroundColor`：当 `ClearFlags` 设置为 `SolidColor` 时使用的颜色。
- `bool LayerCullSpherical`：~~请参阅 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Camera-layerCullSpherical.html">Unity 文档</UnityVersionedLink>。~~ 此 API 目前在 Udon 中已禁用，因为它会导致 UI 剔除问题。设置它不会产生任何效果。
- `float[] LayerCullDistances`：请参阅 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Camera-layerCullDistances.html">Unity 文档</UnityVersionedLink>。数组必须有 32 个条目，对应 GameObject 图层。某图层的值为 `0` 表示它将使用 `FarClipPlane` 的值。将此属性设置为 `null` 等同于为每个图层传入 `0`。
  - 与 `FarClipPlane` 一样，此值将被限制为最小 `NearClipPlane + 0.1`。任何 `reserved` [图层](/worlds/layers)和 `InternalUI` 都无法更改，且始终读取为 `0`。

### 相机模式 {#camera-mode}

`CameraMode` 属性在 `ScreenCamera` 和 `PhotoCamera` 上可用。

`ScreenCamera` 具有以下相机模式：

| 模式        | 描述                                                                                            |
|-------------|--------------------------------------------------------------------------------------------------------|
| Screen      | 用于渲染用户当前视图的默认模式。                                                |
| FocusView   | 当用户在移动设备上处于[聚焦视图](/worlds/components/vrc_uishape/#focus-view)时激活。 |

`PhotoCamera` 具有以下相机模式：

| 模式            | 描述                                                                   |
|-----------------|-------------------------------------------------------------------------------|
| PhotoOrVideo    | 相机处于拍照或串流模式。包括 Emoji 和贴纸等模式。 |
| Print           | 相机启用了“Prints”皮肤。                                          |
| DroneHandheld   | 相机处于无人机模式。                                                      |
| DroneFPV        | 用户正在以 FPV 模式操控无人机。                                     |
| Unknown         | 当 `Active` 为 `false` 时设置。                                                 |

### 静态函数 {#static-functions}

这些函数主要对 VR 用户有用，`VRCCameraSettings` 上公开了 2 个静态函数：

- `Vector3 GetEyePosition(Camera.StereoscopicEye eye)`：返回指定眼睛的世界空间位置。对非 VR 用户，等同于 `ScreenCamera.Position`。
- `Quaternion GetEyeRotation(Camera.StereoscopicEye eye)`：返回指定眼睛的世界空间旋转。对非 VR 用户，等同于 `ScreenCamera.Rotation`。

此外，还存在一个通用函数：

- `void GetCurrentCamera(out VRCCameraSettings internalComponent, out Camera externalComponent)`：这是 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Camera-current.html">Camera.current</UnityVersionedLink> 的替代方案，后者仅在渲染事件期间才会被填充。 
    - 当已知的内部相机正在渲染时，`internalComponent` 将包含 `VRCCameraSettings.ScreenCamera` 或 `VRCCameraSettings.PhotoCamera`，而 `externalComponent` 将为 `null`。 
    - 当你的世界中的自定义相机正在渲染时，`internalComponent` 将为 `null`，`externalComponent` 将包含 `UnityEngine.Camera` 组件。 
    - 当 `Camera.current` 为 `null` 时，_或_当 Udon 无法访问的相机正在渲染时（例如虚拟形象上的 `UnityEngine.Camera`），两个结果都将为 `null`。⚠️ 即使没有任何虚拟形象相机，此函数也可能在任何时候让两个结果都返回 `null`，即使在渲染事件期间也是如此。这是因为 VRChat 使用了一些内部渲染步骤，例如用于内置菜单。请务必在你的 Udon 脚本中处理这种情况！

## OnChanged 事件 {#onchanged-event}

当用户更改某些图形设置（如“近距裁剪覆盖”）时，会触发 [OnVRCCameraSettingsChanged](/worlds/udon/graph/event-nodes/#onvrccamerasettingschanged) 事件。

此事件可能每帧触发，甚至单帧内触发多次。建议尽量做最少的处理，以避免影响性能。

## 示例 {#example}

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![在 Start 时以及每当其变化时打印屏幕尺寸和 FOV 的 Udon Graph。](/img/worlds/udon/vrc-graphics/basic-camera-settings-example.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using TMPro;
using UdonSharp;
using UnityEngine;
using UnityEngine.UI;
using VRC.SDK3.Rendering;
​
public class CameraInfoDisplay : UdonSharpBehaviour
{
    [SerializeField] private TextMeshProUGUI info;

    void Start()
    {
        // 调用一次以进行初始化
        OnVRCCameraSettingsChanged(VRCCameraSettings.ScreenCamera);

        Debug.Log($"Started CameraInfoDisplay at resolution of {VRCCameraSettings.ScreenCamera.PixelWidth}x{VRCCameraSettings.ScreenCamera.PixelHeight}");
        Debug.Log($"The handheld photo camera is {(VRCCameraSettings.PhotoCamera.Active ? "enabled" : "disabled")}");
    }
​
    // 当分辨率或其他几个属性变化时会被调用
    public override void OnVRCCameraSettingsChanged(VRCCameraSettings camera)
    {
        // 忽略手持拍照相机
        if (camera != VRCCameraSettings.ScreenCamera)
            return;

        info.text = $"{camera.PixelWidth}x{camera.PixelHeight} fov={camera.FieldOfView} frame={Time.frameCount}°";
    }
}
```

</TabItem>
</Tabs>
