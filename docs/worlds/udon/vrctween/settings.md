---
sidebar_position: 3
---

# 设置与控制 {#settings-and-control}

本页介绍如何在创建补间之后控制、配置和查询补间。

## 控制方法 {#control-methods}

使用`VRCTweenHandle`上的实例方法来控制补间：

| 方法 | 描述 |
|--------|-------------|
| `tweenHandle.Play()` | 恢复已暂停的补间。 |
| `tweenHandle.Pause()` | 暂停正在播放的补间。返回句柄以便链式调用。 |
| `tweenHandle.Kill()` | 停止并移除补间。 |
| `tweenHandle.Complete()` | 立即完成补间并跳到其结束值。 |
| `tweenHandle.Restart()` | 从头重新开始补间。 |
| `tweenHandle.Flip()` | 翻转播放方向。如果处于暂停状态则不会开始播放。 |
| `tweenHandle.PlayBackwards()` | 将方向设为向后并播放。 |
| `tweenHandle.PlayForwards()` | 将方向设为向前并播放。 |
| `tweenHandle.Goto(float to, bool andPlay)` | 定位到以秒为单位的时间位置。如果`andPlay`为 true，则在定位后播放；否则暂停。适合将补间与网络时间同步。 |
| `VRCTween.KillAll()` | 终止所有活动补间。 |
| `gameObject.KillAllTweens()` | 终止某个 GameObject 上的所有补间。 |

## 查询属性 {#query-properties}

使用`VRCTweenHandle`上的属性查询补间状态：

| 属性 | 类型 | 描述 |
|----------|------|-------------|
| `tweenHandle.IsValid` | bool | 如果句柄指向某个补间则为 true（对`default`句柄为 false）。 |
| `tweenHandle.IsPlaying` | bool | 如果补间当前正在播放则为 true。 |
| `tweenHandle.IsActive` | bool | 如果补间存在且尚未被终止则为 true。 |
| `tweenHandle.Elapsed` | float | 已经过的时间，以秒为单位。 |
| `tweenHandle.Duration` | float | 总时长，以秒为单位。 |
| `tweenHandle.IsBackwards` | bool | 如果补间当前正在向后播放则为 true。 |

## 补间设置 {#tween-settings}

配置方法会返回句柄以便链式调用。大多数设置（`OnComplete`、`SetLoops`、`SetDelay`、`SetUpdate`、`From`、`SetSpeedBased`）应在**创建补间后立即**应用。在补间开始播放之后（即当前帧之后）应用的设置可能不会生效。不过，`SetDuration`、`SetEase`和`ChangeEndValue`可以在活动补间上随时调用。

### OnComplete

设置一个在补间完成时触发的回调。返回句柄以便链式调用。目标回调方法**必须是 public 的**。

```cs
// Use custom event names for different tweens.
door.TweenPosition(openPosition, 1f, VRCTweenEase.OutQuad)
    .OnComplete(this, nameof(OnDoorOpened));

window.TweenScale(Vector3.zero, 2f, VRCTweenEase.InQuad)
    .OnComplete(this, nameof(OnWindowClosed));

public void OnDoorOpened()
{
    Debug.Log("Door opened!");
}

public void OnWindowClosed()
{
    Debug.Log("Window closed!");
}
```

- **callback**：接收回调的 UdonBehaviour（传入`this`）。
- **eventName**：要调用的自定义事件名称。**必须是 public 的。**

### OnRewind

设置一个在补间倒回其起始位置时（向后播放过程中到达位置 0）触发的回调。返回句柄以便链式调用。目标回调方法**必须是 public 的**。

```cs
audioSource.TweenVolume(1f, 2f, VRCTweenEase.InSine)
    .OnRewind(this, nameof(OnFadeComplete));

public void OnFadeComplete()
{
    Debug.Log("Backwards playback reached start!");
}
```

- **callback**：接收回调的 UdonBehaviour（传入`this`）。
- **eventName**：要调用的自定义事件名称。**必须是 public 的。**

:::note

`OnRewind`仅在向后播放到达位置 0 时触发。它不会在`Restart()`时触发。

:::

### SetLoops

设置补间应循环的次数。返回句柄以便链式调用。

```cs
tweenHandle.SetLoops(5, VRCTweenLoopType.Restart);
```

- **loops**：循环次数。使用`-1`表示无限循环。
- **loopType**：循环行为：
  - `VRCTweenLoopType.Restart`（0）：从头重新开始。
  - `VRCTweenLoopType.Yoyo`（1）：先向前播放再向后播放。
  - `VRCTweenLoopType.Incremental`（2）：每次循环都在上一次的结束值上累加。

### SetDelay

