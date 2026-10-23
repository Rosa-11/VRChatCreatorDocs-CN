# 骨骼绑定要求 {#rig-requirements}

:::caution

本页面已严重过时，但大部分内容应该仍然准确。
:::

本页说明配置虚拟形象骨骼绑定、骨骼和骨架的一些要求。如果遵循这些要求，你虚拟形象的四肢在 VRChat 中应该能正确移动。

你也可以查看 [SDK 构建面板](/avatars/creating-your-first-avatar#step-6---going-to-the-build-tab--checking-if-the-avatar-is-ok)，并在其中查找「Validations」部分的错误。
## 导出设置 {#export-settings}

从你选择的 3D 编辑器导出骨骼绑定时，确保坐标设置正确。大多数情况下，默认值就是正确的。

对于 Blender，确保你的静止 X 旋转为 90 度。
## Humanoid 骨骼绑定 {#humanoid-rig}
如果你的 humanoid 骨骼绑定配置不满足 Mecanim 对 humanoid 的要求，Unity 会标记它。请阅读并熟悉 [Unity 关于配置虚拟形象的文档](https://docs.unity3d.com/Manual/FBXImporter-Rig.html)。

:::danger Humanoid 虚拟形象必须映射头部、手部和脚部骨骼。

如果你的虚拟形象骨骼绑定是 humanoid 但未映射必要的骨骼，你将在 VRChat Build Control Panel 中看到此消息。",

:::

:::note 非人类虚拟形象

如果你的虚拟形象与人类差异很大（例如四足动物、驼背怪物等），你应考虑使用 Generic 绑定和你自己的动画控制器。参见 SimpleAvatarController 获取示例。这比制作 humanoid 更高级，因此你应非常熟悉 Unity 的动画控制器系统。
:::

## 手指映射 {#finger-mappings}

:::caution 拇指、食指和中指骨骼未映射，全身 IK 将被禁用。

**此警告不会出现在 SDK3 虚拟形象上，因为它们在使用了没有手指骨骼的骨架时没有问题。** 此错误仅在使用已弃用、不应使用的 VRChat SDK2 时出现。

要获得完整 IK（允许蹲伏和自动脚部放置），你需要映射这三根手指骨骼。如果你忽略此警告，你的虚拟形象将无法蹲伏，其双脚也无法自动迈步（除非你使用控制器移动）。

它还会阻止手部手势上的自定义动画覆盖被播放。（SDK 中的警告目前**没有**提到这一点。）
:::

## 脊柱层级 {#spine-hierarchy}

:::danger 你的骨骼绑定在 Humanoid Rig 中映射了 UPPERCHEST。这会导致 IK 出问题。

**此警告不会出现在 SDK3 虚拟形象上，因为它们在使用了映射了上胸部的骨架时没有问题。** 此错误仅在使用已弃用、不应使用的 VRChat SDK2 时出现。

如果你必须使用 SDK2，在配置 humanoid 时将上胸部骨骼留空。
:::

:::danger 脊柱层级缺少元素，请确保映射了 Pelvis、Spine、Chest、Neck 和 Shoulders。

这些骨骼都必须映射。如果你收到此消息，请确保这些槽位都没有留空。注意，Neck 和 Chest 槽位对 Mecanim 是可选的，但对 VRChat 是必需的。
:::

:::danger 脊柱层级不正确。请确保两个 Shoulders 和 Neck 的父级都是 Chest。

要使 IK 正常工作，你必须在胸部周围有特定的骨骼层级。在你的骨骼绑定中，你的肩部骨骼（映射到 Left Arm > Shoulder、Right Arm > Shoulder 槽位）必须是你胸部骨骼（映射到 Body > Chest 槽位）的直接子级。此外，颈部骨骼（映射到 Head > Neck 槽位）也必须是 Chest 的直接子级。
:::

## 手臂和腿部层级 {#arm-and-leg-hierarchy}

:::caution LowerArm 不是 UpperArm 的第一个子级，或 Hand 不是 LowerArm 的第一个子级：你的前臂旋转可能会出问题。

VRChat 的 IK 系统在确定骨骼布局时会查看骨骼的第一个子级。如果你的骨骼绑定中还有其他子骨骼，例如道具放置骨骼或扭转骨骼，它们可能会干扰 IK。在这个特定情况下，SDK 发现你的 LowerArm 不是 UpperArm 骨骼列表中排在第一位的子级。

要修复此问题，请将该子骨骼移到父骨骼子级列表的第一位。**你需要解包虚拟形象预制件才能这样做。**

注意，此消息命名的是槽位，而不是你骨骼绑定中的实际骨骼名称，因此你需要查看该槽位中是哪根骨骼。
:::

:::caution LowerLeg 不是 UpperLeg 的第一个子级，或 Foot 不是 LowerLeg 的第一个子级：你的小腿旋转可能会出问题。

见上文。
:::

## 眼部骨骼 {#eye-bones}

按如下方式配置虚拟形象的眼部骨骼：

- Y 轴应朝上。
- Z 轴应朝前。
## 一般层级 {#general-hierarchy}

:::caution 此虚拟形象的层级是分裂的（Hips 骨骼不是所有 humanoid 骨骼的祖先）。IK 可能无法正常工作。

某些骨骼绑定会将层级分成上下两部分。在这种情况下，你放入 Body > Hips 槽位的骨骼必须是你所映射的其他人类骨骼的祖先（父级或更高）。使用这类骨骼绑定时要非常小心！通常，这些骨骼的祖先是一个位于地面的根骨骼或其他位置，这对于髋部骨骼来说是不好的位置。许多这类骨骼绑定不适合与 VRChat 一起使用，需要重新绑定才能正常工作。
:::

## 全身追踪 {#full-body-tracking}
如果你使用全身追踪，即有 3 个 HTC 追踪器连接，则有一些特殊注意事项。有几项建议可以确保你的虚拟形象在使用全身追踪时表现良好。

要查看全身追踪骨骼绑定要求的更详细信息，请参阅我们的[全身追踪系统指南](https://docs.vrchat.com/docs/full-body-tracking)。
:::caution 骨盆与大腿骨骼之间的角度应接近 180 度（此虚拟形象的角度为 ___）。你的虚拟形象可能无法很好地配合全身 IK 和追踪。

全身追踪对髋部与上腿骨骼之间的角度很敏感。最好在 AvatarTPoseController 应用到你的虚拟形象时测量此角度。理想情况下，在 TPose 中髋部骨骼笔直朝上，上腿骨骼笔直朝下，但轻微偏差是可以的。如果你不打算使用全身追踪，可以忽略此消息。
:::

## 脚趾骨骼 {#toe-bones}
在 humanoid 虚拟形象中不要求映射脚趾骨骼。但是，如果你确实映射了它们，你的虚拟形象就能踮起脚尖上下移动。映射脚趾还能让自动迈步看起来更自然，并通过将自动站姿对齐到脚趾骨骼起点而非脚跟来改善平衡感。
