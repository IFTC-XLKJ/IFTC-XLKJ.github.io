var document = this.document;
var window = this.window;
console.log(window);
console.log(document);
document.addEventListener('DOMContentLoaded', function () {
	console.log("onload");
	var Slogin = document.getElementById('Slogin');
	console.log(Slogin);
	Slogin.addEventListener('click', function () {
		var url = "https://api.codemao.cn/tiger/v3/web/accounts/login";
		/*function handleResponse(data) {
			document.getElementById('output').innerText = JSON.stringify(data);
		}
		function sendJSONPRequest(url, data) {
			const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
			window[callbackName] = function (response) {
				delete window[callbackName];
				document.body.removeChild(script);
				handleResponse(response);
			};
			const requestUrl = url + '?callback=' + callbackName + '&data=' + encodeURIComponent(JSON.stringify(data));
			const script = document.createElement('script');
			script.src = requestUrl;
			document.body.appendChild(script);
		}

		sendJSONPRequest(url, postData);*/
		const socket = new WebSocket('https://api.codemao.cn/tiger/v3/web/accounts/login');
		socket.onopen = function (event) {
			const postData = {
				'pid': '65edCTyg',
				'identity': document.getElementById('id').value,
				'password': document.getElementById('pw').value
			};
			const requestData = {
				method: 'POST',
				data: JSON.stringify(postData)
			};
			socket.send(JSON.stringify(requestData));
		};
		socket.onmessage = function (event) {
			const responseData = JSON.parse(event.data);
			console.log('Response from server:', responseData);
		};
		socket.onclose = function (event) {
			console.log('Connection closed');
		};
	})
});