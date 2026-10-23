# 实时MIDI {#realtime-midi}

你可以使用MIDI设备和控制器变化，实时控制你的Udon世界。

## 组件 {#components}

要在场景中开始使用MIDI，请向你的某个GameObject添加**VRC Midi Listener**组件。

![VRCMidiListener](/img/worlds/realtime-midi-215557542-bf65a6ef-47d0-4e2f-8d39-337847db461c.png)

此组件通知VRChat你想要接收MIDI事件，并在需要时启动MIDI系统。**你需要通过按下“Active Events”开关来选择要接收的事件**——默认情况下不会选择任何事件，因此在开始测试之前请将它们打开。**你还需要通过将其选为VRC Midi Listener上的“Behaviour”来选择一个将接收这些事件的UdonBehaviour**。这个UdonBehaviour可以位于与MIDI Listener相同的GameObject上，也可以位于任何其他对象上。

启动场景时，你可能会注意到自动添加了一个**VRCMidiHandler** GameObject。它负责处理MIDI设备驱动程序，并向所有Listener发送事件。请勿自行在任何地方添加此组件——它旨在被自动添加和移除，以便MIDI设备只连接一次，并在有人离开你的世界时断开连接。

## 设备选择 - 编辑器 {#device-selection---editor}

你可以通过VRChat SDK选择设备，在Unity编辑器中测试MIDI事件。该设置会保存在编辑器偏好设置中，因此Unity会为每个项目记住你的设备。

![MIDI实用工具窗口](/img/worlds/realtime-midi-215557576-5414eb63-a857-4334-8a8c-05f3b6436773.png)

![MIDI实用工具选择器](/img/worlds/realtime-midi-215557616-8cc3fd99-0fe4-4564-9413-cc805708cf89.png)

## 设备选择 - 运行时 {#device-selection---runtime}

当你访问带有MIDI事件的世界时，VRChat会尝试打开你的机器上能找到的第一个MIDI设备。如果你有多个设备并想指定使用哪一个，可以将其名称的一部分作为命令行参数传入。例如，如果你的设备在Windows中显示为“SchneebleCo MidiKeySmasher 89”，可以将以下内容添加到启动选项/脚本中：
``--midi=midikeysmasher`
VRChat会匹配部分名称并忽略大小写。了解所有其他启动选项：[启动选项](https://docs.vrchat.com/docs/launch-options)

## 示例场景 {#example-scene}

访问[Udon Midi Test](https://vrchat.com/home/world/wrld_f8bc6485-dcdf-4646-89d8-14e4772561ee)示例世界，它会读取并显示全部三种消息类型。
