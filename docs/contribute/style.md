# 风格指南 {#style-guide}

import BrowserWindow from '@site/src/components/BrowserWindow';
import APITable from '@site/src/components/APITable';

本页说明如何编写清晰、简洁且友好的文档。它是 Google 免费 [Technical Writing](https://developers.google.com/tech-writing/overview) 课程（[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)）的摘要，并建议如何将其应用于 VRChat 的创作文档。

在为 VRChat 的创作文档做贡献之前，你应该先阅读本页。

:::info

VRChat 的创作文档早于本风格指南。如果你想对任何页面提出改进建议，请提交 [拉取请求](https://github.com/vrchat-community/creator-docs/pulls)。

:::

## 术语与缩写 {#terms-and-acronyms}

Unity、VRChat 和 VRChat SDK 中包含一些你的读者可能不熟悉的[术语](https://developers.google.com/tech-writing/one/words)。在编写文档时，请识别出这些术语。

- 如果你要引入一个新术语，请解释它。如果术语已经存在，请提供指向解释它的页面的链接。
	- 例如：“'Marketplace' 选项卡让你可以查看所有使用 [Creator Economy](/economy/) 的 VRChat 世界。
- 尽量一致地使用术语。不要在同一个术语的相似写法之间来回切换。
	- 例如：“GameObject”和“game object”。
- 对于并非 VRChat 或 SDK 专有的术语，使用**小写**，即使它们在 VRChat 中有特定含义。
	- 例如：**a**vatar、**w**orld、**c**reator。
- 对于 VRChat 或 SDK 专有的术语，**首字母大写**，即使它们包含上面提到的某个单词。
	- 例如：**A**vatars SDK、**W**orlds SDK、**V**RChat、**C**reator **E**conomy、**C**reator **E**conomy。

对于文档中频繁使用的术语，你可以使用缩写。当你在文档中首次使用某个缩写时，应该给出它的定义。例如：

- Software Development Kit (SDK)
- VRChat Creator Companion (VCC)
- Creator Economy (CE)

不要为不常使用的术语定义缩写——请直接使用完整术语。
## 主动语态 {#active-voice}

你的大部分文档都应该使用[主动语态](https://developers.google.com/tech-writing/one/active-voice)而不是被动语态来编写。下表展示了主动语态如何让你的句子更易阅读：

| 被动语态                       | 主动语态               |
| ----------------------------------- | -------------------------- |
| 虚拟形象可以被任何人创建。   | 任何人都可以创建虚拟形象。 |
| 商品被包含在商品信息中。 | 商品信息包含商品。 |

主动语态还能帮助你突出句子中的执行者。被动语态有时会省略执行者：

| 被动语态                                 | 主语是谁？ | 主动语态                                      |
| --------------------------------------------- | ------------------- | ------------------------------------------------- |
| 等待你的内容被上传。         | SDK             | 等待**SDK**上传你的内容。      |
| 此选项必须在检视面板中启用。 | 你（读者）    | **你**必须在检视面板中启用此选项。 |

## 清晰的句子 {#clear-sentences}

使用有力的动词和主语来编写[更清晰的句子](https://developers.google.com/tech-writing/one/clear-sentences)。有力的动词能提高句子的清晰度并吸引读者。避免使用无力、不精确或笼统的动词。例如：

| 无力动词  | 无力动词                                    | 有力动词                              |
| ---------- | -------------------------------------------- | ---------------------------------------- |
| **Be**     | 要**小心**不要超过……              | **确保**你不要超过……      |
| **Occur**  | 升级 SDK 时**出现**该问题。 | 升级 SDK **导致**了该问题。 |
| **Happen** | 如果……就会**发生**虚拟形象性能问题。   | 如果……虚拟形象就会**降低**性能。     |

“be”的各种形式（is、are、was、were……）有时是最佳选择。你不必总是替换它们——但请花时间考虑其他选择。

以“There is”开头的句子把一个无力的主语（“There”）和一个无力的动词（“is”）结合在一起。用有力的主语和动词替换“There is”，以改进你的句子：

| 包含 there is / are 的句子                                             | 包含有力动词和主语的句子                       |
| ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 有一种自动布局选项，可以自动排列你的窗口。 | 自动布局选项会自动排列你的窗口。 |
| 有很多方法可以检测 VRChat SDK。                            | 你可以用多种方法检测 VRChat SDK。                 |
| 无法保证主控玩家会响应。                    | 主控玩家可能不会响应。                          |

## 简短的句子 {#short-sentences}

[简短的句子](https://developers.google.com/tech-writing/one/short-sentences)通常比长句更易于阅读、理解和维护。

- 让每个句子只聚焦于一个想法。如果你的句子包含多个想法，请将其拆分为多个句子。
- 当你在长句中使用连词“or”时，考虑将其改为项目符号列表。
- 用简洁的词语替换多余的短语。例如，将“at this point in time”替换为“now”。

## 列表与表格 {#lists-and-tables}

[列表和表格](https://developers.google.com/tech-writing/one/lists-and-tables)可以让你的文档更易于理解。

- 用一个句子引出每个列表和表格。告诉读者它代表什么。
- 每个条目的首字母大写。如果你使用完整句子，请加上标点。
- 条目之间应该“属于”彼此，或属于相似的类别。


以下列表说明了如何选择应该使用的列表类型：

| 列表类型      | 示例                                                            | 描述                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **项目符号列表** | <ul><li>虚拟形象</li><li>世界</li></ul>                           | 对无序条目使用项目符号列表。改变顺序不会改变列表的含义。                                                        |
| **编号列表** | <ul><li>1. 下载 SDK。</li><li>2. 安装 SDK。</li></ul> | 对有序条目使用编号列表。改变顺序会改变列表的含义。<br/>每个条目以祈使动词开头，例如“download”。 |


:::warning

Markdown 语法不支持表格内的换行或列表。你可以改用 `<br/>`、`<ul>` 和 `<li>` 等 HTML 标签，但这通常会影响表格的格式。

:::

## 段落 {#paragraphs}

[段落](https://developers.google.com/tech-writing/one/paragraphs)通过将复杂的想法拆分成更小的主题来帮助读者。以下是构建优秀段落的方法：

- 写出精彩的开头句。它应该确立该段落的主题。
- 让每个段落只聚焦于一个主题。移走或删除与当前主题无关的句子。
- 避免非常长的段落。大段文字会让读者望而生畏。
- 避免非常短的段落。将它们合并或改为列表。

## 受众 {#audience}

在编写文档时，请考虑你的[受众](https://developers.google.com/tech-writing/one/audience)是谁，以及你希望他们学到什么。以下是一些你几乎总能做出的假设：

- 你的受众可以在 Steam、Oculus、Pico、Android 或 iOS 上访问 VRChat。
- 你的受众了解基本的 VRChat 概念，例如玩家、虚拟形象、世界、好友和虚拟现实。
- 你的受众说英语，但可能不是母语者。
- 你的受众知道如何使用 Creator Companion 创建包含 VRChat SDK 的 Unity 世界或虚拟形象项目。

VRChat 的创作文档拥有广泛的受众。有些页面面向需要入门指南的初学者。另一些页面则面向已经熟悉基础知识的专家。如果你的受众已经知道某些内容，你无需重复。例如：

- [开始使用](/sdk/)的受众想要用 SDK 创作一些东西。
	- 你想教他们如何使用 Creator Companion 创建一个包含 VRChat SDK 的简单 Unity 项目。
	- 你不需要解释 VRChat 是什么。
- [虚拟形象缩放](/avatars/avatar-scaling)的受众知道如何使用 Avatars SDK。
	- 你想向他们详细解释虚拟形象缩放的限制。
	- 你不需要解释如何开始使用 VRChat Avatars SDK。
