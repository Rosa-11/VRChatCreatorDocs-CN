---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 移动端最佳实践 {#mobile-best-practices}

让你的 VRChat 世界跨平台是让更多玩家享受它的绝佳方式。大多数 VRChat 玩家都在 Android 上，因此为你的 VRChat 世界创建一个 Android 版本是值得的。

不过，移动端玩家和 VR 玩家的体验会大不相同！在本指南中，我们将介绍几种让你的移动端 VRChat 世界更舒适、更愉快的方法。
:::info

VRChat 以[公开测试版](https://play.google.com/store/apps/details?id=com.vrchat.mobile.playstore)的形式在 Android 上提供。

:::
## 1. 将你的 VRChat 世界发布到 Android {#1-publish-your-vrchat-world-to-android}

要让更多用户能够访问你的世界，请将其发布到 VRChat 支持的所有平台。

任何上传到 Android 的世界都可以在 Oculus Quest 和 Android 移动设备上使用。如果你之前发布过世界的 Quest 版本，那么它也会在手机和平板电脑上可用！

要了解如何将你的世界上传到 Android，请参阅我们的[跨平台设置文档](https://creators.vrchat.com/platforms/android/cross-platform-setup)。

:::note

如果你在 VRChat SDK 相关的内容中看到"Quest"一词，它通常也适用于 Android。

例如：像 [EasyQuestSwitch](https://vcc.docs.vrchat.com/vpm/curated-community-packages#easyquestswitch) 这样的现有工具非常适合跨平台开发。你并不需要一台 Meta Quest！

:::

## 2. 自动检测你世界中的移动端玩家 {#2-detect-mobile-players-in-your-world-automatically}

当 Android 玩家加入你的世界时，你可能想调整世界的某些方面。使用 Android 移动设备的玩家无法使用 VR 控制器，就像 VR 玩家无法使用触摸屏一样。

使用 [OnInputMethodChanged](/worlds/udon/input-events/#oninputmethodchanged) 来检测玩家的输入方式何时发生变化。例如：

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![一张 Udon Graph 的截图。OnInputMethodChanged 事件用于根据 inputMethod 参数是否为 Touch 来分支执行。](/img/worlds/OnInputMethodChanged.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
public override void OnInputMethodChanged(VRCInputMethod inputMethod)  
{  
    if (inputMethod == VRCInputMethod.Touch)  
    {  
        // 针对触摸输入执行的代码  
    }  
    else  
    {  
        // 针对非触摸输入执行的代码  
    }  
}
```

</TabItem>
</Tabs>

你也可以随时使用 GetLastUsedInputMethod 来检测输入方式。例如：

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![一张 Udon Graph 的截图。GetLastUsedInputMethod 用于根据 inputMethod 参数是否为 Touch 来分支执行。](/img/worlds/GetLastUsedInputMethod.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
if (VRC.SDKBase.InputManager.GetLastUsedInputMethod() == VRCInputMethod.Touch)  
{  
    // 针对触摸输入执行的代码
}  
else  
{  
    // 针对非触摸输入执行的代码  
}
```

</TabItem>
</Tabs>

## 3. 为 Android 优化你的世界 {#3-optimize-your-world-for-android}

Android 设备通常不如 PC 强大。请阅读我们的 [Quest 内容优化指南](https://creators.vrchat.com/platforms/android/quest-content-optimization/)来优化你的世界性能。

好消息：如果你的世界在 Quest 上运行正常，那么它很可能在 Android 移动设备上也能运行良好。手机和平板电脑的分辨率通常低于 VR 头显，而且性能问题引起的不适感也比 VR 中轻。

你仍然应该确保 Quest 玩家能获得可接受的帧率。

## 4. 在 Android 上测试你的世界 {#4-test-your-world-on-android}

在 Android 手机上测试你的世界，有助于你改善移动端玩家的体验。即使你的世界仍处于开发的早期阶段，也请考虑它在移动设备上的表现。

在快速迭代 VRChat 世界时，在 Unity 编辑器或 VRChat 的 Steam 版本中测试它们可能会很方便。摇杆游戏手柄可以很好地替代 VRChat 的移动端控制屏幕。

- 在触摸屏上，_虚拟_摇杆控制玩家的移动和相机。
- 触摸屏让屏幕空间界面更容易与其他输入设备交互。
- 与移动端玩家一起试玩你的世界

## 5. 为触摸屏设计你的用户界面 {#5-design-your-user-interfaces-for-touchscreen}

手机屏幕与 PC 和 VR 设备不同。你可能需要调整用户界面，让移动端用户更容易阅读和交互。

- 让文字易于阅读。使用易读的字体、较大的字号和大按钮。
- 移除不必要的文字。在移动设备上阅读大量文字很困难。
- 本地化文字。移动端用户使用的语言范围比其他平台广泛得多。
- 避免依赖需要 VR 设备或复杂相机移动的交互。
- 尝试使用[屏幕空间用户界面](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/UICanvas.html)。在触摸屏上，它们比世界空间画布更容易交互。可以考虑添加一个用户界面，让用户可以从任何位置打开，而无需走到世界内的菜单面板前。
- 使用 `OnScreenUpdateEvent` 获取玩家屏幕的方向和分辨率。它会在玩家首次加载进入世界时触发一次，并在其设备方向改变时触发。


## 总结：为玩家提供流畅的用户体验 {#in-conclusion-give-players-a-smooth-user-experience}

当玩家加入你的世界时，尽量让体验尽可能流畅。试着应用本文提到的其他技巧，并思考如何在你的世界中运用它们。

- **不要**在没有优化材质的情况下重新上传你的 PC 世界。
- **要**为 Android 用户优化你的世界并提升他们的体验。

- **不要**强迫玩家在享受你的世界之前完成复杂的步骤。
- **要**让你的世界无需任何用户输入就能自动带来乐趣。

- **不要**在未测试的情况下上传你的世界。
- **要**倾听用户的反馈。

---

遵循这些步骤将有助于让你的世界成为移动端玩家的绝佳体验。

你有什么想让我们加入本文的技巧或窍门吗？请在下方提交你的反馈，我们会尽力帮助你把你的知识分享给 VRChat 社区。
