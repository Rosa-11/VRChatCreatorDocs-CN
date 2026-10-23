# 使用构建与测试 {#using-build--test}

:::note

在阅读本页之前，你应该先阅读[什么是 Udon？](/worlds/udon/#what-is-udon)

:::

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Fvideoseries%3Flist%3DPLe9XHNvXcouQjg5GULWGLj1tMzeythnQi%26start%3D0&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D8yaQY0arCnc&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F8yaQY0arCnc%2Fhqdefault.jpg&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=youtube" width="854" height="480" scrolling="no" title="YouTube 嵌入式播放器" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>
你的世界里有一些简单的功能，只要在编辑器中按下「Play」就能工作——鼠标事件、计时器，以及不需要虚拟形象参与交互或网络的功能。而对于许多有趣的功能，你需要构建一个能在真正的 VRChat 客户端中运行的世界。

## 打开 UdonExampleScene {#open-the-udonexamplescene}

从 VRChat Examples 文件夹中打开 UdonExampleScene——这个场景里有许多很棒的可复用 Udon Graph，你可以从中学习。它已经配置好可以直接使用，所以我们可以用它来确认一切正常。

## 设置你的设置项 {#setting-up-your-settings}

1. 首先创建一个新项目，确认 Worlds SDK 已正确导入，然后通过菜单栏的「VRChat SDK > Show Control Panel」打开 VRChat 控制面板。

![](/img/worlds/using-build-test-e47cc0f-show-control-panel.png)

2. 在「Authentication」标签页输入你的登录信息，然后按下「Sign In」。
![](/img/worlds/using-build-test-8c5c7ff-sign-in.png)

3. 点击 Settings 标签页，找到底部的「VRChat Client」条目。这就是 Unity 用来测试你的世界所使用的 VRChat 客户端。如果你不设置它，你的世界可能无法正确启动。
![](/img/worlds/using-build-test-69f8274-installed-client-path.png)

按下「Edit」打开文件选择器，然后导航到你安装 VRChat 的位置，选择 VRChat.exe 程序。以下是一些可能的默认位置：
* Steam：`C:\Program Files (x86)\Steam\steamapps\common\VRChat\VRChat.exe`
* Oculus：`C:\Program Files\Oculus\Software\Software\vrchat-vrchat\VRChat.exe`
* Viveport：`C:\Viveport\ViveApps\469fbcbb-bfde-40b5-a7d4-381249d387cd\1597468388\VRChat.exe`

4. 切换到「Builder」标签页。我们需要把图层和碰撞矩阵设置成 VRChat 期望的方式。只需按下「Setup Layers for VRChat」按钮，然后在弹出的窗口中按下「Do it!」。
![](/img/worlds/using-build-test-5f05f9b-setup-layers.png)

接下来，对「Set Collision Matrix」按钮做同样的操作。
![](/img/worlds/using-build-test-7ccc247-set-collision-matrix.png)

## 运行你的第一次测试 {#running-your-first-test}

在所有设置都正确之后，我们就可以构建这个场景了。当你按照上面的说明清除了 Builder 标签页中的问题后，就可以使用「Build & Test」按钮了。对于这第一次测试，请开启「Force Non-VR」，然后按下 Build & Test。

![](/img/worlds/using-build-test-8712faf-build-and-test.png)

你的 VRChat 客户端应该会启动并进入这个世界的本地副本，你可以在其中四处走动并尝试各种功能！

![](/img/worlds/using-build-test-2acac91-UdonExampleScene.jpg)

## 启动多个客户端 {#launching-multiple-clients}
为了测试同步的变量和自定义网络事件，你需要让多个人处于同一个世界中。最简单的方法就是使用 Builder 标签页启动多个客户端。关闭你刚刚启动的 VRChat 客户端窗口（如果它还开着），把「Number of Clients」改为 2，然后再次按下 Build and Test。这一次，Unity 会打开两个 VRChat 客户端，两边都是你同一个虚拟形象。你可以在窗口之间切换来控制你的两个虚拟形象，甚至能在两边都看到自己说话。试着玩一下 Synced Variables 区域。第一个加载进来的虚拟形象会成为该实例的 Master，因此也是这些 GameObject 的所有者，所以他们能够更新 UI Elements，而第二个虚拟形象只能看到更新结果。这个场景中唯一的例外是「SyncButtonAnyone」，它会把所有权转移给任何点击它的人。

## 构建与重载 {#build--reload}
在测试许多客户端时，每次你修改世界都要安排窗口并等待 VRChat 登录，会非常麻烦。你可以把「Number of Clients」的启动数量改为 0，从而把「Build & Test」变成「Build & Reload」。

![构建与重载！](/img/worlds/using-build-test-07685ac-build-and-reload.png)

这会构建你世界的新版本，并把所有打开的客户端移动到那个新的本地实例中，完全跳过 VRChat 的启动流程。

如果你想用多个配置文件进行测试，也可以对你自行启动的客户端这样做。你可以使用新的命令行参数 `--watch-worlds` 来开启这一功能。例如，下面的命令会以桌面模式启动 VRChat，使用我的主配置文件，开启完整调试，分辨率为 1920x1080，并开启世界重载。
```shell
VRChat.exe --watch-worlds --profile=0 --no-vr --enable-debug-gui --enable-sdk-log-levels --enable-udon-debug-logging -screen-width 1920 -screen-height 1080
```

:::danger 新建的「Build & Test」客户端不会加入已重载的世界

如果你先用 Build & Reload 启动了一些客户端，然后又选择「Build & Test」来添加更多客户端，它们可能不会加入正确的房间。不过，你只需把客户端数量改回 0，然后使用「Build & Reload」或「Reload Last Build」，就能让它们重新聚集到一起。
:::
