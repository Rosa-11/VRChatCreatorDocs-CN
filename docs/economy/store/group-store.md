---
description: "包含你的群组订阅。"
sidebar_custom_props:
    customIcon: 👥
---

# 群组商店 {#group-stores}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

群组商店让你可以轻松为你的群组出售[订阅](/economy/subscriptions)。发布群组商店后，用户可以使用你的群组的"商店"标签页来发现并购买订阅。

如果你有 VRChat 世界，你可以添加一个打开你的商店的按钮。使用 [Open Group Page 预制件](/economy/sdk/examples/open-group-page)或 [`Store.OpenGroupStorePage`](/economy/sdk/udon-documentation#storeopengroupstorepage)。

## 创建群组商店 {#create-a-group-store}

创建群组商店最简单的方法是创建一个[订阅](/economy/subscriptions)。如果你的群组还没有商店，创建订阅也会同时创建一个群组商店。

或者，你可以按照以下步骤从[商店管理器](https://vrchat.com/home/marketplace/storefront/stores)创建群组商店：

1. 在 VRChat 网站上打开[商店管理器](https://vrchat.com/home/marketplace/storefront/stores)。
2. 点击"Set up new store"按钮。
3. 选择"Group Store"。
4. 选择你的一个群组。
5. 点击"Create"来创建你的群组商店。
	  - 创建群组商店后，在你发布订阅并发布商店之前，用户不会看到它。
6. 创建[订阅](/economy/subscriptions)并将其添加到你的群组。
	- 你可以使用[商店管理器](https://vrchat.com/home/marketplace/storefront/stores)来重新排列用户在商店中看到订阅的顺序。
7. 发布这些订阅。
8. 在[商店管理器](https://vrchat.com/home/marketplace/storefront/stores)中发布你的群组商店。

![发布商店](/img/economy/stores/world-store/publish.png "在网站上发布你的商店")

:::info

如果你有世界，请使用 [Udon](/economy/sdk/udon-documentation) 来出售你已发布的商品和订阅。例如，[Open Listing 预制件](/economy/sdk/examples/open-listing)可以让用户更轻松地购买订阅，从而提升你的销量。

如果你完全不想发布世界商店，你也可以改用 Udon 来出售订阅！

:::

## 查看你的群组商店 {#viewing-your-group-store}

发布群组商店后，用户可以通过在 VRChat（或 VRChat 网站）中打开该群组并按下"商店"按钮来找到它。他们可以浏览你已发布的订阅并进行购买。


![商店页面](/img/economy/Store-PreviewStoreWeb.png "打开你的商店页面")

![游戏内的商店页面](/img/economy/Store-PreviewStoreClient.png "在 VRChat 中打开你的群组的商店页面")

你可以通过从 VRChat 网站复制群组 URL 或分享其群组 ID（例如 `GROUP.1234`）来分享你的群组。用户可以在 VRChat 的 Groups 标签页中输入该 ID，从而查看或加入你的群组。

![复制群组 URL](/img/economy/Store-CopyShortCode.png "复制你的群组的 VRChat.com URL")


## 限制 {#limitations}

- 群组商店不能包含[商品](/economy/listings)。
- 如果你的群组有任何订阅者，你无法转移该群组。
