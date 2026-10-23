# 设置窗口 {#settings-window}

设置窗口显示所有可编辑的 [ClientSim Settings](../runtime/settings.md)。其中一些值无法在运行时更改。还有一个用于生成远程玩家的按钮，以及一个用于为这些远程玩家指定自定义名称的文本字段。
可以通过“VRChat SDK/Utilities/ClientSim”选项打开设置窗口。

## 项目设置警告 {#project-setting-warnings}

如果 Unity 项目设置与运行 ClientSim 所需的不匹配，将针对每个无效的项目设置显示警告。

## 项目设置配置 {#project-settings-setup}

ClientSim 需要特定的 Unity 项目设置才能正常运行。这些设置并非项目默认值，需要用户操作才能修改。ClientSim 设置窗口会显示当前不正确的项目设置，并提供按钮将项目更新为正确的设置。此行为与 CyanEmu 不同，后者在每次程序集重载时都会自动强制更新项目设置。

### 输入管理器设置不正确 {#input-manager-settings-are-incorrect}
ClientSim 需要新的 Unity 输入系统。导入此包后，它会要求用户启用它并重启 Unity。此对话框中的任一选项都不是 ClientSim 的正确设置，用户必须同时启用旧输入和新输入。在设置窗口中点击“Do it!”按钮将设置正确的输入并强制重启 Unity。

### 输入轴与 VRChat 的不同 {#input-axes-differ-from-vrchats}
虽然在 ClientSim 内部不使用，但这有助于用户测试在 Udon 程序中获取输入。

### 未设置音频空间化器 {#audio-spatializer-not-set}
ClientSim 依赖 Oculus Audio Spatializer。

### 未设置项目图层和碰撞矩阵 {#project-layers-and-collision-matrix-not-set}
用户必须打开 VRChat Build Control Panel 才能正确设置此项。
