---
description: "一种只有 Udon 产品拥有者才能触发的事件。"
sidebar_custom_props:
    customIcon: ⏱
---

# 定时产品事件 {#product-event-timed}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

ProductEvent 是一种只有拥有某产品的玩家才能发送的事件。使用它可以在产品事件被执行时，让 GameObject 在设定的时间内启用。

这可以通过多种方式自定义！例如，创建一个付费产品，让这些玩家能够在特定时间内放烟花。

你可以[此处](https://creators.vrchat.com/worlds/udon/graph/event-nodes/)和[此处](https://udonsharp.docs.vrchat.com/events/)了解更多关于 Udon 事件的信息。

<div class="video-container">
    <iframe src="https://assets.vrchat.com/videos/docs/ProductEvent_Preview.mp4" title="定时事件" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

##### 包含的预制件 {#prefabs-included}
* **SendProductEventPrefab**：按下按钮时发送产品事件并在设定时间内启用 GameObject 的预制件。虽然只有拥有该产品的玩家才能触发事件，但 `OnProductEvent` 会被所有用户执行。也就是说，只有为产品付费的人才能激活事件，但事件激活后任何人都可以看到或与之交互。

:::caution
如果你要查看示例场景，还需要 [Open Group Page](/economy/sdk/examples/open-group-page) 预制件。否则，你的项目将缺少完整场景所需的内容。
:::

### 使用方法 {#how-to-use}

对于这个（以及大多数！）预制件，你首先需要一个用于检查的 UdonProduct，以及一种让玩家购买此产品的方式。

创建可购买的产品后：

1. 将 **ProductEventTimedSetActivePrefab** 拖入你的场景。

![EventPrefabtoScene](/img/economy/examples/ProductEvent_DragIntoScene.png "正在将预制件拖入场景。")

2. 在检视面板中，找到 **Udon Product** 变量。点击圆形按钮，用你自己的产品替换示例文件。此产品必须由尝试发送事件的玩家拥有。

![EventProductAdd](/img/economy/examples/ProductEvent_SelectUdonProduct.png "正在将预制件拖入场景。")

3. 接下来，找到 **Enable On Product Event GameObject**。当拥有正确 UdonProduct 的玩家点击按钮时，将被启用的就是这个对象。你可以将其替换为你想要的任何 GameObject。

![EventObjAdd](/img/economy/examples/ProductEvent_SelectCustomObject.png "添加自定义 GameObject。")

4. 使用 **Enabled Time** 设置你希望此 GameObject 被启用多长时间。范围可以是 .5-10 秒。

5. 运行「构建与测试」！

### 检视面板参数 {#inspector-parameters}

* `UdonProduct` - 发送事件时将使用的 Udon 产品。此产品必须由发送事件的玩家拥有。
* `Enable Product Event GameObject` - 事件被执行时将被启用的 GameObject。
* `Enabled Time` - GameObject 将被启用的时长，单位为秒。
