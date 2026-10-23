# Udon VM 与 Udon 汇编 {#the-udon-vm-and-udon-assembly}

:::info
本页由 VRChat 社区成员撰写。感谢你的贡献！
VRChat 团队无法保证本页信息的准确性。如果你想提出修改建议，请前往本页底部并点击「Edit this page」。
:::

## Udon VM 概览 {#overview-of-the-udon-vm}

Udon VM 是一个字节码解释器，用于运行编译后的 Udon Graph 程序。

因此，记住它有哪些特性和不具备哪些特性很重要：

* Udon VM 预期运行在 .NET 环境之中。虽然访问函数时并不使用反射，但 Udon VM 的「风格」是仿照这种方式的。
* 它不直接实现调用/返回或子程序（不过 `JUMP_INDIRECT` 确实存在，可以用于该目的）。
* 它具有流程控制能力，通过 `JUMP`、`JUMP_INDIRECT` 和 `JUMP_IF_FALSE` 实现。
* 它可以调用 C# 中的函数（在被允许的范围内）。
* 它没有局部变量；只有对象上的字段。
* 它有一个整数栈，但在大多数情况下，这个整数栈应被当作操作码的「额外参数」。可以把它用作调用/返回机制的一部分，但要记住没有局部变量，因此递归函数必须非常小心地实现。

:::tip

你可以从 Udon Graph 和 UdonSharp 程序中导出 Udon 汇编。

这有助于了解你编写的代码是如何被编译的，也能帮你找到 extern 名称！

:::

## Udon 类型 {#udon-types}

「Udon 类型」是 Udon 用来指代 C# 类型的方式。

理解这些类型名最简单的方法，是从对应的 .NET 名称开始，例如 `System.Int32[]`。

Udon 类型的构造有多种规则：

* 所有 `.` 和 `+` 都会被移除，即 `VRC.SDKBase.VRCPlayerApi+TrackingData` 会变成 `VRCSDKBaseVRCPlayerApiTrackingData`。
* 类型名后可能附加 `Array`，表示 `[]`。

因此，上面的例子是 `SystemInt32Array`。

## Udon 汇编 {#udon-assembly}

Udon 汇编程序由两个部分组成：数据段和代码段。

这些段用起始/结束指令标记，如下所示：

```
.data_start
    # Data goes here!
.data_end
.code_start
    # Code goes here, instead!
.code_end
```

### 数据段 {#the-data-section}

数据段标记该行为的变量，以及哪些是导出的（public）。

这些段中的数据存储在「Udon 堆」中，尽管名字如此，它实际上是一个带有类型的扁平值数组。「堆索引」就是这个数组中的索引。

在 Udon 汇编中定义变量的示例：

```
message: %SystemString, "Hello, world!"
```

在这里，变量的符号是 `message`，类型是 `SystemString`，内容是 `"Hello, world!"`。

注意，这个类型更准确的说法是_初始_类型，因为变量在运行时可以改变类型（但如果它是 public 的，大概不应该这样做）。

值可以是 `null`、`this`、`true`、`false`、字符串、字符常量、整数、无符号整数（以 `u` 结尾的整数）以及浮点数，不过汇编器对于何时可以指定这些值有严格要求。

具体而言：

* `SystemSingle` 和 `SystemDouble` 必须是数字或 `null`。
* `SystemInt32` 和 `SystemUInt32` 必须是任意一种整数或 `null`。
* `SystemString` 必须是字符串字面量或 `null`。
* 所有其他类型，包括 `SystemObject`，只能是 `this` 或 `null`。

`this` 并不完全具有其「传统」含义。根据变量的类型，它可以是：

* `GameObject`：`UdonBehaviour` 的 `GameObject`。
* `Transform`：`GameObject.transform`。
* `UdonBehaviour`、`IUdonBehaviour` 或 `Object`：`UdonBehaviour` 本身。

