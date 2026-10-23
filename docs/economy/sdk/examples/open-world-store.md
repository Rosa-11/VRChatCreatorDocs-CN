---
description: "打开你的世界商店。"
sidebar_position: 1
sidebar_custom_props:
    customIcon: 🏪
---

# Open World Store

OpenWorldStore 预制件为访客提供了一种便捷的方式来访问你的世界商店。自定义其外观以吸引访客并突出你的商店。

你可以访问 [Open World Store 示例世界](https://vrchat.com/home/world/wrld_fef974b9-fe44-4731-8bd1-7629e80eccc9)亲自看看它的效果。请注意，商店中有一个真实可用的商品——不要购买它！

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

## 包含的预制件 {#prefabs-included}
* **OpenWorldStorePrefab**：一台自动售货机，当用户与之交互时会打开世界商店。包含可自定义的图案和交互文本。

![OpenWorldStorePrefab](/img/economy/examples/OpenWorldStore_Prefab.png "演示场景中的 OpenWorldStorePrefab 模型")

## 如何使用 {#how-to-use}

1. 创建一个[世界商店](/economy/store/world-store)，发布该商店，并添加至少一个已发布的商品。
2. 设置你希望用户在靠近预制件时看到的 Interaction Text。

![OpenWorldStoreInteractionText](/img/economy/examples/OpenWorldStore_InteractionText.png)

3. 在 "Door Graphic" 选择器中选取一张纹理，设置你希望显示在自动售货机正面的 Door Graphic。

![OpenWorldStoreDoorGraphic](/img/economy/examples/OpenWorldStore_DoorGraphic.png)

4. 构建并发布（Build & Publish）你的世界。
  - "Build & Test" _不会_ 允许你打开世界商店。你必须使用 "Build & Publish" 才能在 VRChat 中测试你的世界商店。
  - 如果你要将世界商店添加到现有的世界，应当 "Build & Publish" 到一个新的世界 ID。这样你可以先将预制件测试好，再发布到现有的世界。

## 创建新的门面图案 {#creating-a-new-door-graphic}

你可以使用 Photoshop 或任何其他图像编辑器来创建图案。

### 使用 Photoshop {#using-photoshop}

示例中包含一个便于编辑的 Photoshop 文件，路径为 `Assets/Examples/OpenWorldStore/Prop_VendingMachine/Textures/glass_Screen_TEMPLATE.psd`。

![OpenWorldStorePhotoshopTemplate](/img/economy/examples/OpenWorldStore_PhotoshopTemplate.png)

1. 用代表你的商品的图案替换 "REPLACE ME!" 图层的内容。
2. 用你自己的文字更新 "FeaturedText" 图层中的文本。
3. 根据需要编辑任何其他图层，同时保持图案的整体尺寸和遮罩不变。
4. 将你的新版本导出为带透明度的 24 位 PNG——你可以直接将其保存到项目的 Assets 文件夹中。

### 使用其他图像编辑器 {#using-another-image-editor}

示例中包含一个便于编辑的 PNG，路径为 `Assets/Examples/OpenWorldStore/Prop_VendingMachine/Textures/glass_Screen_UV_Map`。

1. 在图像编辑器中打开 "glass_Screen_UV_Map.png"。
2. 编辑模板的白色区域。你可以添加任何你想要的图案。
3. 将文件保存为带 Alpha 透明度的 24 位 PNG。
4. 将文件移入你的项目。
5. 在 Project 窗口中选择该纹理，并在检视面板中将其 Alpha Source 设置为 "Input Texture Alpha"。
6. 将文件从项目窗口拖放到 OpenWorldStorePrefab 检视面板中的 "Door Graphic" 输入槽中。
