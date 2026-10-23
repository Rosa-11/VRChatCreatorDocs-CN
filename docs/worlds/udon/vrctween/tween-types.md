---
sidebar_position: 1
---

# 内置补间类型 {#built-in-tween-types}

每种内置 VRCTween 类型的详细示例。

## Transform 补间 {#transform-tweens}

Transform 补间会动画化 GameObject 的位置、旋转或缩放。这些是在场景中移动对象最常用的补间。所有 transform 补间都可以在`GameObject`或`Transform`上调用：

```cs
// Both are equivalent
myObject.TweenPosition(target, 1f, VRCTweenEase.OutQuad);
myObject.transform.TweenPosition(target, 1f, VRCTweenEase.OutQuad);
```

### TweenPosition 与 TweenLocalPosition {#tweenposition-and-tweenlocalposition}

动画化 GameObject 的世界位置或本地位置：

```cs
public GameObject door;

public void OpenDoor()
{
    // Move to a world position
    door.TweenPosition(new Vector3(0, 3, 0), 1f, VRCTweenEase.OutQuad);
}

public void CloseDoor()
{
    // Move to a local position (relative to parent)
    door.TweenLocalPosition(Vector3.zero, 1f, VRCTweenEase.InOutQuad);
}
```

### TweenRotation 与 TweenLocalRotation {#tweenrotation-and-tweenlocalrotation}

使用欧拉角动画化 GameObject 的旋转：

```cs
public GameObject lever;

public void PullLever()
{
    // Rotate to world euler angles
    lever.TweenRotation(new Vector3(-45, 0, 0), 0.5f, VRCTweenEase.OutBack);
}

public void ResetLever()
{
    // Rotate to local euler angles (relative to parent)
    lever.TweenLocalRotation(Vector3.zero, 0.5f, VRCTweenEase.InOutQuad);
}
```

### TweenScale

动画化`transform.localScale`。Unity 的世界空间缩放是只读的，因此没有`TweenGlobalScale`变体。

```cs
public GameObject pickup;

public void OnPickedUp()
{
    // Shrink to nothing
    pickup.TweenScale(Vector3.zero, 0.3f, VRCTweenEase.InBack);
}

public void OnDropped()
{
    // Pop back to full size
    pickup.TweenScale(Vector3.one, 0.3f, VRCTweenEase.OutBack);
}
```

## 路径补间 {#path-tweens}

路径补间会让 GameObject 沿一系列路径点移动。世界空间路径使用`TweenPath`，本地空间路径使用`TweenLocalPath`。与 transform 补间一样，这些方法可以在`GameObject`或`Transform`上调用。

### TweenPath 与 TweenLocalPath {#tweenpath-and-tweenlocalpath}

让 GameObject 沿多点路径动画移动：

```cs
public GameObject platform;

public void StartPatrol()
{
    Vector3[] route = new Vector3[] {
        new Vector3(0, 0, 0),
        new Vector3(10, 0, 0),
        new Vector3(10, 0, 10),
        new Vector3(0, 0, 10)
    };

    // Linear path that loops back to the start
    platform.TweenPath(route, 8f, VRCTweenPathType.Linear, true, 10, VRCTweenEase.Linear)
        .SetLoops(-1, VRCTweenLoopType.Restart);
}
```

使用`VRCTweenPathType.CatmullRom`可以获得平滑的曲线路径，而不是直线段：

```cs
public GameObject camera;

public void StartCameraFlythrough()
{
    Vector3[] cameraPath = new Vector3[] {
        new Vector3(0, 2, 0),
        new Vector3(5, 4, 3),
        new Vector3(10, 2, 8),
        new Vector3(15, 3, 5)
    };

    // Smooth curved path
    camera.TweenPath(cameraPath, 6f, VRCTweenPathType.CatmullRom, false, 10, VRCTweenEase.InOutSine)
        .OnComplete(this, nameof(OnFlythroughDone));
}

public void OnFlythroughDone()
{
    Debug.Log("Camera flythrough complete!");
}
```

