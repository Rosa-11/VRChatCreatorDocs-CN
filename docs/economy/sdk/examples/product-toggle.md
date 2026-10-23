---
description: "为拥有某个 Udon 商品的玩家切换一个 GameObject。"
sidebar_custom_props:
    customIcon: 🔄
---

# Udon Product Toggle

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Udon Product Toggle 是一个预制件，当用户拥有所指定的 Udon Product 时，它会启用/禁用某个 GameObject。它既可用于本地对象，也可用于基于实例的对象。你可以用独特的方式使用它，例如设置一扇让商品拥有者进入私人区域的门，或者为整个实例创建有趣的可购买弹出内容。

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

##### 包含的预制件 {#prefabs-included}
* **UdonProductToggleObjectOffLocalPrefab**：当本地玩家拥有该商品时，将目标对象设为禁用。
* **UdonProductToggleObjectOffAnyonePrefab**：当实例中任何人拥有该商品时，将目标对象设为禁用。
    - 当玩家必须是商品拥有者才能为自己或整个实例移除某个东西（例如通往你世界专属区域的门）时，请使用这些预制件。

* **UdonProductToggleObjectOnLocalPrefab**：当本地玩家拥有该商品时，将目标对象设为启用。
* **UdonProductToggleObjectOnAnyonePrefab**：当实例中任何人拥有该商品时，将目标对象设为启用。
    -  当玩家必须是商品拥有者才能为自己或整个实例启用某个东西（例如生成炫酷的效果或新对象）时，请使用这些预制件。

:::caution
如果你要查看示例场景，还需要 [Open Group Page](/economy/sdk/examples/open-group-page) 预制件。否则，你的项目将缺少构成完整场景所需的内容。
:::

### 如何使用 {#how-to-use}

对于这个（以及大多数！）预制件，你首先需要一个可供检查的 UdonProduct，以及一种让玩家购买该商品的方式。

在你创建了可购买的商品之后：

1. 将选定的预制件拖入你的场景。使用哪个预制件取决于你希望在世界中采用什么逻辑。每个预制件都有自己的行为，你可以在 **包含的预制件** 部分查看。

![DraggingPrefab](/img/economy/examples/ProductToggle_DragIntoScene.png "拖入选定的预制件。")

2. 在检视面板中，添加你希望检查的 Udon Product。

![AddProduct](/img/economy/examples/ProductToggle_SelectProduct.png "添加要检查的商品。")

3. 在检视面板中，将 Target 对象替换为当玩家拥有该 Udon Product 时你希望启用/禁用的任何对象。以下是 **ToggleObjectOff** 的实际示例：

<div class="video-container">
    <iframe src="https://assets.vrchat.com/videos/docs/ProductToggle_Demo.mp4" title="商品开关" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

4. 运行 Build & Test！

### 检视面板参数 {#inspector-parameters}

* `Udon Product` - 用于确定所有权的 Udon Product。
* `Targets` - 在商品被购买/过期时将被激活/停用的对象。
* `Default State` - 商品未被购买时，目标的活动状态将被设置的默认状态。
* `Local Only` - 如果为 true，则仅当本地玩家购买/过期时才会激活/停用。如果为 false，则当任何玩家拥有时都会激活/停用。
