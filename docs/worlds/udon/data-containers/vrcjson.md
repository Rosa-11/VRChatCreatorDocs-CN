---
title: "VRCJSON"
slug: "vrcjson"
hidden: false
createdAt: "2023-04-24T23:48:39.230Z"
updatedAt: "2023-04-26T15:25:05.803Z"
---
# VRC JSON

[数据字典](/worlds/udon/data-containers/data-dictionaries)和[数据列表](/worlds/udon/data-containers/data-lists)包含用于与 JSON 相互转换的函数。数据列表等价于 JSON 数组，JSON 对象等价于以字符串为键的数据字典。

关于 JSON 模式本身，请参阅 [Json 文档](https://www.json.org/json-en.html)以了解更多细节。本页内容均与 JSON 模式的这一特定实现相关。

## JSON 函数 {#json-functions}

| Function                       | Inputs                          | Outputs                        | Result                                                                                                                                                                                                                                                                           |
| ------------------------------ | ------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VRCJson.TryDeserializeFromJson | String input                    | success bool, DataToken result | 根据 JSON 字符串输入创建 DataList 或 DataDictionary。如果成功，则返回 true，结果令牌将是 DataDictionary 或 DataList。如果失败，则返回 false，并在结果令牌中放入一个说明问题所在的错误。       |
| VRCJson.TrySerializeToJson     | DataToken input, JsonExportType | success bool, DataToken result | 尝试将 DataDictionary 或 DataList 转换为 JSON 字符串输出。如果成功，则返回 true，结果令牌将是一个包含最终 Json 的字符串。如果失败，则返回 false，并在结果令牌中放入一个说明问题所在的错误。 |

- 请注意，在 Udon Graph 中，所有类名开头的"VRC"都会被移除，因此你需要搜索"Json"才能找到这些函数。
- 在 UdonSharp 中，这些类位于 `VRC.SDK3.Data` 命名空间中。

## 支持的类型与值 {#supported-types-and-values}

JSON 是一份小巧、简单且严格的规范。DataList 和 DataDictionary 能够支持范围广泛得多的配置，这意味着在从数据容器转换为 JSON 时，你可能会遇到一些限制。请务必了解这些限制，并在打算使用 JSON 的场景中避免使用这些配置。

**JSON 不支持 `Object Reference` 数据令牌。**如果你尝试序列化到 JSON 时数据容器中包含任何对象引用，TrySerializeToJson 函数将返回 false，并给出 `DataError.TypeUnsupported`

**JSON 仅支持以字符串为键的字典。**如果你尝试序列化到 JSON 时 DataDictionary 中包含任何非字符串的键，TrySerializeToJson 函数将返回 false，并给出 `DataError.TypeUnsupported`。

**JSON 不支持 NaN 或 Infinity。**如果你有任何包含 NaN 或 Infinity 的 float 或 double，TrySerializeToJson 函数将返回 false，并给出 `DataError.ValueUnsupported`。

**JSON 的根节点只支持 Dictionary 或 List。**如果你使用一个不带任何子级的简单值 DataToken，TrySerializeToJson 函数将返回 false，并给出 `DataError.TypeUnsupported`。

**JSON 只支持一种数字类型。**它不会区分所有不同的类型。因此，从 JSON 反序列化时会将所有数字存储为 `Double` 格式。如果你的数据令牌包含其他类型的数字，例如 `int`、`byte` 或 `float`，那么它们可以序列化到 JSON；但如果你再将同一个 JSON 反序列化回数据容器，你会发现它们现在变成了 `Double`。

## 从 JSON 反序列化 {#deserializing-from-json}

当你想从 Json 转换为数据容器时，应使用 `VRCJson.TryDeserializeFromJson` 函数。建议将它用作 `if` 或 `branch` 的条件，这样你就可以针对失败和成功分别选择要执行的操作。

如果 TryDeserializeFromJson 返回 true，说明它已成功将你的 Json 字符串转换为 DataList 或 DataDictionary。此时你应对结果进行类型检查，以确定各种情况下要执行的操作。

如果它返回 false，说明你提供的字符串不是有效的 JSON。你得到的 DataToken 将是一个 DataError，如果对它运行 DataToken.ToString，它会同时给出错误以及一个更详细解释具体出错原因的字符串。

出于性能考虑，VRCJSON 不会立即解析所有内容。相反，它首先只解析 JSON 的顶层。如果顶层有效，但嵌套结构内部更深处存在无效 JSON，那么最初的 TryDeserializeFromJson 有可能返回 true。之后，当你使用 TryGetValue 从某个无效内容中取值时，它会返回 false，并给出 DataError.UnableToParse。

```csharp title="Deserializing from JSON"
if (VRCJson.TryDeserializeFromJson(json, out DataToken result))
{
    // Deserialization succeeded! Let's figure out what we've got.
    if (result.TokenType == TokenType.DataDictionary)
    {
        Debug.Log($"Successfully deserialized as a dictionary with {result.DataDictionary.Count} items.");
    }
    else if (result.TokenType == TokenType.DataList)
    {
        Debug.Log($"Successfully deserialized as a list with {result.DataList.Count} items.");
    }
    else 
    {
        // This should not be possible. If TryDeserializeFromJson returns true, this it *must* be either a dictionary or a list.
    }
} else {
    // Deserialization failed. Let's see what the error was.
    Debug.Log($"Failed to Deserialize json {json} - {result.ToString()}");
}
```

## 序列化到 JSON {#serializing-to-json}

当你想从数据容器转换为 Json 时，应使用 `VRCJson.TrySerializeToJson` 函数。建议将它用作 `if` 或 `branch` 的条件，这样你就可以针对失败和成功分别选择要执行的操作。

如果 TrySerializeToJson 返回 true，说明它已成功将你的 DataList 或 DataDictionary 转换为 Json 字符串，你可以安全地从结果令牌中取出该字符串。

```csharp title="Serializing to JSON"
if (VRCJson.TrySerializeToJson(dictionary, JsonExportType.Beautify, out DataToken json))
{
    // Successfully serialized! We can immediately get the string out of the token and do something with it.
    Debug.Log($"Successfully serialized to json: {json.String}");
} 
else 
{
    // Failed to serialize for some reason, running ToString on the result should tell us why.
    Debug.Log(json.ToString());
}
```

### JsonExportType

序列化到 Json 时，你可以选择所需的 JsonExportType。如果你需要人类可读的内容，Beautify 更合适。如果你需要紧凑的内容以便通过网络发送，Minify 更合适。

- Beautify：将每个元素展开到新的一行，并按深度每层添加一个制表符。
- Minify：将所有内容保持在一行，并尽可能减少空白字符。
