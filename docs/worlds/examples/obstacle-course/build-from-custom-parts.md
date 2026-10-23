---
title: "障碍赛道：使用自定义部件构建"
slug: "build-from-custom-parts"
hidden: false
createdAt: "2021-08-10T19:34:59.759Z"
updatedAt: "2021-08-18T20:57:33.538Z"
---
:::note 先制作一个简单的赛道

强烈建议先使用演示（Demo）预制件和起始场景（Starter Scene）进行操作。请先阅读[使用演示部件构建](/worlds/examples/obstacle-course/build-from-demo-parts)中的说明。
:::
# 自定义 {#customizations}
好了，你已经对我们的演示部件做了一个简单的混搭，现在准备添加你自己的自定义强化道具（PowerUp）、危险物（Hazard）以及更多内容。继续阅读，了解如何制作能与现有系统交互的新预制件。

# 制作自定义检查点 {#making-custom-checkpoints}

以下是我们内置的 Checkpoint 预制件的层级结构：

![build-from-custom-parts-692d375-checkpoint-hierarchy.png](/img/worlds/build-from-custom-parts-692d375-checkpoint-hierarchy.png)

## 触发器要求 {#trigger-requirements}
![build-from-custom-parts-f72c567-checkpoint-inspector.png](/img/worlds/build-from-custom-parts-f72c567-checkpoint-inspector.png)

:::note 这是一种通用模式！

此预制件上的"Trigger"对象使用了一种你会在几乎所有检测玩家的对象上反复看到的模式——检查点、强化道具、危险物、重生器等等。我们会在第一个预制件上详细讲解，之后的就可以跳过这部分了。
:::
你的检查点需要在**CourseTrigger**图层上有一个**碰撞体**，并开启 _isTrigger_，还需要一个带有**OnPlayerDataEnter**程序的 UdonBehaviour。

![build-from-custom-parts-f896bef-checkpoint-inspector.png](/img/worlds/build-from-custom-parts-f896bef-checkpoint-inspector.png)

这个 UdonBehaviour 需要设置以下变量：
1. _fxPrefab_ 应引用一个带有一些有趣效果的预制件，并且该预制件要么使用 Udon 程序**DestroyAfterXSeconds**，要么以其他方式在一段时间后销毁自身。
2. _program_ 应引用此预制件下另一个对象上的 UdonBehaviour，该对象上带有**Checkpoint**程序。
3. _eventName_ 应设置为上述引用的 UdonBehaviour 上存在的事件。
4. 对于检查点，应勾选 _deactivateOnTrigger_，这样在玩家完成赛道之前，每轮它只能被激活一次。
5. _sendPlayerData_ 仅在检查点被用作起点门（StartGate）时才需要。

:::note OnPlayerDataEnter 详情

