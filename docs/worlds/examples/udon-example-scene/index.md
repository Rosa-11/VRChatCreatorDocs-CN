---
sidebar_custom_props:
    customIcon: 🛝
---

# Udon示例场景 {#udon-example-scene}

本场景包含关于世界如何使用Udon的示例。你可以[构建与测试](/worlds/udon/using-build-test)或发布这个世界，在VRChat中试用它。

## 预制件 {#prefabs}
本场景中的预制件演示了与VRChat组件的一些常见交互，包括按钮、虚拟形象展示台、载具座位、镜子等。

以下所有预制件都包含在VRChat Worlds SDK中。你可以将它们添加到自己的任何世界中。例如，[VRCWorld](#vrcworld)默认包含在大多数VRChat场景中。

 ![UdonExampleScene](/img/worlds/udon/examples/UdonExampleScene/prefab-scene.png)

### VRCWorld
这个预制件让你可以轻松地将Unity场景上传到VRChat。它包含四个组件：
- [VRC Scene Descriptor](/worlds/components/vrc_scenedescriptor/)脚本，用于定义世界的基本属性。每个VRChat世界都需要它。
- [VRC Pipeline Manager](/sdk/vrcpipelinemanager/)脚本，包含世界ID。它会随VRC Scene Descriptor自动添加。
- [VRCWorldSettings](/worlds/examples/udon-example-scene/player-mod-setter) Udon Graph程序，让你可以更改世界中玩家的移动速度。
- [虚拟形象缩放设置](/worlds/examples/udon-example-scene/avatar-scaling-settings) Udon Graph程序，让你可以限制世界中玩家的虚拟形象缩放。

如果你想在自己的Unity场景中使用VRCWorld预制件，可以在`\Packages\com.vrchat.worlds\Samples\VRCPrefabs\VRCWorld.prefab`中找到它。

### AvatarPedestal
它以预制件的形式提供，并带有一个程序，当用户与展示台交互时会将用户切换为该虚拟形象，这是该预制件的默认行为。

要更改预制件的交互距离，请解包预制件并更改Udon Behaviour组件的“Proximity”设置。

### VRCChair3
它以预制件的形式提供，并带有一个名为`StationGraph`的程序。当玩家与之交互时，它会将玩家安置在座位上，并在玩家进入或离开时记录其显示名称。

### MirrorSystem
该对象上有一个**ToggleGameObject**程序，它使用Interact事件在激活/未激活之间切换目标对象。在这里，它控制着一个VRCMirror对象，该对象是它的子物体。

### Cubes
这些对象演示了你可以用Cube做的一些简单事情，主要是复用**ChangeMaterialOnEvent**程序来展示如何从其他对象触发自定义事件。

![Cube示例](/img/worlds/udon/examples/UdonExampleScene/cubes-scene.png)

### InteractCube
该对象上有一个**SendEventOnInteract**程序——它监听Interact事件，当玩家指向某个对象并按下“使用”按钮时会触发该事件。在这里，它会向子对象上的**ChangeMaterialOnEvent**程序发送一个名为“changeMaterial”的自定义事件，该程序每次收到此事件时都会从数组中更换材质。这两个程序都是可复用的——你可以在UdonBehaviour组件的检视面板中更改**SendEventOnInteract**程序发送的eventName。

### TimerCube
该对象上有一个**SendEventOnTimer**程序——它会运行一个给定*时长*的计时器，然后发送指定的事件。在这里，它会向子对象上的**ChangeMaterialOnEvent**程序发送一个名为“changeMaterial”的自定义事件，该程序每次收到此事件时都会从数组中更换材质。这两个程序都是可复用的——你可以在UdonBehaviour组件的检视面板中更改**SendEventOnTimer**程序发送的eventName，并更改其以秒为单位的*时长*来改变触发频率。

### UseCube
该对象的子物体`Model`上有一个**SendEventOnUse**程序——它可以在对象被拾取并“使用”时发出事件。在这里，它会向`MaterialChanger`对象上的**ChangeMaterialOnEvent**程序发送一个名为“changeMaterial”的自定义事件，该程序每次收到此事件时都会从数组中更换材质。这两个程序都是可复用的——你可以在UdonBehaviour组件的检视面板中更改**SendEventOnUse**程序发送的eventName。`Model`对象还有一个`VRCObjectSync`组件，会在该对象被移动时将其移动同步给其他用户。

## Udon变量同步 {#udon-variable-sync}
这些对象演示了将变量值从对象的所有权持有者同步到实例中其他所有人的不同方式。
![Udon变量同步示例](/img/worlds/udon/examples/UdonExampleScene/variable-sync-scene.png)

“Canvas”项包含许多带有同步变量的UI项：

### ButtonSyncOwner
这是此处介绍的第一个使用[手动同步](/worlds/udon/networking#2-manual-variable)方法的程序。在下图中，你可以看到它有一个OnClick()处理器，会以值“OnClick”调用UdonBehaviour.SendCustomEvent。它指向正下方的UdonBehaviour，并在那里运行自定义事件“OnClick”。这就是UI元素在UdonBehaviour上运行事件的方式。

![从Unity UI控件触发自定义事件](/img/worlds/udon/examples/UdonExampleScene/buttonsyncowner-inspector.png)

在Graph程序中，OnClick事件会检查点击的玩家是否为该对象的所有者。如果是，它会将“clickCount”变量加1，然后调用**RequestSerialization**，通知Udon更新这个手动同步的UdonBehaviour上的数据。

![OnClick ▸ 如果是所有者 ▸ 将clickCount设为clickCount + 1 ▸ 序列化。](/img/worlds/index-f0a3ff2-bso-gaph.png)

请注意，“Set clickCount”节点开启了“sendChange”开关。当所有人收到新的clickCount值时，这会为他们触发一个事件。

![变量更改事件非常强大！你可以用它们在同步变量发生变化时，在所有者和其他人身上运行相同的逻辑。](/img/worlds/index-4590d3e-clickCount-change.png)

当clickCount更新时，这个Change事件会被触发，然后无论谁是该程序的“所有者”，它都会把按钮的文本设置为新值。

### ButtonSyncAnyone
该对象使用的程序与上面的**ButtonSyncOwner**非常相似，但为点击按钮且*不是*该对象所有者的用户添加了逻辑。在这种情况下，他们会向该对象的所有者发送自定义事件“OnClick”。就这样！所有者会收到此事件，并像自己刚点击了按钮一样处理它。

![非所有者会向所有者发送事件，以便轻松更新数字。](/img/worlds/index-2b1a9c3-ButtonSyncAnyone.png)

### ButtonSyncBecomeOwner
该对象在现已熟悉的ButtonSync程序基础上构建，演示如何轻松更改对象的所有权。当非所有者点击按钮时，它会将所有权分配给他们，然后更新变量。当你想要更改多个变量，或执行比简单递增一个值更复杂的逻辑时，这很有用。
![ButtonSyncBecomeOwner](/img/worlds/udon-example-scene-1372141-button-sync-become-owner.png)

在更改对象的所有权时，会运行一些逻辑来决定是否允许转移。你可以在此处了解更多信息：[网络](/worlds/udon/networking#object-ownership)。如果你不添加任何自定义逻辑，所有所有权请求都会被批准。下面的节点展示了一个简单设置，它会检查一个名为“someSpecialLogic”的布尔变量，以决定是否批准转移。你可以根据自己的逻辑基于“requester”、“newOwner”或两者来构建。

![有人想成为新的所有者吗？检查你在其他地方更新过的“someSpecialLogic”。](/img/worlds/index-91b3564-onOwnershipRequest.png)

### SliderSync
![SliderSync](/img/worlds/udon-example-scene-080c991-syncSlider.png)

该对象有一个名为**SliderSync**的程序，其工作方式与**ButtonSyncBecomeOwner**类似。当有人移动滑块时，他们会成为所有者，并将新值发送给其他所有人。一个区别是，当从UI触发“OnValueChanged”事件时，它会检查这个新值是否与滑块的当前值不同。这是因为从Udon更新滑块的值也会触发此事件，从而导致无限循环。因此，我们有一些逻辑，在执行其余逻辑之前确保“sliderValue”变量与Slider的值不同。

它还会使用Variable Change事件，在任何人成为所有者并更新滑块值时，用滑块的值更新一个文本字段。

### Toggle

该对象有一个名为**ToggleSync**的程序，其工作方式与上面的Slider相同。当有人将值更改为与当前值不相等时，他们会成为所有者，并将新值发送给其他所有人，
![Toggle](/img/worlds/udon-example-scene-f8def0e-syncToggle.png)

### Dropdown
 
![Dropdown](/img/worlds/udon/examples/UdonExampleScene/dropdown-target-inspector.png)

该对象有一个名为**DropdownSync**的程序，其工作方式与上面的Toggle和Slider相同。当有人更改值时，他们会确保它与当前值不同，然后成为所有者并将新值发送给其他所有人。

### InputField
 
![InputField](/img/worlds/udon-example-scene-5d240b9-inputfield-object.png)

该对象有一个名为**InputFieldSync**的程序，其工作方式与上面的Dropdown类似。当有人更改值时，他们会检查它是否不同，成为所有者，并将新值发送给其他所有人。

### PickupCube
 
![PickupCube](/img/worlds/udon/examples/UdonExampleScene/pickup-cube.png)

该对象带有VRC Pickup和VRC Object Sync组件，使其可以被拾取和移动，并自动同步给其他用户。这个UdonBehaviour被设置为“Continuous”而不是像上面的同步程序那样设置为“Manual”，因为它需要更频繁地更新以保持其Transform为最新状态。这个UdonBehaviour上有一个**SyncPickupColor**程序，会在它被持有时平滑地改变颜色。它通过在Update事件期间检查本地玩家是否为该对象的所有者，以及VRCPickup.get的isHeld是否为true来实现这一点。请注意，它不使用RequestSerialization，因为它被设置为Continuous——它只会尽可能地频繁更新这些值。

![这会在每帧运行，当条件为真时，程序会用一些有趣的数学在检视面板中指定的两种颜色之间缓慢变化。](/img/worlds/index-03b983d-pickup-isheld.png)

### PickupSphere
该对象实际上没有任何Udon！它只是使用VRC Pickup和VRC Object Sync组件，让用户可以拾取它并以同步的方式移动它。

![PickupSphere](/img/worlds/udon-example-scene-ea9afda-pickup-sphere.png)

## PlayerDetection
对玩家进入某个区域或与物理对象发生碰撞作出响应可能非常有用。这些示例程序说明了几种实现方式。

### PlayerTrigger

![PlayerTrigger](/img/worlds/udon/examples/UdonExampleScene/onplayertrigger-scene.png)

这是检测玩家进入或离开某个区域最常用的方式。“TriggerArea”对象上带有一个半透明的蓝色材质、一个勾选了*IsTrigger*的Box Collider，以及一个带有**PlayerTrigger**程序源的UdonBehaviour。

在这个程序中，每当任何玩家进入或离开碰撞体时，**OnPlayerTriggerEnter**和**OnPlayerTriggerExit**事件都会被触发。然后程序会获取该玩家的**displayName**并更新目标画布上的文本。
![PlayerTrigger程序](/img/worlds/udon-example-scene-b7cd2a0-onplayertriggerenter-program.png)

### PlayerCollision
这个设置演示了如何触发和响应**OnPlayerCollisionEnter/Exit**事件，这些事件在物理对象进入玩家碰撞体时触发。
![PlayerCollision](/img/worlds/udon/examples/UdonExampleScene/onplayercollision-scene.png)

*TriggerArea*对象有一个**FireOnTrigger** Udon程序，它会检测玩家进入其触发区域，就像上面的**PlayerTrigger**程序一样。在这里，此事件用于向*Projectile*对象发送自定义事件“Fire”。这会使Projecticle方块对自己施加一个力，从而移向玩家。当它与玩家碰撞时，会将玩家的displayName写入目标Text字段。

请注意，这里的PlayerCollision事件只会在经历它们的玩家本地触发。如果你想将这些事件告知其他玩家，你需要自己通过同步变量或自定义网络事件添加该功能。

### PlayerParticleCollision

![PlayerParticleCollision场景](/img/worlds/udon/examples/UdonExampleScene/particlecollision-scene.png)

 这个演示的设置与上面的PlayerCollision类似，它使用一个Trigger Area来启动其他事件。在这里，当玩家进入Trigger Area时，**SetActiveFromPlayerTrigger**程序会打开*CollisionParticles*对象。该对象有一个ParticleSystem，它会向玩家发射粒子，并开启了World Collision和Send Collision Messages。附加到该对象的Udon程序**PlayerCollisionParticles**会在图中触发**OnPlayerParticleCollision*事件，这些事件会将受影响玩家的displayName写入目标文本字段。

![PlayerParticleCollision程序](/img/worlds/udon-example-scene-3266c29-onplayerparticlecollision.png)

## [Udon Sync Player](/worlds/examples/udon-example-scene/udon-video-sync-player)

![Udon Sync Player](/img/worlds/udon-example-scene-344ca0e-udonsyncplayer-scene.png)

这个设置演示了使用Unity / AVPro视频播放器加载并同步视频播放的一种方式。它的程序很大，所以我们把它单独放在一个页面中。

## CubeArraySync

![CubeArraySync](/img/worlds/udon/examples/UdonExampleScene/cube-array-sync.png)

这个简单的程序创建了一个立方体网格，当任何人点击它们时，它们会随机开启和关闭，而且使用的数据非常少，展示了同步数组的强大之处。**CubeArraySync**程序有一个名为*data*的变量，它是一个包含25个值的布尔数组。这意味着它有25个简单的“是/否”值，会被同步给每个用户。它还有一个名为*cubes*的GameObject数组，包含25个立方体。

当任何人点击包含所有立方体的对象时，一个名为“Randomize”的自定义网络事件会被发送给CubeArraySync对象的所有者。然后，所有者会使用**For**循环，通过生成一个0到1之间的数字并检查该值是否大于0.5，随机地将每个值设置为开或关。更新数组变量后，它会调用**RequestSerialization**，然后调用自定义事件**UpdateCubes**。

![每个用户都会根据布尔数组中的随机值来开启/关闭每个立方体。](/img/worlds/index-735f048-update-cubes-from-data.png)

**UpdateCubes**事件使用另一个**For**循环来遍历数组中的每个“是/否”变量，并将其对应的Cube设置为开或关。该事件由所有者在更新数组后触发，或由**OnDeserialization**在VRChat为所有其他用户更新数组变量后触发。我们在这里使用OnDeserialization而不是OnVariableChange，因为数组变量目前不会触发Variable Change事件，所以我们等到在OnDeserialization中拿到新数据后再更新场景。

## ObjectPool

![一旦这些立方体开始下落并四处弹跳，它们就再也不会这么整齐了。](/img/worlds/udon/examples/UdonExampleScene/objectpool-scene.png)

[对象池](/worlds/udon/networking/network-components#vrc-object-pool)是一个帮助你管理对象集合的组件。它会自动同步其对象的激活状态。这个示例程序会一次一个地从天而降地投放箱子，堆成网格，当你点击一个箱子时，它会被移除并从天上重新生成。

为此，**ObjectPool**程序会运行一个简单的计时器，并按固定间隔尝试**Spawn**一个对象。其池中的每个*Pooled Box*都有一个简单的**Pooled Box**程序，它会在Start时保存初始位置，在它被启用时（即被池生成时）恢复该位置，并在你点击它时回收每个对象。

## [简易画笔系统](/worlds/examples/udon-example-scene/simple-pen-system) {#simple-pen-system}
即使是基础的画笔也需要相当多的工作，所以这个示例有自己单独的页面。
