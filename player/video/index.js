var document = this.document;
var window = this.window;
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
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('video');
    var app = document.getElementById('app');
});