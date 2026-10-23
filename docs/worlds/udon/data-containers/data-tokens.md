---
title: "数据令牌"
slug: "data-tokens"
hidden: false
createdAt: "2023-04-24T23:48:30.309Z"
updatedAt: "2023-04-25T00:01:54.599Z"
---
# 数据令牌 {#data-tokens}

数据令牌（Data Token）用于存储数据。每个令牌只存储一个变量，且仅存储一个变量。数据令牌用于[数据字典](/worlds/udon/data-containers/data-dictionaries)和[数据列表](/worlds/udon/data-containers/data-lists)。

数据令牌可以包含以下令牌类型：

- Null
- Boolean
- SByte
- Byte
- Short
- UShort
- Int
- UInt
- Long
- ULong
- Float
- Double
- String
- 数据列表（存储其他 DataToken）
- 数据字典（存储其他 DataToken）
- 对象引用（通过装箱能够存储**任意内容**，但无法被序列化）
- 数据错误（一个指示出错原因的枚举）

## 属性 {#properties}

| Property       | Result                                                                                                                                                                                                                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TokenType      | 返回此 DataToken 所含变量的当前 TokenType                                                                                                                                                                                                                                           |
| IsNumber       | 如果 DataToken 包含任意数值类型，则返回 true。否则返回 false。                                                                                                                                                                                                                               |
| IsNull         | 如果此 DataToken 中包含的值以任何形式为 null，则返回 true。数字和 bool 永远不会为 null，TokenType.Null 始终为 null，字符串会检查是否为 null 但不检查是否为空，而引用则在内部使用 Utilities.IsValid 来处理已离开的玩家和已被销毁的对象。 |
| Boolean        | 如果 DataToken 包含 bool，则返回一个 bool。否则抛出异常。                                                                                                                                                                 |
| Number         | 如果 DataToken 包含任意数值类型，则返回一个 double。否则抛出异常。                                                                                                                                                     |
| SByte          | 如果 DataToken 包含 sbyte，则返回一个 8 位有符号 sbyte。否则抛出异常。                                                                                                                                                |
| Byte           | 如果 DataToken 包含 byte，则返回一个 8 位无符号 byte。否则抛出异常。                                                                                                                                                 |
| Short          | 如果 DataToken 包含 short、sbyte 或 byte，则返回一个 16 位有符号 short。否则抛出异常。                                                                                                                                 |
| UShort         | 如果 DataToken 包含 ushort 或 byte，则返回一个 16 位无符号 ushort。否则抛出异常。                                                                                                                                     |
| Int            | 如果 DataToken 包含 int、sbyte、byte、short 或 ushort，则返回一个 32 位有符号 int。否则抛出异常。                                                                                                                                                                                     |
| UInt           | 如果 DataToken 包含 uint、byte 或 ushort，则返回一个 32 位无符号 uint。否则抛出异常。                                                                                                                                                                                                |
| Long           | 如果 DataToken 包含 long、sbyte、byte、short、ushort 或 uint，则返回一个 64 位有符号 long。否则抛出异常。                                                                                                                                                                              |
| ULong          | 如果 DataToken 包含 ulong、byte、ushort 或 uint，则返回一个 64 位无符号 ulong。否则抛出异常。                                                                                                                                                                                        |
| Float          | 如果 DataToken 包含 float、sbyte、byte、short、ushort、int、uint、long 或 ulong，则返回一个 32 位 float。否则抛出异常。                                                                                                                                                                 |
| Double         | 如果 DataToken 包含 double 或任意其他数值类型，则返回一个 32 位 double。否则抛出异常。                                                                                                                                                                                            |
| String         | 如果 DataToken 包含 string，则返回一个 string。否则抛出异常。                                                                                                                                                                                                                             |
| DataDictionary | 如果 DataToken 包含数据字典，则返回该数据字典。否则抛出异常。                                                                                                                                                                                                           |
| DataList       | 如果 DataToken 包含数据列表，则返回该数据列表。否则抛出异常。                                                                                                                                                                                                                       |
| Reference      | 如果 DataToken 包含对象引用，则返回该对象引用。否则抛出异常。                                                                                                                                                                                                       |
| Error          | 返回与此令牌关联的错误。否则返回 DataError.None。与其他属性不同，访问此属性永远不会抛出异常。如果你从未出错的令牌上访问 Error，它只会返回 DataError.None。                                                   |

## 函数 {#functions}

