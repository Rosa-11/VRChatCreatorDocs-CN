---
title: "场景组件"
hidden: false
createdAt: "2017-07-11T20:33:31.318Z"
updatedAt: "2021-10-20T20:03:08.484Z"
---

你希望带入VRChat的每个Unity场景都需要一个 [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor) 组件。VRChat Worlds SDK还包含各种其他组件，让你世界中的用户能够与你的世界交互、拿起物体、在镜子中看到自己等等。

请参阅[世界组件白名单](/worlds/whitelisted-world-components)以获取VRChat SDK中可用组件的完整列表。

| 组件                                                                  | 描述                                                                                                          |
|----------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| [TextMesh Pro](/worlds/components/textmeshpro)                             | 用于显示高质量文本。                                                                                   |
| [VRC_AvatarPedestal](/worlds/components/vrc_avatarpedestal)                | 用于展示和/或切换虚拟形象（Avatar）。                                                                        |
| [VRC_MirrorReflection](/worlds/components/vrc_mirrorreflection)            | 用于在VRChat中创建镜子。                                                                                   |
| [VRC_ObjectSync](/worlds/components/vrc_objectsync)                        | 将GameObject的变换与实例中的所有玩家同步。                                                |
| [VRC_Pickup](/worlds/components/vrc_pickup)                                | 允许玩家拿起、持有和使用物体。                                                            |
| [VRC_PortalMarker](/worlds/components/vrc_portalmarker)                    | 创建通往其他VRChat世界的传送门。                                                                              |
| [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor)              | 描述你的VRChat世界。你希望用作VRChat世界的每个Unity场景都需要它。                     |
| [VRC_SpatialAudioSource](/worlds/components/vrc_spatialaudiosource)        | 为Unity AudioSource添加3D空间化效果。在编辑器中通常会随AudioSource组件自动添加。    |
| [VRC_Station](/worlds/components/vrc_station)                              | 允许用户坐下。                                                                                             |
| [VRC_UIShape](/worlds/components/vrc_uishape)                              | 允许用户与Unity的UI系统交互。                                                                      |
| [VRC Camera Dolly](/worlds/components/vrc_cameradolly)                     | 允许将摄像机滑轨动画应用到VRChat用户摄像机。                                               |
| [VRC Phys Bone](/common-components/physbones#vrcphysbone)                  | 为世界中的物体添加基于物理的次级运动。                                                        |
| [VRC Phys Bone Collider](/common-components/physbones#vrcphysbonecollider) | 定义PhysBones可以碰撞的碰撞形状。                                                        |
| [VRC Phys Bone Root](/common-components/physbones#vrcphysboneroot)         | 定义一组PhysBones的根变换。                                                            |
| [VRC Contact Sender](/common-components/contacts#vrccontactsender)         | 由Contact Receiver检测，在碰撞开始和结束时触发世界行为。                               |
| [VRC Contact Receiver](/common-components/contacts#vrccontactreceiver)     | 检测Contact Sender，在碰撞开始和结束时触发世界行为。                                     |
| [VRC Constraints](/common-components/constraints)                          | Unity约束的同类替代品，允许变换以各种方式相对彼此移动。 |

## 世界PhysBone与Contact限制 {#world-physbone-and-contact-limits}

出于性能考虑，当前加载的世界中，激活的PhysBones和PhysBone Colliders被强制限制为1024个，激活的Contacts另有1024个的限制。更具体地说：

- 如果你的世界中激活的PhysBones和PhysBone Colliders总数达到1024个，那么更多的PhysBones和PhysBone Colliders将无法工作，直到部分现有组件被禁用或销毁。
- 如果你的世界中激活的Contact Senders和Contact Receivers总数达到1024个，那么更多的Contacts将无法工作，直到部分现有组件被禁用或销毁。

如果这些组件的总数超过任一限制，SDK会显示警告。不过，只要你确保你的世界中每种组件同时激活的数量不超过1024个，就可以忽略这些警告。
