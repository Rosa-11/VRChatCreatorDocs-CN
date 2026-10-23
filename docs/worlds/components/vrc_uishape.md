# VRC Ui Shape

VRC Ui Shape组件允许你创建玩家可以与之交互的[Canvas](https://docs.unity3d.com/Manual/UICanvas.html)组件。

- 玩家可以指向、点击或滚动你的UI来与之交互，类似于VRChat菜单。
- 玩家可以从远处进行操作。这通常使它们比[Interact](/worlds/examples/udon/#interact)事件更易于使用。

![两个示例UI：一个带复选框的“Toggle Mirror”设置，以及一个带有“Previous”和“Next”按钮的页面指示器。](/img/worlds/components/VRC_UiShape.png)

VRC Ui Shape只有一个可配置参数：

| 参数        | 描述                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Allow Focus View | 当用户在手机或平板上游玩时，此画布是否应允许用户进入[Focus View](#focus-view)。 |

## 如何设置你的Canvas {#how-to-set-up-your-canvas}

当你右键单击层级视图窗口并点击“UI” -> “TextMeshPro (VRC)”时，SDK会自动设置你的Canvas。SDK会自动配置你的Canvas并添加其他所需组件。

![两个示例UI：一个带复选框的“Toggle Mirror”设置，以及一个带有“Previous”和“Next”按钮的页面指示器。](/img/worlds/components/vrc-ui-components.png)

如果你想手动配置Canvas，请按以下步骤操作。否则，你的Canvas在VRChat中可能无法工作。

1. 为你的GameObject添加一个[Canvas](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/class-Canvas.html)组件，或新建一个GameObject。
    - Unity会自动向你的Canvas添加其他有用的组件。
2. 将“VRC_UIShape”组件添加到与Canvas相同的GameObject上。
3. 将GameObject的图层从“UI”更改为“Default”或其他图层。
	- 除非VRChat菜单处于打开状态，否则UI图层会阻止用户与你的UI交互。
4. 减小GameObject的`x`、`y`和`z`缩放。
	- 默认情况下，缩放为1，这太大了。（1像素 = 1米）
	- 将缩放减小到类似`0.01`的值。（1像素 = 0.01米）
5. 将Canvas的“Render Mode”属性从“Screen Space”更改为“World Space”。
	- World Space画布会显示在你的世界内，而不是直接显示在屏幕上。
6. 向Canvas添加UI元素。
	- 例如，你可以添加文本、按钮、开关、滚动视图、输入字段等。
	- 将UI元素的“Navigation”属性设置为“None”。这可防止玩家在世界中移动时意外使用UI。
	- 使用TextMeshPro而非Unity内置组件，以获得更高的文本质量。

如果遵循这些步骤，玩家便可以通过点击来与你的UI交互。

## 常见问题 {#common-problems}

如果你的Canvas配置不正确，玩家可能无法与之交互。以下是如何修复常见问题：

### 如果你的画布无法让VRChat指针显示出来： {#if-you-have-a-canvas-that-does-not-make-the-vrchat-pointer-show-up}

* **画布上必须有**`VRC_UIShape`**组件。**确保你没有把它放在其他子对象上。
* **Canvas的图层不能是UI。** 将画布及其所有子对象设置为default即可正常工作。
* **带有**`VRC_UIShape`**的对象必须有盒型碰撞体。** 如果没有，世界上传后会自动添加一个。但是，如果你自己添加了碰撞体，必须确保其尺寸正确。
* **确保没有其他碰撞体遮挡画布。**

### 如果指针显示出来但UI没有响应： {#if-the-pointer-shows-up-but-the-ui-is-not-responsive}
* **场景中必须有EventSystem。** 这在创建画布时会自动添加，所以不要删除它。
* **确保可交互元素没有被不可见元素覆盖。** 当文本框重叠并覆盖按钮时经常会发生这种情况。有几种解决方案：你可以重新排列按钮使其位于顶层（在层级视图中更靠下），可以调整文本大小使其不覆盖按钮，或者将文本的`raycast target`设置为`false`。
* **确保你尝试交互的UI具有启用了`Raycast Target`的图像。** 如果你使用层级视图中的右键菜单创建UI元素，这会自动生成。
* **确保画布具有`Graphic Raycaster`组件。** 当你添加Canvas组件时，此组件会自动添加到你的GameObject。
* **确保你从正确的一侧查看画布。画布的Z轴正方向应**_背对_**你。

### 如果UI有响应但没有执行你预期的操作： {#if-the-ui-is-responsive-but-does-not-do-what-you-expect-it-to-do}

* 出于安全原因，某些UI事件在VRChat中会被移除。确保你尝试使用的事件在[此列表](/worlds/udon/ui-events)中
* 如果你使用`SendCustomEvent`，请确保在UI按钮和UdonBehaviour的`event custom`节点中输入的事件名称完全一致
* 如果你向UdonSharp behaviour发送`SendCustomEvent`，该事件必须设置为public。如果设置为private，它将无法工作。
* 如果UdonBehaviour出现问题，它可能会暂停运行，从而停止做任何事情。详情请参阅[调试你的Udon项目](/worlds/udon/debugging-udon-projects)。

### 如果你在移动、按键或移动摇杆时UI会移动： {#if-the-ui-is-moving-when-you-move-press-a-key-or-move-a-joystick}

* 将所有UI元素的`Navigation`设置为`None`。
- 如果你的UI有滚动条，请将`Scroll Sensitivity`设置为`0`。
### 如果你希望TextField不显示VRChat的键盘： {#if-youd-like-a-textfield-not-to-show-vrchats-keyboard}

* 添加`VRCInputFieldKeyboardOverride`组件以防止VRChat键盘出现。

## Focus View

VRChat的“Focus View”功能允许用户在手机或平板上扩展、平移和缩放世界中的UI。这使他们更容易阅读和与小屏幕上的文本进行交互。

<div class="video-container">
    <video src="https://assets.vrchat.com/videos/docs/focusViewDemo.mp4" title="Focus View演示" muted controls></video>
</div>

你的画布必须满足以下条件才能使用Focus View：

- 画布配置正确，并具有[`VRC_UIShape`](https://creators.vrchat.com/worlds/components/vrc_uishape)组件。
- `VRC_UIShape`组件的“Allow Focus View”参数已启用。
- 你没有在VRChat.com的世界设置中禁用Focus View。

此外，你世界中的用户还必须满足以下条件：

- 用户正在手机或平板上玩VRChat。
- 用户将触摸屏作为唯一的输入设备。
- 用户未在其VRChat设置中禁用Focus View。
- 用户距离画布小于3-6米（取决于画布大小）
- 用户距离画布大于0.6-2米（取决于画布大小）

当用户处于Focus View中时：
- 用户的名牌会显示一个Focus View图标，其他玩家可见。
- 用户会一直停留在Focus View中，直到手动关闭。
