---
unlisted: true
---
# 迁移 {#migration}

UdonSharp 0.x（.unitypackage版本）已弃用且不再受支持。

较新版本的UdonSharp包含在VRChat世界SDK中，可通过[Creator Companion](https://vcc.docs.vrchat.com)轻松安装。我们建议你[使用Creator Companion迁移项目](https://vcc.docs.vrchat.com/vpm/migrating)。如果你想手动执行迁移，请阅读[手动迁移](#manual-migration)。

## UdonSharp 1.0中的新特性 {#new-features-in-udonsharp-10}
* **更多C#特性**可用于你的UdonSharp程序：
	* `static`方法
	* 泛型`static`方法
	* `params`、`out`、`ref`和默认参数
	* 扩展方法
	* 继承、虚方法和抽象类
	* 分部类
	* 枚举
- 在Unity检视面板中**多选编辑**多个UdonSharp脚本
- 现在完全支持**预制件变体**、**实例**和**嵌套**
- **编辑器脚本**已重构并简化
- **编译器修复**和**优化**
- **修复了各种错误**、边界情况和其他粗糙之处

## 已知问题 {#known-issues}

从非常旧的UdonSharp版本迁移项目时，你可能会遇到一些已知问题。以下是解决方法。

:::tip 先试试这个！

UdonSharp给你带来麻烦了吗？尝试通过“Assets”>“Reimport All”重新导入所有资源。

在许多情况下，这可以修复与UdonSharp相关的导入问题，尤其是在从旧版本迁移或升级项目时。

:::

### 嵌套预制件 {#nested-prefabs}

**问题**：UdonSharp一直警告不要使用嵌套预制件。从旧版本迁移时，嵌套预制件可能会损坏。

**症状**：Unity控制台中出现类似`Cannot upgrade scene behaviour 'SomethingOrOther' since its prefab must be upgraded`的错误。

**解决方法**：先在0.x UdonSharp项目中解包预制件。你也可以打开“Udon Sharp”菜单项并选择“Force Upgrade”。

### 不属于U#程序集 {#does-not-belong-to-u-assembly}

**问题**：拥有自己的程序集定义的库也需要有一个U#程序集定义。

**症状**：Unity控制台中出现类似`[UdonSharp] Script 'Assets/MyScript.cs' does not belong to a U# assembly, have you made a U# assembly definition for the assembly the script is a part of?`的错误。

**解决方法**：
1. 使用Project窗口找到脚本所在目录或父目录中以`.asmdef`结尾的文件。
2. 在包含此程序集定义的文件夹中右键单击，然后选择`Create > U# Assembly Definition`。
3. 选择这个新的U# asmdef，并使用检视面板将其“Source Assembly”设置为另一个程序集定义文件。
4. 执行此操作后，你可能需要重启Unity。

### Newtonsoft.Json.Dll

**问题**：某些包包含此JSON库的自带副本，而VRCSDK本身也会引入该库。这会导致库出现两个副本。

**症状**：Unity控制台中出现提到上述库的错误。它可能不在句首，而是类似`System.TypeInitializationException: the type initializer for blah blah blah...Assets/SketchfabForUnity/Dependencies/Libraries/Newtonsoft.Json.dll`

**解决方法**：从Assets文件夹中删除任何Newtonsoft.Json.dll的副本。VRCSDK将通过Package Manager为任何需要它的包提供该库。

### 其他破坏性变更 {#other-breaking-changes}
- 你的U#行为名称必须与.cs文件名匹配。
- 重复的程序资源不得引用同一个`.cs`文件。
- 程序资源必须指向一个脚本，且不能为空。
- 编辑器脚本现在有所不同：数据由UdonSharpBehaviour的C#代理拥有，而对应的UdonBehaviour在运行时之前为空。
- 已过时的station和玩家加入事件重载可能不再可用。

## 手动迁移 {#manual-migration}

按照以下步骤升级使用1.0以下版本UdonSharp的项目，且不使用Creator Companion：

1. 备份你的项目。
2. 从项目的“Assets”文件夹中删除VRCSDK文件夹、Udon文件夹、UdonSharp文件夹以及Gizmos/UdonSharp文件夹。
3. 下载并安装[世界SDK的Unity Package版本](https://vrchat.com/download/sdk3-worlds)。
4. 下载并安装[UdonSharp SDK的Unity Package版本](https://github.com/vrchat-community/UdonSharp/releases/download/1.1.7/com.vrchat.udonsharp-1.1.7.unitypackage)。
