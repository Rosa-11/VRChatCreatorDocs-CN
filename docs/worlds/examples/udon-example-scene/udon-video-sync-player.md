---
title: "Udon视频同步播放器"
slug: "udon-video-sync-player"
excerpt: "同步视频的基础示例"
hidden: false
createdAt: "2021-05-14T00:58:34.059Z"
updatedAt: "2021-08-05T19:51:13.507Z"
---
![](/img/worlds/udon-video-sync-player-9000c94-udonsyncplayer-scene.png)

## 概览 {#overview}
要让大家一起观看视频，我们需要同步两件主要的事情——要观看的视频URL，以及播放时间，这样大家就能同时观看。为了理解我们如何为所有人（包括后加入的玩家）同步这两项内容，让我们走一遍使用该程序的场景。

**某人输入URL的流程是： **
成为UdonSyncPlayer对象的所有者▸发送新的**_url_**▸尝试加载并播放URL▸视频开始时，发出同步信息▸每隔**_syncFrequency_**秒发送新的同步信息

**其他所有人的流程是：**
接收新的**_url_**值▸尝试加载并播放URL▸接收同步信息▸跳转到同步的时间

## 某人加载URL {#someone-loads-a-url}
当我们的假想场景加载时，假设还没有视频在播放，房间里有两个人。某人将一个新URL粘贴到Input Field中，这会触发在UI中接好的**OnURLChanged**事件。
![当某人输入新URL时，会运行这段逻辑将新URL发送给其他所有人。](/img/worlds/udon-video-sync-player-c08ee3f-url-change.png)
这里有一些“IsValid”调用，我们只是用它们来确保不会对已被销毁或设置不当的对象调用方法。为了保持说明更简单，在本示例的其余部分我们将跳过对这些调用的描述。

本地玩家刚刚输入了新URL，所以我们将其设为该程序的所有者，以便他们能够控制其变量。我们从InputField获取URL，然后用这个新值对**_url_**符号调用**SetProgramVariable**。这与在启用“sendChange”的情况下调用**set url**效果相同，只是另一种做法，如果你想更改另一个UdonBehaviour上的变量，知道这一点会很方便。更新这个变量后，我们调用**RequestSerialization**，请Udon为世界中的其他所有人更新**_url_**的值。


## 用户获得新URL {#users-get-new-url}
![每当同步的**_url_**变量发生变化时，就尝试播放它！](/img/worlds/udon-video-sync-player-572ee25-playurl.png)
由于我们的图中为**_url_**设置了**Variable Change**事件，每当URL更新时都会触发该事件，它只是尝试播放该URL。


## 视频开始 {#the-video-starts}
![](/img/worlds/udon-video-sync-player-8eb0c7f-onvideostart.png)

当视频真正开始播放时，该事件会在本地触发。我们会为所有者和所有其他人调用同一个事件——不同的逻辑在**UpdateTimeAndOffset**中处理。

## 更新时间与偏移 {#update-time-and-offset}
![](/img/worlds/udon-video-sync-player-3735c0c-update-time-and-offset.png)

首先，这段逻辑会检查它是否在对象的所有者上运行。如果不是，它会改为运行**Resync**事件。如果是在所有者上，我们想同时同步我们在视频中的_哪个位置_以及我们_何时_在那里。由于这是逻辑第一次运行，我们应该处在视频的最开始，但通过保存这两个值，我们也可以将这套机制用于后续的同步更新。

我们想向其他所有人同步两个数字，而这两个数字密切相关，所以我们将它们合并为一个Vector2变量，以便把它们保持在一起并简化一些同步逻辑。我们构造一个Vector2，其中“x”是视频的当前时间，“y”是所有者在该视频时间时所观测到的Server Time。有了这些信息，其他所有人都可以将自己设置为匹配的时间——详见下面的[重新同步](/worlds/examples/udon-example-scene/udon-video-sync-player#resync)。

在**请求序列化**这个同步变量之后，所有者会调用**SendCustomEventDelayedSeconds**再次更新该值。他们使用变量**_syncFrequency_**来确定多久后更新该值。作为一种_非常_简单的做法，如果所有者从不暂停、回退或快进视频，这个变量可以保持为0，所有人可以从视频的开始时间进行同步，而无需时不时更新**_timeAndOffset_**。

## 重新同步 {#resync}
![](/img/worlds/udon-video-sync-player-b63cdfd-resync.png)

当非所有者开始播放视频或收到**_timeAndOffset_**变量的更新时，他们可以使用这些数据算出应该跳到视频中的哪个位置。

举个简单的例子，假设所有者在服务器时间**1000**时处于视频时间**0**。
  * 所有者将**_timeAndOffset_**设置为(0,1000)。
  * 你在45秒后加入并拿到这个值。你自己的服务器时间是**1045**，所以你通过计算服务器时间的差值（45秒）并加上视频时间（0秒），跳转到视频中的**00:45**。

## 改进与增强 {#improvements-and-augmentations}
![](/img/worlds/udon-video-sync-player-f43a120-udonsyncplayer-full-graph.png)

我们让这个示例保持得相当简单，以便它易于理解且便于升级。你可以做很多事情来改进它并分享你的改动！以下是一些想法：

* 让非所有者等到从所有者那里收到信息后再播放视频
* 检测流媒体URL与视频文件，并关闭同步
* 处理Video Error事件，并为用户提供有用的提示
* 只允许特定玩家更改视频
* 创建视频播放列表
* 创建视频排队系统
