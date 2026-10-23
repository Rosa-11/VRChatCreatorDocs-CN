---
excerpt: 设置玩家的默认移动速度。
---
# Player Mod Setter

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

这个UdonBehaviour示例脚本让你可以配置世界中玩家的移动。

## 变量 {#variables}

| 名称                  | 类型  | 默认值 | 说明                                                                                                                                                                                     |
| --------------------- | ----- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jump Height           | float | 3       | 玩家的跳跃强度。受重力影响。                                                                                                                                              |
| Run Speed             | float | 4       | - 键盘输入：在不按住“Shift”键的情况下向前或向后移动时的移动速度。<br />- 摇杆输入：将摇杆向前或向后倾斜时的移动速度。 |
| Walk Speed            | float | 2       | - 键盘输入：在不按住“Shift”键的情况下向前或向后移动时的移动速度。<br />- 摇杆输入：始终使用“Run Speed”而不是“Walk Speed”。               |
| Strafe Speed          | float | 2       | 向左或向右移动时的移动速度。                                                                                                                                                   |
| Gravity               | float | 1       | [重力](https://docs.unity3d.com/ScriptReference/Physics-gravity.html)对玩家影响的程度。                                                                                       |
| Use Legacy Locomotion | bool  | false   | 启用VRChat已弃用的旧版移动系统。之后无法由Udon禁用。                                                                                                         |

## 示例 {#example}

UdonSharp程序名为`PlayerModSetter.cs`，Udon Graph程序名为`VRCWorldSettings.asset`。它们的工作方式非常相似，任何一个都可以用在你的VRChat世界中。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

这个Graph程序可以在`Packages/com.vrchat.worlds/Samples/UdonExampleScene/UdonProgramSources/VRCWorldSettings.asset/`中找到。

![一个Udon Graph程序，在玩家加入世界时为其设置各种属性。它包含若干文本注释，解释基本的Graph语法。](/img/worlds/udon/examples/vrcworldsettings.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

这是UdonSharp脚本`\Assets\UdonSharp\UtilityScripts\PlayerModSetter.cs`的一个简化示例。

```cs showlinenumbers
using UnityEngine;
using VRC.SDKBase;

public class PlayerModSettings : UdonSharpBehaviour
{
    VRCPlayerApi playerApi;

    [Header("Player Settings")]
    [SerializeField] float jumpImpulse = 3;
    [SerializeField] float walkSpeed = 2;
    [SerializeField] float runSpeed = 4;
    [SerializeField] float gravityStrength = 1;

    void Start()
    {
        playerApi = Networking.LocalPlayer;
        playerApi.SetJumpImpulse(jumpImpulse);
        playerApi.SetWalkSpeed(walkSpeed);
        playerApi.SetRunSpeed(runSpeed);
        playerApi.SetGravityStrength(gravityStrengh);
    }
}
```

</TabItem>
</Tabs>
