# PlayerObject 编辑器 {#playerobject-editor}

ClientSim 可以模拟 PlayerObject 的工作方式。进入播放模式时，PlayerObject 会被生成出来，其同步的属性也会被恢复。

## 用法 {#usage}

![ClientSim PlayerObject 检视面板](/img/worlds/clientsim/clientsim-playerobject.png)

进入播放模式时，ClientSim 会生成 PlayerObject 并恢复其持久化属性。在[层级视图窗口](https://docs.unity3d.com/Manual/Hierarchy.html)中选择任意 PlayerObject，即可查看其 `ClientSimNetworkingView` 和 `ClientSimNetworkIdHolder` 组件。

`ClientSimNetworkIdHolder` 组件显示某个组件的同步属性的名称和值。

1. **Network Id**：游戏对象的网络 ID。
    - 该属性会在 Unity 加载场景之前被填入。如果存在网络 ID 问题，场景将不会运行。
2. **Network Components**：此游戏对象上已保存组件的列表。
    - 该属性包含此对象的所有持久化数据。

ClientSim 用于 PlayerObject 的数据存储在项目中的 `projectName/ClientSimStorage/PlayerObjects/PlayerObjects_#_SceneName.json`。你可以使用常规的文件浏览器找到该文件。
