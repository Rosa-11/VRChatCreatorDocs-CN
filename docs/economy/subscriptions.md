---
sidebar_position: 3
description: 在你的群组中创建订阅。
sidebar_custom_props:
    customIcon: 👛
---


# 订阅 {#subscriptions}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';
import ThemedCreditIcon from '/docs/economy/_credit-icon.mdx';

<SellerNotification/>

订阅是为你的 VRChat 群组变现最简单的方式。用户可以访问你的群组商店购买订阅，解锁世界或群组权益。

订阅可以包含以下产品类型：
- [订阅角色产品](/economy/products/paid-role)
- [Udon 产品](/economy/products/udon)

你可以选择订阅的[可见性](#visibility)。订阅可以显示在你的群组商店中，也可以使用 Udon [直接打开已发布订阅的购买界面](/economy/sdk/examples/open-listing)，即使你的商店尚未发布。

订阅与[商品](/economy/listings)类似。

## 订阅、角色与产品 {#subscriptions-roles-and-products}

每个订阅都由一个订阅、一个订阅角色产品和一个订阅角色组成。以下是它们之间的关系：

<Columns> 
<Column className='text--left'>

### 订阅 {#subscription}

用户在群组[商店](/economy/store)中购买订阅。订阅者可以访问该订阅的[产品](/economy/products/)。订阅结束后，他们将失去访问权限。

每个订阅恰好包含一个[订阅角色产品](#subscription-role-product)。你也可以添加多个 [Udon 产品](/economy/products/udon)。



</Column>
<Column className='text--left'>

### 订阅角色产品 {#subscription-role-product}

拥有此[产品](/economy/products/)的用户可以获得你的群组中的[订阅角色](#subscription-role)。

创建订阅时，你会自动创建一个角色产品。你无法手动创建订阅角色产品。


</Column>
<Column className='text--left'>

### 订阅角色 {#subscription-role}

拥有此[群组角色](https://wiki.vrchat.com/wiki/Groups#Group_roles_and_permissions)的用户可以在你的群组或群组实例中获得特殊权限。你可以将其作为对订阅者的奖励。

要了解更多信息，请阅读[订阅角色文档](/economy/products/paid-role)。

</Column>
</Columns>

## 创建订阅 {#create-a-subscription}

按照以下步骤创建你的第一个订阅。你将创建一个订阅、一个订阅角色产品和一个订阅角色。

import Columns from '@site/src/components/Columns';
import Column from '@site/src/components/Column';

---

<Columns> 
<Column className='text--left'>

### 1. 创建新订阅 {#1-create-new-subscription}

在 VRChat 网站的以下任一位置创建新订阅：

- [My Subscriptions](https://vrchat.com/home/marketplace/storefront/subscriptions)
	- 点击"Create Subscription"。
- [Store Manager](https://vrchat.com/home/marketplace/storefront/stores/)
	- 选择一个群组。
	- 点击"Create Subscription"。

创建第一个订阅后，你也可以通过访问上述页面来编辑你的订阅。

</Column>
<Column className='text--right'>

![VRChat.com 上的创建商品界面](/img/economy/listings/subscription-create.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 2. 群组 {#2-group}

为你的订阅选择一个群组。如果该群组没有[群组商店](/economy/store/group-store)，网站会自动为你创建一个群组商店。

每个订阅始终与单个群组关联。你之后无法将订阅移动到其他群组。

如果你已在第 1 步中选择了群组，则会跳过此步骤。

</Column>
<Column className='text--left'>

![VRChat.com 上的创建商品界面](/img/economy/listings/subscription-select-group.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 3. 角色详情 {#3-role-details}

选择订阅角色的名称和描述。这也会决定订阅角色产品的初始名称。

:::tip

你可以在 [My Products](https://vrchat.com/home/marketplace/storefront/products/) 中编辑订阅角色产品来添加缩略图。

:::

点击"Next"以保存订阅角色详情。

</Column>
<Column className='text--left'>

![VRChat.com 上的创建商品界面](/img/economy/listings/subscription-create-role.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 4. 角色权限 {#4-role-permissions}

购买你的订阅的用户也会获得一个群组角色。选择该群组角色的权限。你可以允许订阅者查看所有成员、进入群组实例、获得实例队列优先权等。

:::tip

开启"Enable Free Join for Subscribers"，让订阅者可以直接加入你的群组，即使原始群组设置是"Request to Join"或"Invite-Only"。这样用户无需事先拥有群组访问权限即可更轻松地订阅。

:::

你之后可以在[群组设置](https://vrchat.com/home/groups)中更改权限。阅读[订阅角色文档](/economy/products/paid-role)以了解更多。

点击"Next"以创建订阅、产品和角色。

</Column>
<Column className='text--left'>

![VRChat.com 上的创建商品界面](/img/economy/listings/subscription-choose-permissions.png)


</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 5. 订阅详情 {#5-subscription-details}

选择订阅的名称、描述、缩略图和价格。当用户浏览你的群组商店时，他们会看到以下详情：

- **名称**：你的订阅的名称。
- **描述**：对订阅者所能获得内容的描述。
- **缩略图**：代表该订阅的图片。
- **月度价格与套餐**：你的订阅的价格。
	- 选择每月 100-10,000<ThemedCreditIcon/> 的价格。[^1]
	- 订阅者可以一次购买 1、3、6 或 12 个月。
	- 你可以为多个月套餐提供更低的月均价格，以鼓励用户订阅。

点击"Next"以保存订阅详情。

:::tip

你之后可以更改订阅详情。慢慢来，制作一张吸引人的缩略图！

:::

</Column>
<Column className='text--left'>

![VRChat.com 上的创建商品界面](/img/economy/listings/subscription-create-details.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 6. 订阅产品 {#6-subscription-products}

选择包含在此订阅中的[产品](/economy/products/)。你最多可以给予订阅者 10 个产品的访问权限。

[你在第三步中创建的角色](/economy/subscriptions#3-role-details)始终会被包含，且无法从订阅中移除。不过，你可以自由添加和移除其他产品，例如 [Udon 产品](/economy/products/udon)，即使用户已经订阅也可以。

点击"Next"将你的订阅保存为草稿。

</Column>
<Column className='text--left'>

![VRChat.com 上的创建商品界面](/img/economy/listings/subscription-create-choose-products.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 7. 发布 {#7-publish}

创建订阅后，它会被保存为草稿。你必须先发布它，用户才能购买。

打开 [Store Manager](https://vrchat.com/home/marketplace/storefront/stores/) 并选择你的群组商店。

- 通过点击右上角的按钮，将商店状态从"Unpublished"改为"Published"。
- 通过打开订阅的设置并点击"Publish"，将订阅状态从"Draft"改为"Published"。

</Column>
<Column className='text--left'>

![VRChat.com 上的创建商品界面](/img/economy/listings/subscription-publish.png)

</Column>
</Columns>

恭喜！用户现在可以在你的群组商店中购买已发布的订阅。

## 可见性 {#visibility}

订阅的可见性取决于其状态。打开 [My Subscriptions](https://vrchat.com/home/marketplace/storefront/subscriptions) 以更改你的订阅状态：

- "Published"状态的订阅可被用户购买。
- "Draft"状态的订阅无法被用户购买。如果用户已经购买该订阅，他们将保留它。

发布订阅后，只有当你将其添加到群组[商店](/economy/store)或你的世界内有商店时，用户才能看到它。

:::tip
要最大化你的销量，你应该同时使用世界[商店](/economy/store)**并**在你的世界中添加 Udon 商店！
:::

## 关于续订、结算与取消的详情 {#details-about-renewal-payout-and-cancellation}

当你使用订阅为你的 VRChat 群组变现时，请记住以下细节：

- 订阅在有效期结束时不会自动续订。
	- 订阅即将到期时，用户会收到通知。
- 用户可以在当前订阅结束前延长其订阅。
	- 例如：如果用户的订阅在 7 天后到期，而他们购买了 12 个月的订阅，则其订阅会延长至 12 个月零 7 天。
- 当用户订阅时，你会立即收到第一个月的 VRChat 点数。如果他们订阅超过一个月，你会在之后每个月收到剩余的点数。
	- 例如：如果用户订阅 12 个月，你会立即收到第一个月的 VRChat 点数。下个月，你将收到第二个月的 VRChat 点数，依此类推。
- 当用户取消订阅时，你不会收到剩余月份的 VRChat 点数。
	- 例如：如果用户订阅 12 个月并立即取消，你只会收到第一个月的 VRChat 点数。
- 订阅价格包含约 15.3% 的交易手续费。
	- 参见 [CE Program Rules](https://hello.vrchat.com/legal/economy) 和[结算](/economy/payout)。

[^1]: VRChat 未来可能会更改 Creator Economy 的最低和最高订阅价格。在实施新的最低或最高价格之前，我们会提前通知你。
