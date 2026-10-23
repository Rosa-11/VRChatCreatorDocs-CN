---
description: "将你的第一个 Udon 产品添加到你的世界。"
title: 入门
sidebar_position: 0
sidebar_custom_props:
    customIcon: 💡
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

本页介绍如何在 VRChat Worlds SDK 中开始使用创作者经济。开始之前，你需要已经[在 Unity 中创建了 VRChat 世界](/worlds/creating-your-first-world)。

你还必须在你的商店中创建了一个 Udon 产品。如果你还没有这样做，请访问 [Udon 产品页面](/economy/products/udon)。

如果你已完成上述所有步骤，就可以开始编辑你的 Unity 项目了。

## UdonProducts Manager

**UdonProducts Manager** 是一个编辑器窗口，它向你显示你在 VRChat.com 上创建的所有 Udon 产品。如果你还没有创建任何产品，此窗口将是空白的。

你可以使用 UdonProducts Manager 自动将 Udon 产品添加到你的项目中。

![UdonProducts 管理器的截图。](/img/economy/sdk/udonproducts-manager.png)

要打开 UdonProducts Manager 窗口，请打开 Unity 窗口顶部的 **VRChat SDK** 选项卡，然后点击 **UdonProducts Manager**。

该管理器允许你：
- 获取产品的缩略图图像。这会创建一个可在你的 Unity 项目中使用的纹理。
- 在 **Project** 窗口中定位产品资源，使产品易于查找。
- 如果你安装了 ClientSim，可以为调试目的购买产品以及让产品过期。

管理器将所有产品列在两个列表中：「Used in the scene」和「Used in the project」。每当你保存当前场景时，前者的列表都会更新。

任何错误或其他信息都会显示在窗口底部。

:::note 
如果你在 VRChat.com 上更新了 Udon 产品的图像，项目中已获取的纹理不会自动更新。要更新已获取的纹理，请在你的 Unity 项目中删除它并重新获取。
:::

### 手动创建 Udon 产品 {#creating-an-udon-product-manually}

你也可以手动创建和管理你的 Udon 产品。

1. 在 Assets 窗口中右键单击，或点击 Unity 窗口顶部的「Assets」>「Create」。
2. 点击「VRChat」>「UdonProduct」，在你的 Assets 文件夹中创建 UdonProduct 资源。
3. （可选）选择一个文件名。
4. 选择该 UdonProduct 资源，并在 Unity 的检视面板中查看它。

![创建后的空白 UdonProduct](/img/economy/sdk/udonproduct-blank.png)

5. 从 VRChat.com 复制你的 Udon 产品的 ID，并将其粘贴到 UdonProduct 资源的「ID」字段中。
6. （可选）点击「Fetch product details」，在 Unity 中查看产品的名称和描述。
7. （可选）点击「Fetch product image」，根据产品当前的缩略图图像创建一个纹理。

## 将 UdonProducts 添加到你的世界 {#adding-udonproducts-to-your-world}

创建 UdonProduct 资源后，你就可以在 Udon 脚本中使用它们。每个世界最多可以使用 200 个 UdonProduct，不过大多数世界使用的更少。

VRChat SDK 提供了[可与你的 Udon 产品一起使用的示例和预制件](/economy/sdk/examples/)，你只需将预制件拖入场景并选择一个 UdonProduct 资源即可。这些预制件对初学者友好，不需要任何 Udon 或编程知识。

如果你熟悉 Udon 和 VRChat Worlds SDK，你可以创建自己的脚本并将其与 Udon 产品一起使用。

要了解具体方法，请阅读我们关于[创作者经济的 SDK 功能](/economy/sdk/udon-documentation)的完整文档。
