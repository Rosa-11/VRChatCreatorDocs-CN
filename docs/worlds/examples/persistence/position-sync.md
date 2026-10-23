---
description: "使用PlayerObject保存并恢复玩家位置。"
sidebar_custom_props:
    customIcon: 📌
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# 位置同步 {#position-sync}

![位置同步世界预览](/img/worlds/examples/persistence/position-sync.png)

一个简单的PlayerObject预制件，它会保存每个玩家的位置和旋转，并在他们重新加入世界时将其恢复。

访问[PositionSync示例世界](https://vrchat.com/home/world/wrld_7be7b189-7ac8-4cf1-8d0a-1b7743edcacc)亲自试用！

## 使用示例 {#using-the-example}

在VRChat客户端中：
1. 加入世界，移动到远离出生点的位置。
2. 重新加入世界，你应处于大致相同的位置和旋转。

在Unity编辑器中：
将预制件`PositionSync`添加到场景中，就完成了。

<HowToImportExample/>

## 技术解析 {#technical-breakdown}

如果你站在地面上，脚本会每0.5秒保存一次你的位置和旋转。在从服务器接收到持久化数据后，它会把你送回你最初所在的位置。


### 检视面板参数 {#inspector-parameters}

* `string` **Synced Position key** - 你想从PlayerData中使用的位置的键名。
* `string` **Synced Rotation key** - 你想从PlayerData中使用的旋转的键名。

---
## 更新日志 {#changelog}

- 0.0.1：初始发布
- 0.0.2：添加了世界内说明，改用OnPlayerRestored。
