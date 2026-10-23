# 虚拟形象（Avatar）优化技巧 {#avatar-optimization-tips}

:::caution

**本指南并非Avatar优化的终极宝典！** 要正确优化Avatar，需要相当广泛地了解大量知识。我们并不期望每个人都无所不知。

不过，我们会尽力让本文档持续更新，收录人们最常遗漏的事项以及最重要的优化目标。

如果你对优化技巧有建议，请使用右上角的 **Suggest Edits** 按钮自行添加！
:::
你希望自己的Avatar高效，并因为节省了大量帧而受到所有人喜爱吗？遵循这些技巧，你应该就没问题了！

本文档中的任何推荐数值或限制都可能随时更改。尽管下面提供的一些描述在技术上并不精确，但本文档旨在帮助新手用户学习如何优化他们的Avatar。

社区创建的Blender插件（如[Cats](https://catsblenderplugin.xyz/)或[Tuxedo](https://github.com/feilen/tuxedo-blender-plugin)）让用户可以非常轻松地优化模型，并协助解决常见的VRChat Avatar问题。我们强烈推荐使用这类工具！它能让你的工作更轻松，并改善所有人的性能。

另外，SDK的Build Control面板会提供Avatar上各类组件的数量，以帮助优化。

## 为Android/Quest优化你的内容 {#optimize-your-content-for-androidquest}

为Android开发内容时，请牢记[内容限制](/platforms/android/quest-content-limitations)！例如，Avatar无法使用所有着色器和Avatar组件。

此外，你还应[为Android优化你的内容](/platforms/android/quest-content-optimization)。这可以改善Avatar的[性能等级](/avatars/avatar-performance-ranking-system)，并让更多玩家看到你的Avatar。

## 不要使用Dynamic Bones！ {#do-not-use-dynamic-bones}
Dynamic Bones是一款可购买的Unity资源，可让你在Avatar的骨骼绑定上定义骨骼，使其像悬挂物一样移动。你还可以定义重力等静态力，让头发下落得更逼真。

Dynamic Bones已弃用，最终将被移除。请改用[PhysBones](/common-components/physbones)。

VRChat会在运行时自动将Dynamic Bones转换为PhysBones。

## 不要使用Unity Constraints！ {#do-not-use-unity-constraints}
[Unity Constraints](https://docs.unity3d.com/Manual/Constraints.html)是引擎提供的组件，允许你根据一个或多个其他Transform更改Avatar上Transform的位置、旋转和缩放。

引擎的约束会在每一帧根据它们之间的依赖关系进行排序，这意味着当同时存在足够多的约束时，它们可能导致严重的性能问题。请改用[VRChat Constraints](/common-components/constraints)，因为它们专为在VRChat Avatar环境中提供更好的性能而设计。

VRChat会在运行时自动将Unity约束转换为VRChat约束。

## 限制Cloth的使用 {#limit-usage-of-cloth}
Cloth是Unity的默认组件，开销与Dynamic Bones类似，且更难设置。请严格限制Cloth的使用，不要将其应用于顶点数超过约200个的网格。

## 减少Avatar上的网格数量 {#reduce-the-amount-of-meshes-on-your-avatar}
Avatar上可能有两种类型的Mesh Renderer——Static Mesh Renderer和Skinned Mesh Renderer。Static Mesh不会变形。而Skinned Mesh通常有骨骼绑定（骨骼），用于告诉引擎如何根据骨骼的位置移动和使网格变形。这些Skinned Mesh的开销显著更高，因此你的Avatar上应当只保留一个Skinned Mesh Renderer。几乎没有理由保留多个——大多数情况下，额外物品可以合并到原始模型中。

除此之外，Avatar上的每个额外网格都会产生一次或多次额外的“绘制调用”——本质上，就是处理器告诉显卡在屏幕上绘制某物所花费的时间。

因此，**VRChat建议你最多拥有一个Skinned Mesh Renderer，以及最多3个静态网格渲染器。** 在Blender中合并网格非常简单，下面的“Meshes”视频中展示了这一操作。

最后，确保你没有使用过多的三角形。如果你尝试上传的模型超过PC的70,000个三角形或Quest的20,000个三角形，SDK会向你发出警告。即使为了细节需要这么多多边形，也非常罕见——可以考虑烘焙法线贴图，并通过减面或重拓扑来简化网格。

由于限制更少，为Quest创建Avatar可能更具挑战性。最有效的优化往往发生在初始设计和Avatar创建阶段。换句话说，如果你试图将一个为渲染而制作的120,000多边形模型硬塞进20,000个多边形，就会遇到问题。不要让事情变得比必要的更困难——找一个从一开始面数就很低的模型！20k已经留有很大的余地。

需要注意的是，如果你使用Cats Blender Plugin，当你在“Fix Model”时，它会自动合并网格。**如果你使用Cats按材质或按松散部分分离网格以协助减面或编辑，请不要忘记再次合并网格。** 
<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F1fco-G2j0Jg%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1fco-G2j0Jg&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F1fco-G2j0Jg%2Fhqdefault.jpg&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=youtube" width="854" height="480" scrolling="no" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>

## 减少使用的材质槽数量 {#reduce-the-amount-of-material-slots-you-use}
每个额外的材质槽也是一次绘制调用，会消耗更多处理器时间！如果你有很多材质（超过10个），请考虑使用纹理图集。借助社区创建的工具，图集制作极其简单。查看“Materials”视频了解更多详情。

另外，重要的是Avatar中**渲染器组件上的材质槽数量**。如果你在20个槽中使用同一个材质，技术上你仍然拥有20个“材质”。

这是因为Unity会将网格拆分为子网格。真正影响性能的是创建的子网格数量，而Unity会根据材质槽来创建子网格。

<iframe width="854" height="480" src="https://www.youtube-nocookie.com/embed/5LwRi26RxSQ?si=_TuNCYuWLrsWrVIm" title="YouTube视频播放器" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen="true"></iframe>

## 注意VRAM使用量！ {#watch-your-vram-usage}

即使使用纹理图集，你也可能最终使用比之前更多的VRAM！

纹理会占用VRAM。每个纹理的分辨率越高，消耗的VRAM就越多。避免使用多个高分辨率纹理，或者通过降低[Unity导入设置](https://docs.unity3d.com/Manual/class-TextureImporter.html)中的“Max Size”参数来减小它们的大小。

例如：一个30 MB的Avatar *可能*会使用3 GB的VRAM，前提是它使用了低效的高分辨率纹理。不要被Avatar的下载大小所迷惑。

请查看[Poiyomi的纹理优化指南](https://www.poiyomi.com/blog/2022-10-17-texture-optimization)。这是一份关于如何优化Avatar纹理的出色而全面的指南。

## 使用优化过的着色器 {#use-optimized-shaders}
有些着色器可能会导致GPU渲染时间过长。尽量坚持使用Unity Standard着色器，或你确知其性能良好的着色器。如果你不知道如何判断着色器是否经过良好优化，那没关系！以下是一些示例——这些当然不是全部可用着色器，但它们都制作精良、优化良好，并具有多种功能。
* VRChat的SDK包含多种针对移动设备优化的着色器，例如“Standard Lite”。
* [Xiexe的“XSToon”Unity Shaders](https://github.com/Xiexe/Xiexes-Unity-Shaders)（MIT）——一套用于Unity的PBR“Toon”着色器集合。
* [Silent的着色器](https://gitlab.com/s-ilent/SCSS)（MIT）——用于Unity的赛璐璐着色器，最初基于已停止维护的CubedParadox的Flat Lit Toon，具有许多便捷功能。
* [Poiyomi的Toon Shader](https://github.com/poiyomi/PoiyomiToonShader/releases)（MIT）——一个非常强大、稳健且选项丰富的着色器。

### 尽量减少多余的着色器通道 {#minimize-excess-shader-passes}
更技术性地说，你要避免使用具有多余着色器通道的着色器。这会带来额外的绘制调用。对大多数用户来说，这可能有点过于复杂，不必担心；因此，如果你坚持使用常用且经过验证的社区着色器，那就足够了。

### 避免曲面细分 {#avoid-tessellation}
**你应始终避免在Avatar上使用带曲面细分的着色器。** 这在“毛发”着色器中非常常见。[曲面细分](https://en.wikipedia.org/wiki/Tessellation_%28computer_graphics%29)是一种让显卡对网格进行细分以实现各种效果的方法。然而，这种效果**极其昂贵**，即使最强大的显卡也会变慢。**不要使用带曲面细分效果的着色器。** 如果你想要毛发效果，可以考虑使用不依赖曲面细分来复现该效果的着色器，例如[XSFur](https://xiexe.booth.pm/items/1084711)和[Warren's Fast Fur Shader](https://warrenwolfy.gumroad.com/l/atntv)。

### 关键字 {#keywords}
你还应避免使用包含过多着色器关键字的着色器。这可能会导致在VRChat中渲染你的视图时出现严重且不可预测的问题，并会让输出日志充满大量冗余错误消息。着色器中无需包含过多关键字，因此请只使用实现目标功能所必需的关键字。

#### 清除关键字 {#clearing-keywords}
当你更改或升级着色器时，请确保从材质中移除旧的、未使用的关键字。使用过多关键字对性能和优化非常不利。这不仅会导致你自己的Avatar出现问题，还可能阻止其他人正确看到**所有着色器**。

VRChat SDK包含一个用于从Avatar材质中移除关键字的工具。此工具也可能移除你需要的关键字，因此请小心！

通常，最好用此工具检查关键字——**如果你有太多关键字，你可能需要寻找另一个着色器。** 切换到Standard，清除关键字，然后切换到你的新着色器。

#### 致着色器作者 {#note-for-shader-authors}
你可以考虑将Standard着色器保留的关键字用作自己的关键字。这些关键字基本上保证已被保留，因此如果你必须使用关键字，请使用Standard和Post Processing v2已定义的关键字。这里有一份[推荐使用的关键字列表](https://pastebin.com/83fQvZ3n)。

### Alpha透明度 {#alpha-transparency}
Alpha透明度也是着色器中开销高昂的部分——通常你应使用着色器的Cutout或Opaque模式。透明度可能相当昂贵，因此只有在你清楚自己在做什么时才使用它！

### 测量绘制调用 {#measuring-draw-calls}
在判断产生多少次绘制调用时，Unity Profiler非常有用——只需确保关闭Directional Light上的阴影，以获得公平的测试环境。

## 减少骨骼数量 {#reduce-the-amount-of-bones}
即使围巾、裙子或头发中有一堆骨骼并未用于任何用途，它们也可能在GPU需要处理的蒙皮调用中带来额外开销。如果你不打算使用某根骨骼，请考虑删除该骨骼并将其合并到父骨骼中。如果你想了解如何将某根骨骼的权重合并到其父骨骼，请查看上方关于Dynamic Bones的视频，其中包含骨骼合并的部分。

## 减少自发光量和粒子系统数量 {#reduce-the-emission-amountamount-of-particle-systems}
尽管粒子系统可以实现许多很酷的效果，但过多粒子系统可能会给某些PC带来问题。限制你使用的粒子系统数量，并限制任意时刻发射的最大粒子数量。

有一些方法可以在使用粒子数量众多的粒子系统时保持性能。如果你对此感兴趣，可以研究精灵粒子的动态批处理，不要使用碰撞，并确保粒子的运动足够简单。

如果你更偏向技术，可以尝试查看Unity的Profiler视图，以判断粒子模拟占用了多少CPU时间。一般来说，大的透明粒子比大量较小的不透明粒子更糟。Unity的粒子系统实际上优化得相当好，*如果使用得当*，运行速度很快。

## 限制Avatar使用的灯光数量 {#limit-the-number-of-lights-your-avatar-uses}
Avatar上的灯光是实时的，因此极其昂贵。向Avatar添加灯光意味着灯光照到的所有内容都会以*双倍*的绘制调用进行渲染。更多灯光会成倍放大这一影响。这显然*对性能非常不利*。不要使用始终开启的灯光。可以尝试使用Animation Override来开关手电筒，或者干脆完全不使用灯光。

如果你确实使用了灯光，请关闭该灯光的阴影。实时灯光上的阴影非常昂贵，而且在移动物体上通常看起来也不太好。

粒子系统可以配置为让一定数量的粒子带有灯光。*千万不要这样做！* 每个带灯光的粒子都算作一个实时灯光，这（再一次）极其昂贵。

**总的来说，VRChat建议你完全不要在Avatar上使用任何类型的灯光。** 它们不仅会对你自己Avatar的性能产生不利影响，还会成倍增加灯光所照到的其他Avatar的性能开销。

## 推荐软件/插件 {#recommended-softwareplugins}
有大量软件可帮助你优化Avatar，并让构建Avatar变得更轻松。

例如，可以看看适用于Unity Editor的[Pumkin's Avatar Tools](https://github.com/rurre/PumkinsAvatarTools)（MIT）。除其他功能外，这个Editor脚本还能让你快速查看Avatar的统计数据。此工具处于测试阶段，可能存在错误——请在Pumkin的GitHub上报告任何问题。

以下软件并非由VRChat编写。请阅读并遵守每个产品随附的许可协议。

* [Unity](/sdk/upgrade/current-unity-version) 
* [Blender](https://blender.org)
* [Cats Blender Plugin
](https://github.com/absolute-quantum/cats-blender-plugin)
* [Shotariya's Material Combiner](https://github.com/Grim-es/material-combiner-addon)
* [Pumkin's Avatar Tools](https://github.com/rurre/PumkinsAvatarTools)
