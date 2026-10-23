---
title: "数据字典"
slug: "data-dictionaries"
hidden: false
createdAt: "2023-04-24T23:48:21.052Z"
updatedAt: "2023-05-04T21:39:11.809Z"
---
# 数据字典 {#data-dictionaries}

数据字典以键值对的形式存储[数据令牌（Data Token）](/worlds/udon/data-containers/data-tokens)，与 [C# 字典](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2?view=net-7.0)类似。大多数数据字典函数只是对底层 C# 字典的封装，因此如果你需要更具体的细节，C# 字典文档同样适用。

数据字典的键和值都是数据令牌。这意味着你实际上可以把任何东西用作键。不过，如果你打算序列化为 [VRCJSON](/worlds/udon/data-containers/vrcjson)，则仅支持字符串键。

如果你使用 UdonSharp，请包含 `using VRC.SDK3.Data;` 指令以使用数据字典。

## 构造函数 {#constructors}

| 构造函数         | 结果                                                                                                                                                                                                                                                                                  |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DataDictionary()    | 使用默认初始容量构造一个空 DataDictionary。                                                                                                                                                                                                                   |
| DataDictionary(int) | 使用指定的初始容量构造一个空 DataDictionary。更多细节请参阅 [C# 文档](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2.-ctor?view=net-8.0#system-collections-generic-dictionary-2-ctor(system-int32))。 |

## 属性 {#properties}

| 属性 | 结果                                       |
| -------- | -------------------------------------------- |
| Count    | 获取字典中元素的数量 |

## 函数 {#functions}

| 函数         | 输入                             | 输出                         | 结果                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | --------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add              | DataToken key, DataToken value    |                                | 在指定的键处添加值。此函数与 SetValue 的区别在于，如果键已存在就会抛出异常。这在初始化时很有用，因为它会导致编译错误；但不建议在常规用法中使用，因为它可能导致运行时错误并使你的 UdonBehaviour 停止运行。                                                                         |
| Clear            |                                   |                                | 从此字典中移除所有键和值                                                                                                                                                                                                                                                                                                                                                                                       |
| ContainsKey      | DataToken key                     | bool result                    | 如果此字典中存在指定的键，则返回 true。                                                                                                                                                                                                                                                                                                                                                                           |
| ContainsValue  | DataToken key                     | bool result                    | 如果此字典中存在指定的值，则返回 true。                                                                                                                                                                                                                                                                                                                                                                         |
| DeepClone      |                                   | DataDictionary result          | 将 DataDictionary 克隆到一个包含所有相同值的新 DataDictionary 中。与 ShallowClone 不同，深克隆意味着它会递归进入每个 DataList 或 DataDictionary 内部，并一并复制其内容。TokenType 为 "Reference" 的项将保持与原对象相同的引用，不会被深克隆，其中包含数组。                                                            |
| GetKeys          |                                   | DataList keys                  | 返回一个[数据列表（Data List）](/worlds/udon/data-containers/data-lists)，包含此数据字典中所有存在的键。**使用它可以在 for 循环中遍历数据字典中的所有项。**                                                                                                                                                                                                                                    |
| GetValues      |                                   | DataList values                | 返回一个[数据列表（Data List）](/worlds/udon/data-containers/data-lists)，包含此数据字典中所有存在的值。                                                                                                                                                                                                                                                                                                             |
| Remove           | DataToken key                     | bool success                   | 从此字典中移除指定的键。如果成功移除了任何内容，则返回 true。                                                                                                                                                                                                                                                                                                                                        |
| Remove           | DataToken key                     | bool success, DataToken value  | 从此字典中移除指定的键。如果成功移除了任何内容，则返回 true。如果成功，会将被移除的值复制到 `out DataToken` 中。                                                                                                                                                                                                                                                             |
| SetValue         | DataToken key, DataToken value    |                                | 设置指定键处的值。如果该键不存在，则会添加一个新键。                                                                                                                                                                                                                                                                                                                                              |
| ShallowClone   |                                   | DataDictionary result          | 将 DataDictionary 克隆到一个包含所有相同值的新 DataDictionary 中。与 DeepClone 不同，这意味着如果该 DataDictionary 包含其他 DataList 和 DataDictionary，它们仍将是同一个引用。                                                                                                                                                                                                  |
| TryGetValue      | DataToken key                     | bool success, DataToken output | 从指定的键获取令牌并放入 `out DataToken` 中。如果获取成功则返回 true，失败则返回 false。获取值失败时，`out DataToken` 中会放入一个 DataError 而不是结果。                                                                                                                                                                                            |
| TryGetValue      | DataToken key, TokenType expected | bool success, DataToken output | 从指定的键获取令牌并放入 `out DataToken` 中。如果获取成功则返回 true，失败则返回 false。获取值失败时，`out DataToken` 中会放入一个 DataError 而不是结果。此版本的 `TryGetValue` 包含一个 TokenType，这意味着它会为你自动进行类型检查。如果类型不匹配，它将返回 false 并给出 `DataError.TypeMismatch` |

 注意，对由 Json 生成的数据字典调用那些会影响或查看所有值的函数（例如 `ContainsValue`、`ShallowClone` 和 `GetValues`）将解析所有尚未解析的顶层值，当值很多时这可能开销较大。一旦它们被解析，后续操作的开销就会更低。

## 从 DataDictionary 获取值 {#getting-a-value-from-a-datadictionary}

有几种不同的方法可以从字典中获取值。每种方法都有其各自的适用场景，选择哪一种由你决定。

- [TryGetValue](/worlds/udon/data-containers/data-dictionaries#trygetvalue)
- [带 TokenType 的 TryGetValue](/worlds/udon/data-containers/data-dictionaries#trygetvalue-with-tokentype)
- [简写方括号语法](/worlds/udon/data-containers/data-dictionaries#shorthand-bracket-syntax)

### TryGetValue

如果你想安全地从字典中获取值，但不在意该位置存在什么类型，建议使用 `TryGetValue`。此函数根据获取值是否成功返回 true 或 false。建议将其放入 `if` 或 `branch` 的条件中，这样就能清楚地知道成功时会发生什么、失败时会发生什么。

```csharp title="Example of TryGetValue"
if (dictionary.TryGetValue("key", out DataToken value)) {
    Debug.Log($"Success! {value}");
} else {
    Debug.Log($"Failed! {value}");
}
```

如果确实失败了，你收到的 DataToken 仍然有效，但它包含的将是一个[错误](/worlds/udon/data-containers/data-tokens#errors)，而不是你的数据。

当你想从某个位置获取值，但并不在意它具体是什么时，此方法很适用。

由于此函数没有内置类型检查，你应将它配合某种形式的类型检查使用，无论是 `if`、`branch` 还是 `switch`。如果你只关心某一个特定类型，那么建议直接使用带 TokenType 的 TryGetValue 版本，它会自动进行类型检查。

### 带 TokenType 的 TryGetValue {#trygetvalue-with-tokentype}

如果你想从字典中获取值，但不知道它可能是什么类型，那么进行类型检查很重要。你可以在自己的代码中自行检查，但那可能会变得很杂乱。相反，你可以使用包含 TokenType 的 TryGetValue 版本。这样做时，它表示你只希望在值的类型符合预期时才获取它。否则，它会返回 false，从而可以妥善处理。

当你想从某个特定位置获取特定值，但数据来自外部来源，因而你无法确信该来源提供了正确的数据时，此方法很适用。

```csharp title="Example of TryGetValue with TokenType"
// You could do it this way, but it's a bit ugly
if (dictionary.TryGetValue("key", out DataToken value)) {
    if (value.TokenType == TokenType.DataDictionary)
    {
        Debug.Log($"Success! Matching dictionary has {value.DataDictionary.Count} items");
    }
}

// This approach has a type check built in! It's functionally the same, but streamlined.
if (dictionary.TryGetValue("key", TokenType.DataDictionary, out value)) {
    Debug.Log($"Success! Matching dictionary has {value.DataDictionary.Count} items");
}
```

### 简写方括号语法 {#shorthand-bracket-syntax}

你也可以使用方括号语法在数据字典中设置和获取项，例如 UdonSharp 中的 `dictionary["key"] = "value";` 或 Udon Graph 中的 `DataDictionary Get Item` 节点。此方法更简短、更易用。但请注意，它并非完全安全，如果你尝试执行无效操作（例如尝试从不存在的键获取值），可能会导致你的 udonbehaviour 停止运行。

当你对数据有完全的控制权、能够保证它存在并且类型符合预期时，此方法很适用。否则，建议使用某种形式的 `TryGetValue`。

```csharp title="Example of Shorthand Bracket syntax"
dictionary["A"] = 5;
dictionary["B"] = 10;

// This makes the assumption that A and B will always contain integers.
// This is a safe assumption to make since we set them just above in a controlled environment.
// If the data is coming from an external source, we shouldn't make these assumptions!
int sum = dictionary["A"].Int + dictionary["B"].Int;
```

## 初始化数据字典 {#initializing-a-data-dictionary}

在 UdonSharp 中，数据字典可以在私有变量中初始化。这让你能够拥有一组在代码运行之前就已定义的既有数据。它还支持嵌套字典以及 DataToken 支持的任何其他内容。以下是你应如何使用此语法的示例：

```csharp title="Example of initializing a Data Dictionary"
private DataDictionary users = new DataDictionary()
    {
        { "John Doe", new DataDictionary()
            {
                {"email", "johndoe@example.com"},
                {"age", 35},
                {"address", new DataDictionary()
                    {
                        {"street", "123 Main St"},
                        {"city", "Anytown"},
                        {"state", "CA"},
                        {"zip", 12345}
                    }
                }
            }
        },
        { "Jane Smith", new DataDictionary()
            {
                {"email", "janesmith@example.com"},
                {"age", 28},
                {"address", new DataDictionary()
                    {
                        {"street", "456 Elm St"},
                        {"city", "Anytown"},
                        {"state", "CA"},
                        {"zip", 12345}
                    }
                }
            }
        },
        { "Bob Johnson", new DataDictionary()
            {
                {"email", "bobjohnson@example.com"},
                {"age", 42},
                {"address", new DataDictionary()
                    {
                        {"street", "789 Oak St"},
                        {"city", "Anytown"},
                        {"state", "CA"},
                        {"zip", 12345}
                    }
                }
            }
        }
    };
```

目前，UdonSharp 不支持在函数内部使用此类初始化器。这将是针对 UdonSharp 的功能请求。

目前，Unity 不会序列化 DataDictionary，这意味着**不建议将其用于可序列化的公共变量。**它只应用于 `private` 或 `[NonSerialized] public` 变量。这是我们仍在开发中的功能补充。

## 遍历字典中的所有条目 {#iterating-over-all-entries-in-a-dictionary}

遍历字典中的所有条目与遍历列表略有不同，因为字典是无序的。你不能直接对字典进行索引，必须使用键。为此，我们有 `GetKeys()` 函数。此函数会返回一个包含字典中所有键的 DataList。拿到它之后，你可以使用 for 循环遍历所有键，并访问每个键对应的值。

```csharp title="Example of iterating over all entries in a dictionary"
// First get all the keys in the dictionary
DataList keys = dictionary.GetKeys();

// For loop over all the keys
for (int i = 0; i < keys.Count; i++)
{
    // Get the key at the current index
    DataToken key = keys[i];
    
    // Access the entry connected to that key
    Debug.Log(dictionary[key].ToString());
}
```

GetKeys 乍看之下可能开销很大，但只要没有添加或移除键，它就会被缓存，因此除了 Udon 自身的开销之外，频繁访问它的性能通常是可以接受的。

如果你需要按排序后的顺序遍历字典，得益于这个方法，有一个小技巧：先 `GetKeys()`，然后对键调用 `Sort()`，再走一遍 for 循环。字典本身没有任何顺序的概念，也无法排序，但你可以对你用来访问它的列表进行排序！

如果你想独立于键来处理字典的值，也可以使用 `GetValues()`。这在某些明确需要列出所有值的应用中可能很有用，但值得一提的是，如果你不熟悉字典，此方法可能具有误导性。原因之一在于字典没有顺序，因此当通过 `GetValues()` 获取时，你绝不应依赖某个特定项总是位于某个特定索引，也不应期望这些项的索引与 `GetKeys()` 中的索引正确对应。在大多数情况下，`GetKeys()` 就是你所需的全部，而 `GetValues()` 更多是给需要对字典进行更高级控制的人的一个选项。

## 通过网络与其他玩家同步数据字典 {#syncing-a-data-dictionary-with-other-players-over-the-network}

数据字典无法直接同步。不过，可以使用 [VRCJson](/worlds/udon/data-containers/vrcjson) 将其序列化为 JSON 字符串或从 JSON 字符串反序列化。这是目前推荐的通过 UdonSync 同步数据字典的方法。

其中一种做法是使用 OnPreSerialization 和 OnDeserialization 来序列化和反序列化 json 字符串。使用这种方法，你无需担心代码其余部分中的序列化问题，只需设置值即可，无需操心其他事情。

```csharp title="Example of syncing a Data Dictionary with other players over the network"
[UdonSynced]
private string _json = "";
private DataDictionary _dictionary;

public override void OnPreSerialization()
{
    if (VRCJson.TrySerializeToJson(_dictionary, JsonExportType.Minify, out DataToken result))
    {
        _json = result.String;
    }
    else
    {
        Debug.LogError(result.ToString());
    }
}

public override void OnDeserialization()
{
    if(VRCJson.TryDeserializeFromJson(_json, out DataToken result))
    {
        _dictionary = result.DataDictionary;
    }
    else
    {
        Debug.LogError(result.ToString());
    }
}
```
