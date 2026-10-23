# 数据容器 {#data-containers}

数据容器以多种不同格式存储[数据令牌](/worlds/udon/data-containers/data-tokens)，既可以作为顺序排列的[数据列表](/worlds/udon/data-containers/data-lists)，也可以作为键值对形式的[数据字典](/worlds/udon/data-containers/data-dictionaries)。它们在功能上类似于 C# 的 List 和 Dictionary。

反过来，DataToken 可以存储你可能需要的任何其他值。每个令牌只存储一个变量，且仅存储一个变量，但该变量可以包含另一个完整的数据字典或数据列表，以支持嵌套。

此外，数据容器兼容 [VRCJSON](/worlds/udon/data-containers/vrcjson)，这使你可以将数据转换为标准 JSON 格式或从该格式转换回来，这些数据可能来自[远程字符串加载](/worlds/udon/string-loading)之类的外部来源。

import DocCardList from '@theme/DocCardList';

<DocCardList />
