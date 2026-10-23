# 外部 URL {#external-urls}
Udon 可以使用外部 URL 来加载远程内容。URL 必须包裹在 [VRCUrl](#vrcurl) 对象中。用户可以在运行时将 URL 输入到 `VRCUrlInputField` 组件中，世界创作者也可以随上传的世界提供预定义的 VRCUrl。

## 允许列表 {#allowlist}
出于安全原因，VRChat 限制了外部 URL 的使用方式。默认情况下，只有当 [VRCUrl](#vrcurl) 位于 VRChat 的域名允许列表中时，才能访问它。
如果某个 URL **不**在其类型所需的允许列表中，则除非用户在 VRChat 设置中选择“Allow Untrusted URLs”，否则无法使用它。这允许 Udon 使用来自 `VRCUrlInputField` 组件的不受信任 URL，以及随世界一起上传的任何 `VRCUrl`。

|                                           | 在允许列表中 | 不在允许列表中                   |
| ----                                      | ----         | ----                               |
| 用户将 `VRCUrl` 输入到输入字段     | ✔允许     | ⚠ 需要“Allow Untrusted URLs” |
| Udon 在运行时之前声明 `VRCUrl` | ✔允许     | ⚠ 需要“Allow Untrusted URLs” |

## VRCUrl
`class VRC.SDKBase.VRCUrl`

### 构造函数 {#constructor}
| 名称 | 摘要 |
| --- | --- |
| VRCUrl(string url) | 接受 URL 作为输入的构造函数。注意，此构造函数只能在*编辑器时*调用。 |

### 属性 {#properties}
| 静态 | 类型 | 名称 | 摘要 |
| :---: | --- | --- | --- |
| ✔️ | [VRCUrl](#vrcurl) | Empty | 一个空 URL。 |

### 方法 {#methods}
| 静态 | 返回 | 名称 | 摘要 |
| :---: | --- | --- | --- |
|| string | Get() | 获取 URL 的当前字符串值。 |
| ✔️ | bool | IsNullOrEmpty([VRCUrl](#vrcurl) vrcUrl) | 指示指定的 [VRCUrl](#vrcurl) 是否为 null 或引用空字符串（""）。 |
