---
description: "在发布你的世界之前测试你的 Udon 产品。"
sidebar_position: 3
sidebar_custom_props:
    customIcon: 🪲
---

# 测试 Udon 产品 {#testing-udon-products}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

当你向你的 VRChat 世界添加创作者经济功能时，你应该在发布之前对其进行测试。

## 在 ClientSim 中测试 {#testing-in-clientsim}

在 Unity 中开发世界时，你可以将 ClientSim 与 [UdonProducts Manager](/economy/sdk/getting-started#udonproducts-manager) 结合使用。它允许你在不启动 VRChat 的情况下激活产品和让产品过期。

## 在 VRChat 中测试 {#testing-in-vrchat}

你可以使用「Build & Test」选项测试创作者经济 SDK 功能。

:::warning

创作者经济的某些功能无法在本地测试，而需要通过上传私人世界来测试。

:::

- 在本地测试或以世界/群组所有者身份登录 VRChat 时，所有商品/订阅都是免费的。你的 VRChat 钱包余额不会减少。
- 在本地测试时，已购买的商品会在 60 秒后自动过期，无论你在购买时选择了多少个月。
- 你可以在不将商品/订阅发布到商店的情况下购买已发布的商品/订阅。这使你能够进行测试购买，而不让用户看到或购买你的商品/订阅。 
