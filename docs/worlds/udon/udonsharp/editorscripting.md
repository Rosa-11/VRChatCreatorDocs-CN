# 编辑器脚本 {#editor-scripting}

UdonSharp包含一个编辑器脚本API，允许你创建自定义编辑器，以及创建与UdonSharpBehaviour交互的编辑器脚本，就像与普通C#版本的行为交互一样。

在大多数情况下，编辑器脚本API允许你编写能像C#版本脚本一样正常工作的C#代码，但在使用这些脚本时，有一些事项需要牢记。

U#编辑器脚本的基础是：UdonSharp会创建行为脚本的C#版本实例，并在后台将UdonBehaviour版本脚本中的字段复制到C#“代理”中。这个代理就是你在大多数时候会通过编辑器脚本与之交互的对象。

## 代理 {#proxies}
UdonSharp脚本是有效的C#代码，因此你可以将它们作为代理添加到GameObject上，与典型的独立组件并列。代理类似于Unity的`SerializedObject`类型，你对SerializedObject所做的任何更改都需要应用到原始对象，而原始对象的任何更改都需要更新到序列化对象上。

代理创建在与其所支持的UdonBehaviour相同的GameObject上，并处于禁用状态。它们应在任何时候都保持禁用，这样Unity就不会在它们身上执行事件。它们被标记为在GameObject检视面板中隐藏，因此你无法直接在GameObject上看到它们，但它们确实存在。代理还被标记为不保存在场景中，也不保存在构建中，因此你不必担心它们会让包或下载体积膨胀，因为它们只存在于编辑器中。

你可以在代理上执行方法，其效果与在UdonBehaviour上运行事件相同。你需要记住的主要一点是，在C#中UdonSharpBehaviour并不是UdonBehaviour，下文对此有更详细的解释。

## 与常规C#行为和U#的差异 {#differences-from-regular-c-behaviours-and-from-u}
### UdonSharpBehaviour不是UdonBehaviour {#udonsharpbehaviours-are-not-udonbehaviours}
在UdonSharp代码中，可以将**UdonBehaviour**视为**UdonSharpBehaviour**，因为它们在内部表示为同一个对象。严格来说，UdonSharpBehaviour实际上并不继承自UdonBehaviour，因此在UdonSharp中工作时，最好使用`UdonSharpBehaviour`而不是`UdonBehaviour`作为变量类型。

因此，除非你希望允许人们接入由图表构建的Udon行为，否则应始终优先使用`UdonSharpBehaviour`而不是`UdonBehaviour`作为变量类型。

### 仅对UdonSharpBehaviour变量自动处理代理引用 {#proxy-references-are-automatically-handled-only-for-udonsharpbehaviour-variables}
只有UdonSharpBehaviour的变量类型会自动处理其代理。当你在一个代理行为中引用另一个代理行为时，代理系统会自动将该引用转换为UdonBehaviour引用。因此，引用其他**UdonSharpBehaviour**的变量应存储为具体的**UdonSharpBehaviour**类型；如果该变量可以存储任何**UdonSharpBehaviour**类型，则存储为基类**UdonSharpBehaviour**类型。

如果你使用`UdonBehaviour`类型的变量、存储普通的`Component`引用，或使用任何有歧义的内容，代理系统只会将引用填充为底层UdonBehaviour。如果你希望允许引用图表资源，这很好，因为它们不属于代理API的范畴。

需要记住的重要一点是：如果你将代理行为的引用直接存储在非UdonSharpBehaviour变量或UdonSharpBehaviour的某个子类变量中，该引用会在构建时被清除为null。例如，如果你想要一个`Component`引用，请确保它引用的是UdonBehaviour，而不是代理UdonSharpBehaviour。

### 代理始终处于禁用状态，并应保持禁用 {#proxies-are-always-disabled-and-should-remain-disabled}
代理会被禁用，以防止Unity调用事件并在游戏过程中对它们运行相同逻辑两次。你绝不应重新启用代理行为。由于代理行为处于禁用状态，如果你在代理行为上运行会调用GetComponentInChildren之类的方法，而没有让它同时获取已禁用的行为，它将不会返回代理。

## 为你的UdonSharpBehaviour创建自定义检视面板 {#making-a-custom-inspector-for-your-udonsharpbehaviour}
在为UdonSharpBehaviour创建自定义编辑器时，大多数内容都已被抽象，程度与创建普通自定义检视面板完全相同。你只需创建一个继承自`Editor`的类，并添加带有UdonSharpBehaviour类型的`CustomEditor`特性。

