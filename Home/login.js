var document = this.document;
var window = this.window;
console.log(window);
console.log(document);
document.addEventListener('DOMContentLoaded', function () {
	console.log("onload");
	var Slogin = document.getElementById('Slogin');
	var Blogin = document.getElementById('Blogin');
	console.log(Slogin);
	var weblogin = new pgdbs(dbs_29956f7ff3449ed31f3e59bb3eb685d93ed73e96f6f9dfe01f2f65cbb08dcc14);
	console.log(weblogin);
	Slogin.addEventListener('click', function () {
		console.log("click");
		weblogin.onGetData((json, id ,url) =>{
			alert(JSON.stringify(json));
		});
		weblogin.getTableData({page:1,limit:30,id:'getTableData'})
	})
	Blogin.addEventListener('click', function () {
		console.log("click");
		const qrcodeDiv = document.getElementById('qrlogin');
		const text = `{"time":${Date.now()},"type":"login"}`;
		console.log(JSON.parse(text));
		new QRCode(qrcodeDiv, {
			text: text,
			width: 250,
			height: 250,
		});
	})
});