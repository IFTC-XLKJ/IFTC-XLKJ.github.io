var document = this.document;
var window = this.window;
document.addEventListener("DOMContentLoaded", function () {
    var editorTextarea = document.getElementById("editor-textarea");
    editorTextarea.value = localStorage.getItem("vchccode");
    var outputTextarea = document.getElementById("output-textarea");
    var controls = document.getElementById("controls");
    var run = document.getElementById("run");
    var cds = {
        输出: function (内容) {
            outputTextarea.innerHTML += `${内容}<br />`;
        },
        输入: function (提示) {
            var value = prompt(提示);
            outputTextarea.innerHTML += `${value}<br />`;
            return value;
        }
    }
    var cd = [];
    editorTextarea.addEventListener("input", function (e) {
        console.log('变化');
        localStorage.setItem("vchccode", editorTextarea.value);
    });
    function runCode() {
        var code = editorTextarea.value;
        var codes = code.split("\n");
        cd = [];
        console.log(cd);
        outputTextarea.innerHTML = "";
        controls.style.display = "none";
        console.log('运行', cd);
        codes.forEach(item => {
            const command = item.split(" ")[0];
            const param = item.split(" ")[1];
            if (command != "") {
                const fun = cds[command];
                fun(param);
                outputTextarea.scrollTo(0, outputTextarea.scrollHeight);
                cd.push([command, param]);
            }
            console.log(command, param);
        });
        outputTextarea.innerHTML += `<input type="text" id="commandInput">`;
        outputTextarea.scrollTo(0, outputTextarea.scrollHeight);
        var commandInput = document.getElementById("commandInput");
        commandInput.addEventListener("keydown", function (e) {
            if (e.key == 'Enter') {
                if (commandInput.value == "退出") {
                    controls.style.display = "flex";
                } else if (commandInput.value == "清屏") {
                    outputTextarea.innerHTML = "";
                } else if (commandInput.value != "重新") {
                    runCode();
                }
            }
        })
    }
    run.addEventListener("click", function () {
        runCode();
    })
})