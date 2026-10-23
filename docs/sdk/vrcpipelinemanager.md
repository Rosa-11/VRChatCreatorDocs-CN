---
title: "VRCPipelineManager"
slug: "vrcpipelinemanager"
hidden: false
createdAt: "2017-11-22T18:54:45.512Z"
updatedAt: "2019-10-28T19:23:09.669Z"
---
用于存储世界或虚拟形象（Avatar）的ID。
:::note 自动添加

当此组件所依赖的组件被添加到对象时，此组件会自动添加。你不需要手动添加此组件。
:::

| 参数    | 描述                           |
|--------------|---------------------------------------|
| Blueprint ID | 虚拟形象或世界的唯一ID |

如果你想将世界或虚拟形象上传到不同的蓝图，可以点击`Detach (Optional)`按钮
:::danger 必需的蓝图格式

蓝图ID只能采用以下格式，其中0替换为[0-9] [a-f]：

`avtr_00000000-0000-0000-0000-000000000000`

`wrld_00000000-0000-0000-0000-000000000000`

任何其他ID格式都不会被接受。这通常是自动完成的，因此你永远不需要自己创建Blueprint ID——只需点击“Attach”，系统就会为你生成一个。
:::

![vrcpipelinemanager-7d57e76-Unity_2017-12-10_01-35-44.png](/img/sdk/vrcpipelinemanager-7d57e76-Unity_2017-12-10_01-35-44.png)

如果你有一个想要上传到的蓝图ID，可以使用`Attach (Optional)`按钮附加一个新的蓝图ID

![vrcpipelinemanager-db63e77-Unity_2017-12-10_01-37-47.png](/img/sdk/vrcpipelinemanager-db63e77-Unity_2017-12-10_01-37-47.png)

:::caution 提示

构建世界时，场景中不要有多个PipelineManager！否则你可能会上传到错误的蓝图ID。

:::
