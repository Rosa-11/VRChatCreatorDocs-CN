import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 障碍赛道：使用演示部件构建 {#obstacle-course-build-from-demo-parts}

## 打开起始场景 {#open-starter-scene}
制作新赛道最简单的方法是使用我们提供的模型和预制件。
首先打开场景"_WorldJam2/Scenes/Starter.unity"

## 创建你自己的文件夹 {#make-your-own-folder}
重要的是，要把项目中特定的任何内容都保存在"_WorldJam2"文件夹之外的文件夹中，这样你就能在不覆盖自己工作成果的情况下导入更新。我们建议你在 Assets 下创建一个新文件夹，在本演示中我们将其命名为"_MyProject"。我们会在重要文件夹的名称开头加下划线，这样它们就会显示在按字母排序的文件列表顶部。

## 创建新的赛道资源 {#make-new-course-asset}
**ObstacleCourseAsset**包含有关你的检查点、玩家预制件、分数显示、强化道具等的所有特殊信息。
1. 在 **Project** 窗口中，找到"_WorldJam2/Courses"下的"StarterCourse.asset"并复制它。
2. 将新赛道重命名为自定义名称，例如"MyCourse.asset"，然后将其移动到你的"_MyProject"文件夹中。
3. 在你的层级视图中，选择"Udon/CourseManager"下的 **CourseManager**。
4. 将你刚刚创建的新赛道资源拖放到 CourseManager 对象上 **Obstacle Course Data** 脚本的"Asset"字段中。

![build-from-demo-parts-8a69d28-drop-course-asset.png](/img/worlds/build-from-demo-parts-8a69d28-drop-course-asset.png)

现在你的所有更改都会保存到你自定义的赛道中，而不是起始赛道中。


## 添加赛道部件 {#add-course-pieces}
你可以在项目的"Assets/_WorldJam2/Prefabs/Course Pieces"下找到所有可用的赛道部件。
![build-from-demo-parts-ebf489c-all-course-pieces.png](/img/worlds/build-from-demo-parts-ebf489c-all-course-pieces.png)

1. 要向赛道中添加新部件，只需将它们拖放到 Scene 视图中即可。拖动时可以按住 CTRL，将物品吸附到网格上。
2. 如果你在任何部件上使用了 Udon，请务必将它们从预制件解包为普通的 GameObject。这样做还有一个好处：如果你想在不覆盖现有部件的情况下加载此项目的更新包，也不会出问题。

:::note 网格吸附

Unity 有许多用于将物品对齐到网格的设置——请查看 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/GridSnapping.html">Unity 手册</UnityVersionedLink>
:::

## 添加检查点 {#add-checkpoints}
你的起点门、检查点和终点门最好通过我们为这次 jam 制作的专用 Utility 窗口来添加。

1. 从菜单栏的"⏵Obstacle Jam Utilities / Open Window"下打开 **Obstacle Jam Utilities Window**
![build-from-demo-parts-df0b76f-open-utilities-window.png](/img/worlds/build-from-demo-parts-df0b76f-open-utilities-window.png)

2. 查看这些预制件：

![build-from-demo-parts-22a6f4e-checkpoint-prefabs.png](/img/worlds/build-from-demo-parts-22a6f4e-checkpoint-prefabs.png)

这三个就是我们制作一个可运行赛道所需的全部预制件——一个起点门、一个检查点和一个终点门。

3. Utility 窗口让添加新检查点变得非常容易。从"Checkpoint Prefabs"列表中选择一个预制件，然后将光标移到 Scene 视图上。你会看到所选预制件的预览，它会尝试智能地放置在你指向的表面上——注意下面的 GIF 中，门会吸附到方块的侧面，直到我指向顶部为止。
4. 对放置位置满意后，按空格键即可真正添加预制件并将其连接到你的场景中。
![build-from-demo-parts-4200ff4-place-gates.gif](/img/worlds/build-from-demo-parts-4200ff4-place-gates.gif)

5. 以这种方式添加检查点预制件时，它会自动添加到你的"Checkpoints In Scene"列表中。打开该列表即可看到新加入的检查点：

![build-from-demo-parts-84c73fe-checkpoints-in-scene.png](/img/worlds/build-from-demo-parts-84c73fe-checkpoints-in-scene.png)

选择其中一个检查点，Scene 视图就会移动并聚焦到它上面。你也可以在层级视图中看到它被选中。如果你在层级视图中点击这个新"Checkpoint 1"对象旁边的三角形，就会看到它上面有一个 UdonProgram。选中那个 UdonProgram，你可以看到它的 'index' 已被自动设置为 1。

![build-from-demo-parts-feaf465-checkpoint-program.png](/img/worlds/build-from-demo-parts-feaf465-checkpoint-program.png)

6. 继续在赛道中添加检查点，直到数量足够开始使用为止。如果你需要重新排列顺序，可以使用"Checkpoints in Scene"列表中的上下箭头来更改玩家通过各个门的顺序。以这种方式更改顺序时，检查点的索引会更新为与其实际顺序一致，其名称也会更新为与其索引一致。

## 测试检查点 {#test-checkpoints}
此时，你已经扩展或更改了赛道，并添加了一些检查点——该测试了！打开 VRChat SDK 控制面板，登录你的账号，然后选择"Build & Test"来测试你的赛道！
:::note 构建与测试

如果你在启动世界时遇到任何问题，或者只是想进一步了解本地测试，请查看[构建与测试](/worlds/udon/using-build-test)文档。
:::
## 添加强化道具 {#add-powerups}
让我们添加一些强化道具，让内容更有趣。

1. 在 Utility 窗口中，打开"Power Ups"部分。它与检查点部分非常相似，只是已放置的那些强化道具有不同的参数。

![build-from-demo-parts-9c8911e-power-ups-section.png](/img/worlds/build-from-demo-parts-9c8911e-power-ups-section.png)

2. 选择其中一个 PowerUp 预制件，然后将鼠标指向某个表面并按空格键，就像你添加检查点时那样，将其放置到场景中。
3. 放置强化道具后，**Transform** 工具会被选中，以便你微调物品的位置。
4. 你的新强化道具会出现在"PowerUps In Scene"部分中。你可以使用强化道具名称右侧的字段来更改它对玩家产生的效果。你可以使用负数来*降低*玩家的速度和跳跃能力，但持续时间为负数则不会产生任何效果。
5. 选择一个强化道具会自动在 Scene 视图中聚焦它，并在层级视图中选中它。如果你想移除某个强化道具，可以从场景中删除它，然后按 Utility 窗口底部的"Refresh"来更新列表。

你还可以在此部分更改默认的 **Move Speed** 和 **Jump Impulse**。请务必**不要**在你的世界中放入 **VRCWorldSettings** 程序，否则它会与这些设置冲突。

Move Speed 会将**行走**、**奔跑**和**横移**速度设置为相同值。

## 测试强化道具 {#test-powerups}

再次对你的场景执行**构建与测试**，试用你的新强化道具！

## 添加危险物 {#add-hazards}

1. 在"Assets/_WorldJam2/Prefabs/Hazards"中找到危险物预制件
![build-from-demo-parts-5c1a72c-hazards.png](/img/worlds/build-from-demo-parts-5c1a72c-hazards.png)

2. 这些危险物不使用我们的专用工具，因为它们不需要任何复杂的设置。只需将它们拖放到场景中并微调它们的位置即可。

3. 放置好危险物后，在层级视图中右键单击该 GameObject，然后选择"Unpack Prefab Completely"。这样可以确保对项目的任何更新都不会覆盖你已创建的危险物，并避免 Udon 与预制件的一些已知问题。
![build-from-demo-parts-9d80caf-unpack-prefab.png](/img/worlds/build-from-demo-parts-9d80caf-unpack-prefab.png)

4. 放置好危险物后，按下 Utility 窗口底部的"Refresh"按钮。这会向你的危险物注入一些引用，以便它们在用户碰到危险物时能够正确地重生用户。

:::danger 不，说真的——解包那个预制件！


:::
### 模块化危险物 {#modular-hazards}
我们内置的危险物是模块化的，因此你可以轻松修改它们的外观和难度。每个移动危险物都由一个设置为"Trigger"的碰撞体组成，并附加到一个带动画的游戏对象上。你可以使用我们提供的不同赛道部件，或混搭其他资源包，添加不同的网格并调整触发器位置，从而构建全新的危险物概念。
![build-from-demo-parts-26e93e5-uoc_hazard_pic1.png](/img/worlds/build-from-demo-parts-26e93e5-uoc_hazard_pic1.png)

内置的四种移动危险物为你提供了水平、垂直、旋转和摆动危险物的起点。你可以使用 Animator 窗口更改每种类型的速度。
![build-from-demo-parts-9b460a2-uoc_hazard_pic2.png](/img/worlds/build-from-demo-parts-9b460a2-uoc_hazard_pic2.png)

## 检查危险物 {#check-hazards}

该进行另一次**构建与测试**了！

## 设置玩家数量 {#set-number-of-players}
建议将障碍赛道世界中的**Number of Players**设置为世界中 **Player Capacity** 的两倍。只需在 Utility 窗口的此字段中更改数字，管理**Player Objects**的**Object Pool**就会自动填充该数量的玩家，并为所有这些玩家设置好他们所需的变量。
![build-from-demo-parts-574bf2e-number-of-players.png](/img/worlds/build-from-demo-parts-574bf2e-number-of-players.png)

## 构建与发布 {#build--publish}

当你准备好邀请朋友帮忙测试你的世界时，可以**构建并发布**它，使其在 VRChat 中可用。你需要设置世界名称、拍摄一张分享用的图片，当你准备好让更多人看到它时，还可以提交到 Community Labs！
:::note 发布与信任等级

你需要先在 VRChat 中花一些时间，才能发布世界。在此了解更多信息：[常见问题](https://docs.vrchat.com/docs/frequently-asked-questions#why-cant-i-upload-content-yet)
:::
如果你想探索更多自定义障碍赛道的选项，可以继续阅读[使用自定义部件构建](/worlds/examples/obstacle-course/build-from-custom-parts)
