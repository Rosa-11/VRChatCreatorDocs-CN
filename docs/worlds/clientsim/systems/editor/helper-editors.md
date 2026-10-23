# 辅助编辑器 {#helper-editors}

部分 ClientSim SDK 辅助组件（Helper）带有专门定制的编辑器，可让你深入了解 VRChat 组件。

### SyncableEditorHelper
* 提供用于显示 IClientSimSyncable 当前所有者的辅助方法。它是一个下拉选择器，允许你更改对象的当前所有者。

### ObjectSyncHelperEditor
* 显示在 ObjectSyncHelper 上
* 显示所有者选择下拉菜单

### ObjectPoolHelperEditor
* 显示在 ObjectPoolHelper 上
* 显示所有者选择下拉菜单

### UdonHelperEditor
* 显示在 UdonHelper 上
* 显示所有者选择下拉菜单
* 显示 Udon 程序中所有公共变量的编辑器
* 显示用于对 Udon 程序中每个导出的自定义事件调用 SendCustomEvent 的按钮

### SpatialAudioHelperEditor
* 不显示任何内容，而不是 ONSP 音频的编辑器
