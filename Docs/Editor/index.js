var docdata = {
    title: "新的文档",
    docconfig: {
        bgcolor: "#000000FF",
        width,
        height,
    },
    docbody: [],
}
window.onload = () => {
    console.log("编辑器加载完成");
    console.log("欢迎使用可视化文档编辑器")
    var toast = new Toast();
    toast.normal("欢迎使用VV文档编辑器", 2000)
    var docTitle = document.querySelector("#doctitle > input");
    docTitle.value = docdata.title;
    docTitle.oninput = e => {
        const trimmedValue = docTitle.value.trim();
        if (trimmedValue == "") {
            docTitle.value = docdata.title;
            toast.error("文档标题不能为空", 2000);
        } else {
            docdata.title = trimmedValue;
            return 0;
        }
    }
    var Widgets = document.querySelectorAll(".widget");
    Widgets.forEach((Widget, num) => {
        console.log(Widget)
    })

    docmain.onclick = e => {
        console.log(e);
    }
}

window.addEventListener("resize", e => {
    
})