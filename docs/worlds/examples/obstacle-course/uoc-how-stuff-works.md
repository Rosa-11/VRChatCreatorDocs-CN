---
title: "障碍赛道：各部分如何运作"
slug: "uoc-how-stuff-works"
excerpt: "Udon 障碍赛道中各个不同程序和自定义编辑器脚本如何协同工作"
hidden: false
createdAt: "2021-08-10T19:42:13.400Z"
updatedAt: "2021-08-18T20:57:54.974Z"
---
每个系统的设计都只承担一组特定的职责，并且尽可能少地了解其他系统。

# 概览 {#overview}
* **PlayerDataManager**会为每个进入世界的玩家分配**PlayerData**对象。
* 当**PlayerData**对象进入起点门**Checkpoint**时，他们刚刚进入的**Course**会开始记录他们的时间，并激活下一个**Checkpoint**。
* 当**PlayerData**对象通过最后一个**Checkpoint**时，他们的时间会被添加到 Scoreboard。
* 如果**PlayerData**对象进入**PowerUp**触发器，**PlayerModsManager**会临时改变他们的速度和/或跳跃能力，并在设定的持续时间后将其重置为默认值
* 如果**PlayerData**对象进入**Respawn**触发器，**Course**会将他们重生在最后通过的**Checkpoint**处。

以下各节介绍了共同构成完整体验的各个程序与脚本。

# 玩家 {#players}
每个加入世界的玩家都会获得一个“PlayerData”对象，用于管理他们的状态以及在赛道中的进度。**PlayerDataManager**负责分配**PlayerData**对象，这些对象可以触发**OnPlayerDataEnter**程序。

## PlayerDataManager
你可以在场景中“Udon”对象下的“PlayerDataManager”GameObject上找到这个程序。它有两个重要的公共变量：
**dataPool**：指向与此 Manager 位于同一对象上的 VRC Object Pool 组件的引用。当有玩家加入世界时，此管理器会为玩家 TryToSpawn 一个 PlayerData 对象，并把所有权赋予玩家。
**followCam**：指向在玩家跑过赛道时从其上方跟随的摄像机的引用。在此处设置，以便 PlayerDataManager 在刷新每个 PlayerData 对象时为其分配该引用。

当你在 Toolkit 窗口中更改“Number of Players”选项时，所有现有的 PlayerData 对象都会从场景中移除，然后它们的新副本会作为 PlayerDataManager 的子对象被添加进来。每个副本的公共变量都会被正确设置，Object Pool 也会更新以容纳所有新的 PlayerData 对象。

## PlayerObject
PlayerObject 预制件带有 Rigidbody 和 Capsule Collider 组件，触发 PowerUp、Hazard 等需要用到它们。它位于自定义图层**CoursePlayer**上，该图层只与**CourseTrigger**发生碰撞，以便与 Hazard 和 PowerUp 交互。它上面还有一个 UdonBehaviour，承载着一个重要的程序：

## PlayerData
此程序是跑赛道的玩家与所有其他系统之间的主要连接器。它的变量有：
**timeElapsed**：同步的 Float，当玩家穿过终点门时由**Course**程序更新。当它发生变化时，PlayerData 对象的所有者会在记分板上显示该时间，以便他们在本地看到自己的最新成绩。ScoreManager 对象的所有者会看到这一变化，并把玩家的新时间与 displayName 添加到记分板上。

**isRacing**：Boolean，当玩家进入起点门时由**Course**设为 true。当玩家进入终点门、通过菜单手动重生，或对**Course**调用**Reset**时，它会被设为 false。由**Course**使用，详见该程序。

**rigidbody**：由程序在 Start 时缓存，无需在检视面板中设置。每次 Update 时，它都会被移动到玩家的位置和旋转。

**player**：指向本地玩家实际 VRCPlayerApi 对象的引用。当此程序上同步的 _playerId_ 发生变化时缓存。用于获取玩家的 _displayName_。

**timeDisplay**：指向为本地玩家显示最新时间的 UdonBehaviour 的引用。

**scoreManager**：指向**ScoreManager** UdonBehaviour 的引用。当该对象的所有者收到刚刚完成赛道的**PlayerData**对象发来的 _timeElapsed_ 变化时，它会将**ScoreManager**对象上的公共变量 _scoreToProcess_ 设为一个字符串，把 _displayName_ 和 _elapsedTime_ 组合成单个字符串以供处理。