| Function    | Result                                                                                                                                                                                                                                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Bitcast     | 复用 DataToken 中已有的数据，但更改其类型。类似 C++ 中的 reinterpret_cast，或 C# 中的 BitConverter。如果目标类型小于源类型，会截断该值；如果目标类型大于源类型，会进行零扩展。仅适用于基元类型，并返回一份副本。 |
| ToString    | 将令牌的内容转换为字符串。与访问 String 属性不同，此函数始终会成功，因为它会使用底层值的 ToString。                                                                                                                                                                      |
| GetHashCode | 返回令牌内容的哈希码。这主要用于字典键的内部操作。                                                                                                                                                                                                                                 |
| CompareTo   | 将此令牌与另一个令牌进行比较：如果另一个令牌更大则返回 -1，如果二者相等则返回 0，如果另一个令牌更小则返回 1。列表和字典之类的容器将按元素数量进行比较。当比较两个类型不同且非数值的令牌时，将使用 TokenType 枚举的顺序。 |

## 创建数据令牌 {#creating-data-tokens}

### UdonSharp

在 UdonSharp 中，DataToken 可以“隐式”创建，这意味着当函数需要 DataToken 时，你无需编写 `new DataToken(value)`。你可以直接传入值，它会自动为你创建一个 DataToken。

```csharp title="DataToken Creation"
// You could do this
DataToken _explicitFloat = new DataToken(5.3f);
DataToken _explicitInt = new DataToken(5);
DataToken _explicitString = new DataToken("value");
DataToken _explicitBool = new DataToken(true);

// But this is easier and simpler
DataToken _float = 5.3f;
DataToken _Int = 5;
DataToken _String = "value";
DataToken _Bool = true;
```

:::warning

不要使用 `nameof()` 在 UdonSharp 中隐式创建 DataToken，否则可能会遇到错误。

:::

### Udon Graph

在 Udon Graph 中，你需要使用 `DataToken Implicit` 或 `DataToken Constructor` 节点来创建包含值的 DataToken。  
![data-tokens-7GAcVrY.png](/img/worlds/data-tokens-7GAcVrY.png)

## 从数据令牌中获取值 {#getting-values-out-of-a-data-token}

从 DataToken 中获取值之前，你需要确定它包含的类型，因为如果你试图取出不兼容的类型，它会中止你的 UdonBehaviour。有几种方法可以确保所包含的类型与你想要取出的类型兼容。

- 你可以检查 `DataToken.TokenType` 属性来获取确切的类型
- 从数据列表或数据字典中取出值时，你可以使用 `TryGetValue` 并指定一个 TokenType。如果 TokenType 不正确，该函数会返回 false。
- 你可以检查 `DataToken.IsNumber` 属性来判断它是否为数字。如果是，你就可以安全地取出 `Number` 属性，它会从实际类型向上转换为 double。如果类型是 `long` 或 `ulong`，可能会丢失精度。
- 无论令牌是什么类型，`ToString` 始终是有效的选择，且永远不会抛出错误。

```csharp title="DataToken Retrieval in U#"
// If we know that it's a string, we can safely pull the string out of the token
if (unknownToken.TokenType == TokenType.String)
{
    Debug.Log(unknownToken.String);
}

// We can use IsNumber to see if it's some type of number, even if we don't know which.
if (unknownToken.IsNumber)
{
    Debug.Log(unknownToken.Number);
}

// If we're pulling a value from a container, we can use the version that does its own type check
if (dictionary.TryGetValue("key", TokenType.String, out DataToken value))
{
    Debug.Log(value.String);
}
```

![data-tokens-SqQqE5w.png](/img/worlds/data-tokens-SqQqE5w.png)

一旦你确定类型正确，就可以通过访问 `DataToken.Float` 和 `DataToken.Boolean` 之类的值属性从 DataToken 中取出值。每种类型都有自己的属性，可用于取出该特定类型。

如果你对自己处理的数据拥有完全控制权，那么可以跳过所有 TokenType 检查，直接从令牌中获取值。这可以省去一些额外代码，但请确保在数据来自外部来源，或类型有可能为其他类型时不要这样做。

```csharp title="Example of Shorthand Bracket syntax"
dictionary["A"] = 5;
dictionary["B"] = 10;

// This makes the assumption that A and B will always contain integers.
// This is a safe assumption to make since we set them just above in a controlled environment.
// If the data is coming from an external source, we shouldn't make these assumptions!
int sum = dictionary["A"].Int + dictionary["B"].Int;
```

