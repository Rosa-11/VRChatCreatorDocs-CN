# 类暴露树 {#class-exposure-tree}

类暴露树显示UdonSharp中可用的类和方法。

你可以通过转到“VRChat SDK”>“Udon Sharp”>“Class Exposure Tree”打开该窗口。

- 红色 = 未向Udon暴露
- 绿色 = 已向Udon暴露

![Udon类型暴露树](/img/worlds/udon/udonsharp/type-exposure-tree.png)

“Show base members”开关会显示从基类继承且已暴露的方法。例如，任何继承自`UnityEngine.Component`的类都会显示`GetComponent<T>()`函数，因为它们定义在基类中。
