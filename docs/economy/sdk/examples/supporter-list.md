---
description: "一份可自定义的列表，列出所有拥有某个 Udon 产品的用户。"
sidebar_custom_props:
    customIcon: 🥇
---

# 支持者列表 {#supporter-list}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Supporter List 预制件会显示所有已购买某个 UdonProduct 的用户名称。你可以自定义显示的 UdonProduct 数量、它们的颜色、文本大小等。

![SupporterListPreview](/img/economy/examples/SupporterList-Preview.png "支持者列表预制件的预览。")

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

:::caution
如果你要查看示例场景，还需要 [Open Group Page](/economy/sdk/examples/open-group-page) 预制件。否则，你的项目将缺少完整示例场景所需的内容。
:::

### 包含的预制件 {#prefabs-included}
* **SupporterListPrefab**：使用默认设置的完整面板。
* **SupporterListPrefabAutoScrolling**：完整面板，但滚动是自动处理的。

## 使用方法 {#how-to-use}

对于你想加入支持者列表的每个「等级」，此预制件都需要一个 Udon Product。

重要的是，此 Udon Product **必须**在 VRChat 网站上启用「Owner Names in Udon」。你可以前往 [「My Products」](https://vrchat.com/home/marketplace/storefront/products)（`Marketplace > Storefront > My Products`）并编辑你想使用的 Udon Product 来启用此设置。

1. 将「SupporterListPrefab」或「SupporterListPrefabAutoScrolling」拖入你的场景并解包。（这样你就能自定义你的支持者列表。）
2. 在预制件中找到「SupportTiers」GameObject。

![SupportTiersHierarchy](/img/economy/examples/SupporterList-SupportTiersHierarchy.png "层级视图中 SupportTiers 对象的位置。")

3. 该预制件默认有三个「SupportTier」对象。如果你需要多于或少于三个等级，可以按需复制、修改或删除它们。（这就是你在第 1 步中解包该预制件的原因。）
4. 用你的 Udon Product、标题、你想要的颜色以及你想使用的任何字体大小来自定义每个 [Support Tier](supporter-list#support-tier)。

## 检视面板参数 {#inspector-parameters}

### 支持者列表 {#supporter-list-1}

![SupporterListInspector](/img/economy/examples/SupporterList-Inspector.png "支持者列表检视面板的预览。")

此预制件控制支持者列表的滚动和更新行为。

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| **引用** | --- | --- |
| Label | TextMeshPro UGUI | 显示列表的文本标签。 |
| Scroll Rect | Scroll Rect | 用于上下滚动列表的滚动矩形。 |
| View Port Rect Transform | Rect Transform | 滚动视图视口的矩形变换。 |
| **设置** | --- | --- |
| Auto Scroll | Bool | 如果为 true，列表会自动滚动。 |
| Scroll Speed | Float | 列表滚动的速度。如果为 0，列表不会滚动。数值单位为像素/秒。 |
| Fade Time | Float | 列表淡入和淡出的时间。 |
| Time Between States | Float | 淡入后开始滚动之前的时间，以及滚动到底部后开始淡出之前的时间。 |
| **性能** | --- | --- |
| Update When Player Is Behind | Bool | 如果为 true，当玩家实际站在列表后方且看不到正面时，列表会更新。仅在列表从背面也可见时使用。 |
| Update When Player Not Looking | Bool | 如果为 true，列表只在玩家没有看向它时更新。可提升性能，但可能导致玩家看向列表时它不会立即更新。 |
| Min Update Delay | Float | 两次更新之间的最短时间。为 0 时，列表每帧更新。增大此值可提升性能，但代价是列表滚动看起来不流畅。 |
| Max Update Delay | Float | 两次更新之间的最长时间。当玩家位于列表后方、没有看向列表，或超出「Distance Outside Max Update Delay」距离时使用此值。 |
| Distance Within Min Update Delay | Float | 如果玩家与预制件的距离在此时之内，则使用最短更新延迟。 |
| Distance Outside Max Update Delay | Float | 如果玩家与预制件的距离超过此时，则使用最长更新延迟。  |


### 支持等级 {#support-tier}

支持者列表的每个等级都由一个可自定义的支持者等级对象表示。

![SupportTierInspector](/img/economy/examples/SupporterList-TierInspector.png "支持等级检视面板的预览。")

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| **引用** | --- | --- |
| Ownership Product | UdonProduct | 用于检查所有权的产品。 |
| **等级设置** | --- | --- |
| Product Label | String | 等级的名称。 |
| Name Separation String | String | 用于分隔每位支持者名称的字符串。 |
| Add Product Label | Bool | 如果为 true，则产品标签会被添加到面板内容中。 |
| **文本设置** | --- | --- |
| Text Color | Color | 文本的颜色。 |
| Product Label Font Size | Integer | 产品标签的字体大小。 |
| Name Label Font Size | Integer | 名称标签的字体大小。 |
| Max Names Per Line | Integer | 每行名称的最大数量。如果为 0，则没有限制。 |
