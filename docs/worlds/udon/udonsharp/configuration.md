# 配置 {#configuration}

UdonSharp的设置位于`Edit > Project Settings > Udon Sharp`。

![UdonSharp设置窗口](/img/worlds/udon/udonsharp/udon-sharp-settings.png)

## Udon Sharp

### 修改时自动编译 {#auto-compile-on-modify}
启用此项后，脚本在被修改并保存时会自动编译。

### 编译所有脚本 {#compile-all-script}
每当检测到U#脚本发生更改时，编译所有脚本。

### 聚焦时编译 {#compile-on-focus}
仅当编辑器获得焦点且脚本发生更改时才编译。

### 脚本模板覆盖 {#script-template-override}
你可以定义自己的自定义模板，在创建U#脚本时使用。
这可以通过将脚本拖入`Script template override`字段来完成，之后创建新的U#脚本时将使用该模板。

`<TemplateClassName>`可用于根据你提供的文件名设置类名。

**默认模板**
```cs
using UdonSharp;
using UnityEngine;
using VRC.SDKBase;
using VRC.Udon;

public class <TemplateClassName> : UdonSharpBehaviour
{
    void Start()
    {
        
    }
}
```

## 调试 {#debugging}

### 调试构建 {#debug-build}
启用或禁用`Inline Code`和`Listen for client exceptions`

### 内联代码 {#inline-code}
在生成程序集代码中包含C#内联代码。

### 监听客户端异常 {#listen-for-client-exceptions}
这将监听VRChat客户端输出日志中的异常，然后尝试将其与项目中的脚本进行匹配。

[在此处了解有关如何设置的更多信息](https://github.com/vrchat-community/UdonSharp/wiki/class-exposure-tree)
