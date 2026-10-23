---
description: "基础大厅功能。"
sidebar_custom_props:
    customIcon: 🚪
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';

# 玩家加入区域 {#player-join-zones}

![玩家加入区域世界预览](/img/worlds/examples/player-join-zones.png)

本示例展示如何根据玩家的位置收集玩家，并处理基础的大厅功能，使用户能够加入游戏、进行游戏、查看结果，然后开始新的一局。它可用于构建自愿参与式的体验，例如只有实例中部分玩家参与的游戏。它还展示了如何随机选择一名玩家将其放大，以及如何用额外的模式扩展预制件的逻辑。

访问[玩家加入区域示例世界](https://vrchat.com/home/world/wrld_12492ad5-ff17-445d-9f90-7b14376b1f32)亲自试用！

## 使用示例 {#using-the-example}

这些示例只需一名玩家即可运行，但使用两名或更多玩家进行测试会更有帮助。
先打开`player-join-zones`场景在Unity编辑器中测试，或在VRChat客户端中访问上面链接的示例世界。
本示例需要TextMeshPro，如果你的项目中还没有TextMeshPro，会有一个窗口提示“Import TMP Essentials”。接受该提示，并在导入完成后重新打开场景。

### 玩家加入区域： {#player-join-zone}
1. 首先，注意画布底部的按钮显示为“Players Needed”，且不可交互。
2. 走入地面上高亮的区域，你会看到自己的displayName出现在其前方的面板上。
3. 当你走入和走出该区域时，你的名字应会出现和消失。
4. 按下“Start Game”按钮即可锁定玩家列表，此后即使玩家进出，该列表也不再变化。
5. 按下现在显示为“Reset”的按钮，玩家列表会被清空，以便创建新的列表。

### 头目选择器： {#boss-picker}
1. 走入地面上高亮的区域，你会看到自己的displayName出现在其前方面板上“Possible Bosses:”标签下。
2. 当你走入和走出该区域时，你的名字应会出现和消失。
3. 按下“Start Game”按钮随机选择一名玩家并将其放大，该玩家现在就是“Boss”。注意标签会显示为“Boss:”而不是“Possible Bosses:”。
4. 按下现在显示为“Reset”的按钮，Boss应缩小回其原始大小，玩家列表会被清空以便创建新的列表。

<HowToImportExample/>

## 技术解析 {#technical-breakdown}

本节介绍基础程序及其两个扩展——`JoinZoneWithDisplay`和`BossPicker`。

`PlayerJoinZone`程序是一个用于管理特定区域内玩家的基类。它负责以下内容：
* **Modes**：它定义了三种模式——`MODE_JOIN`接受对玩家列表的更改，`MODE_GAME`为游戏玩法冻结玩家列表，`MODE_END`提供了一个显示游戏结束信息的位置。该模式会同步给所有玩家，并使用[FieldChangeCallback](https://udonsharp.docs.vrchat.com/udonsharp/#fieldchangecallback)在模式更改时调用额外的功能。
* **Player Tracking**：它使用三个事件来跟踪玩家，并将他们添加到名为`Players`的[DataList](/worlds/udon/data-containers/data-lists)中。
    * `OnPlayerTriggerStay`检测进入该区域的玩家，以及在模式更改时已在该区域内的玩家。
    * `OnPlayerTriggerExit`检测离开该区域的玩家。
    * `OnPlayerLeft`检测离开实例的玩家，否则他们可能会“卡”在列表中。
* **Interaction**：它有一个方法`_ToggleMode`，设计为从UI Button触发。当任何人按下它时，该方法会在三种模式之间切换。

交互示例：
1. 该区域将模式设置为`MODE_JOIN`，这会触发带有该程序的GameObject的所有者运行`ResetPlayers()`。
    1. `ResetPlayers()`会在所有者上创建一个新的`Players` Datalist。
2. 一名玩家“Dingbat”进入该区域的碰撞体，为实例中的每个人触发`OnPlayerTriggerStay`事件。
    1. 所有者检查Dingbat是否已在列表中，其他人会忽略该触发器。列表中没有找到Dingbat，因此所有者会将其添加。
    2. Dingbat在留在该区域期间会继续触发此事件，但由于他们已在Datalist中，因此不会采取进一步操作。
3. 一名玩家“SquirrelFam”进入该区域的碰撞体，再次触发上述操作，因此`Players` Datalist中现在有两名玩家。
4. Dingbat决定去玩别的游戏，离开了实例。
5. 该区域收到Dingbat的`OnPlayerLeft`事件，并将他们从`Players` Datalist中移除，现在只剩下SquirrelFam。
6. SquirrelFam离开该区域，触发`OnPlayerTriggerExit`事件，所有者会响应并将其从Datalist中移除。Datalist中已没有玩家。

### 扩展该类 {#extending-the-class}

在上述交互中，`Players`列表被多次创建和更新，但没有向实例中的任何用户显示信息。这是因为基类包含的逻辑在许多场景中都很有用，但单独使用时并不完整。我们提供了该基类的两个扩展，以演示如何添加功能。

#### JoinZoneWithDisplay

该扩展将一些UI字段和一个按钮连接到核心逻辑，使整体可用。基类不包含任何对UI项的引用，以便在你的项目中更轻松地复用和扩展。

它包括以下UI对象：
* _playerNamesField：一个Textfield，用于显示当前在该区域内的所有玩家的名称。
* _buttonLabelField：Button内的Textfield用于切换当前的`Mode`，每当Mode变化时它都会更新。
* _toggleButton：一个UI Button，用于触发`_ToggleMode`方法。
* _ownerField：一个Textfield，用于显示此GameObject的所有者，以便调试。

该类新增了一个字符串`PlayerNamesString`，它是一行文本，包含所有当前玩家的名字，名字之间用逗号分隔。它在所有者上构建，然后同步给所有其他玩家，并使用FieldChangeCallback更新`_playerNamesField`。它还新增了一个名为`MODE_WAIT`的模式，该模式会冻结UI Button 3秒，以防止“游戏”过快结束。该持续时间可在`_waitDuration`的检视面板字段中设置。

回顾上面`PlayerJoinZone`程序的交互示例，以下是使用`JoinZoneWithDisplay`程序时会发生不同之处：
1. 创建`Players` Datalist后，会调用方法`OnPlayersChanged()`。该方法在基类中为空，但在我们的扩展中，它会通过运行基类中的`GetPlayersAsStringList()`方法来设置同步字符串`PlayerNamesString`。
    1. 实例中的所有玩家都会收到这个更新后的字符串，并用该值设置其`_playerNamesField`中的文本。
    1. 每个玩家还会调用`SetupButtonFromPlayers()`，如果区域内没有人，它会将其`_toggleButton`的文本更新为“Players Needed”。
2. 所有者将Dingbat添加到`Players` Datalist后，会再次触发方法`OnPlayersChanged()`，它会传播上述相同的更改，更新同步的`PlayerNamesString`值，并在需要时触发文本字段和按钮标签的更新。

所有者对`Players`列表所做的每次更改之后，都会调用`OnPlayersChanged()`来更新数据，并为实例中的其他所有人显示该数据。

本示例还有一个用于切换模式的Button，如下所示：
1. 任何玩家按下该Button，它已链接到`UdonBehavior.SendCustomEvent(_ToggleMode)`。如果他们不是所有者，则会将事件`ToggleModeRPC()`发送给所有者。如果他们是所有者，则会自己调用`ToggleModeRPC()`。无论哪种方式，该方法都会运行并切换到下一个`Mode`。
2. `Mode`是一个带有FieldChangeCallback的同步变量，因此其实例中的每个人都会更新该值，并且函数`OnModeChanged()`会在每个玩家本地运行。
3. 该方法在基类中基本为空（它只包含将其逻辑传播到外部监听器的逻辑），但在本示例中，如果模式现在是`MODE_CHOSEN`，它会将`_toggleButton`的标签设置为“Reset”。

该类设置的所有文本都定义在类顶部附近的几个字符串中，以便于更新。

#### BossPicker

该扩展具有与[JoinZoneWithDisplay](#joinzonewithdisplay)相同的一些字段，并添加了从所选组中挑选一名玩家并对其应用一定缩放的逻辑，如果你想制作一个某个角色应比其他角色更大的游戏，这会很有用。它还添加了另一个名为`MODE_GAMEOVER`的Mode，用于查看得分。

它包含一个同步的`PlayerNamesString`字段，并使用相同的逻辑来创建列表、将其同步给实例中的所有玩家并更新文本字段。

当`Mode`更改为`MODE_CHOSEN`时，所有者会从Datalist中随机选择一名玩家，并将其PlayerId保存为`_bossPlayerId`，这是一个新的同步字段，带有FieldChangeCallback，会触发`_OnBossChanged()`。
在`OnBossChanged()`中，每个玩家会检查自己是否是Boss。如果是，他们会将自己的AvatarEyeHeight设置为可能的最大尺寸（目前为5个单位）。对于其他所有玩家，只有当其高度大于`_maxPlayerHeight`时才会更改其高度，该值可在程序的检视面板中调整。
为了处理新的Mode，该类中已重写`ToggleModeRPC()`方法。现在，`MODE_CHOSEN`会启动一个计时器，在5秒后自动过渡到`MODE_END`，或过渡到你在检视面板中为`gameDuration`设置的值。该方法还会在处于`MODE_CHOSEN`状态时禁用按钮，使游戏无法提前结束。最后，它具有在按下UI按钮时从`MODE_END`过渡到`MODE_JOIN`的逻辑。
在`OnModeChanged()`中，当模式变回`MODE_JOIN`时，每个玩家会重置回其原始高度，这通常发生在游戏结束并开启新一轮之后。

### 与Udon Graph及现有程序的集成 {#integration-with-udon-graph--existing-programs}

这些程序每一个都有一个`targets`字段，它是UdonBehaviours的数组。你可以编写/修改Udon程序以包含一些会被持续更新的特殊变量。它们是：
* `int` Mode - 在所有程序中于`OnModeChanged()`期间更新
* `Datalist` Players - 在所有程序中于`OnPlayersChanged()`期间更新
* `int` BossPlayerId - 在BossPicker程序中于`OnBossChanged()`期间更新

“Graph Listener”画布演示了这一点，它会用来自两个程序的最新事件和更新来刷新一个显示。其Udon Graph程序简单地实现了全部三个公共变量，并使用`OnVariableChanged`节点对其变化做出反应，将结果写入一个文本字段。
