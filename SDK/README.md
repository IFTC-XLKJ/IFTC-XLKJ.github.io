# 图片查看器
需先导入 https://iftc-xlkj.github.io/SDK/ImgViewer.css 文件，否则排版会出错，CSS允许修改颜色之类的，乱修改容易导致排版出错

使用方法：
```JavaScript
//创建一个实例
const imgViewer = new ImgViewer();
//打开图片查看器
imgViewer.__createViewer__({图片路径});
//事件
    //关闭
    imgViewer.onclose = () => {
        console.log("图片查看器已被关闭");
    }
```