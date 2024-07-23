var document = this.document;
var window = this.window;

var version = '1.0.0-alpha-1';
let excludes = {
    userAgent: true,
    audio: true,
    enumerateDevices: true,
    fonts: true,
    fontsFlash: true,
    webgl: true,
    canvas: true
};
let options = { excludes: excludes }

document.addEventListener('DOMContentLoaded', function () {
    var murmur;
    console.log(document.querySelector('#main:first-child'));
    Fingerprint2.get(options, function (components) {
        const values = components.map(function (component) {
            return component.value
        });
        murmur = Fingerprint2.x64hash128(values.join(''), 31);
    });
    var main = document.getElementById('main');
    function inputWidth() {
        var ps = document.querySelectorAll('p');
        var p = ps[ps.length - 1];
        return main.offsetWidth - p.offsetWidth;
    }
    main.innerHTML += `VCC [版本：${version}]<br>© IFTC 2020-2024 All Rights Reserved.<br>`
    function inputer() {
        main.innerHTML += `<br><p class="user">IFTC://${murmur}></p>`;
        main.innerHTML += `<input style="width: ${inputWidth() - 1}px;">`;
        var input = document.querySelector('input');
        input.focus();
        input.addEventListener('keydown', function (e) {
            if (e.key == 'Enter') {
                input.remove();
                main.innerHTML += `${input.value}`;
                var command = (input.value).split(' ');
                console.log(command);
                if ((command[0]).trim() == "") {
                    inputer();
                } else if (command[0] == "clear") {
                    main.innerHTML = `VCC [版本：${version}]<br>© IFTC 2020-2024 All Rights Reserved.<br>`;
                    inputer();
                } else if (command[0] == "help") {
                    main.innerHTML += `<br>&nbsp;clear：清空屏幕<br>&nbsp;help：显示帮助<br>`;
                }
            }
        });
    }
    inputer();
});