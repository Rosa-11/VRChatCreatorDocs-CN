---
description: "打开一个商品。"
sidebar_position: 0
sidebar_custom_props:
    customIcon: 🔗
---

# Open Listing

本示例包含两个预制件，让用户可以通过按下按钮来打开你的某个商品。

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

## 包含的预制件 {#prefabs-included}

* **OpenListingPrefab**：包含一个用于打开商品页面的按钮。还包含一段文本描述。
* **OpenListingSimplePrefab**：包含一个用于打开商品页面的按钮。不包含文本描述。
* **OpenListingAndReactToPurchasePrefab**：包含一个用于打开商品页面的按钮。当指定的商品被购买时播放音效。

![OpenListingPrefab](/img/economy/examples/Comparison-OpenListing.png "对比商品预制件。")

* **OpenListingDeluxePrefab**：包含缩略图，以及商品的名称、类型和价格字段。

![OpenListingPrefab](/img/economy/examples/OpenListingDeluxe_GameView.png "展示 OpenListing Deluxe 在 Game 视图中的外观")

## 如何使用 {#how-to-use}

对于每个预制件，你都需要将任何 ID 替换为你自己的群组或商品的 ID。

1. 在 Unity 场景中选择所选的预制件。

2. 在检视面板窗口的 `Listing ID` 字段中设置该商品的 ID。
    - 通过[打开你商店的商品部分](https://vrchat.com/home/marketplace/storefront/listings)并复制其 ID，可以找到你的商品 ID。

![DragListingID](/img/economy/examples/Listing-Id-Copying.png "商品 ID 应填写在哪里。")

3. 仅适用于 **OpenListingAndReactToPurchase**：
    - 使用 [UdonProducts Manager](https://creators.vrchat.com/economy/sdk/getting-started#udonproducts-manager) 找到被购买时应播放音效的商品的 `UdonProduct` 资源。
    - 将 `Trigger Product` 字段设置为该 `UdonProduct` 资源。

4. 仅适用于 **OpenListingDeluxe**：
    - 使用检视面板窗口中的 `Thumbnail` 字段设置该商品的缩略图。最好使用用户打开你的商品时会看到的同一缩略图，但你也可以使用项目中任何正方形的 Sprite。
    - 使用 `Display Name`、`Type` 和 `Price` 字段设置三行文本。与缩略图一样，最好让这些内容与用户在商品中看到的一致，不过你可以输入任何你喜欢的信息。

![OpenListingDeluxeFields](/img/economy/examples/OpenListingDeluxe_Inspector.png "OpenListingDeluxe 的字段")

5. 运行 Build & Test！

### 检视面板参数 {#inspector-parameters}

这些预制件具有以下参数：

### OpenListing 与 OpenListingSimple {#openlisting--openlistingsimple}
* `Listing ID` - 你想打开的商品 ID。

### OpenListingAndReactToPurchase
* `Trigger Product` - 在被购买时触发音效的 `UdonProduct` 资源。
* `Optional Purchase Sfx` - 购买商品时播放的音效。
* `Optional Purchase Sfx Source` - 用于播放音效的 `AudioSource` 组件。

### OpenListingDeluxe
* `Thumbnail` - 预制件中显示的 Sprite，通常与为该商品设置的缩略图相同。
* `Display Name` - 第一行文本，通常是该商品的显示名称。
* `Type` - 第二行文本，通常是该商品的类型——Consumable、Instant 等。
* `Price` - 第三行文本，通常是该商品以 VRChat 点数计的价格。
