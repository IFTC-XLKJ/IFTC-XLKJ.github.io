const htmlText = html => {
    return html
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
}
window.images = [
    ["空空如也.png", "https://creation.codemao.cn/884/l4zc7yiy.png?imageMogr2/thumbnail/!200x200r/blur/1x0/quality/100|imageslim"]
]
window.scripts = [
    ["空脚本", "\\null\\"]
]
onload = () => {
    console.log('Page loaded and Blockly is initializing...');

    const pathToMedia = "blockly/package/media/";
    const toolbox = {
        kind: "categoryToolbox",
        contents: [
            {
                kind: "category",
                name: "元素",
                colour: 100,
                contents: [
                    {
                        kind: "block",
                        type: "doc_type",
                    },
                    {
                        kind: "block",
                        type: "element_html",
                    },
                    {
                        kind: "block",
                        type: "element_head",
                    },
                    {
                        kind: "block",
                        type: "element_body",
                    },
                    {
                        kind: "block",
                        type: "element_script",
                    },
                    {
                        kind: "block",
                        type: "element_style",
                    },
                    {
                        kind: "block",
                        type: "element_div",
                    },
                    {
                        kind: "block",
                        type: "element_h1",
                    },
                    {
                        kind: "block",
                        type: "element_h2",
                    },
                    {
                        kind: "block",
                        type: "element_h3",
                    },
                    {
                        kind: "block",
                        type: "element_img",
                    },
                ]
            },
            {
                kind: "category",
                name: "属性",
                colour: 120,
                contents: [
                    {
                        kind: "block",
                        type: "prop_id",
                    },
                    {
                        kind: "block",
                        type: "prop_class"
                    },
                    {
                        kind: "block",
                        type: "prop_dataset"
                    },
                ]
            },
            {
                kind: "category",
                name: "样式",
                colour: 120,
                contents: [
                    {
                        kind: "block",
                        type: "style_selector",
                    },
                    {
                        kind: "block",
                        type: "style_color",
                    },
                    {
                        kind: "block",
                        type: "style_bgcolor"
                    },
                    {
                        kind: "block",
                        type: "style_custom"
                    },
                ]
            },
            {
                kind: "category",
                name: "控制",
                colour: 200,
                contents: [
                    {
                        kind: "block",
                        type: "controls_if"
                    },
                ]
            }
        ]
    };
    // 元素 积木
    Blockly.Blocks['doc_type'] = {
        init: function () {
            this.setNextStatement(true);
            this.appendDummyInput()
                .appendField('文档类型')
                .appendField(new Blockly.FieldDropdown([
                    ['HTML', 'html'],
                    ['HTML5', 'html5'],
                    ['XHTML 1.0 Transitional', 'xhtml1-transitional'],
                    ['HTML 4.01 Transitional', 'html4-transitional']
                ]), 'DOCTYPE');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['doc_type'] = function (block) {
        var doctype = block.getFieldValue('DOCTYPE');
        var code = `<!DOCTYPE ${doctype}>\n`;
        return code;
    };
    Blockly.Blocks['element_html'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('页面')
            this.appendStatementInput('html')
                .appendField('');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_html'] = function (block) {
        var html = Blockly.JavaScript.statementToCode(block, 'html')
        var code = `<html>\n${html}</html>\n`;
        return code;
    }
    Blockly.Blocks['element_head'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('头部')
            this.appendStatementInput('html')
                .appendField('');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_head'] = function (block) {
        var html = Blockly.JavaScript.statementToCode(block, 'html')
        var code = `<head>\n${html}</head>\n`;
        return code;
    }
    Blockly.Blocks['element_body'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('主体')
            this.appendStatementInput('html')
                .appendField('');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_body'] = function (block) {
        var html = Blockly.JavaScript.statementToCode(block, 'html')
        var code = `<body>\n${html}</body>\n`;
        return code;
    }
    Blockly.Blocks['element_script'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('脚本')
                .appendField(new Blockly.FieldDropdown(scripts), "url")
            this.appendStatementInput('js')
                .appendField('');
            this.appendStatementInput('prop')
                .appendField('属性');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_script'] = function (block) {
        var js = Blockly.JavaScript.statementToCode(block, 'js')
        var prop = Blockly.JavaScript.statementToCode(block, 'prop')
        var url = block.getFieldValue("url")
        if (url == "\\null\\") {
            url = ""
        }
        var code = `<script src="${url}" ${prop}>\n${js}</script>\n`;
        return code;
    }
    Blockly.Blocks['element_style'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('样式')
            this.appendStatementInput('styles')
                .appendField('');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_style'] = function (block) {
        var html = Blockly.JavaScript.statementToCode(block, 'styles')
        var code = `<style>\n${html}</style>\n`;
        return code;
    }
    Blockly.Blocks['element_div'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('级')
                .appendField(new Blockly.FieldTextInput("文本", null, null, 'blocklyHidden'), "content")
            this.appendStatementInput('html')
                .appendField('');
            this.appendStatementInput('prop')
                .appendField('属性');
            this.appendStatementInput('style')
                .appendField('样式');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_div'] = function (block) {
        var html = Blockly.JavaScript.statementToCode(block, 'html')
        var style = Blockly.JavaScript.statementToCode(block, 'style')
        var prop = Blockly.JavaScript.statementToCode(block, 'prop')
        var content = block.getFieldValue("content")
        var code = `<div style="${style}" ${prop}>\n${htmlText(content)}${html}</div>\n`;
        return code;
    }
    Blockly.Blocks['element_h1'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('一级标题')
                .appendField(new Blockly.FieldTextInput("标题", null, null, 'blocklyHidden'), "content")
            this.appendStatementInput('html')
                .appendField('');
            this.appendStatementInput('prop')
                .appendField('属性');
            this.appendStatementInput('style')
                .appendField('样式');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_h1'] = function (block) {
        var html = Blockly.JavaScript.statementToCode(block, 'html')
        var style = Blockly.JavaScript.statementToCode(block, 'style')
        var prop = Blockly.JavaScript.statementToCode(block, 'prop')
        var content = block.getFieldValue("content")
        var code = `<h1 style="${style}" ${prop}>\n${htmlText(content)}${html}</h1>\n`;
        return code;
    }
    Blockly.Blocks['element_h2'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('二级标题')
                .appendField(new Blockly.FieldTextInput("标题", null, null, 'blocklyHidden'), "content")
            this.appendStatementInput('html')
                .appendField('');
            this.appendStatementInput('prop')
                .appendField('属性');
            this.appendStatementInput('style')
                .appendField('样式');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_h2'] = function (block) {
        var html = Blockly.JavaScript.statementToCode(block, 'html')
        var style = Blockly.JavaScript.statementToCode(block, 'style')
        var prop = Blockly.JavaScript.statementToCode(block, 'prop')
        var content = block.getFieldValue("content")
        var code = `<h2 style="${style}" ${prop}>\n${htmlText(content)}${html}</h2>\n`;
        return code;
    }
    Blockly.Blocks['element_h3'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('三级标题')
                .appendField(new Blockly.FieldTextInput("标题", null, null, 'blocklyHidden'), "content")
            this.appendStatementInput('html')
                .appendField('');
            this.appendStatementInput('prop')
                .appendField('属性');
            this.appendStatementInput('style')
                .appendField('样式');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_h3'] = function (block) {
        var html = Blockly.JavaScript.statementToCode(block, 'html')
        var style = Blockly.JavaScript.statementToCode(block, 'style')
        var prop = Blockly.JavaScript.statementToCode(block, 'prop')
        var content = block.getFieldValue("content")
        var code = `<h3 style="${style}" ${prop}>\n${htmlText(content)}${html}</h3>\n`;
        return code;
    }
    Blockly.Blocks['element_img'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('图片')
                .appendField(new Blockly.FieldDropdown(images), "img")
            this.appendStatementInput('prop')
                .appendField('属性');
            this.appendStatementInput('style')
                .appendField('样式');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['element_img'] = function (block) {
        var style = Blockly.JavaScript.statementToCode(block, 'style')
        var prop = Blockly.JavaScript.statementToCode(block, 'prop')
        var img = block.getFieldValue("img")
        var code = `<img src="${img}" style="${style}" ${prop}>\n`;
        return code;
    }
    // 属性 积木
    Blockly.Blocks['prop_id'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('ID')
                .appendField(new Blockly.FieldTextInput("id", null, null, 'blocklyHidden'), "id")
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['prop_id'] = function (block) {
        var id = block.getFieldValue("id")
        var code = `id="${id}"\n`;
        return code;
    }
    Blockly.Blocks['prop_class'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('类名')
                .appendField(new Blockly.FieldTextInput("class", null, null, 'blocklyHidden'), "class")
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['prop_class'] = function (block) {
        var Class = block.getFieldValue("class")
        var code = `class="${Class}"\n`;
        return code;
    }
    Blockly.Blocks['prop_dataset'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('自定义属性')
                .appendField(new Blockly.FieldTextInput("属性名", null, null, 'blocklyHidden'), "name")
                .appendField(new Blockly.FieldTextInput("属性值", null, null, ""), "value")
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['prop_dataset'] = function (block) {
        var name = block.getFieldValue("name")
        var value = block.getFieldValue("value")
        var code = `data-${name}="${value}"\n`;
        return code;
    }
    // 样式 积木
    Blockly.Blocks['style_selector'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('样式')
                .appendField('选择器')
                .appendField(new Blockly.FieldTextInput("body", null, null, 'blocklyHidden'), "selector")
            this.appendStatementInput('styles')
                .appendField('');
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['style_selector'] = function (block) {
        var selector = block.getFieldValue("selector")
        var style = Blockly.JavaScript.statementToCode(block, 'styles')
        var code = `${selector}{\n${style}\n}`;
        return code;
    }
    Blockly.Blocks['style_color'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('颜色')
                .appendField(new Blockly.FieldTextInput("#333", null, null, 'blocklyHidden'), "color")
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['style_color'] = function (block) {
        var color = block.getFieldValue("color")
        var code = `color: ${color};\n`;
        return code;
    }
    Blockly.Blocks['style_bgcolor'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('背景颜色')
                .appendField(new Blockly.FieldTextInput("#333", null, null, 'blocklyHidden'), "color")
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['style_bgcolor'] = function (block) {
        var color = block.getFieldValue("color")
        var code = `background-color: ${color};\n`;
        return code;
    }
    Blockly.Blocks['style_custom'] = {
        init: function () {
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.appendDummyInput()
                .appendField('自定义样式')
                .appendField(new Blockly.FieldTextInput("样式名", null, null, 'blocklyHidden'), "style")
                .appendField(new Blockly.FieldTextInput("样式值", null, null, 'blocklyHidden'), "value")
            this.setOutput(false, "String");
            this.setColour(160);
        }
    };
    Blockly.JavaScript.forBlock['style_custom'] = function (block) {
        var style = block.getFieldValue("style")
        var value = block.getFieldValue("value")
        var code = `${style}: ${value};\n`;
        return code;
    }

    console.log('Checking Blockly.JavaScript registration:');
    console.log(Blockly.JavaScript['doc_type']);
    window.workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        renderer: "Zelos",
        media: pathToMedia,
        grid:
        {
            spacing: 20,
            length: 3,
            colour: '#ccc',
        },
        trashcan: false,
        move: {
            scrollbars: {
                horizontal: true,
                vertical: true
            },
            drag: true,
            wheel: true
        },
        zoom: {
            controls: true,
            wheel: true,
            maxScale: 5,
            minScale: 0.1,
            scaleSpeed: 1.5
        }
    });
    console.log('Workspace initialized:', workspace);
    function updateCode(event) {
        function getBlockInfo() {
            const blocks = Blockly.Xml.workspaceToDom(workspace);
            return blocks;
        }
        if (workspace && Blockly.JavaScript) {
            const code = Blockly.JavaScript.workspaceToCode(workspace);
            console.log(code);
            console.log(getBlockInfo())
            preview.innerHTML = code;
            const xml = Blockly.Xml.workspaceToDom(workspace);
            const xmlText = Blockly.Xml.domToText(xml).replaceAll(' xmlns="https://developers.google.com/blockly/xml"', "");
            if (xmlText != '<xml></xml>') {
                localStorage.setItem('blocklyData', xmlText);
            }
        } else {
            console.error('Workspace or Blockly.JavaScript is not defined.');
        }
    }
    workspace.addChangeListener(updateCode);
    preview.addEventListener("contextmenu", e => {
        //previewMenu(e)
        e.preventDefault();
    })
    /*function previewMenu(e) {
        const { offsetX, offsetY } = e;
        console.log(offsetX, offsetY)
        var menuMain = document.createElement("div");
        menuMain.className = `menu-main`;
        menuMain.style.left = `${offsetX + (innerWidth - 360)}px`;
        menuMain.style.top = `${offsetY + 50}px`;
        preview.appendChild(menuMain)
        var refresh = document.createElement("div")
        refresh.innerText = "刷新";
        refresh.id = "pre-refresh"
        refresh.addEventListener("click", e => {
            preview.innerHTML = "";
            setTimeout(() => {
                if (workspace && Blockly.JavaScript) {
                    const code = Blockly.JavaScript.workspaceToCode(workspace);
                    console.log(code);
                    preview.innerHTML = code;
                } else {
                    console.error('Workspace or Blockly.JavaScript is not defined.');
                }
            }, 50)
        })
        menuMain.appendChild(refresh)
        console.log(innerWidth - (offsetX + (innerWidth - 360)))
        if (innerWidth - (offsetX + (innerWidth - 360)) < 100) {
            menuMain.style.left = `${offsetX + (innerWidth - 360) - 100}px`
        }
        if (innerHeight - (offsetY + 50) - 50 < menuMain.offsetHeight) {
            menuMain.style.top = `${(offsetY + 50) - menuMain.offsetHeight}px`
        }
        menuMain.addEventListener("contextmenu", event => {
            menuMain.remove()
            previewMenu(e)
            e.preventDefault();
        })
        window.addEventListener("click", e => {
            menuMain.remove();
        })
        setTimeout(() => {
            document.addEventListener("contextmenu", e => {
                menuMain.remove();
            })
        }, 10)
    }*/
    const blocklyFlyoutBackground = document.querySelector(".blocklyFlyoutBackground");
    blocklyFlyoutBackground.style.fill = "white";
    blocklyFlyoutBackground.style.fillOpacity = "0.5"
    const savedXmlText = localStorage.getItem('blocklyData');
    if (savedXmlText) {
        console.log('Loaded XML on page load:', savedXmlText);
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedXmlText, 'text/xml');
        console.log('Parsed XML on page load:', xml);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }
    const sourcesMask = document.getElementById("sources-mask")
    sources.addEventListener("click", e => {
        sourcesMask.style.display = "flex"
        renderSources();
        sourcesMask.addEventListener("click", closeSources)
        function closeSources(e) {
            if (e.target.id == "sources-mask") {
                sourcesMask.style.display = "none"
                sourcesMask.removeEventListener("click", closeSources)
            }
        }
    })
    function renderImg(image, index) {
        const imageList = document.querySelector(".images");
        var img = document.createElement("img");
        img.src = image[1];
        img.alt = image[0];
        img.dataset.num = index;
        img.style.cursor = "pointer"
        img.addEventListener("click", e => {
            var operation = document.createElement("dialog")
            operation.className = "op-img"
            var h1 = document.createElement("h1")
            h1.innerText = "“" + img.alt + "”的操作"
            operation.appendChild(h1)
            var name = document.createElement("input")
            name.value = img.alt
            const imgName = img.alt;
            name.placeholder = "请输入图片名"
            name.className = "op-img-name"
            name.addEventListener("input", e => {
                images[index][0] = name.value;
                img.alt = name.value
                h1.innerText = "“" + name.value + "”的操作"
            })
            operation.appendChild(name)
            var Delete = document.createElement("button")
            Delete.innerText = "删除"
            Delete.className = "op-img-delete"
            Delete.addEventListener("click", e => {
                delete images[index]
                operation.remove()
                renderSources()
            })
            operation.appendChild(Delete)
            var cancel = document.createElement("button")
            cancel.innerText = "取消"
            cancel.className = "op-img-cancel"
            cancel.addEventListener("click", e => {
                operation.remove()
            })
            operation.appendChild(cancel)
            document.body.appendChild(operation)
            operation.showModal();
        })
        imageList.appendChild(img)
    }
    function renderSources() {
        const imageList = document.querySelector(".images");
        imageList.innerHTML = ""
        images.forEach(renderImg)
    }
    imgUpload.addEventListener("click", e => {
        var fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.accept = "image/*"
        fileInput.hidden = true
        fileInput.addEventListener("change", e => {
            var file = e.target.files[0]
            if (file) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    const dataURL = reader.result;
                    console.log('Data URL:', dataURL);
                    images.push([file.name, dataURL])
                    renderImg(images[images.length - 1], images.length - 1)
                };
                reader.readAsDataURL(file);
            }
        })
        document.body.appendChild(fileInput)
        fileInput.click();
    })
}