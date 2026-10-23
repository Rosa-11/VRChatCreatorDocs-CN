---
description: "在 PlayerObject 中保存玩家的生命值。"
sidebar_custom_props:
    customIcon: 💗
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# 生命值条 {#health-bar}

![生命值条世界预览](/img/worlds/examples/persistence/health-bar.jpg)

一个简单的生命值条，使用 PlayerObject 来同步并持久化玩家的生命值。

访问[生命值条持久化示例世界](https://vrchat.com/home/world/wrld_012ab69b-74d8-439a-ae13-db42478d8680)亲自试试吧！

## 使用示例 {#using-the-example}

1. 打开 HealthBar_ExampleScene。
2. 在编辑器中运行它，或使用“构建与测试”。
3. 走到红色的“熔岩”上并站在其中。
4. 直接向上看即可看到你的生命值条，随着你继续站在熔岩中，它会不断缩短。
5. 走出熔岩，记下你的生命值条，然后重新加入世界。
6. 你的生命值会恢复到之前的水平。请注意，如果你的生命值条完全耗尽，你会重生，生命值会恢复到满值。

<HowToImportExample/>

## 技术解析 {#technical-breakdown}
熔岩保存了对本地玩家生命值条的引用。进入触发器后，它会通过生命值条的 `TakeDamage` 函数开始对玩家造成伤害（该函数只应在本地客户端调用）。

### 检视面板参数 {#inspector-parameters}

你可以通过更改预制件的参数来自定义它们：

#### HealthBar

* `float` **MaxHealth**——玩家的最大生命值。
* `Vector3` **Offset Above Head**——生命值条在玩家头顶上方的高度距离。
* `Slider` **Health Bar Slider**——显示玩家生命值的 UI 滑块。

#### Lava

* `float` **Damage per second**——熔岩每秒对接触它的玩家造成的伤害。

---
## 更新日志 {#changelog}
- 0.0.1 - 初始版本
- 0.0.2 - 添加了世界内 UI、缩略图、已发布的世界
