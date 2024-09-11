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
    //重置
    imgViewer.onreset = () => {
        console.log("图片查看器已重置");
    }
    //倍数改变
    imgViewer.onchange = scale => {
        console.log("图片查看器倍数已改变：" + scale);
```

# 提示

需先导入 https://iftc-xlkj.github.io/SDK/Toast.css 文件，否则排版会出错，CSS允许修改颜色之类的，乱修改容易导致排版出错

使用方法：
```JavaScript
//创建一个实例
const toast = new Toast();
    //默认
    const id = toast.normal({内容}, {时长(单位：毫秒)})
    //成功
    const id = toast.success({内容}, {时长(单位：毫秒)})
    //警告
    const id = toast.warn({内容}, {时长(单位：毫秒)})
    //错误
    const id = toast.error({内容}, {时长(单位：毫秒)})
    //自定义
    const id = toast.custom({颜色(边框和字体颜色)}, {背景颜色}, {内容}, {时长(单位：毫秒)})
    //加载中
    const id = toast.loading({内容})
    //结束加载
    toast.loadend({ID})
    //取消提示
    toast.cancel({ID(不填则会取消所有)})
    //获取所有提示(ID列表)
    const toasts = toast.toasts
```

# 对话框

需先导入 https://iftc-xlkj.github.io/SDK/Dialog.css 文件，否则排版会出错，CSS允许修改颜色之类的，乱修改容易导致排版出错

使用方法：
```JavaScript
//创建一个实例
const dialog = new Dialog();
//打开对话框
dialog.open({表单数据(列表)});
    //表单数据
    {
        name: "h1", //元素名
        id: "h1", //元素ID(选填)
        html: "html", //内容(富文本)(选填)
        text: "text", //内容(纯文本)(选填)
        class: "h1", //元素类名(选填)
        style: {}, //样式(选填)
        event: {}, //事件(选填)
        property: {}, //属性(选填)
        data: {}, //自定义属性(选填)
    }
//关闭对话框
dialog.close();
//创建一个关闭按钮(放在表单数据中)
dialog.closeButton({内容(HTML), {样式}, {回调函数(当关闭按钮被点击时)});
//事件
    //关闭
    dialog.onclose = () => {
        console.log("关闭");
    }
    //打开
    dialog.onopen = id => {
        console.log("打开，对话框ID：" + id);
    }
```