---
title: "构建管线回调与接口"
slug: "build-pipeline-callbacks-and-interfaces"
hidden: false
createdAt: "2023-04-11T21:01:07.855Z"
updatedAt: "2023-04-11T21:04:48.137Z"
---
VRChat SDK包含多个接口，可通过编辑器脚本使用，以增强世界和虚拟形象的构建流程。

## 用于场景组件 {#for-scene-components}

下文列出的接口可与`MonoBehaviours`结合使用，因此可以直接放置在场景对象上，这在需要持有某些特定场景引用以执行修改的情况下非常有用。

### IEditorOnly

`VRC.SDKBase.IEditorOnly`

该接口没有需要实现的成员。

你可以使用`IEditorOnly`将脚本标记为仅供编辑器使用，以通过SDK验证。这样，SDK在扫描你的世界或虚拟形象以查找不兼容的脚本时会忽略它。

### IPreprocessCallbackBehaviour

`VRC.SDKBase.IPreprocessCallbackBehaviour`

需要实现的成员

```csharp
public void OnPreprocess()
{
}

public int PreprocessOrder { get; }
```

此接口允许你在构建过程即将开始时执行自定义代码。如果你需要在内容被构建并上传到VRChat之前执行修改，这会很有用。

> 🚧 请注意，这不会自动绕过SDK验证。如果你的脚本直接存在于你上传的虚拟形象上，你还应使用`IEditorOnly`

## 用于项目级脚本 {#for-project-wide-scripts}

这些接口适用于任何不依赖特定场景对象，并在场景/虚拟形象上传到VRChat之前对其进行批量修改的场景。

### IVRCSDKBuildRequestedCallback

`VRC.SDKBase.Editor.BuildPipeline.IVRCSDKBuildRequestedCallback`

需要实现的成员

```csharp
    public int callbackOrder => 0;

    public bool OnBuildRequested(VRCSDKRequestedBuildType requestedBuildType)
    {
        return true;
    }
```



其中`VRCSDKRequestedBuildType`是如下形式的枚举

```csharp
public enum VRCSDKRequestedBuildType
{
    Avatar,
    Scene,
}
```



此接口允许你在VRChat SDK开始构建内容之前执行一些逻辑。

`OnBuildRequested`还可以通过返回`false`来中止构建。
