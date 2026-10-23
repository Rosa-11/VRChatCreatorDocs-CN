---
description: "使用PlayerData保存并加载泛光设置。"
sidebar_custom_props:
    customIcon: 🎚️
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# 后处理设置 {#post-processing-settings}

![持久化后处理设置世界预览](/img/worlds/examples/persistence/post-processing-weight-slider.png)

此场景通过将一个PostProcessing Volume的权重保存到PlayerData来保存和加载其泛光设置。

访问[持久化后处理设置示例世界](https://vrchat.com/home/world/wrld_ccc0b71a-63ea-4476-bcc2-25dd1b24745d)亲自试用！

## 使用示例 {#using-the-example}

播放场景，使用“Post-Processing Weight”滑块设置泛光等级。它应会以名为“settings_pp_weight”的float形式出现在你的ClientSim PlayerData窗口中。

<HowToImportExample/>

## 技术解析 {#technical-breakdown}

在一个与脚本同名的GameObject上有一个名为“UdonPostProcessing”的UdonSharp脚本。

当位于“UI for Post-Processing > Content > Slider”的Slider被移动时，它会通过Unity UI Event调用`UdonPostProcessing.SliderUpdated`。该方法会在滑块每次更新时设置目标PlayerData值。

每当PlayerData更新时，该脚本上会触发`OnPlayerDataUpdated`事件，并做两件事：

- 设置目标PostProcessingVolume上的权重，这会改变本地的泛光强度。

- 更新滑块的值和位置，使其与已存储的权重匹配。这样做是为了让滑块在玩家首次加载进入实例、且这些值从服务器恢复时与之匹配。
