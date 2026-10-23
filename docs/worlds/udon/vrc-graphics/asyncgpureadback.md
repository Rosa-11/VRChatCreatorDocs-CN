import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# AsyncGPUReadback

Unity 中的 AsyncGPUReadback 是一项允许开发者把数据（例如某个特定像素的颜色）从 GPU 上的纹理复制到 CPU 上的代码中的功能。该函数类似于 `Texture2D.GetPixels`，但因为它以异步方式运行，所以不会阻塞主线程上的任务。

通过以异步方式执行数据传输，Unity 确保该过程不会对应用程序的帧率和整体性能产生负面影响。AsyncGPUReadback 能帮助开发者避免渲染管线停顿，因为数据传输在后台进行，与主线程并行。

AsyncGPUReadback 的常见用例包括基于渲染输出生成 CPU 侧数据，例如创建纹理 mipmap 链、实现自定义后处理效果，或为 AI 和计算机视觉目的分析渲染帧。

## Unity AsyncGpuReadback 与 VRCAsyncGpuReadback 的区别 {#differences-between-unity-asyncgpureadback-and-vrcasyncgpureadback}

VRChat 对 AsyncGpuReadback 的实现使用了一个调用 Unity 函数的包装器。这个包装器使用不同的接口。区别如下：

- 不要调用 AsyncGpuReadback，你需要使用 VRCAsyncGpuReadback。
- 不要提供 `Action<AsyncGPUReadbackRequest> callback`，而是提供一个 UdonBehaviour，当回读完成时，该 UdonBehaviour 会收到 `OnAsyncGpuReadbackComplete`。
- 不要在已完成的回读上使用 `GetData`，而是需要使用 `TryGetData`。

关于该功能的其他共同细节，请参阅 Unity 的文档：  
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Rendering.AsyncGPUReadback.Request.html">发起回读请求</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Rendering.AsyncGPUReadbackRequest.html">从回读中获取数据</UnityVersionedLink>

## 使用 VRCAsyncGpuReadback {#using-vrcasyncgpureadback}

使用 VRCAsyncGpuReadback 时，你需要遵循 4 个主要步骤：

1. 设置要使用的数据数组。
2. 发起 AsyncGpuReadback 请求
3. 在请求完成时接收消息
4. 从请求中取出数据

## Udon Node Graph 示例 {#udon-node-graph-example}

![asyncgpureadback-mu8QGGS.png](/img/worlds/asyncgpureadback-mu8QGGS.png)

## UdonSharp 示例 {#udonsharp-example}

```csharp

using UdonSharp;
using UnityEngine;
using VRC.SDK3.Rendering;
​
public class AGPURB : UdonSharpBehaviour
{
    public Texture texture;
​
    void Start()
    {
        VRCAsyncGPUReadback.Request(texture, 0, this);
    }
​
    public void OnAsyncGpuReadbackComplete(VRCAsyncGPUReadbackRequest request)
    {
        if (request.hasError)
        {
            Debug.LogError("GPU readback error!");
            return;
        }
        else
        {
            var px = new Color32[texture.width * texture.height];
            Debug.Log("GPU readback success: " + request.TryGetData(px));
            Debug.Log("GPU readback data: " + px[0]);
        }
    }
}
```
