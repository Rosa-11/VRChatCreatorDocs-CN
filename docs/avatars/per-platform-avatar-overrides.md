# 按平台的虚拟形象覆盖 {#per-platform-avatar-overrides}

按平台覆盖允许你为多个平台配置[跨平台](/platforms/android/cross-platform-setup)虚拟形象的不同版本。当你将虚拟形象构建并发布到多个平台时，SDK 会自动将虚拟形象的不同版本上传到每个选中的平台，并归在同一个虚拟形象 ID 下。

按平台覆盖让你可以轻松为 Android 上传优化版的虚拟形象，为 PC 上传功能完整的虚拟形象。

:::note

你可以通过执行多次上传而不更改虚拟形象 ID，来为不同平台手动上传虚拟形象的不同版本。但是，这比跨平台覆盖更繁琐、更耗时。

:::

# 设置 {#setup}

要设置按平台覆盖，请按照以下步骤操作：

1. 在同一场景中设置好你想使用的虚拟形象的所有版本。
2. 切换到 SDK 中的 Builder 选项卡。
3. 选择你想作为覆盖基础的虚拟形象。这将是你为点击「Multi-Platform Build & Publish」而在 SDK 的 Builder 面板中选择的虚拟形象
4. 点击「Selected Avatar」下拉菜单旁的 `⋮` 按钮。

![选项菜单](/img/avatars/per-platform-avatar-overrides/options-menu.png)

5. 在出现的弹窗中，按「Add per-platform override」。
6. 选择要进行覆盖的平台，然后选择该平台要使用的虚拟形象。

![按平台覆盖](/img/avatars/per-platform-avatar-overrides/per-platform-override.png)

- 对你想设置覆盖的所有平台重复此过程。
- 更改会自动保存，因此你可以继续执行多平台构建与发布。

设置按平台覆盖后，当你执行多平台构建时，SDK 将为每个平台构建并上传虚拟形象的「覆盖」版本。

设置覆盖后——你还会看到添加到虚拟形象对象根部的一个新组件，名为「VRC Per Platform Overrides」。该组件的功能与 Builder 面板中的按平台覆盖相同，但我们建议你使用 Builder 面板来设置覆盖。此组件主要用于查看现有覆盖以及在社区制作的工具中使用。

## 编辑器工具 {#editor-tooling}

如果你想创建一个可以查询虚拟形象按平台覆盖的编辑器工具，请使用以下方法：

```cs
using VRC.SDK3A.Editor;

//...

PerPlatformOverrides.GetPlatformOverrides(myAvatarGameObject);
```

它将返回 `List<PerPlatformOverrides.Option>`，如果没有设置任何覆盖，则返回 `null`。

你也可以使用以下方法自行设置覆盖：

```cs
using VRC.SDK3A.Editor;

//...

PerPlatformOverrides.SetPlatformOverrides(myAvatarGameObject, new List<PerPlatformOverrides.Option> {
    new PerPlatformOverrides.Option {
        platform = BuildTarget.Android,
        avatar = myAndroidAvatarDescriptor
    }
});
```

如果虚拟形象上尚不存在覆盖组件，这会自动添加它。

按平台覆盖目前仅设置在「主」虚拟形象对象上。因此，要获得完整情况，你通常需要扫描每个带有 `VRC_AvatarDescriptor` 的对象，以检查是否存在覆盖。
