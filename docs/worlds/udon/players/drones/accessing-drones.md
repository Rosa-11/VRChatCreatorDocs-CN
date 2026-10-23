---
title: "获取无人机"
slug: "getting-drones"
hidden: false
createdAt: "2025-03-05T14:52:00.02Z"
updatedAt: "2025-03-05T14:52:00.02Z"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 方法 {#methods}

### VRCPlayerApi.GetDrone
获取属于目标玩家的无人机 API。

**输出**
- `VRCDroneApi`


### VRCDroneApi.GetPlayer
获取目标无人机所拥有的玩家。

**输出**
- `VRCPlayerApi`

## 事件 {#events}

### OnDroneTriggerEnter
当无人机进入触发器时调用此事件。

**输出**
- `VRCDroneApi`


### OnDroneTriggerExit
当无人机离开触发器或在触发器内被销毁时调用此事件。

**输出**
- `VRCDroneApi`


### OnDroneTriggerStay
当无人机停留在触发器内时调用此事件。

**输出**
- `VRCDroneAPi`