设置补间开始前的延迟。返回句柄以便链式调用。负数、NaN 或 Infinity 值会被静默忽略。参见[输入校验](./index.md#input-validation)。

```cs
tweenHandle.SetDelay(1.5f);
```

- **delay**：延迟，以秒为单位。

### SetUpdate

设置补间的更新类型。返回句柄以便链式调用。

```cs
tweenHandle.SetUpdate(VRCTweenUpdateType.LateUpdate);
```

- **updateType**：何时更新补间：
  - `VRCTweenUpdateType.Update`（0）：在 Update 期间。
  - `VRCTweenUpdateType.LateUpdate`（1）：在 LateUpdate 期间。
  - `VRCTweenUpdateType.FixedUpdate`（2）：在 FixedUpdate 期间。
  - `VRCTweenUpdateType.PostLateUpdate`（3）：在所有 LateUpdate 调用之后。适合覆盖相机、IK 或其他由 LateUpdate 驱动的变换。

### From

反转补间，使其从目标值开始并动画到对象的当前值。这对于「从某处出现」的动画很有用，即对象动画到它被放置的位置。仅适用于非虚拟补间（transform、UI、sprite 等）。必须在创建后立即调用。返回句柄以便链式调用。

```cs
public GameObject notification;

void Start()
{
    // Object is at its final position in the scene.
    // This tween starts it at (0, 10, 0) and animates TO the current position.
    notification.TweenPosition(new Vector3(0, 10, 0), 1f, VRCTweenEase.OutBounce)
        .From();
}
```

### SetSpeedBased

将补间设为基于速度。启用后，`duration`参数会变成**每秒单位数**而不是总秒数。当你想要无论距离如何都保持一致的移动速度时，这很有用。返回句柄以便链式调用。

```cs
// Move at 5 units per second, regardless of distance
gameObject.TweenPosition(targetPos, 5f, VRCTweenEase.Linear)
    .SetSpeedBased();

// Walk along a path at 3 units per second
gameObject.TweenPath(waypoints, 3f, VRCTweenPathType.CatmullRom, false, 10, VRCTweenEase.Linear)
    .SetSpeedBased();
```

:::note

`SetSpeedBased`必须在创建补间后立即调用。如果在补间开始播放后应用则不会生效。

:::

### SetEase

覆盖补间的缓动。你可以传入`VRCTweenEase`预设或自定义的`AnimationCurve`。对于曲线，时间轴（0 到 1）映射到补间的进度，值轴映射到插值因子。返回句柄以便链式调用。可以在活动补间上调用。

```cs
// Preset ease
tweenHandle.SetEase(VRCTweenEase.OutBounce);

// Custom curve
public AnimationCurve customEase;

void Start()
{
    gameObject.TweenPosition(new Vector3(0, 5, 0), 2f, VRCTweenEase.Linear)
        .SetEase(customEase);
}
```

- **easeType**：一个`VRCTweenEase`值。
- **curve**：一个 Unity`AnimationCurve`。在检视面板中编辑它以直观地塑造缓动效果。

### SetDuration

更改补间的时长，以秒为单位。返回句柄以便链式调用。可以在活动补间上调用。负数、NaN 或 Infinity 值会被静默忽略。参见[输入校验](./index.md#input-validation)。

```cs
tweenHandle.SetDuration(3f);
```

- **duration**：新的时长，以秒为单位。

### ChangeEndValue

更改补间的目标值。返回句柄以便链式调用。可以在活动补间上调用。不安全的值（NaN、Infinity 或极端量级）会被静默忽略。参见[输入校验](./index.md#input-validation)。

当`snapStartValue`为`true`时，起始值会吸附到补间的当前值。这对于复用补间很有用，使动画从对象当前所在位置开始，而不是跳回最初的起始位置。

```cs
tweenHandle.ChangeEndValue(new Vector3(10, 0, 0), true);
```

- **newEndValue**：新的目标值。必须与补间的类型匹配（位置/旋转/缩放使用`Vector3`，淡入淡出使用`float`，颜色补间使用`Color`，RectTransform 补间使用`Vector2`）。
- **snapStartValue**：如果为`true`，起始值会更新为当前值。

:::note

`ChangeEndValue`适用于 transform、UI、sprite、音频以及虚拟 float/int 补间。它不支持虚拟 Color/Vector3 补间、渲染器（MaterialPropertyBlock）补间、灯光补间或路径补间。

:::

## 补间复用 {#tween-reuse}

对于频繁改变目标的补间（例如每帧或响应快速输入时），复用句柄可以避免每帧分配。对于由交互触发的一次性动画，创建新补间更简单且效果良好。DOTween 内部会进行池化，因此开销很小。

```cs
VRCTweenHandle _moveHandle;

void Start()
{
    // Create the tween once with infinite loops so it stays alive after completing.
    _moveHandle = gameObject.TweenPosition(Vector3.zero, 1f, VRCTweenEase.OutQuad)
        .SetLoops(-1, VRCTweenLoopType.Restart)
        .Pause();
}

public void MoveTo(Vector3 target, float duration)
{
    // Reconfigure and restart without allocating.
    _moveHandle.ChangeEndValue(target, true)
        .SetDuration(duration)
        .SetEase(VRCTweenEase.OutCubic);
    _moveHandle.Restart();
}
```

## 方向控制 {#direction-control}

你可以在动画进行中反转补间的播放方向。与终止补间并在相反方向创建新补间不同，这样做会保留缓动曲线。动画会平滑地改变方向而不会重新开始缓动。

```cs
VRCTweenHandle _fadeHandle;

void Start()
{
    _fadeHandle = audioSource.TweenVolume(1f, 2f, VRCTweenEase.InSine)
        .OnRewind(this, nameof(OnFadeOut))
        .Pause();
}

public void OnZoneEnter()
{
    _fadeHandle.PlayForwards();
}

public void OnZoneExit()
{
    _fadeHandle.PlayBackwards();
}

public void OnFadeOut()
{
    // Backwards playback reached the start
}
```

- `Flip()`会切换方向但不会开始播放。如果补间处于暂停状态，请单独调用`Play()`。
- `PlayBackwards()`和`PlayForwards()`都会设置方向**并**开始播放。
- 向后播放到起始位置的补间**不会**被自动终止。它们会继续存在，以便你再次反转方向。如有需要，在`OnDestroy`中手动终止它们。
- `OnRewind`仅在向后播放到达位置 0 时触发。它不会在`Restart()`时触发。

## 使用 Goto 定位 {#seeking-with-goto}

使用`Goto`将补间跳到特定的时间位置。这对于将长时间运行的补间与网络时间同步特别有用，以便后加入的玩家能看到正确的状态。

```cs
[UdonSynced] float _tweenStartTime;
VRCTweenHandle _syncedTween;

void Start()
{
    _syncedTween = gameObject.TweenPosition(targetPos, 10f, VRCTweenEase.Linear)
        .SetLoops(-1, VRCTweenLoopType.Restart);
}

public override void OnDeserialization()
{
    float elapsed = (float)(Networking.GetServerTimeInSeconds() - _tweenStartTime);
    _syncedTween.Goto(elapsed, true);
}
```

`andPlay`参数控制在定位后补间是播放还是暂停。传入`true`以从新位置继续播放，或传入`false`以在那里暂停。

## 路径类型 {#path-types}

| 路径类型 | 描述 |
|-----------|-------------|
| `VRCTweenPathType.Linear` | 路径点之间的直线段。 |
| `VRCTweenPathType.CatmullRom` | 使用 Catmull-Rom 样条的平滑曲线路径。 |

## 缓动类型 {#ease-types}

| 缓动类型 | 描述 |
|-----------|-------------|
| `VRCTweenEase.Linear` | 匀速。 |
| `VRCTweenEase.InSine` | 正弦波 - 平滑加速。 |
| `VRCTweenEase.OutSine` | 正弦波 - 平滑减速。 |
| `VRCTweenEase.InOutSine` | 正弦波 - 两个方向都平滑。 |
| `VRCTweenEase.InQuad` | 二次 - 加速。 |
| `VRCTweenEase.OutQuad` | 二次 - 减速。 |
| `VRCTweenEase.InOutQuad` | 二次 - 先加速后减速。 |
| `VRCTweenEase.InCubic` | 三次 - 加速（更明显）。 |
| `VRCTweenEase.OutCubic` | 三次 - 减速（更明显）。 |
| `VRCTweenEase.InOutCubic` | 三次 - 先加速后减速（更明显）。 |
| `VRCTweenEase.InQuart` | 四次 - 强加速。 |
| `VRCTweenEase.OutQuart` | 四次 - 强减速。 |
| `VRCTweenEase.InOutQuart` | 四次 - 强加速后强减速。 |
| `VRCTweenEase.InQuint` | 五次 - 极强加速。 |
| `VRCTweenEase.OutQuint` | 五次 - 极强减速。 |
| `VRCTweenEase.InOutQuint` | 五次 - 极强加速后极强减速。 |
| `VRCTweenEase.InExpo` | 指数 - 爆发式加速。 |
| `VRCTweenEase.OutExpo` | 指数 - 爆发式减速。 |
| `VRCTweenEase.InOutExpo` | 指数 - 爆发式加速后爆发式减速。 |
| `VRCTweenEase.InCirc` | 圆形 - 平滑、圆润的加速。 |
| `VRCTweenEase.OutCirc` | 圆形 - 平滑、圆润的减速。 |
| `VRCTweenEase.InOutCirc` | 圆形 - 两个方向都平滑、圆润。 |
| `VRCTweenEase.InElastic` | 弹性 - 起始处有弹性。 |
| `VRCTweenEase.OutElastic` | 弹性 - 结束处有弹性。 |
| `VRCTweenEase.InOutElastic` | 弹性 - 两个方向都有弹性。 |
| `VRCTweenEase.InBack` | 回弹 - 起始处轻微过冲。 |
| `VRCTweenEase.OutBack` | 回弹 - 结束处轻微过冲。 |
| `VRCTweenEase.InOutBack` | 回弹 - 两个方向都轻微过冲。 |
| `VRCTweenEase.InBounce` | 弹跳 - 起始处弹跳。 |
| `VRCTweenEase.OutBounce` | 弹跳 - 结束处弹跳。 |
| `VRCTweenEase.InOutBounce` | 弹跳 - 两个方向都弹跳。 |

:::tip

尝试不同的缓动类型，为你的动画找到合适的手感。`VRCTweenEase.OutQuad`非常适合 UI，`VRCTweenEase.OutElastic`会增添俏皮的弹跳，而`VRCTweenEase.InOutSine`则能营造平滑、自然的运动。

:::
