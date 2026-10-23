---
description: "列出当前实例中的所有商品拥有者。"
sidebar_custom_props:
    customIcon: 👥
---

# Product Owners In Instance

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Product Owners In Instance 是一个预制件，它通过文本控制台列出当前位于该实例中的商品拥有者或非商品拥有者。

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

##### 包含的预制件 {#prefabs-included}
* **ProductOwnersInInstancePrefab**：带有控制台的预制件，显示该实例中的所有商品拥有者。
* **NonProductOwnersInInstancePrefab**：带有控制台的预制件，显示该实例中的所有非拥有者。

:::caution
如果你要查看示例场景，还需要 [Open Group Page](/economy/sdk/examples/open-group-page) 预制件。否则，你的项目将缺少构成完整场景所需的内容。
:::

### 如何使用 {#how-to-use}

对于这个（以及大多数！）预制件，你首先需要一个可供检查的 UdonProduct，以及一种让玩家购买该商品的方式。

在你创建了可购买的商品之后：

1. 将 **ProductOwnersInInstance** 预制件拖入你的场景。

![EventPrefabtoScene](/img/economy/examples/SubsInInstance_AddToScene.png "将预制件拖入场景。")

2. 在检视面板中，找到 **Udon Product** 变量。点击圆形按钮，并把你自己的商品替换掉示例文件。

![ProductAdd](/img/economy/examples/SubsInInstance_SelectProduct.png "通过检视面板添加商品。")

3. 如果你希望控制台改为显示非拥有者，可以勾选 **List Non Product Owners Instead,**，或使用 **NonProductOwnersInInstance** 预制件。否则，请保持不勾选。

![NonOwnersvsOwners](/img/economy/examples/SubsInInstance_SubsVersusNonSubs.png "非商品拥有者列表与商品拥有者列表的区别。")

4. 运行 Build & Test！

### 检视面板参数 {#inspector-parameters}

* `Udon Product` - 将要检查其所有权的 Udon Product。
* `Product Owners Text` - 将用商品拥有者列表更新的文本字段。每个商品拥有者各占一行。
* `List Non Product Owners Instead` - 如果为 true，将改为列出所有不拥有该商品的玩家。