在为任何U#或C#脚本创建自定义编辑器时，必须确保编辑器代码不包含在游戏构建中，因为它使用了Unity游戏不允许的编辑器库（如果包含这些库，你的世界将无法构建）。

有两种推荐的方法可以将编辑器代码排除在你的世界之外。
- 将检视面板脚本放在名为**Editor**的文件夹中。
- 将代码包裹在对预处理器定义`UNITY_EDITOR`的检查中，例如：
```cs
#if UNITY_EDITOR
[CustomEditor(typeof(CustomInspectorBehaviour))]
public class CustomInspectorEditor : Editor
{
    ...
}
#endif
```

对`UnityEditor`等仅编辑器命名空间使用using语句时，也需要包裹在相同的`UNITY_EDITOR`检查中

如果你想将检视面板写在UdonSharpBehaviour脚本所在的同一脚本文件中，需要使用`COMPILER_UDONSHARP`预处理器定义，以防止UdonSharp解析仅编辑器代码。结合上面的示例，代码将如下所示：
```cs
public class CustomInspectorBehaviour : UdonSharpBehaviour 
{
    ...
}

#if !COMPILER_UDONSHARP && UNITY_EDITOR
[CustomEditor(typeof(CustomInspectorBehaviour))]
public class CustomInspectorEditor : Editor
{
    ...
}
#endif
```

:::warning

`COMPILER_UDONSHARP`预处理器定义只会在与UdonSharpBehaviour相同的脚本内为`true`。不包含UdonSharpBehaviour且未连接到UdonSharpProgramAsset的外部脚本，永远不会将`COMPILER_UDONSHARP`设置为`true`。

:::

:::warning

不要使用`COMPILER_UDONSHARP`或`UNITY_EDITOR`有条件地删除或添加UdonSharpBehaviour的字段。这会导致意外行为

:::

创建自定义检视面板时，应始终以以下代码开始OnInspectorGUI
```cs
if (UdonSharpGUI.DrawDefaultUdonSharpBehaviourHeader(target)) return;
```
这会处理绘制默认的UdonSharp标头，其中包含C#脚本的“转换为行为”按钮、同步设置、交互设置和实用工具。你也可以单独绘制各个部分，查看`DrawDefaultUdonSharpBehaviourHeader()`的实现，了解可以绘制哪些内容。

### 示例检视面板 {#example-inspector}
此示例包含在UdonSharp中

```cs
using UnityEngine;
using VRC.SDK3.Components;
using VRC.SDKBase;
using VRC.Udon;

#if !COMPILER_UDONSHARP && UNITY_EDITOR // 这些using语句必须包裹在此检查中，以防止构建时出现问题
using UnityEditor;
using UdonSharpEditor;
#endif

namespace UdonSharp.Examples.Inspectors
{
    /// <summary>
    /// 带有自定义检视面板的示例行为
    /// </summary>
    public class CustomInspectorBehaviour : UdonSharpBehaviour 
    {
        public string stringVal;

        private void Update()
        {
            Debug.Log($"CustomInspectorBehaviour: {stringVal}");
        }
    }

    // 编辑器脚本必须包裹在UNITY_EDITOR检查中，以防止上传世界时出现问题。!COMPILER_UDONSHARP检查可防止UdonSharp对此处不支持的代码抛出错误。
#if !COMPILER_UDONSHARP && UNITY_EDITOR 
    [CustomEditor(typeof(CustomInspectorBehaviour))]
    public class CustomInspectorEditor : Editor
    {
        public override void OnInspectorGUI()
        {
            // 绘制默认的“转换为UdonBehaviour”按钮、程序资源字段、同步设置等。
            if (UdonSharpGUI.DrawDefaultUdonSharpBehaviourHeader(target)) return;

            CustomInspectorBehaviour inspectorBehaviour = (CustomInspectorBehaviour)target;

            EditorGUI.BeginChangeCheck();

            // 简单的字符串字段修改，并处理撤销
            string newStrVal = EditorGUILayout.TextField("String Val", inspectorBehaviour.stringVal);

            if (EditorGUI.EndChangeCheck())
            {
                Undo.RecordObject(inspectorBehaviour, "Modify string val");

                inspectorBehaviour.stringVal = newStrVal;
            }
        }
    }
#endif
}
```

## 使用[Handles](https://docs.unity3d.com/ScriptReference/Handles.html) {#using-handles}
这与创建自定义检视面板GUI相同，大多数内容都会自动处理。你只需在Editor上使用OnSceneGUI事件，就应能按预期工作。