如果你想进一步了解此程序的工作原理，可以在这里找到完整文档：[OnPlayerDataEnter](/worlds/examples/obstacle-course/uoc-how-stuff-works#onplayerdataenter)
:::
## 检查点程序要求 {#checkpoint-program-requirements}
上述所有设置只是用来检测玩家、创建一个特效对象，然后在*真正的*程序上触发一个事件。在本例中，那就是一个名为"UdonProgram"的对象上名为**Checkpoint**的程序。碰撞体上的程序会尝试在这个 UdonBehaviour 上运行名为"Trigger"的程序。

你只需要有一个带有 UdonBehaviour 并且挂载了**Checkpoint**程序的对象即可。当你放置它时，或者当有人在你的世界中触发它时，这个程序的所有变量都会自动设置好。

## 起点/终点程序要求 {#start--finish-program-requirements}
如果你要制作一个用作起点门或终点门的检查点，程序的设置会略有不同。触发器碰撞体是一样的，你也会使用相同的**Checkpoint**程序，但需要进行以下修改：

### 对于**起点门（StartGate）**： {#for-a-startgate}
* 将 _eventName_ 设置为"StartRace"
* 确保 _sendPlayerData_ 处于开启状态。

### 对于**终点门（FinishGate）**： {#for-a-finishgate}
* 将 _eventName_ 设置为"FinishRace"

## 自定义它！ {#customize-it}
只要按照上述说明设置好**触发器碰撞体**和**检查点程序**，你就拥有了一个可以在自己的世界中使用的检查点预制件。请注意，当有人触发你的检查点时，触发器碰撞体所在的 GameObject 会被设为**不激活**。因此，如果你想隐藏整个检查点，就把碰撞体放在最顶层的对象上。如果你只想隐藏某些部分（就像我们在演示预制件中所做的那样），就把这些部分设为触发器碰撞体对象的子对象。

当有人完成赛道，或者通过菜单重生自己时，赛道会被**重置**。调用此方法时，Course 程序会搜索每个检查点中的触发器碰撞体。它会将所有带有触发器碰撞体的 GameObject 设为不激活，但第一个除外，它会被设为激活（你的**起点门**）。如果你的预制件上还有其他碰撞体，请记住这一点——如果这些碰撞体开启了 _isTrigger_，它们的 GameObject 就会被设为不激活。

## 将它添加到你的检查点预制件列表 {#add-it-to-your-checkpoint-prefabs-list}

Utility 窗口会列出你的"Checkpoint Prefabs"，以便轻松将它们添加到场景中。你可以将新的自定义预制件拖放到此列表中来进行替换，或者先更改列表的"Size"以添加新的空槽位，然后再把新预制件放进去。

# 制作自定义强化道具 {#making-custom-powerups}
请先阅读上面的"制作自定义检查点"，理解触发器碰撞体系统的工作原理，因为强化道具也使用同样的系统。设置好触发器碰撞体后，你就可以开始处理**PowerUp**程序了。

## 强化道具程序要求 {#powerup-program-requirements}
![build-from-custom-parts-c3ecfa0-speed-up-program.png](/img/worlds/build-from-custom-parts-c3ecfa0-speed-up-program.png)

* 首先，确保你有一个设置好的触发器碰撞体，它会调用这个 UdonBehaviour 上的"Trigger"。
* _playerModsManager_ 可以保持不动，当你通过 Utility 窗口创建强化道具时，或者当你按下"Refresh"时，它会被注入。
* _speedChange_ 或 _jumpChange_ 中至少有一个应设置为非 0 的值。正值会被加到你在 Utility 窗口的**Power Ups**部分设置的默认**MoveSpeed**或**Jump Impulse**上。负值则会被减去。你可以组合使用它们——一个让你跳得很高但移动得很慢的强化道具是完全有效的。
* _effectDuration_ 应设置为大于 0 的值（不能是负数）。这是强化道具持续的时长。玩家会在 HUD 上看到一条显示该变化的提示消息，它会按你在此处设置的速度淡出。

## 将它添加到你的强化道具预制件列表 {#add-it-to-your-powerups-prefabs-list}

Utility 窗口会列出你的"PowerUp Prefabs"，以便轻松将它们添加到场景中。你可以将新的自定义预制件拖放到此列表中来进行替换，或者先更改列表的"Size"以添加新的空槽位，然后再把新预制件放进去。

# 制作自定义危险物 {#making-custom-hazards}

危险物使用我们在上面**检查点**部分记录的触发器碰撞体设置，所以请务必先阅读那部分内容。

我们制作了两种可供你参考的危险物——**重生（Respawn）**危险物和**生成（Spawned）**危险物。

## 重生危险物 {#respawn-hazards}
这是我们演示赛道中最常见的危险物。它使用触发器碰撞体将玩家重生到最后一个检查点。你需要一个设置好的触发器碰撞体，用来在另一个挂载了**RespawnOnCourse**程序的对象上运行"Trigger"事件。
![build-from-custom-parts-752dc13-moving-wall-hazard.png](/img/worlds/build-from-custom-parts-752dc13-moving-wall-hazard.png)

当你刷新 Utility 窗口时，RespawnOnCourse 程序会自动设置好 _course_ 变量。

## 生成危险物 {#spawned-hazards}
这种危险物由两部分组成，它是我们提供的定制程度最高的单一用途危险物，作为扩展我们基础系统以添加功能的示例。

### HazardSpawner 程序 {#hazardspawner-program}
![build-from-custom-parts-3ab9259-hazardspawner.png](/img/worlds/build-from-custom-parts-3ab9259-hazardspawner.png)

此程序会每隔 _delay_ 秒生成它的 _prefab_。它有一个对 _playerModsManager_ 的引用，当 Utility 窗口刷新时会被注入。
当它生成危险物时，会在新对象上查找一个 UdonBehaviour，并将其 _playerModsManager_ 变量设置为自己持有的引用。这是必需的，以便生成的危险物能够降低玩家的速度。

### SpawnedHazard 程序 {#spawnedhazard-program}
![build-from-custom-parts-a85b1af-barrel-hazard.png](/img/worlds/build-from-custom-parts-a85b1af-barrel-hazard.png)

此预制件在"Trigger"子对象上有一个 TriggerCollider，它会在 SpawnedHazard 程序上运行"HitPlayer"事件。

* _lifeDuration_ 控制此预制件在生成后存在多久，以确保周围没有玩家时它不会一直留着。
* _playerModsManager_ 由**HazardSpawner**程序设置
* _speedChange_ 的工作方式类似于典型的**PowerUp**。'x' 值是应用到玩家默认速度上的变化量，'y' 值是效果持续时间。此预制件上的默认设置 (-3,3) 会在玩家碰到它时从玩家速度中减去 3，持续 3 秒。

:::danger 解包你的危险物预制件

由于这些预制件不是通过 Utility 窗口创建和管理的，因此在你将它们放入场景后，务必要对它们进行解包。否则自动注入可能无法保留。
:::
# 其他自定义项 {#other-customizations}
以下是一些你可以尝试的其他内容：

## 分数显示字段 {#score-fields}
![build-from-custom-parts-60cfc05-ScoreManager.png](/img/worlds/build-from-custom-parts-60cfc05-ScoreManager.png)

如果你想改变分数显示字段的外观或显示的分数数量，你可以复制"ScoreField"预制件，将你的新版本拖入 Utility 窗口"Score Manager"部分中的"Score Object Prefab"槽位，并将"Number of Scores to Show"设置为重新生成显示分数的 UI。

## HUD
你可以改变 HUD 元素的外观和布局——只需浏览"HUD"对象的层级结构即可。

## 小地图 {#minimap}
如果你想更改小地图的相机角度、平滑程度等，可以在"MinimapCameraSystem/VCam-Follow"下找到它使用的**CinemachineVirtualCamera**。它的 _Follow_ 和 _LookAt_ 变量是在运行时设置的，所以如果你想在编辑器中测试它，可以拖入一个 Capsule，将其设为这两个变量的目标，然后在赛道中拖动它，看看在小地图中的效果。

## 进阶内容 {#advanced-stuff}
你可以点击在 Project 窗口中新建的 Course 资源，查看它的原始数据，并访问各种可以修改的内容（**_风险自负_**），例如默认的 Udon 程序。你还可以修改"Variable to Scene Object Lookup"部分：

![build-from-custom-parts-489afea-lookup.png](/img/worlds/build-from-custom-parts-489afea-lookup.png)

这就是 Utility 窗口在运行 Refresh() 时查找的位置，用于将正确的对象注入到 UdonBehaviour 中。左侧是变量名，右侧是场景中可找到对应组件的对象名称。目前，该系统支持查找并注入以下组件类型：
* GameObject
* UdonBehaviour
* CinemachineVirtualCamera

因此，你可以创建一个新的 Udon 程序，其中包含一个名为"course"的公共变量，它会被自动注入 CourseManager UdonBehaviour。你可以在此处添加自己的条目，甚至添加其他类型——只需修改**ObstacleCourseEditorWindow**类上的**InjectVariableReferences**方法，在 if 链中添加额外的类型即可。如果你编写了一个好用的通用组件处理器，请向 git 仓库提交 Pull Request！
