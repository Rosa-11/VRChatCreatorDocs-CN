---
title: MIDI播放
description: "播放同步的MIDI和音频文件。"
sidebar_custom_props:
    customIcon: 🎵
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';
import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<video controls>
  <source src="https://user-images.githubusercontent.com/737888/214626843-53a4c069-ea69-423a-926d-e2ce024c9819.mp4"/>
</video>

本示例播放一个[MIDI文件](https://midi.org/standard-midi-files)，并与由该MIDI制作的音频文件同步。你可以用它根据MIDI轨道同步世界中的事件，将音乐和视觉效果结合起来，打造沉浸式体验。

访问[MIDI播放示例世界](https://vrchat.com/home/world/wrld_57799f09-406a-4c8c-9c42-e593cae6305a)亲自体验吧！

## 使用示例 {#using-the-example}

在Unity编辑器中播放场景，或在VRChat中访问该世界，以观看并聆听MIDI播放。随着短循环播放，不同颜色的图像会随着音乐闪烁——这些是MIDI文件中四个不同通道上发生的MIDI Note事件的可视化效果。

<HowToImportExample/>

## 技术拆解 {#technical-breakdown}

[VRCMidiPlayer](/worlds/udon/midi/midi-playback/#component-vrcmidiplayer)类似于<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/AudioSource.html">AudioSource</UnityVersionedLink>，但它改用Midi资源，并向[MidiGrid UdonBehaviour](#midigrid)发送[Note On](/worlds/udon/midi#midinoteon)和[Note Off](/worlds/udon/midi#midinoteoff)事件。

### MidiGrid

该程序使用彩色方块将MIDI Note On和Off事件可视化。

每当VRCMidiPlayer发送Note On事件时，程序会检查其通道是否与某个网格匹配（参见下方的`channels`字段）。如果匹配，程序会通过计算音符编号除以12的[余数](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/expressions#12104-remainder-operator)来选择要启用的对应方块，以找到对应的图像。例如，音符编号11和12将触发网格中的第11和第12张图像，而编号13和14将触发图像0和1，通过循环回绕使音符编号适配网格。计算出目标图像后，就会启用它。

当VRCMidiPlayer发送Note Off事件时，程序会执行相同的计算以找到目标网格和图像，但会将其禁用使其不可见。

### 检视面板字段 {#inspector-fields}

| Name | Description |
|---|---|
| grids | 指向<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/RectTransform.html">RectTransform</UnityVersionedLink>的引用，这些对象上带有[GridLayoutGroup](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/script-GridLayoutGroup.html)，并有12个对应完整八度音符的子[Image](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/script-Image.html)。 |
| channels | 用于将MIDI通道重新映射到场景中四个图像网格的整数数组。默认值`[3, 4, 1, 2]`会在网格0上显示通道3的Note事件，在网格1上显示通道4的事件，依此类推。 |
| player | 指向向MidiGrid发送事件的VRCMidiPlayer的引用。 |

#### 替换数据 {#swapping-the-data}

如果你有MIDI和音频文件，可以导入它们并用你自己的资源替换现有资源，以查看它们在场景中的效果。

#### 更改通道 {#changing-the-channels}

MidiGrid程序有一个名为`channels`的变量。该数组将MIDI数据中的通道与屏幕上的网格匹配。默认顺序为“3 4 1 2”。这意味着第一个网格将显示通道3的数据，第二个网格将显示通道4的数据，依此类推。你可以在此处切换顺序，稍微改变视觉效果。

如果你加载自己的MIDI数据文件，可以检查Unity的Console以查看正在播放的通道和音符。每个Note On事件都会记录一条类似“3:75”的消息。这表示通道3播放了音符75。

#### 添加网格 {#adding-grids}

如果你想使用超过4个通道的歌曲，可以复制网格并将它们添加到程序的`grids`变量中。请确保也添加更多`channels`！

#### 完整程序解析 {#the-whole-program-explained}

以下是MidiGrid程序中发生情况的解析。

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

**Start事件：**

![Udon Graph中MIDI播放示例的Start事件](/img/worlds/midi/midi-sample-graph-start.png)

在Start时，它会遍历`grids`数组中的每个对象，找到其子对象上的“Image”组件，并将其`enabled`值设为`false`，从而在开始时隐藏所有Image。

它还会在加载后等待1秒，然后调用VRCMidiPlayer上的`Play()`以开始音乐和数据流。

**Note事件：**

![Udon Graph中MIDI播放示例的MIDI Note On事件](/img/worlds/midi/midi-sample-graph-on.png)


当它收到`Midi Note On`事件时，会遍历`channels`数组中的每个条目，并检查传入音符的通道是否与其中一个条目匹配。如果找到匹配项，该数字将用作`grids`数组的`index`，以找到匹配的网格。传入的音符会经过`int.Remainder()`计算，以找到它在八度中的索引——C为0，C#为1，依此类推。该索引用于找到网格的正确子对象，然后将“Image”上的`enabled`设为`true`。最后，音符的通道和音符编号会记录到Console。

![Udon Graph中MIDI播放示例的MIDI Note Off事件](/img/worlds/midi/midi-sample-graph-off.png)

当脚本收到`Midi Note Off`事件时，它会执行与上面类似的过程。为了再次隐藏“Image”组件，它会将`enabled`设为`false`。

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;  
using UnityEngine;  
using UnityEngine.UI;  
using VRC.SDK3.Midi;  
  
[UdonBehaviourSyncMode(BehaviourSyncMode.None)]  
public class LogoButton : UdonSharpBehaviour  
{  
    [SerializeField] private Transform[] grids;  
    [SerializeField] private VRCMidiPlayer player;  
    [SerializeField] private int[] channels;  
      
    private void Start()  
    {  
        // 禁用所有网格子对象的Image组件  
        foreach (var grid in grids)  
        {  
            for (var i = 0; i < grid.childCount; i++)  
            {  
                var child = grid.GetChild(i);  
                var image = child.GetComponent<Image>();  
                image.enabled = false;  
            }  
        }  
  
        SendCustomEventDelayedSeconds(nameof(_PlayAudio), 1);  
    }  
  
    public void _PlayAudio()  
    {  
        player.Play();  
    }  
  
    public override void MidiNoteOn(int channel, int number, int velocity)  
    {  
        UpdateGridState(channel, number, true);  
        Debug.Log($"{channel} : {number}");  
    }  
  
    public override void MidiNoteOff(int channel, int number, int velocity)  
    {  
        UpdateGridState(channel, number, false);  
    }  
  
    private void UpdateGridState(int midiEventChannel, int midiEventNoteNumber, bool isEnabled)  
    {  
        // 查找所有映射到该MIDI事件通道的网格。  
        for (var gridIndex = 0; gridIndex < grids.Length; gridIndex++)  
        {  
            var gridChannel = channels[gridIndex];  
            if (midiEventChannel != gridChannel) continue;  
              
            // 启用/禁用图像，按十二平均律量化。  
            var child = grids[gridIndex].GetChild(midiEventNoteNumber % 12);  
            var image = child.GetComponent<Image>();  
            image.enabled = isEnabled;  
        }  
    }  
}
```

</TabItem>
</Tabs>