## 使用[Gizmos](https://docs.unity3d.com/ScriptReference/Gizmos.html) {#using-gizmos}
Gizmos需要一些特殊处理才能按预期工作。其中一个[示例脚本](https://github.com/vrchat-community/UdonSharp/blob/master/Packages/com.vrchat.UdonSharp/Samples~/CustomInspectors/CustomInspectorChildBehaviour.cs#L33)使用了Gizmos。对于Gizmos，你应将OnDrawGizmos事件本身包裹在与包裹编辑器相同的`#if !COMPILER_UDONSHARP && UNITY_EDITOR`检查中，而**OnDrawGizmos**和**OnDrawGizmosSelected**事件应放在行为本身上。

Gizmos使用附加到所有带有UdonSharpProgramAsset的UdonBehaviour的代理行为来绘制。它们不会通过Udon执行，因为Udon在非播放模式下不会运行UdonBehaviour。Gizmos事件不由UdonSharp管理，因此你需要做一些工作来确保代理行为是最新的。为此，请调用以下两个方法中的任意一个，两者作用相同，`UpdateProxy`只是为了模拟Unity的序列化对象API。
```cs
// 调用这个
UdonSharpEditorUtility.CopyUdonToProxy(this);
// 或者这个
this.UpdateProxy();
// 不要同时调用两者，因为那会做重复的工作
```
你可以在上面链接的示例脚本中看到此示例。

## 非检视面板编辑器脚本 {#non-inspector-editor-scripts}
当创建用于创建/删除/修改UdonSharpBehaviour的编辑器脚本时，你需要自行管理代理的更新并应用其修改。

### 添加UdonSharpBehaviour {#adding-an-udonsharpbehaviour}
添加新的UdonSharpBehaviour很简单，只需获取要附加到的GameObject，并在其上调用.`AddUdonSharpComponent<T>()`。
```cs
GameObject targetGameObject = ... // 在此处从某处获取一个游戏对象
MyComponentType newComponent = targetGameObject.AddUdonSharpComponent<MyComponentType>();
```
现在newComponent是组件类型MyComponentType的有效UdonSharpBehaviour代理。你可以像从编辑器脚本操作任何其他C#组件一样与它交互。如果你希望组件创建操作可以撤销，请改用：
```cs
GameObject targetGameObject = ... // 在此处从某处获取一个游戏对象
MyComponentType newComponent = UdonSharpUndo.AddComponent<MyComponentType>(targetGameObject);
```

### 获取现有的UdonSharpBehaviour {#getting-an-existing-udonsharpbehaviour}
UdonSharp为GetComponent(s)提供了等效项，定义为GameObject的扩展方法。在使用编辑器脚本时，不要调用`GetComponent<T>()`，而应调用其等效的`GetUdonSharpComponent<T>()`。

要获取GameObject子级上所有类型为`MyComponentType`的UdonSharpBehaviour，可以这样做：
```cs
GameObject sourceGameObject = ... // 在此处从某处获取一个游戏对象
MyComponentType[] myComponents = sourceGameObject.GetUdonSharpComponentsInChildren<MyComponentType>();
```

### 使用并修改UdonSharpBehaviour {#working-with-an-udonsharpbehaviour-and-modifying-it}
一旦有了可用的UdonSharpBehaviour，你就需要确保对代理所做的任何修改都会传播到Udon。

如果Udon正在对行为做任何更改，并且你使用的是GetUdonSharpComponent(s)，那么行为应会得到更新，因为这些方法会自动更新行为。如果你存储了行为的引用，则需要自行更新它。这可以通过在行为上调用`UpdateProxy()`来完成。

修改行为后，必须将代理行为上的修改应用到Udon。这可以通过在行为上调用`ApplyProxyModifications()`来完成。

你可以将其视为类似于使用Unity SerializedObject的操作。

```cs
MyComponentType myComponent = ...
// 如果我们为其存储了某些持久引用，才需要更新代理
myComponent.UpdateProxy();
// 为我们行为上的一个`float`加5
myComponent.myFloatField += 5f;
// 将myComponent的更改应用到它的Udon副本
myComponent.ApplyProxyModifications();
```

## 销毁UdonSharpBehaviours {#destroying-udonsharpbehaviours}
应使用UdonSharpEditorUtility.DestroyImmediate()方法销毁UdonSharpBehaviour并删除其底层UdonBehaviour。
