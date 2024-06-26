var document = this.document;
const diropenbutton = `<svg t="1719391421508" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5806" width="30" height="30"><path d="M915 556H334.782c-60 0-60-90 0-90H915c60 0 60 90 0 90z m-0.377 371H334.405c-60 0-60-90 0-90h580.218c60 0 60 90 0 90z m0-741H334.405c-60 0-60-90 0-90h580.218c60 0 60 90 0 90zM128 206c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64 35.346 0 64 28.654 64 64 0 35.346-28.654 64-64 64z m0 741c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64 35.346 0 64 28.654 64 64 0 35.346-28.654 64-64 64z m0-371c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64 35.346 0 64 28.654 64 64 0 35.346-28.654 64-64 64z" fill="#2C2C2C" p-id="5807"></path></svg>`;
const dirclosebutton = `<svg t="1719391938262" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10462" width="30" height="30"><path d="M756.736 812.032L512 567.296 267.776 811.52c-12.8 12.8-28.672 7.168-45.568-9.728-16.896-16.896-23.04-32.768-9.728-45.568L456.704 512 211.968 267.264c-14.848-15.36-6.144-30.208 8.704-45.568 16.896-16.896 30.72-25.6 46.592-10.24L512 456.704 756.736 212.48c14.336-14.336 28.672-7.168 47.104 11.264 15.36 15.36 23.552 28.672 8.192 44.032L567.296 512 811.52 756.224c15.36 15.36 8.704 28.672-8.192 46.08-16.896 17.408-33.792 22.528-46.592 9.728z" fill="#2C2C2C" p-id="10463"></path></svg>`;
var isDirOpen = false;
function isPC() {
    var userAgent = navigator.userAgent;
    var mobileRegex = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/;
    return !mobileRegex.test(userAgent);
}
document.addEventListener('DOMContentLoaded', function () {
    function getURLParameters() {
        const queryString = window.location.search.substring(1);
        const params = {};
        if (queryString) {
            queryString.split('&').forEach(param => {
                const [key, value] = param.split('=');
                params[key] = decodeURIComponent(value);
            });
        }
        return params;
    }
    const urlParams = getURLParameters();
    console.log(urlParams);
    var dir = document.getElementById('dir');
    var dirButton = document.getElementById('dir-button');
    var dirList = document.getElementById('dir-list');
    var doc = document.getElementById('doc');
    dirButton.addEventListener('click', function () {
        if (isDirOpen) {
            dirList.style.left = '-366px';
            doc.style.width = 'calc(100vw - 30px)';
            doc.style.left = '30px';
            dir.style.width = '30px';
            dirButton.innerHTML = diropenbutton;
            isDirOpen = false;
        } else {
            dirList.style.left = '0px';
            doc.style.width = 'calc(100vw - 360px)';
            doc.style.left = '360px';
            dir.style.width = '360px';
            dirButton.innerHTML = dirclosebutton;
            isDirOpen = true;
        }
    })
    if (isPC()) {
        dirButton.click();
    }
    var doctable = new pgdbs(dbs_cd48c6ccdf6ef2fe2d5fbeabeb3e33104e0e7f6d08cfa756191e3fc83ecb9651);
    console.log(doctable);
    function getDoc() {
        doctable.onGetData((json, id, url) => {
            console.log(json, id, url);
            if (json.code == 200) {
                var docobj = json.fields[0];
                console.log(docobj);
            } else {
                alert("获取数据失败，请页面刷新重新");
            }
        })
        doctable.getTableData(
            {
                id: '获取文档',
                filter: `归属='demo' AND 路径='${urlParams.doc}'`,
                page: 1,
                limit: 100000000,
            }
        )
    }
    getDoc();
})