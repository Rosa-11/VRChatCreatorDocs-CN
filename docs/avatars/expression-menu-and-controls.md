import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 表情菜单与控件 {#expressions-menu-and-controls}

:::tip
你需要了解 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AnimatorController.html">Unity Animators</UnityVersionedLink> 的基础知识，才能在虚拟形象的动画器中使用表情参数。
:::

你可以在 VRChat 中使用表情菜单控制虚拟形象的动画器。这样你就能通过 VRChat 的径向菜单播放动画或改变虚拟形象的外观。

要在 VRChat 中使用表情菜单，你需要创建（至少）两个资源：

- 一个（或多个）表情菜单资源
- 一个表情参数资源

创建并配置好这些资源后，请务必将它们添加到虚拟形象描述符的“Expressions”区域中。

## 创建表情菜单 {#creating-an-expressions-menu}

1. 通过选择 `Assets > Create > VRChat > Avatars > Expressions Menu` 创建一个**表情菜单资源**。

![Avatar 表情菜单的默认视图。](/img/avatars/expression-menu/default-expressions.png)

2. 选中你的表情菜单资源并点击“Create”按钮，创建一个**表情参数资源**。这样你就可以为表情菜单创建自定义参数。
	- 当你点击“Create”时，表情参数资源会自动分配到你的表情菜单资源上。
	- 你也可以通过选择 `Assets > Create > VRChat > Avatars > Expression Parameters` 来创建表情参数资源。
    - 表情参数有一个选项，可以从 `Animator` 复制参数，以便快速创建你的参数。

![表情参数的默认样子。](/img/avatars/expression-menu/default-parameters.png)


3. 选中表情参数资源以自定义它。
    - 该资源[默认包含三个参数](https://creators.vrchat.com/avatars/animator-parameters/#default-av3-aliasing)：`VRCEmote`、`VRCFaceBlendH` 和 `VRCFaceBlendV`。你可以放心地删除它们，除非你在虚拟形象中使用了它们，或者不想创建自己的表情菜单。
    - 你的动画器始终可以访问 VRChat 的[内置参数](/avatars/animator-parameters)。例如，你不应该把“AFK”或“GestureLeft”参数添加到你的表情参数资源中。
4. 输入自定义参数的名称。
    - 这些名称应与动画器中的参数一致。
    - 你可以使用 `/` 对参数进行分类。例如 `Clothing/Hoodie` 和 `Clothing/Hat`。
    - VRChat 有一些[内置参数](https://creators.vrchat.com/avatars/animator-parameters/#parameters)。
    你始终可以在动画器中使用它们——不要把它们添加到你自己创建的表情参数中。
5. 为每个参数选择类型。类型应与动画器的 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/AnimationParameters.html">参数类型</UnityVersionedLink> 一致。
	- `Int` 可以是 0 到 255 之间的任意整数。
	- `Float` 可以是 -1.0 到 1.0 之间的任意数字。
	- `Bool` 可以是 `true` 或 `false`。
6. 选择 `Default` 值，以设置每个参数的默认值。
	- 当虚拟形象被重置时，参数会恢复为该值。
7. 对于不应该在虚拟形象加载时自行重置的参数，启用 `Saved`。如果你的虚拟形象有自定义选项或设置，`Saved` 可以防止它们在切换到其他世界或虚拟形象后被重置。
8. 如果该参数的状态应通过网络发送给所有其他玩家，请启用 `Synced`。
	- 自定义参数的[同步类型](/avatars/animator-parameters/#sync-types)为 Playable（[Puppet 控件](expression-menu-and-controls#types-of-controls)除外）。

接下来，你应该把这两个资源都添加到虚拟形象描述符中。

![表情参数的默认样子。](/img/avatars/expression-menu/avatar-descriptor-params.png)

9. 选中你的虚拟形象描述符，向下滚动到“Expressions”区域。
10. 将“Menu”属性改为你的表情菜单。
11. 将“Parameters”属性改为你的表情参数。

把这两个资源都添加到虚拟形象描述符后，你的所有表情参数都会出现在表情菜单中，你可以据此自定义它。

![表情参数的默认样子。](/img/avatars/expression-menu/populated-menu.png)

12. 在检视面板中点击“Add Control”。单个菜单最多可添加 8 个控件。
13. 选择一个名称和[类型](/avatars/expression-menu-and-controls#types-of-controls)。 
14. 你也可以在此添加图标、子菜单，或更改控件的顺序。
  - 你可以在 `VRCSDK/Assets3/Expression Menu Icons/` 中找到一些默认图标。

## 控件类型 {#types-of-controls}

表情菜单支持不同类型的控件。请选择最适合你的使用场景的类型。

| 类型             | 说明                                                                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button           | 点击时设置参数，然后在同步/重置发送后重置——通常大约一秒后。无法长按。                                                              |
| Toggle           | 切换开启时设置参数，关闭时重置。                                                                                                                   |
| Sub-Menu         | 打开另一个表情菜单；你还可以在子菜单里放子菜单！此外，子菜单可以在进入时设置一个参数；如果是这样，当你退出该菜单时，该参数会被重置为零。更改该参数的值会关闭任何设置为使用不同值的子菜单，这可用于关闭较长的子菜单链。      |
| Two-Axis Puppet  | 打开一个轴 puppet 菜单，根据摇杆位置控制两个 float 参数。参数分别映射到垂直和水平方向。float 值的范围是 -1.0 到 1.0。 |
| Four-Axis Puppet | 打开一个轴 puppet 菜单，根据摇杆位置控制四个 float 参数。参数按上、右、下、左的顺序映射。float 值为 0.0 到 1.0。  |
| Radial Puppet    | 打开一个径向 puppet 菜单，控制单个 float 参数，有点像你可以填充的进度条！float 值为 0.0 到 1.0。                                                 |

“Puppet”类型的控件有两个特殊功能：
- 对于 puppet 控件，“Parameter”属性是可选的。如果你使用它，它会在 puppet 控件打开期间被设置。这使你的动画器能够检测 puppet 控件当前是否处于打开状态。
- 当你在 VRChat 中退出 puppet 控件时，它会保留“Parameter Horizontal/Vertical/Radial”的值（直到你重新打开该控件，或在其他地方更改该值）。这让你可以在把 puppet 控件“冻结”在任意状态的同时浏览径向菜单。

### Puppet 菜单同步 {#puppet-menu-sync}

**Puppet** 控件在打开时使用[**IK 同步**](/avatars/animator-parameters#sync-types)。如果你希望同步尽可能贴近你的输入、以支持快速动作，你就应该使用 Puppet 菜单。

**Button**/**Toggle** 使用 **Playable 同步**，它按需更新而非持续更新，适合那些你只需要“开/关”而不需要高精度同步的内容。

Puppet 菜单同步始终以可用的最高速率更新，并且会为远程用户平滑数值——当定时复现很重要时，效果要好得多。