如果它不属于上述任何一种，就会发生错误。

:::caution

目前在 Udon 汇编中无法为 `SystemType` 指定非 null 值，但在 Udon Graph 和 UdonSharp 中可以。`SystemInt64`、`SystemUInt64`、`SystemSByte`、`SystemByte`、`SystemInt16`、`SystemUInt16` 和 `SystemBoolean` 也存在类似问题（没错，实际上无法_成功_指定 `true` 或 `false`）。

这些是 Udon 汇编的限制。只有不使用 Udon 汇编才能绕过它们。

浮点数始终按 float 读取，即使预期类型是 double。

:::

这些变量也可以标记为 public，例如使用 `.export message`，还可以用同步元数据标记，例如 `.sync message, none`。

用同步元数据标记变量相当于勾选 `synced` 复选框；详情参见[网络](../networking#variables)。

这里的 `none` 是插值模式。插值模式有 `none`、`linear` 和 `smooth`，不过并非所有插值模式对所有类型都有效。

### 代码段 {#the-code-section}

代码段是一系列操作码，带有标签和可能的导出。

```
.export _start
_start:
	PUSH, message
	EXTERN, "UnityEngineDebug.__Log__SystemObject__SystemVoid"
	JUMP, 0xFFFFFFFC
```

`.export _start`（这是一个示例；请把 `_start` 替换为你正在导出的符号）用于为事件处理器导出代码符号。

标准事件以 `_` 开头，其参数通过变量传入，而不是 public 的，你需要自行创建这些变量；这个列表很长，最好通过 Udon Graph 来探索。

不过重要的是，最先运行的两个事件依次是 `_onEnable` 和 `_start`。在这最初的运行中，它们之间没有间隔，而且它们总是会在任何其他事件之前运行；如果有东西试图绕过这一点，该调用将被忽略。详情参见[事件执行顺序](../event-execution-order)。

自定义事件从不接收参数（在你自定义的机制之外），并且不以 `_` 开头。

实际操作码相当简单。先是操作码名称，然后对于某些操作码还有一个参数。这个参数可以是整数、符号（即该符号的整数值，例如堆索引或代码地址）或字符串。当它是字符串时，汇编器会为该字符串创建一个隐藏的、未命名的变量，而实际的值将是堆索引。

:::caution

出于某种原因，不允许定义指向同一位置的两个代码符号，这会引发 `Address aliasing detected` 错误。

:::

## Udon 操作码 {#udon-opcodes}

### `NOP`

* 操作码：0
* 参数：0

该操作码不做任何事。通常没有理由使用它，除非你遇到了 `Address aliasing detected:` 错误。

### `PUSH, parameter`

* 操作码：1
* 参数：1

该操作码把一个整数压入栈顶。

Udon 汇编可能给人一种正在压入某个值的印象；事实并非如此。

在这些情况下，被压入的是堆地址。

除非你非常执着于对 Udon 程序进行体积优化（在某些情况下甚至不惜牺牲运行时速度），或者想进行混淆，否则永远没有理由以条件方式使用它。只需在 `EXTERN`、`COPY` 或 `JUMP_IF_FALSE` 之前立即压入所有内容即可。

### `POP`

* 操作码：2
* 参数：0

该操作码从栈中移除顶部的整数，没有其他效果。

### `JUMP_IF_FALSE, parameter`

* 操作码：4
* 参数：1

从栈中弹出一个堆索引，并从其中读取一个 `SystemBoolean`。

如果该值为 `false`，则把参数作为字节码位置跳转过去。否则，继续执行下一条指令。

### `JUMP, parameter`

* 操作码：5
* 参数：1

跳转到参数所给的字节码位置。

`JUMP, 0xFFFFFFFC` 也用于结束执行（即从 Udon 代码返回）。

### `EXTERN, parameter`

* 操作码：6
* 参数：1

该操作码是 Udon 执行任何有用操作的方式。

首先要指出的是，参数是一个堆索引，初始时包含 extern 名称（作为字符串），_但这个位置也会被写入。_

作为一项优化，Udon 在给定堆索引中首次运行后会缓存关于该 extern 的信息。这些值仍然是堆值，可以被复制。

extern 的参数按 `PUSH` 顺序给出，也就是说，最先压入的值就是第一个参数。

对于普通（即 `in`）参数，这些堆值会被读取；对于 `ref` 参数，会被读取并写入；对于 `out` 参数，会被写入。

如果该 extern 不是静态的（即它有一个 `this` 参数），`this` 参数会被添加到开头。如果有返回值（即返回类型不是 `SystemVoid`），它会在末尾被当作一个 `out` 参数处理。

### `ANNOTATION, parameter`

* 操作码：7
* 参数：1

这实际上是一个「长 NOP」。参数会被忽略。

### `JUMP_INDIRECT, parameter`

* 操作码：8
* 参数：1

从参数获取一个堆索引，并从中读取一个 `SystemUInt32`。

把它解释为字节码位置并跳转过去。

### `COPY`

* 操作码：9
* 参数：0

弹出两个堆索引。第二个弹出的堆索引（也就是第一个压入的堆索引）中的值会被复制到第一个弹出的堆索引（也就是第二个压入的堆索引）。

## Extern 参考 {#externs-reference}

:::caution

依赖 extern 签名的确切格式并不明智，除非你依赖的是已知存在的特定 extern。

这种格式在最好的情况下也很怪异，而且从签名推断诸如「这是否是静态方法」这样的属性是不可能的，更不用说泛型的细节了。

如果你要制作依赖对 API 完整认知的东西，你很可能需要编写 C# 代码来抓取 Udon Graph 节点列表。

:::

extern 的形式为 `SomeUdonTypeName.SomeSignature`。（有一种情况下 Udon 类型名被「伪化」了，那就是 `VRCInstantiate`。）

这里，示例将是 `SystemDateTimeOffset.__TryParseExact__SystemString_SystemStringArray_SystemIFormatProvider_SystemGlobalizationDateTimeStyles_SystemDateTimeOffsetRef__SystemBoolean`。

它对应 `System.DateTimeOffset.TryParseExact(string, string[], System.IFormatProvider, System.Globalization.DateTimeStyles, out System.DateTimeOffset)`。这是一个静态方法。值得注意的是，如果它不是静态方法，'this' 参数仍然不会在签名中标记出来。

签名本身总是以 `__` 开头，接着是函数名，然后是 `__`。对于构造函数，函数名是 `ctor`；在这里是 `TryParseExact`。

随后每个非 `this` 参数以其 Udon 类型名依次出现，用 `_` 分隔。对于 `ref` 和 `out` 参数，Udon 类型名有一个特殊修饰符，即 `Ref` 后缀。

最后，签名以 `__` 结尾，后面跟着返回类型的 Udon 类型名。

有一些特别怪异的情况：

* 泛型会在签名中把其类型参数列为「Udon 类型」，例如 `T`，并拥有不可见的 `SystemType` 参数。
* `VRCUdonUdonBehaviour` 会变成 `VRCUdonCommonInterfacesIUdonEventReceiver`。（如果相关，`Array` 仍会被附加，等等。）

_目前还没有完整的 extern 参考。_

不过：

* [UdonSharp 文档中有 VRChat 方法的 API 参考。](https://udonsharp.docs.vrchat.com/vrchat-api)
* UdonSharp 提供了一种探索可用内容的方式，即 [Class Exposure Tree](https://udonsharp.docs.vrchat.com/class-exposure-tree)。

:::caution

目前 UdonSharp Class Exposure Tree 中复制成员名称的功能是损坏的。这是快速查看有哪些可用内容的好方法，但你仍然需要用 Udon Graph 来实际获取 extern 名称。

:::
