---
slug: "whitelisted-avatar-components"
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 允许的虚拟形象组件 {#allowed-avatar-components}

你可以通过向虚拟形象<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/UsingComponents.html">添加组件</UnityVersionedLink>来为其添加功能。不过，并非所有组件都能在 VRChat 中使用。

- 以下列表中的任何组件都可以在 VRChat 中使用。
- 其他组件或自定义脚本无法在 VRChat 中运行，并且可能会阻止你上传虚拟形象。

:::info

Android 版 VRChat 有[额外限制](/platforms/android/quest-content-limitations#components)。

:::
## VRChat

- VRCAvatarDescriptor
- [VRCConstraint](/common-components/constraints)
- [VRCContactReceiver](/common-components/contacts#vrccontactreceiver)
- [VRCContactSender](/common-components/contacts#vrccontactsender)
- [VRCHeadChop](/avatars/avatar-components/vrc-headchop)
- [VRCIKFollower](https://docs.vrchat.com/docs/vrc_ikfollower) - 已弃用！你应该改用 [VRChat Constraints](/common-components/constraints)。
- [VRCPhysBone](/common-components/physbones#vrcphysbone)
- [VRCPhysBoneCollider](/common-components/physbones#vrcphysbonecollider)
- [VRCPipelineManager](/sdk/vrcpipelinemanager/)
- [VRCRaycast](/avatars/avatar-components/raycast.md)
- [VRCSpatialAudioSource](/worlds/components/vrc_spatialaudiosource#spatial-audio-on-avatars)
- [VRCStation](/worlds/components/vrc_station)

## Unity

- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AimConstraint.html">AimConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Animation.html">Animation</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Animator.html">Animator</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AudioSource.html">AudioSource</UnityVersionedLink>（另请参阅 [VRCSpatialAudioSource 组件说明](/worlds/components/vrc_spatialaudiosource#spatial-audio-on-avatars)）
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Camera.html">Camera</UnityVersionedLink>（请参阅[下方说明](#cameras-on-avatars)）
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Cloth.html">Cloth</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/CollidersOverview.html">Collider</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-FlareLayer.html">FlareLayer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/Joints.html">Joints</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Light.html">Light</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-LineRenderer.html">LineRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-LookAtConstraint.html">LookAtConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-MeshFilter.html">MeshFilter</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-MeshRenderer.html">MeshRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-ParentConstraint.html">ParentConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/PartSysRendererModule.html">ParticleSystemRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-ParticleSystem.html">ParticleSystem</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-PositionConstraint.html">PositionConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Rigidbody.html">Rigidbody</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-RotationConstraint.html">RotationConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-ScaleConstraint.html">ScaleConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-SkinnedMeshRenderer.html">SkinnedMeshRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-TrailRenderer.html">TrailRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Transform.html">Transform</UnityVersionedLink>

### 虚拟形象上的摄像机 {#cameras-on-avatars}

对于本地用户佩戴的虚拟形象，Camera 组件完全在白名单中。对于远程用户，以下规则适用：
    - 在所有情况下，远程用户的 Camera 组件都会在虚拟形象加载时禁用。
      - 你可以使用动画来启用 Camera 组件。
    - 如果本地用户和远程用户是好友，则不会移除 Camera 组件。
      - 请注意，与用户成为好友不会自动重新加载其虚拟形象。
    - 如果本地用户在 VRChat 的快捷菜单中为远程用户选择了“Show Avatar”，则不会移除 Camera 组件。
    - 如果以上两种情况都不成立，则 Camera 组件会被移除，且无法启用。

## [Root Motion (FinalIK)](http://www.root-motion.com/finalikdox/html/index.html)

VRChat 对其 FinalIK 实现进行了高度修改。因此，这些组件可能无法按文档所述工作。

我们不直接支持或测试虚拟形象上的自定义 FinalIK 实现。不过，它们*应该*能正常工作，如果我们必须有意破坏其中一项或多项功能，我们会尽力通知创作者。如果你发现错误，请[告诉我们](https://feedback.vrchat.com)。

如果你想在虚拟形象上实现基本的射线检测，我们强烈建议改用我们的 [VRCRaycast](/avatars/avatar-components/raycast.md) 组件，因为它由官方维护，并且可在所有平台上使用。

:::warning

虚拟形象上的 [VRCRaycast](/avatars/avatar-components/raycast.md) 和 FinalIK 组件合计上限为 80 个。

:::

- [Aim IK](http://www.root-motion.com/finalikdox/html/page1.html)
- [Biped IK](http://www.root-motion.com/finalikdox/html/page4.html)
- [CCDIK](http://www.root-motion.com/finalikdox/html/page5.html)
- [FABRIK](http://www.root-motion.com/finalikdox/html/page6.html)
- [Full Body Biped IK](http://www.root-motion.com/finalikdox/html/page8.html)
- [Grounder](http://www.root-motion.com/finalikdox/html/page9.html)
- [Limb IK](http://www.root-motion.com/finalikdox/html/page12.html)
- [Rotation Limits](http://www.root-motion.com/finalikdox/html/page14.html)
- Shoulder Rotator
- Twist Relaxer
- [VRIK](http://www.root-motion.com/finalikdox/html/page16.html)[^2]

[^2]: 在人形虚拟形象上使用此脚本会破坏它。

## [DynamicBone](https://assetstore.unity.com/packages/tools/animation/dynamic-bone-16743)
:::danger Dynamic Bone 已弃用

对 Dynamic Bone 的支持已弃用。你应该改用 [PhysBones](/common-components/physbones)。

:::

- DynamicBone
- DynamicBoneCollider
