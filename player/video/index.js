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

function searchMVAPI (){
    return ``;
}
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = getURLParameters();
    console.log(urlParams);
    var video = document.getElementById('video');
    var app = document.getElementById('app');
    function getMV() {
        $.ajax({
            type: 'GET',
            url: '',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                video.src = data.data.list[0].cover;
                video.autoplay = true;
                video.loop = true;
               isPlaying = true;
            }
        })
    }
    if (!first.load) {
        if (getKeysNum(urlParams) == 0) {
            video.autoplay = true;
            video.loop = true;
            isPlaying = true;
        } else if (urlParams.url) {
            video.autoplay = true;
            video.loop = true;
            video.src = urlParams.url;
            isPlaying = true;
        }
        first.load = true;
    }
    video.addEventListener('dblclick', function () {
        if (isPlaying) {
            video.pause();
            isPlaying = false;
        } else {
            video.play();
            isPlaying = true;
        }
    })
});