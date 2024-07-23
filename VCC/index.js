var document = this.document;
var window = this.window;
var navigator = this.navigator;

var version = '1.0.0-alpha-1';
const helpText = `<br>&nbsp;清空 | 清空屏幕<br>&nbsp;IP | 获取您的IP<br>&nbsp;处理器核心数 | 获取设备的处理器的核心数<br>&nbsp;用户代理 | 获取用户代理<br>&nbsp;帮助 | 显示帮助`;
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
    main.innerHTML += `VCC [版本：${version}]<br>© IFTC 2020-2024 All Rights Reserved.<br>输入 帮助 以获得相关命令<br>`
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
                } else if (command[0] == "清空") {
                    main.innerHTML = `VCC [版本：${version}]<br>© IFTC 2020-2024 All Rights Reserved.<br>`;
                    inputer();
                } else if (command[0] == "帮助") {
                    main.innerHTML += helpText;
                    inputer();
                } else if (command[0] == "IP") {
                    main.innerHTML += `<br>正在获取IP...`;
                    fetch('https://api.ipify.org?format=json')
                        .then(response => response.json())
                        .then(data => {
                            main.innerHTML += `<br>您的IP为${data.ip}`;
                            inputer();
                        })
                        .catch(error => {
                            main.innerHTML += `<div style="color: red;">获取IP失败<br>${error}</div>`;
                            inputer();
                        });
                } else if (command[0] == "处理器核心数") {
                    main.innerHTML += `<br>${navigator.hardwareConcurrency}`;
                    inputer();
                } else if (command[0] == "用户代理") {
                    main.innerHTML += `<br>${navigator.userAgent}`;
                    inputer();
                } else if (command[0] == "连接") {
                    if (command[1] == "下行带宽") {
                        main.innerHTML += `<br>${navigator.connection.downlink}Mbps`;
                    } else if (command[1] == "类型") {
                        main.innerHTML += `<br>${navigator.connection.effectiveType}`;
                    } else if (command[1] == "往返延时") {
                        main.innerHTML += `<br>${navigator.connection.rtt}ms`;
                    } else {
                        main.innerHTML += `<br><div style="color: red;">命令错误<br>输入 帮助 以获得相关命令</div>`;
                    }
                    inputer();
                }
                else {
                    main.innerHTML += `<br><div style="color: red;">命令错误<br>输入 帮助 以获得相关命令</div>`;
                    inputer();
                }
            }
        });
    }
    inputer();
});