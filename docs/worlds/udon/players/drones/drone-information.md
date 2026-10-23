---
title: "无人机信息"
slug: "drone-information"
hidden: false
createdAt: "2025-03-05T14:52:00.02Z"
updatedAt: "2025-03-05T14:52:00.02Z"
---
## 无人机 API {#drone-api}

### GetPlayer

获取该无人机的所有者。

**输出**
- `VRCPlayerApi`：拥有该无人机的玩家对象。  

### IsDeployed

获取该无人机是否已在世界中部署。

**输出**
- `bool`：该无人机是否已部署。

### GetPosition

获取该无人机的位置。

**输出**
- `Vector3`：该无人机在世界空间中的位置。  

### TryGetPosition

尝试获取该无人机的位置。

**输出参数**
- `Vector3 position`：该无人机在世界空间中的位置。

**输出**
- `bool`：表示是否成功

### GetRotation

获取该无人机的旋转。

**输出**
- `Quaternion`：该无人机在世界空间中的旋转。  

### TryGetRotation

尝试获取该无人机的旋转。

**输出参数**
- `Quaternion rotation`：该无人机在世界空间中的旋转。

**输出**
- `bool`：表示是否成功

### GetVelocity

获取该无人机移动的速度和方向。

**输出**
- `Vector3 velocity`：该无人机在世界空间中的速度。  

### TryGetVelocity

尝试获取该无人机移动的速度和方向。

**输出参数**
- `Vector3 velocity`：该无人机在世界空间中的速度。

**输出**
- `bool`：表示是否成功

### TeleportTo

设置该无人机的世界位置和旋转。

**输入**
- `Vector3`：该无人机在世界空间中的位置。  
- `Quaternion`：该无人机在世界空间中的旋转。  
- `bool`（可选）：如果设为 false 或留空，远程用户的无人机将直接跳到目标值。如果设为 true，远程用户的无人机将平滑插值到目标值。

### SetVelocity

设置该无人机移动的速度和方向。

**输入**
- `Vector3`：该无人机在世界空间中的速度。  