| 参数 | 描述 |
|-----------|-------------|
| **waypoints** | `Vector3`位置的数组（至少 2 个）。根据所用方法决定是世界空间还是本地空间。包含 NaN、Infinity 或极端量级的路径点会被拒绝。参见[输入校验](./index.md#input-validation)。 |
| **pathType** | `VRCTweenPathType.Linear`表示直线段，`VRCTweenPathType.CatmullRom`表示平滑曲线。 |
| **closePath** | 如果为`true`，路径会从最后一个路径点自动闭合回第一个路径点。 |
| **resolution** | CatmullRom 路径的曲线平滑度（默认 10，数值越高越平滑）。对 Linear 忽略。会被静默限制在 1–50 范围内。 |

:::tip

对于循环巡逻路线，将`closePath`设为`true`并使用`.SetLoops(-1, VRCTweenLoopType.Restart)`。这样可以创建无缝循环，而不会在结尾出现可见的跳变。

:::

## UI 补间 {#ui-tweens}

UI 补间作用于 Unity UI 组件。它们非常适合为菜单、HUD 和交互元素制作动画。

### TweenColor 与 TweenFade（Graphic） {#tweencolor-and-tweenfade-graphic}

`Graphic`是`Image`、`Text`、`RawImage`以及其他 UI 元素的基类。这些方法对它们都有效：

```cs
public Image myImage;
public Text myText;

void Start()
{
    // Fade an image to red
    myImage.TweenColor(Color.red, 1f, VRCTweenEase.OutQuad);

    // Fade text to transparent
    myText.TweenFade(0f, 1f, VRCTweenEase.OutQuad);
}
```

### TweenFade（CanvasGroup）

淡入淡出整个 UI 面板和分组：

```cs
public CanvasGroup menuPanel;

public void ShowMenu()
{
    menuPanel.gameObject.SetActive(true);
    menuPanel.TweenFade(1f, 0.5f, VRCTweenEase.OutQuad);
}

public void HideMenu()
{
    menuPanel.TweenFade(0f, 0.5f, VRCTweenEase.OutQuad)
        .OnComplete(this, nameof(OnMenuHidden));
}

public void OnMenuHidden()
{
    menuPanel.gameObject.SetActive(false);
}
```

### TweenValue（Slider）

为血条、进度指示器等动画化滑块数值：

```cs
public Slider healthBar;

public void TakeDamage(float damage)
{
    float newHealth = healthBar.value - damage;
    healthBar.TweenValue(newHealth, 0.3f, VRCTweenEase.OutQuad);
}
```

### TweenAnchorPos

动画化 RectTransform 的锚定位置。这是在 Canvas 布局中移动 UI 元素的正确方式：

```cs
public RectTransform notificationPanel;

public void SlideIn()
{
    // Slide from off-screen to center
    notificationPanel.anchoredPosition = new Vector2(-500, 0);
    notificationPanel.TweenAnchorPos(Vector2.zero, 0.5f, VRCTweenEase.OutQuad);
}

public void SlideOut()
{
    notificationPanel.TweenAnchorPos(new Vector2(500, 0), 0.5f, VRCTweenEase.InQuad);
}
```

### TweenSizeDelta

动画化 RectTransform 的 sizeDelta（宽度和高度）。这对于调整 UI 面板尺寸、展开/折叠区段或为弹窗制作动画很有用：

```cs
public RectTransform tooltip;

public void ExpandTooltip()
{
    tooltip.TweenSizeDelta(new Vector2(400, 200), 0.3f, VRCTweenEase.OutQuad);
}

public void CollapseTooltip()
{
    tooltip.TweenSizeDelta(Vector2.zero, 0.3f, VRCTweenEase.InQuad);
}
```

## 渲染器补间 {#renderer-tweens}

使用`MaterialPropertyBlock`补间渲染器的材质属性。这是在 3D 对象上动画化材质属性的推荐方式——它避免了创建材质实例，并且可与 GPU 实例化兼容。

### TweenColor（Renderer）

动画化渲染器的颜色。默认情况下，它会补间`_Color`着色器属性：

```cs
public Renderer myRenderer;

void Start()
{
    // Tween to red over 1 second
    myRenderer.TweenColor(Color.red, 1f, VRCTweenEase.OutQuad);
}
```

要补间其他着色器属性，请显式传入属性名称：

```cs
// Tween the emission color
myRenderer.TweenColor("_EmissionColor", Color.yellow, 1f, VRCTweenEase.OutQuad);
```

### TweenFloat（Renderer）

动画化渲染器的 float 着色器属性。这对于溶解效果、自发光强度、裁剪值以及其他由着色器驱动的视觉效果很有用：

```cs
public Renderer myRenderer;

void Start()
{
    // Dissolve effect
    myRenderer.TweenFloat("_DissolveAmount", 1f, 2f, VRCTweenEase.InQuad);

    // Adjust metallic
    myRenderer.TweenFloat("_Metallic", 0.8f, 1f, VRCTweenEase.OutQuad);
}
```

:::tip

在材质检视面板中查看着色器的属性名称。常见的名称有主颜色的`_Color`、自发光的`_EmissionColor`、`_Metallic`、`_Glossiness`和`_Cutoff`。如果某个属性没有产生可见的变化，着色器可能使用了不同的属性名称。

:::

## 灯光补间 {#light-tweens}

补间 Light 组件的属性，以实现动态光照效果，例如昼夜循环、闪烁灯光和响应式环境。

### TweenIntensity（Light）

动画化 Light 的强度：

```cs
public Light myLight;

public void FadeOutLight()
{
    myLight.TweenIntensity(0f, 2f, VRCTweenEase.OutQuad);
}

public void FlashLight()
{
    myLight.TweenIntensity(5f, 0.1f, VRCTweenEase.OutQuad);
}
```

### TweenColor（Light）

动画化 Light 的颜色：

```cs
public Light myLight;

void Start()
{
    // Sunset color shift
    myLight.TweenColor(new Color(1f, 0.5f, 0.2f), 3f, VRCTweenEase.InOutSine);
}
```

## 音频补间 {#audio-tweens}

### TweenVolume（AudioSource）

淡入或淡出音频音量：

```cs
public AudioSource musicSource;

public void FadeOutMusic()
{
    musicSource.TweenVolume(0f, 2f, VRCTweenEase.OutQuad);
}

public void FadeInMusic()
{
    musicSource.Play();
    musicSource.TweenVolume(1f, 2f, VRCTweenEase.InQuad);
}
```

### TweenPitch（AudioSource）

动画化 AudioSource 的音调。典型范围是 -3 到 3，不过任何有限值都会被接受：

```cs
public AudioSource engineSource;

public void AccelerateEngine()
{
    engineSource.TweenPitch(2f, 1f, VRCTweenEase.OutQuad);
}

public void DecelerateEngine()
{
    engineSource.TweenPitch(0.5f, 1.5f, VRCTweenEase.InOutQuad);
}
```

## Sprite 补间 {#sprite-tweens}

非常适合 2D 游戏和基于 sprite 的 UI：

```cs
public SpriteRenderer mySprite;

void Start()
{
    // Fade sprite color
    mySprite.TweenColor(Color.blue, 1f, VRCTweenEase.OutQuad);

    // Fade sprite to transparent
    mySprite.TweenFade(0f, 1f, VRCTweenEase.OutQuad);
}
```
