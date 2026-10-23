---
sidebar_position: -1
---
# 创建你的第一个虚拟形象 {#creating-your-first-avatar}

VRChat 拥有数千万个虚拟形象，而且任何人都可以创作它们！本页说明如何创建你的第一个 VRChat 虚拟形象。创建虚拟形象有两种方式：

- 你可以使用[虚拟形象创建工具](https://hello.vrchat.com/avatar-systems)在不使用 Unity 的情况下创建简单的虚拟形象。
- 你可以使用 [Creator Companion](https://vcc.docs.vrchat.com/) 安装 [Unity](https://unity.com/)、安装 [VRChat 软件开发套件（SDK）](https://creators.vrchat.com/sdk/)，并上传自定义虚拟形象。

## 要求 {#requirements}

要使用 Unity 和 VRChat SDK 上传自定义虚拟形象，你必须满足以下要求：

- 你必须拥有 [VRChat.com](https://vrchat.com/) 上的账户。
  - 如果你使用 Steam 或 Meta 账户游玩，需要先[关联你的账户](https://help.vrchat.com/hc/en-us/articles/360062659053-I-want-to-turn-my-platform-account-through-Steam-Meta-Pico-or-Viveport-into-a-VRChat-account)。
- 要上传虚拟形象，你的 VRChat 账户必须具有“New User”或更高的[信任等级](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system#trust-rank)。
  - 如果你是 VRChat 新手，在你获准上传虚拟形象后会收到一封邮件。
  - 在达到该信任等级之前，你仍然可以在本地构建并测试虚拟形象。这意味着你可以制作并测试自己的虚拟形象，但只有你自己能看到它。

:::tip 需要帮助？

如果你卡住了或需要帮助，可以从以下途径获取帮助：
- 浏览 VRChat 的[官方文档](https://creators.vrchat.com/)。 
- 访问 VRChat 的[官方论坛](https://ask.vrchat.com/)或 [Discord 服务器](https://discord.com/invite/vrchat)，向社区提问。

:::

## 第1步 - 选择一个 3D 模型 {#step-1---choose-a-3d-model}

也许你已经有一个想用作虚拟形象的 3D 模型，也可能是第一次下载 3D 模型。请从以下四种方式中选择一种开始：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="option-avatar-step-one">
<TabItem value="avatar-creation-tool" label="1. 使用虚拟形象创建工具" default>

如果你从未使用过 Unity 或 VRChat SDK，可以试试以下虚拟形象创建工具：

- [VRChat Avatar Systems](https://hello.vrchat.com/avatar-systems) 页面列出了几款对新手友好的虚拟形象创建工具。
 	- 这些工具类似于在电子游戏中自定义你的角色。
 	- 这些工具不需要 VRChat SDK！如果你使用它们，可以跳过本页中的其他所有步骤。
        - 任何 VRChat 用户都可以使用这些工具。你不需要[“New User”信任等级](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system#trust-rank)。
- [VRoid Studio](https://vroid.com/en/studio) 是一款动漫主题的角色创建器，用于制作 VTuber 风格的模型。
	- 角色拥有数百个自定义滑块，并且可以手绘。
	- 想了解它能做些什么，可以看看 [VRoid subreddit](https://www.reddit.com/r/VRoid/)。
	- 它也可以在 [Steam](https://store.steampowered.com/app/1486350/VRoid_Studio_v1263/) 上获取。
	- ⚠VRoid Studio 输出的虚拟形象为 **.vrm** 格式，Unity 并不原生支持该格式！
		- 如果你想直接导入 VRoid Studio 模型并在 VRChat 中使用，可能需要了解社区制作的 [VRMtoVRChat converter](https://github.com/esperecyan/VRMConverterForVRChat)，它用于 .vrm 虚拟形象。如果你要使用它，请务必[阅读该插件的文档](https://www.store.vket.com/ec/items/122/detail/)。

</TabItem>
<TabItem value="example-avatar" label="2. 使用 VRChat 的示例虚拟形象">

如果你想把自建虚拟形象上传到 VRChat，就需要使用 VRChat SDK。

如果你是 VRChat SDK 新手，建议先上传内置的[示例虚拟形象](/avatars/creating-your-first-avatar#try-vrchats-example-avatar)。

成功上传示例虚拟形象之后，再尝试上传你自己的虚拟形象！

</TabItem>
<TabItem value="find-model" label="3. 下载一个模型">

互联网上有许多商店，你可以在那里下载免费或付费的 VRChat 虚拟形象。

有些商店出售可用于 VRChat 或其他应用的 3D 模型。这些虚拟形象非常适合用来了解 VRChat SDK 以及创建你自己的 VRChat 虚拟形象。

- [100 avatars](https://github.com/PolygonalMind/100Avatars) 是一个包含数百个虚拟形象的免费合集。它们简单易用，很容易导入 VRChat SDK。 
- [Unity Asset Store](https://assetstore.unity.com/) 提供免费和付费的 3D 模型。它们很容易导入 Unity，通常也与 VRChat SDK 兼容，但可能包含无法正常工作的资源或脚本。

有些商店出售已经为 VRChat 准备好的虚拟形象。它们可以让你在 Unity 中设置虚拟形象时跳过一些步骤，但也可能包含本文未涉及的高级功能。如果你只想要一个好看的虚拟形象，而不太在意学习如何自己创建，它们会很合适。 

- [BOOTH](https://booth.pm/en/items?tags%5B%5D=VRChat) 是一家日本的 VRChat 虚拟形象商店。它是动漫风格虚拟形象最大的商店，不过你也能在那里找到其他类型的虚拟形象。
- [Gumroad](https://gumroad.com/discover) 在西方创作者中更流行，主要面向动漫风格和兽人风格虚拟形象。
- [Jinxxy](https://jinxxy.com/) 和 [Avatown](https://goavatown.com) 也有可用于 VRChat 的虚拟形象合集。
  
在寻找模型时，请尽量记住以下几点：
- 如果你决定从资源商店以外的地方获取模型，请确保模型已由作者完成完整的“骨骼绑定”。
 	- “已绑定”的模型带有一套可以使其活动的骨架。创建骨骼绑定可能非常困难，但 [Mixamo](https://www.mixamo.com/) 和 [Rigify](https://docs.blender.org/manual/en/latest/addons/rigging/rigify/index.html) 等工具可以自动完成。
	- 你还应检查模型是否为[与 Unity 兼容的格式](https://docs.unity3d.com/Manual/3D-formats.html)，例如 `.fbx`。
- 确保你拥有在 VRChat 中使用该模型的许可。
	- 大多数资源商店会在 3D 模型的商店页面上展示其许可协议。
	- 在无许可的情况下使用它们，会侵犯模型作者的权利，并违反 [VRChat 服务条款](https://hello.vrchat.com/legal)。 
- 确保你使用的模型[在 Meta Quest 上的 VRChat 中低于 20,000](/avatars/avatar-performance-ranking-system#mobile-limits)，且[在 PC 上低于 70,000 个三角形](/avatars/avatar-performance-ranking-system#pc-limits)。
	- 上传三角形数量过多的虚拟形象可能会造成性能问题。
	- 在 PC 上，你可以上传超过该限制的模型，但虚拟形象会被评为“Very Poor”性能等级，这意味着能看到它的玩家会更少。

</TabItem>

<TabItem value="create-avatar" label="4. 创建一个模型">

虽然大多数用户会选择找一个模型作为起点，但任何人都可以从零开始创建虚拟形象模型。你可以使用任何你喜欢的三维软件，只要它支持导出带骨架的 FBX 文件。[Blender](https://www.blender.org/) 免费且非常常用。

如果你以前从未做过 3D 建模，这可能会是一段漫长旅程的开始。学习如何建模、绑定骨骼以及为 3D 模型制作纹理都非常复杂。创建 VRChat 虚拟形象则需要综合_所有这些技能_！

如果你选择自己创建模型，我们建议从非常简单的东西开始。即使它看起来不如现成模型那么炫酷，它也是_你的_模型，你可以随意处置它。

为了帮你入门，这里有一位社区成员制作的 VRChat 专题教程：
- [Rainhet 的 Blender 3D 虚拟形象教程（2022）](https://www.youtube.com/watch?v=OKWsUAIsgpg&list=PL2EEbgwoJzdsC9wfKA2ZO2kAf4HDqC8a8&index=1) - Rainhet 的教程是长篇形式，她在讲解过程中会详尽地解释所有内容。
- [Rainhet 的 3D 虚拟形象课堂](https://www.youtube.com/watch?v=w-yhjgnhaNw) - 该教程系列的早期版本。还有一个[10分钟版本](https://www.youtube.com/watch?v=in9rNze4FD4)，可以让你了解整个流程的全貌。

import FeedbackButton from "@site/src/components/FeedbackButton";

如果你有想推荐的教程，请点击 <FeedbackButton /> 按钮推荐。

</TabItem>

</Tabs>

## 第2步 - 设置 VRChat SDK {#step-2---set-up-the-vrchat-sdk}

恭喜你选好了或做出了一个模型！在继续之前，你需要设置 [VRChat Creator Companion](https://vcc.docs.vrchat.com/)。它将帮助你安装 [Unity](https://unity.com/) 并创建带 [VRChat SDK](/sdk) 的项目。观看下面的视频开始吧！

<div class="video-container">
    <iframe src="https://www.youtube.com/embed/0u1g0TYoJsU" title="VRChat Creator Companion" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

阅读 Creator Companion 的[入门指南](https://vcc.docs.vrchat.com/guides/getting-started)页面以了解更多。创建好 Unity 项目后，你就可以继续了！

:::tip

刚接触 Unity？访问 [Unity Learn](https://learn.unity.com/) 获取免费的入门教程。
:::

### 试用 VRChat 的示例虚拟形象 {#try-vrchats-example-avatar}

在把你自己的 3D 模型导入 Unity 之前，你可以先试着使用 VRChat 的示例虚拟形象。这样你就能在不必担心 3D 模型相关问题的情况下学习如何上传虚拟形象。

打开你的虚拟形象项目，前往“VRChat SDK > Samples > Avatar Dynamics Robot Avatar”。

![示例虚拟形象可以帮助你了解一个完整的 VRChat 虚拟形象项目大致是什么样子。](/img/avatars/creating-your-first-avatar-3dfc191-Unity_YrUFLEWWDe.png)

如果示例虚拟形象加载成功，你可以跳到[第6步](/avatars/creating-your-first-avatar#step-6---going-to-the-build-tab--checking-if-the-avatar-is-ok)。如果你更想导入自己的虚拟形象，请继续下面的第3步。

## 第3步 - 将模型导入项目 {#step-3---get-the-model-into-your-project}
现在你已经设置好 VRChat SDK，是时候把模型导入项目了。如果模型来自资源商店，你可以下载并直接将其导入项目。如果模型来自其他地方，你需要把它以及相关纹理导入你的“Assets”文件夹。

如果你要从 3D 编辑器导入模型，请注意坐标系之间的差异。例如，[**Blender**](https://blender.org) 的默认坐标与单位系统与 Unity 不同。你必须从 Blender 导出 FBX 文件，并按如下方式设置导出器：

![图像](/img/avatars/creating-your-first-avatar-b066a1b-2022-05-27_11-13-48_blender.png)

模型进入资源文件夹后，选中它，你需要确保它在检视面板的 Rig 选项卡中具有正确的设置。请确保 Animation Type 设置为 Humanoid。

## 第4步 - 将模型放入场景 {#step-4---get-the-model-into-a-scene}
现在模型已经在你的 Assets 文件夹中，并应用了正确的设置，你需要把它放进场景。做法是将它拖入[层级视图](https://docs.unity3d.com/Manual/Hierarchy.html)，或直接拖到 Scene 视图窗口中。我们建议每个虚拟形象使用一个场景，并将其放置在坐标 (0, 0, 0) 处。如有需要，旋转虚拟形象使其直立，并确认它的尺寸符合你的预期。你可以往场景中添加一个 Cube 来做对比——立方体每边 1 米，而你的虚拟形象在大约 0.5-5 米高时表现最佳。普通人的身高大约为 1.65 米。
:::caution 虚拟形象优化

对你的虚拟形象进行优化非常重要，否则你自己和其他人的帧率都会变低。如果有什么看起来不对劲，SDK 会提示你。请查看我们的[虚拟形象优化技巧](/avatars/avatar-optimizing-tips)，了解提升虚拟形象性能等级的方法。
:::
## 第5步 - 添加 Avatar Descriptor {#step-5---adding-an-avatar-descriptor}
下一步是添加“VRC Avatar Descriptor”组件并配置它的设置。
1. 在层级视图中选中虚拟形象。
2. 在检视面板中点击“Add Component”。
3. 搜索“VRC Avatar Descriptor”组件并添加它。
4. 按下面的说明自定义它的设置。

![添加 `VRC Avatar Descriptor` 即可开始设置你的虚拟形象。](/img/avatars/creating-your-first-avatar-fd027ea-Unity_qH7NJfAzzn.png)
### 视图位置 {#view-position}
首先，你需要设置视图位置。这将决定你的相机在 VRChat 中的位置。你可以在场景中看到它的小白球可视化表示。

如果你的虚拟形象有头部，请把视图位置放在虚拟形象的两眼之间。如果你的虚拟形象头部异常大，在上下看时它的脚可能会离地。为避免这种情况，请把视图位置放在接近普通大小头部所在的位置。

如果你的虚拟形象没有头部，请把视图位置放在你认为合适的地方。

![使用 Avatar Descriptor 为 VRChat 配置你的虚拟形象。一定要调整视图位置！](/img/avatars/creating-your-first-avatar-5afcbf1-Unity_lsTjP8qDqO.png)
### 口型同步模式 {#lip-sync-mode}
当你说话时，你可以让虚拟形象的嘴（或其他任何部位）自动做出反应。打开你的 `VRC Avatar Descriptor` 并展开 `LipSync` 下拉菜单。你可以从五种口型同步模式中选择一种：

#### 默认 {#default}
![通常只需点击“Auto Detect!”，就足以让你的 VRChat 虚拟形象对你的语音做出反应。](/img/avatars/creating-your-first-avatar-d69289f-Unity_FgsAtEU75F.png)

点击“Auto Detect!”，让 VRChat SDK 自动检测合适的口型同步模式。随后模式会切换到下面某种模式。

#### Jaw Flap Bone
如果你的虚拟形象使用单根骨骼来驱动下巴动画，可以在这里指定它。你的角色下巴会根据你在 VRChat 中说话的音量大小而张开。请确保你已在 Unity 的 Humanoid 骨骼绑定中为该虚拟形象配置了下巴骨骼。

#### **Viseme Blend Shape**（推荐） {#viseme-blend-shape-recommended}
形态键（blend shape / shape key，具体名称取决于你使用的软件）会基于顶点位置修改网格。许多模型都用它来实现发声时的精细动画。如果你的模型带有这些，就应该使用它们！

我们使用 Oculus Audio 库来检测并设置视位（viseme）。[你可以在此查看所有视位应该是什么样子，以及哪些声音会触发它们](https://developer.oculus.com/documentation/unity/audio-ovrlipsync-viseme-reference)。 

VRChat 通常能自动检测你的虚拟形象的视位。如果检测不到，你可以从下拉列表中选择视位。

![“Viseme Blend Shape”模式是让你角色说话时面部动起来的最常用方法。](/img/avatars/creating-your-first-avatar-6272723-Unity_w5nQONGtcb.png)

:::caution SIL 形态

Unity 会在导入时删除没有内容的形态键（shape key / blend shape），所以请确保你的“SIL”形态（没有检测到声音但麦克风处于活动状态时你的嘴部形成的形态——例如词语之间的间隙）会让单个顶点移动极小、几乎察觉不到的距离。这样可以防止 Unity 删除该键。
:::

:::note 视位性能提示！

如果你是虚拟形象创作者，可以考虑把虚拟形象拆成两个蒙皮网格——一个用于身体，一个用于头部/面部。
形态键的性能开销取决于它们影响 3D 模型的范围大小。把形态键放在单独的头部网格上、让身体网格上的形态键更少，可能会改善虚拟形象的性能。
:::

##### Jaw Flap Blend Shape
如果你的虚拟形象只用一个形态键来为嘴部做动画，请在此配置它。它的行为与“Jaw Flap Bone”类似，只是驱动的是下巴形态键而非下巴骨骼。

##### Viseme Parameter Only
如果你是高级创作者，可以使用该模式，通过 VRChat 内置的[动画器参数](/avatars/animator-parameters)来控制虚拟形象如何对语音做出反应。

## 第6步 - 进入构建选项卡 / 检查虚拟形象是否正常 {#step-6---going-to-the-build-tab--checking-if-the-avatar-is-ok}
接下来，我们要在构建窗口中检查一切是否正常。为此，使用菜单项 `VRChat SDK > Show Control Panel`，它会打开 VRChat SDK 控制面板。登录后，切换到“Builder”选项卡，即可看到提到了虚拟形象 GameObject 的内容，其下方有“Build”区域。你还会看到设置、内容标签、虚拟形象的性能等级、错误和警告。

![VRChat SDK 构建面板。](/img/avatars/build-panel-avatars-2025.png)

只需按照 VRChat 的 SDK 构建面板中的步骤操作：
1. 为你的虚拟形象起一个名字。
	- 你也可以添加描述。
2. 选择你的虚拟形象的可见性。
	- 公开的虚拟形象可被其他 VRChat 用户克隆，或通过世界中的展示台分享。
	- 私有的虚拟形象只有你自己可以使用。
3. 选择合适的内容警告，以符合 VRChat 的 [内容分级系统](https://hello.vrchat.com/blog/content-gating)。
4.  选择一张缩略图。
	- 你可以选择文件，或从 Unity 场景中截取图像。
5. 阅读“Validations”区域。其中包含许多有用的错误和警告。
	- 例如，SDK 可能会警告你的虚拟形象三角形过多，你可以通过优化网格来修复。如果无法优化网格，你可能需要返回并选择其他模型。
6. 选择构建类型。
	- **Build & Publish Your Avatar Online** 会将你的虚拟形象上传到 VRChat，并让其他用户可以看到它。
	- **Build & Test Your Avatar** 让你无需上传即可快速测试虚拟形象。
		- 你可以在 VRChat 的“Other”虚拟形象分区中找到测试用虚拟形象。
		- 你可以在 Android 上使用[构建与测试](/platforms/android/build-test-mobile/)。
7. 选择要在哪些[平台](/platforms/)上构建你的虚拟形象。
8. 确认虚拟形象的信息准确无误，并且你有权将内容上传到 VRChat。
9. 准备好后，点击“Build & Publish”按钮。


## 第7步 - 构建并上传虚拟形象！ {#step-7---building-and-uploading-the-avatar}

:::info

你的[信任等级](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system#trust-rank)必须达到“New User”或更高，才能向 VRChat 上传内容。如果你的等级是“Visitor”，你仍然可以在本地构建并测试虚拟形象。

:::

如果你已准备好上传虚拟形象供其他用户查看，请选择“Build & Publish Your Avatar Online”构建类型并点击“Build & Publish”，SDK 就会开始构建并上传你的虚拟形象。在上传虚拟形象之前，你应该再次确认它符合 VRChat 的[服务条款](https://hello.vrchat.com/legal)和[社区准则](https://hello.vrchat.com/community-guidelines)。

上传虚拟形象后，它应该就可以在 VRChat 中使用了。你也可以在 `VRChat SDK > Show Control Panel > Content Manager` 中看到你的虚拟形象。

你也可以不上传就测试虚拟形象。为此，将构建类型切换为“Build & Test Your Avatar”。本地构建完成后，你的虚拟形象会出现在 VRChat 虚拟形象菜单的“SDK Test Avatars”分区中。测试用虚拟形象只有你自己能看到。要让其他玩家看到你的虚拟形象，你需要上传它。

此外，你可以使用 `--watch-avatars` 启动选项启动，这样以后每次本地构建都会立即将你切换到虚拟形象的新版本。

## 第8步 - 享受你的虚拟形象！ {#step-8---enjoy-your-avatar}

恭喜你创建了第一个虚拟形象！我们希望一切顺利。如果你需要任何帮助，可以访问我们的 [Ask 论坛](https://ask.vrchat.com/)或 [Discord 服务器](https://discord.com/invite/vrchat)。

创建并上传 VRChat 虚拟形象既有趣，也能带来创作上的成就感。如果你想提升虚拟形象创作技巧，可以看看我们其余的[虚拟形象文档](https://creators.vrchat.com/avatars/)。

## 了解更多 {#learn-more}

如果你想更擅长创建虚拟形象，请查看这些页面：
- [Android 内容优化](/platforms/android/quest-content-optimization) - 了解如何创建在 Android 和 Quest 上表现良好的虚拟形象。
- [虚拟形象优化技巧](/avatars/avatar-optimizing-tips) - 了解创建优化过的 PC 或 Android 虚拟形象的一般建议。
- [性能等级](/avatars/avatar-performance-ranking-system) - 了解为什么某些虚拟形象默认对其他玩家可见或隐藏。
- [虚拟形象组件](/avatars/avatar-components/) - 了解如何在虚拟形象上创建沉浸式交互。 

