var document = this.document;
var window = this.window;
console.log(window);
console.log(document);
document.addEventListener('DOMContentLoaded', function() {
	console.log("onload");
    var Slogin = document.getElementById('Slogin');
    console.log(Slogin);
    Slogin.addEventListener('click', function () {
        var url = "https://api.codemao.cn/tiger/v3/web/accounts/login";
		var postdata = {
			'pid': '65edCTyg',
            'identity': document.getElementById('id').value,
            'password': document.getElementById('pw').value
		}
        fetch(url, {
    		method: 'POST',
    		headers: {
        		'Content-Type': 'application/json',
    		},
    		body: JSON.stringify(postdata),
		})
		.then(response => response.json())
		.then(data => {
    		document.write(JSON.stringify(data.user_info));
			localStorage.setItem("nickname", id);
			localStorage.setItem("password", pw);
		})
		.catch((error) => {
    		document.write('Error:', error);
		});
    })
});