var document = this.document;
var window = this.window;
console.log(window);
console.log(document);
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
					localStorage.setItem('qrtime', Date.now());
					const text = `{"time":${localStorage.getItem('qrtime')},"type":"login"}`;
					console.log(JSON.parse(text));
					new QRCode(qrcodeDiv, {
						text: text,
						width: 250,
						height: 250,
					});
					qrlogin.style.display = "flex important";
				} else {
					alert('请点击黑色方框内重试');
				}
				resetTimer();
				startTimer();
			}
		});
		if (ms >= 200) {
			weblogin.setTableData({ type: 'INSERT', filter: 'time', fields: `('${localStorage.getItem('qrtime')}')`, id: 'add' });
		}

	})
	qrlogin.addEventListener('click', function () {
		console.log("click", ms);
		qrlogin.innerHTML = "";
		weblogin.onGetData((json, id, url) => {
			if (id == 'add') {
				console.log(json);
				if (json.code == 200) {
					const qrcodeDiv = document.getElementById('qrlogin');
					localStorage.setItem('qrtime', Date.now());
					const text = `{"time":${localStorage.getItem('qrtime')},"type":"login"}`;
					console.log(JSON.parse(text));
					new QRCode(qrcodeDiv, {
						text: text,
						width: 250,
						height: 250,
					});
					qrlogin.style.display = "flex important";
				} else {
					alert('请点击黑色方框内重试');
				}
				resetTimer();
				startTimer();
			}
		});
		if (ms >= 200) {
			weblogin.setTableData({ type: 'INSERT', filter: 'time', fields: `('${localStorage.getItem('qrtime')}')`, id: 'add' });
		}
	})
});