---
description: "在拥有Udon商品的玩家头顶显示的浮动指示器。"
sidebar_custom_props:
    customIcon: 👑
---

# 浮动头顶购买指示器 {#floating-overhead-buy-indicator}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

1. 从Unity编辑器菜单“VRChat SDK > 🏠 Example Central”下打开[示例中心窗口](https://vrc-beta-docs.netlify.app/sdk/example-central)
2. 如果你还没有专门让示例可见：
	1. 按下示例中心窗口中的 ⚙️ 齿轮图标以打开示例中心设置。
    2. 启用“显示创作者经济示例”。
3. 在列表中找到此预制件，或按标题（与本页标题相同）搜索它。
4. 按下“导入”按钮，将Unitypackage导入你的项目。

浮动头顶购买指示器是一个预制件，会在玩家购买某物后在其头顶生成一个指示器。你可以用多种方式自定义它，以突出显示你的支持者。

![浮动预制件](/img/economy/examples/BuyIndicator-FloatingPrefab.png "展示浮动对象在玩家头顶的样子。")

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

##### 包含的预制件 {#prefabs-included}
* **FloatingOverheadBuyIndicatorPrefab**：一个脚本，用于在玩家上方添加`FloatingObjectPrefab`（仅限拥有`ExampleProduct`的玩家）。

* **FloatingObjectPrefab**：当玩家拥有该商品时在其上方生成的对象。你可以自定义它，或用另一个GameObject替换它，做成你想要的任何样子。

:::caution
如果查看示例场景，你还需要[打开群组页面](/economy/sdk/examples/open-group-page)预制件。否则，你的项目将缺少完整场景所需的内容。
:::

### 使用方法 {#how-to-use}

对于这个预制件（以及大多数预制件！），你首先需要一个用于检查的UdonProduct，以及一种让玩家购买该商品的方式。

创建可购买的商品后：

1. 将**FloatingOverheadBuyIndicatorPrefab**拖入你的场景。它默认是不可见的，因为还没有可显示的图像或模型。

![将浮动预制件添加到场景](/img/economy/examples/BuyIndicator-FloatingPrefabtoScene.png "将预制件拖入场景。")

2. 在检视面板中，找到**Product**变量。点击圆形按钮，将示例文件替换为你自己的商品。

![添加商品](/img/economy/examples/BuyIndicator-ProductAdd.png "将预制件拖入场景。")

3. 接下来，找到**Overhead Indicator Prefab**。这就是玩家购买该商品后会在其头顶生成的对象。可以把它想象成《模拟人生》中的绿色菱形！你可以用任何你想要的GameObject替换它，但请确保它没有碰撞体。

![添加对象](/img/economy/examples/BuyIndicator-ObjAdd.png "添加自定义GameObject。")

4. 使用**Height Above Head**自定义指示器要浮在玩家头顶多高的位置。

![更改高度](/img/economy/examples/BuyIndicator-HeightChange.png "调整高度。")

5. 如果你希望玩家能够抬头看到自己的指示器，请保持启用**Show Indicator Above Local Player**。否则请禁用它。

<div class="video-container">
    <iframe src="https://assets.vrchat.com/videos/docs/BuyIndicator-ShowIndicatorAboveLocalPlayer.mp4" title="头顶指示器" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

6. 运行构建与测试！

### 检视面板参数 {#inspector-parameters}

* `UdonProduct` - 拥有后会在玩家上方添加浮动对象的Udon商品。
* `Overhead Indicator Prefab `- 你希望浮在玩家头顶的指示器GameObject。请确保该对象没有任何碰撞体，否则很可能会遇到问题。
* `HeightAboveHead` - 你希望指示器浮在玩家头顶多高的位置。
* `Show Indicator Above Local Player` - 如果你拥有该商品，是否应在你自己的上方看到指示器。
