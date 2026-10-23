---
title: "获取玩家"
slug: "getting-players"
hidden: false
createdAt: "2021-01-22T01:48:13.564Z"
updatedAt: "2021-11-12T01:23:15.713Z"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

这些节点可用于获取单个玩家、一组玩家或所有玩家。

### [Networking.get LocalPlayer](/worlds/udon/networking/network-components)
*VRCPlayerApi*

:::note

请注意，此函数是 Networking 类的成员，但此处也将其列出。

:::
本地玩家是此 Udon 脚本当前运行所在的玩家——换句话说，本地玩家就是*你*。了解你自己非常重要！

### GetPlayerCount
*int*

获取调用时所处实例中玩家的实际数量。

### GetPlayers
*VRCPlayerApi[]*

这就是获取你世界中所有玩家的方式，这样你就可以在 For 循环中遍历他们，应用设置、做出更改、查找特定名称等。

最简单的方式是使用不接受任何参数的版本。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![调用 GetPlayers 能正常工作的最低要求。更好的做法是将 VRCPlayerApi[] 构造为变量，以便重复使用。](/img/worlds/graphgetplayers_alloc.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs  
VRCPlayerApi[] players = VRCPlayerApi.GetPlayers();
for (int i = 0; i < players.Length; i++)
{
    VRCPlayerApi player = players[i];
    // 对该玩家执行某些操作……
}
```

</TabItem>
</Tabs>

上述方式可行，但每次使用时都会分配内存，这意味着它每次都会重新构建 VRCPlayerApi 数组。

如果你频繁使用此方法（例如每帧都使用），则应该改用不分配内存的版本，即传入一个存储为变量的 VRCPlayerApi 数组，以便每次重复使用。使用这种方式时需要记住一点：如果你世界中的玩家数量超过了该数组的容量，超出的玩家将被遗漏。为了支持动态的玩家数量，你可以使用下面演示的技巧，即先创建一个具有某个预设大小的数组，当世界中的玩家数量超过数组大小时再按需扩容。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![定期使用 GetPlayers 时更高效的模式。这种方式将 VRCPlayerApi[] 构造为可重复使用的变量，仅当世界中的玩家数量超出其容量时才构造新的数组。](/img/worlds/graphgetplayers_nonAlloc.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
private VRCPlayerApi[] playersArray;

private void Start()
{
    playersArray = new VRCPlayerApi[10]; // 初始容量为 10 位玩家。
}

private void Update()
{
    int playerCount = VRCPlayerApi.GetPlayerCount();
    while (playerCount > playersArray.Length)
    {
        // 不断将容量翻倍，直到数组足够大，可以容纳我们所有的玩家。 
        playersArray = new VRCPlayerApi[playersArray.Length * 2];
    }

    VRCPlayerApi.GetPlayers(playersArray);
    for (int i = 0; i < playerCount; i++)
    {
        VRCPlayerApi player = playersArray[i];
        // 对该玩家执行某些操作……
    }
}
```

</TabItem>
</Tabs>


### GetPlayerById
*int*

如果存在，则获取给定玩家 ID 对应的 VRCPlayerApi 对象。

### get playerId
*int*

获取已缓存的 PlayerId，如果尚未缓存则调用 GetPlayerId。

### GetPlayerId
*int*

从源获取该玩家的网络 ID。

## 玩家标签系统 {#player-tag-system}
此系统是一种快捷的临时方案，用于给玩家分配字符串，而无需创建你自己的变量和集合。

### SetPlayerTag / GetPlayerTag
设置：*string, string*

获取：*string*

设置一个字符串变量，以便你之后查询。例如，你可以将烹饪游戏中某位玩家的「角色」设置为「厨师」或「顾客」。然后你可以对「角色」调用 GetPlayerTag，取回「厨师」或「顾客」。

### ClearPlayerTags
*VRCPlayerApi*

移除你在某位玩家身上设置的所有标签。

### GetPlayersWithTag

:::caution

目前无法使用。它返回一个 List，而 List 在 Udon 中不可用。

你将能够传入一个 VRCPlayerApi 对象数组和一个标签，该方法会将设置了该标签的玩家填入该数组。

:::
