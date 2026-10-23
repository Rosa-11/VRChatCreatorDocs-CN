# 持久化 {#persistence}

## 什么是持久化？ {#what-is-persistence}

持久化让世界能够保存最高分、物品栏、玩家的最后位置、货币、解锁内容、偏好设置等等。当玩家离开世界并在之后返回时，Udon 可以访问他们保存的数据。

这些数据存储在 VRChat 的服务器上，并且可以在所有平台以及同一个世界的所有实例中访问。它与用户账号绑定，因此如果玩家在完全不同的设备上访问某个世界，Udon 仍然可以访问该世界的数据。

使用持久化的主要方式之一是[玩家数据（PlayerData）](/worlds/udon/persistence/player-data)。PlayerData 是一个与每位玩家关联的键值存储系统。任何脚本都可以访问这些数据，它能够存储所有整数类型、浮点数、双精度浮点数、向量、颜色、字符串和字节数组。

持久化还包含[玩家对象（PlayerObject）](/worlds/udon/persistence/player-object)。任何带有此组件的游戏对象都会自动为每位玩家实例化。Udon 脚本可以挂载到 PlayerObject 上，如果为它们添加了 `VRCEnablePersistence` 组件，那么这些对象上所有同步的数据都将持久化。PlayerObject 在持久化之外也有许多用途，其用途类似于按玩家划分的对象池。它们可以用于任何应当与实例中每位玩家绑定的内容，例如生命值条、战斗系统的碰撞体，以及无需转移所有权的健壮网络系统。

## 使用持久化的示例 {#examples-of-using-persistence}

