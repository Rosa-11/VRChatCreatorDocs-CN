# Udon世界中的物品 {#items-in-udon-worlds}

你的世界中的用户可以生成**物品**，这些物品是增强用户体验的工具、玩具和小装置。为物品的存在做好准备很重要。

:::note
物品是一项新功能，可能会对某些世界产生意外影响。如果它们破坏了功能，你可以暂时[禁用它们](#disabling-items-in-your-worlds)。

我们的目标是修复与物品和世界相关的问题，以便所有创作者都能启用它们！
:::


## 在你的世界中禁用物品 {#disabling-items-in-your-worlds}

如果物品在你的世界中引发问题，你可以按照以下步骤禁用它们：
1. 访问[My Worlds](https://vrchat.com/home/content/worlds)页面，并在需要时登录。
2. 按下你的世界的缩略图以打开其“Edit”页面（如果按下标题，你将进入世界的详细信息页面，在那里你可以按下“Edit”按钮进入此页面）。
3. 在“Default Content Settings”列表中，找到“Items Enabled”。它默认启用，这意味着用户可以在此世界中生成物品。

![已启用物品的World Details页面](/img/worlds/items/items-worldinfo-enabled.png)

4. 按下按钮以禁用物品，并使用下方的文本框解释你需要禁用物品的原因。
![已禁用物品的World Details页面](/img/worlds/items/items-worldinfo-disabled.png)

5. 滚动到页面顶部并按下“Save”。

## 在世界镜子中显示物品 {#showing-items-in-world-mirrors}

物品生成在“Item”图层上，该图层在旧版SDK中曾名为“reserved3”。如果图层未被更改，最新版本的[VRCMirror预制件](/worlds/sdk-prefabs/#vrcmirror)会正确反射物品。

但是，如果你的世界使用旧版SDK或镜子预制件，或者你更改了VRCMirror预制件中的图层，你的镜子可能不会反射物品。这是因为镜子未配置为反射（以前未使用的）“reserved3”图层。

![一面忽略手持物品的镜子](/img/worlds/items/items-mirror-ignore.png)

如果物品没有出现在你世界的镜子中，请将“Item”图层添加到镜子的“Reflect Layers”下拉菜单中。（在旧版SDK中，选择“reserved3”同样有效。）

![在镜子中启用物品反射](/img/worlds/items/items-enable-mirror-layer.png)

## 在物理方法中避免物品 {#avoiding-items-in-physics-methods}

你世界中的Udon程序无法引用物品。如果你的某个脚本找到物品，它会表现为`null`对象。如果UdonBehaviour尝试处理物品，它会抛出异常并禁用自身，因此最好避免物品。

以下两个提示应能通过避免物理方法中的物品来保持你的Udon逻辑运行：
1. 尽可能使用[LayerMask](https://docs.unity3d.com/ScriptReference/LayerMask.html)，并避开“Item”图层（以前是“reserved3”）。
2. 对通过物理调用返回的任何对象调用`Utilities.IsValid`，并查找`true`结果，以确保你不会进一步操作“受保护”的对象。有关应执行此操作的所有方法的列表，请参阅[物理和图层](/worlds/layers#physics-and-layers)。
