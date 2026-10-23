---
description: "使用 PlayerData 保存并显示最高分。"
sidebar_custom_props:
    customIcon: 🏅
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# 排行榜 {#leaderboard}

![排行榜世界预览](/img/worlds/examples/persistence/leaderboard.jpg)

一个使用 PlayerData 持久化并显示最高分的排行榜。

访问[持久化排行榜示例世界](https://vrchat.com/home/world/wrld_107de08b-0dfa-4ed1-a3d4-398c29616b4c)亲自试试吧！

## 使用示例 {#using-the-example}

1. 打开 Leaderboard 场景。
2. 然后进入播放模式
3. 你的名字会出现在排行榜上，分数为 0 分。
4. 跳跃，你的分数会增加。
5. 退出并重新进入播放模式。
6. 你会再次出现在排行榜上，并且分数会保留自上一次会话。

<HowToImportExample/>

## 技术解析 {#technical-breakdown}
有一个 `Leaderboard` 脚本，你可以在其中添加任何希望玩家以此为排序依据的键。支持 Float 和 Int。

此外还有一个 `LeaderboardSlot` 脚本，它是一个 RectTransform。这是一个 PlayerObject，这意味着每个加入的玩家都会创建一个。对象创建后会自动添加到由 Leaderboard 定义的 Scroll View 中。

Scroll View 的内容 Transform 带有 Vertical Layout Group，它会使其所有子对象按照在层级视图中的顺序自动排序。每当 `LeaderboardSlot` 的持久化分数发生变化时，Leaderboard 脚本都会更新它在层级视图中的位置。

---
## 更新日志 {#changelog}
- 0.0.2：脚本调整：在玩家对象上使用 VRCEnablePersistence 组件
