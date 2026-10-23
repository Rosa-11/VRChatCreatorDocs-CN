---
description: "在简单的放置游戏中保存点数与升级。"
sidebar_custom_props:
    customIcon: 👆
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# 持久化放置游戏 {#persistent-idle-game}

![持久化放置游戏世界预览](/img/worlds/examples/persistence/persistent-idle-game.png)

此场景实现了一个简单的[放置游戏](https://en.wikipedia.org/wiki/Incremental_game)，它使用 PlayerData 为每个玩家保存点数和自动点击器数量。

访问[持久化放置游戏示例世界](https://vrchat.com/home/world/wrld_42ba5f54-7fab-4f3a-8fc3-8d2f2ccbb33e)亲自试试吧！

## 使用示例 {#using-the-example}
加载场景并根据你的喜好调整“IdleGame”对象上的 Udon 值。
播放场景，点击按钮收集奶酪，购买自动点击器，退出播放模式，然后观察这些值已保存在 ClientSim PlayerData 窗口中各自对应的键下。

<HowToImportExample/>

## 技术解析 {#technical-breakdown}
主脚本是 `IdleGame.cs`。它负责游戏玩法、保存和加载。
另一个脚本 `IdleGameButton.cs` 会把玩家的按钮点击传递给主脚本。

每当玩家点击按钮，就会获得一点。脚本使用 `POINTS_KEY` 字符串值将点数保存在 PlayerData 中。

同样，当玩家购买自动点击器时，会获得一个自动点击器并失去点数。脚本使用 `AUTOCLICKERS_KEY` 字符串值保存自动点击器的数量。

脚本会为每个自动点击器每秒给玩家一点。每购买一个自动点击器，自动点击器的价格就会乘以一个固定数值。

重新加载场景时，会使用 `POINTS_KEY` 和 `AUTOCLICKERS_KEY` 加载点数和自动点击器数值，并计算自动点击器价格。

---
## 更新日志 {#changelog}
- 0.0.2：脚本调整：代码使用 OnPlayerRestored 来加载玩家数据
