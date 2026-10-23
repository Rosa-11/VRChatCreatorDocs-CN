---
description: "授予对世界功能的访问权限。"
sidebar_custom_props:
    customIcon: 🌍
---

# Udon商品 {#udon-product}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

你的世界可以检测Udon商品，并奖励拥有你所发布商品的玩家。你可以解锁新区域、自定义你的世界、显示“谢谢”消息，或者做其他事情。

在你能在世界上使用Udon商品之前，你需要在VRChat网站上按照以下步骤创建它们：

## 创建Udon商品 {#creating-udon-products}

1. 前往[vrchat.com/home](https://vrchat.com/home)
2. 在左侧边栏中转到**商店**标签页，然后打开**店面**。
3. 向下滚动并选择**我的商品**。

![如何在VRChat.com上创建Udon商品。](/img/economy/products/web-create-udon-product-button.png)

4. 点击**创建Udon商品**。
5. 输入显示名称。
6. 为你的Udon商品添加描述和图片。这是可选的，但我们建议这样做。

![如何在VRChat.com上创建Udon商品。](/img/economy/products/web-create-udon-product-popup.png)

7. 点击**创建**。

## 编辑Udon商品 {#editing-udon-products}

![如何在VRChat.com上创建Udon商品。](/img/economy/products/web-create-udon-product-list-entry.png)

1. 点击任意Udon商品旁边的“编辑”。
2. 更改名称、描述，或上传图片。
3. 点击**保存更改**。

你可以更改商品的名称、描述、图片以及“Udon中的拥有者名称”设置。你所做的任何更改都会应用到你的所有VRChat世界，而无需重新上传它们。

![如何在VRChat.com上创建Udon商品。](/img/economy/products/web-enable-owner-names-in-udon.png)

如果你想使用VRChat SDK的[Store.ListProductOwners](/economy/sdk/udon-documentation#storelistproductowners)在你的世界中列出Udon商品的拥有者，则必须启用“Udon中的拥有者名称”。


## Udon商品与VRChat SDK {#udon-products-and-the-vrchat-sdk}

将Udon商品添加到你的商店只是第一步。你还需要实际创建供人们购买的内容，然后将其附加到你商店中的Udon商品。

- 使用VRChat的[示例预制件](/economy/sdk/examples/)开始使用Udon商品。
- 如果你熟悉Udon，可以使用[创作者经济SDK](/economy/sdk/)。你可以编写自己的脚本来检测玩家是否拥有某个商品。