浏览我们的[持久化示例](/worlds/examples/persistence)，在 Unity 中体验持久化。所有示例均可在 [Example Central](https://creators.vrchat.com/sdk/example-central/) 中找到。

## 持久化的用户数据 {#persistent-user-data}

由持久化保存的数据称为「用户数据（User Data）」。持久化有两种 Udon 可以从 VRChat 服务器保存和加载的用户数据：

- [玩家数据（PlayerData）](/worlds/udon/persistence/player-data)是一个键值数据库，允许 Udon 脚本保存和加载用户数据。
- [玩家对象（PlayerObject）](/worlds/udon/persistence/player-object)是会为每位玩家自动实例化自身的游戏对象。如果为它们标记了 `VRCEnablePersistence` 组件，那么它们所有同步的 Udon 变量都可以持久化。

## 不同环境中的数据存储 {#data-storage-in-different-environments}

如果你在开发过程中测试世界，用户数据会存储在不同的位置：

- **已上传的世界**：
	- 持久化数据存储在 VRChat 与你的账号关联的服务器上。你可以在任何设备上访问你的世界，数据都可用。
	- 如果你在同一账号下同时多次打开 VRChat 并进入同一个世界，可能会导致冲突，并意外覆盖你自己的数据。
- **[本地测试世界](/worlds/udon/graph/#running-build--test)**
	- 如果你使用「构建与测试（Build & Test）」，用户数据会存储在本地。
		- 当你启动测试客户端时，它启动时不带任何用户数据。
		- 当你重新加入或使用「构建与重载（Build & Reload）」时，用户数据**不会**被重置。
		- 当你关闭测试客户端时，它会删除其用户数据。
	- 如果你将「客户端数量（Number of Clients）」设置为两个或更高，用户数据会为每个测试客户端分别存储。
- **ClientSim**
	- 持久化数据存储在项目内的 JSON 文件中
	- 更多详情请参阅 [ClientSim 持久化文档](/worlds/clientsim/)。

## 限制 {#limitations}

在你的世界中使用持久化时，请考虑以下限制：

- 每个世界可以在 VRChat 的服务器上为每位玩家存储 100 千字节（KB）的 PlayerData 和 100 KB 的 PlayerObject 数据。
	- VRChat 以压缩格式存储用户数据。如果你世界的数据易于压缩，你或许能够存储超过 300 KB 的数据（由 VRChat 压缩至 100 KB）。
	- 你无法保存会导致超出此限制的数据。此时 VRChat 会记录一条错误，你的数据不会被保存。请减小数据大小以避免此问题。
- 本地玩家的用户数据必须在其离开世界之前保存。持久化数据无法在本地玩家的 [OnPlayerLeft](https://creators.vrchat.com/worlds/udon/graph/event-nodes/#onplayerleft) 事件中保存。
- 持久化数据无法在不同世界之间共享。
- 持久化没有内置的「存档槽」功能。不过，世界创作者可以使用 Udon 在自己的世界内构建存档槽系统。

## 制作持久化预制件 {#making-persistent-prefabs}

在制作具有持久化行为的预制件时，务必考虑它们将如何与创作者项目中的其他预制件交互。

首先，考虑使用 PlayerObject 而不是 PlayerData，后者更适合_大多数_预制件。PlayerObject 可以很好地包含在预制件的层级视图中，更适合持久化大量数据和/或频繁变化的数据。请记住，
当你为本地玩家更改**任何** PlayerData 时，他们**所有**的 PlayerData 都会被发送，包括未发生变化的数据。世界中每个使用 PlayerData 的预制件都会添加到这个集合中，并且每次都需要发送，这可能会迅速增加世界中的网络用量，并可能导致带宽问题。

如果 PlayerData_仍然_是你预制件某些数据的更好选择，请考虑为你预制件使用的所有键添加前缀。例如，Momo 的持久化后处理设置可以选用前缀「Momo-PPP-」，然后使用以下键：
- Momo-PPP-BloomAmount
- Momo-PPP-Vignette
- Momo-PPP-Weight

这种方法将大大降低名称与其他预制件冲突的可能性。例如，上面这个「Weight」键，如果你有两个不同的预制件都带有「Weight」参数，就很容易出现问题，但其他预制件使用「Momo-PPP」作为前缀的可能性并不大。

## 重置用户数据 {#reset-user-data}

:::danger

这是不可逆的！删除用户数据后，你无法将其恢复。

:::

你可以删除自己的持久化用户数据。这让你（或你的玩家）能够「重新开始」，或解决技术问题。

重置用户数据有多种方式，既可以在 VRChat 中进行，也可以在我们的网站上操作。
### 在 VRChat 中 {#in-vrchat}

在 VRChat 中重置用户数据是最简单的方式。

#### 特定世界 {#a-specific-world}

你可以按照以下步骤删除你在任意世界中的用户数据：

1. 在 VRChat 的主菜单中选择一个世界。
2. 向下滚动到「Actions」部分。
3. 选择「Reset User Data」。
    - 仅当你在此世界中有用户数据时，此按钮才会显示。
5. 选择「YES, RESET」。

如果你当前正处于一个持久化世界中，你可能需要先离开或重新加入该世界，然后才能重置用户数据。

#### 所有世界 {#all-worlds}

你也可以按照以下步骤删除你在所有已访问世界中的用户数据：

1. 在 VRChat 的主菜单中打开你的设置。
2. 选择「Debug」部分。
3. 向下滚动到「User Data」部分。
4. 选择「Reset All User Data」
5. 选择「YES, RESET」。

### 在 VRChat 网站上 {#on-the-vrchat-website}

你可以在 VRChat 网站上重置你的用户数据。请确保你拥有一个 VRChat 账号。如果你只有 Meta、Pico 或 Viveport 账号，你必须先[将其链接到 VRChat 账号](https://help.vrchat.com/hc/en-us/articles/360062659053-I-want-to-turn-my-platform-account-through-Steam-Meta-Pico-or-Viveport-into-a-VRChat-account)。

#### 特定世界 {#a-specific-world-1}

你可以按照以下步骤重置你在特定世界中的用户数据：

1. 打开 [VRChat.com 上的一个世界。](https://vrchat.com/home/world/wrld_4432ea9b-729c-46e3-8eaf-846aa0a37fdd)
2. 向下滚动到「User Data」部分
    - 如果你在该世界中没有用户数据，则不会显示此部分。
4. 点击 **Reset User Data**。
5. 阅读警告后，点击 **Yes** 进行确认。

#### 所有世界 {#all-worlds-1}

你可以访问 VRChat 网站，重置你在所有已访问世界中的用户数据：

1. 打开 [VRChat.com 上的设置页面。](https://vrchat.com/home/profile)。
2. 向下滚动到 **Persistent Data** 部分。
3. 点击 **Reset All User Data**。
4. 阅读警告后，点击 **Yes** 进行确认。
