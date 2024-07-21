var docuemnt = this.document;
var window = this.window;

docuemnt.addEventListener('DOMContentLoaded', () => {
    var editor = docuemnt.getElementById("editor-zoon");
    editor.addEventListener('input', (e) => {
        console.log(editor.innerHTML);
    })
})