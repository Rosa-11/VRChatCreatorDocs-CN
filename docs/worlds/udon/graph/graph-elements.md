---
title: "图表元素"
slug: "graph-elements"
hidden: false
createdAt: "2020-06-24T22:08:14.066Z"
updatedAt: "2022-10-18T23:46:16.884Z"
---
## 概述 {#overview}
当你在图表中构建程序时，主要使用节点。此外还有几种其他项目可用，这里将进行介绍。

## 群组 {#groups}
群组有助于组织和描述你的图表。它们不会*改变*图表的运作或编译方式。
![你可以选择元素并右键单击以使用*创建群组*功能。](/img/worlds/graph-elements-e9a0713-create-group.gif)
要创建群组，你可以：
* 在图表中右键单击并选择“Create Group”，然后将元素拖放到群组中。
* 使用框选或按住 Ctrl 单击来选择元素，然后在图表上右键单击并选择“Create Group”，或按“Ctrl+G”快速分组。

要从群组中移除项目，你可以：
* 选择项目，按住 Shift，然后将项目拖出群组。
* 选择项目，右键单击并选择“Remove From Group”。

要在图表中跳转到群组，请在图表侧边栏中单击它。
:::note 嵌套群组

目前不支持嵌套群组。当前的分组行为是：如果你尝试选择一个现有群组并用新群组将其包围，则会删除现有群组。
:::
## 注释 {#comments}

注释是简单的文本块，你可以将它们放在需要更多信息的项目附近。
![节点旁的注释。](/img/worlds/graph-elements-80881a1-simple-comment.png)
你可以通过右键单击图表并选择*Create Comment*来创建注释。注释也可以添加到群组中。你可以将注释和群组结合使用，以获得极佳的可读性！
![VRChat Examples 文件夹中包含的“SendEventOnTimer”图表使用群组和注释来解释图表中发生的情况。](/img/worlds/graph-elements-ab506db-comments-and-groups.png)
## 面条 {#noodles}
图表中的面条是连接一切的元素，也是 Udon 得名的原因！它们通过端口将节点连接在一起。它们会根据所连接端口的颜色着色，因此如果你连接两个类型不同的端口，就会看到颜色在中途发生变化。在 Unity 文档和其他地方，它们被称为“edges”——所以如果你看到对 edges 的引用，那就是在说我们美味的面条。
