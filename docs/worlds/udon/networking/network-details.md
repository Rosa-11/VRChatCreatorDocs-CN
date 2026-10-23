# 网络规格与技巧 {#networking-specs--tricks}

在 Udon 中实现网络可能颇具挑战！在你更有经验之前，尽量让事情保持简单。

## 规格 {#specs}
### 带宽限制 {#bandwidth-limits}

:::note

注意：所有规格均可能变更。你可以在 [Debug Menu 6](/worlds/udon/world-debug-views/#debug-menu-6) 中查看每个对象所用数据的一些具体信息。

:::

- Udon 脚本每秒大约可以发送 **11 千字节**。
- 使用手动同步的 Udon 脚本每次序列化限制为约 **280,496 字节**。
- 使用连续同步的 Udon 脚本每次序列化限制为约 **200 字节**。

如果世界超出限制，其网络会变得拥堵（参见 [IsClogged](/worlds/udon/networking/network-components/#networking-properties)）。这会对 UdonBehaviour 产生不同的影响，具体取决于其同步类型：
* 连续型行为将无法触发网络事件，并在日志中写入错误。
* 手动型行为会缓存该事件并重试。
在这两种情况下，UdonBehaviour 的逻辑都会继续工作，但数据既不会被发送也不会被接收。

尝试以能够减少所需网络流量的方式设计你的脚本。例如：如果一个对象会沿固定或可预测的路径移动，那么它的位置可能不需要同步。相反，它的初始位置、速度和出发时间可能就足够了。

### 连续同步 {#continuous-synchronization}

连续同步适用于频繁变化且中间值无关紧要的数据，例如不规则运动的 Transform 的位置。VRChat 会执行中间值近似以恢复丢失的数据，并会尝试优化连续同步的网络数据。

连续同步每次序列化限制为约 200 字节。

### 手动同步 {#manual-synchronization}

手动同步适用于更新不频繁但更新迅速、且中间值重要的变量。例如，棋盘上棋子的位置应手动同步。

每个手动同步的对象都会按数据大小的系数受到速率限制。发送的数据越多，其发送速率被限制得越严格。脚本可以随心所欲地调用 RequestSerialization，但 Udon 会等到足够的时间过去后，才调用 OnPreSerialization、发送数据，并用结果调用 OnPostSerialization。

手动同步每次序列化限制为 **280,496 字节**。

## 同步变量 {#synced-variables}
这些变量可用于在网络中同步。

:::note
在下面的列表中，'size' 指的是内存中的**近似**大小。进行网络传输时，数据会被序列化，这可能导致传输更多数据。例如，同步一个 `bool` 除了网络开销之外，还会发送**至少** 1 字节的数据（而不是 1 位）。
要查明序列化数据的字节数，请使用 [`OnPostSerialization`](/worlds/udon/networking/network-components/#onpostserialization) 事件中的 `byteCount`。
:::

### Boolean  类型 {#boolean--types}
| 类型 | 大小    |
| ---- | ------- |
| bool | 1 字节  |
### 整数数值类型 {#integral-numeric-types}
| 类型   | 范围                           | 大小    |
|--------|---------------------------------|---------|
| sbyte  | -128 到 127                     | 1 字节  |
| byte   | 0 到 255                        | 1 字节  |
| short  | -32,768 到 32,767               | 2 字节 |
| ushort | 0 到 65,535                     | 2 字节 |
| int    | -2,147,483,648 到 2,147,483,647 | 4 字节 |
| uint   | 0 到 4,294,967,295              | 4 字节 |
| long   | -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807 | 8 字节 |
| ulong  | 0 到 18,446,744,073,709,551,615 | 8 字节 |
### 浮点数值类型 {#floating-point-numeric-types}
| 类型   | 近似范围             | 精度     | 大小    |
|--------|-------------------------------|---------------|---------|
| float  | ±1.5 x 10^(−45) 到 ±3.4 x 10^(38)   | ~6-9 位数字   | 4 字节 |
| double | ±5.0 × 10^(−324) 到 ±1.7 × 10^(308) | ~15-17 位数字 | 8 字节 |
### 向量数学类型与结构（Unity） {#vector-mathematics-types-and-structures-unity}
| 类型        | 范围         | 大小     |
|-------------|---------------|----------|
| [Vector2](https://docs.unity3d.com/ScriptReference/Vector2.html)   | 与 float 相同 | 8 字节  |
| [Vector3](https://docs.unity3d.com/ScriptReference/Vector3.html)   | 与 float 相同 | 12 字节  |
| [Vector4](https://docs.unity3d.com/ScriptReference/Vector4.html)   | 与 float 相同 | 16 字节 |
| [Quaternion](https://docs.unity3d.com/ScriptReference/Quaternion.html)| 与 float 相同 | 16 字节  |
### 颜色结构 {#color-structures}
| 类型     | 范围 / 精度 | 大小    |
|----------|-------------------|---------|
| [Color](https://docs.unity3d.com/ScriptReference/Color.html)  | 与 float 相同     | 16 字节 |
| [Color32](https://docs.unity3d.com/ScriptReference/Color32.html)| 与 byte 相同      | 4 字节 |
### 文本类型与结构 {#text-types-and-structures}
| 类型   | 范围            | 大小           |
|--------|------------------|----------------|
| char   | U+0000 到 U+FFFF | 2 字节        |
| string | 与 char 相同     | 2 字节 / 字符 |
### 其他结构 {#other-structures}
| 类型   | 范围            | 大小           |
|--------|------------------|----------------|
| [VRCUrl](#vrcurl) | U+0000 到 U+FFFF | 2 字节 / 字符 |


### 多个 UdonBehaviour {#multiple-udonbehaviours}


如果一个对象上有多个 UdonBehaviour，同步方法将默认采用最严格的设置——同一个对象上的手动 UdonBehaviour 和连续 UdonBehaviour 都会表现为手动模式。

### 同步数组 {#syncing-arrays}


在同步带有同步数组变量的行为时——请确保始终将这些数组初始化为某个值，例如空数组。如果有任何同步数组未初始化——该行为将无法同步！你可以通过 [OnPostSerialization](/worlds/udon/networking/network-components#onpostserialization) 节点检查序列化是否成功。



### 可见对象的优先级 {#prioritization-of-visible-objects}

Udon 的网络系统会优先处理当前对本地用户可见的同步游戏对象。

Udon 会*定期*检查同步对象所有网格渲染器子对象的可见性。这被用于 Udon 网络负载均衡的服务质量行为中。
