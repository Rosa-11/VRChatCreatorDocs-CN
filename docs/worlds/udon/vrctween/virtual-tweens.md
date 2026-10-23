---
sidebar_position: 2
---

# 虚拟补间 {#virtual-tweens}

虚拟补间会在一定时间内平滑地动画化一个值（例如 float 或颜色），并将结果写入 UdonBehaviour 上的某个变量。每帧都会运行你的回调，因此你可以按自己喜欢的方式应用更新后的值。当内置补间类型（位置、旋转、缩放等）都无法满足需求时，请使用虚拟补间。例如，为分数计数器、相机视野或动画器参数制作动画。

| 方法 | 示例 |
|--------|---------|
| **TweenFloat** | `VRCTween.TweenFloat(0f, 100f, 2f, this, nameof(myValue), nameof(OnUpdate), VRCTweenEase.Linear)` |
| **TweenInt** | `VRCTween.TweenInt(0, 100, 5f, this, nameof(myValue), nameof(OnUpdate), VRCTweenEase.Linear)` |
| **TweenColor** | `VRCTween.TweenColor(Color.red, Color.blue, 2f, this, nameof(myValue), nameof(OnUpdate), VRCTweenEase.Linear)` |
| **TweenVector3** | `VRCTween.TweenVector3(Vector3.zero, Vector3.one, 2f, this, nameof(myValue), nameof(OnUpdate), VRCTweenEase.Linear)` |
| **DelayedCall** | `VRCTween.DelayedCall(this, nameof(OnTimer), 5f)` |
| **DelayedSetActive** | `VRCTween.DelayedSetActive(myObject, false, 2f)` |

所有方法都会返回一个**VRCTweenHandle**，你可以用它来控制补间。

## TweenFloat

动画化 float 值：

```cs
[System.NonSerialized] public float fovValue;

VRCTweenHandle tweenHandle = VRCTween.TweenFloat(60f, 90f, 2f, this, nameof(fovValue), nameof(OnFovUpdate), VRCTweenEase.OutQuad);

public void OnFovUpdate()
{
    myCamera.fieldOfView = fovValue;  // smoothly widens the camera's field of view
}
```

## TweenInt

动画化整数值。这非常适合计数器和分数：

```cs
[System.NonSerialized] public int scoreValue;

VRCTweenHandle tweenHandle = VRCTween.TweenInt(0, 100, 5f, this, nameof(scoreValue), nameof(OnCountUpdate), VRCTweenEase.Linear);

public void OnCountUpdate()
{
    scoreText.text = scoreValue.ToString();  // updates scoreValue smoothly as it ticks up
}
```

## TweenColor

动画化 Color 值：

```cs
[System.NonSerialized] public Color lightColor;

VRCTweenHandle tweenHandle = VRCTween.TweenColor(Color.red, Color.blue, 2f, this, nameof(lightColor), nameof(OnColorUpdate), VRCTweenEase.Linear);

public void OnColorUpdate()
{
    myLight.color = lightColor;  // Value is stored in lightColor.
}
```

## TweenVector3

动画化 Vector3 值。这对于将自定义位置、方向或任何三分量值作为整体来补间很有用（缓动曲线会应用于整个向量，而不是按轴分别应用）：

```cs
[System.NonSerialized] public Vector3 targetPosition;

VRCTweenHandle tweenHandle = VRCTween.TweenVector3(Vector3.zero, new Vector3(5, 10, 0), 2f, this, nameof(targetPosition), nameof(OnPositionUpdate), VRCTweenEase.OutQuad);

public void OnPositionUpdate()
{
    // Use the interpolated value however you like.
    myParticleSystem.transform.position = targetPosition;
}
```

:::tip

变量必须声明为`public`才能与虚拟补间配合使用。使用`[System.NonSerialized]`可以防止 Unity 将临时的补间值保存到你的场景中。你可以使用类型正确的变量（float、int、Color、Vector3），并通过使用不同的变量名来同时运行多个补间。

:::

## DelayedCall

创建一个可取消的延迟事件。这是`SendCustomEventDelayedSeconds`的替代方案：

```cs
VRCTweenHandle timerHandle = VRCTween.DelayedCall(this, nameof(OnTimerFinished), 5.0f);

// Cancel the timer anytime.
timerHandle.Kill();

public void OnTimerFinished()
{
    Debug.Log("5 seconds elapsed!");
}
```

## DelayedSetActive

在延迟后启用或禁用 GameObject。这是对常见模式的简写，即使用`DelayedCall`配合一个仅调用`SetActive`的回调。如果目标在延迟结束前被销毁，该操作会被静默跳过。

```cs
// Disable an object after 3 seconds.
VRCTweenHandle handle = VRCTween.DelayedSetActive(myObject, false, 3f);

// Cancel it if needed.
handle.Kill();
```
