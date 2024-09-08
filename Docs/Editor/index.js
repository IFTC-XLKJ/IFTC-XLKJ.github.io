window.mathRandomInt = (a, b) => {
    if (a > b) {
        var c = a;
        a = b;
        b = c; parent
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function isMobileDevice() {
    var mobileRegex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(navigator.userAgent);
}
window.isMobile = isMobileDevice();

window.docdata = {
    title: "新的文档",
    docconfig: {
        bgcolor: "#FFFFFF",
        width: 0,
        height: 10,
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
        "IMG"
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
        }
    }
    docTitle.onfocus = e => {
        docTitle.select();
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
        Widget.addEventListener("click", () => {
            if (isMobile) {
                const e = {
                    clientX: 100,
                    clientY: 100,
                };
                renderWidget(Widget, e);
            }
        })
    })

    function renderWidget(Widget, e) {
        const id = `${Widget.dataset.id}${mathRandomInt(100000, 999999)}`;
        let WidgetProps = [
            {
                type: "text",
                text: `组件配置 ${id}`,
                id: `widget_${id}`,
            }]
        if (Widget.dataset.id == "TEXT") {
            docbody.innerHTML += `<${Widget.dataset.element} id="${id}" data-type="TEXT" data-widget="true" style="position: absolute;top: ${e.clientY}px;left: ${e.clientX}px;user-select: none;">${Widget.dataset.value}</${Widget.dataset.element}>`;
            docdata.docbody.push({
                type: "TEXT",
                id: id,
                text: "默认文本",
                x: e.clientX,
                y: e.clientY,
            })
        }
        else if (Widget.dataset.id == "IMG") {
            docbody.innerHTML += `<${Widget.dataset.element} id="${id}" src="${Widget.dataset.src}" data-type="IMG" data-widget="true" style="position: absolute;top: ${e.clientY}px;left: ${e.clientX}px;user-select: none;">`;
            docdata.docbody.push({
                type: "IMG",
                id: id,
                url: "https://iftc-xlkj.github.io/Docs/Editor/index.svg",
                x: e.clientX,
                y: e.clientY,
                width: 274,
                height: 160,
                size: 1,
            })
        } else if (Widget.dataset.id == "A") {
            docbody.innerHTML += `<${Widget.dataset.element} id="${id}" href="javascript:;" data-href="${Widget.dataset.href}" data-type="A" data-widget="true" style="position: absolute;top: ${e.clientY}px;left: ${e.clientX}px;user-select: none;">${Widget.dataset.value}</${Widget.dataset.element}>`;
            docdata.docbody.push({
                type: "A",
                id: id,
                text: "超链接",
                href: "https://iftc-xlkj.github.io/Docs/Editor/index.svg",
                x: e.clientX,
                y: e.clientY,
            })
        }
        const widget = document.getElementById(id);
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

            docbody.onclick = e => {
                console.log(e.target.id)
                setTimeout(() => {
                    renderProps(e.target.id, WidgetProps);
                }, 1)
            }
            var isDragging = false;
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
                docwidgets.forEach(docwidget => {
                    docwidget.style.border = "none";
                })
                docWidget.style.border = "1px solid #333";
            });

            docWidget.addEventListener('touchstart', function (e) {
                e.preventDefault();
                isDragging = true;
                const touch = e.changedTouches[0];
                console.log("按下", touch.target)
                dragStartPos.x = touch.clientX;
                dragStartPos.y = touch.clientY;
                initialOffset.x = docWidget.offsetLeft;
                initialOffset.y = docWidget.offsetTop;
                document.addEventListener('touchmove', TMoving);
                document.addEventListener('touchend', TMoveUp);
                docwidgets.forEach(docwidget => {
                    docwidget.style.border = "none";
                })
                docWidget.style.border = "1px solid #333";
            });
            function TMoving(e) {
                if (isDragging) {
                    console.log("移动")
                    const touch = e.changedTouches[0];
                    CX = touch.clientX - dragStartPos.x;
                    CY = touch.clientY - dragStartPos.y;
                    newX = initialOffset.x + touch.clientX - dragStartPos.x;
                    newY = initialOffset.y + touch.clientY - dragStartPos.y;
                    if (newX >= 100 && newX <= (docmain.offsetWidth + 100) - docWidget.offsetWidth) {
                        docWidget.style.left = newX + 'px';
                    }
                    if (newY >= 0 && newY <= (docmain.offsetHeight - 80) - docWidget.offsetHeight) {
                        docWidget.style.top = newY + 'px';
                    }
                    WidgetProps[2] = {
                        type: "input",
                        valueType: "number",
                        value: Number(widget.style.left.slice(0, widget.style.left.length - 2)),
                        label: "X坐标",
                        placeholder: "X",
                    }
                    WidgetProps[3] = {
                        type: "input",
                        valueType: "number",
                        value: Number(widget.style.top.slice(0, widget.style.top.length - 2)),
                        label: "Y坐标",
                        placeholder: "Y",
                    }
                }
            }
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
                WidgetProps[2] = {
                    type: "input",
                    valueType: "number",
                    value: Number(widget.style.left.slice(0, widget.style.left.length - 2)),
                    label: "X坐标",
                    placeholder: "X",
                }
                WidgetProps[3] = {
                    type: "input",
                    valueType: "number",
                    value: Number(widget.style.top.slice(0, widget.style.top.length - 2)),
                    label: "Y坐标",
                    placeholder: "Y",
                }
            }
            function TMoveUp() {
                console.log("松开")
                document.removeEventListener('touchove', TMoving);
                document.removeEventListener('touchend', TMoveUp);
                isDragging = false;
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
        widget.style.border = "1px solid #333";
        toast.success("添加成功", 2000);
        renderProps(id);
    }

    docmain.onclick = e => {
        console.log(e);
        const docwidgets = document.querySelectorAll(`[data-widget="true"]`);
        docwidgets.forEach(docwidget => {
            docwidget.style.border = "none";
        })
        const form = new Form("properties", [
            {
                type: "text",
                text: "文档配置",
                id: "text",
            },
            {
                type: "input",
                placeholder: "",
                valueType: "number",
                min: 1,
                max: Infinity,
                value: docdata.docconfig.width,
                label: "宽",
                disabled: true,
            },
            {
                type: "input",
                placeholder: "",
                valueType: "number",
                min: 1,
                max: Infinity,
                value: docdata.docconfig.height,
                label: "高",
            },
            {
                type: "input",
                placeholder: "",
                valueType: "color",
                value: docdata.docconfig.bgcolor,
                label: "背景颜色",
            },
            {
                type: "input",
                placeholder: "",
                valueType: "file",
                accept: "image/*",
                value: docdata.docconfig.bgimg,
                label: "背景图片",
            },
        ]);
        console.log(form.formdata)
        const width = form.form[1].querySelector("input");
        window.addEventListener("resize", e => {
            width.value = docbody.offsetWidth;
            docdata.docconfig.height = docbody.offsetHeight;
        })
        const height = form.form[2].querySelector("input")
        height.oninput = e => {
            docbody.style.height = height.value + "px";
            docdata.docconfig.height = docbody.offsetHeight;
        }
        const bgcolor = form.form[3].querySelector("input")
        bgcolor.oninput = e => {
            doc.style.backgroundColor = bgcolor.value;
            docdata.docconfig.bgcolor = bgcolor.value;
        }
        const bgimg = form.form[4].querySelector("input")
        bgimg.onchange = e => {
            const file = bgimg.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    doc.style.backgroundImage = `url(${e.target.result})`;
                    docdata.docconfig.bgimg = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }

    function renderProps(id) {
        const widgetData = docdata.docbody.find(items => items.id == id);
        const widget = document.getElementById(id);
        if (!widget) {
            toast.error("出现未知问题", 2000);
            return 0;
        }
        console.log("widgetData", widgetData);;
        let WidgetProps = [{
            type: "text",
            text: `组件配置 ${id}`,
            id: `widget_${id}`,
        }];
        if (widgetData.type == "TEXT") {
            WidgetProps.push({
                type: "input",
                valueType: "text",
                value: widget.innerHTML,
                label: "内容",
                placeholder: "内容",
            })
            WidgetProps.push({
                type: "input",
                valueType: "number",
                value: Number(widget.style.left.slice(0, widget.style.left.length - 2)),
                label: "X坐标",
                placeholder: "X",
            })
            WidgetProps.push({
                type: "input",
                valueType: "number",
                value: Number(widget.style.top.slice(0, widget.style.top.length - 2)),
                label: "Y坐标",
                placeholder: "Y",
            })
        } else if (widgetData.type == "IMG") {
            WidgetProps.push({
                type: "input",
                valueType: "file",
                label: "图片",
                accept: "image/*",
            })
            WidgetProps.push({
                type: "input",
                valueType: "number",
                value: widget.offsetWidth,
                label: "宽",
                placeholder: "宽",
            })
            WidgetProps.push({
                type: "input",
                valueType: "number",
                value: widget.offsetHeight,
                label: "高",
                placeholder: "高",
            })
            WidgetProps.push({
                type: "input",
                valueType: "number",
                value: Number(widget.style.left.slice(0, widget.style.left.length - 2)),
                label: "X坐标",
                placeholder: "X",
            })
            WidgetProps.push({
                type: "input",
                valueType: "number",
                value: Number(widget.style.top.slice(0, widget.style.top.length - 2)),
                label: "Y坐标",
                placeholder: "Y",
            })
            WidgetProps.push({
                type: "input",
                valueType: "number",
                value: widgetData.size,
                label: "缩放",
                placeholder: "缩放",
            })
        } else if (widgetData.type == "A") {
            WidgetProps.push({
                type: "input",
                valueType: "text",
                value: widget.innerHTML,
                label: "内容",
                placeholder: "内容",
            })
            WidgetProps.push({
                type: "input",
                valueType: "text",
                value: widget.dataset.href,
                label: "链接",
                placeholder: "链接",
            })
            WidgetProps.push({
                type: "input",
                valueType: "number",
                value: Number(widget.style.left.slice(0, widget.style.left.length - 2)),
                label: "X坐标",
                placeholder: "X",
            })
            WidgetProps.push({
                type: "input",
                valueType: "number",
                value: Number(widget.style.top.slice(0, widget.style.top.length - 2)),
                label: "Y坐标",
                placeholder: "Y",
            })
        }
        const form = new Form("properties", WidgetProps);
        if (widgetData.type == "TEXT") {
            const content = form.form[1].querySelector("input");
            content.oninput = e => {
                widget.innerHTML = content.value;
                WidgetProps[1] = {
                    type: "input",
                    valueType: "text",
                    value: widget.innerHTML,
                    label: "内容",
                    placeholder: "内容",
                }
                widgetData.text = content.value;
                if (content.value == "") {
                    widget.innerHTML = " ";
                }
                widget.style.maxWidth = `${doc.offsetWidth - 1}px`;
                if (widget.offsetWidth >= doc.offsetWidth - Number(widget.style.left.slice(0, widget.style.left.length - 2))) {
                    widget.style.left = `101px`;
                }
            }
            const X = form.form[2].querySelector("input");
            X.oninput = e => {
                if (X.value >= 100 || X.value <= (docmain.offsetWidth + 100) - docWidget.offsetWidth) {
                    widget.style.left = `${X.value}px`;
                    widgetData.x = X.value;
                }
            }
            const Y = form.form[3].querySelector("input");
            Y.oninput = e => {
                if (Y.value >= 0 && Y.value <= docmain.offsetHeight - widget.offsetHeight) {
                    widget.style.top = `${Y.value}px`;
                    widgetData.y = Y.value;
                }
            }
        } else if (widgetData.type == "IMG") {
            const img = form.form[1].querySelector("input")
            img.onchange = e => {
                const file = img.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        widget.src = e.target.result;
                        widget.style.left = "100px";
                        widget.style.top = '0px';
                        widgetData.url = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            }
            const X = form.form[4].querySelector("input");
            X.oninput = e => {
                if (X.value >= 100 || X.value <= (docmain.offsetWidth + 100) - widget.offsetWidth * widget.size) {
                    widget.style.left = `${X.value}px`;
                    widgetData.x = X.value;
                }
            }
            const Y = form.form[5].querySelector("input");
            Y.oninput = e => {
                if (Y.value >= 0 && Y.value <= docmain.offsetHeight - widget.offsetHeight * widget.size) {
                    widget.style.top = `${Y.value}px`;
                    widgetData.y = Y.value;
                }
            }
            const width = form.form[2].querySelector("input");
            width.oninput = e => {
                if (width.value >= 0 || width.value * widget.size <= doc.offsetWidth) {
                    widget.style.width = `${width.value}px`;
                    widgetData.width = width.value;
                }
            }
            const height = form.form[3].querySelector("input");
            height.oninput = e => {
                if (height.value >= 0 && height.value * widget.size <= doc.offsetHeight) {
                    widget.style.height = `${height.value}px`;
                    widgetData.height = height.value;
                }
            }
            const size = form.form[6].querySelector("input");
            size.oninput = e => {
                if (size.value >= 0 && widget.offsetWidth * size.value <= doc.offsetWidth) {
                    widget.style.transform = `scale(${size.value})`;
                    widgetData.size = size.value;
                }
            }
        } else if (widgetData.type == "A") {
            const content = form.form[1].querySelector("input");
            content.oninput = e => {
                widget.innerHTML = content.value;
                WidgetProps[1] = {
                    type: "input",
                    valueType: "text",
                    value: widget.innerHTML,
                    label: "内容",
                    placeholder: "内容",
                }
                widgetData.text = content.value;
                if (content.value == "") {
                    widget.innerHTML = " ";
                }
                widget.style.maxWidth = `${doc.offsetWidth - 1}px`;
                if (widget.offsetWidth >= doc.offsetWidth - Number(widget.style.left.slice(0, widget.style.left.length - 2))) {
                    widget.style.left = `101px`;
                }
            }
            const href = form.form[2].querySelector("input");
            href.oninput = e => {
                widget.dataset.href = href.value;
                WidgetProps[2] = {
                    type: "input",
                    valueType: "text",
                    value: widget.innerHTML,
                    label: "内容",
                    placeholder: "内容",
                }
                widgetData.href = href.value;
                if (href.value == "") {
                    widget.innerHTML = "javascript:;";
                }
            }
            const X = form.form[3].querySelector("input");
            X.oninput = e => {
                if (X.value >= 100 || X.value <= (docmain.offsetWidth + 100) - docWidget.offsetWidth) {
                    widget.style.left = `${X.value}px`;
                    widgetData.x = X.value;
                }
            }
            const Y = form.form[4].querySelector("input");
            Y.oninput = e => {
                if (Y.value >= 0 && Y.value <= docmain.offsetHeight - widget.offsetHeight) {
                    widget.style.top = `${Y.value}px`;
                    widgetData.y = Y.value;
                }
            }
        }

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

    document.oncontextmenu = function (e) {
        console.log(e.target.tagName)
        if (e.target.tagName == "A") {
            window.open(e.target.dataset.href);
            return 0;
        }
    };
}

window.addEventListener("resize", e => {
    docdata.docconfig.width = docbody.offsetWidth;
    docdata.docconfig.height = docbody.offsetHeight;
})