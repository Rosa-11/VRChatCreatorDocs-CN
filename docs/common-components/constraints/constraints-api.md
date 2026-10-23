---
sidebar_position: 7
---
# 约束API {#constraints-api}

本页介绍VRChat Constraints的编程接口。其中包含对外公开的属性和方法，可在世界开发中通过Udon使用，也可在SDK工具开发中通过C#使用。

## 要求 {#requirements}

在使用此API之前，你应当已经了解[VRChat Constraints的基本概念](/common-components/constraints)。

你应当避免使用本页未记录的属性或方法，因为它们可能随时从公开接口中移除。

## 约束类型 {#constraint-types}

该API为VRChat Constraints提供以下面向用户的类型，它们全都位于命名空间`VRC.SDK3.Dynamics.Constraint.Components`中：

- [**VRCAimConstraint**](/common-components/constraints/vrc-aim-constraint)
- [**VRCLookAtConstraint**](/common-components/constraints/vrc-look-at-constraint)
- [**VRCParentConstraint**](/common-components/constraints/vrc-parent-constraint)
- [**VRCPositionConstraint**](/common-components/constraints/vrc-position-constraint)
- [**VRCRotationConstraint**](/common-components/constraints/vrc-rotation-constraint)
- [**VRCScaleConstraint**](/common-components/constraints/vrc-scale-constraint)

在命名空间`VRC.Dynamics`中还有以下配套类：
- **VRCConstraintSource** - 单个约束源，包含一个`SourceTransform`和一个`Weight`
- **VRCConstraintSourceKeyableList** - 某个约束所使用的源列表。

## 约束的属性与方法 {#constraint-properties-and-methods}

### 通用属性与方法 {#generic-properties-and-methods}

所有VRChat Constraints都会公开下列属性。请注意，尽管这些属性与[Unity约束](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Animations.IConstraint.html)可用的属性在本质上是相同的，但两个接口并不完全一致，并且存在一些结构性差异，以支持VRChat客户端的运作方式。

#### ApplyConfigurationChanges()

此方法会应用通过脚本对约束所做的任何更改。**在通过脚本修改约束的属性之后，你必须调用此方法！**否则，你的更改可能不会被应用回约束。

如果你需要同时更改多个属性，请尽量在完成所有更改后只调用一次此方法，以尽量减少性能影响。

#### IsActive

- `bool`：如果约束当前正在被解算，则为`true`，否则为`false`。

在功能上与Unity的[constraintActive](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Animations.IConstraint-constraintActive.html)属性相同。

#### GlobalWeight

- `float`：此约束的全局权重，会叠加在其所有源之上（每个源也有各自的独立权重）。

在功能上与Unity的[weight](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Animations.IConstraint-weight.html)属性相同。

#### Locked

- `bool`：如果约束当前已锁定，则为`true`；如果已解锁，则为`false`。

在功能上与Unity的[locked](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Animations.IConstraint-locked.html)属性相同。

在播放模式下，约束始终被视为已锁定。

#### Sources

- `VRCConstraintSourceKeyableList`：属于此约束的源列表。

作为示例，下面的代码示例会遍历分配给某个特定约束的每个源、更改其权重，然后再次将其赋值回列表，以此来随机化这些源的权重：

```csharp
for (int i = 0; i < constraint.Sources.Count; i++)
{
    VRCConstraintSource source = constraint.Sources[i];
    source.Weight = UnityEngine.Random.value;
    constraint.Sources[i] = source;
}
```

你可以通过获取源列表并对其调用`Add()`，以编程方式向约束添加源：

```csharp
// 创建一个以该变换为目标、权重为1的新约束源。
VRCConstraintSource source = new VRCConstraintSource(transform, 1.0f);

// 将此源添加到一个约束中。
constraint.Sources.Add(source);
```

要移除源，你可以使用`Remove()`并传入与添加时相同的源结构体，或者按索引找到某个特定的现有源并使用`RemoveAt()`。

```csharp
// 移除特定的源...
constraint.Sources.Remove(source);

// ...或者移除特定索引i处的源。
constraint.Sources.RemoveAt(i);
```

