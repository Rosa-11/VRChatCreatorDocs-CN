# TooltipManager

TooltipManager 会在世界中给定可交互对象的上方显示文本。ClientSim 中的工具提示只显示文本，而 VRChat 还会显示使用该交互所需的对应按钮图标。在 SDK3 中，似乎为交互对象设置工具提示位置的选项会被忽略。工具提示始终显示在交互对象上第一个碰撞体的顶部中央。可显示的工具提示数量没有固定限制，但通过 ClientSim 预期只会显示 2 个工具提示，每只玩家手各一个。可以在 [ClientSimSettings](settings.md) 中禁用工具提示的显示。
