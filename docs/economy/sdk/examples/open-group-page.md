---
description: "打开你的群组或群组商店。"
sidebar_position: 1
sidebar_custom_props:
    customIcon: 🔗
---

# Open Group Page

OpenGroupPage 是一个预制件，可让你打开自己的群组页面或群组商店。用它来创建按钮，让用户可以轻松访问你的群组。

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

## 包含的预制件 {#prefabs-included}
* **OpenGroupPagePrefab**：包含一个用于打开群组页面的按钮。还包含一段文本描述。
* **OpenGroupPageSimplePrefab**：包含一个用于打开群组页面的按钮。不包含文本描述。

![OpenGroupPrefab](/img/economy/examples/Comparison-OpenGroupPage.png "对比群组预制件。")

## 如何使用 {#how-to-use}

对于每个预制件，你都需要将任何 ID 替换为你自己群组的 ID。

1. 在 Unity 场景中选择所选的预制件。
2. 在检视面板窗口的 `Group ID` 字段中，设置拥有该商品的群组的 ID。
    -   通过在网站上[打开你的群组](https://vrchat.com/home/groups)并复制浏览器地址栏中的 ID，可以找到你的群组 ID。例如：`grp_a4f791af-a167-4c91-b849-2e37e37f509a`。任何短代码（即 `EXAMPL.9920`）都**不会**生效。

![DragGroupID](/img/economy/examples/Group-Id-Copying.png "群组 ID 应填写在哪里。")

3. 如果你想直接打开商店页面，请打开预制件上的 **OpenToStorePage** 开关。如果未勾选，该按钮将打开你的群组页面，而不是直接打开你的商店。
4. 对于 **OpenListing/OpenListingSimple：** 在检视面板窗口的 `Listing ID` 字段中设置商品的 ID。
    - 通过[打开你商店的商品部分](https://vrchat.com/b/monetization/home/marketplace/storefront/listings)并复制其 ID，可以找到你的商品 ID。

![DragListingID](/img/economy/examples/Listing-Id-Copying.png "商品 ID 应填写在哪里。")

5. 如果你想直接打开商店页面，请打开预制件上的 **OpenToStorePage** 开关。如果未勾选，该按钮将打开你的群组页面，而不是直接打开你的商店。

![IDPasting](/img/economy/examples/Group-versus-Store-links.png "关于如何查找并粘贴 ID 的说明。")

6. 运行 Build & Test！

## 检视面板参数 {#inspector-parameters}

#### OpenGroupPage 
* `Group ID` - 你想打开的群组的群组 ID。
* `Open To Store Page` - 如果为 true，将打开该群组的商店页面，而不是群组信息页面。
