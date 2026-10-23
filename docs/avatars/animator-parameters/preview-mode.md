# 预览模式 {#preview-mode}

预览模式是一个[动画器参数](/avatars/animator-parameters/)，它表示用户当前是否正在 VRChat 菜单中预览你的虚拟形象。你的 Animator Controller 可以使用这个参数来播放特定动画，让你的虚拟形象预览看起来更吸引人。

## 用法 {#usage}

要为你的虚拟形象设置预览模式动画，请按以下步骤操作:

1. 打开你现有的 Base(Locomotion)Animator Controller。
   - 如果你的 Avatar Descriptor 中没有设置 Base 图层，你可以复制 VRChat 提供的现有 Animator Controller。它位于 `Packages/VRChat SDK Avatars/Samples/AV3 Demo Assets/Animation/Controllers/vrc_AvatarV3LocomotionLayer`。将此动画控制器复制到你的资源中，并将其分配给 Avatar Descriptor 的 `Base` 槽位。

![Base 图层示例](/img/avatars/preview-mode/preview-mode-sample-layer.png)

2. 创建一个类型为 `Int` 的新动画器参数，并将其命名为 `PreviewMode`。

![PreviewMode 参数](/img/avatars/preview-mode/preview-mode-param.png)

3. 创建一个动画剪辑来存放你的预览动画，为其命名(例如 `PreviewOn`)，然后将其拖入 Animator Controller。
4. 在 `Standing` 移动混合树(通常是 Default 状态，以橙色标记)与 `PreviewOn` 状态之间设置一个过渡，并将条件设置为「`PreviewMode` Equals 1」。取消勾选「Has Exit Time」复选框。

![PreviewOn 过渡](/img/avatars/preview-mode/preview-mode-transition-in.png)

5. 再创建一个反向的过渡，从 `PreviewOn` 到 `Standing`，并将条件设置为「`PreviewMode` equals 0」。取消勾选「Has Exit Time」复选框。

![PreviewOff 过渡](/img/avatars/preview-mode/preview-mode-transition-out.png)

6. 最终的设置应该大致如下:

![PreviewMode 设置](/img/avatars/preview-mode/preview-mode-final-setup.png)

7. 现在将你的 Base Animator Controller 分配给虚拟形象 Animator 组件的 `Controller` 槽位，并按你的喜好设置动画。

![接入动画器](/img/avatars/preview-mode/preview-mode-plug-in-animator.png)

:::caution
请注意，材质替换动画在菜单中预览时无法正常工作。不过，你仍然可以完成大多数其他操作，例如切换对象或调整形态键。
:::

8. 完成后，你可以构建与测试你的虚拟形象。

![姿势示例](/img/avatars/preview-mode/preview-mode-final-pose.png)

9. 当你在虚拟形象列表的「Other」部分预览你的虚拟形象时，你应该能看到它动画过渡到你在 `PreviewOn` 动画剪辑中设置的姿势。

![在 Game 视图中](/img/avatars/preview-mode/preview-mode-in-game-view.png)

你可以为预览模式使用不同类型的动画，所以尽情尝试吧。
