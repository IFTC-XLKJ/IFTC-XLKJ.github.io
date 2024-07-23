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
    main.innerHTML += `VCC [版本：${version}]<br>© IFTC 2020-2024 All Rights Reserved.<br><br><p class="user">IFTC://${murmur}></p>`
    function inputer() {
        main.innerHTML += `<input style="width: ${inputWidth() - 1}px;">`;
        var input = document.querySelector('input');
        input.focus()
    }
    inputer();
});