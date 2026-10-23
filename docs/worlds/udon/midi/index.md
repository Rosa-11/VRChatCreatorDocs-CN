# Udon中的MIDI {#midi-in-udon}

自20世纪80年代以来，MIDI以富有想象力的方式连接了乐器。我们已将其引入VRChat，让你可以构建能响应实时乐器和预录演奏的世界。

>在[维基百科上阅读有关MIDI的更多信息](https://en.wikipedia.org/wiki/MIDI)。

![图片](/img/worlds/index-215557268-2d85f551-8fff-4990-a95a-c8a2d412d6a2.png)

在Udon世界中有两种使用MIDI的方式：
- ## [实时](realtime-midi)数据，来自插入电脑的乐器。
- ## [播放](midi-playback)MIDI数据以及音频文件。

无论采用哪种方式，你都将使用Udon的MIDI事件，详情见下文。

## MIDI事件 {#midi-events}

### MidiNoteOn
当收到“Note On”消息时触发。可以由MIDI播放触发，也可以由按下设备上的按键/按钮触发。
输出：
* `int channel` 接收该事件的MIDI通道，0-15。
* `int number` 音符编号，0-127（你的MIDI设备可能不会输出完整范围）
* `int velocity` 0-127之间的数字，表示音符触发的速度（如果你的MIDI设备支持）。

### MidiNoteOff
当收到“Note Off”消息时触发，通常是通过释放设备上的按键/按钮。
输出：
* `int channel` 接收该事件的MIDI通道，0-15。
* `int number` 音符编号，0-127（你的MIDI设备可能不会输出完整范围）
* `int velocity` 对于Note Off事件，此值通常为0，但可能因设备而异。

### MidiControlChange
当收到控制变更时触发。这些通常由MIDI设备上的旋钮和滑块发送。
输出：
* `int channel` 接收该事件的MIDI通道，0-15。
* `int number` 控制编号，0-127。
* `int value` 0-127之间的数字，表示控制器发送的值。对于某些可以无限旋转而不是受物理起始/结束位置限制的旋钮，此值可能只是0和1，或其他范围，表示“正向”和“负向”增量，你必须自行管理。
