---
sidebar_position: -99
---
import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';

# 欢迎！ {#welcome}

VRChat 是一个社交平台，你可以在这里结识他人、探索用户创建的世界，并通过自定义虚拟形象表达自我。无论你是经验丰富的开发者还是新手，VRChat SDK 都能帮助你将自己的想法变为现实。

- [开始使用 VRChat SDK](/sdk)
- 设计自定义[虚拟形象](/avatars)
- 构建沉浸式[世界](/worlds)
- 为多个[平台](platforms)开发
- 加入 [Creator Economy（创作者经济）](/economy)
- [贡献](/contribute)我们的文档
- 探索我们的[创作者路线图](/roadmap)

## 快速入门 {#quickstart}

按照以下步骤快速设置 VRChat SDK：

<div class="video-container">
    <iframe src="https://www.youtube.com/embed/0u1g0TYoJsU" title="VRChat Creator Companion" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

1. 下载并安装 [Creator Companion](https://vrchat.com/download/vcc)。
2. 如果尚未安装 Unity，Creator Companion 会帮助你下载 Unity Hub、安装 Unity 版本 [<CurrentUnityVersion/>](/sdk/upgrade/current-unity-version/)（VRChat SDK 3.4.2 或更早版本为 Unity 2019.4.31f1），并[创建 Unity 账户](https://id.unity.com/account/new)。
3. 使用 Creator Companion 创建新的世界或虚拟形象项目，并用 Unity 打开它。
4. 在 Unity 中构建你的[世界](/worlds/creating-your-first-world)或[虚拟形象](/avatars/creating-your-first-avatar)，并使用 SDK Control Panel 在 VRChat 中测试它。
5. 准备就绪后，使用 SDK control panel 将你的世界或虚拟形象发布到 VRChat！

## 世界创建 {#world-creation}

要制作 VRChat 世界，你需要在 Unity 中使用常见的 3D 模型、材质和光照来搭建场景。你可以使用我们的自定义脚本系统 [Udon](/worlds/udon) 添加交互性。Udon 可以通过可视化 [Udon Graph](/worlds/udon) 构建，也可以使用 [UdonSharp](https://udonsharp.docs.vrchat.com) 编写类似 C# 的代码。你可以使用我们的[网络](/worlds/udon/networking)系统在玩家之间同步体验。

## 虚拟形象创建 {#avatar-creation}

要制作 VRChat 虚拟形象，你必须先创建或找到一个 3D 角色，然后确保它已[绑定骨骼](/avatars/rig-requirements)以兼容 VRChat。之后你可以将[已绑定的模型导入](/avatars/creating-your-first-avatar#step-3---get-the-model-into-your-project) Unity，并添加[表情与控件](/avatars/expression-menu-and-controls)、[Avatar 组件](/avatars/avatar-components)等等。 
