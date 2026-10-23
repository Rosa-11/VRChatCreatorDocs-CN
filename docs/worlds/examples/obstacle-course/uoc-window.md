---
title: "障碍赛道工具包"
slug: "uoc-window"
hidden: false
createdAt: "2021-08-10T19:19:18.669Z"
updatedAt: "2021-08-18T20:56:44.155Z"
---
![障碍赛道工具包](/img/worlds/uoc-window-0a203a2-obstacle-course-toolkit.png)

我们创建了一个特殊窗口，帮助管理项目中的所有特殊预制件和程序。以下是你在每个区域可以做的事情：

## Checkpoint

### Checkpoint 预制件 {#checkpoint-prefabs}
![image](/img/worlds/uoc-window-a05aa7a-checkpoint-prefabs.png)
你可以在这里设置要用于起点门、Checkpoint 和终点门的所有预制件。之后它们可以很方便地放置到你的场景中：[添加 Checkpoint](/worlds/examples/obstacle-course/build-from-demo-parts#add-checkpoints)。

### 场景中的 Checkpoint {#checkpoints-in-scene}
![uoc-window-f588547-checkpoints-in-scene.png](/img/worlds/uoc-window-f588547-checkpoints-in-scene.png)

选择其中之一即可在 Scene 视图中缩放至所选 Checkpoint。你可以重新排序 Checkpoint（同时也会重命名它们）并删除它们。此处所做的更改会正确更新 CourseManager 上的变量。

## 玩家管理器 {#player-manager}

### 玩家对象预制件 {#player-object-prefab}
![uoc-window-b781ee6-playerobjectprefab.png](/img/worlds/uoc-window-b781ee6-playerobjectprefab.png)

如果你制作了自己的玩家对象（其中保存 PlayerData 程序并跟随每个本地玩家），可以在此更改该对象。大多数创作者不需要这样做。

### 玩家数量 {#number-of-players}
![uoc-window-0aa8cd9-number-of-players.png](/img/worlds/uoc-window-0aa8cd9-number-of-players.png)

更改此数字以生成正确数量的玩家对象，并自动填充 ObjectPool。

## 计分管理器 {#score-manager}

### 分数对象预制件 {#score-object-prefab}
![uoc-window-c808c71-score-object-prefab.png](/img/worlds/uoc-window-c808c71-score-object-prefab.png)

如果你制作了自己的 ScoreField（用于在玩家完成跑动时显示分数），可以在此更改该对象。

### 显示的分数数量 {#number-of-scores-to-show}
![uoc-window-778d7ed-number-of-scores.png](/img/worlds/uoc-window-778d7ed-number-of-scores.png)

更改此数字以生成正确数量的分数字段（Score Field），并填充 ScoreManager 对它们的引用。

## PowerUp

### PowerUp 预制件 {#power-up-prefabs}
![uoc-window-d656caf-power-up-prefabs.png](/img/worlds/uoc-window-d656caf-power-up-prefabs.png)

你可以在这里设置要用于 PowerUp 的所有预制件。之后它们可以很方便地放置到你的场景中（指向 PowerUp 放置的链接）并自动完成接线。

## 场景中的 PowerUp {#power-ups-in-scene}
![uoc-window-4bf4a4c-power-ups-in-scene.png](/img/worlds/uoc-window-4bf4a4c-power-ups-in-scene.png)

选择其中之一即可在 Scene 视图中缩放至所选 PowerUp。你可以更改它们对玩家速度和跳跃产生的效果，以及玩家碰到拾取物后这些效果持续的时间。

## 默认值 {#defaults}
![uoc-window-f1374e0-defaults.png](/img/worlds/uoc-window-f1374e0-defaults.png)

你可以在这里设置移动和跳跃速度，而不是在 VRCWorld 对象上设置。行走、奔跑和侧移默认都设为相同速度，当玩家碰到 PowerUp 时它们会一起被修改。
