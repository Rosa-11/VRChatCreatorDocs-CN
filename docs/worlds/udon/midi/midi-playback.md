import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# MIDI播放 {#midi-playback}

你可以将MIDI数据与音轨一起播放，以控制Udon世界中的任何内容。你可以跳转到[示例场景](#example-midiplaybackscene)立即开始。

## 资源：MidiFile和AudioClip {#assets-midifile-and-audioclip}

扩展名为.mid的文件会作为MIDI资源处理。要开始使用你自己的MIDI和音频文件：
1. 将它们拖放到Assets文件夹中的某个位置。MIDI文件必须具有.mid扩展名，音频文件可以是Unity支持的任何<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AudioClip.html">类型</UnityVersionedLink>（.aif、.wav、.mp3、.ogg）。
2. 选择MIDI文件，并将其AudioClip设置为匹配的音频文件。

![图片](/img/worlds/midi-playback-214464414-32af9c18-c003-49ed-bd12-dd431367db56.png)

3. 正确设置MIDI文件的BPM至关重要。如果数据似乎与音频不匹配，这很可能就是问题所在。你可以在此处打开“Override Bpm”并输入正确的值来覆盖BPM。更好的做法是编辑MIDI文件并添加正确的BPM。


## 组件：VRCMidiPlayer {#component-vrcmidiplayer}

![VRCMidiPlayer](/img/worlds/midi-playback-215556799-a546e119-afdb-441f-8019-70ee50b6c008.png)

这是该功能的核心。它的工作方式类似于Audio Source，但使用的是Midi Asset。它会向所有目标UdonBehaviour发送MIDI [Note On](/worlds/udon/midi#midinoteon)和[Note Off](/worlds/udon/midi#midinoteoff)事件。

### 检视面板字段 {#inspector-fields}

Midi文件

| Name                | Description                                                                                                           |
|---------------------|-----------------------------------------------------------------------------------------------------------------------|
| Midi File           | 要触发其数据的SMF格式MIDI文件。                                                           |
| Audio Source        | 带有与你的MIDI数据对应的音频剪辑的AudioSource组件。                                        |
| Target Behaviours   | 一个UdonBehaviour数组，MIDI [Note On](/worlds/udon/midi#midinoteon)和[Note Off](/worlds/udon/midi#midinoteoff)事件会发送给它们。 |
| Display Debug Blocks| 启用后，在选中VRCMidiPlayer时，你可以在Unity编辑器的Scene视图中看到当前MIDI文件中所有音符的显示。有助于快速查看数据。 |

### 方法 {#methods}

### 方法 {#methods-1}

| Name   | Description                                                                 |
|--------|-----------------------------------------------------------------------------|
| Play() | 开始播放MIDI事件和Audio Source。                    |
| Stop() | 停止播放MIDI事件和Audio Source。                     |

### 属性 {#properties}

| Name       | Description                                                                 |
|------------|-----------------------------------------------------------------------------|
| `float` time | 设置并获取MIDI和音频源的当前时间。           |
| `MidiData` midiData | 获取一个MidiData对象，其中包含当前MIDI轨道的所有数据。可在播放前用于进行设置。 |

### 示例：MidiPlaybackScene {#example-midiplaybackscene}

<video controls>
  <source src="https://user-images.githubusercontent.com/737888/214626843-53a4c069-ea69-423a-926d-e2ce024c9819.mp4"/>
</video>

Example Central包含[一个简单的MIDI播放示例](/worlds/examples/midi-playback)。你可以从菜单栏的VRChat SDK > Samples > MidiPlayback下加载它。

## 类：MidiData {#class-mididata}

从VRCMidiPlayer请求MIDI数据时，你会得到这个。它包含所有轨道的数组以及BPM。

| Type         | Name         | Description                                             |
|--------------|--------------|---------------------------------------------------------|
| `MidiTrack[]`| Tracks       | 文件中的MidiTrack数组。                        |
| `byte`       | Bpm          | 表示轨道的BPM。                        |

## 类：MidiTrack {#class-miditrack}

此类只是封装了一个MidiBlock数组，并提供了一些方便的引用，用于轨道中发现的音符和力度范围。

| Type         | Name         | Description                                             |
|--------------|--------------|---------------------------------------------------------|
| `MidiBlock[]`| Blocks       | 轨道中的MidiBlock数组。                       |
| `byte`       | minNote      | 轨道中演奏的最低音符。                    |
| `byte`       | maxNote      | 轨道中演奏的最高音符。                   |
| `byte`       | minVelocity  | 轨道中演奏的最低力度（0除外）。    |
| `byte`       | maxVelocity  | 轨道中演奏的最高力度。               |

## 类：MidiBlock {#class-midiblock}

MidiBlock表示从On到Off的完整Midi Note事件，以及一些有用的元数据。

| Type   | Name        | Description                                              |
|--------|-------------|----------------------------------------------------------|
| `byte` | Note        | 演奏音符的0-127范围编号。                  |
| `byte` | Velocity    | 演奏音符力度的0-127范围编号。  |
| `byte` | Channel     | 演奏音符所在通道的1-16范围编号。 |
| `float`| StartTimeMs | Note On事件开始的起始时间，以毫秒为单位。 |
| `float`| EndTimeMs   | Note Off事件触发的结束时间，以毫秒为单位。 |
| `float`| StartTimeSec| Note On事件开始的起始时间，以秒为单位。 |
| `float`| EndTimeSec  | Note Off事件触发的结束时间，以秒为单位。 |
| `float`| LengthSec   | 从Note on到Note Off整个事件的长度，以秒为单位。 |