**scoreManagerObject**：指向承载**ScoreManager**程序所在 UdonBehaviour 的 GameObject 的引用。用于确保我们只在**ScoreManager**对象的所有者上运行分数处理逻辑。我们无法从 UdonBehaviour 引用获取该 GameObject，因此在这里单独包含它。

**followCam**：指向跟随玩家穿过赛道的 CinemachineVirtualCamera 的引用。该程序将自身的 Transform 同时设为摄像机的 _follow_ 和 _lookAt_ 目标，并在 _isRacing_ 变化时更改该摄像机的优先级。

## OnPlayerDataEnter
此程序用于那些需要检测**PlayerData**对象进入其触发器碰撞体的对象。我们使用自定义图层**CoursePlayer**和**CourseTrigger**来确保只有特定对象会触发此碰撞体。当它们触发时，会触发内部事件**OnPlayerDataEnter**来执行多种操作。此程序具有以下变量：

**fxPrefab**：在**Trigger**时生成的 GameObject，用于播放声音、显示一些粒子等，让玩家知道发生了某些事情。

**program**：目标 UdonBehaviour，带有我们希望在**Trigger**时运行的事件。这个 _program_ 包含**Checkpoint**、**PowerUp**、**Hazard**等所需的具体逻辑。

**eventName**：要在目标 _program_ 上运行的事件名称。

**deactivateOnTrigger**：此对象是否应在单次**Trigger**后停用自身。这对于**Checkpoint**以及其他每次跑动只应激活一次的物品很有用。

**lastCollider**：启动 Trigger 逻辑的碰撞体，在调用**Trigger**之前被临时缓存，并在需要时用于查找**PlayerData** UdonBehaviour。

**fxSpawn**：用于设置将要生成的 FX 位置的 Transform。如果未设置，则默认为带碰撞体对象的 Transform；当你希望在穿过碰撞体时在另一个位置触发烟花（就像我们在终点门所做的那样）时会很有用。

**sendPlayerData**：一个 Boolean，决定是否尝试传递触发该逻辑的**PlayerData**程序。在进入起点门时会用到，也可能对其他场景有用。

当检测到**PlayerData**碰撞体触发进入时，此程序会执行以下操作：
* 如果我们设置了 _eventName_ 变量，那么我们会检查 _sendPlayerData_ 是否为 true。如果是，我们会尝试将目标 UdonBehaviour 程序上的 _playerData_ 变量设置为我们刚刚碰撞到的 UdonBehaviour。
* 然后我们会在目标程序上运行事件 _eventName_。
* 如果此程序上的 _fxPrefab_ GameObject 已设置（不是默认的“self”），那么我们会**Instantiate**该预制件的一个副本，并根据 _fxSpawn_ 变量设置其位置和旋转。
* 如果 _deactivateOnTrigger_ 为 true，那么我们会将**此**GameObject设为非激活状态。

# Course 与 Checkpoint {#course--checkpoints}
这是项目的核心，你需要穿过这些门和检查点才能完成计时赛。

# Course
此程序位于 CourseManager 对象上，管理本地玩家的计时赛状态。它没有任何同步变量——它只知道正在跑赛道的本地玩家。

在**Start**时，它会调用**Reset**来正确初始化自身。
如果玩家自行重生，Course 会**Reset**。

在**Reset**时，我们会关闭所有**Checkpoint**触发器，只打开起点门。我们通过遍历 _checkpoints_ 数组中的每个 GameObject，找到每个 Trigger Collider，并对该碰撞体所在的 GameObject 调用**SetActive**，索引 0 设为 true，其余全部设为 false。
我们还会把 _nextIndex_ 设为 -1，并把 _isRacing_ 设为 false。

在**StartRace**时，我们：
* 根据当前时间设置 _startTime_
* 将 _isRacing_ 设为 true
* 将 _nextIndex_ 设为 1（因为比赛是通过穿过 Checkpoint 0 启动的）

当某个**Checkpoint**被触发时，它会把 Course 上的 _nextIndex_ 设为其自身索引 + 1。这会触发 Course 程序上的**nextIndexChange**事件，随后激活下一个 Checkpoint 所在的 GameObject。

在**Update**期间，我们会检查玩家是否 _isRacing_，如果是，就获取本次跑动的已用时间并将其设置到 _timeDisplay_ Text 对象上。

