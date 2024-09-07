window.mathRandomInt = (a, b) => {
    if (a > b) {
        var c = a;
        a = b;
        b = c; parent
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

window.docdata = {
    title: "新的文档",
    docconfig: {
        bgcolor: "#000000FF",
        width: 0,
        height: 0,
    },
    docbody: [],
}
window.onload = () => {
    console.log("编辑器加载完成");
    console.log("欢迎使用可视化文档编辑器");
    docdata.docconfig.width = docbody.offsetWidth;
    docdata.docconfig.height = docbody.offsetHeight;
    const widgetlist = [
        "TEXT",
    ]
    var toast = new Toast();
    toast.normal("欢迎使用VV文档可视化编辑器", 2000)
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
        console.log(Widget);
        Widget.ondrop = e => {
            console.log(e.target)
        }
        Widget.addEventListener("dragend", e => {
            const element = document.elementFromPoint(e.clientX, e.clientY);
            console.log("拖动结束", element)
            console.log("父级", element.dataset.type)
            console.log(element.id == "doc" || element.dataset.type)
            if (element.id == "doc") {
                renderWidget(Widget, e)
            } else if (element.dataset.type) {
                renderWidget(Widget, e)
            } else if (element.id == "docbody") {
                renderWidget(Widget, e)
            } else {
                toast.warn("请拖动到文档主体中", 2000);
            }
            return 0;
        })
    })

    function renderWidget(Widget, e) {
        const id = `${Widget.dataset.id}${mathRandomInt(100000, 999999)}`
        docbody.innerHTML += `<${Widget.dataset.element} id="${id}" data-type="TEXT" data-widget="true" style="position: absolute;top: ${e.clientY}px;left: ${e.clientX}px;user-select: none;">${Widget.dataset.value}</${Widget.dataset.element}>`;
        const docwidgets = document.querySelectorAll(`[data-widget="true"]`);
        docwidgets.forEach(docWidget => {
            docWidget.onmousedown = e => {
                docwidgets.forEach(docwidget => {
                    docwidget.style.border = "none";
                })
                docWidget.style.border = "1px solid #333";
            }

            docWidget.ontouchsart = e => {
                docwidgets.forEach(docwidget => {
                    docwidget.style.border = "none";
                })
                docWidget.style.border = "1px solid #333";
            }

            var isDragging = false;
            docWidget.addEventListener("toychstart", e => {
                console.log("123456")
            })
            var initialOffset = { x: 0, y: 0 };
            var dragStartPos = { x: 0, y: 0 };
            var newX = 0;
            var newY = 0;
            var CX = 0;
            var CY = 0;
            docWidget.addEventListener('mousedown', function (e) {
                e.preventDefault();
                isDragging = true;
                console.log("按下", e.target)
                dragStartPos.x = e.clientX;
                dragStartPos.y = e.clientY;
                initialOffset.x = docWidget.offsetLeft;
                initialOffset.y = docWidget.offsetTop;
                document.addEventListener('mousemove', Moving);
                document.addEventListener('mouseup', MoveUp);
            });

            function Moving(e) {
                if (isDragging) {
                    console.log("移动")
                    CX = e.clientX - dragStartPos.x;
                    CY = e.clientY - dragStartPos.y;
                    newX = initialOffset.x + e.clientX - dragStartPos.x;
                    newY = initialOffset.y + e.clientY - dragStartPos.y;
                    if (newX >= 100 && newX <= (docmain.offsetWidth + 100) - docWidget.offsetWidth) {
                        docWidget.style.left = newX + 'px';
                    }
                    if (newY >= 0 && newY <= docmain.offsetHeight - docWidget.offsetHeight) {
                        docWidget.style.top = newY - 20 + 'px';
                    }
                }
            }
            function MoveUp() {
                console.log("松开")
                document.removeEventListener('mousemove', Moving);
                document.removeEventListener('mouseup', MoveUp);
                isDragging = false;
            }

        })
        docwidgets.forEach(docwidget => {
            docwidget.style.border = "none";
        })
        document.getElementById(id).style.border = "1px solid #333";
        toast.success("添加成功", 2000)
    }

    docmain.onclick = e => {
        console.log(e);
        const docwidgets = document.querySelectorAll(`[data-widget="true"]`);
        docwidgets.forEach(docwidget => {
            docwidget.style.border = "none";
        })
    }

    let lastScrollTop = docmain.scrollTop;
    docmain.onscroll = e => {
        const currentScrollTop = docmain.scrollTop;
        const deltaVertical = currentScrollTop - lastScrollTop;
        lastScrollTop = docmain.scrollTop;
        console.log(deltaVertical)
        const docwidgets = document.querySelectorAll(`[data-widget="true"]`);
        docwidgets.forEach(docwidget => {
            docwidget.style.top = `${Number(docwidget.style.top.slice(0, docwidget.style.top.length - 2)) - deltaVertical}px`;
        })
    }
}

window.addEventListener("resize", e => {
    docdata.docconfig.width = docbody.offsetWidth;
    docdata.docconfig.height = docbody.offsetHeight;
})