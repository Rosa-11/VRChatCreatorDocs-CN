---
description: "一个用于列出、调试和记录你世界中商品的界面。"
sidebar_custom_props:
    customIcon: 🪲
---

# 商店调试日志 {#store-debug-logging}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

商店调试日志是一个预制件，可帮助在世界内的控制台或界面上记录与商店相关的事件。你可以在你的世界中设置它，让支持者能够查看他们已进行的购买、可以进行的购买，以及打开你的商店。

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

##### 包含的预制件 {#prefabs-included}
* **StoreDebugLoggingPrefab**：一个包含商店相关控制台窗口的预制件，支持者可以与之交互。

:::caution
如果查看示例场景，你还需要[打开群组页面](/economy/sdk/examples/open-group-page)预制件。否则，你的项目将缺少完整场景所需的内容。
:::

### 使用方法 {#how-to-use}

对于这个预制件（以及大多数预制件！），你首先需要一个用于检查的UdonProduct，以及一种让玩家购买该商品的方式。

创建可购买的商品后：

1. 将**StoreDebugLoggingPrefab**拖入你的场景。

![将预制件添加到场景](/img/economy/examples/DebugLogging_AddToScene.png "将预制件拖入场景。")

2. 在检视面板中，找到**Products**下拉列表并拖入一个商品。你也可以一次拖入多个商品。检视面板中的顺序不重要，但请确保每个商品只列出一次。

<div class="video-container">
    <iframe src="https://assets.vrchat.com/videos/docs/DebugLogging_AddProduct.mp4" title="头顶指示器" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

3. 用你的群组ID填充**Group Id**变量。
   -   通过在[网站上](https://vrchat.com/home/groups)打开你的群组，并复制浏览器地址栏中的ID，即可找到你的群组ID。例如：`grp_a4f791af-a167-4c91-b849-2e37e37f509a`。任何短代码（即`EXAMPL.9920`）都**不会**起作用。

![调试群组ID](/img/economy/examples/DebugLogging_GroupId.png "添加你的群组ID。")

4. **Debug Text**对象、**Scrollbar**和**Auto Scroll Toggle**是文本和UI元素，应保持原样。

5. 运行构建与测试！

### 检视面板参数 {#inspector-parameters}

* `Products` - 用户可以购买的Udon商品，其中`Size`值表示商品数量，每个商品链接对应一个`Element`值。
* `Debug Text` - 当玩家点击控制台上的某个按钮时显示的文本。
* `Group Id` - 你的群组ID，该群组包含你的商店和可购买的商品。
* `Scrollbar` - 控制台中显示的滚动条。
* `Auto Scroll Toggle` - 让玩家开启或关闭自动滚动的开关。
