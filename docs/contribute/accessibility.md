# 无障碍 {#accessibility}

import BrowserWindow from '@site/src/components/BrowserWindow';
import APITable from '@site/src/components/APITable';

通过良好的结构组织以及提供有用的元数据，你可以让你的文档更易访问、更具包容性。

本页总结了 Google 免费课程 [Tech Writing for Accessibility](https://developers.google.com/tech-writing/accessibility/self-study)（[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)）中的一些要点。

## 使用简单的语言 {#use-simple-language}

大多数阅读 VRChat 创作文档的用户都说英语。但他们可能并不理解复杂的单词或短语。

- 避免使用陌生的术语、美式俚语、流行文化引用和复杂的语言结构。
- 遵循[风格指南](/contribute/style)以提升文档的清晰度。

## 创建有用的标题 {#create-helpful-headings}

Markdown 支持不同级别的标题。标题能改善文档的结构，并帮助读者理解它。

- 每篇文档都应使用一级标题（`#`）作为其标题。
- 使用其他标题级别（`##`、`###`……）来创建章节。
- 不要跳过标题级别（即从 `##` 直接跳到 `#####`）。

## 包含有信息量的链接文本 {#include-informative-link-text}

使用屏幕阅读器的用户常常用它们来浏览页面，只听取链接。使用有信息量的链接文本，以确保你的受众听到的是有意义的信息，而不是仅仅“了解更多，了解更多，了解更多”。

- 避免：[了解更多](/roadmap)、[点击此处](/roadmap)、[本页](/roadmap)
- 更好：详细了解[我们的路线图](/roadmap)。

## 编写有用的替代文本 {#write-helpful-alt-text}

Markdown 允许你为图片提供[替代文本](https://developers.google.com/tech-writing/accessibility/self-study/write-alt-text)。屏幕阅读器会为失明或低视力的读者朗读替代文本。

使用一个简短短语或一两句话。过长的描述会打断屏幕阅读器用户的阅读流。

- 不要包含诸如“Image of”或“Photo of”这样的多余词语。
- 首字母大写，并在末尾加上句号。
- 根据需要正确使用其他标点。

例如：

```md
![An avatar with a backpack walks into a blue, holographic world. It's surrounded by floating objects from Unity and Udon.](/img/homepage/ill-overview.png)
```

```mdx-code-block
<BrowserWindow>
```
![背着背包的虚拟形象走进一个蓝色的全息世界，周围漂浮着 Unity 对象和 Udon Graph 元素。](/img/homepage/ill-overview.png)
```mdx-code-block
</BrowserWindow>
```

