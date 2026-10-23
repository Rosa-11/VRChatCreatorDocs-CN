# VRCTween

VRCTween 让你可以使用强大的 DOTween 库在 VRChat 世界中创建流畅的动画。只需几行代码，你就可以为位置、旋转、缩放以及更多内容制作动画。

## 概述 {#overview}

VRCTween 是一个内置的补间系统，它会随时间平滑地插值（或“补间”）数值。无需逐帧手动更新位置或旋转，VRCTween 会为你处理数学计算和计时。

常见用例：
- 为按钮、面板和菜单等 UI 元素制作动画。
- 创建平滑的对象移动。
- 为你的世界增添精致感。

VRCTween 使用 [DOTween](http://dotween.demigiant.com/)，这是一个流行的 Unity 补间库，可与 UdonSharp 和 Udon Graph 配合使用。

## 基本用法 {#basic-usage}

### 创建补间 {#create-a-tween}

使用目标类型上的扩展方法，或 `VRCTween` 上的静态方法来创建补间。每个方法都会返回一个 `VRCTweenHandle`，你可以用它来控制和配置该补间：

```cs
using VRC.SDK3.Components;


public class MyScript : UdonSharpBehaviour
{
    public GameObject cube;

    void Start()
    {
        // 在 2 秒内将立方体向上移动。
        VRCTweenHandle tweenHandle = cube.TweenPosition(new Vector3(0, 5, 0), 2f, VRCTweenEase.OutQuad);
    }
}
```

### 接收回调 {#receive-callbacks}

要在补间完成时收到通知，请在句柄上链式调用 `.OnComplete()`：

```cs
public class MyScript : UdonSharpBehaviour
{
    void Start()
    {
        gameObject.TweenScale(Vector3.one * 2f, 1f, VRCTweenEase.OutBounce)
            .OnComplete(this, nameof(OnScaleComplete));
    }

    public void OnScaleComplete()
    {
        Debug.Log("Scale animation complete!");
    }
}
```

## 补间类型 {#tween-types}

补间创建方法既可以作为目标类型上的扩展方法（例如 `gameObject.TweenPosition(...)`），也可以作为 `VRCTween` 上的静态方法使用。它们都会返回 `VRCTweenHandle`。

- **Transform**：TweenPosition、TweenLocalPosition、TweenRotation、TweenLocalRotation、TweenScale
- **Path**：TweenPath、TweenLocalPath
- **UI**：TweenColor、TweenFade (Graphic)、TweenFade (CanvasGroup)、TweenValue (Slider)、TweenAnchorPos、TweenSizeDelta
- **Sprite**：TweenColor、TweenFade (SpriteRenderer)
- **Renderer**：TweenColor、TweenFloat (Renderer)
- **Light**：TweenIntensity、TweenColor (Light)
- **Audio**：TweenVolume、TweenPitch (AudioSource)

有关详细的代码示例，请参阅[内置补间类型](./tween-types)。

### 虚拟补间 {#virtual-tweens}

虚拟补间通过每帧写入你的 UdonBehaviour 上的变量，为任意值（float、int、Color、Vector3）制作动画。当内置补间类型都不能满足你的需求时，可以使用它们。详情和示例请参阅[虚拟补间](./virtual-tweens)。

## 控制与配置补间 {#controlling-and-configuring-tweens}

使用 `VRCTweenHandle` 上的实例方法来控制和配置补间。配置方法会返回该句柄以便链式调用：

```cs
cube.TweenPosition(new Vector3(0, 5, 0), 2f, VRCTweenEase.OutQuad)
    .From()
    .SetDelay(0.5f)
    .SetLoops(2, VRCTweenLoopType.Yoyo)
    .OnComplete(this, nameof(OnDone));
```

完整的 API 参考和缓动类型表请参阅[设置与控制](./settings)。

## 示例 {#example}

此示例演示了句柄存储、回调以及清理：

```cs
using UdonSharp;
using UnityEngine;
using VRC.SDK3.Components;


public class TweenExample : UdonSharpBehaviour
{
    public GameObject button;
    private VRCTweenHandle scaleTween;

    public override void Interact()
    {
        // 点击时放大再缩小。
        scaleTween = button.TweenScale(Vector3.one * 1.2f, 0.15f, VRCTweenEase.OutQuad)
            .OnComplete(this, nameof(OnTweenComplete));
    }

    public void OnTweenComplete()
    {
        // 缩小回原尺寸。
        button.TweenScale(Vector3.one, 0.15f, VRCTweenEase.OutQuad);
    }

    void OnDestroy()
    {
        // 对象被销毁时清理补间。
        button.KillAllTweens();
    }
}
```

## 最佳实践 {#best-practices}

### 存储补间句柄 {#store-tween-handles}

如果你之后需要控制补间，请保存其句柄：

```cs
private VRCTweenHandle myTween;

void Start()
{
    myTween = gameObject.TweenPosition(Vector3.up, 2f, VRCTweenEase.OutQuad);
}

public void StopTween()
{
    myTween.Kill();
}
```

### 清理补间 {#clean-up-tweens}

补间在完成时会自动清理。但是，仍在运行的补间（例如无限循环或长时补间）应在所属对象被销毁时终止：

```cs
void OnDestroy()
{
    gameObject.KillAllTweens();
}
```

### 用回调串联补间 {#chain-tweens-with-callbacks}

通过使用回调和自定义事件名称来创建序列：

```cs
void Start()
{
    cube.TweenPosition(Vector3.up * 5, 1f, VRCTweenEase.OutQuad)
        .OnComplete(this, nameof(OnFirstTweenComplete));
}

public void OnFirstTweenComplete()
{
    cube.TweenRotation(new Vector3(0, 180, 0), 1f, VRCTweenEase.InOutQuad)
        .OnComplete(this, nameof(OnSecondTweenComplete));
}

public void OnSecondTweenComplete()
{
    Debug.Log("Sequence complete!");
}
```

### 使用 DelayedCall 实现可取消的计时器 {#use-delayedcall-for-cancelable-timers}

`VRCTween.DelayedCall` 是 `SendCustomEventDelayedSeconds` 的可取消替代方案：

```cs
private VRCTweenHandle timerHandle;

void Start()
{
    // 安排一个延迟回调。
    timerHandle = VRCTween.DelayedCall(this, nameof(OnTimerFinished), 3.0f);
}

public void CancelTimer()
{
    // 随时取消计时器。
    timerHandle.Kill();
}

public void OnTimerFinished()
{
    Debug.Log("3 seconds have passed!");
}
```

## Udon Graph

VRCTween 可在 Udon Graph 中使用。请在节点搜索中查找 `VRCTween` 和 `VRCTweenHandle` 节点：

1. 搜索“VRCTween TweenPosition”（或任意创建方法）以创建补间。
2. 连接你的 GameObject 和参数。
3. 该节点会输出一个 `VRCTweenHandle`。
4. 使用 `VRCTweenHandle` 节点（Kill、Pause、SetDelay、OnComplete 等）来控制和配置它。

对于回调，请使用 `VRCTweenHandle OnComplete` 节点：
- 连接补间句柄和你的 UdonBehaviour（通常是“this”）。
- 提供一个自定义事件名称字符串。
- 在你的 Udon Graph 中实现相应的自定义事件。

## 限制 {#limitations}

- 补间对每个玩家都是本地的，不会自动跨网络同步。
- 对于需要网络同步的动画，可考虑结合使用 Udon 的网络功能与补间。
- 极短的补间时长（小于 0.01 秒）可能无法平滑地播放动画。
- 补间句柄在每个场景实例中都是唯一的。

## 输入验证 {#input-validation}

VRCTween 会拒绝那些会破坏 DOTween 状态或 Unity 变换的值。拒绝时不会抛出异常，以避免包含它的 UdonBehaviour 崩溃，因此一个“什么都没做”的补间通常意味着下面某个输入无效。

在以下情况下，创建方法会返回无效句柄（并跳过创建补间）：

- `target` 为 `null`。
- `duration` 为负数、NaN 或 Infinity。[创建可复用的补间](./settings#tween-reuse)时允许为 0。
- 位置、缩放或路径航点包含 NaN、Infinity，或某个分量的绝对值超过约 520,000 个单位。旋转补间只要求值是有限的；允许较大的欧拉角。
- 路径的 `resolution` 会被静默限制到 1–50 的范围；超出该范围的值仍会创建补间，只是分辨率被限制。

当给定无效参数时，配置和控制方法会静默地不执行任何操作：

- `SetDuration` 会忽略负数、NaN 或 Infinity 值。允许为 0。
- `SetDelay` 会忽略负数、NaN 或 Infinity 值。
- `Goto` 会忽略 NaN 或 Infinity，否则会限制到补间的时长范围内。
- `ChangeEndValue` 会忽略未通过创建时所用相同有限值/量级检查的 float/向量。

如果你需要根据补间是否实际启动来分支，请在创建后检查 `handle.IsValid`。

## 性能建议 {#performance-tips}

### 通用建议 {#general-tips}

- 使用 `KillAllTweens()` 一次性清理对象上的所有补间。
- 避免同时创建数百个补间。将它们错开到不同帧以分摊负载（见下方示例）。
- 对大多数世界而言（由交互触发的 5 到 50 个补间），直接创建新的补间完全没问题。DOTween 会在内部池化补间对象，因此开销很小。

### 错开大量补间 {#staggering-many-tweens}

如果你需要为大量对象（例如一片网格状的瓦片）制作动画，请避免在同一帧中创建所有补间。相反，应通过在每个补间之间加入小延迟，将它们分散到不同时间：

```cs
[SerializeField] private GameObject[] tiles;
[SerializeField] private float delayBetween = 0.05f;

private int _nextIndex;

public void AnimateAll()
{
    _nextIndex = 0;
    _AnimateNext();
}

public void _AnimateNext()
{
    if (_nextIndex >= tiles.Length) return;

    tiles[_nextIndex].TweenScale(Vector3.one, 0.3f, VRCTweenEase.OutBack);
    _nextIndex++;

    SendCustomEventDelayedSeconds(nameof(_AnimateNext), delayBetween);
}
```

这样每次调用只创建一个补间，把工作分散到许多帧中。视觉效果是错落有致的层叠，而不是所有东西同时变化，那可能看起来更有趣！

### 在热路径中复用补间 {#reuse-tweens-in-hot-paths}

如果你的补间会被频繁重定向，例如 UI 元素跟随移动的目标，或对象每帧响应玩家输入，那么通过 `ChangeEndValue`、`SetDuration` 和 `SetEase` 复用句柄可以避免每帧进行内存分配。在 500 个补间、更新 300 帧的内部基准测试中，复用模式比先终止再重建**内存分配少 46 倍**、**运行速度快 10 倍**。

当补间以高频率创建和销毁时，这项优化很重要。对于一次性动画（门、按钮、缩放弹跳），简单的先终止再创建的代码更易阅读，而且效果很好。

```cs
VRCTweenHandle _moveHandle;

void Start()
{
    // 创建一次并设为无限循环，使其在完成后仍然存活。
    _moveHandle = gameObject.TweenPosition(Vector3.zero, 1f, VRCTweenEase.OutQuad)
        .SetLoops(-1, VRCTweenLoopType.Restart)
        .Pause();
}

public void MoveTo(Vector3 target, float duration)
{
    // 重新配置并重启，不产生新的分配。
    _moveHandle.ChangeEndValue(target, true)
        .SetDuration(duration)
        .SetEase(VRCTweenEase.OutCubic);
    _moveHandle.Restart();
}
```

更多细节请参阅设置与控制中的[补间复用](./settings#tween-reuse)。

## 资源 {#resources}

- [DOTween 文档](http://dotween.demigiant.com/documentation.php) - 了解底层库。
- [缓动可视化工具](https://easings.net/) - 查看不同缓动类型的效果。
