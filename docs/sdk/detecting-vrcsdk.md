import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';
import UnityVersionedLink  from '@site/src/components/UnityVersionedLink.js';

# 检测VRChat SDK {#detecting-the-vrchat-sdk}

在Unity项目中检测VRChat SDK有多种方式。在开发不依赖VRChat SDK、但可能仍希望使用[VRChat的SDK API](/sdk/public-sdk-api)的Unity工具或库时，这会很有帮助。

## 使用版本定义 {#using-version-defines}

检测VRChat SDK的最佳方式是在程序集定义文件中使用<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/ScriptCompilationAssemblyDefinitionFiles.html#define-symbols">版本定义</UnityVersionedLink>。

当安装了`com.vrchat.base`、`com.vrchat.avatars`或`com.vrchat.worlds`时，你可以在程序集中定义符号。
建议仅在已安装的VRChat SDK版本与你的工具兼容时，才使用“Expression”属性来定义符号。
关于VRChat SDK的版本管理，请参阅[Creation Companion文档](https://vcc.docs.vrchat.com/vpm/packages/#brandingbreakingbumps)。

由于版本定义是UPM包的功能，因此此方法仅适用于基于VPM的SDK，Unity会将其视为UPM包。
如果你还想检测旧版基于`.unitypackage`的SDK，请使用下面的旧版方法，定义与VRCSDK相同的符号，或将以下代码添加到每个文件中：

```csharp
#if !YOUR_VRCSDK3_AVATARS && !YOUR_VRCSDK3_WORLDS && VRC_SDK_VRCSDK3
    #if UDON
        #define YOUR_VRCSDK3_WORLDS
    #else
        #define YOUR_VRCSDK3_AVATARS
    #endif
#endif
```

## 使用旧版VRCSDK定义的脚本符号（已弃用） {#using-scripting-symbols}

检测VRChat SDK安装情况的另一种方法是使用VRCSDK定义的脚本符号。
对于所有VRCSDK项目，都会定义`VRC_SDK_VRCSDK3`；对于世界项目，还会定义`UDON`。

此方法已弃用，并将在未来移除。不要仅依赖此方法。

在旧版VRChat SDK中，`VRC_SDK_VRCSDK3`和`UDON`符号被内部使用。但由于这些符号在整个项目中有效，许多工具依赖这些符号来检测VRChat SDK。

目前，在VRChat SDK中，所有这些符号的用法都已迁移到版本定义。请尽快迁移到版本定义！

