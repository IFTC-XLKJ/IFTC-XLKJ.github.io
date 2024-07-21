var docuemnt = this.document;
var window = this.window;

var isProg = false;

var variables = {}

var returncode = {
    运算: function (text) {
        try {
            eval(text);
        } catch (e) {
            return `<br><p style="color: orange;">NaN</p>`;
        }
        return eval(text);
    },
    变量: function (text) {
        if (!variables[text.名]) {
            return `<br><p style="color: orange;">NaN</p>`;
        } else {
            return variables[text.名];
        }
    }
}

var code = {
    打印: function (text) {
        var output = docuemnt.getElementById("output-zoon");
        var print = '';
        text.forEach((item, index) => {
            console.log(item, typeof item)
            if (typeof item == 'string') {
                print += item;
            } else if (typeof item == 'object') {
                print += getReturncode(item);
            }
        })
        console.log(print)
        output.innerHTML += `<br>${print}`;
        isProg = true;
    },
    变量: function (text) {
        variables[text.名] = text.值;
        isProg = true;
    }
}

function isValidJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function getReturncode(str) {
    console.log(str);
    var result = '';
    if (str.运算) {
        result = returncode.运算(str.运算);
        if (result) {
            return result;
        } else {
            return 0;
        }
    } else if (str.变量) {
        return returncode.变量(str.变量);
    }
    else {
        return `<br><p style="color: orange;">NaN</p>`;
    }
}
function getScript(src) {

}

docuemnt.addEventListener('DOMContentLoaded', () => {
    var editor = docuemnt.getElementById("editor-zoon");
    editor.innerHTML = `{
    "程序名": "demo",
    "版本": "1.0.0",
    "作者": "IFTC",
    "脚本": [],
    "主程序": [
        {
            "变量":{
                "名": "a",
                "值": 1
            }
        },
        {
            "打印": ["Hello World", {"运算": "1 + 1"}, {"变量": "a"}]
        }
    ]
}`;
    var output = docuemnt.getElementById("output-zoon");
    var run = docuemnt.getElementById("run");
    var controls = docuemnt.getElementById("controls");
    run.onclick = function () {
        controls.style.display = 'none';
        output.innerHTML = 'WebVCHC程序，JSONScript开始执行';
        console.log(isValidJsonString(editor.value));
        if (!isValidJsonString(editor.value)) {
            output.innerHTML += `<br><p style="color: red;">JSON解析失败</p>`;
            controls.style.display = 'flex';
        } else {
            var codes = JSON.parse(editor.value);
            output.innerHTML += `<br>程序名：${codes.程序名}`;
            output.innerHTML += `<br>版本：${codes.版本}`;
            output.innerHTML += `<br>作者：${codes.作者}`;
            for (var i = 0; i < codes.脚本.length; i++) {
                getScript(codes.脚本[i])
            }
            output.innerHTML += `<br>`;
            (codes.主程序).forEach((item, index) => {
                async function updateData() {
                    await new Promise(resolve => setTimeout(resolve, 1));
                    isProg = true;
                }
                (async () => {
                    do {
                        isProg = false;
                        console.log(item, index);
                        if (item.打印) {
                            code.打印(item.打印)
                        } else if (item.变量) {
                            code.变量(item.变量)
                        }
                        await updateData();
                    } while (!isProg);
                    console.log('Key is now true!');
                })();
            });
            output.innerHTML += `<br>WebVCHC程序，JSONScript执行结束`;
            output.innerHTML += `<br><div style="display: inline;">-> <div id="back" style="display: inline;cursor: pointer;">返回</div> <-</div>`;
            docuemnt.getElementById("back").addEventListener('click', (e) => {
                controls.style.display = 'flex';
            })
        }
    }
})