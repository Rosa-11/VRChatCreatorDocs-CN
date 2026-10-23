# TMP Dropdown

[`TMP_Dropdown`](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/api/TMPro.TMP_Dropdown.html) 是一个标准下拉菜单，点击时会显示一个选项列表，你可以从中选择一个。应始终使用它来替代Unity旧版的 `UI.Dropdown` 组件。

## 属性 {#properties}

| 属性 | 类型 | 描述 |
|----------|------|-------------|
| value    | int  | 获取或设置下拉菜单中选中元素的索引。 |
| IsExpanded| bool | 获取一个值，指示下拉菜单是否已展开。 |
| enable| bool | 启用/禁用所附加的组件 |

## 方法 {#methods}

| 函数              | 输入        | 输出 | 描述                                                                                                                                                                                                                                                           |
| --------------------- | ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SetValueWithoutNotify | int          | void   | 设置输入字段的值，但不调用 `onValueChanged`。                                                                                                                                                                                                  |
| RefreshShownValue     |              |        | 刷新当前选中选项的文本和图像（如果可用）。                                                                                                                                                                                         |
| ClearOptions          |              |        | 从下拉菜单中移除所有选项。                                                                                                                                                                                                                                |
| Show                  |              |        | 显示下拉菜单。请规划好下拉菜单的滚动，以确保下拉菜单位于屏幕内。[TMP假定Canvas就是下拉菜单必须保持在其中的屏幕。](https://docs.unity3d.com/Packages/com.unity.textmeshpro@2.0/api/TMPro.TMP_Dropdown.html) |
| Hide                  |              |        | 隐藏下拉列表。                                                                                                                                                                                                                                              |

## 相关类 {#related-classes}

Udon可以访问两个与TMP_Dropdown相关的额外类。

### VRCTMPDropdownExtension
该类是VRChat SDK的一部分。它允许你向下拉菜单添加选项。

| 函数   | 输入                           | 输出 | 描述                                                                              |
| ---------- | ------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| AddOptions | TMP_Dropdown,<br/> string[]     |        | 将字符串数组添加到下拉菜单。                                               |
| AddOptions | TMP_Dropdown,<br/> sprite[]     |        | 将Sprite数组添加到下拉菜单。                                               |
| AddOptions | TMP_Dropdown,<br/> OptionData[] |        | 将 [TMP_Dropdown.OptionData](#tmp_dropdownoptiondata) 数组添加到下拉菜单。 |

:::note 扩展方法
在UdonSharp中，AddOptions是一个[扩展方法](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)。

除了 `AddOptions(dropdown, options)`，你还可以写 `dropdown.AddOptions(options)`。请确保在文件中包含了命名空间 `VRC.SDK3.Components`。
:::
### TMP_Dropdown.OptionData
这是TextMesh Pro内置的。它允许你向下拉菜单添加字符串和Sprite的组合。

| 函数  | 输入 | 输出 | 描述|
|------------|-------|--------|------------|
| Constructor| string |OptionData| 创建一个以文本为选项的OptionData对象。 |
| Constructor| sprite|OptionData| 创建一个以Sprite为选项的OptionData对象 |
| Constructor| string, sprite |OptionData| 创建一个以文本和Sprite为选项的OptionData对象 |

## 如何向下拉菜单添加Sprite {#how-to-add-sprites-to-a-dropdown}

下拉菜单可以为每个选项显示不同的Sprite。你需要正确设置你的下拉菜单：

1. 向下拉菜单添加一个图像。

![在下拉菜单层级视图中添加图像，把标签移开 - 第1部分](/img/worlds/components/VRC_DropdownAddLabelScene.png)
![第2部分](/img/worlds/components/VRC_DropdownAddLabelHierarchie.png)

2. 向模板添加一个图像。

![在模板层级视图中添加图像，把标签移开 - 第1部分](/img/worlds/components/VRC_DropdownAddLabelTemplateScene.png)
![第2部分](/img/worlds/components/VRC_DropdownAddLabelTemplateHierarchie.png)

3. 在下拉菜单的 `Caption Image` 和 `Item Image` 字段中添加正确的引用。

![第2部分](/img/worlds/components/VRC_DropdownAddLabelInspector.png)

4. 成功！下拉菜单现在可以显示Sprite了。
