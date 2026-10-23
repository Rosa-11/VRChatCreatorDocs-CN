---
title: "数据列表"
slug: "data-lists"
hidden: false
createdAt: "2023-04-24T23:48:11.427Z"
updatedAt: "2023-04-26T15:18:56.307Z"
---
# 数据列表 {#data-lists}

数据列表（Data Lists）按索引存储[数据令牌（Data Tokens）](/worlds/udon/data-containers/data-tokens)，类似于[C#的List](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-7.0)。大多数数据列表函数只是对底层C#列表的封装，因此如果你需要更具体的细节，C#列表的文档同样适用。

数据列表可以使用[VRCJSON](/worlds/udon/data-containers/vrcjson)序列化为JSON字符串或从JSON字符串反序列化。这是目前推荐的通过网络同步数据列表的方法。

如果你使用UdonSharp，请包含`using VRC.SDK3.Data;`指令以使用数据列表。

## 构造函数 {#constructors}

| 构造函数                     | 结果                                                                                                                                                                                                                                                                |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DataList()                   | 使用默认初始容量构造一个空的DataList。                                                                                                                                                                                                                               |
| DataList(int)                | 使用指定的初始容量构造一个空的DataList。更多细节请参阅[C#文档](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.-ctor?view=net-8.0#system-collections-generic-list-1-ctor(system-int32))。 |
| DataList(params DataToken[]) | 构造一个DataList，并用给定的DataToken对象填充它。                                                                                                                                                                                                     |

## 属性 {#properties}

| 属性 | 结果                                                                                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Capacity | 设置或获取列表的容量。更多细节请参阅[C#文档](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.capacity?view=net-8.0)。 |
| Count    | 获取列表中的元素数量                                                                                                                                                 |

## 函数 {#functions}

| 函数        | 输入                                      | 输出                         | 结果                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------- | ------------------------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add             | DataToken                                  |                                | 在列表末尾添加一个令牌                                                                                                                                                                                                                                                                                                                                                                                                           |
| AddRange      | DataList                                   |                                | 将另一个数据列表的值添加到此数据列表的末尾。                                                                                                                                                                                                                                                                                                                                                                            |
| BinarySearch    | DataToken value                            | int index                      | 使用二分查找算法通过比较在列表中定位特定元素。**要执行二分查找，列表必须已排序**。有关二分查找的更多细节，请参阅[C#文档](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.binarysearch?view=net-8.0)。                                                                                                               |
| BinarySearch    | DataToken value, int startIndex, int count | int index                      | 在指定范围内执行二分查找，从提供的索引开始，并按提供的数量向列表末尾方向延伸。请注意，此函数通过比较进行搜索，并且会按数量而非内容比较字典和列表。这使得它不适合在列表中查找特定的字典或列表。                                                                                  |
| Clear           |                                            |                                | 从此列表中移除所有值。                                                                                                                                                                                                                                                                                                                                                                                                            |
| Contains        | DataToken value                            | bool result                    | 如果数据列表包含指定的值，则返回true。                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| DeepClone     |                                            | DataList result                | 将DataList克隆到一个包含所有相同值的新DataList中。这确实会进行深克隆，这意味着它会递归地深入每个DataList或DataDictionary并复制其内容。但是，它不会深入其他结构（例如数组），这些结构仍将保留对原始对象的相同引用。                                                                                   |
| GetRange        | int index, int count                       | DataList output                | 将DataList的一段复制到另一个DataList。如果index或count超出范围，则返回false。                                                                                                                                                                                                                                                                                                                                  |
| IndexOf       | DataToken item                             | int index                      | 搜索指定对象，并返回其在整个DataList中第一次出现的从零开始的索引。如果未找到，则返回-1。                                                                                                                                                                                                                                                                                              |
| IndexOf       | DataToken item, int startIndex             | int index                      | 搜索指定对象，并返回其在DataList中从指定索引延伸到最后一个元素的元素范围内第一次出现的从零开始的索引。如果未找到，则返回-1。                                                                                                                                                                                                                                                                                  |
| IndexOf       | DataToken item, int startIndex, int count  | int index                      | 搜索指定对象，并返回其在DataList中从指定索引开始且包含指定数量元素的元素范围内第一次出现的从零开始的索引。如果未找到，则返回-1。                                                                                                                                                                                           |
| Insert          | int index, DataToken input                 | bool success                   | 在列表中间插入一个令牌。指定索引之上的所有条目都将向上移动一位。如果index超出范围，则返回false。                                                                                                                                                                                                                                                                                           |
| InsertRange     | int index, DataList input                  |                                | 将一个DataList插入到DataList中间。指定索引之上的所有条目都将向上移动。如果index超出范围，则返回false。                                                                                                                                                                                                                                                                                        |
| LastIndexOf   | DataToken item                             | int index                      | 搜索指定对象，并返回其在DataList中最后一次出现的从零开始的索引。如果未找到，则返回-1。                                                                                                                                                                                                                                                                                                      |
| LastIndexOf   | DataToken item, int startIndex             | int index                      | 搜索指定对象，并返回其在DataList中从第一个元素延伸到指定索引的元素范围内最后一次出现的从零开始的索引。如果未找到，则返回-1。                                                                                                                                                                                                                  |
| LastIndexOf   | DataToken item, int startIndex, int count  | int index                      | 搜索指定对象，并返回其在DataList中从包含指定数量元素并以指定索引结束的元素范围内最后一次出现的从零开始的索引。如果未找到，则返回-1。                                                                                                                                                                                              |
| Remove        | DataToken value                            | bool success                   | 移除指定值的第一次出现。如果找到匹配的值，则返回true，否则返回false。                                                                                                                                                                                                                                                                                                                        |
| RemoveAll     | DataToken value                            | bool success                   | 移除指定值的所有出现。如果找到任何匹配的值，则返回true，否则返回false。                                                                                                                                                                                                                                                                                                                         |
| RemoveAt        | int index                                  |                                | 移除指定索引处的元素。                                                                                                                                                                                                                                                                                                                                                                                                   |
| RemoveRange     | int index, int count                       |                                | 从列表中移除一定范围的元素。                                                                                                                                                                                                                                                                                                                                                                                                    |
| Reverse         |                                            |                                | 反转列表中所有元素的顺序。                                                                                                                                                                                                                                                                                                                                                                                               |
| Reverse         | int index, int count                       |                                | 反转指定范围内元素的顺序，从提供的索引开始，并按提供的数量向列表末尾方向延伸。                                                                                                                                                                                                                                                                                     |
| SetValue        | int index, DataToken input                 |                                | 在指定索引处设置一个DataToken。                                                                                                                                                                                                                                                                                                                                                                                                      |
| ShallowClone  |                                            | DataList result                | 将DataList克隆到一个包含所有相同值的新DataList中。这不会进行深克隆，这意味着如果DataList包含对其他数据容器的引用，这些引用仍将是相同的引用。                                                                                                                                                                                                              |
| Sort          |                                            |                                | 对列表中的所有元素进行排序。如果所有元素都是同一类型，则会按该类型的原生比较操作进行排序。如果DataList包含多种不同类型，但这些类型都是数字，则会通过数值转换对它们进行排序。如果DataList包含多种不同的非数字类型，则会按以下顺序排序：`Null, Number, String, DataList, DataDictionary, Reference` |
| Sort          | int index, int count                       |                                | 执行与Sort相同的操作，但仅在指定范围内进行，从提供的索引开始，并按提供的数量向列表末尾方向延伸。                                                                                                                                                                                                                                                                       |
| ToArray         |                                            | DataToken\[] output            | 将DataList转换为DataToken数组                                                                                                                                                                                                                                                                                                                                                                                                  |
| TrimExcess      |                                            |                                | 如果元素数量低于某个阈值，则将容量设置为DataList中元素的实际数量。                                                                                                                                                                                                                                                                                                                            |
| TryGetValue     | int index                                  | DataToken output               | 从指定索引获取一个令牌并将其放入`out DataToken`。如果成功则返回true。                                                                                                                                                                                                                                                                                                                                         |
| TryGetValue     | int index, TokenType expected              | bool success, DataToken output | 从指定索引获取一个令牌并将其放入`out DataToken`。如果成功则返回true。此版本的`TryGetValue`包含一个TokenType，这意味着它会为你执行自动类型检查。如果类型不匹配，它会返回false，并给出`DataError.TypeMismatch`                                                                                                                                              |

 请注意，在由Json生成的数据列表上调用会影响或查看所有值的函数（例如`Contains`、`IndexOf`和`LastIndexOf`）时，会解析所有尚未解析的顶层值，这在值很多时可能开销很大。一旦它们被解析，后续操作的开销就会更低。

## 从DataList获取值 {#getting-a-value-from-a-datalist}

有几种不同的方法可以从DataList中获取值。每种方法都有自己的适用场景，你可以自行选择想要使用哪一种。

- [TryGetValue](/worlds/udon/data-containers/data-lists#trygetvalue)
- [带TokenType的TryGetValue](/worlds/udon/data-containers/data-lists#trygetvalue-with-tokentype)
- [简写的方括号语法](/worlds/udon/data-containers/data-lists#shorthand-bracket-syntax)

### TryGetValue

如果你想安全地从列表中获取值，建议使用`TryGetValue`。这个函数会根据是否成功获取值来返回true或false。建议将它放在`if`或`branch`的条件中，这样就能清楚地知道成功时会发生什么、失败时会发生什么。

```csharp title="Example of TryGetValue"
if (list.TryGetValue(0, out DataToken value))
{
    Debug.Log($"Success! {value}");
}
else
{
    Debug.Log("Failed! {value}");
}

```

如果它确实失败了，你收到的DataToken仍然有效，但它包含的不再是你的数据，而是一个[错误](/worlds/udon/data-containers/data-tokens#errors)。

当你想要从某个位置获取某个值，但并不关心它具体是什么时，这个方法很合适。

由于此函数没有内置类型检查，你应该将此函数与某种形式的类型检查搭配使用，无论是`if`、`branch`还是`switch`。如果你只关心某一种特定类型，那么建议直接使用带TokenType的TryGetValue版本，它会执行自动类型检查。

### 带TokenType的TryGetValue {#trygetvalue-with-tokentype}

如果你想从列表中获取值，而又不知道它可能是什么类型，那么进行类型检查就很重要。你可以在自己的代码中自行实现，但那可能会变得很乱。相反，你可以使用包含TokenType的TryGetValue版本。这样做时，它表示只有当值是所期望的类型时才检索它。否则，它会返回false，从而可以优雅地处理。

当你想要从特定位置获取特定值，但数据来自外部来源、因此你无法确信来源拥有正确的数据时，这个方法很合适。

```csharp title="Example of TryGetValue with TokenType"
// 你可以这样做，但有点难看
if (list.TryGetValue(0, out DataToken value)) {
    if (value.TokenType == TokenType.DataDictionary)
    {
        Debug.Log($"Success! Matching dictionary has {value.DataDictionary.Count} items");
    }
}

// 这种方法内置了类型检查！功能上相同，但更精简。
if (list.TryGetValue(0, TokenType.DataDictionary, out value)) {
    Debug.Log($"Success! Matching dictionary has {value.DataDictionary.Count} items");
}
```

### 简写的方括号语法 {#shorthand-bracket-syntax}

你也可以使用方括号语法从DataList中设置和获取条目，例如UdonSharp中的`list[5] = "value";`或Udon Graph中的`DataList Get Item`节点。这种方法更简短、更易用。但是，请注意这并不完全安全，如果你尝试执行无效操作，可能会中止你的UdonBehaviour。只有当你能完全控制数据，并且能保证它存在且是你期望的类型时，才应该使用这种方法。否则，建议使用某种形式的`TryGetValue`。

```csharp title="Example of Shorthand Bracket syntax"
list[0] = 5;
list[1] = 10;

// 这里假设索引0和1始终包含整数。
// 这是一个安全的假设，因为我们刚刚在受控环境中设置了它们。
// 如果数据来自外部来源，我们就不应该做这些假设！
int sum = list[0].Int + list[1].Int;
```

## 初始化数据列表 {#initializing-a-data-list}

在UdonSharp中，可以在私有变量中初始化数据列表。这允许你拥有一组预先存在的数据，在代码运行之前就已定义。这也支持嵌套字典以及DataToken支持的其他任何内容。以下是你应该如何使用此语法的示例：

```csharp title="Example of initializing a Data List"
private DataList _groceries = new DataList()
{
    "Bananas",
    "Grapes",
    "Milk",
    "Soda",
    "Turkey",
    "Ham",
    "Roast Beef"
}
```

目前，UdonSharp不支持在函数内使用这种类型的初始化器。这将是UdonSharp的功能请求。

目前，Unity不会序列化DataList，这意味着**不建议将其用于序列化的公共变量。**它只应用于`private`或`[NonSerialized] public`变量。这是我们仍在开发的功能的补充。

## 通过网络与其他玩家同步数据列表 {#syncing-a-data-list-with-other-players-over-the-network}

数据列表无法直接同步。但是，可以使用[VRCJson](/worlds/udon/data-containers/vrcjson)将其序列化为JSON字符串或从JSON字符串反序列化。这是目前推荐的通过UdonSync同步数据列表的方法。

一种方法是使用OnPreSerialization和OnDeserialization来序列化和反序列化json字符串。使用这种方法，你无需担心代码其余部分的序列化问题，只需设置值然后忘掉它即可。

```csharp title="Example of syncing a Data List with other players over the network"
[UdonSynced]
private string _json;
private DataList _list;

public override void OnPreSerialization()
{
    if (VRCJson.TrySerializeToJson(_list, JsonExportType.Minify, out DataToken result))
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
        _list = result.DataList;
    }
    else
    {
        Debug.LogError(result.ToString());
    }
}
```

## 常见问题 {#faq}

### 为什么不为每种类型都提供一个ToArray？ {#why-not-have-a-toarray-for-each-type}

为每种数据类型都提供一个ToArray方法会很理想。但是，由于Udon中缺乏对泛型的支持，目前这并不可行。虽然从技术上讲可以为ToStringArray、ToFloatArray、ToDoubleArray等创建单独的方法，但这种做法会导致大量的膨胀，以覆盖所有可能的类型。此外，一旦Udon 2引入对泛型的支持，这些方法就会过时。而且，基本的ToArray方法不会提供显著的附加价值。真正的优势将来自于能够对对象类型执行ToArray，例如ToArray(typeof(Collider))，这将消除类型转换的需要。然而，支持所有可能对象的ToArray并不实际，而专门支持object的ToArray甚至比使用令牌更糟。

尽管从DataToken中检索值的过程可能有些繁琐，但它们正是为此目的而设计的，并且有多种实用工具可以帮助完成这项任务。

### 数组与之类似，有什么区别？ {#arrays-are-similar-whats-the-difference}

数组是一种类似的结构，用于按顺序存储大量值，并通过索引访问。它们也非常简单，并且非常高效地_恰好_做这件事，别无其他。DataList是一种更复杂的类型，可以做得更多。例如，数组在首次创建时必须用特定长度初始化，除非你创建一个新数组来替换它，否则无法添加更多项。但不要被迷惑——仍然有充分的理由使用数组而不是列表。

### 什么时候应该使用DataList而不是数组？ {#when-should-i-use-a-datalist-instead-of-an-array}

当你需要某个特定功能时，才应该选择DataList而不是数组，所以并非所有内容都需要切换。

- 当你想要动态地向容器添加新项或从中移除项时。数组无法做到这一点。
- 当你想要让单个容器同时包含多种不同类型时。数组无法做到这一点。
- 当你想要让容器任意包含容器时。数组可以做到这一点，但必须定义严格的深度。DataList可以按你想要的任意深度嵌套。

### 什么时候应该使用数组而不是DataList？ {#when-should-i-use-an-array-instead-of-a-datalist}

- 当性能至关重要时，例如每帧遍历一个容器。DataList可能会因为从令牌中取出值而产生非常少量的性能开销。
- 当你想要通过网络同步容器时。如果你确实绝对需要一个DataList，DataList从技术上讲可以通过JSON支持这一点，但比起普通的数组同步，这在性能和带宽上的开销都要大得多。
- 当你的容器只需要包含一种特定类型时。DataList当然可以做到这一点，但它们绕过了C#的严格类型特性。这意味着你的代码编辑器将无法确切知道容器包含什么类型，这可能会让你写出原本会成为编译错误的缺陷。
- 当你想要包含Data Token不直接支持的类型时。Data Token可以通过对象引用和装箱来包含任何类型，但这并不理想。你需要将引用取出_并且_将其转换为你想要的类型。
