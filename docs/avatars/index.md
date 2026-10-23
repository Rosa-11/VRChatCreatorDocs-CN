---
sidebar_position: 0
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 虚拟形象（Avatar） {#avatars}

VRChat 允许你创建并上传自定义虚拟形象！本分类介绍如何使用 VRChat 的 Avatars 3.0 SDK。

## 创建虚拟形象 {#creating-avatars}

要开始使用，请查看[创建你的第一个虚拟形象](/avatars/creating-your-first-avatar)。

侧边栏中有整个「Avatars」分类可供浏览。以下是一些影响更大、更重要的页面：

- [骨骼绑定要求](/avatars/rig-requirements)说明如何为 VRChat 设置自定义 3D 模型的层级结构。
- [虚拟形象性能等级系统](/avatars/avatar-performance-ranking-system)说明为什么有些虚拟形象能达到「Excellent」性能，而另一些则是「Very Poor」。
- [虚拟形象优化技巧](/avatars/avatar-optimizing-tips) —— 既然你已经知道_为什么_，就看看这个页面，了解如何找回所有的帧数。
- 继续阅读本页，了解 Avatars 3.0 SDK 的更多重要概念。

## 什么是 Avatars 3.0？ {#what-is-avatars-30}

**Avatars 3.0** 是我们对 VRChat 中所有虚拟形象功能的统称。AV3 的功能侧重于提升虚拟形象在 VRChat 中的表情、性能和能力。

Avatars 3.0 与[动作菜单](https://docs.vrchat.com/docs/action-menu)深度集成，用于控制并与你正穿戴的虚拟形象交互。在构建 AV3 虚拟形象之前，最好先进入游戏体验一下动作菜单！

## 前提条件 {#prerequisites}

- [安装并设置 VRChat Avatars SDK](/sdk)
- [创建你的第一个虚拟形象](/avatars/creating-your-first-avatar)

## 理解概念 {#understanding-the-concepts}

为了理解并使用 Avatars 3.0，你需要了解一些概念。这些概念将帮助你理解虚拟形象的构建方式、如何最好地组装它们，以及各种系统的预期用途。

### Unity 系统 {#unity-systems}

本文档的编写假定你对 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AnimatorController.html">Unity 动画器</UnityVersionedLink> 有一定了解。特别是，你应确保具备以下方面的基本实用知识：

- 动画器与动画
- 动画器图层、图层权重与混合
- 状态与过渡
- 动画器参数
- 状态行为
- 虚拟形象遮罩

了解以下内容也会有所帮助：

- 状态退出时间
- 动画的循环时间
- （高级）图层间的时间同步
- （高级）混合树

### 基础 {#basics}

使用 Avatars 3.0，你可以非常快速地创建一个带有模拟眼球运动和 viseme 的基础虚拟形象。

1. 导入你的虚拟形象，将骨骼绑定为 humanoid。设置你的材质等。
2. 添加 Avatar Descriptor 组件。
3. 如果你想要模拟眼球运动，定义眼部骨骼。
4. 如果你想要 viseme，定义 viseme 类型。在 Rigging Configuration 界面中指定颌部骨骼，或通过形态键定义你的 viseme。与 Avatar 2.0 相同。
5. 设置你的视点。
6. 构建并上传！

如果你要制作非 humanoid 虚拟形象，请阅读下面的通用虚拟形象部分。

你完成了！这将创建一个带有默认手势和动作的基础虚拟形象。有一些内置功能可供利用，所以即使有人套用一个以特定方式命名的形态键/骨骼的虚拟形象，你也能获得一些基础的 Avatar 3.0 功能。

然而，即使有了这些基础升级系统，仍有一些新功能。

### 本地虚拟形象测试 {#local-avatar-testing}

此功能允许你在不上传到 VRChat 的情况下迭代并测试虚拟形象。

在 VRChat SDK 控制面板的「Builder」选项卡中，你现在可以在「Offline Testing」部分选择「Build & Test」。点击后，你的虚拟形象将被构建，然后复制到以下文件夹：

- Windows：`%LocalAppdata%Low\VRChat\VRChat\Avatars`
- Linux：`$HOME/.local/share/VRChat/VRChat/Avatars/`

启动 VRChat 时，你可以通过查看 Avatar 菜单的「SDK Test Avatars」部分在本地访问此虚拟形象。当你修改虚拟形象并再次构建时，虚拟形象会更新；只需在菜单中重新选择该虚拟形象并再次点击「Apply」，你就会切换到新的测试虚拟形象。

或者，如果你使用 `--watch-avatars` 启动选项启动 VRChat，VRChat 将监视新构建的本地虚拟形象并自动将你切换过去。

本地构建的虚拟形象_仅_对你可见！对其他人来说，你看起来仍然穿着切换到本地测试虚拟形象之前所穿的那个虚拟形象。这可以让虚拟形象的迭代速度快上许多。我们希望你喜欢！

要删除复制过来的本地测试虚拟形象，请转到 VRChat SDK 控制面板的「Content Manager」选项卡。你会在底部的「Test Avatars」部分看到你的虚拟形象。点击「Delete」，当你重新打开 Avatar 菜单时，它就会从「SDK Test Avatars」部分消失。

### 模拟眼球运动 {#simulated-eye-movement}

模拟眼球运动是指你的眼睛会四处移动，看向你周围的事物。这不是_眼球追踪_，但它是一种让虚拟形象看起来更「有生气」的好方法。

你可以在编辑器中预览你的设置，并调整虚拟形象的眼睛在各种状态组合下的外观，这些状态用于确定你的眼部骨骼是如何设置的。

眨眼可以通过形态键或骨骼来处理。形态键是常用方法，但我们也加入了骨骼，以支持更多设置。

眨眼形态键由三个形态键定义，如下所述：

- Blink —— 双眼眨眼
- Looking Up —— 向上看时使用的形态键——用它来调整眼睛/虹膜/眼睑/眉毛的位置
- Looking Down —— 向下看时使用的形态键，用法与 Looking Up 类似

如果你不想使用这些形态键，可以将它们设置为 `-none-`。

此外，你会注意到两个滑块——一个从「Calm」到「Excited」，另一个从「Shy」到「Confident」。Calm / Excited 影响你眨眼的频率。Shy / Confident 影响你看其他玩家的频率，以及你的目光在其他玩家脸上停留多久才会移开。

我们讲到状态行为时会进一步介绍，但你可以在动画器中将状态设置为到达该状态时**禁用眼部动画**。你可以这样设置，就不必担心形态键被过度驱动，例如你的「开心」情绪会闭上眼睛，而眨眼仍在触发。

### 基于形态键 / 骨骼的 viseme {#blendshape--bone-based-visemes}

如果你只想沿用标准的颌部骨骼或基于形态键的 viseme，我们也已为你准备好。两者都仍然存在且工作正常。

此外，你现在还可以配置颌部骨骼 viseme 的角度，以获得一些额外的自定义！

不过，在 Avatars 3.0 中，你还可以访问一个动画器参数，它指示当前应播放哪个 viseme！这意味着只要你能为它制作动画，**你就能在 viseme 中使用它。** 不再需要为 2D 嘴巴、机器人等耍花招——你可以为你的 viseme 随意制作动画。

`Viseme` 动画器参数在所有 viseme 模式下都会更新。

### 代理动画 {#proxy-animations}

你可能会注意到 SDK 包含许多名为 `proxy_animationName` 的动画。这些动画是各种默认 VRChat 动画的「占位符」。如果你使用以 `proxy_` 开头的动画，VRChat 会尝试将其替换为内置动画。这可以在任何可播放图层中完成。

虽然当后缀不匹配我们的任何内置动画时，我们不会替换带有 `proxy_` 前缀的动画，但最好避免将任何动画命名为 `proxy_` 前缀。

### 使用自动脚步 {#use-auto-footstep}

这是 AV3 Avatar Descriptor 中的一个选项。它默认开启。

**「Use Auto Footstep」**仅适用于 3 点或 4 点追踪。关闭它意味着你禁用了房间尺度移动的程序化下半身动画。当你在 3 点或 4 点追踪下在房间空间中移动时，播放的就是这个程序化动画。

保持自动脚步开启（这是默认状态）仍允许你通过 Tracking Control 状态行为启用/禁用追踪。

如果自动脚步关闭，启用/禁用腿部和臀部的追踪将不起任何作用，你将完全依赖动画来驱动下半身。

### 强制移动动画 {#force-locomotion-animations}

这是 AV3 Avatar Descriptor 中的一个选项。它默认开启。

**「Force Locomotion Animations」**默认开启。它仅适用于 6 点追踪（全身追踪）。当「Locomotion Animations」开启时，在 FBT 中移动（即推动你的摇杆）将播放由你的 Base 可播放图层决定的行走/奔跑动画。

当「Locomotion Animations」关闭时，在 FBT 中移动不会播放行走/奔跑动画。如果你想用全身追踪动作来「模仿」行走，这会很有用。**如果你要关闭「Locomotion Animations」，请不要使用默认的 Base 和 Additive 图层。** 你需要自己制作！

### 状态的 Write Defaults {#write-defaults-on-states}

<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-State.html">Write Defaults</UnityVersionedLink> 是动画器控制器中每个状态都可用的一个选项。

Write Defaults「关闭」的状态只设置被动画的属性值，并且除非再次被动画，这些值不会改变。这可以让你更容易追踪任何特定图层中哪些属性被动画了。

Write Defaults「开启」的状态会为未被动画的属性设置默认值。这意味着如果你将某个属性值从「0」动画到「1」，退出该状态时该值将恢复为默认的「0」，除非后续状态继续将该值动画为「1」。

无论你选择哪个选项，**我们建议在整个虚拟形象中保持 Write Defaults 用法一致**——换句话说，所有状态都关闭 Write Defaults，或所有状态都开启 Write Defaults。在一个虚拟形象上同时存在「关闭」和「开启」状态已知会导致设置意外的属性值。这通常被称为「混合 Write Defaults」。如果 SDK 检测到你这样做了，会给出警告。

VRChat 在其内置和示例动画器中使用设置为「关闭」的 Write Defaults。

如果你决定将 Write Defaults 设置为「关闭」：
- 新建状态的 Write Defaults 默认设置为**开启**，因此你需要为创建的每个新状态更改此值。
- 你可能需要添加动画来以特定值初始化或重置属性。
- 建议对图层中的所有状态，显式地为该图层影响的每个属性添加动画。
- 每个状态都应有一个动画剪辑（状态选项中的「motion」），至少为一个属性添加动画。它不必是有效的属性引用。motion 为「None」或剪辑完全为空的状态将表现得好像 Write Defaults 为「开启」。

:::caution 叠加图层与直接混合树

VRChat 的虚拟形象创作者社区建议将 Write Defaults 设置为「开启」的情况：
- 使用叠加混合的图层
- 使用直接混合的混合树

即使虚拟形象的其余部分使用「关闭」，你也应这样做。在这些情况下，SDK 会避免生成关于混合 Write Defaults 设置的警告。

:::

### 通用虚拟形象 {#generic-avatars}

Avatar 3.0 也支持非 humanoid 的通用虚拟形象。如果你想获得 AV3 Humanoid 可用的类似功能，需要遵循几条准则：

- 将你的通用模型作为 FBX 导入，并为其指定「Generic」绑定类型，以便创建一个「avatar」对象
- 确保此 avatar 对象在虚拟形象根部的 Animator 组件的 avatar 字段中被引用（与 avatar descriptor 相同的 Game Object）。
- 保持动画器控制器为空（它会在运行时被剥离），并使用可播放图层来定义你的自定义动画控制器。通用虚拟形象有 3 个可播放图层：Base、Action 和 FX，因为其他图层是 Humanoid 专用的。

如果不遵循这些步骤，你的通用虚拟形象将无法使用许多 Avatars 3.0 功能，例如表情参数和状态行为。如果你觉得没关系，可以直接在根部动画器中添加动画控制器，保持 avatar 字段为空。如果你只是在 Unity 中构建一个静态对象的层级并想要简单的动画，这种方法可能会很有用。
