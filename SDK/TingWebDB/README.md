# TinyWebDB类SDK

***注：TinyWebDB站点为https://tinywebdb.appinventor.space***

## 创建一个实例
```JavaScript
const db = new TinyWebDB("你的user", "你的secret")
```

## 获取数据
```JavaScript
db.get(tag)
    .then(data => {
        console.log(data)
    })
```

## 更新(新增)数据
```JavaScript
db.update(tag, value)
    .then(data => {
        console.log(data)
    })
```

## 删除数据
```JavaScript
db.delete(tag)
    .then(data => {
        console.log(data)
    })
```

## 获取数据总数
```JavaScript
db.count()
    .then(data => {
        console.log(data)
    })
```

## 查询数据
```JavaScript
db.search(no, count, tag, type[both, tag, value])
    .then(data => {
        console.log(data)
    })
```