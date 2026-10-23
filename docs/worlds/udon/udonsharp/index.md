---
sidebar_position: -1
---
# UdonSharp

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

UdonSharp允许你用C#创建Udon脚本。UdonSharp包含在VRChat世界SDK中，会将你的C#编译为Udon Assembly代码。

- 添加有用的[特性](./attributes)以扩展UdonSharp脚本的功能。
- 打开[类暴露树](./class-exposure-tree)以查看UdonSharp中可用的C#类和方法。
- 更改你的[配置](./configuration)以禁用自动编译或更改其他设置。
- 了解如何编写[自定义编辑器脚本](./editorscripting)。
- 了解如何[迁移](./migration)使用非常旧版本UdonSharp的项目。

## 如何创建UdonSharp脚本 {#how-to-create-an-udonsharp-script}

你可以按照以下步骤，通过Project窗口或层级视图创建UdonSharp脚本。

### 在Project窗口中 {#in-the-project-window}
1. 在项目的资源浏览器中右键单击。
2. 导航到“Create”>“U# script”。
3. 单击“U# script”。这将打开文件创建对话框。
4. 为脚本选择一个名称，然后单击“Save”。
5. 这将在同一目录中创建一个`.cs`脚本文件，以及一个为该脚本设置好的UdonSharp程序资源。
### 在层级视图中 {#in-the-hierarchy-window}
1. 在场景中创建一个新的游戏对象。
2. 向该对象添加`Udon Behaviour`组件。
3. 在“New Program”按钮下方，单击下拉菜单并选择“Udon C# Program Asset”。
4. 现在单击“New Program”按钮。这将为你创建一个新的UdonSharp程序资源。
5. 单击“Create Script”按钮，选择脚本的保存位置和名称。

创建新的UdonSharp脚本后，你会得到两个文件：
- 一个“UdonSharp Program Asset”文件。（创建后无需编辑此文件。）
- 一个`.cs`文件。它包含`UdonSharpBehaviour`类，如下所示：

<Tabs>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;
using UnityEngine;
using VRC.SDKBase;
using VRC.Udon;

public class YourScriptName : UdonSharpBehaviour
{
    void Start()
    {
        
    }
}
```

</TabItem>
</Tabs>

在你选择的编辑器中编辑UdonSharpBehaviour，然后开始编程。你可以将UdonSharpBehaviour添加到场景中的任何GameObject上。



## 支持的C#特性 {#supported-c-features}

UdonSharp支持C#的大部分基本语法：

- 流控制：`if`, `else`, `while`, `for`, `do`, `foreach`, `switch`, `return`, `break`, `continue`, `ternary operator (condition ? true : false)`, `??`
- 隐式和显式类型转换
- 数组和数组索引器
- 所有内置算术运算符
- 条件短路`(true || CheckIfTrue())`不会执行`CheckIfTrue()`
- `typeof()`
- 带`out`或`ref`参数的extern方法，例如`Physics.Raycast()`的许多变体
- 用户定义的方法，带有参数和返回值，支持out/ref、扩展方法和`params`
- 用户定义的属性
- 静态用户方法
- UdonSharpBehaviour继承、虚方法等
- 带参数的Unity/Udon事件回调。例如，注册带`VRCPlayerApi`参数的`OnPlayerJoined`事件是有效的。
- 字符串插值
- 字段初始化器
- 交错数组
- 引用其他自定义UdonSharpBehaviour类、访问字段并调用其上的方法
- 通过`[RecursiveMethod]`特性支持递归方法调用

## 与Unity/C#特性的差异 {#differences-from-unityc-features}

UdonSharp不符合任何版本的C#语言规范。某些C#特性未实现或无法正常工作。

- 为获得创建UdonSharp脚本的最佳体验，请让你的脚本继承`UdonSharpBehaviour`，而不是`MonoBehaviour`。
- 如果某个序列化为`Behaviour`的字段对应的行为是`UdonSharpBehaviour`组件，则更改该字段的`enabled`状态不会生效。你应该改用自定义U#脚本的类型来序列化该字段。
- Udon和UdonSharp目前仅支持数组`[]`集合和[数据容器](/worlds/udon/data-containers)。暂不支持`List<T>`等泛型集合。
- 字段初始化器在编译时求值。如果有任何初始化逻辑依赖场景中的其他对象，应使用`Start`。
- 对希望为所有玩家通过网络同步的字段使用`[UdonSynced]`特性。
- 由于UdonVM的限制，数值转换会检查溢出。
- `.GetType()`返回的变量内部类型并不总是符合你的预期，因为U#会抽象某些类型以使其在Udon中工作。例如，任何交错数组类型都会返回`object[]`类型，而不是像二维`int`交错数组的`int[][]`那样。


## 示例脚本 {#example-scripts}

### 旋转立方体演示 {#the-rotating-cube-demo}

这会将其附加到的对象每秒旋转90度。

```cs
using UnityEngine;
using UdonSharp;

public class RotatingCubeBehaviour : UdonSharpBehaviour
{
    private void Update()
    {
        transform.Rotate(Vector3.up, 90f * Time.deltaTime);
    }
}
```

### 其他示例 {#other-examples}

- VRChat世界SDK在`Assets/UdonSharp/UtilityScripts`中包含UdonSharp示例。
	- 如果未使用这些脚本，可以安全地删除它们。
- 如需更多示例脚本，请查看[GitHub wiki示例](https://github.com/vrchat-community/UdonSharp/wiki/examples)或U#附带的Examples文件夹。
- 访问[VRChat Creator Hub](https://ask.vrchat.com/c/creator-hub/63/none)，与其他创作者交流并查看他们的示例。

## 常见问题 {#frequently-asked-questions}

### UdonSharp是否支持所有Udon特性？ {#does-udonsharp-support-all-udon-features}
是。如果Udon支持某项功能，那么UdonSharp也支持。你可以查看[类暴露树](https://github.com/Merlin-san/UdonSharp/wiki/class-exposure-tree)以了解UdonSharp可以访问的所有内容。

### 一个GameObject上可以有多个UdonSharp UdonBehavior吗？ {#can-i-have-more-than-one-udonsharp-udonbehavior-on-a-gameobject}
可以。

### 我从零开始，需要使用C#教程。哪些常见的C#方面在UdonSharp中无法使用？ {#im-starting-from-scratch-and-need-to-use-c-tutorials-what-common-aspects-of-c-dont-work-in-udonsharp}
如果你正在学习UdonSharp，且尚不熟悉C#，你可能会遇到一些常用技术目前在Udon和UdonSharp中无法使用。这些包括但不限于以下内容：
- 泛型类（`Class<T>`）和非静态泛型方法，
- 接口
- 方法重载
- 属性
