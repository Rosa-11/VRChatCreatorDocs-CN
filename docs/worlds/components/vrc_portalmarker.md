# VRC Portal Marker

创建一个通往另一个 VRChat 世界的传送门。用户可以走进传送门前往其他世界。当用户的 VRChat 菜单打开时，他们还可以选择该传送门，以了解更多关于传送门所通往世界的信息。

## 用法 {#usage}

将 World ID 属性设置为某个世界，传送门将通往该世界一个已存在的公开实例。如果不存在公开实例，传送门将通往一个新实例。

要创建一个通往用户主世界或 VRChat Hub 世界的传送门，请使用“World”选项，而不是指定世界 ID。

## 属性 {#properties}

VRC Portal Marker 提供以下属性：

| 参数 | 描述 |
|-----|-----|
| World ID | 要创建传送门的目标世界 ID，例如 `wrld_f995a2eb-7ddc-4558-aef1-815c3b23df6c`。 |
| Custom Portal Name | 覆盖用户在传送门上方看到的世界名称。 |
| World | <ul><li>**None** - 为你上面指定的世界 ID 创建一个传送门。</li><li>**Home** - 创建一个通往用户当前主世界的传送门。</li><li>**Hub** - 创建一个通往 VRChat Hub 世界的传送门。</li></ul> |
