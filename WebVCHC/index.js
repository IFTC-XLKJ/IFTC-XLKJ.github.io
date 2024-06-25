var document = this.document;
var window = this.window;
document.addEventListener("DOMContentLoaded", function () {
    var editorTextarea = document.getElementById("editor-textarea");
    var outputTextarea = document.getElementById("output-textarea");
    editorTextarea.addEventListener("input", function (e) {
        var code = e.target.value;
        console.log(code);
    });
});