---
description: "包含你的世界的商品。"
sidebar_custom_props:
    customIcon: 🌏
---

# 世界商店 {#world-stores}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

世界商店让你可以展示你的世界的[商品](/economy/listings)。创建世界商店后，用户在 VRChat 菜单或网站中查看你的世界时会看到它。

![世界商店](/img/economy/stores/world-store/world-store.png "VRChat 中的一个世界商店。")

你也可以使用 Udon 来打开你的世界商店。例如，你可以添加一个"打开商店"按钮，使用 `Store.OpenWorldStorePage()` 方法打开你的商店。
## 创建并发布世界商店 {#create-and-publish-a-world-store}

你可以按照以下步骤为你的任意世界创建世界商店：

1. 在 VRChat 网站上打开[商店管理器](https://vrchat.com/home/marketplace/storefront/stores)（Marketplace >My Store > Store Manager）。
2. 选择"Set Up New Store"。

![设置新商店](/img/economy/stores/world-store/setup-new-store.png "打开 Marketplace 标签页并设置一个新商店。")

3. 选择"World Store"，从下拉菜单中选择你的一个世界，然后点击"Create"。

![选择世界](/img/economy/stores/world-store/choose-world.png "为你的世界商店选择一个世界")

4. 将已发布的[商品](/economy/listings)添加到你的世界商店。
	- 你可以使用[商店管理器](https://vrchat.com/home/marketplace/storefront/stores)来重新排列用户在商店中看到订阅的顺序。
	- 阅读[商品文档](https://creators.vrchat.com/economy/listings)以了解如何将商品添加到你的商店。

5. 在商店管理器中打开你的商店并发布它。

![发布商店](/img/economy/stores/world-store/publish.png "在网站上发布你的商店")

6. 在 VRChat 中打开你的世界。现在你可以在 VRChat 菜单中看到该世界商店。

![VRChat 中的世界商店](/img/economy/stores/world-store/world-store-in-vrchat.png "在 VRChat 中查看你的商店")

## 限制 {#limitations}

使用世界商店时，请注意以下限制：

- 你可以将同一件商品出售到多个世界商店。
	- 你可以出售在多个世界中为用户提供权益的商品。
	- 如果用户已经拥有同一件商品，他们无法再次购买。
- 你可以出售[永久](/economy/listings#%EF%B8%8Fpermanent)或[临时](/economy/listings#temporary)商品，而无需将它们添加到你的世界商店。
	- 你可以使用 Udon 直接打开商品，例如使用 [Store.OpenListing](/economy/sdk/udon-documentation#storeopenlisting)。
	- 你无法在不将[即时](/economy/listings#instant)商品添加到世界商店的情况下出售它们。此外，只有当前正在访问你的世界的用户才能购买即时商品。
- 你不能向世界商店添加[订阅](/economy/subscriptions)。
	- 请改用群组商店。
