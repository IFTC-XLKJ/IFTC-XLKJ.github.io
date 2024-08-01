var document = this.document;
var window = this.window;
var navigator = this.navigator;

var version = "1.0.0-beta-1";
const fonts = ["Standard", "Ghost", "Wow", "3D-ASCII", "Alpha", "Banner", "Basic", "Bear", "Big Chief", "Block"];
const fontsName = ["标准", "幽灵", "哇", "3DASCII", "阿尔法", "横幅", "基础", "熊", "大首", "块"];
const helpText = `
命令：
&nbsp;VCC | VCC
&nbsp;清空 | 清空屏幕
&nbsp;IP | 获取您的IP
&nbsp;处理器核心数 | 获取设备的处理器的核心数
&nbsp;用户代理 | 获取用户代理
&nbsp;连接 [下行带宽/类型/往返延时] | 获取网络连接信息
&nbsp;时间 | 获取当前时间
&nbsp;窗口 {URL} | 在新的窗口打开一个网页
&nbsp;包 [安装/运行/卸载/搜索] {包名（搜索时，使用关键词）} | JS包
&nbsp;请求 | 该命令完整<a href="https://docs.qq.com/doc/DR0h3UGx2UmtFZE12" traget="_blank">帮助文档</a>
&nbsp;账号查询 {ID} | 查询指定ID的账号数据
&nbsp;MC服务器 | 查询"IFTC"服务器的相关信息
&nbsp;IP查询 {IP(s)} | 查询对应IP的省份编码、城市编码、归属地，多个IP请用英文格式下的逗号分开
&nbsp;图文本 [标准/幽灵/(<a class="morefonts" href="javascript:;">更多字体...</a>)] {ASCII字符(共128个)} | 生成ASCII艺术字（统称为“图文本”）
&nbsp;图文本字体 | 查看所有图文本的可用字体
&nbsp;帮助 | 显示帮助<br>
快捷键：
&nbsp;对准输入框右键 | 粘贴文本
&nbsp;命令窗口双击左键 | 获取焦点<br>
更多：
&nbsp;<a href="https://docs.qq.com/form/page/DR0N2Sm1SWk5FaHB4" target="_blank">VCC包添加申请</a>
&nbsp;<a href="https://docs.qq.com/doc/DR21jZ2tvY3ZLdEZ5" target="_blank">VCC包制作教程</a>
`;
var commandRecord = [];
let excludes = {
  userAgent: true,
  audio: true,
  enumerateDevices: true,
  fonts: true,
  fontsFlash: true,
  webgl: true,
  canvas: true,
};
let options = { excludes: excludes };
var pkgs = {};

