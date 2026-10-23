import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# VRCGraphics

Udon 可以访问 Unity 提供的多种图形函数。

## 类型 {#types}

### VRCShader

用于全局着色器设置器的总括类。更多内容请参阅[下文记录的函数](#vrcshaderpropertytoid)。

### VRCGraphics

公开了 Unity 内置 `Graphics` 类的一个子集。更多内容请参阅已记录的函数。

## VRCCameraSettings 与 VRCQualitySettings {#vrccamerasettings--vrcqualitysettings}

提供有关用户屏幕相机、手持相机以及 Unity 全局质量设置的信息和有限控制。更多内容请参阅 [VRCCameraSettings](/worlds/udon/vrc-graphics/vrc-camera-settings)。

## 公开的函数 {#exposed-functions}

### VRCGraphics.Blit()

使用着色器将源纹理复制到目标 RenderTexture 中。请注意，我们不允许你提供空的目标。

请参阅 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Graphics.Blit.html">Graphics.Blit</UnityVersionedLink>。

查看[小地图示例](/worlds/examples/minimap)以了解更多关于如何使用 VRCGraphics.Blit() 的内容。

![小地图示例世界](/img/worlds/examples/minimap-example-world.png)

#### Meta Quest 的例外情况 {#meta-quest-exceptions}

除非你执行以下操作，否则 VRCGraphics.Blit 无法在 Quest GPU 上工作：

在着色器中添加 ZTest Always
或
关闭目标 RenderTexture 的深度。

若不这样做，该操作将会失败。

### VRCGraphics.DrawMeshInstanced()

使用 GPU 实例化多次绘制同一个网格。

请参阅 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Graphics.DrawMeshInstanced.html">Graphics.DrawMeshInstanced</UnityVersionedLink>。

### VRCShader.PropertyToID()

使用 PropertyToID 根据着色器属性名称获取 ID。请在初始化时只调用一次该函数，该 ID 可以重复使用，且不会改变，即使在不同材质和着色器之间也是如此。

请注意，属性名称必须以“\_Udon”为前缀，或是字面字符串“\_AudioTexture”，才能与 VRCShader.SetGlobal 配合使用；不过无论如何，它仍然会返回该 ID。

请参阅 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Shader.PropertyToID.html">Shader.PropertyToID</UnityVersionedLink>。

### VRCShader.SetGlobal()

使用通过 PropertyToID 获取的 ID 作为键，并指定类型正确的值。该值将在世界中的 _全部_ 着色器中可用（包括虚拟形象上的着色器！），名称即为传入 PropertyToID 的名称。

可用的变体：

  * VRCShader.SetGlobalColor()
  * VRCShader.SetGlobalFloat()
  * VRCShader.SetGlobalFloatArray()
  * VRCShader.SetGlobalInteger() 目前由于 Unity 的一个 bug，仍将值设置为 `float`
  * VRCShader.SetGlobalMatrix()
  * VRCShader.SetGlobalMatrixArray()
  * VRCShader.SetGlobalTexture()
  * VRCShader.SetGlobalVector()
  * VRCShader.SetGlobalVectorArray()

# 额外的着色器全局变量 {#additional-shader-globals}

VRChat 公开了一些特殊的全局着色器变量，你可以在任何自定义虚拟形象或世界着色器中使用它们。它们列在[此处](/worlds/udon/vrc-graphics/vrchat-shader-globals)。
