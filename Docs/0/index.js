var window= this.window;
document.addEventListener("DOMContentLoaded", function () {
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
});