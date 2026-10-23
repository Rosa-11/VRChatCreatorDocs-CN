---
sidebar_position: 2
sidebar_custom_props:
    description: 创建商品、添加产品并销售它们。
    customIcon: 🛍
---

# 商品 {#listings}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';
import ThemedCreditIcon from '/docs/economy/_credit-icon.mdx';

<SellerNotification/>

商品让你可以通过销售奖励来将VRChat内容变现，例如解锁虚拟形象（Avatar）或世界功能。

用户可以购买商品，商品中包含[产品](/economy/products/)。每个商品可以包含1-15个产品。用户会根据商品的[时长类型](#2-duration-type)保留产品，直到商品过期。例如，[永久](#%EF%B8%8Fpermanent)商品永不过期，而[即时](#instant)商品会立即过期。

用户可以将商品赠送给好友或当前VRChat实例中的用户。

你可以选择商品的[可见性](#visibility)。商品可以显示在你的[商店](/economy/store)中，也可以在世界中使用Udon直接[打开商品](#udon-store-prefabs-in-your-world)，即使你的商店尚未发布。

商品类似于[订阅](/economy/subscriptions)。

## 创建商品 {#create-a-listing}

按照以下步骤创建你的第一个商品：

---

import Columns from '@site/src/components/Columns';
import Column from '@site/src/components/Column';

<Columns> 
<Column className='text--left'>

### 1. 创建新商品 {#1-create-new-listing}

打开[我的商品](https://vrchat.com/home/marketplace/storefront/listings)部分，也就是[商店页面](https://vrchat.com/home/marketplace/storefront/)中的商品列表，该页面位于[VRChat.com](https://vrchat.com/home/)，你可以在这里创建商品。

点击“Create Listing”创建你的第一个商品。

:::info

创建第一个商品后，返回此屏幕以编辑、发布、取消发布或删除你的商品。

:::

</Column>
<Column className='text--left'>

![VRChat.com上的创建商品屏幕](/img/economy/listings/listing-create.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 2. 时长类型 {#2-duration-type}

为你的商品选择三种时长类型之一：

- 即时
- 临时
- 永久

创建商品后，你无法更改其类型。

时长类型之间的区别如下所述。

</Column>
<Column className='text--left'>

![在VRChat.com上选择商品时长](/img/economy/listings/listing-choose-duration.png)

</Column>
</Columns>

<Columns> 
<Column className='text--left'>
#### ♾️永久 {#️permanent}
永久商品的时长为**无限**。买家将获得该商品的终身访问权。

你可以添加以下产品：
- [Udon产品](/economy/products/udon)
- [虚拟形象产品](/economy/products/avatar)

例如，你可以销售虚拟形象、世界功能或世界外观的永久访问权。 

</Column>
<Column className='text--left'>
#### ⌛临时 {#temporary}
临时商品的时长为**五分钟**到**三个月**。买家的商品所有权持续到时长结束，类似于[群组订阅](./subscriptions)。

你可以添加以下产品：
- [Udon产品](/economy/products/udon)

例如，你可以为你的VRChat世界销售临时权益，例如增益、外观、功能或试用。

你可以通过编辑商品的[详细信息](#3-details)来选择临时商品的时长。在时长结束之前，买家无法再次购买该商品。

</Column>
<Column className='text--left'>
#### ⚡即时 {#instant}

即时商品**没有时长**。相反，你通过Udon给买家即时奖励。你也可以允许用户进行[数量购买](#quantity-purchases)。

你可以添加以下产品：
- [Udon产品](/economy/products/udon)

例如，你可以为你的世界销售可生成物品、拾取物、动画或虚拟持久化货币。

只有当前位于你的世界中的用户才能购买即时商品。否则，购买屏幕会要求他们先访问你的世界。

</Column>
</Columns>

选择时长类型后，点击“Next”。

---

<Columns>
<Column  className='text--left'>

### 3. 详细信息 {#3-details}

选择商品的名称、价格和其他详细信息。

- **添加产品**：选择1到10个[产品](./products)。
	- 用户拥有这些产品，直到[时长](#2-duration-type)结束。
	- 你可以将相同的产品添加到不同的商品中。
	- 查看你商品的用户可以看到产品的名称、描述和缩略图。
- **名称**：商品的名称。
- **描述**：商品的描述。
- **缩略图**：代表商品的图片。
- **时长**：商品的时长。（仅对[临时](#temporary)商品显示）
- **价格**：选择商品的购买价格（参见下方[定价](#31-pricing)）。

:::tip

你应该创建引人注目的缩略图和准确的描述——但不必立即完成。你可以稍后编辑商品。

:::

</Column>
<Column className='text--right'>

![VRChat.com上的创建商品屏幕](/img/economy/listings/listing-edit-details.png)

</Column>

</Columns>

#### 3.1定价 {#31-pricing}

对于大多数商品类型，你可以选择100-100,000<ThemedCreditIcon/>的价格。[^1]你可以在之后更改价格——当前拥有你商品的用户会受到影响。

但是，非[永久](/economy/listings#%EF%B8%8Fpermanent)商品和[虚拟形象产品](/economy/products/avatar)有以下限制：

- 你的[即时](/economy/listings#instant)商品、[临时](/economy/listings#temporary)商品和[订阅](/economy/subscriptions)的定价不得超过10,000<ThemedCreditIcon/>。
- 如果你的商品包含[虚拟形象产品](/economy/products/avatar)，则商品中每个不同虚拟形象产品的价格必须至少为1,200<ThemedCreditIcon/>，不包括同一虚拟形象的变体。例如：
	1. 如果你的商品包含两个不同的虚拟形象，其价格必须至少为2,400<ThemedCreditIcon/>（1,200 <ThemedCreditIcon/> × 2）。
	2. 如果你的商品包含同一虚拟形象的两个变体，即不同颜色或服装，其价格必须至少为1,200<ThemedCreditIcon/>。
	3. 如果你的商品包含单个虚拟形象，其价格必须至少为1,200<ThemedCreditIcon/>。


你也可以在我们的[指南](/economy/guidelines#avatars)中找到此信息。

选择商品详细信息后，点击“Next”。

---

<Columns>
<Column  className='text--left'>

### 4. 可见性 {#4-visibility}

选择用户可以在哪里看到你的商品。

- **商店可用性**：选择用户可以购买此商品的世界商店。
	- 你可以将同一商品添加到多个世界商店。
	- 你可以在[商店管理器](https://vrchat.com/b/home/marketplace/storefront/stores)中创建新商店。
	- 如果你的商品包含[虚拟形象产品](/economy/products/avatar)，系统会自动选择[虚拟形象市场](/economy/store/avatar-marketplace)。
- **可见性**：选择是将商品保存为草稿还是立即发布。
	- 在你发布商品之前，用户无法看到或购买它。
	- 你可以在不选择任何商店的情况下发布商品。

</Column>
<Column className='text--right'>
	
![VRChat.com上的创建商品屏幕](/img/economy/listings/listing-edit-visibility.png)

</Column>
</Columns>

点击“Next”保存商品。恭喜！用户现在可以在你选择的商店中购买你的商品。

:::tip

如果你有一个世界，可以使用[打开商品示例预制件](/economy/sdk/examples/open-listing)来打开任何已发布的商品。

:::

## 编辑你的商品 {#edit-your-listing}

你可以在[我的商品](https://vrchat.com/home/marketplace/storefront/listings/)页面上编辑商品的详细信息。

## 测试时长和永久商品购买 {#testing-duration-and-permanent-listing-purchases}

要再次测试购买有时长的或永久的商品，你必须在[收入](https://vrchat.com/home/marketplace/storefront/revenue/mysales/)页面上撤销购买。在重新购买该商品之前，此步骤是必需的。

### 详细信息 {#details}

你可以随时编辑商品的大部分详细信息，即使在发布之后也是如此：
- ✅你可以编辑商品的**名称、描述、缩略图**和其他一般属性。
- ✅你可以编辑商品中产品的**产品名称、描述、缩略图**和其他属性。
	- 如果你重新上传[虚拟形象产品](/economy/products/avatar)，VRChat必须先对其进行审核。
- ✅你可以编辑商品的**价格**。
    - 如果你的商品是订阅，现有所有者不会受到价格变动的影响。
- ✅你可以向商品中**添加产品**。
	- 新所有者和现有所有者都可以访问你添加的产品。
- ✅你可以从商品中**移除[Udon产品](/economy/products/udon)和[订阅角色产品](/economy/products/paid-role)**。
    - 如果你想重新整理商店或为支持者提供额外奖励，这会很有帮助。
	- 移除这些产品时要小心——不要意外移除客户期望拥有的权益。
- ✅你可以**更改[临时](#temporary)商品的时长**。

商品的某些方面无法更改：
- ❌创建商品后，你无法**更改商品的[时长类型](#2-duration-type)**。
- ❌你无法**移除任何用户当前拥有的[虚拟形象产品](/economy/products/avatar)**。



### 删除 {#delete}

在[我的商品](https://vrchat.com/home/marketplace/storefront/listings/)上点击“Delete”以删除商品。你只能删除没有任何所有者的商品。

- [即时](#instant)商品始终可以删除。
- [临时](#temporary)商品可以在你[取消发布](#4-visibility)并等待所有当前所有者到期后删除。
- [永久](#%EF%B8%8Fpermanent)商品在任何用户购买后**无法删除**。

### 可见性 {#visibility}

商品的可见性取决于其状态。打开[我的商品](https://vrchat.com/home/marketplace/storefront/listings/page/1)以更改商品状态：

- “Published”商品可以被用户购买。
- “Draft”商品无法被用户购买。如果用户已经购买了该商品，他们会保留它。

如果你的商品包含任何[虚拟形象产品](/economy/products/avatar)，它会自动发布到VRChat的虚拟形象市场。此外，你还可以将其添加到[世界商店](/economy/store)。

如果你的商品不包含任何虚拟形象产品，用户只有在你将其添加到[世界商店](/economy/store)，或你的世界中有一个使用Udon打开商品的商店预制件时，才能找到它。（同时使用两者可以让你的商品更容易被发现。）

:::tip
结合使用[商店](/economy/store)和Udon[商店预制件](/economy/sdk/examples/)，让用户更容易发现你的世界商品。
:::

#### 世界商店 {#world-stores}

- 当用户在VRChat菜单中查看你的世界时，会看到你的世界[商店](/economy/store)。
- 世界商店可以通过[商店管理器](https://vrchat.com/home/marketplace/storefront/stores)轻松创建和管理
- 当用户在VRChat菜单中查看你的世界详细信息时，世界商店会显示。
- 用户不必位于你的世界中即可使用你的世界商店。

#### 虚拟形象市场 {#avatar-marketplace}

- 如果你已发布的商品包含任何[虚拟形象产品](/economy/products/avatar)，用户会自动在虚拟形象市场上看到你的商品。 

#### 你世界中的Udon商店预制件 {#udon-store-prefabs-in-your-world}

- 你可以使用[Udon](/worlds/udon/)在世界内创建“Buy”按钮或自定义商店。
- [Open Listing](/economy/sdk/examples/open-listing)预制件可让你轻松添加一个“Buy”按钮，用户在访问你的世界时可以按下它。
- 你还可以创建用户无法在世界商店或其他地方找到的“隐藏”商品。
- 如果你熟悉Udon，请使用[Store.OpenListing](/economy/sdk/udon-documentation#storeopenlisting)方法编写Udon脚本。

### 数量购买 {#quantity-purchases}

你可以允许用户大量购买[即时](#instant)商品。转到商品详细信息并选择“Enable Quantity Purchases”。当用户购买该商品时，他们可以选择一次最多购买99份。

你应该使用Udon方法(OnPurchaseConfirmedMultiple)[/economy/sdk/udon-documentation#onpurchaseconfirmed]来检测购买数量，并为用户提供适当的奖励。


## 退款 {#refunds}

退款由VRChat按个案处理。你不能直接向买家退款。如果你需要帮助为商品买家退款，请联系VRChat。

[^1]: VRChat可能会在未来更改创作者经济的最低和最高商品价格。在实施新的最低或最高价格之前，我们会提前通知你。
