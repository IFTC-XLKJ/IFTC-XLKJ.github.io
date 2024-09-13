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
控制台输出 *content*
### 用法
print(content)