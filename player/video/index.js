var document = this.document;
var window = this.window;
var isPlaying = false;
var first = {
    load: false
};
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
function getKeysNum(obj) {
    return Object.keys(obj).length;
}
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = getURLParameters();
    console.log(urlParams);
    var video = document.getElementById('video');
    var app = document.getElementById('app');
    video.addEventListener('click', function () {
        if (!first.load) {
            if (getKeysNum(urlParams) == 0) {
                video.play();
                isPlaying = true;
            } else if (urlParams.url) {
                video.src = urlParams.url;
                video.play();
                isPlaying = true;
            }
            first.load = true;
        }
    });
    video.addEventListener('dblclick', function () {
        if (isPlaying) {
            video.pause();
            isPlaying = false;
        } else {
            video.play();
            isPlaying = true;
        }
    })
    video.click();
});