:::warning

源列表有一个特殊限制：在虚拟形象（Avatar）上，动画器只能针对其中的前十六个元素。这是因为Unity引擎处理数组元素动画的方式，以及需要与某些用户制作的动画工具保持兼容。如果你打算为Avatars SDK编写向单个约束添加超过十六个源的工具，请记住这一限制。

:::

#### TargetTransform

- `Transform`：受此约束组件结果影响的变换。

当设置为`null`时，约束会改为将结果应用到它所附加的变换上。

#### SolveInLocalSpace

- `bool`：如果此约束在局部空间中解算，则为`true`；如果在世界空间中解算，则为`false`。

Unity约束始终在世界空间中解算。

#### FreezeToWorld

- `bool`：如果此约束当前正尝试在世界空间中保持固定的位置/旋转/缩放，则为`true`，否则为`false`。

当此属性从`false`切换为`true`时，约束会捕获其当前姿态，并尝试保持在该位置，直到它下一次切换回`false`。

#### RebakeOffsetsWhenUnfrozen

- `bool`：如果约束在解除冻结时应根据其源重新计算偏移量，则为`true`；如果应保留其原始偏移量，则为`false`。

这是`FreezeToWorld`的子属性，用于控制此约束在解除冻结时的行为（也就是说，当`FreezeToWorld`从`true`切换为`false`时）。

#### ActivateConstraint()

对约束调用此方法会在保持其当前偏移量的同时激活并锁定它。等同于在编辑器中为约束按下检视面板里的Activate按钮。

#### ZeroConstraint()

对约束调用此方法会在将其偏移量重置为默认值的同时激活并锁定它。等同于在编辑器中为约束按下检视面板里的Zero按钮。

### At-Rest与Offset值 {#at-rest-and-offset-values}

每种类型的约束都以自己的方式影响变换，因此每种约束都有各自的at-rest值和偏移量值，可通过相应命名的属性访问。例如，位置约束有`PositionAtRest`和`PositionOffset`，它们分别表示与其源之间的距离，而旋转约束有`RotationAtRest`和`RotationOffset`，它们分别表示一组欧拉角。

父约束比较特殊，因为它为每个源都有一个偏移量值，而不是只有一个影响整个约束的偏移量。要更改应用到父约束的偏移量，请通过`Sources`列表访问其源，然后修改其中的`ParentPositionOffset`和`ParentRotationOffset`属性。

### Aim约束的对齐 {#aim-constraint-alignment}

这些是VRChat aim约束特有的属性，用于控制它们如何朝向其目标进行对齐。

#### AimAxis

- `Vector3`：应朝向源的那些轴。

这实际上定义了应被视为前方的方向。

#### UpAxis

- `Vector3`：此约束视为向上的轴。

约束会尝试使此方向与下文中`WorldUp`所指定的向上方向对齐。

#### WorldUpTransform

- `Transform`：用于确定约束向上向量的变换。 

它仅在`WorldUp`取某些值时使用，如下文所述。

#### WorldUpVector

- `Vector3`：用于确定约束向上向量的一个方向。

它仅在`WorldUp`取某些值时使用，如下文所述。

#### WorldUp

这是一个枚举类型，用于确定此aim约束中哪个方向被视为向上。选项如下：

- `WorldUpType.SceneUp`：将场景的正Y轴视为向上（`Vector3.up`）。
- `WorldUpType.ObjectUp`：将从约束的目标变换指向属性`WorldUpTransform`中所指定变换的向量视为向上。
- `WorldUpType.ObjectRotationUp`：将`WorldUpTransform`中所指定变换的局部空间里的`WorldUpVector`轴视为向上。
- `WorldUpType.Vector`：将世界空间中的`WorldUpVector`视为向上。
- `WorldUpType.None`：不定义向上方向。

`WorldUp`的类型为`VRCConstraintBase.WorldUpType`，它是命名空间`VRC.Dynamics`中的一个枚举。

### Look-At约束的对齐 {#look-at-constraint-alignment}

与aim约束类似，look-at约束也有一些属性用于控制它们如何朝向其目标进行对齐。look-at约束实际上是简化版的aim约束。

