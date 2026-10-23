---
description: "通过PayPal或银行转账结算你的收益。"
sidebar_position: 5
sidebar_custom_props:
    customIcon: 💵
---

import Columns from '@site/src/components/Columns';
import Column from '@site/src/components/Column';

# 结算 {#payout}

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

你可以访问[结算](https://vrchat.com/home/marketplace/storefront/payout)页面，向VRChat的支付处理商Tilia申请结算，从而结算你赚取的点数。


## 1. 管理结算 {#1-manage-payouts}

打开[vrchat.com](https://vrchat.com/home)并登录你的VRChat账号后，在左侧边栏打开[商店](https://vrchat.com/home/marketplace/)，然后打开[我的商店](https://vrchat.com/home/marketplace/storefront)。

在概览页面上，你可以看到可用的结算金额。点击**管理**打开[结算管理](https://vrchat.com/home/marketplace/storefront/payout/manage)页面。

![我的商店概览页面中的可用结算部分。](/img/economy/TiliaPayout-Manage.png )

## 2. 检查结算要求 {#2-check-payout-requirements}

结算管理界面允许你申请新的结算并查看结算历史。它还会显示所有结算要求，以及你当前满足哪些要求。

![结算要求列表，其中“申请结算”可用，下方是结算历史。](/img/economy/TiliaPayout-Criteria.png)

你必须满足以下所有条件才能申请结算：
- 你的账号必须状态良好，并且有资格参与创作者经济。
- 你的钱包中至少包含20,000个*已赚取*的VRChat点数。[^2]
- 你当前没有正在进行的结算申请。
- 你在过去24小时内没有申请过结算。

[^2]: 你无法结算购买的或促销获得的VRChat点数。如果你购买VRChat点数或通过促销获得点数，这些点数不计入最低结算门槛。


如果你满足上述所有条件，点击**申请结算**继续。

## 3. 选择结算金额 {#3-choose-payout-amount}

输入你希望结算的点数数量。默认会选中最大结算金额。你可以在下方看到以美元计的结算金额估算。选择结算目的地后，你将看到最终的结算金额和手续费。

![申请结算窗口，用户在此选择所需的结算金额。](/img/economy/TiliaPayout-Amount.png)

点击**申请结算**前往Tilia。Tilia会额外显示你所选结算金额的确认信息。

![Tilia的结算金额界面，显示“VRC 20,000”和一个“下一步”按钮。](/img/economy/TiliaPayout-TiliaAmount.png)

点击**下一步**继续选择结算目的地。


## 4. 选择结算目的地 {#4-choose-payout-destination}

选择或创建新的结算目的地。创建结算目的地后，你无需再次输入其详细信息即可使用。你也可以删除结算目的地。

![结算目的地界面，允许你添加PayPal或银行账户。](/img/economy/TiliaPayout-AddProvider.png)

目前，以下结算目的地可用：

<Columns> 
<Column className='text--left'>

### **PayPal**
- **结算手续费：** 约1.5%

如果你的PayPal账户不是美元账户，PayPal会额外收取货币兑换费。这不包含在结算手续费中。

请注意，PayPal并不支持所有国家/地区的用户进行结算（参见[国家与功能支持](https://developer.paypal.com/docs/payouts/standard/reference/country-feature/)）。

</Column>
<Column className='text--left'>

### 银行转账 {#bank-transfer}
- **结算手续费：** 取决于你的银行和国家/地区

大多数美国银行会要求你登录银行账户。它们还可能提供多种结算方式，手续费各不相同。在大多数其他国家/地区，你则需要直接填写IBAN和其他信息。

银行转账仅在受支持的国家/地区可用。

</Column>
</Columns>

:::warning

你的法定姓名必须与你在Tilia提供的信息一致。信息不一致是结算被拒的常见原因。

:::

## 5. 确认结算 {#5-confirm-payout}

选择结算目的地后，请查看结算申请的详细信息。你可以看到所选目的地、申请金额、手续费以及最终结算总额。

![Tilia的确认界面，显示目的地、申请金额、手续费、结算总额以及一个“提交”按钮。](/img/economy/TiliaPayout-ConfirmAndSubmit.png)

如果一切正确，点击**提交**以提交你的结算申请。

## 6. 接收结算款项 {#6-receive-payout}

Tilia会在一到两个工作日内批准大多数结算。当Tilia批准结算后，你会收到来自Thunes Financial Services LLC的确认邮件。

![一封确认邮件，包含交易摘要、手续费和最终金额。](/img/economy/TiliaPayout-Email.png)

:::info

如果你的结算申请被Tilia拒绝，请检查你的电子邮箱和结算历史以查明原因。如果你需要进一步帮助，请[联系Tilia](https://tilia-vrchat.freshdesk.com/support/tickets/new)。

:::

## 收入分成 {#revenue-split}

VRChat将创作者经济的大部分收入与卖家分享。

![大致收入分成](/img/economy/revenue-split-approximate.jpg "大致收入分成")

在VRChat点数被购买、消费并成功结算给创作者之后，收入分成大致符合以下比例：
- 30%：[^1]归平台（Steam/Meta等），
- 50%：[^1]归创作者，
- 20%：[^1]归VRChat及其合作伙伴。

## 手续费 {#fees}

手续费分以下三步收取：
1. **购买点数**：用户在Steam或Meta上购买VRChat点数。
	- 总购买手续费约为40%[^1]。
	- 此外，用户还需根据其居住国家/地区支付[增值税](https://en.wikipedia.org/wiki/Value-added_tax)。
2. **消费点数**：用户在创作者的商店中消费VRChat点数。
	- 总交易手续费约为15.3%[^1]。
3. **结算点数**：卖家通过Tilia结算其收益。
	- 手续费取决于你的结算目的地（PayPal约为1.5%）[^1]。

[^1]: 这些百分比是近似值，不包含增值税。百分比可能因取整、平台、结算目的地以及VRChat点数在结算前流经创作者经济的方式而有所不同。更多信息请参阅[创作者经济计划规则](https://hello.vrchat.com/legal/economy)。
