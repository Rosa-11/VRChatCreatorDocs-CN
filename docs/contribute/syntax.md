# 语法指南 {#syntax-guide}

import BrowserWindow from '@site/src/components/BrowserWindow';
import APITable from '@site/src/components/APITable';

大多数文档页面由文本组成。不过，你可以使用额外的语法让你的页面更易于阅读。

## Markdown

你的页面使用 [Markdown](https://en.wikipedia.org/wiki/Markdown) 编写。Markdown 文档易于在任何文本编辑器中编辑和预览。以下是一个非常简单的文档页面示例：

```md
# Example page

This is an example page with a title and some text.
```

VRChat 创作文档使用 [Docusaurus](https://docusaurus.io/) 构建。Docusaurus 会把你的 Markdown 文件转换成网页：

```mdx-code-block
<BrowserWindow>
```

# 示例页面 {#example-page}

这是一个包含标题和一些文本的示例页面。

```mdx-code-block
</BrowserWindow>
```

Docusaurus 使用 [MDX](https://mdxjs.com/)，它是 Markdown 的扩展。你可以使用 Docusaurus 和 MDX 以多种方式增强你的文档。

:::tip

你可以点击任何页面底部的“Edit this page”来了解该页面是如何创建的。

:::

## 预览你的更改 {#preview-your-changes}

如果你要向 VRChat 的文档提交复杂的更改，你应该在自己的电脑上预览它们。这让你可以看到更改在网站上的显示效果。

要预览你的更改，请按照 [GitHub 上的说明](https://github.com/vrchat-community/creator-docs?tab=readme-ov-file#local-development)操作：
1. 在 GitHub 上 [创建你的复刻（fork）](https://github.com/vrchat-community/creator-docs/fork) [创作者文档仓库](https://github.com/vrchat-community/creator-docs)。
2. 使用 [Git](https://www.git-scm.com/) 克隆你的复刻。
3. 在 `Docs/` 文件夹中运行 `npm install`，使用 [npm](https://www.npmjs.com/) 安装 Docusaurus。
4. 在 `Docs/` 文件夹中运行 `npm run start`，使用 [npm](https://www.npmjs.com/) 启动 Docusaurus。

## Front matter

[Front matter](https://docusaurus.io/docs/markdown-features#front-matter)是有关你的 markdown 文件的可选数据。你可以用它来更改 Docusaurus 在文档中呈现你的页面的方式。

你可以在文件顶部添加 front matter，用三条短横线（`---`）包围。其内容会按 [YAML](https://yaml.org/spec/1.2.2/) 解析。

```
---
unlisted: true
---
```

下表列出了最有用的 frontmatter 字段。你可以在 [Docusaurus 的文档中找到完整列表](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter)。

```mdx-code-block
<APITable>
```

| 名称                    | 类型      | 默认值         | 描述                                                                                                | 建议                                                       |
| ----------------------- | --------- | --------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `sidebar_label`         | `string`  | Markdown 标题（`#`）  | 你的页面在侧边栏中的标题。                                                                     | 考虑改进页面标题，而不是使用 `sidebar_label`。 |
| `sidebar_position`      | `number`  | 字母顺序 | 你的页面在侧边栏中的位置。                                                                  | 仅在侧边栏顺序很重要时使用 `sidebar_position`。     |
| `slug`                  | `string`  | Markdown 文件名    | 你的文档的 URL。                                                                                  | 考虑使用合适的文件名，而不是使用 `slug`。     |
| `toc_min_heading_level` | `number`  | `2`（`##`）            | 目录中显示的最小标题级别。不得高于 `toc_max_heading_level`。 | 考虑改为创建多个页面。                            |
| `toc_max_heading_level` | `number`  | 3（`###`）             | 目录中显示的最大标题级别。必须在 `2` 和 `6` 之间。                         | 考虑改为创建多个页面。                            |
| `unlisted`              | `boolean` | `false`               | 页面在 `creators.vrchat.com` 上发布后，将其从侧边栏中隐藏。                            | 不要取消列出读者可能认为重要的页面。                 |
```mdx-code-block
</APITable>
```

- 不要使用 [`title`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#unlisted) 属性。请改用 Markdown 标题（`#`）。
- 不要使用 [`last_update`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#last_update) 属性。它会自动计算。

## 提示框 {#admonitions}

你可以使用提示框来突出简短、重要的信息。提示框会从我们的其余文本中凸显出来。

- 不要过度使用提示框。
- 不要覆盖提示框的标题。


```
:::tip

Use this for important recommendations or shortcuts.

:::

:::info

Use this for important limitations or context.

:::

:::warning

Use this important warnings or potential errors.

:::

:::danger

Use this for actions that can lead to irreversible damage. 

:::
```

```mdx-code-block
<BrowserWindow>
```
:::tip

用于重要的建议或捷径。

:::

:::info

用于重要的限制或背景信息。

:::

:::warning

用于潜在的错误或如何避免它们。

:::

:::danger

用于可能导致不可逆损害的操作。

:::
```mdx-code-block
</BrowserWindow>
```

## 代码块 {#code-blocks}

要在页面中包含 UdonSharp 代码，请使用三个反引号创建一个[代码块](https://docusaurus.io/docs/markdown-features/code-blocks)。这对示例特别有用。

````md
```
// This is an example code block.
Debug.Log("Hello, world!");
```
````

```mdx-code-block
<BrowserWindow>
```

```
// 这是一个示例代码块。
Debug.Log("Hello, world!");
```

```mdx-code-block
</BrowserWindow>
```

你可以通过启用额外的选项让代码块更易于阅读：

````md
```csharp showLineNumbers title="Assets/Example.cs"
// This is an example code block.
Debug.Log("Hello, world!");
```
````

```mdx-code-block
<BrowserWindow>
```
```csharp showLineNumbers title="Assets/Example.cs"
// 这是一个示例代码块。
Debug.Log("Hello, world!");
```
```mdx-code-block
</BrowserWindow>
```

- 使用 `csharp` 或 `cs` 启用 C# [语法高亮](https://docusaurus.io/docs/markdown-features/code-blocks#syntax-highlighting)。
- 使用 `showLineNumbers` 启用[行号显示](https://docusaurus.io/docs/markdown-features/code-blocks#line-numbering)，
- 如果合适，使用 `title=""` 显示[文件名](https://docusaurus.io/docs/markdown-features/code-blocks#code-title)。

## 代码选项卡 {#code-tabs}

你可以并排显示 Udon Graph 截图和 UdonSharp 代码。读者可以选择自己偏好的语言，所有代码选项卡组件都会同步读者的偏好。

以下是一个如何导入并使用 `Tabs` 和 `TabItem` 的示例：

````md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![A screenshot of the Udon Graph.](/img/worlds/graph-helloworld.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs showLineNumbers
private void Start()
{
    Debug.Log("Hello, world!");
}
```

</TabItem>
</Tabs>
````

```mdx-code-block
<BrowserWindow>
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![Udon Graph 的截图。](/img/worlds/graph-helloworld.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs showLineNumbers
private void Start()
{
    Debug.Log("Hello, world!");
}
```

</TabItem>
</Tabs>

```mdx-code-block
</BrowserWindow>
```
