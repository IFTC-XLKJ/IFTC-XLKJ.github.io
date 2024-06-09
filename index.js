var window = this.window;
document.addEventListener('DOMContentLoaded', function () {
    var url = window.location.href;
    var params = new URLSearchParams(url.search);
    var paramsDict = {};
    params.forEach(function (value, key) {
        paramsDict[key] = value;
    });
    console.log(paramsDict);
    if (paramsDict['page']) {
        window.location.href = `./${paramsDict['page']}`;
    } else {
        window.location.href = `./Home`;
    }
});
