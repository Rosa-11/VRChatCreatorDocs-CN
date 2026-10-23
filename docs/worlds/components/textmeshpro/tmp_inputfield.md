# TMP InputField
[`TMP_InputField`](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/api/TMPro.TMP_InputField.html) 是一个可编辑的文本输入字段。应始终使用它来替代Unity旧版的 `UI.InputField` 组件。
## 属性 {#properties}

| 属性 | 类型 | 描述 |
|----------|------|-------------|
| text | string | 获取或设置输入字段的值。 |
| isFocused | bool | 获取一个值，指示输入字段当前是否拥有焦点并能处理UI事件。该字段为只读。 |
| readOnly | bool | 获取或设置一个值，指示输入字段的值是否为只读。 |
| richText | bool | 获取或设置一个值，指示是否允许富文本编辑。 |
| enable| bool | 启用/禁用所附加的组件。 |

## 方法 {#methods}

| 函数 | 输入 | 输出 | 描述|
|----------|-------|--------|------------|
| SetTextWithoutNotify | string | void | 设置输入字段的值，但不调用 `onValueChanged`。 |
