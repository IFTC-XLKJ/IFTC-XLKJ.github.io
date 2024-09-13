# 快捷函数(全局)
版本：***20240914***

## querySelector(selector[string])
用于获取选择器为 *select* 的1个元素
### 用法
```JavaScript
let element = querySelector(selector)
```

## querySelectorAll(selector[string])
用于获取选择器为 *select* 的所有元素
### 用法
```JavaScript
let elements = querySelectorAll(selector)
```

## loadScript(url[string])
加载链接为 *url* 的脚本文件
### 用法
```JavaScript
loadScript(url)
    .then(success => {
        console("脚本加载成功：", success);
    })
```

## print(content[string])
控制台输出日志 *content*
### 用法
```JavaScript
print(content)
```
## warn(content[string])
控制台输出警告 *content*
### 用法
```JavaScript
warn(content)
```
## error(content[string])
控制台输出错误 *content*
### 用法
```JavaScript
error(content)
```
## readFileAsDataURL(file[File])
读取文件为 *file* 的dataURL， *file* 是File对象中的第n个文件
### 用法
```JavaScript
readFileAsDataURL(file)
    .then(data => {
        console.log("dataURL", data);
    })
```
## parseXmlToJsonObject(xmlStr[string])
将 *xmlStr* 的XML转换成JSON，支持中文字符
### 用法
```JavaScript
let json = parseXmlToJsonObject(xmlStr)
```
## mathRandomInt(a[number], b[number])
在 *a* 和 *b* 之间取随机整数
### 用法
```JavaScript
let number = mathRandomInt(a, b)
```
## nowTimestemp()
获取当前时间的时间戳
### 用法
```JavaScript
let timestamp = nowTimestamp();
```
## getYear(timestamp[number])
获取时间戳为 *timestamp* 的年份
### 用法
```JavaScript
let year = getYaer(timestamp)
```
## getMonth(timestamp[number])
获取时间戳为 *timestamp* 的月份
### 用法
```JavaScript
let month = getMonth(timestamp)
```
## getDay(timestamp[number])
获取时间戳为 *timestamp* 的日
### 用法
```JavaScript
let day = getDay(timestamp)
```
## getWeek(timestamp[number])
获取时间戳为 *timestamp* 的周
### 用法
```JavaScript
let week = getWeek(timestamp)
```
## getHours(timestamp[number])
获取时间戳为 *timestamp* 的小时
### 用法
```JavaScript
let hours = getHours(content)
```
## getMinutes(timestamp[number])
获取时间戳为 *timestamp* 的分钟
### 用法
```JavaScript
let minutes = getMinutes(timestamp)
```
## getSeconds(timestamp[number])
获取时间戳为 *timestamp* 的秒
### 用法
```JavaScript
let seconds = getSeconds(content)
```
## createBinFile(array[array], mimeType = "applcation/octet-stream"[string])
通过Uint8Array( *array* )创建一个MIME类型为 *mimeType* 的二进制文件，并返回dataURL
### 用法
```JavaScript
let dataUrl = createBinFile(array)
```
## readBinFile(url[string])
通过 *url* 获取二进制文件的Uint8Array
### 用法
```JavaScript
readBinFile(url)
    .then(array => {
        console.log(array)
    })
```
## getOS()
获取操作系统，返回操作系统名称和版本
### 用法
```JavaScript
let OS = getOS()
```