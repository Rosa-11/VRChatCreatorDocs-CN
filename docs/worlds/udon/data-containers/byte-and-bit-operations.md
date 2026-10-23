---
title: "字节与位操作"
slug: "byte-and-bit-operations"
hidden: false
sidebar_position: 10
createdAt: "2024-02-26T18:00:00.000Z"
updatedAt: "2024-02-26T18:00:00.000Z"
---
# 字节与位操作 {#byte-and-bit-operations}

:::info

本页介绍处理二进制数据的较底层概念，面向进阶创作者。
:::

你可以在 DataToken 上使用 `Bitcast` 方法，在 Udon 中对基元数据类型执行保值类型转换（“不安全转换”）。

一些用于处理原始二进制数据的标准 C# 类也可用，包括 `BitConverter` 和 `Buffer`。

## 示例代码 {#example-code}

```csharp title="Byte and Bit Operations Example, Basic Serializer"
using System;
using System.Text;
using UdonSharp;
using UnityEngine;
using VRC.SDK3.Data;

public class BitConverterExample : UdonSharpBehaviour
{
    void Start()
    {
        //创建测试数据
        int originalInt = 63;
        double originalDouble = 734531.433d;
        string originalString = "Test string";
        float[] originalFloatArray = new float[] { 543, 12.6f, 63.1231f };

        //序列化，然后再反序列化
        byte[] serialized = Serialize(originalInt, originalDouble, originalString, originalFloatArray);
        Deserialize(serialized, out int newInt, out double newDouble, out string newString, out float[] newFloatArray); 
        
        //打印结果，看看是否全部匹配
        Debug.Log($"{originalInt} - {newInt}");
        Debug.Log($"{originalDouble} - {newDouble}");
        Debug.Log($"{originalString} - {newString}");
        Debug.Log($"{originalFloatArray.Length} - {newFloatArray.Length}");
        for (int i = 0; i < originalFloatArray.Length && i < newFloatArray.Length; i++)
        {
            Debug.Log($"{originalFloatArray[i]} - {newFloatArray[i]}");
        }

        //对于单个值，我们也可以使用 DataToken 的 Bitcast 来获得按位访问
        double doubleValue = 123.456d;
        DataToken doubleToken = new DataToken(doubleValue);
        //我们使用 ulong，因为它与 double 的大小相同（8 字节）
        DataToken ulongToken = doubleToken.Bitcast(TokenType.ULong);
        DataToken resultDoubleToken = ulongToken.Bitcast(TokenType.Double);
        Debug.Log($"{doubleToken} - 0x{ulongToken:02X} - {resultDoubleToken}");
    }

    /// <summary>
    /// 一个示例函数，将一组预先确定的数据序列化为字节数组
    /// </summary>
    /// <param name="intValue">将被编码到输出中的整数</param>
    /// <param name="doubleValue">将被编码到输出中的双精度浮点数</param>
    /// <param name="stringValue">将被编码到输出中的字符串</param>
    /// <param name="floatArrayValues">将被编码到输出中的浮点数组</param>
    /// <returns></returns>
    byte[] Serialize(int intValue, double doubleValue, string stringValue, float[] floatArrayValues)
    {
        int size = 0;
        byte[] intBytes = BitConverter.GetBytes(intValue); //将 int 转换为字节
        size += intBytes.Length;
        
        byte[] doubleBytes = BitConverter.GetBytes(doubleValue); //将 int 转换为字节
        size += doubleBytes.Length;
        
        byte[] stringBytes = Encoding.UTF8.GetBytes(stringValue); //将字符串转换为字节
        size += stringBytes.Length;
        Debug.Log($"String byte length {stringBytes.Length}");
        
        byte[] stringLengthBytes = BitConverter.GetBytes(stringBytes.Length); //将字符串长度转换为字节
        size += stringLengthBytes.Length;
        
        byte[] floatArrayLengthBytes = BitConverter.GetBytes(Buffer.ByteLength(floatArrayValues));
        size += floatArrayLengthBytes.Length;
        
        //没有必要把浮点数组转换为字节数组，因为我们可以直接对它进行 BlockCopy
        size += Buffer.ByteLength(floatArrayValues);

        byte[] output = new byte[size]; //分配一个大小正确的数组，以便容纳我们的所有数据项
        int offset = 0;

        Buffer.BlockCopy(intBytes, 0, output, offset, intBytes.Length); //写入 int - 这应占用 4 个字节
        offset += intBytes.Length; //递增偏移量，以便下一项可以写入正确的位置
        
        Buffer.BlockCopy(doubleBytes, 0, output, offset, doubleBytes.Length); //写入 double - 这应占用 8 个字节
        offset += doubleBytes.Length;
        
        Buffer.BlockCopy(stringLengthBytes, 0, output, offset, stringLengthBytes.Length); //写入字符串的长度，以便解码器知道要解码多少内容 - 这应占用 4 个字节
        offset += stringLengthBytes.Length;

        Buffer.BlockCopy(stringBytes, 0, output, offset, stringBytes.Length); //写入字符串 - 这是可变长度的，这就是为什么我们需要在上面编码字符串的长度
        offset += stringBytes.Length;

        Buffer.BlockCopy(floatArrayLengthBytes, 0, output, offset, floatArrayLengthBytes.Length); //写入浮点数组的长度，以便解码器知道要解码多少内容 - 这应占用 4 个字节
        offset += floatArrayLengthBytes.Length;
        
        Buffer.BlockCopy(floatArrayValues, 0, output, offset, Buffer.ByteLength(floatArrayValues)); //写入浮点数组 - 可以直接完成，无需转换为字节数组，因为它本身就是一个 Array
        offset += Buffer.ByteLength(floatArrayValues);
        
        Debug.Log($"Encoded data in {output.Length} bytes");
        return output;
    }

    /// <summary>
    /// 一个示例函数，用于反序列化上面 Serialize 函数中描述的预先确定的一组数据
    /// </summary>
    /// <param name="input">输入字节 - 必须按照上面 Serialize 函数所期望的方式格式化</param>
    /// <param name="intValue">从输入数据中反序列化得到的 int 值</param>
    /// <param name="doubleValue">从输入数据中反序列化得到的 double 值</param>
    /// <param name="stringValue">从输入数据中反序列化得到的 string 值</param>
    /// <param name="floatArrayValues">从输入数据中反序列化得到的浮点数组值</param>
    /// <returns></returns>
    bool Deserialize(byte[] input, out int intValue, out double doubleValue, out string stringValue, out float[] floatArrayValues)
    {
        int offset = 0;
        
        intValue = BitConverter.ToInt32(input, offset);
        offset += 4; //递增偏移量，以便下一项从正确的位置读取。int 应为 4 个字节长
        
        doubleValue = BitConverter.ToDouble(input, offset);
        offset += 8; //double 应为 8 个字节长
        
        int stringLength = BitConverter.ToInt32(input, offset);
        offset += 4; //字符串长度是一个 int，应为 4 个字节长
        
        Debug.Log($"Decoding string length {stringLength} at offset {offset} for buffer length {input.Length}");
        stringValue = Encoding.UTF8.GetString(input, offset, stringLength);
        offset += stringLength; //字符串是可变长度的

        int floatArrayByteLength = BitConverter.ToInt32(input, offset);
        offset += 4; //浮点数组长度是一个 int，应为 4 个字节长
        
        floatArrayValues = new float[floatArrayByteLength / 4]; //创建一个大小正确的新浮点数组，用于接收数据
        Buffer.BlockCopy(input, offset, floatArrayValues, 0, floatArrayByteLength); //将输入中的数据复制到浮点数组中
        
        return true;
    }
}
```
