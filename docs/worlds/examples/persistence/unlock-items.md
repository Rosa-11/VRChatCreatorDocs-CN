---
description: "使用PlayerData永久解锁物品。"
sidebar_custom_props:
    customIcon: 🔒
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# 解锁物品 {#unlock-items}

![解锁物品世界预览](/img/worlds/examples/persistence/unlock_items.jpg)

如何使用PlayerData持久化地解锁物品，并以简单的世界内成就作为演示。

访问[解锁物品示例世界](https://vrchat.com/home/world/wrld_abe04fe4-583e-44d3-ae89-29bc9f60d166)亲自试用！

:::note
本示例中的“Items”一词是泛指用法，并非指[此处所述的用户生成物品](/worlds/items)。
:::

## 使用示例 {#using-the-example}

1. 进入世界
2. 执行操作以解锁成就
   - 在世界中停留（10秒、2分钟、5分钟）
   - 四处移动（10单位、100单位、300单位）
   - 重生
   - 找到秘密
   - 以上全部
3. 观察显示你已解锁成就的UI
4. 离开并返回——你的成就和统计数据（在世界中停留的时间、移动的距离）应会保持

<HowToImportExample/>

## 技术解析 {#technical-breakdown}

主要的`UnlockItems`脚本会在本地玩家的数据首次加载时，于`OnPlayerRestored`方法中检查其成就，并恢复所有找到的已解锁物品。

随后它会触发`UpdateStats`方法运行，该方法会运行以下方法：

* CheckTimeInWorld();
* CheckDistanceMoved();
* CheckHasPlayerRespawned();
* CheckHasFoundSecret();
* CheckAllAchievementsUnlocked();

在所有方法运行完毕且成就更新后，该方法会在延迟`UPDATE_STATS_TIME`后再次调用自身运行。

对于在`UpdateStats`检查期间解锁的每个成就，都会调用`UnlockAchievement`方法，该方法会更新目标成就的精灵、颜色和文本。
