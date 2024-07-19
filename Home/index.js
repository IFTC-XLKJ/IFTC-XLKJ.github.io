var document = this.document;
var window = this.window;
var appnum = 1;
var appsURL = [
    'https://iftc-xlkj.github.io/apk/VV图书120.apk',
    'https://iftc-xlkj.github.io/apk/VV账号中心15.apk'
]
document.addEventListener('DOMContentLoaded', function () {
    var vvzh = new pgdbs(dbs_a6b2a4d6c02022e831626d31ab805a468a151b90d5161660485a73cc6e1ea902);
    var user = document.getElementById('user');
    var Blogin = document.getElementById('Blogin');
    var userImg = document.getElementById('user_img');
    var login = document.getElementById('login');
    var appItems = document.querySelectorAll('.app_item');
    if (localStorage.getItem('ID')) {
        user.style.display = 'inline';
        user.style.height = '60px';
        user.style.width = '60px';
        login.style.margin = '0px';
        Blogin.style.display = 'none';
        userImg.src = localStorage.getItem('头像');
    }
    console.log(appItems)
    appItems.forEach(function (appItem, index) {
        appItem.addEventListener('click', function () {
            var a = document.createElement('a');
            var url = appsURL[index];
            a.href = url;
            a.target = '_blank';
            a.style.display = 'none';
            a.appendChild(document.createTextNode('APK'));
            a.click();
        });
    });
});