var document = this.document;
var window = this.window;
var navigator = this.navigator;

var version = '1.0.0-alpha-3';
const helpText = `<br>
命令：<br>
&nbsp;VCC | VCC<br>
&nbsp;清空 | 清空屏幕<br>
&nbsp;IP | 获取您的IP<br>
&nbsp;处理器核心数 | 获取设备的处理器的核心数<br>
&nbsp;用户代理 | 获取用户代理<br>
&nbsp;连接 [下行带宽/类型/往返延时] | 获取网络连接信息<br>
&nbsp;时间 | 获取当前时间<br>
&nbsp;窗口 {URL} | 在新的窗口打开一个网页<br>
&nbsp;帮助 | 显示帮助<br><br>
快捷键：<br>
&nbsp;对准输入框右键 | 粘贴文本<br>
&nbsp;命令窗口双击左键 | 获取焦点<br><br>
更多：<br>
&nbsp;<a href="https://docs.qq.com/form/page/DR0N2Sm1SWk5FaHB4" target="_blank">VCC包添加申请</a><br>
&nbsp;<a href="https://docs.qq.com/doc/DR21jZ2tvY3ZLdEZ5" target="_blank">VCC包制作教程</a><br>
`;
var commandRecord = [];
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
var pkgs = [];

function getNowTime() {
    return new Date().toLocaleString();
}
document.addEventListener('DOMContentLoaded', function () {
    var main = document.getElementById('main');
    var vcc = new pgdbs(dbs_6cdcdb5902f1897c878693621e0a9c05e31dfb3bd421d75663a4a017cfd01954);
    var murmur;
    console.log(document.querySelector('#main:first-child'));
    Fingerprint2.get(options, function (components) {
        const values = components.map(function (component) {
            return component.value
        });
        murmur = Fingerprint2.x64hash128(values.join(''), 31);
    });
    function inputWidth() {
        var ps = document.querySelectorAll('p');
        var p = ps[ps.length - 1];
        return main.offsetWidth - p.offsetWidth;
    }
    main.innerHTML += `VCC [版本：${version}] ${getNowTime()}<br>© IFTC 2020-2024 All Rights Reserved.<br>输入 帮助 以获得相关命令<br>`
    function inputer() {
        var historyNum = commandRecord.length;
        main.innerHTML += `<br><p class="user">IFTC://${murmur}></p>`;
        main.innerHTML += `<input style="width: ${inputWidth() - 2}px;">`;
        var input = document.querySelector('input');
        document.oncontextmenu = function () {
            return false;
        };
        input.oncontextmenu = async function () {
            try {
                const text = await navigator.clipboard.readText();
                console.log('剪贴板的内容是:', text);
                input.value = text;
            } catch (err) {
                console.error('无法读取剪贴板:', err);
            }
            input.focus();
        };
        main.ondblclick = function () {
            input.focus();
        }
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
                    main.innerHTML = `VCC [版本：${version}] ${getNowTime()}<br>© IFTC 2020-2024 All Rights Reserved.<br>输入 帮助 以获得相关命令<br>`;
                    inputer();
                } else if (command[0] == "帮助") {
                    main.innerHTML += helpText;
                    inputer();
                } else if (command[0] == "IP" || command[0] == "ip") {
                    main.innerHTML += `<br>正在获取IP...`;
                    fetch('https://api.ipify.org?format=json')
                        .then(response => response.json())
                        .then(data => {
                            main.innerHTML += `<br>您的IP为${data.ip}`;
                            inputer();
                        })
                        .catch(error => {
                            main.innerHTML += `<div style="color: red;">获取IP失败<br></div>`;
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
                } else if (command[0] == "时间") {
                    main.innerHTML += `<br>${getNowTime()}`;
                    inputer();
                } else if (command[0] == "VCC") {
                    main.innerHTML += `<br><br>VCC [版本：${version}] ${getNowTime()}<br>© IFTC 2020-2024 All Rights Reserved.<br>输入 帮助 以获得相关命令<br>`
                    inputer();
                } else if (command[0] == "窗口") {
                    try {
                        if (command[1] == undefined || command[1].trim() == "") {
                            main.innerHTML += `<br>正在打开空白标签`;
                        } else {
                            main.innerHTML += `<br>正在打开${command[1]}`;
                        }
                        try {
                            window.open(command[1]);
                            main.innerHTML += `<div style="color: green;">打开窗口成功</div>`;
                        } catch (error) {
                            main.innerHTML += `<div style="color: red;">打开窗口失败</div>`;
                        }
                    } catch (error) {
                        main.innerHTML += `<div style="color: red;">打开窗口失败</div>`;
                    }
                    inputer();
                } else if (command[0] == "包") {
                    if (command[1] == "安装") {
                        main.innerHTML += `<br>正在查询并获取 ${command[2]} 的包...`;
                        vcc.getTableData({
                            page: 1,
                            limit: 1,
                            filter: `包名='${command[2]}'`
                        }).then((json) => {
                            console.log(json);
                            if (json.code == 200) {
                                if (json.fields.length != 1) {
                                    main.innerHTML += `<br><div style="color: orange;">${command[2]} 未找到</div>`;
                                    inputer();
                                } else {
                                    main.innerHTML += `<br>正在下载 ${command[2]} 的包...`;
                                    var url = json.fields[0].URL;
                                    fetch(url)
                                        .then(response => response.text())
                                        .then(data => {
                                            localStorage.setItem(command[2], data);
                                            main.innerHTML += `<br>包 ${command[2]} 下载完成<br>`;
                                            inputer();
                                        })
                                }
                            } else {
                                main.innerHTML += `<br><div style="color: red;">${json.msg}</div>`;
                                inputer();
                            }
                        })
                    } else if (command[1] == "卸载") {
                        main.innerHTML += `<br>正在卸载 ${command[2]} 的包...`;
                        localStorage.removeItem(command[2]);
                        main.innerHTML += `<br>包 ${command[2]} 卸载完成<br>`;
                        inputer();
                    } else if (command[1] == "运行") {
                        if (localStorage.getItem(command[2]) == undefined) {
                            main.innerHTML += `<br><div style="color: red;">${command[2]} 未安装</div>`;
                            inputer();
                        } else {
                            main.innerHTML += `<br>正在运行 ${command[2]} 的包...`;
                            loadpkg(localStorage.getItem(command[2]))
                            main.innerHTML += `<br>包 ${command[2]} 运行完成`
                            inputer();
                        }
                    } else if (command[1] == "搜索") {
                        main.innerHTML += `<br>搜索中...`;
                        if (command[2] == undefined || command[2].trim() == "") {
                            command[2] = "";
                        }
                        vcc.getTableData({
                            page: 1,
                            limit: 10000,
                            filter: `包名 LIKE '%${command[2]}%'`
                        }).then((json) => {
                            if (json.code == 200) {
                                main.innerHTML += `<br>找到 ${json.fields.length} 个包`;
                                for (var i = 0; i < json.fields.length; i++) {
                                    main.innerHTML += `<br>${json.fields[i].包名}<br>`
                                }
                                inputer();
                            } else {
                                main.innerHTML += `<br><div style="color: red;">搜索失败 ${json.msg}</div>`;
                            }
                        })
                    }
                }
                else {
                    function print() {
                        main.innerText += `<br>${command}`;
                    }
                    for (var i = 0; i < pkgs.length; i++) {
                        if (command[0] == pkgs[i]) {
                            pkgs[i].forEach((item, index) => {
                                if (command[1] == item.command) {
                                    for (var j = 0; j < item.command.length; j++) {
                                        code.replaceAll(`{${j}}`, command[j + 2])
                                    }
                                    eval(code);
                                    inputer();
                                }
                            });
                        }
                    }
                    //main.innerHTML += `<br><div style="color: red;">命令错误<br>输入 帮助 以获得相关命令</div>`;
                    //inputer();
                }
                commandRecord.push(input.value);
            } else if (e.key == "ArrowUp") {
                if (historyNum > 0) {
                    input.value = commandRecord[historyNum - 1];
                    historyNum--;
                }
            } else if (e.key == "ArrowDown") {
                if (historyNum < commandRecord.length - 1) {
                    input.value = commandRecord[historyNum + 1];
                    historyNum++;
                }
            }
        });
    }
    inputer();
    function loadpkg(package) {
        try {
            var pkg = JSON.parse(package);
            pkgs.forEach((item, index) => {
                if (item[pkg.name]) {
                    main.innerHTML += `<br><div style="color: orange;">${pkg.name} 已存在</div>`;
                    return false;
                }
            });
            try {
                var pkg_options = {}
                if (pkg.main) {
                    pkg_options[pkg.name] = pkg.main;
                    pkgs.push(pkg_options);
                } else {
                    main.innerHTML += `<br><div style="color: red;">${pkg.name} 未找到主程序</div>`;
                }
            } catch (error) {
                main.innerHTML += `<br><div style="color: red;">包 运行失败，原因：为找到包配置->name</div>`;
            }
        } catch (error) {
            main.innerHTML += `<br><div style="color: red;">包 运行失败，原因：不是一个有效包</div>`;
        }
    }
});