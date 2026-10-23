import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# 动画事件 {#animation-events}

你可以 <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/script-AnimationWindowEvent.html">从动画中调用事件</UnityVersionedLink>。本页列出了允许以这种方式使用的事件。如果某个事件不在允许列表中，那么当你的世界在 VRChat 中运行时，它不会被调用。

![animation-events-af04d2a-AnimationEventInspector.png](/img/worlds/animation-events-af04d2a-AnimationEventInspector.png)

## 允许的动画事件 {#allowed-animation-events}
* RunProgram
* SendCustomEvent
* Play
* Pause
* Stop
* PlayInFixedTime
* Rebind
* SetBool
* SetFloat
* SetInteger
* SetTrigger
* ResetTrigger
* SetActive
