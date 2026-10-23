---
title: "搜索节点"
slug: "searching-for-nodes"
hidden: false
createdAt: "2020-06-24T04:27:16.858Z"
updatedAt: "2022-10-18T23:45:45.454Z"
---
## 快速搜索 {#quick-search}

按**空格键**打开快速搜索，然后输入你想要交互的类的前几个字母。

![](/img/worlds/searching-for-nodes-b2c9ea7-gameobject-search.png)

## 完整搜索 {#full-search}

按 **Tab** 打开完整搜索，然后你可以搜索任何对象上的任何方法。对于 GameObject.GetName，你只需搜索“getname”，就能看到所有提供获取对象名称方式的对象。你也可以直接搜索“gameobject.getname”，然后会被直接引导到正确的节点。这种搜索方法比快速搜索慢，因此只应在你不确定在快速搜索中查找哪个类时使用。

![图像](/img/worlds/searching-for-nodes-0f8fb2b-fullsearch.png)
## 搜索栏 {#search-bar}

Udon 图表侧边栏顶部有一个搜索栏，允许你在图表中搜索。 
你可以使用“Ctrl+F”从图表窗口将其聚焦。
输入超过 3 个字符后，搜索将开始返回结果。
当有搜索结果时，按“Enter”将在结果之间跳转，顺序为“最佳匹配优先”。

![](/img/worlds/searching-for-nodes-4647159-search.png)

## 聚焦搜索 {#focused-search}

此模式默认关闭，因此首先你需要通过单击图表左上角的“Welcome”进入欢迎屏幕。然后勾选“Focus Search On Selected Node”旁边的复选框。这为你提供了一个跳到快速搜索第二部分的快捷方式——如果你有一个 GameObject.GetName 节点，你可以选中它并按**空格键**来打开对更多 **GameObject** 方法的搜索。

![在选中节点时按**空格键**搜索特定类](/img/worlds/searching-for-nodes-3ef349a-focused-search.png)
## 拖放面条时搜索 {#search-on-noodle-drop}

此模式同样默认关闭——你需要打开欢迎屏幕并勾选“Search on Noodle Drop”旁边的复选框。开启后，你可以从任意端口拖出一根面条，并将其放到空白处，以打开对**任何**可连接到该端口的节点的搜索。这支持正向和反向操作，还会搜索可连接的变量。

![图像](/img/worlds/searching-for-nodes-8656333-portsearch.gif)
