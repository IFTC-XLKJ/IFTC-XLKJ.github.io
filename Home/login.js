var document = this.document;
var window = this.window;
console.log(window);
console.log(document);
function getpassid() {
	return new Promise((resolve, reject) => {
		const strlist = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += strlist[Math.floor(Math.random() * strlist.length)];
		}
		resolve(str);
	});
}
console.log(passid())
document.addEventListener('DOMContentLoaded', function () {
	console.log("onload");
	var Slogin = document.getElementById('Slogin');
	var Blogin = document.getElementById('Blogin');
	var qrlogin = document.getElementById('qrlogin');
	console.log(Slogin);
	var ms = 0;
	var interval;
	function updateTimer() {
		ms++;
	}
	function startTimer() {
		interval = setInterval(updateTimer, 1);
	}
	function stopTimer() {
		clearInterval(interval);
	}

	function resetTimer() {
		stopTimer();
		ms = 0;
	}
	startTimer();
	var weblogin = new pgdbs(dbs_29956f7ff3449ed31f3e59bb3eb685d93ed73e96f6f9dfe01f2f65cbb08dcc14);
	console.log(weblogin);
	Slogin.addEventListener('click', function () {
		console.log("click");
		weblogin.onGetData((json, id, url) => {
			if (id == 'login') {
				console.log(json);
				if (json.code == 200) {
					if (json.fields.length == 0) {
						alert('登录失败');
					} else {
						alert('登录成功');
					}
				} else {
					alert('登录失败');
				}
			}
		});
		weblogin.getTableData({ page: 1, limit: 100, id: 'login', filter: `time='${localStorage.getItem('qrtime')}'` })
	})
	Blogin.addEventListener('click', function () {
		console.log("click", ms);
		weblogin.onGetData((json, id, url) => {
			if (id == 'add') {
				console.log(json);
				if (json.code == 200) {
					const qrcodeDiv = document.getElementById('qrlogin');
					getpassid()
						.then(passid => {
							const passid = passid
							console.log(password);
						}).catch(error => {
							console.error('生成密码时出错:', error);
						});
					localStorage.setItem('passid', passid);
					const text = `{"time":${localStorage.getItem('passid')},"type":"login"}`;
					console.log(JSON.parse(text));
					new QRCode(qrcodeDiv, {
						text: text,
						width: 250,
						height: 250,
					});
				} else {
					alert('请点击黑色方框内重试');
				}
				resetTimer();
				startTimer();
			}
		});
		if (ms >= 200) {
			weblogin.setTableData({ type: 'INSERT', filter: 'passid', fields: `('${localStorage.getItem('qrtime')}')`, id: 'add' });
		}

	})
	qrlogin.addEventListener('click', function () {
		console.log("click", ms);
		weblogin.onGetData((json, id, url) => {
			if (id == 'add') {
				console.log(json);
				if (json.code == 200) {
					qrlogin.innerHTML = "";
					const qrcodeDiv = document.getElementById('qrlogin');
					getpassid()
						.then(passid => {
							const passid = passid
							console.log(password);
						}).catch(error => {
							console.error('生成密码时出错:', error);
						});
					localStorage.setItem('passid', passid);
					const text = `{"time":${localStorage.getItem('passid')},"type":"login"}`;
					console.log(JSON.parse(text));
					new QRCode(qrcodeDiv, {
						text: text,
						width: 250,
						height: 250,
					});
				} else {
					alert('请点击黑色方框内重试');
				}
				resetTimer();
				startTimer();
			}
		});
		if (ms >= 200) {
			weblogin.setTableData({ type: 'INSERT', filter: 'passid', fields: `('${localStorage.getItem('passid')}')`, id: 'add' });
		}
	})
});