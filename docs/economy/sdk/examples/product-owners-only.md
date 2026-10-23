---
description: "一个只有 Udon 商品拥有者才能进入的区域。"
sidebar_custom_props:
    customIcon: 🔐
---

# Product Owners Only Area

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Product Owners Only Area 是一个预制件，它搭建了一个只有目标商品拥有者才能进入的区域。用它来在你的世界中创建专属区域、活动与体验。

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

##### 包含的预制件 {#prefabs-included}
* **ProductOwnersOnlyAreaExamplePrefab**：包含 ProductOwnersOnlyArea 脚本完整用法示例的预制件。

:::caution
如果你想查看示例场景，还需要 [Open Group Page](/economy/sdk/examples/open-group-page) 和 [Udon Product Toggle](/economy/sdk/examples/product-toggle) 预制件。否则，你的项目将缺少构成完整示例场景所需的内容。
:::

### 如何使用 {#how-to-use}

对于这个（以及大多数！）预制件，你首先需要一个可供检查的 UdonProduct，以及一种让玩家购买该商品的方式。

在你创建了可购买的商品之后：

1. 从 Project 窗口打开 **ProductOwnersOnlyAreaExampleScene**。该场景包含一个建筑资源，可帮助你测试和理解该预制件的工作方式。

![PrefabScene](/img/economy/examples/SubsOnlyArea_DragIntoScene.png "打开示例场景。")

2. 在层级视图中，点击 **ProductOwnersOnlyAreaExamplePrefab**。

![HierarchyClick](/img/economy/examples/SubsOnlyArea_SelectInHierarchy.png "在层级视图中找到该预制件。")

3. 在检视面板中，添加你希望在玩家进入某个区域或位于该区域内时检查的 Udon Product。

![AddProduct](/img/economy/examples/SubsOnlyArea_SelectProduct.png "添加要检查的商品。")

5. 在层级视图中，选择 **OpenListingSimplePrefab**。在此处粘贴你的商品 ID。这将在需要的位置显示购买该商品的链接。
    -   要获取你的商品 ID，请前往 [vrchat.com/home](https://vrchat.com/home)，然后依次进入 Marketplace -> Storefront -> My Listings。

![AddListingID](/img/economy/examples/SubsOnlyArea_OpenListingPrefab.png "添加商品 ID。")

6. 在层级视图中，再次点击 **ProductOwnersOnlyAreaExamplePrefab**。你会看到几个不同的设置：

    -    **Trespassing Message** 是当玩家进入或位于仅限商品拥有者的区域内但未拥有正确的 Udon Product 时显示的内容。

    - **Trespassing Teleport Location** 是玩家试图进入或最终处于无权访问的位置时被传送到的地点。你可以在场景中将它移动到任何你喜欢的地方，只要确保它在仅限拥有者的区域之外即可。

    - **Area Colliders** 用于将非拥有者挡在你的专属区域之外。在该预制件中，它是我们示例资源内部的一个盒型碰撞体。你应在自己的场景中调整它，以最好地满足你的需求。

![TrespassingText](/img/economy/examples/SubsOnlyArea_TresspassingMessage.png "擅入提示文本。")

7. 如果你希望改为将非拥有者留在某个特定区域内，请启用 **Keep People In Area**。启用后，请确保你的出生点和 Trespassing Teleport Location 位于碰撞体内部，而不是碰撞体外部。

:::tip
如果你要创建一个大型的专属区域，并希望将所有非拥有者集中在一起，请启用此选项。想象一下在进入游乐园前排队的场景。如果你只是划定世界的一小部分（例如一个专属房间），我们建议保持禁用。
:::

8. 在层级视图中，点击 **ProductOwnersOnlyAreaExamplePrefab** 旁边的下拉箭头。点击 **ProductOwnersOnlyAreaBlockerToggle**。

9. 在检视面板中，选择你之前选过的同一个 Udon Product。现在，当玩家拥有该商品时，这扇门将被禁用。
    -  你可以在 [Udon Product Toggle](/economy/sdk/examples/product-toggle) 预制件页面上了解更多关于禁用和启用门与墙等阻挡物的信息。

9. 运行 Build & Test！

### 检视面板参数 {#inspector-parameters}

* `Udon Product` - 用于确定所有权的 Udon Product。
* `Trespassing Message` - 当玩家擅入时将被激活并向其显示擅入提示的 GameObject。
* `Trespassing Teleport Location` - 玩家擅入时将被传送到的位置。
* `Area Colliders` - 定义仅拥有者/非拥有者可访问区域的碰撞体，具体取决于 Keep People In Area 开关。这些碰撞体将在运行时被禁用以节省性能。
* `Keep People In Area` - 开启此项可强制玩家留在区域内，而不是将他们挡在区域外。如果你使用此项，请确保你的出生点和 Teleport Location 位于区域内部。
