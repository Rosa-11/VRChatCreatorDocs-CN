
# 性能提示 {#performance-tips}

本页包含一些关于如何提升 UdonSharp 脚本性能的提示。

## UdonSharp 比 C\# 慢 {#udonsharp-is-slower-than-c}
根据你所做的事情不同，Udon 运行一段代码所需的时间可能比普通 C# 中的等效代码长大约 200 倍到 1000 倍。
- 避免编写遍历数千个元素的大型复杂算法。
- 避免每帧遍历非常长的数组。
	- 考虑对数组进行「时间切片」，即每帧只处理有限数量的数组元素。
- 尽可能使用 Unity 原生组件或 VRChat SDK 组件。
	- 例如：不要在 Udon 中旋转 40 个 GameObject，而是使用动画。
- 缓存方法结果以提升性能。
	- 例如：不要每帧获取 [`GameObject.transform`](https://docs.unity3d.com/ScriptReference/GameObject-transform.html) 或 [`Networking.LocalPlayer`](/worlds/udon/players/getting-players/#networkingget-localplayer)，而是在 `Start()` 事件中把它们保存为变量，之后再复用。

## 使用 `private` 方法 {#use-private-methods}
如果方法不会从其他脚本调用，就应将其标记为 `private`。由于 Udon 查找可调用方法的方式，你的 public 方法越少，自定义事件的性能就越好。

跨行为调用比本地方法调用慢。如果可能，请把相似的行为放在同一个 UdonSharpBehaviour 中，而不是拆分到不同的行为里。

别忘了，要发送 [CustomNetworkEvent](/worlds/udon/graph/special-nodes#udonbehaviour-nodes)，目标方法必须是 `public`。如果它不是 public，就不会触发。此外，任何以下划线开头的方法（例如 `_MyLocalMethod`）都不会接收网络事件。

## 不要频繁使用 `GetComponent<T>` {#dont-use-getcomponent-frequently}
你应当只在 `Start()` 事件中，或在不常发生的事件中，使用 `GetComponent<T>`。

`GetComponent<T>()` 很慢，尤其是在 Udon 中检索 UdonSharpBehaviour 类型时。这是因为 UdonSharp 需要插入一个循环，检查所有 UdonBehaviour 以确保它们是正确的 UdonSharpBehaviour 类型。
