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