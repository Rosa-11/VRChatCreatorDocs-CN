---
title: "公共SDK API"
slug: "public-sdk-api"
hidden: false
createdAt: "2023-08-18T21:01:07.855Z"
updatedAt: "2023-08-18T21:04:48.137Z"
---

VRChat SDK提供了一组接口和方法，可用于增强你的世界和虚拟形象的构建流程。

你可以在两个SDK中找到 **Public SDK API** 文件夹：

- 对于世界：Packages/VRChat SDK - Worlds/Editor/VRCSDK/SDK3/Public SDK API
- 对于虚拟形象：Packages/VRChat SDK - Avatars/Editor/VRCSDK/SDK3A/Public SDK API

不过，大多数事件和方法在世界SDK和虚拟形象SDK之间是共享的，并定义在 **Base SDK Package** 中：`Packages/VRChat SDK - Base > Editor/VRCSDK/Dependencies/VRChat/Public SDK API`。

其他标记为`[PublicAPI]`的方法也属于公共SDK API。例如，用于更新内容描述的 "Packages/VRChat SDK - Base/Editor/VRCSDK/Dependencies/VRChat/API/VRCApi.cs"。

:::note

这些类型位于会被自动引用的程序集定义中。如果你在自己的项目中编写代码，这些类型通常默认就可用。如果你正在编写可再分发的包并拥有自己的程序集定义，则需要添加相应的程序集定义引用：

对于虚拟形象：`VRC.SDK3A.Editor`  
对于世界：`VRC.SDK3.Editor`  
对于两者：`VRC.SDKBase.Editor`

:::

# 有哪些可用内容？ {#whats-available}

如需最新的事件和方法列表，我们建议直接查看上文提到的文件。

但以下是可用内容的简要列表：

- 主SDK面板的OnEnable/OnDisable事件
- 构建开始/结束事件
- 上传成功/错误事件
- Build、Build and Test以及Build and Upload方法

:::note
如果你在构建过程中遇到异常，可以在接口定义中查看预期异常的列表。
:::
## 示例 {#examples}

### 获取构建器实例 {#getting-an-instance-of-a-builder}

连接到`OnSdkPanelEnable`可确保SDK窗口已打开且构建器已注册。然后你可以使用`TryGetBuilder`来获取所需构建器的实例。

> 你可以在任意时刻调用`VRCSdkControlPanel.TryGetBuilder`，但如果SDK窗口未打开，或你尝试访问的构建器不可用，它将返回false。

```cs
[InitializeOnLoadMethod]
public static void RegisterSDKCallback()
{
    VRCSdkControlPanel.OnSdkPanelEnable += AddBuildHook;
}

private IVRCSdkAvatarBuilderApi _builder;

private static void AddBuildHook(object sender, EventArgs e)
{
    VRCSdkControlPanel.TryGetBuilder<IVRCSdkAvatarBuilderApi>(out _builder);
}
```

### 在构建前运行代码 {#running-code-before-the-build}

`OnSdkBuildStart`在SDK启动构建流程之前运行，但会在验证和构建请求回调通过之后运行。

```cs
[InitializeOnLoadMethod]
public static void RegisterSDKCallback()
{
    VRCSdkControlPanel.OnSdkPanelEnable += AddBuildHook;
}

private static void AddBuildHook(object sender, EventArgs e)
{
    if (VRCSdkControlPanel.TryGetBuilder<IVRCSdkAvatarBuilderApi>(out var builder))
    {
        builder.OnSdkBuildStart += OnBuildStarted;
    }
}

private static void OnBuildStarted(object sender, object target)
{
    Debug.Log("Building " + ((GameObject) target).name);
}
```

### 通过脚本构建 {#building-from-script}

```cs
[MenuItem("My Tools/Build Selected Avatar")]
public static async void BuildSelectedAvatar()
{
    var avatar = Selection.activeGameObject;
    if (!VRCSdkControlPanel.TryGetBuilder<IVRCSdkAvatarBuilderApi>(out var builder)) return;
    try {
      await builder.BuildAndTest(avatar);
    } catch (Exception e) {
      Debug.LogError(e.Message);
    }
}
```
## 注意事项 {#heads-up}
:::caution
如果你目前通过反射来访问SDK内部实现，我们建议尽快改用公共API。
:::
我们将尽最大努力提供稳定的API，但它未来仍可能发生变化。我们建议利用语义化版本来定义你的工具与哪个版本的SDK兼容。[在此了解更多](https://vcc.docs.vrchat.com/vpm/packages/#versions-and-ranges)。

