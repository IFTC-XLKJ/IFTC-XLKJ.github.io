var url = window.location.href;
var params = new URLSearchParams(url.search);
var paramsDict = {};
params.forEach(function(value, key) {
    paramsDict[key] = value;
});

document.addEventListener('DOMContentLoaded', function() {
    console.log(paramsDict);
});
