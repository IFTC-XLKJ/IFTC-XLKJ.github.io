var document = this.document;
var window = this.window;
document.addEventListener("DOMContentLoaded", function () {
    var editorTextarea = document.getElementById("editor-textarea");
    var outputTextarea = document.getElementById("output-textarea");
    var controls = document.getElementById("controls");
    var run = document.getElementById("run");
    var cds = {
        输出: function (内容) {
            outputTextarea.innerHTML += `${内容}<br />`;
        },
    }
    var cd = [];
    editorTextarea.addEventListener("input", function (e) {
        console.log('变化');
    });
    run.addEventListener("click", function () {
        var code = editorTextarea.value;
        var codes = code.split("\n");
        cd = [];
        codes.forEach(item => {
            var command = item.split(" ")[0]
            var param = item.split(" ")[1];
            if (command != "") {
                cd.push([command, param]);
            }
        });
        console.log(cd);
        outputTextarea.innerHTML = "";
        controls.style.display = "none";
        console.log('运行', cd);
        cd.forEach(item => {
            const name = item[0];
            const value = item[1];
            const fun = cds[name];
            fun(value);
            console.log(fun);
            outputTextarea.scrollTo(0, outputTextarea.scrollHeight);
        });
        outputTextarea.innerHTML += `<input type="text" id="commandInput">`;
        outputTextarea.scrollTo(0, outputTextarea.scrollHeight);
        var commandInput = document.getElementById("commandInput");
        commandInput.addEventListener("keydown", function (e) {
            if (e.key == 'Enter') {
                if (commandInput.value == "退出") {
                    controls.style.display = "flex";
                }
            }
        })
    })
})