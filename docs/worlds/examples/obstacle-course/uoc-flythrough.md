---
title: "障碍赛道：飞行游览"
slug: "uoc-flythrough"
hidden: false
createdAt: "2021-08-12T22:56:42.710Z"
updatedAt: "2021-08-18T20:58:14.295Z"
---
我们内置了一套 Cinemachine 系统，可以轻松为你的赛道生成一段飞行游览（fly-through）视频！

# 基本设置 {#basic-setup}
* 将**Assets/_WorldJam2/_SubSystems/Flythrough**中的 **Flythrough** 预制件拖放到你的场景中。
* 在 Obstacle Utility 窗口中按"Refresh"。这会根据你场景中的所有检查点生成一条路径！
* 在层级视图中选中 **FlythroughPrefab/RecordCamPath** 对象，即可查看生成的路径。
![uoc-flythrough-2114971-flythrough-path.png](/img/worlds/uoc-flythrough-2114971-flythrough-path.png)

* 在 Game 视图中按"Play"即可查看你的飞行游览！了解大致效果后，退出播放模式。

# 修改路径 {#modifying-the-path}

默认情况下，路径会在每个检查点原点上方 0.5 个单位处生成。如果这对你的特定场景来说太高或太低，你可以修改 VRC Obstacle 窗口 **Recording** 部分中的"Record Path Y Offset"，从而同时更改每个检查点的高度。你可以在标签上左右单击并拖动，轻松调整到合适的位置。

如果你想添加/移除/重新调整路径中的路点，请关闭 Recording 部分中的"Auto Update Checkpoints"，然后在层级视图中选中 **RecordCamPath**。在这里，你可以直接更改数字，或点击检视面板左侧的路点编号来在 Scene 视图中选中该路点，并使用标准变换工具移动它。

你可以通过选中层级视图中的 *RecordCamTarget* 对象并更改 **Cinemachine Dolly Cart* 组件上的 _Speed_ 参数，来改变飞行游览的速度。默认设置使用 Normalized Position Units，速度为 .03，可在约 30 秒内跑完整条赛道。
![uoc-flythrough-5f34a79-waypoints.png](/img/worlds/uoc-flythrough-5f34a79-waypoints.png)

# 录制输出 {#recording-the-output}
你可以使用屏幕录制软件直接录制编辑器中的 Game 视图，或使用 Unity Recorder 包生成更高质量的输出。你可以从 Package Manager 中添加它。它已经过测试，可与这套设置配合使用。如果你需要关于使用 Recorder 的完整说明，可以在这里找到官方的 Unity 手册：[Unity Recorder 1.0 用户手册](https://unitytech.github.io/unity-recorder/manual/index.html)，教程在这里：[使用 Unity Recorder](https://learn.unity.com/tutorial/working-with-unity-recorder)。

# 清理 {#cleaning-up}
发布前请务必从场景中移除录制器！如果你自定义了路径，可以复制一份带有新路径的该预制件，以便日后再次使用。

# 额外加分项 {#extra-credit}
你可以将此飞行游览相机与场景中现有的 Cinemachine 系统（它负责渲染小地图和游戏内大屏幕）集成，或者创建一个单独的系统来进行高质量的游戏内录制！