#### Roll

- `float`：定义围绕约束Z轴的角度（以度为单位），该角度用于确定其向上方向。

此属性仅在`UseUpTransform`为false时生效。

#### WorldUpTransform

- `Transform`：约束向其滚动的变换。

此属性仅在`UseUpTransform`为true时生效。

#### UseUpTransform

- `bool`：如果约束使用`Roll`的值来确定约束如何倾斜，则为`false`；当它通过滚动来尝试使其正Y轴指向`WorldUpTransform`所指定的变换时，则为`true`。

## 约束转换钩子 {#constraint-conversion-hooks}

:::info

本节仅与希望更改Avatar上Unity约束转换为VRChat约束方式的用户相关。

本节所述功能不适用于Udon脚本。

:::

约束转换器在SDK自动将Unity约束转换为VRChat约束时运行。你可以编写自己的C#自定义编辑器工具，与SDK的约束转换器进行交互。

完整文档请查看这些实用工具的内联文档，因为本节仅提供简要概述。

### 转换方法 {#conversion-methods}

SDK类`AvatarDynamicsSetup`包含SDK用于将Unity约束转换为等效VRChat约束的转换方法。以下约束转换方法对外公开供用户工具使用：

| 方法                                                                                                                                                                                       | 描述                                                                                                                                                                |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ConvertUnityConstraintsAcrossGameObjects(List<GameObject> targetGameObjects)`                                                                                                               | 将一组GameObject上的Unity约束转换为VRChat约束。                                                                                               |
| `ConvertUnityConstraintsAcrossAnimationClips(List<AnimationClip> targetAnimationClips)`                                                                                                      | 修改一组AnimationClip，使其中任何针对Unity约束的轨道改为针对VRChat约束。                                      |
| `DoConvertUnityConstraints(IConstraint[] unityConstraints, VRCAvatarDescriptor avatarDescriptor, bool convertReferencedAnimationClips)`                                                      | 将一组Unity约束转换为VRChat约束，可选择同时包含任何被引用的动画剪辑。此操作会立即运行，不会出现确认对话框。    |
| `RebindConstraintAnimationClip(AnimationClip clip, IConstraint oldConstraint)`                                                                                                               | 尝试修改单个动画剪辑，以将轨道从Unity约束重新定向到VRChat约束，可选择将转换限制为给定的Unity约束。 |
| `TryGetSubstituteAnimationBinding(Type unityConstraintType, string unityConstraintPropertyName, out Type vrcConstraintType, out string vrcConstraintPropertyName, out bool isArrayProperty)` | 尝试将Unity约束的属性名称和类型转换为等效的VRChat约束属性名称和类型。                                               |

### 转换委托 {#conversion-delegates}

作为上述方法的补充，类`AvatarDynamicsSetup`还提供了一些委托函数，可让你的工具控制转换器的行为。可用的委托如下：

| 委托                                                                                      | 描述                                                                                                                                                                                                                                                                                                                                                                                 |
|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bool IsUnityConstraintAutoConverted(IConstraint constraint)`                                 | 给定一个Unity约束，如果该约束将在构建时由用户工具转换为VRChat约束，则返回`true`。你可以用它来抑制SDK通常会生成的验证警告，该警告会提示用户将其Unity约束转换为VRChat约束。                                                                                        |
| `bool ConvertUnityConstraintsAcrossGameObjects(List<GameObject> gameObjects, bool isAutoFix)` | 给定一组GameObject，将它们上面的所有约束及底层动画剪辑转换为VRChat约束。如果这是由用户在验证列表中点击自动修复触发的，则`isAutoFix`参数被设为`true`；如果是由菜单项或自定义用户脚本触发的，则为`false`。返回`true`可阻止原生SDK转换器运行。 |
| `bool ConvertUnityConstraintsAcrossAnimationClips(List<AnimationClip> animationClips)`        | 给定一组动画剪辑，将所有引用Unity约束的轨道更新为引用VRChat约束。返回`true`可阻止原生SDK转换器运行。                                                                                                                                                                                                   |
