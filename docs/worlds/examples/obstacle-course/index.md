---
title: "障碍赛道"
hidden: false
createdAt: "2021-08-10T18:17:12.204Z"
updatedAt: "2021-09-21T22:51:28.690Z"
sidebar_custom_props:
    customIcon: 🏃‍➡️
---
# 概述 {#overview}
<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Fid3VqPUy_rY%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Did3VqPUy_rY&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fid3VqPUy_rY%2Fhqdefault.jpg&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=youtube" width="854" height="480" scrolling="no" title="YouTube 嵌入视频" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>

这个项目是为我们的第二届 World Jam 制作的，可作为计时赛（Time Trial）游戏世界的有趣入门套件！

在此访问示例世界：[VRChat 障碍赛道 Jam 世界](https://vrchat.com/home/world/wrld_39c422c4-ab87-4cc1-a4d1-390af2e45c74)。
在此下载可直接使用的项目：[VRChat 障碍赛道项目](https://github.com/vrchat/VRChat-Obstacle-Jam/releases/download/1.0.3/obstacle-jam-public_v1.0.3.zip)。
对于进阶用户，你可以[复刻（fork）GitHub 项目](https://github.com/vrchat/VRChat-Obstacle-Jam)，以便轻松跟进任何更新或修复。

它被设计成让几乎没有 Udon 经验的创作者也能使用，你可以直接用现有模型拼装出新赛道，也可以创建或导入自己的模型。

要探索该场景，只需下载最新版本，然后对"Assets/_WorldJam2/Scenes/DemoScene"场景执行构建与测试。

# 快速开始 {#quick-start}
以下是一些你可以轻松修改的入门内容：

## 移动与跳跃 {#move--jump}
从菜单栏中找到"▶ Obstacle Course Toolkit"项，并选择其下拉菜单中的"Open Window"来打开 Toolkit 窗口。打开"Power Ups"部分，你就可以更改世界的默认移动和跳跃能力。
![index-40a0a08-utility-change-defaults.png](/img/worlds/index-40a0a08-utility-change-defaults.png)

## 玩家数量 {#number-of-players}
如果你想增加能够跑完整条赛道的玩家数量，只需打开 Utility 窗口的"Player Manager"部分并在此处增大数字即可。在发布世界时，请确保将你的世界可容纳的玩家数量设置为此数字的一半！
![index-985e270-number-of-players.png](/img/worlds/index-985e270-number-of-players.png)

## 强化道具属性 {#powerup-properties}
回到 Utility 窗口的"Power Ups"部分，打开"PowerUps in Scene"部分。点击某个强化道具的名称，Scene 视图就会聚焦到它上面，方便你查看它是哪一个。然后你可以更改 _speed_、_jump_ 和/或 _duration_ 字段，以更新该强化道具上的变量。
![index-f5481d9-powerups-in-scene.png](/img/worlds/index-f5481d9-powerups-in-scene.png)
