var docuemnt = this.document;
var window = this.window;

var code = {
    print: function (text) {
        output.innerHTML += text;
    },
}
docuemnt.addEventListener('DOMContentLoaded', () => {
    var editor = docuemnt.getElementById("editor-zoon");
    var output = docuemnt.getElementById("output-zoon");
    var run = docuemnt.getElementById("run");
    run.onclick = function () {
        output.innerHTML = '';
        var codes = JSON.parse(editor.innerHTML);
        output.innerHTML += `程序名：${codes.程序名}`
    }
})