在**FinishRace**时，我们：
* 将 _isRacing_ 设为 false
* 将目标**PlayerData**程序上的 _timeElapsed_ 设为当前时间减去 _startTime_。
* 将 _playerData_ 设为 null，因为我们不再有玩家在跑赛道。
* 等待 _resetDelay_ 秒，然后**Reset**赛道。

在**Respawn**时，我们会检查玩家是否 _isRacing_。如果是，就把他们送回最后一个检查点的 Transform 位置。如果不是，就把他们传送到足够低的位置，让他们被世界重生，回到原始出生点之一。

## ObstacleCourseData
这个自定义脚本只保存对**ObstacleCourseAsset**的引用，其中包含有关你的赛道的所有信息，例如使用哪些预制件、玩家数量、默认速度等。它由 Utility 窗口加载，因此场景中应该有一个。你应该创建自己的副本，这样在用此包的较新版本更新项目时它不会被覆盖。方法是复制一个现有资源，这样可以确保默认值正确。

## Checkpoint
每个 Checkpoint 对象都有一个索引，代表它们在计时赛中的顺序，通过 Utility 窗口放置 Checkpoint 或修改它们的顺序时会自动设置。
它们带有 Trigger Collider 和一个**OnPlayerDataEnter**程序，该程序会调用我们示例预制件中名为“UdonProgram”的对象上的**Checkpoint**程序。这个程序很简单，可在其上触发三种可能的事件：

**StartRace**会把**Course**程序上的 _playerData_ 变量设为刚刚进入此检查点的 UdonBehaviour。当这发生时，Course 会开始比赛。

**Trigger**会把**Course**程序上的 _nextIndex_ 变量设为 _index_ + 1。

**FinishRace**只会调用**Course**程序上的**FinishRace**。

# 计分 {#score}
没有一些友好竞争的计时赛还叫计时赛吗？计分系统会同步最近几次跑动的名字与时间，以及实例中目前的最好成绩。

## ScoreManager
此程序位于“Udon”GameObject 下名为“ScoreManager”的对象上。它使用队列系统来处理传入的分数并同步它们。它本身实际上_没有任何同步变量_，而是依靠 *ScoreFields* 来同步数值。当你更改 Number of Scores to Show 时，Utility 窗口会自动填充这些字段。

在**Start**时，此程序会调用自身**Render**事件一次。

在**Render**时，程序会对 _scoreCam_ 调用**Render**，将其当前视图渲染到一张 RenderTexture，该纹理在整个赛道中被用于显示当前分数。

当此对象所有者上的 _scoretoProcess_ 发生变化时，我们会调用**MakeRoom**，然后调用**ProcessNextScore**。这之所以有效，是因为实例中的每个玩家在有人完成跑动时都会收到 _timeElapsed_ 的更新，如果他们自己是所有者，该程序就会更新此对象上的 _scoreToProcess_。

在**MakeRoom**时，我们会检查 scoreFields 是否都已填满，如果是，就迭代地将数值向下复制，以在顶部腾出空间。

在**ProcessNextScore**时：
* 再次把分数拆分为 displayName 和 time，以便整齐地格式化，然后把相应**ScoreField**上的 _targetVarName_ 值设为此内容。该目标变量是同步的，因此我们通过这种方式设置它来为所有人更新。
* 将此分数的时间与我们的最高分时间比较，必要时更新**HighScoreField**。
* 将 _scoreToProcess_ 的值设为空字符串，以便准备处理下一个进来的分数。
* 向所有人发送**Render**事件以更新他们的分数纹理。

## ScoreField
此程序使用一种简单而有效的模式——它有一个名为 _log_ 的公共同步变量。当 log 变化时，它会把字段中的文本更新为新值。这样，当对象所有者更新数值时，这些值会被同步并为所有人更新，而从另一个程序执行这一操作也很容易。在我们的例子中，我们从**ScoreManager**更新此值。

## HighScoreField
此程序使用与上面的 score field 相同的模式，但还有一个同步的 _score_ float，可用于比较分数，并仅在新分数更好时才更新。它还有一个“prefix”，即在进行任何更改之前注入的字符串。在本例中，字符串“High Score:”会被前置到传入的字符串之前。

# PowerUps
为想要最大化分数的玩家提供速度和跳跃加成很有趣，你也可以把速度和跳跃惩罚作为障碍与危险的一部分，让你的玩家在策略上有一些选择。当你用 Utility 窗口创建 PowerUp 时，它们都会作为“PlayerModsManager”对象的子对象放置。它们还会自动设置 *PlayerModsManager* UdonBehaviour，以便应用其效果。

