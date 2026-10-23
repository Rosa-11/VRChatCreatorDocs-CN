# TMP Text
`TMP_Text`是两个TextMesh Pro组件的基类：

- [`TextMeshProUGUI`](https://docs.unity3d.com/Packages/com.unity.textmeshpro@1.1/api/TMPro.TextMeshProUGUI.html) 允许你使用[画布渲染器](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/UICanvas.html)显示文本。
	- 该组件是UI.Text组件的理想替代品。
	- 根据你想显示文本的方式更改画布的"Render Mode"。
		- "World Space"允许你将文本放置在世界中的任意位置。
		- "Screen Space"允许你直接在用户屏幕上显示文本。
- [`TextMeshPro`](https://docs.unity3d.com/Packages/com.unity.textmeshpro@1.1/api/TMPro.TextMeshPro.html) 允许你使用[网格渲染器](https://docs.unity3d.com/Manual/class-MeshRenderer.html)显示文本。
	- 该组件不需要画布。它是旧版TextMesh组件的理想替代品。

# 属性 {#properties}
使用 `TMP_Text` 基类来访问这些属性。`TextMeshProUGUI` 和 `TextMeshPro` 都继承自 `TMP_Text`。

| 属性           | 类型 | 结果 |
|--------------------|------|--------|
| text               | String | 访问文本。|
| isRightToLeftText  | Bool | 获取/设置文本是否需要从右到左显示。在实现多种语言时很有用。|
| fontMaterial       | Material | 获取/设置字体材质。请注意，访问此字段会克隆材质。|
| fontSharedMaterial | Material | 获取/设置共享字体材质。如果此组件的FontAsset为null，则返回null。|
| color              | Color | 获取/设置文本的颜色。|
| alpha              | Float | 获取/设置文本的不透明度。|
| fontSize           | Float | 获取/设置文本的大小。|
| enableAutoSizing   | Bool | 获取/设置文本是否应尽可能大地调整自身大小，同时仍在FontSizeMin和FontSizeMax范围内可见。|
| fontSizeMin        | Float | 启用AutoSizing时的最小字体大小。|
| fontSizeMax        | Float | 启用AutoSizing时的最大字体大小。|
| horizontalAlignment| HorizontalAlignmentOptions | 文本的水平对齐方式。|
| verticalAlignment  | VerticalAlignmentOptions | 文本的垂直对齐方式。|
| alignment          | TextAlignmentOptions | 文本的整体对齐方式。|
| characterSpacing   | Float | 字符之间的间距。|
| wordSpacing        | Float | 单词之间的间距。|
| lineSpacing        | Float | 文本行之间的垂直间距。|
| paragraphSpacing   | Float | 段落之间的垂直间距。|
| characterWidthAdjustment| Float | 字符之间的重叠量。|
| enableWordWrapping | Bool | 控制超出可用空间的单词是否换到新行。|
| overflowMode       | TextOverflowModes | 控制文本超出可用空间时的处理方式。|
| richText           | Bool | 获取/设置是否启用[富文本](https://docs.unity3d.com/Packages/com.unity.textmeshpro@3.2/manual/RichText.html)。|
| parseCtrlCharacters| Bool | 启用或禁用对输入文本字段中键入的转义字符的解析，例如 `\n`、`\r`、`\t` 或 `\\`。 |
| firstVisibleCharacter | Int | 在Text Overflow Linked模式下应显示的第一个字符。|
| maxVisibleCharacters | Int | 控制输入中可见的字符数量。|
| maxVisibleWords    | Int | 控制输入中可见的单词数量。|
| maxVisibleLines    | Int | 控制显示的文本行数。|
| enable             | bool | 启用/禁用所附加的组件。 |

