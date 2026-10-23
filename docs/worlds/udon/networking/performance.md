# 性能考量 {#performance-considerations}

## 简介 {#introduction}
高效的网络是实现 VRChat 中流畅多人体验的关键。优化不佳的联网对象会导致带宽占用增加、卡顿和不同步问题。本指南提供了确保你的网络逻辑得到优化的最佳实践。

## 何时使用变量、何时使用事件 {#when-to-use-variables-vs-events}

### **变量（同步数据）** {#variables-synced-data}
对于需要在所有玩家之间复制的持久状态，请使用同步变量，例如：
- 游戏中的玩家得分。
- 门的打开/关闭状态。
- 任何需要可供[后加入的玩家](/worlds/udon/networking/late-joiners)使用的数据。

#### **最佳实践：** {#best-practices}
- 仅当小更新频繁发生时才使用**连续同步**（例如进度条）。
- 对于必须始终准确的数据，请使用**手动同步**（例如排行榜）。
- 避免过度使用同步变量，因为过多的同步消息会导致带宽尖峰。

### **事件（临时操作）** {#events-temporary-actions}
对于无需持久、也无需被后加入的玩家接收的一次性操作，请使用事件，例如：
- 按下按钮时播放动画。
- 开枪或触发音效。
- 生成临时的视觉效果。

#### **最佳实践：** {#best-practices-1}
- 谨慎使用 `SendCustomNetworkEvent(NetworkEventTarget.All, "EventName")`。
- 避免使用事件来持久化状态（例如在没有同步变量的情况下将门设为打开状态）。
- 对于不需要联网的效果，请考虑使用仅本地逻辑。

## 减少带宽占用 {#reducing-bandwidth-usage}
### **避免不必要的同步** {#avoid-unnecessary-syncing}
- **限制联网对象的更新**：仅在值发生显著变化时才发送更新。
- **优化物理交互**：除非必要，否则不要对刚体进行网络同步。
- **使用插值/外推**来平滑运动，而不是发送频繁的位置更新。

### **优化变量同步** {#optimizing-variable-syncing}
- 尽可能将**相关变量分组**到数组中。
- **尽量减少浮点精度**（例如避免同步不必要的高精度数值）。
- 在同步多个布尔值时**使用二进制标志**。

## 所有权与对象同步的最佳实践 {#best-practices-for-ownership--object-sync}
- 仅在需要时转移所有权（例如对于拾取物之类的可交互对象）。
- 避免频繁交换所有权，因为这会引入延迟并可能导致不同步。

## 测试与调试性能 {#testing--debugging-performance}
- **使用调试 GUI（`--enable-debug-gui`）**来监控带宽和同步行为。
- **在真实的多人条件下测试**，以观察不同延迟环境下的网络行为。
- **对网络消息进行性能分析**，以确保尽可能减少冗余数据传输。

## 后续步骤 {#next-steps}
如需进一步了解如何优化网络，请探索以下相关指南：
- [调试联网对象](/worlds/udon/networking/debugging)
- [对象所有权与转移](/worlds/udon/networking/ownership)
- [使用变量进行同步](/worlds/udon/networking/variables)

