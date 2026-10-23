---
description: "授予对已上传虚拟形象的访问权限。"
sidebar_custom_props:
    customIcon: 🧍
---

# 虚拟形象商品 {#avatar-product}


import SellerNotification from '/docs/economy/_sellers-notification-avm.mdx';

<SellerNotification/>

本页介绍如何配置你的[虚拟形象属性](#create-an-avatar)并创建[虚拟形象商品](#create-an-avatar-product)。

虚拟形象商品允许你在用户从你处购买[商品](/economy/listings)时授予他们虚拟形象。每个虚拟形象商品都与你已上传的某个虚拟形象相关联。


发布虚拟形象商品后，用户可以在多个位置发现它：
- [虚拟形象市场](/economy/store/avatar-marketplace)包含你在任一商品中发布的所有虚拟形象商品。
- 你的[世界商店](/economy/store/world-store)（如果你有的话）可以销售包含虚拟形象商品的永久商品。
- 用户可以从VRChat菜单中的许多其他位置访问虚拟形象商品的详情页面。例如，用户可以选择其他用户并按下“打开虚拟形象详情”按钮。

## 创建虚拟形象 {#create-an-avatar}

在创建虚拟形象商品之前，你必须在Unity中上传一个[虚拟形象](/avatars/)，并在VRChat网站上配置其[属性](#avatar-details)。

:::info

如果你是第一次创建虚拟形象，请了解如何[创建你的第一个虚拟形象](/avatars/creating-your-first-avatar)。

:::

上传虚拟形象后，你可以在VRChat网站的[我的虚拟形象](https://vrchat.com/home/avatars)中找到它，并配置其[属性](#avatar-details)。

### 虚拟形象属性 {#avatar-details}

虚拟形象属性为用户提供有关你虚拟形象的更多信息。它们帮助用户找到并购买你的[虚拟形象商品](#create-an-avatar-product)。

打开[我的虚拟形象](https://vrchat.com/home/avatars)，点击“✏️”图标编辑虚拟形象的属性。大多数属性是可选的，你可以随时更改。

:::info
如果你将同一虚拟形象的多个变体列为单独的商品，请为它们取有意义且描述性的名称。
:::

| 属性 | 类型 | 限制 |
| - | - | - |
| 名称 | 文本 |最多64个字符 |
| 描述 | 文本 | 最多256个字符 |
| 缩略图 | 图像 | 在64x64到2048x2048像素之间，1:1宽高比，最大10 MB |
| 图库 | 图像 | 最多6张图像，每张最大1MB，建议正好1920x1080 |
| 主要风格 | 单选 | 最多1个[虚拟形象风格](#avatar-styles) |
| 次要风格 | 单选 | 最多1个[虚拟形象风格](#avatar-styles) |
| 标签 | 文本 | 最多10个标签，每个最多64个字符 |
| 致谢 | 文本 | 最多300个字符 |
| 内容警告 | 多选 | 最多5个内容警告 |

当用户查看你的虚拟形象商品时，他们还可以看到自动生成的属性，例如其[性能等级](/avatars/avatar-performance-ranking-system)、[平台](/platforms/)和文件大小。他们还会看到包含该虚拟形象商品的所有商品列表，从而可以立即购买该虚拟形象。

创建虚拟形象并编辑其属性后，你可以创建[虚拟形象商品](#create-an-avatar-product)。

### 虚拟形象风格 {#avatar-styles}

你可以在[虚拟形象属性](#avatar-details)中选择主要风格和次要风格。风格是可选的，但它们能帮助买家找到他们感兴趣的虚拟形象类型。

你可以在以下风格之间进行选择：

- **动物**：受动物启发的虚拟形象
- **动漫**：受日本风格惯例启发的虚拟形象
- **卡通**：具有风格化或卡通着色美学的虚拟形象
- **奇幻**：受龙、仙女、精灵和其他神话生物启发的虚拟形象
- **时尚**：穿着时尚的虚拟形象
- **兽人**：拟人化动物风格的虚拟形象和/或与兽迷圈相关的虚拟形象
- **人类**：类似真人的虚拟形象
- **物体**：无生命的虚拟形象（家电、食物、形状、载具等）
- **流行文化**：受大众受众喜爱内容启发的虚拟形象
- **写实**：以表现自然世界风格渲染的虚拟形象
- **科幻**：未来主义、机械、赛博格或外星风格的虚拟形象

你不能选择相同的主要风格和次要风格。例如，你不能两次都选择“动漫”。

如果你不想设置主要风格或次要风格，请选择“未指定”。

## 创建虚拟形象商品 {#create-an-avatar-product}

你可以在VRChat网站上创建虚拟形象商品并提交审核。

import Columns from '@site/src/components/Columns';
import Column from '@site/src/components/Column';

---

<Columns>
<Column>
1. 打开[我的商品](https://vrchat.com/home/marketplace/storefront/)并创建一个新商品。
    - 打开[VRChat网站](https://vrchat.com/home/marketplace/storefront/products/)，依次前往[商店](https://vrchat.com/home/) > [我的商店](https://vrchat.com/home/marketplace/) > [我的商品](https://vrchat.com/home/marketplace/storefront/)。
    - 点击“创建商品”。
</Column>
<Column>
![创建商品](/img/economy/products/avatar/create-product.png "创建商品")
</Column>
</Columns>

---

<Columns>
<Column>
2. 选择“虚拟形象商品”并点击“下一步”。
</Column>
<Column>
![选择商品类型虚拟形象](/img/economy/products/avatar/create-product-avatar.png "虚拟形象商品")
</Column>
</Columns>

---

<Columns>
<Column>
3. 选择一个你的[虚拟形象](#create-an-avatar)，查看其属性，然后点击“下一步”。

- 你只能选择私有虚拟形象。如果你的虚拟形象是公开的，请在[我的虚拟形象](https://vrchat.com/home/avatars)中将其改为私有。
- 也请务必配置虚拟形象的[属性](#avatar-details)。属性为VRChat审核你的虚拟形象时提供有用的信息。你稍后可以更改所有属性。
- 确保你的虚拟形象及其所有属性都遵守创作者经济的[内容准则](/economy/guidelines)。
</Column>
<Column>
![查看虚拟形象](/img/economy/products/avatar/create-product-avatar-properties.png "查看商品")
</Column>
</Columns>

---

<Columns>
<Column>
4. 确认你的虚拟形象符合所有准则。

- 查看[服务条款](https://hello.vrchat.com/legal)要求和[内容准则](https://creators.vrchat.com/economy/guidelines)。
- 检查你虚拟形象的性能等级。
- 点击复选框进行确认。
- 点击“提交审核”。
</Column>
<Column>
![查看虚拟形象](/img/economy/products/avatar/create-product-avatar-confirm.png "查看商品")
</Column>
</Columns>

---

<Columns>
<Column>
5. 等待1-2个工作日，让VRChat审核你的虚拟形象。

你的虚拟形象审核完成后，你将收到一封电子邮件以及VRChat网站上的通知：
  - **已批准**：你可以将其添加到商品或订阅中并发布，从而销售该商品。
  - **已拒绝：** 请从电子邮件中查看拒绝原因。
</Column>
</Columns>

## 更新虚拟形象商品 {#update-an-avatar-product}

如果你想改进或更新你的虚拟形象，可以在Unity中编辑它并上传新版本（使用相同的虚拟形象ID）。

当你上传虚拟形象商品的新版本时，必须等待1-2个工作日以获得VRChat的批准。之后，更新会自动发布。

:::warning

在你将虚拟形象出售给一个或多个用户之后，请将更新限制为以下更改：

- 错误修复
- 性能改进
- 新增或改进的功能

:::

在等待批准期间，用户可以继续购买和使用之前已批准的虚拟形象版本。当VRChat批准新版本后，所有拥有者会看到新版本。

在等待批准期间，你也可以继续上传更新的虚拟形象版本。如果你在短时间内上传多个版本，VRChat只会审核最新版本，忽略较早的版本。

## 虚拟形象内容准则 {#avatar-content-guidelines}

你的虚拟形象必须符合VRChat的市场标准和条款与条件。我们的审核人员会验证性能、兼容性和资格。

:::warning

虚拟形象市场仍在开发中，因此虚拟形象内容准则可能会快速变化。

:::

查看创作者经济[内容准则](/economy/guidelines)以了解更多信息。
