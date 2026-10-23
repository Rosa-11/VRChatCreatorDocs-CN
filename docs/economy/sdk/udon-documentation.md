---
description: "所有与创作者经济相关的 Udon 类型、方法和事件。"
sidebar_position: 4
sidebar_custom_props:
    customIcon: 🛠
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Udon 文档 {#udon-documentation}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

本页记录了所有与 VRChat 创作者经济相关的 Udon 类型、方法和事件。你可以使用它们，通过 [Udon Node Graph](/worlds/udon/graph) 或 [UdonSharp](https://udonsharp.docs.vrchat.com) 创建你自己的 [Udon 脚本](/worlds/udon)。

## 类型 {#types}

VRChat 的 SDK 包含一些对象类型，用于支持管理你的客户可以购买的 Udon 产品。

### UdonProduct
UdonProduct 是一个你可以在项目中创建的 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-ScriptableObject.html">ScriptableObject</UnityVersionedLink>。它代表你商店中的一个产品，让你可以在 Udon 中与之交互。
世界只会接收基于其内部正在使用的产品的事件，因此在上传之前，有必要在任意 UdonBehaviour 中至少引用一次某个产品对应的 UdonProduct。

例如，即使你在任何地方都不直接使用这些 UdonProduct，你也需要在场景中至少一个 UdonBehaviour 上拥有一个 UdonProduct 数组，才能在所有 UdonBehaviour 中接收这些产品的 OnPurchaseConfirmedMultiple、OnPurchaseExpired 或 OnPurchasesLoaded 事件。

UdonProduct 可以通过 UdonProductManager（"VRChat SDK" → "UdonProduct Manager"）创建，也可以手动创建 UdonProduct 资源（"Assets" → "Create" → "VRChat" → "UdonProduct"）。

阅读[入门](/economy/sdk/getting-started)，了解更多关于在项目中创建 UdonProduct 资源的信息。

![创建后的空白 UdonProduct](/img/economy/sdk/udonproduct-blank.png)

#### 字段 {#fields}

| 字段名 | 类型 | 描述 |
| - | - | - |
| ID | string | 你的 Udon 产品的唯一标识符。通过从 VRChat 网站上的商店复制来输入它。 |
| Name | string | 你的 Udon 产品的名称。 | 
| Description | string | 你的 Udon 产品的描述。 | 

#### Equals

**描述**
此方法比较一个产品 ID 是否与另一个产品的 ID 相等。

**输入**
- `IProduct` 或 `UdonProduct`：要与此产品进行比较的产品。

**输出**
- `bool`：如果两个产品相等则为 `true`，否则为 `false`。

### IProduct
这是所有 Udon 创作者经济方法和事件返回的 UdonProduct 的等价物。

| 字段名 | 类型 | 描述 |
| - | - | - |
| ID | string | 你的 Udon 产品的唯一标识符。 |
| Name | string | 你的 Udon 产品的名称。 | 
| Description | string | 你的 Udon 产品的描述。 | 
| Buyer | VRCPlayerAPI | 购买此产品的玩家。 |

#### Equals

**描述**
此方法比较一个产品 ID 是否与另一个产品的 ID 相等。

**输入**
- `IProduct` 或 `UdonProduct`：要与此产品进行比较的产品。

**输出**
- `bool`：如果两个产品相等则为 `true`，否则为 `false`。

:::note

UdonProduct 和 IProduct 的 "Name" 与 "Description" 字段目前由世界中存在的 UdonProduct 填充。

:::

## 方法 {#methods}

SDK 包含用于与玩家购买或 VRChat 商店页面交互的方法。这些方法位于 'Store' 命名空间下。

### Store.DoesPlayerOwnProduct
此方法检查某个玩家是否拥有某个产品。

**输入**
- `VRCPlayerApi`：你想要检查其产品所有权的玩家。
- `UdonProduct` 或 `IProduct`：你想要检查其所有权的产品。

**输出**
- `bool`：如果该玩家拥有该产品则为 `true`，否则为 `false`。

:::caution

不要在 `Start` 事件之后立即使用 `Store.DoesPlayerOwnProduct`，因为 Udon 可能尚未收到玩家的购买信息。为避免竞态条件，请改用 [OnPurchasesLoaded](#onpurchasesloaded) 事件。

:::

### Store.DoesAnyPlayerOwnProduct
此方法检查实例中是否有任何玩家拥有某个产品。

**输入**
- `UdonProduct` 或 `IProduct`：你想要检查其所有权的产品。

**输出**
- `bool`：如果实例中有任何玩家拥有该产品则为 `true`，否则为 `false`。

### Store.GetPlayersWhoOwnProduct
此方法获取实例中拥有某个产品的所有玩家。

**输入**
- `UdonProduct` 或 `IProduct`：你想要检查其所有权的产品。

**输出**
- `VRCPlayerApi[]`：实例中拥有此产品的玩家数组。

### Store.OpenWorldStorePage
打开当前世界的世界商店页面（如果有的话）。

### Store.OpenGroupPage
在 VRChat 主菜单中打开群组的 **Group Info** 页面。

**输入**
- `string`：群组的 ID（即 `grp_00000000-0000-0000-0000-000000000000`）
  - 要找到群组 ID，请在 VRChat.com 上打开该群组，并从浏览器的地址栏中复制 ID。

### Store.OpenGroupStorePage
在 VRChat 主菜单中打开群组的 **Store** 页面。

**输入**
- `string`：群组的 ID（即 `grp_00000000-0000-0000-0000-000000000000`）
  - 要找到群组 ID，请在 VRChat.com 上打开该群组，并从浏览器的地址栏中复制 ID。

### Store.OpenListing
在 VRChat 主菜单中打开某个[商品](/economy/listings)的购买界面。

你可以打开任何已激活的商品，即使你并未将其添加到你的群组[商店](/economy/store)或世界[商店](/economy/store)。

**输入**
- `string`：商品的 ID（即 `prod_00000000-0000-0000-0000-000000000000`）

### Store.OpenMarketplaceStore
打开 VRChat 主菜单中市场商店的某个部分，并可选地打开该部分中某个[商品](/economy/listings)的详细信息页面。

对于群组商店或世界商店，如果你还指定了与包含你商品的任意[商店](/economy/store)相关联的群组 ID 或世界 ID，你就可以打开任何已发布的商品。

**输入**
- `string`：你想要打开的市场部分。
  - `vrchat` 会打开「Exclusive」部分。
  - `avatar` 会打开「Avatars」部分。
  - `world` 会打开「World Stores」部分。
  - `group` 会打开「Group Stores」部分。
- `string`：要打开的商品 ID（即 `prod_00000000-0000-0000-0000-000000000000`）。如果你提供空字符串，则只会打开指定的商店部分。
- `string`（可选）：商品的上下文（群组 ID 或世界 ID）——仅在打开群组商店或世界商店中的商品时需要（即 `grp_00000000-0000-0000-0000 000000000000` 或 `wrld_00000000-0000-0000-0000 000000000000`）。

### Store.SendProductEvent
向实例中所有玩家在目标 UdonBehaviour 上发送 [OnProductEvent](#onproductevent) 事件。
在发送或接收该网络事件之前，此方法会检查使用 `SendProductEvent` 的玩家是否已购买该产品。

**输入**
- `UdonBehaviour`：将接收所产生 [OnProductEvent](#onproductevent) 事件的 Udon Behaviour。
- `UdonProduct` 或 `IProduct`：你想用于该事件的产品。

### Store.ListPurchases
向目标 UdonBehaviour 发送 [OnListPurchases](#onlistpurchases) 事件，并附带目标玩家所做的所有购买的数组。

**输入**
- `UdonBehaviour`：将接收所产生 [OnListPurchases](#onlistpurchases) 事件的 Udon Behaviour。
- `VRCPlayerApi`：你想要检查其已购买产品的玩家。

### Store.ListAvailableProducts
向目标 UdonBehaviour 发送 [OnListAvailableProducts](#onlistavailableproducts) 事件，并附带一个包含世界中使用的所有产品的数组。

**输入**
- `UdonBehaviour`：将接收所产生 [OnListAvailableProducts](#onlistavailableproducts) 事件的 UdonBehaviour。

### Store.ListProductOwners
向目标 UdonBehaviour 发送 [OnListProductOwners](#onlistproductowners) 事件。此事件允许你获取所有支持者的名称，例如在你的世界中显示他们的用户名。

- 此事件要正常工作，你需要先在 [VRChat.com](https://vrchat.com/home/marketplace/storefront/products) 上为该 Udon 产品启用 [「Owners Names in Udon」设置](/economy/products/udon#editing-udon-products)。否则，[OnListProductOwners](#onlistproductowners) 将不会触发。
- 如果你在本地测试你的世界，OnListProductOwners 会加载占位用户名 "VRCat, Fred, VRRat"，而不是真实的用户名。
- 如果你的 GameObject 包含多个 UdonBehaviour 组件，此事件可能无法正常工作。

**输入**
- `UdonBehaviour`：将接收所产生 [OnListProductOwners](#onlistproductowners) 事件的 UdonBehaviour。
- `UdonProduct`：要从中获取所有者用户名的 UdonProduct。

### VRCOpenMenu.OpenAvatarListing
在 VRChat 主菜单中打开已发布虚拟形象的详情/购买界面。

**输入**
- `string`：虚拟形象的 ID（即 `avtr_00000000-0000-0000-0000-000000000000`）

## 事件 {#events}

:::warning

如果你禁用了 GameObject 或 UdonBehaviour，它们将不会执行与创作者经济相关的大多数事件。

:::

### OnPurchaseConfirmed
当玩家的购买被加载并确认后，会触发此事件。购买会在以下情况下加载：
- 加入实例时，无论是本地玩家还是任何其他玩家，
- 当任何新玩家加入实例时，以及
- 当实例中任何玩家购买了世界中的某个产品时。

**输出**
- `IProduct`：已购买的产品。
- `VRCPlayerApi`：已购买该产品的玩家。
- `bool`：如果购买是刚刚发生的则为 `true`，如果是在玩家加入世界时加载其购买记录的一部分则为 `false`。

### OnPurchaseConfirmedMultiple

当玩家的购买被加载并确认后，会触发此事件。购买会在以下情况下加载：

- 加入实例时，无论是本地玩家还是任何其他玩家
- 当任何新玩家加入实例时
- 当实例中任何玩家购买了世界中的某个产品时

**输出**
- `IProduct`：已购买的产品。
- `VRCPlayerApi`：已购买该产品的玩家。
- `bool`：如果购买是刚刚发生的则为 `true`，如果是在玩家加入世界时加载其购买记录的一部分则为 `false`。
- `int`：用户购买的[数量](/economy/listings/#quantitypurchases)。对于启用了[数量购买](/economy/listings#quantity-purchases)的[即时](/economy/listings#instant)商品，`quantity` 的范围为 `1` 到 `99`。对于所有其他商品类型，`quantity` 始终为 `1`。

:::caution

`OnPurchaseConfirmed` 已弃用，且不支持[数量购买](/economy/listings#quantity-purchases)。切勿在同一脚本中同时使用 `OnPurchaseConfirmed` 和 `OnPurchaseConfirmedMultiple` —— 否则你可能会意外地检测到同一笔购买两次。

:::

### OnPurchaseExpired
当本地客户端检测到实例中某位玩家拥有的某个产品已过期时，会触发此事件。

**输出**
- `IProduct`：已过期的产品。
- `VRCPlayerApi`：其产品已过期的玩家。

### OnPurchasesLoaded
当某位玩家的所有购买都已加载时，会触发此事件；这发生在本地玩家加入实例时，或者其他玩家稍后加入时。
如果该玩家不拥有任何产品，事件仍会触发，且 IProduct[] 数组将为空。

**输出**
- `IProduct[]`：该玩家拥有的产品数组。
- `VRCPlayerApi`：其购买已加载的玩家。

### OnProductEvent
当玩家使用 [Store.SendProductEvent](#storesendproductevent) 时，会触发此事件。本地玩家和 VRChat 的服务器都会在执行此事件之前检查本地玩家是否已购买该产品。

**输出**
- `IProduct`：随事件一起「发送」的产品。
- `VRCPlayerApi`：已使用其产品的玩家。

### OnListPurchases
当本地玩家使用 [Store.ListPurchases](#storelistpurchases) 时，会触发此事件。它返回目标玩家所做的所有购买的数组。

**输出**
- `IProduct[]`：目标玩家拥有的产品数组。
- `VRCPlayerApi`：其购买记录已被获取的目标玩家。

### OnListAvailableProducts
当本地玩家使用 [Store.ListAvailableProducts](#storelistavailableproducts) 时，会触发此事件。它返回世界中使用的所有产品（UdonProduct）的数组。

**输出**
- `IProduct[]`：表示世界中使用的所有 UdonProduct 的 IProduct 数组。

### OnListProductOwners
此事件在 Udon 脚本调用 [Store.ListProductOwners](#storelistproductowners) 后触发。它返回一个数组，包含拥有目标产品的所有玩家的显示名称。该列表包含拥有该产品的**每一位**用户，而不仅仅是当前实例中的用户。

要检查实例中的某位玩家是否拥有某个 Udon 产品，应改用 [Store.DoesPlayerOwnProduct](#storedoesplayerownproduct)。

**输出**
- `IProduct`：在最初的 [Store.ListProductOwners](#storelistproductowners) 调用中传入的产品。
- `string[]`：包含拥有此产品的所有用户名称的字符串数组。
