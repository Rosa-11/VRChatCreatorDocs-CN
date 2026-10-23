---
description: "保存类RPG的玩家职业与等级。"
sidebar_custom_props:
    customIcon: ⚔️
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# 简单RPG {#simple-rpg}

![RPG世界预览](/img/worlds/examples/persistence/simple-rpg.jpg)

此场景包含一个简单RPG体验的示例，在其中你可以升级、更换职业并击败敌人。

## 使用示例 {#using-the-example}

打开该场景，或使用`persistence-beta`分支[在VRChat中访问示例世界](https://vrchat.com/home/world/wrld_32b82323-1d05-4ed4-9ac1-89b437223359)。

1. 在Assets/Examples/RPG文件夹中打开场景RPGExample。
2. 播放该场景。
3. 走到对应台座上方来选择职业。
4. 通过击杀敌人获得足够经验后，你就会升级。你可以通过头顶的钻石数量判断自己的等级。
5. 重新加入世界。
6. 当你加载进入世界时，你应会被传送到之前的位置，并拥有上次选择的职业以及相同的等级和经验。

<HowToImportExample/>

## 技术解析 {#technical-breakdown}

RPGPlayer是一个附加在GameObject上的脚本，该GameObject上还带有PlayerObject脚本，这意味着RPGPlayer脚本会为每个玩家实例化一次。
RPGPlayer负责控制，使你能看到玩家头顶表示其职业和等级的钻石，同时它也是让你能看到其他人武器的原因。

此外还有3个不同的台座，你可以走到其上方，当它们被触发时，会通知你自己的RPGPlayer实例更改其职业。

职业、上次位置、经验和等级全部通过UdonSynced并位于VRCPlayerObject上来实现持久化。任何位于属于PlayerObject的GameObject上的脚本中的UdonSynced变量都会自动持久化。

战斗通过粒子碰撞完成，因此每个职业都有不同类型的粒子效果作为攻击，该效果带有一个碰撞体。
敌人被击杀时提供1 exp，而升级需要4 exp。
敌人被击杀后会在10–15秒后重生。

---
## 更新日志 {#changelog}
- 0.0.3：添加了说明画布
- 0.0.2：脚本调整：RPG示例在玩家对象上使用`VRCEnablePersistence`组件，使它们重新具有持久性