function ToBottom() {
  var main = document.getElementById("main");
  main.scrollTop = main.scrollHeight;
}
function getNowTime() {
  return new Date().toLocaleString();
}
document.addEventListener("DOMContentLoaded", function () {
  var main = document.getElementById("main");
  var vcc = new pgdbs(
    dbs_6cdcdb5902f1897c878693621e0a9c05e31dfb3bd421d75663a4a017cfd01954
  );
  var vvzh = new pgdbs(
    dbs_a6b2a4d6c02022e831626d31ab805a468a151b90d5161660485a73cc6e1ea902
  );
  var murmur;
  console.log(document.querySelector("#main:first-child"));
  Fingerprint2.get(options, function (components) {
    const values = components.map(function (component) {
      return component.value;
    });
    murmur = Fingerprint2.x64hash128(values.join(""), 31);
  });
  function inputWidth() {
    var ps = document.querySelectorAll("p");
    var p = ps[ps.length - 1];
    return main.offsetWidth - p.offsetWidth;
  }
  main.innerHTML += `VCC [版本：${version}] ${getNowTime()}<br>© IFTC 2020-2024 All Rights Reserved.<br>输入 帮助 以获得相关命令<br>`;
  function inputer() {
    var historyNum = commandRecord.length;
    main.innerHTML += `<br><p class="user">IFTC://${murmur}></p>`;
    main.innerHTML += `<input style="width: ${inputWidth() - 16}px;">`;
    var input = document.querySelector("input");
    var morefonts = document.querySelectorAll(".morefonts");
    morefonts.forEach((item, index) => {
      item.addEventListener("click", function () {
        input.value = "图文本字体";
        input.focus();
        const enterKeyEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: 'Enter',
          code: 'Enter',
        });
        input.dispatchEvent(enterKeyEvent);
      });
    });
    ToBottom();
    document.oncontextmenu = function () {
      return false;
    };
    input.oncontextmenu = async function () {
      try {
        const text = await navigator.clipboard.readText();
        console.log("剪贴板的内容是:", text);
        input.value = text;
      } catch (err) {
        console.error("无法读取剪贴板:", err);
      }
      input.focus();
    };
    main.ondblclick = function () {
      input.focus();
    };
    input.focus();
    input.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        input.remove();
        main.innerHTML += `${input.value
          .replaceAll("<", "&lt")
          .replaceAll(">", "&gt")}`;
        var command = input.value.split(" ");
        console.log(command);
        if (command[0].trim() == "") {
          inputer();
        } else if (command[0] == "清空") {
          main.innerHTML = `VCC [版本：${version}] ${getNowTime()}<br>© IFTC 2020-2024 All Rights Reserved.<br>输入 帮助 以获得相关命令<br>`;
          inputer();
        } else if (command[0] == "帮助") {
          main.innerHTML += helpText;
          inputer();
        } else if (command[0] == "IP" || command[0] == "ip") {
          main.innerHTML += `<br>正在获取IP...`;
          ToBottom();
          fetch("https://api.ipify.org?format=json")
            .then((response) => response.json())
            .then((data) => {
              main.innerHTML += `<br>您的IP为${data.ip}`;
              inputer();
            })
            .catch((error) => {
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
          main.innerHTML += `<br><br>VCC [版本：${version}] ${getNowTime()}<br>© IFTC 2020-2024 All Rights Reserved.<br>输入 帮助 以获得相关命令<br>`;
          inputer();
        } else if (command[0] == "窗口") {
          try {
            if (command[1] == undefined || command[1].trim() == "") {
              main.innerHTML += `<br>正在打开空白标签`;
            } else {
              main.innerHTML += `<br>正在打开${command[1]}`;
            }
            ToBottom();
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
            ToBottom();
            vcc
              .getTableData({
                page: 1,
                limit: 1,
                filter: `包名='${command[2]}'`,
              })
              .then((json) => {
                console.log(json);
                if (json.code == 200) {
                  if (json.fields.length != 1) {
                    main.innerHTML += `<br><div style="color: orange;">${command[2]} 未找到</div>`;
                    inputer();
                  } else {
                    main.innerHTML += `<br>正在下载 ${command[2]} 的包...`;
                    ToBottom();
                    var url = json.fields[0].URL;
                    $.ajax({
                      url: url,
                      type: "GET",
                      dataType: "json",
                      success: function (data) {
                        localStorage.setItem(command[2], JSON.stringify(data));
                        main.innerHTML += `<br>包 ${command[2]} 下载完成<br>`;
                        inputer();
                      },
                      error: function (xhr, status, error) {
                        main.innerHTML += `<div style="color: red;">下载失败</div>`;
                        inputer();
                      },
                    });
                  }
                } else {
                  main.innerHTML += `<br><div style="color: red;">${json.msg}</div>`;
                  inputer();
                }
              });
          } else if (command[1] == "卸载") {
            main.innerHTML += `<br>正在卸载 ${command[2]} 的包...`;
            ToBottom();
            localStorage.removeItem(command[2]);
            main.innerHTML += `<br>包 ${command[2]} 卸载完成<br>`;
            inputer();
          } else if (command[1] == "运行") {
            if (localStorage.getItem(command[2]) == undefined) {
              main.innerHTML += `<br><div style="color: red;">${command[2]} 未安装</div>`;
              inputer();
            } else {
              main.innerHTML += `<br>正在运行 ${command[2]} 的包...`;
              ToBottom();
              loadpkg(localStorage.getItem(command[2]), command[2]);
              main.innerHTML += `<br>包 ${command[2]} 运行完成`;
              inputer();
            }
          } else if (command[1] == "搜索") {
            main.innerHTML += `<br>搜索中...`;
            ToBottom();
            if (command[2] == undefined || command[2].trim() == "") {
              command[2] = "";
            }
            vcc
              .getTableData({
                page: 1,
                limit: 10000,
                filter: `包名 LIKE '%${command[2]}%'`,
              })
              .then((json) => {
                if (json.code == 200) {
                  main.innerHTML += `<br>找到 ${json.fields.length} 个包`;
                  ToBottom();
                  for (var i = 0; i < json.fields.length; i++) {
                    main.innerHTML += `<br>${json.fields[i].包名}<br>`;
                  }
                  inputer();
                } else {
                  main.innerHTML += `<br><div style="color: red;">搜索失败 ${json.msg}</div>`;
                  inputer();
                }
              });
          }
        } else if (command[0] == "请求") {
          if (command[1] == "GET") {
            main.innerHTML += `<br>正在发送请求...`;
            ToBottom();
            try {
              $.ajax({
                url: command[2],
                type: "GET",
                headers: JSON.parse(command[3]),
                data: JSON.parse(command[4]),
                success: function (data) {
                  main.innerHTML += `<br><div style="color: green;">请求成功</div><br>`;
                  ToBottom();
                  main.innerHTML += `<br>${JSON.stringify(data)
                    .replaceAll("<", "&lt")
                    .replaceAll(">", "&gt")
                    .replaceAll("\\r\\n", "<br>")
                    .replaceAll(" ", "&nbsp;")}<br>`;
                  inputer();
                },
                error: function (xhr, status, error) {
                  main.innerHTML += `<div style="color: red;">请求失败<br>${error}</div>`;
                  inputer();
                },
              });
            } catch (error) {
              main.innerHTML += `<div style="color: red;">请求失败<br>${error}</div>`;
              inputer();
            }
          } else if (command[1] == "POST") {
            main.innerHTML += `<br>正在发送请求...`;
            ToBottom();
            try {
              $.ajax({
                url: command[2],
                type: "POST",
                headers: JSON.parse(command[3]),
                data: JSON.parse(command[4]),
                success: function (data) {
                  main.innerHTML += `<br><div style="color: green;">请求成功</div><br>`;
                  ToBottom();
                  main.innerHTML += `<br>${JSON.stringify(data)
                    .replaceAll("<", "&lt")
                    .replaceAll(">", "&gt")
                    .replaceAll("\\r\\n", "<br>")
                    .replaceAll(" ", "&nbsp;")}<br>`;
                  inputer();
                },
                error: function (xhr, status, error) {
                  main.innerHTML += `<div style="color: red;">请求失败<br>${error}</div>`;
                  inputer();
                },
              });
            } catch (error) {
              main.innerHTML += `<div style="color: red;">请求失败<br>${error}</div>`;
              inputer();
            }
          } else {
            main.innerHTML += `<div style="color: red;">请求命令错误</div>`;
            inputer();
          }
        } else if (command[0] == "账号查询") {
          main.innerHTML += `<br>正在查询账号...`;
          ToBottom();
          vvzh
            .getTableData({
              page: 1,
              limit: 1,
              filter: `ID='${command[1]}'`,
              fields: `ID,昵称,头像,V币,邮箱,容量,VIP,签到,管理员,封号,头衔,头衔色`,
            })
            .then((json) => {
              console.log(json);
              if (json.code == 200) {
                if (json.fields.length == 1) {
                  var data = json.fields[0];
                  main.innerHTML += `<br><div style="color: green;">查询成功</div><br>`;
                  ToBottom();
                  main.innerHTML += `查询的账号ID：${data.ID}<br>`;
                  main.innerHTML += `用户昵称：${data.昵称}<br>`;
                  main.innerHTML += `用户头像：<img src="${data.头像}" style="width: 100px;border-radius: 50%;"><br>`;
                  main.innerHTML += `用户虚拟币数量：${data.V币}V币<br>`;
                  main.innerHTML += `用户邮箱：<a href="mailto:${data.邮箱}">${data.邮箱}</a><br>`;
                  main.innerHTML += `用户云盘容量：${data.容量}TB<br>`;
                  main.innerHTML += `用户为VIP：${Boolean(data.VIP) ? "是" : "否"
                    }<br>`;
                  function getYear(timestamp) {
                    var date = new Date(timestamp);
                    var year = date.getFullYear();
                    return year;
                  }

                  function getMonth(timestamp) {
                    var date = new Date(timestamp);
                    var month = date.getMonth() + 1;
                    return month;
                  }

                  function getDay(timestamp) {
                    var date = new Date(timestamp);
                    var day = date.getDate();
                    return day;
                  }
                  function isSigned(timestamp0, timestamp1) {
                    var date = new Date();
                    var year0 = getYear(timestamp0);
                    var year1 = getYear(timestamp1);
                    console.log("年", year0, year1);
                    if (year0 == year1) {
                      var month0 = getMonth(timestamp0);
                      var month1 = getMonth(timestamp1);
                      console.log("月", month0, month1);
                      if (month0 == month1) {
                        var day0 = getDay(timestamp0);
                        var day1 = getDay(timestamp1);
                        console.log("日", day0, day1);
                        if (day0 == day1) {
                          return true;
                        } else {
                          return false;
                        }
                      } else {
                        return false;
                      }
                    } else {
                      return false;
                    }
                  }
                  main.innerHTML += `用户已签到：${isSigned(data.签到, Date.now()) ? "是" : "否"
                    }<br>`;
                  main.innerHTML += `用户为管理员：${data.管理员 == 1 ? "是" : "否"
                    }<br>`;
                  main.innerHTML += `用户已冻结：${data.封号 == 1 ? "是" : "否"
                    }<br>`;
                  main.innerHTML += `用户头衔：${data.头衔}<br>`;
                  main.innerHTML += `用户头衔颜色：<div style="display: inline-block;background-color: ${data.头衔色};border-radius: 5px;width: 16px;height: 16px;position: relative;top: 2px;" title="${data.头衔色}"></div><br>`;
                } else {
                  main.innerHTML += `<div style="color: orange;">该ID未注册VV账号</div>`;
                }
              } else {
                main.innerHTML += `<div style="color: red;">查询失败<br>${json.msg}</div>`;
              }
              inputer();
            });
        } else if (command[0] == "MC服务器") {
          main.innerHTML += `<br>正在查询"IFTC"服务器...`;
          ToBottom();
          $.ajax({
            url: "https://api.sageded.top/api/mc/serverMsg?ip=play.simpfun.cn&port=25079",
            type: "get",
            dataType: "json",
            success: function (data) {
              console.log(data);
              if (data.flag) {
                main.innerHTML += `<br><div style="color: green;">查询成功</div><br>`;
                main.innerHTML += `服务器最大玩家数：${data.data.players.max}<br>`;
                main.innerHTML += `服务器在线玩家数：${data.data.players.online}<br><br>`;
                if (data.data.players.sample) {
                  data.data.players.sample.forEach((item, index) => {
                    main.innerHTML += `第${index + 1}名玩家，玩家名：${item.name
                      }，玩家ID：${item.id}<br>`;
                  });
                }
                main.innerHTML += `<br>服务器延迟：${data.data.ping}<br>`;
              } else {
                main.innerHTML += `<div style="color: red;">查询失败</div><br>`;
              }
              inputer();
            },
            error: function (data) {
              main.innerHTML += `<div style="color: red;">查询失败</div><br>`;
              inputer();
            },
          });
        } else if (command[0] == "IP查询") {
          if (command[1]) {
            var IP = 0;
            const IPRex = new RegExp(
              "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
            );
            command[1].split(",").forEach((item, index) => {
              if (IPRex.test(item)) {
                IP++;
              }
            });
            if (IP == command[1].split(",").length) {
              main.innerHTML += `<br>正在查询"${command[1].replaceAll(
                ",",
                " "
              )}"的IP地址...`;
              ToBottom();
              $.ajax({
                url: "https://api.sageded.top/api/other/ip?ips=" + command[1],
                type: "get",
                dataType: "json",
                success: function (data) {
                  if (data.flag) {
                    main.innerHTML += `<br><div style="color: green;">查询成功</div>`;
                    data.data.forEach((item, index) => {
                      main.innerHTML += `<br>第${index + 1}条IP地址（${item.ip
                        }）<br>`;
                      main.innerHTML += `IP地址所属位置：${item.addr}<br>`;
                      main.innerHTML += `省份编码：${item.proCode}<br>`;
                      main.innerHTML += `城市编码：${item.cityCode}<br>`;
                    });
                  } else {
                    main.innerHTML += `<div style="color: red;">查询失败</div><br>`;
                  }
                  inputer();
                },
                error: function (err) {
                  main.innerHTML += `<div style="color: red;">查询失败</div><br>`;
                  inputer();
                },
              });
            } else {
              main.innerHTML += `<div style="color: red;">IP地址格式错误</div>`;
              inputer();
            }
          } else {
            main.innerHTML += `<br>正在查询当前的IP地址...`;
            ToBottom();
            $.ajax({
              url: "https://api.ipify.org?format=json",
              type: "get",
              dataType: "json",
              success: function (data) {
                $.ajax({
                  url: "https://api.sageded.top/api/other/ip?ips=" + data.ip,
                  type: "get",
                  dataType: "json",
                  success: function (data) {
                    if (data.flag) {
                      main.innerHTML += `<br><div style="color: green;">查询成功</div>`;
                      data.data.forEach((item, index) => {
                        main.innerHTML += `<br>第${index + 1}条IP地址（${item.ip
                          }）<br>`;
                        main.innerHTML += `IP地址所属位置：${item.addr}<br>`;
                        main.innerHTML += `省份编码：${item.proCode}<br>`;
                        main.innerHTML += `城市编码：${item.cityCode}<br>`;
                      });
                    } else {
                      main.innerHTML += `<div style="color: red;">查询失败</div><br>`;
                    }
                    inputer();
                  },
                  error: function (err) {
                    main.innerHTML += `<div style="color: red;">查询失败</div><br>`;
                    inputer();
                  },
                });
              },
              error: function (err) {
                main.innerHTML += `<div style="color: red;">查询失败</div><br>`;
                inputer();
              },
            });
          }
        } else if (command[0] == "图文本") {
          var Text = "";
          for (var i = 2; i < command.length; i++) {
            Text += command[i] + ` `;
          }
          figlet.defaults({
            fontPath: "./figlet/fonts",
          });
          figlet.preloadFonts(fonts, function () {
            console.log("prefetching done (only did it for 2 fonts)!");
          });
          var font;
          var isFont = false;
          fontsName.forEach((item, index) => {
            if (command[1] == item) {
              font = fonts[index];
              isFont = true;
            }
          });
          if (!isFont) {
            main.innerHTML += `<div style="color: red;">字体错误</div>`;
            inputer();
            return;
          }
          console.log(`选择的字体${font}`)
          figlet(Text, font, function (err, text) {
            if (err) {
              console.log("something went wrong...");
              console.dir(err);
              main.innerHTML += `<div style="color: red;">生成失败</div><br>`;
              return;
            }
            console.log(text);
            main.innerHTML += `<br><div style="color: green;">生成成功</div>`;
            console.log((text.split("\n")).length);
            var maxWidth = 0;
            for (var i = 0; i < (text.split("\n")).length; i++) {
              if (maxWidth < (text.split("\n")[i]).length) {
                maxWidth = (text.split("\n")[i]).length * 8.7899;
              }
            }
            main.innerHTML += `<br><div class="figlet-container" style="grid-template-rows: repeat(${(text.split("\n")).length}, 18px);width: ${maxWidth}px;">${text}</div><br>`;
            inputer();
          });
        } else if (command[0] == "图文本字体") {
          main.innerHTML += `<br>`;
          var fontnum = 0;
          fontsName.forEach((font, n) => {
            main.innerHTML += `${n + 1} | ${font}<br>`;
            fontnum = n + 1;
          });
          main.innerHTML += `共有${fontnum}种字体<br>`;
          inputer();
        }
        else {
          function print(text) {
            var main = document.getElementById("main");
            main.innerHTML += `<br>${String(text)
              .replaceAll("<", "&lt")
              .replaceAll(">", "&gt")}`;
            ToBottom();
          }
          function error(text) {
            var main = document.getElementById("main");
            main.innerHTML += `<br><div style="color: red;">${String(text)
              .replaceAll("<", "&lt")
              .replaceAll(">", "&gt")}</div>`;
            ToBottom();
          }
          function warn(text) {
            var main = document.getElementById("main");
            main.innerHTML += `<br><div style="color: orange;">${String(text)
              .replaceAll("<", "&lt")
              .replaceAll(">", "&gt")}</div>`;
            ToBottom();
          }
          function info(text) {
            var main = document.getElementById("main");
            main.innerHTML += `<br><div style="color: green;">${String(text)
              .replaceAll("<", "&lt")
              .replaceAll(">", "&gt")}</div>`;
            ToBottom();
          }
          console.log(command[0]);
          console.log(pkgs[command[0]]);
          if (pkgs[command[0]]) {
            var execute = false;
            var times = 0;
            pkgs[command[0]].forEach((item, index) => {
              if (command[1] == item.command) {
                var code = item.code;
                for (var j = 0; j < command.length - 2; j++) {
                  code = code.replaceAll(`{${j}}`, command[j + 2]);
                  console.log(`{${j}}`);
                }
                console.log(code);
                try {
                  eval(code);
                } catch (error) {
                  main.innerHTML += `<br><div style="color: red;">包代码错误</div>`;
                }
                execute = true;
                times = index;
                inputer();
              } else {
                if (times == pkgs[command[0]] && !execute) {
                  main.innerHTML += `<br><div style="color: red;">包命令错误<br>输入 帮助 以获得相关命令</div>`;
                  inputer();
                }
              }
            });
          } else {
            main.innerHTML += `<br><div style="color: red;">命令错误<br>输入 帮助 以获得相关命令</div>`;
            inputer();
          }
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
  function loadpkg(package, name) {
    try {
      var pkg = JSON.parse(package);
      if (pkgs[pkg.name]) {
        main.innerHTML += `<br><div style="color: orange;">${pkg.name} 已存在</div>`;
        return false;
      }
      try {
        if (pkg.main) {
          pkgs[name] = pkg.main;
        } else {
          main.innerHTML += `<br><div style="color: red;">${pkg.name} 未找到主程序</div>`;
        }
      } catch (error) {
        main.innerHTML += `<br><div style="color: red;">包 运行失败，原因：为找到包配置->name</div>`;
      }
    } catch (error) {
      console.log(error);
      main.innerHTML += `<br><div style="color: red;">包 运行失败，原因：不是一个有效包</div>`;
    }
  }
});
