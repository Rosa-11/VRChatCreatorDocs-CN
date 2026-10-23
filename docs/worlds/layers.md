import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# VRChat中的Unity图层 {#unity-layers-in-vrchat}

<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/Layers.html">图层</UnityVersionedLink>在Unity中用于组织你的游戏对象、确定游戏对象之间的<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/LayerBasedCollision.html">碰撞</UnityVersionedLink>和<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Physics.Raycast.html">射线检测</UnityVersionedLink>、选择性地<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Camera-cullingMask.html">渲染</UnityVersionedLink>场景的某些部分等。

**你可以在VRChat世界中自由使用大多数图层。** 某些图层由Unity和VRChat共享使用。

使用VRChat Worlds SDK创建Unity项目时，你的项目会自动配置为使用VRChat的内置图层。如果你更改碰撞矩阵、重命名或移除内置图层，你的更改将在上传世界到VRChat时被覆盖。

图层22-31是未使用的“User”Unity图层。你可以自由编辑它们，并且当你构建并上传世界时，对这些图层的更改不会被丢弃。

## Unity的内置图层 {#unitys-built-in-layers}

下表列出了Unity的内置图层、它们在VRChat中的使用方式，以及用户是否可以在其上放置[贴纸](#stickers)。

| 图层编号 | 图层名称          | 描述                                                                                                                                                                                                                                            | 可放置贴纸 |
| :----------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| 0            | Default             | 默认用于Unity的游戏对象。用于VRChat的Avatar Pedestals。                                                                                                                                                                           | ✔                 |
| 1            | TransparentFX       | 用于Unity的Flare资源。用于VRChat的Physbone和Contact Overlay调试可视化。                                                                                                                                                                                                                        | ❌                 |
| 2            | IgnoreRaycast       | 如果未提供图层遮罩，则被Unity的物理射线检测忽略。不会被VRChat的物理射线检测忽略。                                                                                                                                            | ❌                 |
| 3            | Item           | 用于用户放入你世界的VRChat物品。上传世界时，此图层上的任何游戏对象都将移至图层0（Default）。                                                                                                      | ❌                 |
| 4            | Water               | 用于Unity的Standard Assets。用于VRChat的传送门。用于VRChat的镜子。常用于Unity的后处理。                                                                                                                           | ✔                 |
| 5            | UI                  | ⚠ 你可能不想使用此图层。默认用于Unity的UI。除非玩家打开VRChat菜单，否则会被VRChat的UI指针忽略。除非在相机中启用“UI”，否则会被VRChat的相机忽略。                                   | ❌                 |
| 6            | reserved6           | ⚠ 请避免使用此图层。由VRChat保留。上传世界时，保留图层上的任何游戏对象都将移至图层0（Default）。                                                                                                      | ❌                 |
| 7            | reserved7           | ⚠ 请避免使用此图层。由VRChat保留。上传世界时，保留图层上的任何游戏对象都将移至图层0（Default）。                                                                                                      | ❌                 |
| 8            | Interactive         | Unity和VRChat均未使用。<br />将此图层用于你不希望用户放置[贴纸](#stickers)的碰撞体。                                                                                                                               | ❌                 |
| 9            | Player              | 用于VRChat的玩家，但本地玩家除外。                                                                                                                                                                                                    | ❌                 |
| 10           | PlayerLocal         | VRChat用于渲染本地玩家。人形虚拟形象（Avatar）渲染时不包含其头部骨骼。                                                                                                                                                      | ❌                 |
| 11           | Environment         | Unity和VRChat均未使用。                                                                                                                                                                                                                            | ✔                 |
| 12           | UiMenu              | ⚠ 你可能不想使用此图层。除非玩家打开VRChat菜单，否则会被VRChat的UI指针忽略。                                                                                                                                      | ❌                 |
| 13           | Pickup              | 当你添加Pickup组件时，默认由VRChat的Pickup使用。不与玩家碰撞。                                                                                                                                                    | ❌                 |
| 14           | PickupNoEnvironment | 此图层上的碰撞体仅与“Pickup”碰撞。                                                                                                                                                                                                    | ❌                 |
| 15           | StereoLeft          | Unity和VRChat均未使用。                                                                                                                                                                                                                            | ❌                 |
| 16           | StereoRight         | Unity和VRChat均未使用。                                                                                                                                                                                                                            | ❌                 |
| 17           | Walkthrough         | 此图层上的碰撞体不与玩家碰撞。                                                                                                                                                                                                   | ✔                 |
| 18           | MirrorReflection    | VRChat用于在镜子中渲染本地玩家。<br />此图层上的渲染器只会出现在镜子中。<br />此图层上的渲染器不会在VRChat的主相机中渲染。<br />此图层上的碰撞体不会阻挡VRChat的射线检测。 | ❌                 |
| 19           | InternalUI          | ⚠ 请避免使用此图层。VRChat用于内部UI元素，例如菜单、名牌和调试面板。                                                                                                                                       | ❌                 |
| 20           | HardwareObjects     | ⚠ 请避免使用此图层。VRChat用于在游戏内渲染物理硬件的虚拟表示，即控制器和追踪器。                                                                                                                  | ❌                 |
| 21           | reserved4           | ⚠ 请避免使用此图层。由VRChat保留。上传世界时，保留图层上的任何游戏对象都将移至图层0（Default）。                                                                                                      | ❌                 |
| 22-30        |                     | Unity和VRChat均未使用。VRChat不会在上传的世界中覆盖这些图层的名称和碰撞矩阵。                                                                                                                                 | (✔)[^1]           |
| 31           |                     | ⚠ 请避免使用此图层。用于Unity编辑器的预览窗口机制。                                                                                                                                                                           | (✔)[^1]           |

[^1]: 图层22-31默认启用贴纸。你可以通过将它们添加到[交互穿透](/worlds/layers#interaction-passthrough-for-user-layers)列表来禁用贴纸。

## 贴纸 {#stickers}

贴纸允许[VRChat+](https://hello.vrchat.com/vrchatplus)用户在你的世界中的`Collider`组件上放置图像。

贴纸不能放置在[所有图层](#unitys-built-in-layers)上。如果你不希望用户在某`Collider`组件上放置贴纸，请更改其图层。我们建议使用图层8（“Interactive”），因为它未被VRChat和Unity使用。

如果你不想在任何地方允许贴纸，请在[VRChat网站](https://vrchat.com/home/content/worlds)上编辑你的世界并禁用贴纸。

## 物理和图层 {#physics-and-layers}

使用物理操作时，最好限制所测试的图层，以避免保留图层上的物品。对通过物理调用返回的任何对象使用`Utilities.IsValid`也是一个好主意，以确保你没有意外拾取到“受保护”的对象，该对象将为`null`，可能会关闭你的UdonBehaviour。

<details>
    <summary>以下物理方法最好与`IsValid`配合使用：</summary>

- Physics.Raycast – 投射射线并返回第一个命中。
- Physics.RaycastAll – 返回沿射线方向的所有命中。
- Physics.RaycastNonAlloc – 使用预分配数组存储结果，减少垃圾回收。
- Physics.SphereCast – 类似于Raycast，但使用球体以获得更宽的检测区域。
- Physics.SphereCastAll – 返回使用球体的所有命中。
- Physics.SphereCastNonAlloc – 使用预分配数组的优化版本。
- Physics.OverlapSphere – 返回球体内的所有碰撞体。
- Physics.OverlapBox – 返回盒体内的所有碰撞体。
- Physics.OverlapCapsule – 返回胶囊体内的所有碰撞体。
- Physics.OverlapSphereNonAlloc – 使用预分配数组的优化版本。
- Physics.OverlapBoxNonAlloc – 相同，但用于盒体。
- Physics.OverlapCapsuleNonAlloc – 相同，但用于胶囊体。
- Rigidbody.SweepTest – 检查刚体是否会沿给定方向撞到某物。
- Rigidbody.SweepTestAll – 返回沿刚体路径的所有命中。
- Physics.CapsuleCast – 沿方向投射胶囊体并检测第一个命中。
- Physics.CapsuleCastAll – 返回使用胶囊体的所有命中。
- Physics.CapsuleCastNonAlloc – 使用预分配数组的优化版本。
- Physics.BoxCast – 投射盒体并检测第一个命中。
- Physics.BoxCastAll – 返回使用盒体的所有命中。
- Physics.BoxCastNonAlloc – 使用预分配数组的优化版本。
- Collider.Raycast – 对单个碰撞体投射射线。
- Physics.CheckSphere – 检查球体是否与任何碰撞体重叠。
- Physics.CheckBox – 检查盒体是否与任何碰撞体重叠。
- Physics.CheckCapsule – 检查胶囊体是否与任何碰撞体重叠。
</details>

## VRChat图层上的交互阻挡和穿透 {#interaction-block-and-passthrough-on-vrchat-layers}

大多数VRChat图层会阻挡交互（从远处抓取物品、用激光切换UI元素）。以下图层对交互透明，允许你穿过它们进行交互：
 - UiMenu
 - UI
 - PlayerLocal
 - MirrorReflection

## 用户图层的交互穿透 {#interaction-passthrough-for-user-layers}

通过用户图层的交互默认被阻挡。使用“Interact Passthrough”遮罩来定义将对交互透明的图层（允许交互穿过）。请注意，碰撞测试射线在桌面/移动端玩家（玩家胶囊体内）与VR玩家（用户追踪的手部）中的起点不同。这意味着即使玩家碰撞体被阻挡，VR玩家也可以用手穿过碰撞体。因此，由于手已经穿透，这些碰撞体不会阻挡VR玩家的交互。