它们有一个非常简单的程序。当然，它由**OnPlayerDataEnter**程序调用，并且只有一个**Trigger**事件。它的变量有：

**playerModsManager**：通过 Utility 窗口创建 PowerUp 时自动设置。用于实际应用效果。

**speedChange**：触发时要应用于玩家速度的效果。0 会跳过，正值会增加速度，负值会降低速度。

**jumpChange**：与 speedChange 相同，但作用于 Jump Impulse。

**effectDuration**：效果持续多久后消失。

在**Trigger**时，如果 _speedToProcess_ 不为 0，程序会在**PlayerModsManager**上设置它；如果 _jumpToProcess_ 不为 0，也会设置它。为了简化逻辑，我们把 _amount_ 和 _duration_ 值打包成单个 Vector2，其中 _x_ 是数量，_y_ 是持续时间。

## PlayerModsManager
有一个集中的位置来管理玩家能力的变化很有用，尤其考虑到某个玩家可能先跑过一个持续 2 秒的“Speed + 3”，然后又跑过一个持续 3 秒的“Speed - 1”。在我们的程序中，速度修改会互相抵消，跳跃修改也会互相抵消。所以在上述例子中，玩家一旦触发“Speed - 1” PowerUp，就会重置为默认速度 - 1，并开始一个新的 3 秒计时。

该程序像**ScoreManager**一样使用队列。当 _speedToProcess_ 变化时，它会计算出要使用的新速度，应用到本地玩家的 VRCPlayerApi，并根据 PowerUp 的 _effectDuration_ 开始倒计时。程序会在用户的 HUD 上显示该修改，并随时间淡出，让玩家能直观地了解还剩多少时间。计时结束时，它会把 VRCPlayerApi 上的目标属性重置为默认值，这就是我们在此处而不是在“VRCWorldSettings”程序中存储和设置这些值的原因。

## DestroyAfterXSeconds
这个简单的程序适用于本地实例化的对象，例如由**OnPlayerDataEnter**程序创建的 FX 预制件。它会确保对象自行销毁，避免你最终留下一大堆旧的音效和粒子系统。

## PlayClipFromArray
这个程序有助于为声音增添一些变化，例如用在 FX 预制件上。与单个 AudioClip 不同，你可以在此程序上设置一组 AudioClip，它会在被创建时随机选择其中一个并播放。也可以用于 Footsteps 程序。

# 危险物 {#hazards}
如果你想挑战你的玩家，可以添加各种各样的危险物。我们包含了几个示例程序，欢迎随意制作你自己的！

## Autorotate
此程序只是旋转它所在的 Transform。你可以调整每个轴的 _amount_，该值会乘以 Time.deltaTime 以确保平滑旋转。使用动画器性能会更好，但你在试验时这个就够用了。

## SpawnedHazard
这种危险物会降低与其接触的玩家的速度。你可以像在 PowerUp 上那样设置 _speedChange_——x 是要加到玩家速度上的数量，y 是效果的持续时间。要把玩家速度降低 3 并持续 1 秒，你会把 _speedChange_ 设为 (-3,1)。它们在创建时会按名称查找“PlayerModsManager”GameObject 和 UdonBehaviour——性能不是很好，但能用。

## HazardSpawner
此程序使用**SendCustomEventDelayedSeconds**每隔 _delay_ 秒生成危险物。在我们的示例项目中，我们使用了略有不同的延迟，为玩家制造了一座需要躲避的棘手木桶山。

## FallingBlock
这是我们包含的唯一一个与玩家交互但不使用**OnPlayerDataEnter**的程序。这是因为我们想同时知道玩家进入_和_退出的时机，而那个程序并未考虑这一点。当玩家进入时，我们使用**SendCustomEventDelayedSeconds**在 _triggerTime_ 秒后运行**CheckForDrop**。

在**CheckForDrop**时，如果玩家尚未离开碰撞体，它会把自己的 Rigidbody 设为非运动学，使其下落（玩家也随之落下）。然后在 _resetTime_ 秒后调用**Reset**。

# 其他 {#misc}

## 注入 {#injection}
本项目有一个用于注入对某些组件引用的系统。它在[此处](/worlds/examples/obstacle-course/build-from-custom-parts#advanced-stuff)有描述。
