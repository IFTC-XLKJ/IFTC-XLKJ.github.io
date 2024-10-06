const htmlText = html => {
    return html
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
}
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
                    }
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
            this.appendValueInput("content")
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
            this.appendValueInput("content")
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
    });
    console.log('Workspace initialized:', workspace);
    function updateCode(event) {
        const div_block_blocklyOutlinePaths = document.querySelectorAll(".blocklyOutlinePath")
        div_block_blocklyOutlinePaths.forEach(blocklyOutlinePath => {
            blocklyOutlinePath.remove()
        })
        if (workspace && Blockly.JavaScript) {
            const code = Blockly.JavaScript.workspaceToCode(workspace);
            console.log(code);
            preview.innerHTML = code;
        } else {
            console.error('Workspace or Blockly.JavaScript is not defined.');
        }
    }
    workspace.addChangeListener(updateCode);
}