var document = this.document;
var window = this.window;
console.log(window);
console.log(document);
function getpassid() {
	const strlist = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var str = '';
	for (var i = 0; i < 10; i++) {
		str += strlist[Math.floor(Math.random() * strlist.length)];
	}
	return str;
}
document.addEventListener('DOMContentLoaded', function () {
	console.log("onload");
	var Slogin = document.getElementById('Slogin');
	var Blogin = document.getElementById('Blogin');
	var qrlogin = document.getElementById('qrlogin');
	var Dlogin = document.getElementById("Dlogin");
	var userImg = document.getElementById('user_img');
	var user = document.getElementById('user');
	var login = document.getElementById('login');
	var loader = document.getElementById('loader');
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
	var vvzh = new pgdbs(dbs_a6b2a4d6c02022e831626d31ab805a468a151b90d5161660485a73cc6e1ea902);
	console.log(vvzh);
	function getUserData() {
		vvzh.onGetData((json, id, url) => {
			if (id == '获取用户数据') {
				console.log(json);
				if (json.code == 200) {
					if (json.fields.length == 0) {
						alert('登录失败');
						loader.close();
					} else {
						localStorage.setItem('头像', json.fields[0].头像);
						localStorage.setItem('昵称', json.fields[0].昵称);
						localStorage.setItem('V币', json.fields[0].V币);
						alert('登录成功');
						Dlogin.close();
						user.style.display = 'inline';
						user.style.height = '60px';
						user.style.width = '60px';
						login.style.margin = '0px';
						Blogin.style.display = 'none';
						userImg.src = localStorage.getItem('头像');
						loader.close();
					}
				} else {
					alert('登录失败');
					loader.close();
				}
			}
		});
		vvzh.getTableData({ page: 1, limit: 100, id: '获取用户数据', filter: `ID='${localStorage.getItem('ID')}'` })
	}
	Slogin.addEventListener('click', function () {
		loader.showModal();
		console.log("click");
		weblogin.onGetData((json, id, url) => {
			if (id == 'login') {
				console.log(json);
				if (json.code == 200) {
					if (json.fields.length == 0) {
						alert('登录失败');
						loader.close();
					} else {
						localStorage.setItem('ID', json.fields[0].ID);
						setTimeout(() => {
							getUserData();
						}, 200);
					}
				} else {
					alert('登录失败');
					loader.close();
				}
			}
		});
		weblogin.getTableData({ page: 1, limit: 100, id: 'login', filter: `passid='${localStorage.getItem('passid')}'` })
	})
	Blogin.addEventListener('click', function () {
		console.log("click", ms);
		const passid = getpassid();
		localStorage.setItem('passid', passid);
		const text = `{"passid":"${localStorage.getItem('passid')}","type":"login"}`;
		weblogin.onGetData((json, id, url) => {
			if (id == 'add') {
				loader.close();
				console.log(json);
				if (json.code == 200) {
					const qrcodeDiv = document.getElementById('qrlogin');
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
	qrlogin.addEventListener('click', function () {
		loader.showModal();
		console.log("click", ms);
		const passid = getpassid();
		localStorage.setItem('passid', passid);
		const text = `{"passid":"${localStorage.getItem('passid')}","type":"login"}`;
		weblogin.onGetData((json, id, url) => {
			if (id == 'add') {
				loader.close();
				console.log(json);
				if (json.code == 200) {
					qrlogin.innerHTML = "";
					const qrcodeDiv = document.getElementById('qrlogin');
					console.log(JSON.parse(text));
					new QRCode(qrcodeDiv, {
						text: text,
						width: 250,
						height: 250,
					})
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