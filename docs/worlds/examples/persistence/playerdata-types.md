---
description: "演示PlayerData接口支持的数据类型。"
sidebar_custom_props:
    customIcon: 📃
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# 玩家数据类型 {#player-data-types}

![玩家数据类型世界预览](/img/worlds/examples/persistence/playerdata_types.jpg)

一个极简示例，演示PlayerData接口支持的数据类型。

访问[玩家数据类型示例世界](https://vrchat.com/home/world/wrld_f9a960d5-c282-431a-bfd0-f9bd6f1158d6)亲自试用！

支持的数据类型包括：

- bool
- byte
- byte[]
- int
- float
- double
- long
- short
- string
- sbyte
- uint
- ulong
- ushort
- Vector2
- Vector3
- Vector4
- Quaternion
- Color
- Color32

## 使用示例 {#using-the-example}

在客户端中：

1. 进入世界
2. 点击“Set Test Data”按钮
3. 观察显示内容随测试数据更新

在编辑器中：

1. 打开`VRChat SDK > ClientSim Player Data`编辑器窗口
2. 在播放模式下按下按钮时，这里也会看到测试数据更新
3. 你可以清除并重新设置测试数据
4. 你可以打开包含测试数据的JSON文件，手动更新它，然后在编辑器窗口中点击Refresh以显示更新后的测试数据

<HowToImportExample/>

## 技术解析 {#technical-breakdown}

`PlayerDataController`有一个`SetTestData`方法，它会设置一些示例玩家数据，该方法由场景中的按钮触发。

它使用`OnPlayerDataUpdated`方法监听玩家数据的更新。它会检查本地玩家的数据是否已更改，如果已更改，则获取新数据并将其格式化为可读的字符串。该字符串包含数据的类型（bool、int、string）以及与玩家唯一ID关联的值等详细信息。

随后，格式化后的数据会使用`TextMeshProUGUI component`显示在屏幕上。

该脚本包含一个辅助函数`PlayerDataToString`，它会检查存储在特定键下的数据类型，并将其转换为字符串以便显示。该函数支持所有可持久化的数据类型。

如果无法识别玩家数据类型，它会输出一条错误消息，指出该类型未知。