## 错误 {#errors}

当对数据列表或数据字典的操作失败并返回 DataToken 时，它们会生成一个错误令牌。错误令牌既包含用于分类错误类型的枚举，也包含更具体地阐述该错误的字符串。并非所有错误都会生成字符串，因为没有必要进一步阐述。

如果你有一个错误令牌，可以使用 `DataToken.Error` 获取错误枚举，使用 `DataToken.String` 获取消息。你也可以使用 `DataToken.ToString()`，它会自动将枚举和字符串组合成一条完整且美观的消息，从而便于直接调用 `Debug.Log(token)`

错误令牌可以是以下几种之一：

| Value            | Meaning                                                                                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| KeyDoesNotExist  | 你试图从数据字典中访问某个键，但该键不存在                                                                                                                                       |
| IndexOutOfRange  | 你试图从数据数组中访问某个索引，但该索引小于 0，或大于等于数组的元素数量。                                                                           |
| TypeMismatch     | 你试图访问某个值，但该值的类型并非你所期望的类型。请注意，这仅在你使用接受类型的 TryGetValue 版本时才会发生。                                             |
| TypeUnsupported  | 数据容器中包含了你尝试使用的序列化格式不支持的类型。如果你将引用令牌放入数据容器，然后尝试将其序列化为 Json，就可能发生这种情况。        |
| ValueUnsupported | 数据容器中包含了你尝试使用的序列化格式不支持的值。如果你将 NaN 或 Infinity 浮点数放入数据容器，然后尝试将其序列化为 Json，就可能发生这种情况。 |
| UnableToParse    | 无法解析该序列化格式。当源 Json 无效时会发生这种情况。                                                                                                                             |

```csharp title="TryGetValue with TokenType"
if (dictionary.TryGetValue("key", TokenType.Float out DataToken value)) {
    // If TryGetValue succeeds, we can do things with the token
    Debug.Log($"Successfully retrieved value {token.Float}");
} else {
    // If TryGetValue fails, the token will instead be an error
    Debug.Log($"Failed to retrieve value with error {token.Error}");
}
```

![data-tokens-zcqKePv.png](/img/worlds/data-tokens-zcqKePv.png)

## 常见问题 {#faq}

### String 和 ToString 有什么区别？ {#what-is-the-difference-between-string-and-tostring}

`DataToken.String` 和 `DataToken.ToString()` 相似但并不完全相同，因为 `DataToken.String` 专门访问 DataToken 内部的字符串值，而 `DataToken.ToString()` 则是将现有的任何内容转换为字符串。

因此，无论 DataToken 包含什么内容，`ToString` 始终有效，并且永远不会中止你的 UdonBehaviour。如果它包含 bool，则会返回 true 或 false。如果它包含数字，则会使用 `ToString("G", CultureInfo.InvariantCulture)` 创建该数字的字符串表示形式。

另一方面，只有当 DataToken 包含字符串时，访问 `DataToken.String` 才有效。如果 DataToken 包含 float 而你尝试访问 `DataToken.String`，则会抛出异常，并且你的 UdonBehaviour 会中止。

DataError 的独特之处在于它同时包含错误枚举和字符串。建议对 DataError 使用 `ToString()`，因为 `ToString()` 会将枚举和字符串组合成一条单一消息，其中既包含错误，也包含出错原因。

### 为什么没有一个直接给出值、跳过令牌的 TryGetValue？ {#why-not-have-a-trygetvalue-that-gives-the-value-directly-skipping-tokens}

拥有一个直接提供值、绕过令牌需求的 TryGetValue 方法会很有帮助。这是一个合理的问题，因为总是先从容器中取出令牌，然后单独访问容器中的值确实很繁琐。为了简化这一过程，我们考虑过若干方案，其中已经实现的一个方案是在 TryGetValue 中内置类型检查。

我们考虑过的另一种方案是创建 TryGetValue 的泛型版本，通过 T 参数指定系统类型。尽管 UdonSharp 支持这种做法（至少静态方法中支持），但 Udon 本身并不支持。此外，虽然此方案会带来便利，但它会导致在出错时无法通过 DataToken 返回 DataError，而是改为返回默认值。最终，我们决定不实现此方案，因为它会向用户隐藏错误，使问题更难被识别。幸运的是，用户可以利用 UdonSharp 自行创建泛型取值方案。这得益于 UdonSharp 中可用的泛型、静态成员和扩展方法。
