# TextMesh Pro

[TextMesh Pro](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/index.html) 是一个在Unity和VRChat世界中显示高质量2D和3D文本的工具。目前，以下组件已暴露给Udon：

- [TMP Text](./tmp_text)（TextMeshProUGUI和TextMeshPro）
- [TMP Dropdown](./tmp_dropdown)
- [TMP InputField](./tmp_inputfield)

你也可以使用VRChat [世界组件白名单](/worlds/whitelisted-world-components#text-mesh-pro)中的其他TextMeshPro组件，但它们无法在Udon中使用。

:::caution

避免使用Unity内置的[文本组件](https://docs.unity3d.com/2018.1/Documentation/ScriptReference/UI.Text.html)。

- Unity内置的文本会出现锯齿，并且限制为16250个字符。
- TextMesh Pro具有更好的文本渲染效果、支持[富文本](http://digitalnativestudios.com/textmeshpro/docs/rich-text/)，并且没有字符数限制。

:::

## 安装 {#installation}

TextMesh Pro包内置于Unity编辑器中。当你在项目中首次使用它时，Unity会提示你将必要的文件添加到你的"Assets"文件夹。
例如，创建任何TMP组件都会显示以下提示：

![TextMesh Pro导入必要资源的提示。](/img/worlds/components/textmeshpro-essentials.png)

也可以通过选择"Window" > "TextMeshPro" > "Import TMP Essential Resources"来导入TextMesh Pro的资源。

## 导入字体 {#importing-fonts}

TextMesh Pro包含一个名为"LiberationSans SDF"的默认字体。这让你可以立即开始使用TextMesh Pro。

你可以使用[字体资源创建器](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/FontAssetsCreator.html)将自己的字体导入TextMesh Pro。这会生成一个字体资源，你可以在TextMesh Pro组件中使用它。

<div class="video-container">
    <iframe src="https://www.youtube.com/embed/qzJNIGCFFtY?si=JsAJMtzdp3KC-8tJ" title="TextMesh Pro - Font Asset Creation" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

:::tip 优化你的字体资源！

字体资源会增加你世界的下载大小和内存需求。导入字体时，请降低图集分辨率，并且不要导入未使用的字符。

:::

## 使用VRChat内置的后备字体 {#using-vrchats-built-in-fallback-font}

当你将[字体导入](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/FontAssetsCreator.html)TextMeshPro时，它通常不会包含所有Unicode字符。如果你的世界中包含字体资源中不存在的字符串或用户名，TextMeshPro将无法渲染它们。例如，你可能看到"□□□"而不是"何？！"。

要使用VRChat的TextMeshPro后备字体，请转到"Project Settings" > "TextMeshPro settings"，移除所有"Fallback Font Assets"。

这会让你的TextMeshPro组件使用VRChat的后备字体。当你在VRChat中访问你的世界时，几乎所有Unicode字符都能正确渲染。

![配置正确时，缺失的Unicode字符在Unity编辑器中会显示为方块，但在将你的世界上传到VRChat后会正确显示。](/img/worlds/components/textmeshpro-editor-vs-fallback-vrchat.png)

## 另请参阅 {#see-also}

- [TextMeshPro文档](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/api/TMPro.html)（Unity脚本API）
- [Unity中的文本 - 使用TextMesh Pro](https://learn.microsoft.com/en-us/windows/mixed-reality/develop/unity/text-in-unity)（Microsoft Learn）
