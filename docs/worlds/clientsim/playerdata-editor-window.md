# PlayerData 编辑器 {#playerdata-editor}

ClientSim 可以模拟 VRChat SDK 的“Persistence”功能。PlayerData 编辑器窗口允许你调试世界中的持久化数据。你可以通过“VRChat SDK”>“ClientSim PlayerData”打开它。

## 用法 {#usage}

![ClientSim PlayerData 窗口](/img/worlds/clientsim/clientsim-player-data-window.png)

1. 用于选择要显示哪位玩家的 PlayerData 的下拉菜单。
	* 默认情况下，选中的是本地玩家。
	 * 如果在播放模式中已生成远程玩家，也可以选中他们。
2. 所选玩家的 PlayerData 键、值和数据类型的列表。
	* 随着 PlayerData 的更新，显示内容会实时刷新。
3. “Clear All PlayerData”会删除当前场景的所有 PlayerData。
	* 例如，当你改变了世界使用 PlayerData 的方式时，可以用它来“重新开始”。
4. “Refresh”允许你刷新 PlayerData 列表。
	* 你可以手动查看或编辑场景的 JSON 文件。在播放模式下，改动会立即生效，但你必须点击“Refresh”按钮才能看到变化。
5. “Open Local Data Folder”会打开 ClientSim 存放此场景持久化数据 JSON 文件的文件夹。
	* 如果你的脚本使用了 PlayerData，ClientSim 会自动创建 JSON 文件。它们保存在你的项目中，并在各次播放模式会话之间保留。
	* PlayerData 文件是按场景独立的。每个使用 PlayerData 的场景都会有一个与之关联的 JSON 文件。场景名称用于建立这种关联：如果你重命名了场景并希望保留数据，就必须把对应的 JSON 文件也重命名为新的场景名称。
7. “Add Test Data For Remote Player”允许你为远程玩家创建 PlayerData。
	* 只有在播放模式中选中了远程玩家且本地玩家已有数据时，才会显示此按钮。
	* 由于 PlayerData 只能为本地玩家设置，此按钮会复制本地玩家的测试数据 JSON 文件，并随机化每个值。这里的假设是：PlayerData 的结构在各玩家之间应当一致，但值可以不同。
	* 以这种方式创建测试数据会发布相应的 OnPlayerDataUpdated 事件，让创作者可以验证其世界是否能正确处理多个玩家之间的数据更新。
	* 每次点击该按钮时，远程玩家的数据都会重新随机化。

PlayerData 的数据可以在项目根目录中找到（与 Assets 文件夹同级，而不是在其内部），路径为 `<root>/ClientSimStorage/PlayerData`。
