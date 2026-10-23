---
title: "简易画笔系统"
slug: "simple-pen-system"
excerpt: "“简单”是个相对的说法。"
hidden: false
createdAt: "2021-05-14T00:44:52.076Z"
updatedAt: "2021-05-20T23:00:49.470Z"
---
Simple Pen系统由两个程序组成——一个用于画笔，另一个用于将要绘制的每条线

# 画笔与线条如何协同工作 {#how-the-pen-and-lines-work-together}

### Pen
画笔带有VRCPickup和VRCObjectSync组件，它们提供了基本的拾取和同步功能。程序本身使用Continuous同步，因为它与这些组件配合良好。

### Lines
每个线条对象都有自己的LineRenderer，以及一个使用Manual Sync的程序，因为它不需要像画笔那样频繁更新。线条有一个**points**变量，它是一个Vector3数组。这个变量是在实例中为所有人同步线条数据的主要方式。

## 开始绘制 {#drawing-starts}
当有人使用画笔时，会调用画笔上的**OnPickupUseDown**。这会导致程序中出现以下几件事：
* 从池中取出一个新的Line并保存到一个变量中
*持有画笔的玩家成为该线条的所有者
* *isDrawing*被设置为true
* 线条被重置为两个点，其位置位于画笔尖端
* 一个变量会递增，以记录下一条将使用哪条线。

## 绘制继续 {#drawing-continues}
每一帧，**Update**事件都会在画笔上被调用，并运行以下逻辑：
* 如果*isDrawing*为true，我们继续：
* 如果画笔移动的距离超过*minMoveDistance*，我们继续：
* 我们在*penTip*的位置向LineRenderer添加一个新点
* 我们通过将currentIndex与pointsPerUpdate比较，检查是否已排队足够多的点可以发送
* 如果准备好更新数据，我们会调用目标线条上UdonBehaviour的**OnUpdate**。

当线条上的**OnUpdate**方法被调用时，程序会获取线条中各点的当前位置，更新已同步的*points*变量，并调用**RequestSerialization**，这就是Manual同步的UdonBehaviour通知VRChat发送已排队数据的方式。这个方法只在线条的所有者上调用。其他所有人会收到数据，然后其**OnDeserialization**方法会被调用。当该方法在线条上触发时，线条程序会从*points*数组中读取位置，并用它们来更新自己线条中的位置。

## 绘制结束 {#drawing-finishes}
当用户松开Use按钮时，画笔上的**OnPickupUseUp**事件会被调用。该事件只是将*isDrawing*设为false，并调用目标线条UdonBehaviour上的**OnFinish**。这会再发送一次**OnUpdate**方法，以确保所有人的**points**数据都是最新的。
