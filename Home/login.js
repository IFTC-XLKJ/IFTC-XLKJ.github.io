var document = this.document;
var window = this.window;
console.log(window);
console.log(document);
document.addEventListener('DOMContentLoaded', function () {
	console.log("onload");
	var Slogin = document.getElementById('Slogin');
	var Blogin = document.getElementById('Blogin');
	console.log(Slogin);
	Slogin.addEventListener('click', function () {
		console.log("click");
		
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